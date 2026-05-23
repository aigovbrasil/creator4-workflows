---
title: "Implementação de pesquisa Claude Code no código fonte"
date: 2026-01-21
account: leonardopimentel.knh@gmail.com
uuid: 6d66a273-f831-4205-9826-eba3effe8eaf
messages: 4
tags: []
context: ""
---

**Você** _2026-01-21_

Em anexo a pesqeuisa claude code e as atualizoeces que devem ser incoproradsas no meu codigo fonte use a pesqeuisa como base e estrture prompt para implemnetcao completo

---

**Claude** _2026-01-21_

# PROMPT DE IMPLEMENTAÇÃO COMPLETA: INTEGRAÇÃO CLAUDE CODE BEST PRACTICES

## CONTEXTO EXECUTIVO

Você receberá um conjunto abrangente de documentação técnica e estratégica sobre o projeto NeuroExecução (KNH4), incluindo:

1. **Pesquisa Claude Code Best Practices** - Guia técnico oficial sobre desenvolvimento Python com assistência IA
2. **Sistema de Inteligência Completo** - 8 personas C-Level com KPIs e especialidades
3. **Base Científica TDAH** - Fundamentos de Barkley, Brown e Biederman aplicados ao produto
4. **Referências de Design** - 24 padrões visuais convertidos para a matriz Crextio
5. **Apresentação Final** - Consolidação de 200KB de conhecimento estratégico

Sua missão é estruturar uma implementação sistemática que integre as melhores práticas de desenvolvimento com Claude Code aos requisitos específicos do produto neurocompatível.

---

## OBJETIVO DA IMPLEMENTAÇÃO

Criar um código-fonte profissional, escalável e neurocompatível que incorpore:

- Práticas avançadas de gestão de contexto com Claude Code
- Arquitetura modular baseada em componentes React reutilizáveis
- Sistema de design neuroadaptativo validado cientificamente
- Infraestrutura de prompts estruturados e equipe virtual de especialistas
- Padrões de performance otimizados para ambientes com TDAH

---

## ESTRUTURA DE IMPLEMENTAÇÃO

### FASE 1: ARQUITETURA E CONFIGURAÇÃO BASE

#### 1.1 Estrutura de Diretórios

Baseado no guia Claude Code, organize o projeto seguindo hierarquia clara:

```
neuroexecucao/
├── .claude/
│   ├── settings.json              # Configurações projeto
│   └── hooks/                     # SessionStart, PostToolUse
├── CLAUDE.md                      # Contexto principal (< 500 linhas)
├── docs/
│   ├── architecture/
│   │   ├── SYSTEM_OVERVIEW.md
│   │   ├── TECH_STACK.md
│   │   └── API_INTEGRATION.md
│   ├── scientific/
│   │   ├── TDAH_FOUNDATIONS.md     # Barkley, Brown, Biederman
│   │   └── NEURODESIGN_2025.md     # Tendências aplicadas
│   └── prompts/
│       ├── validation/             # VAL-001 a VAL-005
│       ├── product/                # PRO-001 a PRO-004
│       ├── strategy/               # EST-001 a EST-006
│       ├── workflow/               # WRK-001 a WRK-007
│       └── context/                # CTX-001 a CTX-004
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── TeamPanel.tsx       # 8 C-Levels
│   │   │   ├── PromptLibrary.tsx   # 22+ prompts
│   │   │   ├── DailyTasks.tsx      # Máximo 3 tarefas
│   │   │   └── WeeklyOverview.tsx  # iPhone style
│   │   ├── ai/
│   │   │   ├── PersonaChat.tsx     # Chat contextualizado
│   │   │   └── PromptExecutor.tsx  # Sistema de execução
│   │   └── shared/
│   │       ├── Button.tsx          # Amarelo #FFD400
│   │       ├── Card.tsx            # Radius 24px
│   │       └── Input.tsx           # Background #F5F5F5
│   ├── hooks/
│   │   ├── usePersona.ts           # Ativação C-Level
│   │   ├── usePromptLibrary.ts     # Busca e favoritos
│   │   └── useTDAHFeatures.ts      # Timer progressivo, etc
│   ├── styles/
│   │   ├── tokens.css              # Design tokens Crextio
│   │   ├── typography.css          # Inter, line-height 1.6
│   │   └── utilities.css           # Helpers reutilizáveis
│   ├── types/
│   │   ├── persona.ts              # Interface C-Level
│   │   ├── prompt.ts               # Interface Prompt
│   │   └── project.ts              # Interface Projeto
│   └── utils/
│       ├── validation.ts           # Coeficiente CV
│       ├── storage.ts              # window.storage wrapper
│       └── anthropic.ts            # API integration
├── tests/
│   ├── components/
│   ├── hooks/
│   └── integration/
├── pyproject.toml                  # UV configuration
├── package.json                    # Node dependencies
└── README.md
```

