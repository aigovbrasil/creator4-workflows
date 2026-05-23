#!/usr/bin/env python3
"""
phase1_extract.py — Extração e Deduplicação
════════════════════════════════════════════
COMO RODAR NO CLAUDE CODE (copie e cole exatamente):

    python phase1_extract.py Export-DB.zip

SEM DEPENDÊNCIAS EXTERNAS — apenas stdlib Python 3.10+

O que este script faz:
  1. Abre o ZIP externo
  2. Ignora __MACOSX e pasta "Duplicates check"
  3. Para cada conta: abre o inner ZIP, lê users.json + conversations.json
  4. Deduplica conversas por UUID (evita contar a mesma conversa duas vezes)
  5. Insere tudo no banco raw.db com metadados de origem

OUTPUT: output/raw.db
  Tabelas: accounts, conversations, messages
"""

import json
import io
import zipfile
import sqlite3
import hashlib
import sys
from pathlib import Path
from datetime import datetime, timezone

# ── Schema ────────────────────────────────────────────────────────────────────

SCHEMA = """
CREATE TABLE IF NOT EXISTS accounts (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    email       TEXT UNIQUE,
    full_name   TEXT,
    folder_name TEXT,
    conv_count  INTEGER DEFAULT 0,
    msg_count   INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS conversations (
    uuid        TEXT PRIMARY KEY,
    name        TEXT,
    summary     TEXT,
    created_at  TEXT,
    updated_at  TEXT,
    account_id  INTEGER REFERENCES accounts(id),
    msg_count   INTEGER DEFAULT 0,
    first_msg   TEXT,     -- primeira mensagem do usuário (para título/busca)
    source_zip  TEXT      -- nome do inner zip de origem
);

CREATE TABLE IF NOT EXISTS messages (
    uuid        TEXT PRIMARY KEY,
    conv_uuid   TEXT REFERENCES conversations(uuid),
    sender      TEXT,     -- 'human' ou 'assistant'
    text        TEXT,     -- conteúdo extraído em texto puro
    created_at  TEXT,
    has_files   INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_conv_account ON conversations(account_id);
CREATE INDEX IF NOT EXISTS idx_msg_conv     ON messages(conv_uuid);
CREATE INDEX IF NOT EXISTS idx_msg_sender   ON messages(sender);
"""

# ── Helpers ───────────────────────────────────────────────────────────────────

def extract_text(content) -> str:
    """
    O campo 'content' de uma mensagem pode ser:
    - string direta
    - lista de blocos {type: 'text', text: '...'} ou {type: 'tool_result', ...}
    Extraímos só o texto puro.
    """
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        parts = []
        for block in content:
            if not isinstance(block, dict):
                continue
            btype = block.get("type", "")
            if btype == "text":
                parts.append(block.get("text", ""))
            elif btype == "tool_result":
                # artifacts: pega texto dos sub-blocos se houver
                sub = block.get("content", [])
                if isinstance(sub, list):
                    for s in sub:
                        if isinstance(s, dict) and s.get("type") == "text":
                            parts.append(s.get("text", ""))
        return "\n".join(p for p in parts if p)
    return str(content) if content else ""


def parse_ts(ts_str) -> str:
    """Normaliza timestamp para ISO 8601."""
    if not ts_str:
        return ""
    return ts_str.replace("Z", "+00:00")


def zip_hash(zip_bytes: bytes) -> str:
    """Hash MD5 dos primeiros 64KB do ZIP para detecção de duplicatas."""
    return hashlib.md5(zip_bytes[:65536]).hexdigest()

# ── Core ──────────────────────────────────────────────────────────────────────

