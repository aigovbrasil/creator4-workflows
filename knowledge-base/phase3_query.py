#!/usr/bin/env python3
"""
phase3_query.py — Validação Final + Interface de Consulta
══════════════════════════════════════════════════════════
COMO RODAR NO CLAUDE CODE:

    python phase3_query.py

Espera encontrar output/knowledge.db (gerado pela Fase 2).
SEM DEPENDÊNCIAS EXTERNAS — apenas stdlib Python 3.10+

O que este script faz:
  1. Valida o banco (conta registros, testa FTS5)
  2. Gera output/RELATORIO_FINAL.md com estatísticas completas
  3. Entra em modo interativo para você consultar a base diretamente

MODO CONSULTA (após validação):
  - Digite qualquer pergunta em linguagem natural
  - O sistema busca no banco e retorna os trechos mais relevantes
  - Sem necessidade de API key — busca local pura
  - Para consulta com Claude (RAG completo): use o query.py gerado na conversa anterior

EXEMPLOS DE CONSULTA:
  > pipeline sqlite
  > exportar conversas claude
  > código python normalizar
  > qual conta tem mais conversas sobre IA?
"""

import re
import sys
import sqlite3
import textwrap
from pathlib import Path
from datetime import datetime
from collections import defaultdict


# ── Validação ─────────────────────────────────────────────────────────────────

def validate(conn: sqlite3.Connection) -> dict:
    """Roda checagens básicas de integridade no banco."""
    stats = {}

    stats["total_convs"] = conn.execute(
        "SELECT COUNT(*) FROM conversations"
    ).fetchone()[0]

    stats["total_msgs"] = conn.execute(
        "SELECT COUNT(*) FROM messages"
    ).fetchone()[0]

    stats["accounts"] = conn.execute(
        "SELECT account, COUNT(*) as n FROM conversations GROUP BY account ORDER BY n DESC"
    ).fetchall()

    stats["date_range"] = conn.execute(
        "SELECT MIN(created_at), MAX(created_at) FROM conversations"
    ).fetchone()

    stats["top_convs_by_msgs"] = conn.execute(
        "SELECT title, account, msg_count FROM conversations ORDER BY msg_count DESC LIMIT 5"
    ).fetchall()

    # testa FTS
    try:
        fts_test = conn.execute(
            "SELECT COUNT(*) FROM conv_fts WHERE conv_fts MATCH 'python'"
        ).fetchone()[0]
        stats["fts_ok"] = True
        stats["fts_test_count"] = fts_test
    except Exception as e:
        stats["fts_ok"] = False
        stats["fts_error"] = str(e)

    return stats


# ── Relatório ─────────────────────────────────────────────────────────────────

def generate_report(stats: dict, out_path: Path):
    """Gera o relatório final em Markdown."""
    date_min, date_max = stats.get("date_range", ("?", "?"))

    lines = [
        "# Relatório Final — Base de Conhecimento\n\n",
        f"Gerado em: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n\n",
        "---\n\n",
        "## Visão Geral\n\n",
        f"| Métrica | Valor |\n",
        f"|---------|-------|\n",
        f"| Total de conversas | {stats['total_convs']:,} |\n",
        f"| Total de mensagens | {stats['total_msgs']:,} |\n",
        f"| Contas indexadas   | {len(stats['accounts'])} |\n",
        f"| Período            | {(date_min or '?')[:10]} → {(date_max or '?')[:10]} |\n",
        f"| Busca FTS5         | {'✓ operacional' if stats['fts_ok'] else '✗ erro'} |\n",
        "\n---\n\n",
        "## Conversas por Conta\n\n",
        "| Conta | Conversas |\n",
        "|-------|----------|\n",
    ]

    for acct, n in stats["accounts"]:
        acct_short = (acct or "desconhecida").split("@")[0]
        lines.append(f"| {acct_short} | {n} |\n")

    lines += [
        "\n---\n\n",
        "## Top 5 Conversas (por número de mensagens)\n\n",
        "| Título | Conta | Msgs |\n",
        "|--------|-------|------|\n",
    ]

    for title, acct, nmsg in stats["top_convs_by_msgs"]:
        acct_short = (acct or "?").split("@")[0]
        title_safe = (title or "?").replace("|", "-")[:60]
        lines.append(f"| {title_safe} | {acct_short} | {nmsg} |\n")

    lines += [
        "\n---\n\n",
        "## Como Usar\n\n",
        "### Busca local (sem API key)\n\n",
        "```bash\n",
        "python phase3_query.py\n",
        "```\n\n",
        "### Busca com Claude (RAG completo)\n\n",
        "```bash\n",
        "export ANTHROPIC_API_KEY=sua-chave\n",
        "python query.py --db output/knowledge.db --chat\n",
        "```\n\n",
        "### SQL direto\n\n",
        "```bash\n",
        "# instale DB Browser for SQLite para interface visual\n",
        "# ou use Python:\n",
        "python3 -c \"\n",
        "import sqlite3\n",
        "conn = sqlite3.connect('output/knowledge.db')\n",
        "rows = conn.execute(\\\"SELECT title, account, created_at FROM conversations ORDER BY created_at DESC LIMIT 20\\\").fetchall()\n",
        "[print(r) for r in rows]\n",
        "\"\n",
        "```\n\n",
        "### Busca FTS5 por palavras-chave\n\n",
        "```python\n",
        "import sqlite3\n",
        "conn = sqlite3.connect('output/knowledge.db')\n",
        "results = conn.execute(\n",
        "    \"SELECT title, account, snippet(conv_fts, 1, '[', ']', '...', 20) \"\n",
        "    \"FROM conv_fts WHERE conv_fts MATCH ? ORDER BY rank LIMIT 10\",\n",
        "    ('seu termo aqui',)\n",
        ").fetchall()\n",
        "for title, acct, snip in results:\n",
        "    print(f'{title} ({acct})\\n  {snip}\\n')\n",
        "```\n",
    ]

    out_path.write_text("".join(lines), encoding="utf-8")