#### 1.2 CLAUDE.md - Contexto Principal

Baseado nas diretrizes de manter abaixo de 500 linhas:

```markdown
# NeuroExecução - Plataforma Neuroadaptativa

## Quick Commands
- `uv run dev` - Inicia servidor desenvolvimento
- `uv run test` - Executa suite de testes
- `uv run lint` - Ruff check + Pyright
- `uv run build` - Build de produção

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Python 3.11, FastAPI
- **AI**: Anthropic Claude Sonnet 4.5
- **Database**: PostgreSQL + Redis cache
- **Deployment**: Vercel (frontend) + Railway (backend)

## Key Directories
- `src/components/dashboard/` - Componentes principais UI
- `src/components/ai/` - Sistema de chat e prompts
- `docs/prompts/` - 22+ prompts estruturados
- `docs/scientific/` - Base científica TDAH

## Standards Críticos

### Design System (Matriz Crextio)
- **Cores primárias**: #FFD400 (CTA), #FFC738 (hover), #000000 (contraste)
- **Backgrounds**: #F8F6F1 (app), #FFFFFF (cards)
- **Tipografia**: Inter, min 16px, line-height 1.6
- **Radius**: 12px (small), 16px (medium), 24px (large)
- **Shadows**: Máximo rgba(0,0,0,0.16)

### Princípios TDAH
- Máximo 3 tarefas simultâneas (Barkley)
- Timer progressivo, não countdown (Brown)
- Tudo externalizado, zero memória (Barkley)
- Progressive disclosure (DUA)
- Feedback imediato < 200ms

### Code Quality
- Type hints obrigatórios (Python)
- Props tipadas (TypeScript)
- Testes para features críticas
- Componentes < 300 linhas
- Funções < 50 linhas

## Personas C-Level Disponíveis
- **CTO**: Arquitetura, escalabilidade, custos AI
- **CPO**: Priorização, validação científica, UX
- **CAIO**: Otimização prompts, RAG, custos
- **CMO**: Growth orgânico, conteúdo, SEO
- **CFO**: Unit economics, fundraising, pricing
- **CSO**: B2B2C, parcerias, playbooks vendas
- **CCO**: Retenção, onboarding, NPS
- **CLO**: LGPD, IP, compliance

Para consultar uma persona: "Preciso falar com o [SIGLA]"

## Validação de Features
Toda nova feature deve passar pelo Coeficiente de Validação (CV):
- V1: Dores TDAH (25%)
- V2: Base Científica (20%)
- V3: Volume de Busca (15%)
- V4: Gap de Mercado (15%)
- V5: Viabilidade Técnica (10%)
- V6: Fit com Personas (10%)
- V7: Potencial Monetização (5%)

Score >= 7.0 = Priorizar | 5.0-6.9 = Refinar | < 5.0 = Descartar

## Performance Targets
- Lighthouse Score: > 90
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Custo AI por usuário: < R$0.10/mês
- Uptime: > 99.5%

## Dependency Management
Usar UV para todo gerenciamento Python:
- `uv add package` - Adiciona dependência
- `uv run script.py` - Executa com ambiente correto
- `uv sync` - Sincroniza ambiente

## Important Notes
- NUNCA use localStorage/sessionStorage em artifacts
- SEMPRE use React state para dados temporários
- Progressive enhancement: funciona sem JS
- Mobile-first: design para 375px primeiro
- Acessibilidade: contrast ratio mínimo 4.5:1
```