def process_inner_zip(
    zip_bytes: bytes,
    folder_name: str,
    zip_name: str,
    conn: sqlite3.Connection,
    seen_conv_uuids: set,
    seen_zip_hashes: set,
) -> dict:
    """
    Processa um inner ZIP (uma conta do Claude).
    Retorna estatísticas do processamento.
    """
    # dedup de ZIPs por hash de conteúdo
    h = zip_hash(zip_bytes)
    if h in seen_zip_hashes:
        return {"status": "duplicate_zip", "convs": 0, "msgs": 0}
    seen_zip_hashes.add(h)

    stats = {"status": "ok", "convs": 0, "msgs": 0, "new": 0, "dup": 0}

    try:
        inner = zipfile.ZipFile(io.BytesIO(zip_bytes), "r")
    except zipfile.BadZipFile:
        return {"status": "bad_zip", "convs": 0, "msgs": 0}

    files_in_zip = inner.namelist()

    # ── usuário ───────────────────────────────────────────────────────────────
    email = folder_name  # fallback
    full_name = ""
    if "users.json" in files_in_zip:
        try:
            users = json.loads(inner.read("users.json"))
            if users and isinstance(users, list):
                email = users[0].get("email_address", folder_name) or folder_name
                full_name = users[0].get("full_name", "") or ""
        except Exception:
            pass

    # insere ou recupera conta
    conn.execute(
        "INSERT OR IGNORE INTO accounts (email, full_name, folder_name) VALUES (?,?,?)",
        (email, full_name, folder_name)
    )
    account_id = conn.execute(
        "SELECT id FROM accounts WHERE email = ?", (email,)
    ).fetchone()[0]

    # ── conversas ─────────────────────────────────────────────────────────────
    if "conversations.json" not in files_in_zip:
        inner.close()
        return stats

    try:
        convs = json.loads(inner.read("conversations.json"))
    except Exception as e:
        print(f"    ⚠  Erro ao ler conversations.json: {e}")
        inner.close()
        return stats

    if not isinstance(convs, list):
        inner.close()
        return stats

    for conv in convs:
        c_uuid = conv.get("uuid", "")
        if not c_uuid:
            continue

        stats["convs"] += 1

        # dedup de conversa por UUID (mesmo conteúdo em contas diferentes)
        if c_uuid in seen_conv_uuids:
            stats["dup"] += 1
            continue
        seen_conv_uuids.add(c_uuid)
        stats["new"] += 1

        messages = conv.get("chat_messages", [])
        stats["msgs"] += len(messages)

        # primeira mensagem humana como "título" da conversa
        first_msg = ""
        for m in messages:
            if m.get("sender") == "human":
                text = extract_text(m.get("content", m.get("text", "")))
                words = text.split()
                first_msg = " ".join(words[:20])
                break

        conn.execute(
            """
            INSERT OR IGNORE INTO conversations
                (uuid, name, summary, created_at, updated_at,
                 account_id, msg_count, first_msg, source_zip)
            VALUES (?,?,?,?,?,?,?,?,?)
            """,
            (
                c_uuid,
                conv.get("name", ""),
                conv.get("summary", ""),
                parse_ts(conv.get("created_at", "")),
                parse_ts(conv.get("updated_at", "")),
                account_id,
                len(messages),
                first_msg,
                zip_name,
            )
        )

        # mensagens
        for msg in messages:
            m_uuid = msg.get("uuid", "")
            if not m_uuid:
                continue
            text = extract_text(msg.get("content", msg.get("text", "")))
            has_files = 1 if (msg.get("files") or msg.get("attachments")) else 0

            conn.execute(
                """
                INSERT OR IGNORE INTO messages
                    (uuid, conv_uuid, sender, text, created_at, has_files)
                VALUES (?,?,?,?,?,?)
                """,
                (
                    m_uuid,
                    c_uuid,
                    msg.get("sender", ""),
                    text,
                    parse_ts(msg.get("created_at", "")),
                    has_files,
                )
            )

    inner.close()
    conn.commit()

    # atualiza contadores na tabela accounts
    conn.execute(
        "UPDATE accounts SET conv_count = conv_count + ?, msg_count = msg_count + ? WHERE id = ?",
        (stats["new"], stats["msgs"], account_id)
    )
    conn.commit()

    return stats


