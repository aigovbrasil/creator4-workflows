---
title: "Documento estruturado para design"
date: 2026-01-23
account: contatotdahadulto@gmail.com
uuid: aa61dc31-9b46-49e2-897f-8e5cade064f6
messages: 4
tags: []
context: ""
---

**Você** _2026-01-23_

Preciso garratir que tudo isso seja fromatado de forma clara e estrturada em unico docuemnto descritov para desenvolvder desieng

---

**Claude** _2026-01-23_

# NEUROEXECUÇÃO - DOCUMENTAÇÃO COMPLETA PARA DESENVOLVIMENTO

**Versão:** 3.0 Consolidada  
**Data:** 23 de Janeiro de 2026  
**Prazo de Entrega:** 180 dias (6 meses)  
**Documento:** Brief Técnico e de Design Unificado

---

## 📑 ÍNDICE

1. [Visão Geral do Produto](#1-visão-geral-do-produto)
2. [Arquitetura Técnica](#2-arquitetura-técnica)
3. [Database Schema](#3-database-schema)
4. [Design System](#4-design-system)
5. [Features Detalhadas](#5-features-detalhadas)
6. [Sistema de IA e Agentes](#6-sistema-de-ia-e-agentes)
7. [Monetização e Pricing](#7-monetização-e-pricing)
8. [Exportação e Documentos](#8-exportação-e-documentos)
9. [Timeline e Milestones](#9-timeline-e-milestones)
10. [Métricas de Sucesso](#10-métricas-de-sucesso)

---

## 1. VISÃO GERAL DO PRODUTO

### 1.1 Posicionamento
**"Da ideia ao primeiro cliente em 30 dias — mesmo com TDAH"**

### 1.2 Público-Alvo
- **Persona Principal:** Empreendedores com TDAH (28-35 anos)
- **Dor Central:** "Tenho 15 ideias, não tiro nenhuma do papel"
- **Willingness to Pay:** R$ 99/mês SE gerar 1 cliente
- **Volume de Mercado:** 360k empreendedores TDAH early-stage no Brasil

### 1.3 Diferenciação vs Concorrentes (Tiimo/Notion)

| Aspecto | Concorrentes | NeuroExecução |
|---------|--------------|---------------|
| **Metodologia** | Genérica | Barkley (ciclos 3 dias) |
| **IA** | Básica/Inexistente | Multi-Agent (Strategy/Finance/Ops) |
| **Onboarding** | 30+ minutos | 90 segundos |
| **Output** | Listas de tarefas | Interactive One-Pager |
| **Foco** | Tarefas genéricas | NEGÓCIOS e execução |

### 1.4 Fundamento Científico

Baseado em **Russell A. Barkley** (autoridade mundial em TDAH adulto):
- 40+ anos de pesquisa
- 200+ publicações científicas
- Metodologia validada em 18 países

**Princípio Central:** "TDAH é um transtorno de autocontrole no tempo. A solução não é motivação, é EXTERNALIZAÇÃO."

---

## 2. ARQUITETURA TÉCNICA

### 2.1 Stack Tecnológica

```yaml
Frontend:
  Framework: Next.js 14 (App Router)
  UI: React 18 + TypeScript
  Styling: TailwindCSS 3.4
  Components: shadcn/ui + Radix UI
  Animations: Framer Motion
  State: React Query + Zustand

Backend:
  Runtime: Node.js 20
  API: Next.js API Routes
  ORM: Drizzle ORM
  Database: PostgreSQL (Supabase)
  Cache: Upstash Redis

IA:
  Primary: Claude 4.5 Sonnet (Anthropic)
  Fallback: GPT-4o-mini
  Embeddings: text-embedding-3-small
  Vector: Pinecone

Infraestrutura:
  Hosting: Vercel
  Auth: Supabase Auth
  Payments: Stripe
  Email: Resend
  Analytics: Mixpanel
```

### 2.2 Estrutura de Pastas

```
neuroexecucao/
├── app/
│   ├── (marketing)/              # Landing, Pricing, Blog
│   │   ├── page.tsx
│   │   ├── pricing/page.tsx
│   │   └── blog/[slug]/page.tsx
│   ├── (auth)/                   # Login, Signup
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── app/                      # SaaS (autenticado)
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx      # Wizard 90s
│   │   │   └── [id]/page.tsx
│   │   ├── workspace/page.tsx    # Área de execução
│   │   ├── timer/page.tsx
│   │   ├── ideas/page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── export/page.tsx
│   │   ├── tools/                # Ferramentas auxiliares
│   │   │   ├── safe-protocol/
│   │   │   ├── prompt-converter/
│   │   │   ├── creator/
│   │   │   └── metrovan/
│   │   └── settings/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── projects/route.ts
│   │   ├── ai/
│   │   │   ├── generate-plan/route.ts
│   │   │   ├── agents/route.ts
│   │   │   └── analyze-execution/route.ts
│   │   └── stripe/
│   │       └── webhooks/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                       # shadcn components
│   ├── landing/
│   ├── dashboard/
│   ├── workspace/                # Componentes do workspace
│   ├── timer/
│   └── shared/
├── lib/
│   ├── supabase.ts
│   ├── stripe.ts
│   ├── ai.ts
│   └── db/
│       ├── schema.ts
│       └── migrations/
├── hooks/
└── styles/
```

### 2.3 Variáveis de Ambiente

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# AI
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
PINECONE_API_KEY=
PINECONE_INDEX=

# Email
RESEND_API_KEY=

# Analytics
NEXT_PUBLIC_MIXPANEL_TOKEN=

# Cache
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# App
NEXT_PUBLIC_APP_URL=https://neuroexecucao.com
```

---

## 3. DATABASE SCHEMA

### 3.1 Tabelas Principais (9 tabelas)

#### 3.1.1 `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  
  -- Perfil TDAH
  adhd_severity VARCHAR(20) CHECK (adhd_severity IN ('mild', 'moderate', 'severe')),
  adhd_diagnosed BOOLEAN DEFAULT false,
  
  -- Preferências
  preferences JSONB DEFAULT '{
    "mode": "standard",
    "show_education": true,
    "require_proof": false,
    "show_minimal": false
  }',
  
  -- Plano
  plan VARCHAR(20) DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'premium')),
  stripe_customer_id VARCHAR(255),
  subscription_status VARCHAR(20),
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 3.1.2 `projects`
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Input raw
  title VARCHAR(255) NOT NULL,
  raw_input TEXT NOT NULL,
  input_method VARCHAR(20) CHECK (input_method IN ('text', 'audio', 'file', 'youtube', 'conversation')),
  
  -- Blueprint gerado (JSON)
  blueprint JSONB NOT NULL DEFAULT '{}',
  /*
  Estrutura do blueprint:
  {
    "problem": "string",
    "solution": "string",
    "customer": "string",
    "market_size": "string",
    "differentiator": "string",
    "viability_score": 0-100,
    "resources_needed": [],
    "dependencies": [],
    "deliverables_abc": {
      "A": "minimum viable",
      "B": "ideal",
      "C": "excellence"
    }
  }
  */
  
  -- Status
  status VARCHAR(20) DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'archived')),
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);
```

#### 3.1.3 `cycles`
```sql
CREATE TABLE cycles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Ciclo
  cycle_number INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL, -- 3 dias por padrão
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed')),
  
  -- Entregável
  deliverable_title VARCHAR(255),
  deliverable_url TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 3.1.4 `tasks`
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cycle_id UUID REFERENCES cycles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Tarefa
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Prioridade A/B/C
  priority VARCHAR(1) CHECK (priority IN ('A', 'B', 'C')),
  
  -- Duração (minutos)
  estimated_duration INTEGER DEFAULT 25 CHECK (estimated_duration BETWEEN 25 AND 40),
  actual_duration INTEGER,
  
  -- Dia dentro do ciclo (1, 2 ou 3)
  day_in_cycle INTEGER CHECK (day_in_cycle BETWEEN 1 AND 3),
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'skipped')),
  
  -- Proof
  proof_url TEXT,
  proof_notes TEXT,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);
```

#### 3.1.5 `focus_sessions`
```sql
CREATE TABLE focus_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  
  -- Timer
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  
  -- Pausas
  pauses JSONB DEFAULT '[]',
  /*
  [
    {"start": "timestamp", "end": "timestamp", "reason": "string"}
  ]
  */
  
  -- Total
  total_focus_seconds INTEGER,
  
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 3.1.6 `daily_logs` (Sistema "Onde Parei")
```sql
CREATE TABLE daily_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Snapshot automático
  last_action TEXT NOT NULL,
  next_steps TEXT[],
  open_files TEXT[],
  pending_decisions TEXT[],
  
  -- Estado emocional (ML inference)
  emotional_state VARCHAR(20),
  energy_level INTEGER CHECK (energy_level BETWEEN 1 AND 5),
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 3.1.7 `quick_ideas`
```sql
CREATE TABLE quick_ideas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id),
  
  -- Input
  raw_input TEXT NOT NULL,
  input_type VARCHAR(20) DEFAULT 'idea' CHECK (input_type IN ('idea', 'reasoning')),
  
  -- IA categoriza
  category VARCHAR(50),
  suggested_priority VARCHAR(1) CHECK (suggested_priority IN ('A', 'B', 'C')),
  suggested_cycle INTEGER,
  
  -- Status
  status VARCHAR(20) DEFAULT 'unprocessed' CHECK (status IN ('unprocessed', 'added', 'archived', 'deleted')),
  
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 3.1.8 `ai_generations`
```sql
CREATE TABLE ai_generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id),
  
  -- Tipo de agente
  agent_type VARCHAR(20) CHECK (agent_type IN ('strategy', 'finance', 'ops', 'execution_analysis')),
  
  -- Prompt e resposta
  prompt TEXT NOT NULL,
  response JSONB NOT NULL,
  
  -- Custo
  tokens_used INTEGER,
  cost_usd DECIMAL(10, 6),
  
  -- Qualidade
  confidence_score DECIMAL(3, 2),
  
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 3.1.9 `user_gamification`
```sql
CREATE TABLE user_gamification (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  
  -- XP e nível
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  
  -- Streaks
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  
  -- Badges
  badges JSONB DEFAULT '[]',
  /*
  [
    {"name": "First Cycle", "earned_at": "timestamp"},
    {"name": "MVP Validated", "earned_at": "timestamp"}
  ]
  */
  
  -- Leaderboard
  ranking_position INTEGER,
  
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3.2 Índices Recomendados

```sql
-- Performance indexes
CREATE INDEX idx_projects_user_status ON projects(user_id, status);
CREATE INDEX idx_cycles_project_status ON cycles(project_id, status);
CREATE INDEX idx_tasks_cycle_day ON tasks(cycle_id, day_in_cycle);
CREATE INDEX idx_focus_sessions_user_date ON focus_sessions(user_id, start_time DESC);
CREATE INDEX idx_daily_logs_user_project ON daily_logs(user_id, project_id, created_at DESC);
CREATE INDEX idx_quick_ideas_status ON quick_ideas(user_id, status);
```

---

## 4. DESIGN SYSTEM

### 4.1 Paleta de Cores ADHD-Safe

```css
:root {
  /* ===== PRIMÁRIAS ===== */
  --primary: #F59E0B;      /* Amarelo - AÇÃO */
  --secondary: #2C5F7C;    /* Azul profundo - FOCO */
  --accent: #22C55E;       /* Verde - SUCESSO (timer) */
  
  /* ❌ PROIBIDO: #87CEEB (azul claro - fadiga visual) */
  
  /* ===== NEUTRALS ===== */
  --background: #FAFAFA;
  --surface: #FFFFFF;
  --text: #1F2937;
  --muted: #6B7280;
  
  /* ===== FEEDBACK ===== */
  --success: #22C55E;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
  
  /* ===== DEFICIT vs SOLUÇÃO (Infográfico) ===== */
  --deficit-bg: #FEE2E2;      /* Vermelho claro */
  --deficit-text: #DC2626;
  --solution-bg: #D1FAE5;     /* Verde claro */
  --solution-text: #059669;
  --data-bg: #DBEAFE;         /* Azul claro */
  --data-text: #1D4ED8;
}
```

### 4.2 Tipografia

```css
:root {
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

/* Hierarquia */
.h1 { font-size: 48px; font-weight: 700; line-height: 1.2; }
.h2 { font-size: 36px; font-weight: 700; line-height: 1.3; }
.h3 { font-size: 24px; font-weight: 600; line-height: 1.4; }
.h4 { font-size: 20px; font-weight: 600; line-height: 1.4; }
.body-lg { font-size: 18px; font-weight: 400; line-height: 1.6; }
.body { font-size: 16px; font-weight: 400; line-height: 1.6; }
.body-sm { font-size: 14px; font-weight: 400; line-height: 1.5; }
.caption { font-size: 12px; font-weight: 400; line-height: 1.4; }
```

### 4.3 Spacing System

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 80px;
  --space-10: 96px;
}
```

### 4.4 15 Regras UX ADHD

#### **Regras Fundamentais:**

1. ✅ **1 decisão por vez** - Nunca apresentar múltiplas escolhas simultâneas
2. ✅ **Estados vazios com exemplos** - Sempre mostrar o que fazer quando não há conteúdo
3. ✅ **Feedback imediato (<200ms)** - Toda ação deve ter resposta visual instantânea
4. ✅ **Progress bar visível** - Usuário sempre sabe onde está e quanto falta
5. ✅ **Fundo limpo (1 CTA/tela)** - Call-to-action único e claro por visualização
6. ✅ **Lembretes não intrusivos** - Notificações suaves, nunca interruptivas
7. ✅ **Controle de animações** - Opção de reduzir movimento para quem prefere
8. ✅ **Linguagem simples** - Evitar jargões técnicos desnecessários
9. ✅ **Menu máx 5 itens** - Navegação principal limitada a 5 opções
10. ✅ **Microvitórias gamificadas** - Celebrar cada pequeno progresso
11. ✅ **Autosave (30s)** - Salvamento automático constante
12. ✅ **Atalhos teclado visíveis** - Mostrar shortcuts disponíveis
13. ✅ **Preservar contexto sessões** - Sistema "Onde Parei" sempre ativo
14. ✅ **Busca > Navegação** - Priorizar busca rápida sobre menus profundos
15. ✅ **Modo foco 25-40min** - Timer integrado com bloqueio de distrações

### 4.5 Componentes Base (shadcn/ui)

#### Componentes Necessários:
- `Button`
- `Input`
- `Textarea`
- `Select`
- `Dialog`
- `Popover`
- `Progress`
- `Badge`
- `Card`
- `Tabs`
- `Toast`
- `Alert`
- `Avatar`
- `Tooltip`

---

## 5. FEATURES DETALHADAS

### 5.1 Landing Page

#### **Estrutura Visual:**

```
┌─────────────────────────────────────────────────────────┐
│ HERO SECTION (60% viewport)                             │
├─────────────────────────────────────────────────────────┤
│ Headline: "Da ideia ao primeiro cliente em 30 dias"    │
│ Sub: "— mesmo com TDAH"                                 │
│ CTA: [Começar grátis]                                   │
│ Social proof: "Usado por 1.200+ empreendedores"         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ DEMO VIDEO (30s autoplay muted)                         │
├─────────────────────────────────────────────────────────┤
│ • Demonstração de como funciona                         │
│ • Destaque para principais features                     │
│ • Visuais impactantes (cone invertido, etc)             │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ FEATURES (3 cards lado a lado)                          │
├─────────────────────────────────────────────────────────┤
│ Card 1: ⚡ Onboarding 90s                               │
│ Card 2: 🤖 IA gera plano completo                       │
│ Card 3: 🔄 Ciclos 3 dias (Barkley)                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ INFOGRÁFICO: OS 5 PILARES vs 5 DÉFICITS                │
│ (Ver seção 5.1.1 para detalhes)                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ PROVA CIENTÍFICA                                         │
├─────────────────────────────────────────────────────────┤
│ 📚 Citação Russell Barkley                              │
│ ✓ 40+ anos de pesquisa                                  │
│ ✓ 200+ publicações científicas                          │
│ ✓ Metodologia validada em 18 países                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ PRICING (3 tiers)                                        │
├─────────────────────────────────────────────────────────┤
│ Free: R$ 0 | Pro: R$ 49/mês | Premium: R$ 149/mês      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ TESTIMONIALS (3 depoimentos)                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ CTA FINAL + FOOTER                                       │
└─────────────────────────────────────────────────────────┘
```

#### 5.1.1 Infográfico Comparativo (Componente Chave)

**Headline do Infográfico:**
> 📊 OS 5 PILARES DE TODO PROJETO SÃO EXATAMENTE OS 5 DÉFICITS DO TDAH
> 
> Descubra por que 78% dos empreendedores com TDAH abandonam projetos na fase de execução — e como compensar neurologicamente cada etapa

**Estrutura da Tabela (4 Colunas):**

| FASE DO PROJETO | DÉFICIT TDAH (Barkley) | COMPENSAÇÃO NEUROEXECUÇÃO | IMPACTO & DADOS |
|-----------------|------------------------|---------------------------|-----------------|
| **1️⃣ INICIAÇÃO** | ❌ Miopia Temporal | ✅ Externalização automática do futuro | 43% abandonam aqui |
| **2️⃣ PLANEJAMENTO** | ❌ Internalização da fala deficiente | ✅ Decomposição automática em ciclos 3 dias | 38% abandonam aqui |
| **3️⃣ EXECUÇÃO** | ❌ Autorregulação afeto/motivação | ✅ Próteses motivacionais + "Onde Parei" | 78% falham aqui |
| **4️⃣ MONITORAMENTO** | ❌ Reconstituição (análise/síntese) | ✅ Analytics neuroadaptados | 61% abandonam após blocker |
| **5️⃣ FINALIZAÇÃO** | ❌ Déficit de inibição comportamental | ✅ Exportação automática + closure forçado | 87% não documentam |

**Detalhamento de Cada Fase:**

<details>
<summary><strong>FASE 1: INICIAÇÃO E ESCOPO</strong></summary>

**Gestão Clássica Exige:**
- Identificar necessidades
- Avaliar viabilidade
- Definir objetivos claros
- Mapear riscos
- Visão de longo prazo

**Déficit TDAH:**
- **Miopia Temporal** (Déficit de Memória de Trabalho Não-Verbal)
- Incapacidade de "ver" o futuro
- Comportamento governado pelo "agora"
- Estimativa de tempo irrealista

**Falha Típica:**
❌ "Tenho 15 ideias, mas não sei qual seguir"  
❌ "Não consigo visualizar o resultado final"

**Solução NeuroExecução:**
✅ AI Strategy Agent gera blueprint visual completo em 90 segundos  
✅ RAG busca dados de mercado automaticamente  
✅ Visualização 30/60/90 dias

**Tecnologia:**
- Claude 4.5 API: processa input bruto
- Pinecone RAG: busca competidores
- Confidence Scoring: se <75%, aciona wizard guiado

**Dados Validados:**
- 📊 43% dos projetos TDAH falham na fase de ESCOPO
- 💬 "Tenho 15 ideias incríveis, mas não consigo tirar nenhuma do papel" (28 menções em 47 entrevistas)
- 📈 +576% crescimento buscas "TDAH empreendedor" (2023-2025)

</details>

<details>
<summary><strong>FASE 2: PLANEJAMENTO</strong></summary>

**Gestão Clássica Exige:**
- Criar cronograma
- Sequenciar atividades
- Estimativa temporal
- Fala interna (autodiálogo)

**Déficit TDAH:**
- **Internalização da Fala Deficiente**
- Dificuldade em usar linguagem interna para guiar comportamento
- Falha em seguir rotinas planejadas verbalmente

**Falha Típica:**
❌ "Eu sei O QUE fazer, mas não COMO sequenciar"  
❌ "Faço listas gigantes que me paralisam"

**Solução NeuroExecução:**
✅ Barkley Engine decompõe projeto em tarefas 25-40min  
✅ Priorização automática A-B-C (Must/Should/Could)  
✅ Distribuição em ciclos de 3 dias

**Tecnologia:**
- CTA Engine: classifica tarefas por carga cognitiva
- Batching: agrupa por "modo mental" (Deep vs Reactive)
- Auto-scheduling: aloca em janelas de energia real

**Dados Validados:**
- 📊 38% abandonam na transição PLANEJAMENTO → EXECUÇÃO
- ⏱ Método tradicional: 20-40min para cronograma manual
- ⚡ NeuroExecução: 0 minutos (100% automático) = -97% tempo até ação

</details>

<details>
<summary><strong>FASE 3: EXECUÇÃO</strong></summary>

**Gestão Clássica Exige:**
- Seguir cronograma
- Manter foco
- Controle inibitório
- Sustentação de esforço

**Déficit TDAH:**
- **Autorregulação de Afeto/Motivação/Arousal**
- Busca constante de novidades
- Impulsividade emocional
- Só funciona em modo pânico (deadline)

**Falha Típica:**
❌ "Começo com gás, mas 2h depois já esqueci o plano e abri 15 abas"  
❌ "Não resisto a notificações"

**Solução NeuroExecução:**
✅ Timer progressivo (não countdown) reduz ansiedade  
✅ Auto-snapshot a cada 15min de inatividade  
✅ Gamificação: Badges, streak, microvitórias

**Tecnologia:**
- Snapshot Engine: captura última ação + próximos passos
- ML Sentiment Analysis: detecta estado emocional
- Reward System: micro-recompensas

**Dados Validados:**
- 📊 78% DOS PROJETOS TDAH FALHAM NA EXECUÇÃO
- 💬 "Abro 12 ferramentas, tenho zero output" (73% dos entrevistados)
- ⚡ NeuroExecução: +40% retenção D30 (78% vs 31% genéricos)

</details>

<details>
<summary><strong>FASE 4: MONITORAMENTO</strong></summary>

**Gestão Clássica Exige:**
- Verificar progresso
- Identificar desvios
- Ajustar rota
- Metacognição

**Déficit TDAH

---

**Você** _2026-01-23_

Ger mapa mental do dashboard com as features e workspace

---

**Claude** _2026-01-23_

:**
- **Reconstituição (Análise e Síntese)**
- Rigidez cognitiva
- Colapso quando "plano A" falha

**Falha Típica:**
❌ "Quando algo dá errado, abandono tudo"  
❌ "Não consigo ajustar o plano sem começar do zero"

**Solução NeuroExecução:**
✅ Dashboard real-time: tarefas completadas vs planejadas  
✅ AI Insights: "Você é 23% mais produtivo pela manhã (9-11h)"  
✅ Ajuste automático: rebalanceia ciclos baseado no histórico

**Tecnologia:**
- Cohort Analysis: compara com usuários similares
- Predictive Model: antecipa blockers
- Adaptive Scheduling: recalcula prazos

**Dados Validados:**
- 📊 61% abandonam após primeiro blocker não resolvido
- 💬 "Quando algo sai do plano, eu congelo" (82% entrevistados)
- ⚡ Reajuste automático em