#### 1.3 Settings Configuration (.claude/settings.json)

```json
{
  "hooks": {
    "SessionStart": [{
      "type": "command",
      "command": "uv sync && echo 'Ambiente sincronizado'"
    }],
    "PostToolUse": [{
      "matcher": "Write(*.py)",
      "hooks": [{
        "type": "command",
        "command": "uv run ruff format $file && uv run ruff check --fix $file"
      }]
    }, {
      "matcher": "Write(*.tsx|*.ts)",
      "hooks": [{
        "type": "command",
        "command": "npx prettier --write $file"
      }]
    }]
  },
  "tools": {
    "bash": {
      "enabled": true,
      "trusted": true
    },
    "file_operations": {
      "enabled": true,
      "forbidden_patterns": [
        "node_modules/",
        ".venv/",
        "__pycache__/",
        "*.pyc",
        ".env"
      ]
    }
  },
  "context": {
    "max_tokens": 190000,
    "auto_compact": true,
    "compact_threshold": 0.85
  }
}
```

---

### FASE 2: COMPONENTES CORE DO SISTEMA

#### 2.1 TeamPanel - Equipe Virtual

Implementar componente baseado em REF-023 com as seguintes especificações:

**Arquivo**: `src/components/dashboard/TeamPanel.tsx`

**Requisitos de Implementação**:

