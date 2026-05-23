#!/usr/bin/env python3
"""
phase2_normalize.py — Normalização e Indexação
════════════════════════════════════════════════
COMO RODAR NO CLAUDE CODE:

    python phase2_normalize.py

Espera encontrar output/raw.db (gerado pela Fase 1).
SEM DEPENDÊNCIAS EXTERNAS — apenas stdlib Python 3.10+

O que este script faz:
  1. Lê todas as conversas do raw.db
  2. Gera um título limpo para cada conversa
  3. Constrói knowledge.db com FTS5 para busca full-text
  4. Gera um arquivo .md por conversa em output/vault/
  5. Cria índice resumido output/vault/_INDEX.md

OUTPUT:
  output/knowledge.db   → banco final com FTS5
  output/vault/         → arquivos Markdown por conversa
  output/vault/_INDEX.md → índice navegável
"""

import re
import json
import sqlite3
from pathlib import Path
from datetime import datetime


# ── Schema do knowledge.db ────────────────────────────────────────────────────

SCHEMA = """
CREATE TABLE IF NOT EXISTS conversations (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid        TEXT UNIQUE,
    title       TEXT,
    account     TEXT,     -- email da conta de origem
    created_at  TEXT,
    updated_at  TEXT,
    msg_count   INTEGER,
    body        TEXT,     -- conversa completa em texto para busca
    md_filename TEXT      -- nome do arquivo .md gerado
);

CREATE TABLE IF NOT EXISTS messages (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    conv_uuid   TEXT REFERENCES conversations(uuid),
    sender      TEXT,
    text        TEXT,
    created_at  TEXT
);

CREATE INDEX IF NOT EXISTS idx_k_account ON conversations(account);
CREATE INDEX IF NOT EXISTS idx_k_date    ON conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_k_msgs    ON messages(conv_uuid);

-- FTS5: busca full-text em título + corpo inteiro da conversa
-- rank usa BM25 internamente — retorna os mais relevantes primeiro
CREATE VIRTUAL TABLE IF NOT EXISTS conv_fts
    USING fts5(
        title,
        body,
        account UNINDEXED,
        created_at UNINDEXED,
        content=conversations,
        content_rowid=id
    );

-- trigger para manter FTS sincronizado com inserções
CREATE TRIGGER IF NOT EXISTS conv_fts_ai
    AFTER INSERT ON conversations BEGIN
        INSERT INTO conv_fts(rowid, title, body, account, created_at)
        VALUES (new.id, new.title, new.body, new.account, new.created_at);
    END;
"""

# ── Helpers ───────────────────────────────────────────────────────────────────

def slugify(text: str, max_len: int = 60) -> str:
    text = text.lower().strip()
    for a, b in [("ã","a"),("â","a"),("á","a"),("à","a"),("ê","e"),("é","e"),
                 ("í","i"),("õ","o"),("ô","o"),("ó","o"),("ú","u"),("ç","c"),
                 ("ñ","n"),("ü","u"),("ö","o"),("ä","a")]:
        text = text.replace(a, b)
    text = re.sub(r"[^a-z0-9\s-]", " ", text)
    text = re.sub(r"\s+", "-", text.strip()).strip("-")
    return text[:max_len] or "sem-titulo"


def clean_email(email: str) -> str:
    """Remove domínio e caracteres especiais para usar como tag."""
    return email.split("@")[0].lower()


def make_title(row: sqlite3.Row) -> str:
    """
    Gera título legível para a conversa na ordem de prioridade:
    1. conv.name (se preenchido pelo usuário)
    2. first_msg (primeiros 20 tokens da 1ª mensagem humana)
    3. fallback genérico com data
    """
    name = (row["name"] or "").strip()
    if name:
        return name[:120]

    first = (row["first_msg"] or "").strip()
    if first:
        words = first.split()
        title = " ".join(words[:12])
        return (title + "...") if len(words) > 12 else title

    date = (row["created_at"] or "")[:10]
    return f"Conversa {date}"


def format_date(ts: str) -> str:
    if not ts:
        return "?"
    return ts[:10]


# ── Geração de Markdown ───────────────────────────────────────────────────────

def build_markdown(title: str, conv_row, messages: list) -> str:
    """
    Gera o conteúdo Markdown completo de uma conversa.
    Formato compatível com Obsidian, Notion e qualquer editor de texto.
    """
    date = format_date(conv_row["created_at"])
    account = conv_row["account"] or ""
    uuid = conv_row["uuid"]
    msg_count = conv_row["msg_count"] or len(messages)

    # frontmatter YAML
    frontmatter = (
        "---\n"
        f'title: "{title.replace(chr(34), chr(39))}"\n'
        f"date: {date}\n"
        f"account: {account}\n"
        f"uuid: {uuid}\n"
        f"messages: {msg_count}\n"
        f"tags: []\n"
        f'context: ""\n'
        "---\n\n"
    )

    # corpo: mensagens alternadas
    turns = []
    for m in messages:
        role = m["sender"]
        text = (m["text"] or "").strip()
        if not text:
            continue
        label = "**Você**" if role == "human" else "**Claude**"
        ts = format_date(m["created_at"])
        turns.append(f"{label} _{ts}_\n\n{text}")

    body = "\n\n---\n\n".join(turns)
    return frontmatter + body