# ── Main ──────────────────────────────────────────────────────────────────────

def process_outer_zip(
    zip_path: str,
    conn: sqlite3.Connection,
    seen_conv_uuids: set,
    seen_zip_hashes: set,
    total: dict,
):
    """Processa um arquivo ZIP externo (pode conter múltiplos inner ZIPs)."""
    outer = zipfile.ZipFile(zip_path, "r")
    inner_zips = [
        n for n in outer.namelist()
        if n.endswith(".zip")
        and not n.startswith("__MACOSX")
        and "Duplicates" not in n
        and "Duplicates check" not in n
    ]

    print(f"\n  [{Path(zip_path).name}] — {len(inner_zips)} inner ZIP(s)")

    for zip_path_inner in inner_zips:
        parts = zip_path_inner.split("/")
        # works for 2-part (folder/inner.zip) and 3-part (root/folder/inner.zip)
        folder = parts[-2]
        zip_name = parts[-1]
        display = folder[:50]

        zip_bytes = outer.read(zip_path_inner)
        stats = process_inner_zip(
            zip_bytes, folder, zip_name, conn,
            seen_conv_uuids, seen_zip_hashes
        )

        if stats["status"] == "duplicate_zip":
            print(f"  ⊘  {display} [ZIP DUPLICADO — ignorado]")
            total["dup_zip"] += 1
        elif stats["status"] == "bad_zip":
            print(f"  ✗  {display} [ZIP CORROMPIDO]")
        else:
            print(f"  ✓  {display:50s}  {stats['new']:4d} convs  {stats['msgs']:6d} msgs"
                  + (f"  ({stats['dup']} dups)" if stats['dup'] else ""))
            total["convs"]    += stats["convs"]
            total["msgs"]     += stats["msgs"]
            total["new"]      += stats["new"]
            total["dup_conv"] += stats["dup"]

    outer.close()


def main(zip_paths: list[str]):
    out_dir = Path("output")
    out_dir.mkdir(exist_ok=True)
    db_path = out_dir / "raw.db"

    # remove banco anterior se existir (re-run limpo)
    if db_path.exists():
        db_path.unlink()

    conn = sqlite3.connect(str(db_path))
    conn.executescript(SCHEMA)

    print("\n" + "═" * 60)
    print("FASE 1 — EXTRAÇÃO E DEDUPLICAÇÃO")
    print("═" * 60)

    seen_conv_uuids: set = set()
    seen_zip_hashes: set = set()
    total = {"convs": 0, "msgs": 0, "new": 0, "dup_conv": 0, "dup_zip": 0}

    for zp in zip_paths:
        process_outer_zip(zp, conn, seen_conv_uuids, seen_zip_hashes, total)

    conn.close()

    # ── relatório final ────────────────────────────────────────────────────────
    print()
    print("─" * 60)
    print("RESUMO DA FASE 1")
    print("─" * 60)
    print(f"  Conversas brutas    : {total['convs']}")
    print(f"  Conversas únicas    : {total['new']}")
    print(f"  Conversas duplicadas: {total['dup_conv']}")
    print(f"  ZIPs duplicados     : {total['dup_zip']}")
    print(f"  Mensagens           : {total['msgs']}")
    print(f"\n  → Banco gerado: {db_path.resolve()}")
    print()
    print("PRÓXIMO PASSO:")
    print("  Baixe o arquivo output/raw.db")
    print("  Faça upload dele + phase2_normalize.py no próximo chat do Claude Code")
    print("  Comando: python phase2_normalize.py")
    print("─" * 60)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python phase1_extract.py Export-DB.zip [extra1.zip ...]")
        sys.exit(1)

    zip_paths = sys.argv[1:]
    for zp in zip_paths:
        if not Path(zp).exists():
            print(f"Arquivo não encontrado: {zp}")
            sys.exit(1)

    main(zip_paths)