1. Grid responsivo 3x3 (desktop), 2x4 (tablet), 1x8 (mobile)
2. Cores específicas por C-Level preservadas
3. Estado de seleção com background amarelo (#FFF9E6)
4. Modal de detalhes com KPIs de 90 dias
5. Botão "Consultar" que ativa contexto no chat
6. Animações Framer Motion (scale 1.05 no hover)
7. Persistência de última persona consultada (window.storage)

**Estrutura de Dados**:

```typescript
interface CLevelPersona {
  id: string;              // 'cto', 'cpo', etc
  name: string;            // 'CTO', 'CPO', etc
  label: string;           // 'Tech', 'Product', etc
  icon: string;            // '🔧', '📊', etc
  color: string;           // '#3B82F6', etc
  mission: string;         // "Escalar arquitetura..."
  kpis: string[];          // ['Uptime 99.9%', ...]
  expertise: string[];     // ['serverless', 'microservices', ...]
  tone: string;            // "pragmático, hands-on"
}
```

**Validação**:
- Testes unitários para cada persona
- Testes de integração com sistema de chat
- Teste de acessibilidade (contrast ratio, keyboard navigation)
- Teste de performance (render < 100ms)

#### 2.2 PromptLibrary - Biblioteca de Prompts

Implementar componente baseado em REF-024 com as seguintes especificações:

**Arquivo**: `src/components/dashboard/PromptLibrary.tsx`

**Requisitos de Implementação**:

1. Sistema de busca com debounce (300ms)
2. Filtros por categoria (5 categorias principais)
3. Sistema de favoritos com persistência
4. Modal de execução com preview do prompt
5. Métricas de uso (contador de ativações)
6. Tags e metadata organizados
7. Carregamento lazy para otimização

**Estrutura de Dados**:

```typescript
interface Prompt {
  id: string;              // 'VAL-001', 'PRO-002', etc
  name: string;            // 'Coeficiente de Validação'
  description: string;     // Breve descrição
  category: PromptCategory; // validation, product, etc
  tags: string[];          // ['feature', 'mvp', 'decisão']
  content: string;         // Markdown completo do prompt
  usage_count: number;     // Métrica de popularidade
  favorited: boolean;      // Estado por usuário
  created_at: Date;
  updated_at: Date;
}

enum PromptCategory {
  VALIDATION = 'validation',
  PRODUCT = 'product',
  STRATEGY = 'strategy',
  WORKFLOW = 'workflow',
  CONTEXT = 'context'
}
```

**Integração com AI**:
- Botão "Usar Prompt" abre modal com campos customizáveis
- Substitui variáveis do template com dados do projeto atual
- Envia para Claude API com contexto apropriado
- Exibe resposta formatada com markdown support
- Permite salvar outputs favoritos

#### 2.3 Sistema de Chat Contextualizado

Implementar integração com Anthropic API seguindo as diretrizes do guia Claude Code:

**Arquivo**: `src/utils/anthropic.ts`

```typescript
async function consultPersona(
  personaId: string,
  userMessage: string,
  projectContext: ProjectContext
): Promise<string> {
  const persona = getPersonaById(personaId);
  
  const systemPrompt = `
[CONTEXTO INTERNO]
Usuário ativou persona: ${persona.name}
Priorizar: ${persona.expertise.join(', ')}
Tom: ${persona.tone}
KPIs foco: ${persona.kpis.join(', ')}

[CONTEXTO DO PROJETO]
Projeto: ${projectContext.name}
Fase: ${projectContext.phase}
Tarefas ativas: ${projectContext.activeTasks.length}
Último checkpoint: ${projectContext.lastCheckpoint}
`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [
        { role: "user", content: userMessage }
      ],
    })
  });

  const data = await response.json();
  
  // Processar múltiplos content blocks
  const fullResponse = data.content
    .map(item => (item.type === "text" ? item.text : ""))
    .filter(Boolean)
    .join("\n");
  
  return fullResponse;
}
```

**Gestão de Contexto**:
- Manter histórico completo da conversa
- Incluir estado do projeto em cada requisição
- Implementar cache para respostas repetidas
- Monitorar uso de tokens e custos

---

### FASE 3: FEATURES NEUROADAPTATIVAS

#### 3.1 Timer Progressivo (Barkley)

Implementar counter ascendente ao invés de countdown ansioso:

**Arquivo**: `src/components/tdah/ProgressiveTimer.tsx`

**Princípios**:
- Mostra tempo trabalhado, não tempo restante
- Cor verde (#7ED957) para progresso positivo
- Sem sons ou notificações agressivas
- Pausar/retomar com um clique
- Persistir estado se usuário fechar aba

```typescript
function ProgressiveTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="progressive-timer">
      <div className="elapsed-time">{formatTime(elapsed)}</div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? '⏸️ Pausar' : '▶️ Continuar'}
      </button>
    </div>
  );
}
```

#### 3.2 Painel "Onde Parei" (Brown Cluster 5)

Implementar recuperação de contexto imediata:

**Arquivo**: `src/components/tdah/WhereILeftOff.tsx`

**Requisitos**:
- Salvar último estado a cada 30 segundos
- Exibir últimas 3 ações realizadas
- Botão "Retomar" que restaura contexto completo
- Timestamp legível ("há 2 horas")

```typescript
interface ActivityLog {
  timestamp: Date;
  action: string;
  context: string;
  projectId: string;
}

function WhereILeftOff() {
  const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const loadRecent = async () => {
      const stored = await window.storage.get('recent-activities');
      if (stored) {
        setRecentActivities(JSON.parse(stored.value));
      }
    };
    loadRecent();
  }, []);

  return (
    <div className="where-left-off">
      <h3>🔖 Onde Parei</h3>
      {recentActivities.slice(0, 3).map(activity => (
        <div key={activity.timestamp.toString()} className="activity-item">
          <span className="timestamp">
            {formatRelativeTime(activity.timestamp)}
          </span>
          <p>{activity.action}</p>
          <button onClick={() => resumeContext(activity)}>
            Retomar
          </button>
        </div>
      ))}
    </div>
  );
}
```

#### 3.3 Divisão Ação/Retenção/Manutenção (Brown Cluster 3)

Categorizar tarefas por tipo de esforço cognitivo:

**Arquivo**: `src/types/task.ts`

```typescript
enum TaskEffortType {
  ACTION = 'action',       // Criar algo novo, exige foco alto
  RETENTION = 'retention', // Manter algo existente, foco médio
  MAINTENANCE = 'maintenance' // Rotina, baixo esforço
}

interface Task {
  id: string;
  title: string;
  effortType: TaskEffortType;
  estimatedMinutes: number;
  energyLevel: 'high' | 'medium' | 'low'; // Requerida
  dependencies: string[];
}
```

**Sugestão Inteligente**:
- Tarefas ACTION para horário de pico de medicação
- Tarefas MAINTENANCE para momentos de baixa energia
- Nunca mais de 1 tarefa ACTION por dia

---

### FASE 4: INTEGRAÇÃO CIENTÍFICA

#### 4.1 Framework de Validação (Coeficiente CV)

Implementar sistema de scoring baseado nas 7 variáveis:

**Arquivo**: `src/utils/validation.ts`

```typescript
interface ValidationInput {
  ideaDescription: string;
  targetAudience: string;
  existingEvidence?: string[];
}

interface ValidationScore {
  v1_pain_points: number;      // 0-10
  v2_scientific_basis: number; // 0-10
  v3_search_volume: number;    // 0-10
  v4_market_gap: number;       // 0-10
  v5_technical_viability: number; // 0-10
  v6_persona_fit: number;      // 0-10
  v7_monetization: number;     // 0-10
  total_cv: number;            // Weighted average
  recommendation: 'PRIORITIZE' | 'REFINE' | 'DISCARD';
  reasoning: string;
}

async function calculateValidationCoefficient(
  input: ValidationInput
): Promise<ValidationScore> {
  // Usar Claude API para pesquisar cada variável
  // Retornar scores justificados com fontes
  
  const cv = (v1 * 0.25) + (v2 * 0.20) + (v3 * 0.15) + 
             (v4 * 0.15) + (v5 * 0.10) + (v6 * 0.10) + 
             (v7 * 0.05);
  
  return {
    // ... scores individuais
    total_cv: cv,
    recommendation: cv >= 7.0 ? 'PRIORITIZE' : 
                    cv >= 5.0 ? 'REFINE' : 'DISCARD',
    reasoning: generateReasoning(scores)
  };
}
```

#### 4.2 Citações Científicas Automáticas

Implementar sistema de referências inline:

**Arquivo**: `src/components/shared/ScientificCitation.tsx`

```typescript
interface Citation {
  author: string;
  year: number;
  title: string;
  source: string;
  url?: string;
}

const TDAH_CITATIONS: Record<string, Citation> = {
  'barkley-temporal': {
    author: 'Barkley, R. A.',
    year: 2010,
    title: 'Taking Charge of Adult ADHD',
    source: 'New York: Guilford Press'
  },
  'brown-clusters': {
    author: 'Brown, T. E.',
    year: 2013,
    title: 'A New Understanding of ADHD in Children and Adults',
    source: 'London: Routledge'
  },
  // ... mais citações
};

function ScientificCitation({ citationKey }: { citationKey: string }) {
  const citation = TDAH_CITATIONS[citationKey];
  
  return (
    <span className="citation" data-citation={citationKey}>
      <sup>[{citation.author}, {citation.year}]</sup>
    </span>
  );
}
```

---

### FASE 5: OTIMIZAÇÃO E PERFORMANCE

#### 5.1 Gestão de Contexto Claude Code

Seguir as práticas do guia oficial:

1. **Monitorar uso de contexto**:
   - Usar `/context` para verificar utilização
   - Limpar com `/clear` entre tarefas não relacionadas
   - Evitar operações complexas acima de 80% capacidade

2. **Subagents para preservação**:
   - Delegar pesquisas a subagents
   - Manter apenas sumário no contexto principal
   - Usar para validação científica paralela

3. **Estrutura de arquivos**:
   - Componentes < 300 linhas
   - Funções específicas < 50 linhas
   - Extrair lógica complexa para utils

#### 5.2 Caching Inteligente

Implementar estratégia de cache em múltiplas camadas:

**Arquivo**: `src/utils/cache.ts`

```typescript
interface CacheStrategy {
  ttl: number;           // Time to live em segundos
  staleWhileRevalidate: boolean;
  key: string;
}

class SmartCache {
  // Layer 1: In-memory (React state)
  private memoryCache = new Map<string, any>();
  
  // Layer 2: window.storage (persistent)
  async get(key: string): Promise<any> {
    // Tentar memory primeiro
    if (this.memoryCache.has(key)) {
      return this.memoryCache.get(key);
    }
    
    // Tentar persistent storage
    const stored = await window.storage.get(key);
    if (stored) {
      const parsed = JSON.parse(stored.value);
      this.memoryCache.set(key, parsed);
      return parsed;
    }
    
    return null;
  }
  
  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    this.memoryCache.set(key, value);
    await window.storage.set(key, JSON.stringify(value));
  }
}
```

#### 5.3 Lazy Loading e Code Splitting

```typescript
// Carregar componentes pesados sob demanda
const TeamPanel = lazy(() => import('./components/dashboard/TeamPanel'));
const PromptLibrary = lazy(() => import('./components/dashboard/PromptLibrary'));

function Dashboard() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <TeamPanel />
      <PromptLibrary />
    </Suspense>
  );
}
```

---

### FASE 6: TESTES E VALIDAÇÃO

#### 6.1 Estratégia de Testes

Baseado nas recomendações Claude Code sobre Test-Driven Development:

1. **Testes Unitários** (Jest + Testing Library):
   - Cada componente tem arquivo `.test.tsx`
   - Cobertura mínima 80% para lógica crítica
   - Mocks para APIs externas

2. **Testes de Integração**:
   - Fluxos completos usuário
   - Integração com Anthropic API
   - Persistência de dados

3. **Testes de Acessibilidade**:
   - axe-core para validação automática
   - Contrast ratio em todos os componentes
   - Navegação por teclado

4. **Testes de Performance**:
   - Lighthouse CI integrado
   - Bundle size tracking
   - Render time monitoring

**Exemplo de Teste**:

```typescript
describe('TeamPanel', () => {
  it('should display all 8 C-Level personas', () => {
    render(<TeamPanel />);
    expect(screen.getByText('CTO')).toBeInTheDocument();
    expect(screen.getByText('CPO')).toBeInTheDocument();
    // ... todos os 8
  });

  it('should open modal on persona click', async () => {
    render(<TeamPanel />);
    const ctoCard = screen.getByText('CTO');
    fireEvent.click(ctoCard);
    
    await waitFor(() => {
      expect(screen.getByText('Chief Technology Officer')).toBeInTheDocument();
    });
  });

  it('should maintain contrast ratio > 4.5:1', async () => {
    const { container } = render(<TeamPanel />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

## CHECKLIST DE IMPLEMENTAÇÃO COMPLETA

### Sprint 1-2: Fundação
- [ ] Estrutura de diretórios criada
- [ ] CLAUDE.md configurado (< 500 linhas)
- [ ] Settings.json com hooks PostToolUse
- [ ] UV configurado para ambiente Python
- [ ] Design tokens CSS implementados
- [ ] Componentes base (Button, Card, Input)

### Sprint 3-4: Componentes Core
- [ ] TeamPanel implementado e testado
- [ ] PromptLibrary implementado e testado
- [ ] Sistema de chat contextualizado
- [ ] Integração Anthropic API
- [ ] Persistência com window.storage

### Sprint 5-6: Features TDAH
- [ ] Timer progressivo (count-up)
- [ ] Painel "Onde Parei"
- [ ] Divisão Ação/Retenção/Manutenção
- [ ] Progressive disclosure em cards
- [ ] Feedback imediato < 200ms

### Sprint 7-8: Validação Científica
- [ ] Framework CV implementado
- [ ] Citações científicas automáticas
- [ ] Documentação de base Barkley/Brown
- [ ] Validação com especialista TDAH

### Sprint 9-10: Otimização
- [ ] Caching em múltiplas camadas
- [ ] Lazy loading de componentes
- [ ] Code splitting otimizado
- [ ] Lighthouse score > 90
- [ ] Bundle size < 200KB gzipped

### Sprint 11-12: Testes e QA
- [ ] Cobertura de testes > 80%
- [ ] Testes de acessibilidade passando
- [ ] Performance benchmarks atingidos
- [ ] Beta testing com 10 usuários TDAH
- [ ] Ajustes baseados em feedback

---

## MÉTRICAS DE SUCESSO

| Categoria | Métrica | Target | Medição |
|-----------|---------|--------|---------|
| **Performance** | Lighthouse Score | > 90 | CI pipeline |
| **Performance** | First Contentful Paint | < 1.5s | Lighthouse |
| **Performance** | Time to Interactive | < 3.5s | Lighthouse |
| **Custos** | AI por usuário/mês | < R$0.10 | Dashboard interno |
| **Usabilidade** | Taxa uso TeamPanel | > 40% | Analytics |
| **Usabilidade** | Prompts ativados/semana | > 3 | Analytics |
| **Qualidade** | Cobertura de testes | > 80% | Jest coverage |
| **Qualidade** | Bugs críticos | 0 | Issue tracker |
| **TDAH** | Retenção D30 | > 25% | vs 15-20% benchmark |
| **TDAH** | NPS | > 50 | vs 30-40 apps TDAH |

---

## PRÓXIMOS PASSOS RECOMENDADOS

### Imediato (Esta Semana)
1. Criar repositório Git com estrutura completa
2. Configurar ambiente de desenvolvimento (UV + Node)
3. Implementar design tokens CSS (Matriz Crextio)
4. Criar componentes base reutilizáveis

### Curto Prazo (2-4 Semanas)
1. Implementar TeamPanel e PromptLibrary
2. Integração inicial com Anthropic API
3. Testes unitários para componentes críticos
4. Alpha interno com 2-3 desenvolvedores

### Médio Prazo (1-3 Meses)
1. Features TDAH completas (timer, "onde parei", etc)
2. Framework de validação CV operacional
3. Beta testing com 10 usuários TDAH
4. Otimização de performance e custos

### Longo Prazo (3-6 Meses)
1. Lançamento MVP v1.0
2. Onboarding de primeiros 100 usuários

---

**Você** _2026-01-21_

Continuar

---

**Claude** _2026-01-21_

3. Iteração baseada em métricas reais
4. Preparação para escala (1K+ usuários)

---

## RECURSOS ADICIONAIS

### Documentação de Referência
- Claude Code Best Practices: Fornecido neste contexto
- Anthropic API Docs: https://docs.anthropic.com
- React Best Practices: https://react.dev
- TypeScript Handbook: https://www.typescriptlang.org/docs/
- UV Documentation: https://github.com/astral-sh/uv

### Base Científica
- Barkley, R. A. (2010). Taking Charge of Adult ADHD
- Brown, T. E. (2013). A New Understanding of ADHD
- CAST (2020). Universal Design for Learning Guidelines

### Design System
- Todos os 24 padrões visuais: REFERENCIAS_DESIGN_KNH4.md
- Paleta Crextio completa: Documento REF-001
- Componentes React: Documentos REF-014 a REF-021

---

## CONTATO E SUPORTE

Para dúvidas sobre implementação, consulte:

1. **Questões Técnicas (Arquitetura, Stack)**: Ativar persona CTO
2. **Questões de Produto (Features, UX)**: Ativar persona CPO
3. **Questões de AI (Prompts, Custos)**: Ativar persona CAIO
4. **Validação Científica**: Consultar docs/scientific/
5. **Design e UI**: Consultar REFERENCIAS_DESIGN_KNH4.md

---

**FIM DO PROMPT DE IMPLEMENTAÇÃO**

**Versão**: 1.0 COMPLETA  
**Data**: 21/01/2026  
**Status**: ✅ PRONTO PARA EXECUÇÃO  
**Próxima Ação**: Iniciar Sprint 1 com criação de estrutura base