def build_body_for_fts(messages: list) -> str:
    """Concatena todas as mensagens para indexação FTS."""
    parts = []
    for m in messages:
        text = (m["text"] or "").strip()
        if text:
            prefix = "Você: " if m["sender"] == "human" else "Claude: "
            parts.append(prefix + text)
    return "\n\n".join(parts)


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    raw_db_path = Path("output/raw.db")
    if not raw_db_path.exists():
        print("Erro: output/raw.db não encontrado.")
        print("Execute primeiro: python phase1_extract.py Export-DB.zip")
        raise SystemExit(1)

    out_dir = Path("output")
    vault_dir = out_dir / "vault"
    vault_dir.mkdir(parents=True, exist_ok=True)

    k_path = out_dir / "knowledge.db"
    if k_path.exists():
        k_path.unlink()

    raw = sqlite3.connect(str(raw_db_path))
    raw.row_factory = sqlite3.Row

    k = sqlite3.connect(str(k_path))
    k.executescript(SCHEMA)

    print("\n" + "═" * 60)
    print("FASE 2 — NORMALIZAÇÃO E INDEXAÇÃO")
    print("═" * 60)

    # carrega todas as conversas
    convs = raw.execute("""
        SELECT c.uuid, c.name, c.summary, c.created_at, c.updated_at,
               c.msg_count, c.first_msg, a.email as account
        FROM conversations c
        LEFT JOIN accounts a ON c.account_id = a.id
        ORDER BY c.created_at ASC
    """).fetchall()

    print(f"\n  {len(convs)} conversas únicas para normalizar\n")

    used_filenames: set = set()
    index_rows = []     # para o _INDEX.md
    ok = 0
    empty = 0

    for conv in convs:
        uuid = conv["uuid"]
        title = make_title(conv)
        date  = format_date(conv["created_at"])
        account = conv["account"] or "unknown"

        # carrega mensagens desta conversa
        msgs = raw.execute("""
            SELECT sender, text, created_at
            FROM messages
            WHERE conv_uuid = ?
            ORDER BY created_at ASC
        """, (uuid,)).fetchall()

        if not msgs:
            empty += 1
            continue

        # nome do arquivo Markdown
        slug = slugify(title)
        fname = f"{date}_{slug}.md"
        counter = 1
        while fname in used_filenames:
            fname = f"{date}_{slug}-{counter}.md"
            counter += 1
        used_filenames.add(fname)

        # body para FTS (texto completo da conversa)
        body = build_body_for_fts(msgs)

        # insere no knowledge.db
        k.execute(
            """
            INSERT OR IGNORE INTO conversations
                (uuid, title, account, created_at, updated_at,
                 msg_count, body, md_filename)
            VALUES (?,?,?,?,?,?,?,?)
            """,
            (uuid, title, account,
             conv["created_at"], conv["updated_at"],
             len(msgs), body, fname)
        )

        # insere mensagens
        for m in msgs:
            k.execute(
                "INSERT INTO messages (conv_uuid, sender, text, created_at) VALUES (?,?,?,?)",
                (uuid, m["sender"], m["text"], m["created_at"])
            )

        # gera arquivo Markdown
        md_content = build_markdown(title, conv, msgs)
        (vault_dir / fname).write_text(md_content, encoding="utf-8")

        index_rows.append((date, account, title, fname, len(msgs)))
        ok += 1

        if ok % 50 == 0:
            print(f"  ... {ok}/{len(convs)} processadas")

    k.commit()
    raw.close()

    # ── gera _INDEX.md ────────────────────────────────────────────────────────
    index_lines = [
        "# Índice da Base de Conversas\n",
        f"Gerado em: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n",
        f"Total: {ok} conversas | {len(set(r[1] for r in index_rows))} contas\n",
        "\n---\n\n",
        "| Data | Conta | Título | Arquivo | Msgs |\n",
        "|------|-------|--------|---------|------|\n",
    ]
    for date, acct, title, fname, nmsg in sorted(index_rows, reverse=True):
        acct_short = clean_email(acct)
        title_safe = title.replace("|", "-")[:60]
        index_lines.append(f"| {date} | {acct_short} | {title_safe} | [{fname}]({fname}) | {nmsg} |\n")

    (vault_dir / "_INDEX.md").write_text("".join(index_lines), encoding="utf-8")

    k.close()

    # ── relatório ─────────────────────────────────────────────────────────────
    print()
    print("─" * 60)
    print("RESUMO DA FASE 2")
    print("─" * 60)
    print(f"  Conversas normalizadas : {ok}")
    print(f"  Conversas vazias skip  : {empty}")
    print(f"  Arquivos .md gerados   : {ok}")
    print(f"\n  → Banco final    : output/knowledge.db")
    print(f"  → Vault Markdown : output/vault/ ({ok} arquivos + _INDEX.md)")
    print()
    print("PRÓXIMO PASSO:")
    print("  Baixe a pasta output/ inteira (knowledge.db + vault/)")
    print("  Faça upload de knowledge.db + phase3_query.py no próximo chat")
    print("  Comando: python phase3_query.py")
    print("─" * 60)


if __name__ == "__main__":
    main()