# ── Busca local (sem API) ─────────────────────────────────────────────────────

def local_search(conn: sqlite3.Connection, query: str, top_n: int = 8) -> list:
    """
    Busca FTS5 local — retorna os trechos mais relevantes por BM25.
    Sem chamada de API, sem custo — resultado instantâneo.
    """
    # sanitiza query para FTS5
    q = re.sub(r'[^\w\s]', ' ', query).strip()
    if not q:
        return []

    try:
        rows = conn.execute(
            """
            SELECT c.title, c.account, c.created_at,
                   snippet(conv_fts, 1, '【', '】', ' ... ', 25) as snip
            FROM conv_fts
            JOIN conversations c ON conv_fts.rowid = c.id
            WHERE conv_fts MATCH ?
            ORDER BY rank
            LIMIT ?
            """,
            (q, top_n)
        ).fetchall()
        return rows
    except sqlite3.OperationalError:
        # FTS5 pode rejeitar queries com operadores especiais
        # tenta com cada palavra separada
        words = q.split()
        fallback_q = " OR ".join(words)
        try:
            rows = conn.execute(
                """
                SELECT c.title, c.account, c.created_at,
                       snippet(conv_fts, 1, '【', '】', ' ... ', 25) as snip
                FROM conv_fts
                JOIN conversations c ON conv_fts.rowid = c.id
                WHERE conv_fts MATCH ?
                ORDER BY rank
                LIMIT ?
                """,
                (fallback_q, top_n)
            ).fetchall()
            return rows
        except Exception:
            return []


# ── Interface interativa ──────────────────────────────────────────────────────

def interactive_mode(conn: sqlite3.Connection):
    print("\n╔══════════════════════════════════════════╗")
    print("║  BASE PESSOAL — BUSCA LOCAL              ║")
    print("║  Busca FTS5 · BM25 · sem API key         ║")
    print("║  Digite 'sair' para encerrar             ║")
    print("╚══════════════════════════════════════════╝")
    print()
    print("  Exemplos de busca:")
    print("  > pipeline sqlite")
    print("  > exportar conversas claude")
    print("  > normalizar json markdown")
    print()

    while True:
        try:
            query = input("Busca: ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n\nEncerrando.")
            break

        if not query:
            continue
        if query.lower() in ("sair", "exit", "quit"):
            print("Encerrando.")
            break

        results = local_search(conn, query)

        if not results:
            print("  Nenhum resultado encontrado.\n")
            continue

        print(f"\n  {len(results)} resultado(s) para '{query}':\n")
        for i, (title, acct, created, snip) in enumerate(results, 1):
            acct_short = (acct or "?").split("@")[0]
            date = (created or "?")[:10]
            print(f"  [{i}] {title}")
            print(f"      {acct_short} · {date}")
            # wrap o snippet para caber no terminal
            snip_wrapped = textwrap.fill(snip, width=72, initial_indent="      ",
                                          subsequent_indent="      ")
            print(snip_wrapped)
            print()


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    db_path = Path("output/knowledge.db")
    if not db_path.exists():
        print("Erro: output/knowledge.db não encontrado.")
        print("Execute primeiro: python phase2_normalize.py")
        sys.exit(1)

    conn = sqlite3.connect(str(db_path))
    conn.row_factory = sqlite3.Row

    print("\n" + "═" * 60)
    print("FASE 3 — VALIDAÇÃO E ATIVAÇÃO")
    print("═" * 60)
    print("\n  Validando banco...")

    stats = validate(conn)

    print(f"  ✓ {stats['total_convs']:,} conversas")
    print(f"  ✓ {stats['total_msgs']:,} mensagens")
    print(f"  ✓ {len(stats['accounts'])} contas")
    print(f"  ✓ FTS5: {'operacional' if stats['fts_ok'] else 'ERRO — ' + stats.get('fts_error','')}")

    # gera relatório
    report_path = Path("output/RELATORIO_FINAL.md")
    generate_report(stats, report_path)
    print(f"  ✓ Relatório gerado: {report_path}")

    print()
    print("─" * 60)
    print("FASE 3 CONCLUÍDA — BASE OPERACIONAL")
    print("─" * 60)
    print()
    print("  ARQUIVOS PARA BAIXAR:")
    print("  ├── output/knowledge.db       ← banco principal")
    print("  ├── output/vault/             ← markdown por conversa")
    print("  ├── output/RELATORIO_FINAL.md ← estatísticas")
    print("  └── query.py                  ← interface RAG com Claude")
    print()
    print("  PHASE 6 ATINGIDA: base consultável e manipulável ✓")
    print()
    print("─" * 60)

    # entra em modo interativo
    interactive_mode(conn)
    conn.close()


if __name__ == "__main__":
    main()
