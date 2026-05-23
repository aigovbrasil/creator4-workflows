# Relatório Final — Base de Conhecimento

Gerado em: 2026-05-21 08:38

---

## Visão Geral

| Métrica | Valor |
|---------|-------|
| Total de conversas | 760 |
| Total de mensagens | 5,458 |
| Contas indexadas   | 14 |
| Período            | 2025-11-24 → 2026-05-21 |
| Busca FTS5         | ✓ operacional |

---

## Conversas por Conta

| Conta | Conversas |
|-------|----------|
| leonardo.pdab | 236 |
| directjervis | 148 |
| contatotdahadulto | 102 |
| on.26.leonardo | 73 |
| leonardopimentel.knh | 62 |
| executar.leonardo | 40 |
| adm.stdah | 29 |
| obrigadopelaviagem2025 | 18 |
| 365contato2025 | 14 |
| verinhaburgos56 | 13 |
| joao.studartmaia | 9 |
| adm.executar26 | 7 |
| maiajoaovinicius | 6 |
| adm.aigovbrasil | 3 |

---

## Top 5 Conversas (por número de mensagens)

| Título | Conta | Msgs |
|--------|-------|------|
| Conversa 2025-12-30 | directjervis | 81 |
| Estrutura padrão de entregável e refatoração de projetos | executar.leonardo | 46 |
| Conversa 2026-03-13 | leonardo.pdab | 44 |
| Diagnóstico de erros no pipeline | 365contato2025 | 44 |
| Conversa 2025-12-28 | directjervis | 38 |

---

## Como Usar

### Busca local (sem API key)

```bash
python phase3_query.py
```

### Busca com Claude (RAG completo)

```bash
export ANTHROPIC_API_KEY=sua-chave
python query.py --db output/knowledge.db --chat
```

### SQL direto

```bash
# instale DB Browser for SQLite para interface visual
# ou use Python:
python3 -c "
import sqlite3
conn = sqlite3.connect('output/knowledge.db')
rows = conn.execute(\"SELECT title, account, created_at FROM conversations ORDER BY created_at DESC LIMIT 20\").fetchall()
[print(r) for r in rows]
"
```

### Busca FTS5 por palavras-chave

```python
import sqlite3
conn = sqlite3.connect('output/knowledge.db')
results = conn.execute(
    "SELECT title, account, snippet(conv_fts, 1, '[', ']', '...', 20) "
    "FROM conv_fts WHERE conv_fts MATCH ? ORDER BY rank LIMIT 10",
    ('seu termo aqui',)
).fetchall()
for title, acct, snip in results:
    print(f'{title} ({acct})\n  {snip}\n')
```
