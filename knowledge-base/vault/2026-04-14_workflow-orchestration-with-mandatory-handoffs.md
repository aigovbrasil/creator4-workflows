---
title: "Workflow orchestration with mandatory handoffs"
date: 2026-04-14
account: contatotdahadulto@gmail.com
uuid: 74ce0e71-7881-4150-99a2-065a6b90821d
messages: 2
tags: []
context: ""
---

**Você** _2026-04-14_

/workflow-orchestration-patterns  Shoud Comand a full Cycle mmadatorry hnads off W/ /discovery-process /prd-development /problem-statement /roadmap-planning / The context Bussiness Is:

---

**Claude** _2026-04-14_

1	---
     2	name: workflow-orchestration-patterns
     3	description: Design durable workflows with Temporal for distributed systems. Covers workflow vs activity separation, saga patterns, state management, and determinism constraints. Use when building long-running processes, distributed transactions, or microservice orchestration.
     4	---
     5	
     6	# Workflow Orchestration Patterns
     7	
     8	Master workflow orchestration architecture with Temporal, covering fundamental design decisions, resilience patterns, and best practices for building reliable distributed systems.
     9	
    10	## When to Use Workflow Orchestration
    11	
    12	### Ideal Use Cases (Source: docs.temporal.io)
    13	
    14	- **Multi-step processes** spanning machines/services/databases
    15	- **Distributed transactions** requiring all-or-nothing semantics
    16	- **Long-running workflows** (hours to years) with automatic state persistence
    17	- **Failure recovery** that must resume from last successful step
    18	- **Business processes**: bookings, orders, campaigns, approvals
    19	- **Entity lifecycle management**: inventory tracking, account management, cart workflows
    20	- **Infrastructure automation**: CI/CD pipelines, provisioning, deployments
    21	- **Human-in-the-loop** systems requiring timeouts and escalations
    22	
    23	### When NOT to Use
    24	
    25	- Simple CRUD operations (use direct API calls)
    26	- Pure data processing pipelines (use Airflow, batch processing)
    27	- Stateless request/response (use standard APIs)
    28	- Real-time streaming (use Kafka, event processors)
    29	
    30	## Critical Design Decision: Workflows vs Activities
    31	
    32	**The Fundamental Rule** (Source: temporal.io/blog/workflow-engine-principles):
    33	
    34	- **Workflows** = Orchestration logic and decision-making
    35	- **Activities** = External interactions (APIs, databases, network calls)
    36	
    37	### Workflows (Orchestration)
    38	
    39	**Characteristics:**
    40	
    41	- Contain business logic and coordination
    42	- **MUST be deterministic** (same inputs → same outputs)
    43	- **Cannot** perform direct external calls
    44	- State automatically preserved across failures
    45	- Can run for years despite infrastructure failures
    46	
    47	**Example workflow tasks:**
    48	
    49	- Decide which steps to execute
    50	- Handle compensation logic
    51	- Manage timeouts and retries
    52	- Coordinate child workflows
    53	
    54	### Activities (External Interactions)
    55	
    56	**Characteristics:**
    57	
    58	- Handle all external system interactions
    59	- Can be non-deterministic (API calls, DB writes)
    60	- Include built-in timeouts and retry logic
    61	- **Must be idempotent** (calling N times = calling once)
    62	- Short-lived (seconds to minutes typically)
    63	
    64	**Example activity tasks:**
    65	
    66	- Call payment gateway API
    67	- Write to database
    68	- Send emails or notifications
    69	- Query external services
    70	
    71	### Design Decision Framework
    72	
    73	```
    74	Does it touch external systems? → Activity
    75	Is it orchestration/decision logic? → Workflow
    76	```
    77	
    78	## Core Workflow Patterns
    79	
    80	### 1. Saga Pattern with Compensation
    81	
    82	**Purpose**: Implement distributed transactions with rollback capability
    83	
    84	**Pattern** (Source: temporal.io/blog/compensating-actions-part-of-a-complete-breakfast-with-sagas):
    85	
    86	```
    87	For each step:
    88	  1. Register compensation BEFORE executing
    89	  2. Execute the step (via activity)
    90	  3. On failure, run all compensations in reverse order (LIFO)
    91	```
    92	
    93	**Example: Payment Workflow**
    94	
    95	1. Reserve inventory (compensation: release inventory)
    96	2. Charge payment (compensation: refund payment)
    97	3. Fulfill order (compensation: cancel fulfillment)
    98	
    99	**Critical Requirements:**
   100	
   101	- Compensations must be idempotent
   102	- Register compensation BEFORE executing step
   103	- Run compensations in reverse order
   104	- Handle partial failures gracefully
   105	
   106	### 2. Entity Workflows (Actor Model)
   107	
   108	**Purpose**: Long-lived workflow representing single entity instance
   109	
   110	**Pattern** (Source: docs.temporal.io/evaluate/use-cases-design-patterns):
   111	
   112	- One workflow execution = one entity (cart, account, inventory item)
   113	- Workflow persists for entity lifetime
   114	- Receives signals for state changes
   115	- Supports queries for current state
   116	
   117	**Example Use Cases:**
   118	
   119	- Shopping cart (add items, checkout, expiration)
   120	- Bank account (deposits, withdrawals, balance checks)
   121	- Product inventory (stock updates, reservations)
   122	
   123	**Benefits:**
   124	
   125	- Encapsulates entity behavior
   126	- Guarantees consistency per entity
   127	- Natural event sourcing
   128	
   129	### 3. Fan-Out/Fan-In (Parallel Execution)
   130	
   131	**Purpose**: Execute multiple tasks in parallel, aggregate results
   132	
   133	**Pattern:**
   134	
   135	- Spawn child workflows or parallel activities
   136	- Wait for all to complete
   137	- Aggregate results
   138	- Handle partial failures
   139	
   140	**Scaling Rule** (Source: temporal.io/blog/workflow-engine-principles):
   141	
   142	- Don't scale individual workflows
   143	- For 1M tasks: spawn 1K child workflows × 1K tasks each
   144	- Keep each workflow bounded
   145	
   146	### 4. Async Callback Pattern
   147	
   148	**Purpose**: Wait for external event or human approval
   149	
   150	**Pattern:**
   151	
   152	- Workflow sends request and waits for signal
   153	- External system processes asynchronously
   154	- Sends signal to resume workflow
   155	- Workflow continues with response
   156	
   157	**Use Cases:**
   158	
   159	- Human approval workflows
   160	- Webhook callbacks
   161	- Long-running external processes
   162	
   163	## State Management and Determinism
   164	
   165	### Automatic State Preservation
   166	
   167	**How Temporal Works** (Source: docs.temporal.io/workflows):
   168	
   169	- Complete program state preserved automatically
   170	- Event History records every command and event
   171	- Seamless recovery from crashes
   172	- Applications restore pre-failure state
   173	
   174	### Determinism Constraints
   175	
   176	**Workflows Execute as State Machines**:
   177	
   178	- Replay behavior must be consistent
   179	- Same inputs → identical outputs every time
   180	
   181	**Prohibited in Workflows** (Source: docs.temporal.io/workflows):
   182	
   183	- ❌ Threading, locks, synchronization primitives
   184	- ❌ Random number generation (`random()`)
   185	- ❌ Global state or static variables
   186	- ❌ System time (`datetime.now()`)
   187	- ❌ Direct file I/O or network calls
   188	- ❌ Non-deterministic libraries
   189	
   190	**Allowed in Workflows**:
   191	
   192	- ✅ `workflow.now()` (deterministic time)
   193	- ✅ `workflow.random()` (deterministic random)
   194	- ✅ Pure functions and calculations
   195	- ✅ Calling activities (non-deterministic operations)
   196	
   197	### Versioning Strategies
   198	
   199	**Challenge**: Changing workflow code while old executions still running
   200	
   201	**Solutions**:
   202	
   203	1. **Versioning API**: Use `workflow.get_version()` for safe changes
   204	2. **New Workflow Type**: Create new workflow, route new executions to it
   205	3. **Backward Compatibility**: Ensure old events replay correctly
   206	
   207	## Resilience and Error Handling
   208	
   209	### Retry Policies
   210	
   211	**Default Behavior**: Temporal retries activities forever
   212	
   213	**Configure Retry**:
   214	
   215	- Initial retry interval
   216	- Backoff coefficient (exponential backoff)
   217	- Maximum interval (cap retry delay)
   218	- Maximum attempts (eventually fail)
   219	
   220	**Non-Retryable Errors**:
   221	
   222	- Invalid input (validation failures)
   223	- Business rule violations
   224	- Permanent failures (resource not found)
   225	
   226	### Idempotency Requirements
   227	
   228	**Why Critical** (Source: docs.temporal.io/activities):
   229	
   230	- Activities may execute multiple times
   231	- Network failures trigger retries
   232	- Duplicate execution must be safe
   233	
   234	**Implementation Strategies**:
   235	
   236	- Idempotency keys (deduplication)
   237	- Check-then-act with unique constraints
   238	- Upsert operations instead of insert
   239	- Track processed request IDs
   240	
   241	### Activity Heartbeats
   242	
   243	**Purpose**: Detect stalled long-running activities
   244	
   245	**Pattern**:
   246	
   247	- Activity sends periodic heartbeat
   248	- Includes progress information
   249	- Timeout if no heartbeat received
   250	- Enables progress-based retry
   251	
   252	## Best Practices
   253	
   254	### Workflow Design
   255	
   256	1. **Keep workflows focused** - Single responsibility per workflow
   257	2. **Small workflows** - Use child workflows for scalability
   258	3. **Clear boundaries** - Workflow orchestrates, activities execute
   259	4. **Test locally** - Use time-skipping test environment
   260	
   261	### Activity Design
   262	
   263	1. **Idempotent operations** - Safe to retry
   264	2. **Short-lived** - Seconds to minutes, not hours
   265	3. **Timeout configuration** - Always set timeouts
   266	4. **Heartbeat for long tasks** - Report progress
   267	5. **Error handling** - Distinguish retryable vs non-retryable
   268	
   269	### Common Pitfalls
   270	
   271	**Workflow Violations**:
   272	
   273	- Using `datetime.now()` instead of `workflow.now()`
   274	- Threading or async operations in workflow code
   275	- Calling external APIs directly from workflow
   276	- Non-deterministic logic in workflows
   277	
   278	**Activity Mistakes**:
   279	
   280	- Non-idempotent operations (can't handle retries)
   281	- Missing timeouts (activities run forever)
   282	- No error classification (retry validation errors)
   283	- Ignoring payload limits (2MB per argument)
   284	
   285	### Operational Considerations
   286	
   287	**Monitoring**:
   288	
   289	- Workflow execution duration
   290	- Activity failure rates
   291	- Retry attempts and backoff
   292	- Pending workflow counts
   293	
   294	**Scalability**:
   295	
   296	- Horizontal scaling with workers
   297	- Task queue partitioning
   298	- Child workflow decomposition
   299	- Activity batching when appropriate
   300	
   301	## Additional Resources
   302	
   303	**Official Documentation**:
   304	
   305	- Temporal Core Concepts: docs.temporal.io/workflows
   306	- Workflow Patterns: docs.temporal.io/evaluate/use-cases-design-patterns
   307	- Best Practices: docs.temporal.io/develop/best-practices
   308	- Saga Pattern: temporal.io/blog/saga-pattern-made-easy
   309	
   310	**Key Principles**:
   311	
   312	1. Workflows = orchestration, Activities = external calls
   313	2. Determinism is non-negotiable for workflows
   314	3. Idempotency is critical for activities
   315	4. State preservation is automatic
   316	5. Design for failure and recovery
   317	
     1	---
     2	name: discovery-process
     3	description: Run a full discovery cycle from problem hypothesis to validated solution. Use when a team needs a structured path through framing, interviews, synthesis, and experiments.
     4	intent: >-
     5	  Guide product managers through a complete discovery cycle—from initial problem hypothesis to validated solution—by orchestrating problem framing, customer interviews, synthesis, and experimentation skills into a structured process. Use this to systematically explore problem spaces, validate assumptions, and build confidence before committing to full development—avoiding "build it and they will come" syndrome and ensuring you're solving real customer problems.
     6	type: workflow
     7	theme: discovery-research
     8	best_for:
     9	  - "Running a full discovery cycle from hypothesis to validated solution"
    10	  - "Investigating a retention or churn problem systematically"
    11	  - "Setting up continuous discovery as an ongoing practice"
    12	scenarios:
    13	  - "I have a hypothesis that B2B customers struggle with onboarding and want to validate it before building anything"
    14	  - "Our activation rate dropped 15% this quarter and I need to run discovery to find out why"
    15	estimated_time: "30-60 min"
    16	---
    17	
    18	
    19	## Purpose
    20	Guide product managers through a complete discovery cycle—from initial problem hypothesis to validated solution—by orchestrating problem framing, customer interviews, synthesis, and experimentation skills into a structured process. Use this to systematically explore problem spaces, validate assumptions, and build confidence before committing to full development—avoiding "build it and they will come" syndrome and ensuring you're solving real customer problems.
    21	
    22	This is not a one-time research project—it's a continuous discovery practice that runs in parallel with delivery, typically 1-2 discovery cycles per quarter.
    23	
    24	## Key Concepts
    25	
    26	### What is the Discovery Process?
    27	
    28	The discovery process (Teresa Torres, Marty Cagan) is a structured approach to exploring problem spaces and validating solutions before building. It consists of:
    29	
    30	1. **Frame the Problem** — Define what you're investigating and why
    31	2. **Conduct Research** — Gather qualitative and quantitative evidence
    32	3. **Synthesize Insights** — Identify patterns, pain points, and opportunities
    33	4. **Generate Solutions** — Explore multiple solution options
    34	5. **Validate Solutions** — Test assumptions through experiments
    35	6. **Decide & Document** — Commit to build, pivot, or kill
    36	
    37	### Why This Works
    38	- **De-risks product decisions:** Tests assumptions before expensive builds
    39	- **Customer-centric:** Grounds decisions in real customer problems, not internal opinions
    40	- **Iterative:** Builds confidence progressively through small experiments
    41	- **Fast learning:** Discovers "no-go" signals early, saves wasted effort
    42	
    43	### Anti-Patterns (What This Is NOT)
    44	- **Not waterfall research:** Discovery runs continuously, not once before dev
    45	- **Not user testing:** Discovery validates problems; testing validates solutions
    46	- **Not a substitute for shipping:** Discovery informs delivery, doesn't replace it
    47	
    48	### When to Use This
    49	- Exploring new product/feature areas
    50	- Investigating retention or churn problems
    51	- Validating strategic initiatives before roadmap commitment
    52	- Continuous discovery (weekly customer touchpoints)
    53	
    54	### When NOT to Use This
    55	- For well-understood problems (move to execution)
    56	- When stakeholders have already committed to a solution (address alignment first)
    57	- For tactical bug fixes or technical debt (no discovery needed)
    58	
    59	---
    60	
    61	### Facilitation Source of Truth
    62	
    63	When running this workflow as a guided conversation, use [`workshop-facilitation`](../workshop-facilitation/SKILL.md) as the interaction protocol.
    64	
    65	It defines:
    66	- session heads-up + entry mode (Guided, Context dump, Best guess)
    67	- one-question turns with plain-language prompts
    68	- progress labels (for example, Context Qx/8 and Scoring Qx/5)
    69	- interruption handling and pause/resume behavior
    70	- numbered recommendations at decision points
    71	- quick-select numbered response options for regular questions (include `Other (specify)` when useful)
    72	
    73	This file defines the workflow sequence and domain-specific outputs. If there is a conflict, follow this file's workflow logic.
    74	
    75	## Application
    76	
    77	Use `template.md` for the full fill-in structure.
    78	
    79	This workflow orchestrates **6 phases** over **2-4 weeks**, using multiple component and interactive skills.
    80	
    81	---
    82	
    83	## Phase 1: Frame the Problem (Day 1-2)
    84	
    85	**Goal:** Define what you're investigating, who's affected, and success criteria.
    86	
    87	### Activities
    88	
    89	**1. Run Problem Framing Canvas**
    90	- **Use:** `skills/problem-framing-canvas/SKILL.md` (interactive - MITRE)
    91	- **Participants:** PM, design, engineering lead
    92	- **Duration:** 120 minutes
    93	- **Output:** Problem statement + "How Might We" question
    94	
    95	**2. Create Formal Problem Statement**
    96	- **Use:** `skills/problem-statement/SKILL.md` (component)
    97	- **Participants:** PM
    98	- **Duration:** 30 minutes
    99	- **Output:** Structured problem statement with hypothesis
   100	
   101	**3. Define Proto-Personas (If Needed)**
   102	- **Use:** `skills/proto-persona/SKILL.md` (component)
   103	- **When:** If target customer segment is unclear
   104	- **Duration:** 60 minutes
   105	- **Output:** Hypothesis-driven personas
   106	
   107	**4. Map Jobs-to-be-Done (If Needed)**
   108	- **Use:** `skills/jobs-to-be-done/SKILL.md` (component)
   109	- **When:** If customer motivations are unclear
   110	- **Duration:** 60 minutes
   111	- **Output:** JTBD statements
   112	
   113	### Outputs from Phase 1
   114	
   115	- **Problem hypothesis:** "We believe [persona] struggles with [problem] because [root cause], leading to [consequence]."
   116	- **Research questions:** 3-5 questions to answer through discovery
   117	- **Success criteria:** What would validate/invalidate the problem?
   118	
   119	### Decision Point 1: Do we have enough context to start research?
   120	
   121	**If YES:** Proceed to Phase 2 (Research Planning)
   122	
   123	**If NO:** Gather existing data first:
   124	- Review support tickets, churn surveys, NPS feedback
   125	- Analyze product analytics (drop-off points, usage patterns)
   126	- Review competitor research, market trends
   127	- **Time impact:** +2-3 days
   128	
   129	---
   130	
   131	## Phase 2: Research Planning (Day 3)
   132	
   133	**Goal:** Design research approach, recruit participants, prepare interview guide.
   134	
   135	### Activities
   136	
   137	**1. Prep Discovery Interviews**
   138	- **Use:** `skills/discovery-interview-prep/SKILL.md` (interactive)
   139	- **Participants:** PM, design
   140	- **Duration:** 90 minutes
   141	- **Output:** Interview plan with methodology, questions, biases to avoid
   142	
   143	**2. Recruit Participants**
   144	- **Target:** 5-10 customers per discovery cycle (Teresa Torres: continuous discovery = 1 interview/week)
   145	- **Segment:** Focus on personas from Phase 1
   146	- **Recruitment channels:**
   147	  - Existing customers (email, in-app prompts)
   148	  - Churned customers (exit interviews)
   149	  - Cold outreach (LinkedIn, communities)
   150	- **Incentive:** $50-100 gift card or product credit
   151	- **Duration:** 2-3 days (parallel with Phase 1)
   152	
   153	**3. Schedule Interviews**
   154	- **Format:** 45-60 min per interview (30-40 min conversation + buffer)
   155	- **Timeline:** Spread across 1-2 weeks
   156	- **Recording:** Get consent, record for synthesis
   157	
   158	### Outputs from Phase 2
   159	
   160	- **Interview guide:** 5-7 open-ended questions (Mom Test style)
   161	- **Participant roster:** 5-10 scheduled interviews
   162	- **Synthesis plan:** How you'll capture and analyze insights
   163	
   164	---
   165	
   166	## Phase 3: Conduct Research (Week 1-2)
   167	
   168	**Goal:** Gather qualitative evidence through customer interviews.
   169	
   170	### Activities
   171	
   172	**1. Conduct Discovery Interviews**
   173	- **Methodology:** From `skills/discovery-interview-prep/SKILL.md` (Problem validation, JTBD, switch interviews, etc.)
   174	- **Participants:** PM + optional observer (design, eng)
   175	- **Duration:** 5-10 interviews over 1-2 weeks
   176	- **Focus areas:**
   177	  - Past behavior (not hypotheticals): "Tell me about the last time you [experienced this problem]"
   178	  - Workarounds: "How do you currently handle this?"
   179	  - Alternatives tried: "Have you tried other solutions? Why did you stop?"
   180	  - Pain intensity: "How much time/money does this cost you?"
   181	
   182	**2. Take Structured Notes**
   183	- **Template:**
   184	  - Participant: [Name, role, company size]
   185	  - Context: [When/where they experience problem]
   186	  - Actions: [What they do, step-by-step]
   187	  - Pain points: [Frustrations, blockers]
   188	  - Workarounds: [Current solutions]
   189	  - Quotes: [Verbatim customer language]
   190	  - Insights: [Patterns, surprises]
   191	
   192	**3. Review Support Tickets & Analytics (Parallel)**
   193	- **Support tickets:** Tag by theme (onboarding, feature confusion, bugs)
   194	- **Analytics:** Identify drop-off points, feature usage, cohort behavior
   195	- **Surveys:** Review NPS comments, exit surveys, feature requests
   196	
   197	### Outputs from Phase 3
   198	
   199	- **Interview transcripts:** Recorded sessions + detailed notes
   200	- **Support ticket themes:** Top 10 issues by frequency
   201	- **Analytics insights:** Quantitative data on behavior (e.g., "60% abandon onboarding at step 3")
   202	
   203	### Decision Point 2: Have we reached saturation?
   204	
   205	**Saturation = same pain points emerge across 3+ interviews, no new insights**
   206	
   207	**If YES (saturated after 5-7 interviews):** Proceed to Phase 4 (Synthesis)
   208	
   209	**If NO (still learning new things):** Schedule 3-5 more interviews
   210	- **Time impact:** +1 week
   211	
   212	---
   213	
   214	## Phase 4: Synthesize Insights (End of Week 2)
   215	
   216	**Goal:** Identify patterns, prioritize pain points, map opportunities.
   217	
   218	### Activities
   219	
   220	**1. Affinity Mapping (Thematic Analysis)**
   221	- **Method:**
	< truncated lines 222-284 >
   285	- **Timeline:** 1-2 weeks per experiment
   286	- **Participants:** PM + design (for prototypes), eng (for A/B tests)
   287	- **Output:** Quantitative and qualitative validation data
   288	
   289	### Outputs from Phase 5
   290	
   291	- **Solution options:** 3-9 solutions (3 per opportunity)
   292	- **Experiment results:** Did hypothesis validate or invalidate?
   293	- **Customer feedback:** Qualitative reactions to prototypes/concepts
   294	
   295	### Decision Point 3: Did experiments validate solution?
   296	
   297	**If YES (validated):** Proceed to Phase 6 (Decide & Document)
   298	
   299	**If NO (invalidated):**
   300	- Pivot to next solution option
   301	- Re-run experiments with adjusted approach
   302	- **Time impact:** +1-2 weeks
   303	
   304	---
   305	
   306	## Phase 6: Decide & Document (End of Week 3-4)
   307	
   308	**Goal:** Commit to build, document decision, communicate to stakeholders.
   309	
   310	### Activities
   311	
   312	**1. Make Go/No-Go Decision**
   313	- **Criteria:**
   314	  - Problem validated? (Phase 3-4)
   315	  - Solution validated? (Phase 5)
   316	  - Strategic fit? (aligns with business goals)
   317	  - Feasible? (engineering capacity, technical complexity)
   318	- **Decision:**
   319	  - **GO:** Move to roadmap, write epics/stories
   320	  - **PIVOT:** Explore alternative solution
   321	  - **KILL:** De-prioritize, not worth solving now
   322	
   323	**2. Define Epic Hypotheses (If GO)**
   324	- **Use:** `skills/epic-hypothesis/SKILL.md` (component)
   325	- **Participants:** PM
   326	- **Duration:** 60 minutes per epic
   327	- **Output:** Epic hypothesis statement with success criteria
   328	
   329	**3. Write PRD (If GO)**
   330	- **Use:** `skills/prd-development/SKILL.md` (workflow)
   331	- **Participants:** PM
   332	- **Duration:** 1-2 days
   333	- **Output:** Structured PRD with problem, solution, success metrics
   334	
   335	**4. Communicate Findings**
   336	- **Format:** 30-min readout covering:
   337	  - Problem validation (Phase 3-4 insights)
   338	  - Solution validation (Phase 5 experiments)
   339	  - Recommendation (GO/PIVOT/KILL)
   340	- **Participants:** Execs, product leadership, key stakeholders
   341	- **Output:** Alignment on next steps
   342	
   343	### Outputs from Phase 6
   344	
   345	- **Decision:** GO, PIVOT, or KILL
   346	- **Epic hypotheses:** (if GO) Testable epic statements
   347	- **PRD:** (if GO) Formal product requirements document
   348	- **Stakeholder alignment:** Exec buy-in on recommendation
   349	
   350	---
   351	
   352	## Complete Workflow: End-to-End Summary
   353	
   354	```
   355	Week 1:
   356	├─ Day 1-2: Frame the Problem
   357	│  ├─ skills/problem-framing-canvas/SKILL.md (120 min)
   358	│  ├─ skills/problem-statement/SKILL.md (30 min)
   359	│  └─ [Optional] skills/proto-persona/SKILL.md, skills/jobs-to-be-done/SKILL.md
   360	│
   361	├─ Day 3: Research Planning
   362	│  ├─ skills/discovery-interview-prep/SKILL.md (90 min)
   363	│  ├─ Recruit participants (2-3 days)
   364	│  └─ Schedule 5-10 interviews
   365	│
   366	└─ Day 4-5: Conduct Research (Start)
   367	   └─ First 2-3 customer interviews
   368	
   369	Week 2:
   370	├─ Day 1-3: Conduct Research (Continue)
   371	│  └─ Remaining customer interviews (3-7 more)
   372	│
   373	├─ Day 4-5: Synthesize Insights
   374	│  ├─ Affinity mapping (120 min)
   375	│  ├─ [Optional] skills/customer-journey-mapping-workshop/SKILL.md (90 min)
   376	│  ├─ Prioritize pain points
   377	│  └─ Update problem statement
   378	│
   379	└─ Decision: Reached saturation? (if NO, +1 week more interviews)
   380	
   381	Week 3:
   382	├─ Day 1-2: Generate & Validate Solutions
   383	│  ├─ skills/opportunity-solution-tree/SKILL.md (90 min)
   384	│  └─ Design experiments
   385	│
   386	├─ Day 3-5: Run Experiments
   387	│  ├─ Concierge tests, prototypes, or A/B tests
   388	│  └─ Gather validation data
   389	│
   390	└─ Decision: Validated? (if NO, pivot to next solution, +1-2 weeks)
   391	
   392	Week 4:
   393	└─ Decide & Document
   394	   ├─ Make GO/NO-GO decision
   395	   ├─ [If GO] skills/epic-hypothesis/SKILL.md (60 min per epic)
   396	   ├─ [If GO] skills/prd-development/SKILL.md (1-2 days)
   397	   └─ Communicate findings (30 min readout)
   398	```
   399	
   400	**Total Time Investment:**
   401	- **Fast track:** 3 weeks (5 interviews, 1 experiment)
   402	- **Typical:** 4 weeks (7-10 interviews, 1-2 experiments)
   403	- **Thorough:** 6-8 weeks (10+ interviews, multiple experiment rounds)
   404	
   405	---
   406	
   407	## Examples
   408	
   409	See `examples/sample.md` for a full discovery process example.
   410	
   411	Mini example excerpt:
   412	
   413	```markdown
   414	**Problem:** Onboarding drop-off due to jargon
   415	**Insight:** 6/10 users quit at step 3
   416	**Decision:** Go with guided checklist experiment
   417	```
   418	
   419	## Common Pitfalls
   420	
   421	### Pitfall 1: Skipping Customer Interviews
   422	**Symptom:** Rely only on analytics and support tickets, no qualitative research
   423	
   424	**Consequence:** Miss "why" behind behavior, build wrong solutions
   425	
   426	**Fix:** Always interview 5-10 customers per discovery cycle (even if you have data)
   427	
   428	---
   429	
   430	### Pitfall 2: Asking Leading Questions
   431	**Symptom:** "Would you use [feature X] if we built it?"
   432	
   433	**Consequence:** Confirmation bias, customers say "yes" to be polite
   434	
   435	**Fix:** Use Mom Test questions from `skills/discovery-interview-prep/SKILL.md` (focus on past behavior)
   436	
   437	---
   438	
   439	### Pitfall 3: Not Reaching Saturation
   440	**Symptom:** Interview 2-3 customers, declare discovery complete
   441	
   442	**Consequence:** Small sample, not representative
   443	
   444	**Fix:** Continue interviews until same patterns emerge across 3+ customers (typically 5-7 interviews minimum)
   445	
   446	---
   447	
   448	### Pitfall 4: Analysis Paralysis
   449	**Symptom:** Spend 6 weeks synthesizing insights, never move to solutions
   450	
   451	**Consequence:** No delivery, team loses momentum
   452	
   453	**Fix:** Time-box discovery to 3-4 weeks; after Phase 6, move to execution
   454	
   455	---
   456	
   457	### Pitfall 5: Discovery as One-Time Activity
   458	**Symptom:** Run discovery once before building, then stop
   459	
   460	**Consequence:** Miss evolving customer needs, market changes
   461	
   462	**Fix:** Continuous discovery (Teresa Torres): 1 customer interview per week, ongoing
   463	
   464	---
   465	
   466	## References
   467	
   468	### Related Skills (Orchestrated by This Workflow)
   469	
   470	**Phase 1:**
   471	- `skills/problem-framing-canvas/SKILL.md` (interactive)
   472	- `skills/problem-statement/SKILL.md` (component)
   473	- `skills/proto-persona/SKILL.md` (component, optional)
   474	- `skills/jobs-to-be-done/SKILL.md` (component, optional)
   475	
   476	**Phase 2:**
   477	- `skills/discovery-interview-prep/SKILL.md` (interactive)
   478	
   479	**Phase 4:**
   480	- `skills/customer-journey-mapping-workshop/SKILL.md` (interactive, optional)
   481	
   482	**Phase 5:**
   483	- `skills/opportunity-solution-tree/SKILL.md` (interactive)
   484	- `skills/lean-ux-canvas/SKILL.md` (interactive, alternative)
   485	
   486	**Phase 6:**
   487	- `skills/epic-hypothesis/SKILL.md` (component)
   488	- `skills/prd-development/SKILL.md` (workflow)
   489	
   490	### External Frameworks
   491	- Teresa Torres, *Continuous Discovery Habits* (2021) — Weekly customer touchpoints, OST framework
   492	- Rob Fitzpatrick, *The Mom Test* (2013) — How to ask good interview questions
   493	- Marty Cagan, *Inspired* (2017) — Product discovery principles
   494	
   495	### Dean's Work
   496	- Productside Blueprint — Strategic discovery process
   497	- [If Dean has discovery resources, link here]
   498	
   499	---
   500	
   501	**Skill type:** Workflow
   502	**Suggested filename:** `discovery-process.md`
   503	**Suggested placement:** `/skills/workflows/`
   504	**Dependencies:** Orchestrates 10+ component and interactive skills across 6 phases
   505	
     1	---
     2	name: problem-statement
     3	description: Write a user-centered problem statement with who is blocked, what they are trying to do, why it matters, and how it feels. Use when framing discovery, prioritization, or a PRD.
     4	intent: >-
     5	  Articulate a problem from the user's perspective using an empathy-driven framework that captures who they are, what they're trying to do, what's blocking them, why, and how it makes them feel. Use this to align stakeholders on the problem before jumping to solutions, and to frame product work around user outcomes rather than feature requests.
     6	type: component
     7	---
     8	
     9	
    10	## Purpose
    11	Articulate a problem from the user's perspective using an empathy-driven framework that captures who they are, what they're trying to do, what's blocking them, why, and how it makes them feel. Use this to align stakeholders on the problem before jumping to solutions, and to frame product work around user outcomes rather than feature requests.
    12	
    13	This is not a requirements doc—it's a human-centered problem narrative that ensures you're solving a problem worth solving.
    14	
    15	## Key Concepts
    16	
    17	### The Problem Framing Framework
    18	Based on Jobs-to-be-Done and empathy mapping, the framework structures problems as:
    19	
    20	**Problem Framing Narrative:**
    21	- **I am:** [Describe the persona experiencing the problem]
    22	- **Trying to:** [Desired outcomes the persona cares about]
    23	- **But:** [Barriers preventing the outcomes]
    24	- **Because:** [Root cause of the problem]
    25	- **Which makes me feel:** [Emotional impact]
    26	
    27	**Context & Constraints:**
    28	- [Geographic, technological, time-based, demographic factors]
    29	
    30	**Final Problem Statement:**
    31	- [Single, concise, empathetic summary]
    32	
    33	### Why This Structure Works
    34	- **Persona-centric:** Forces you to see the problem through the user's eyes
    35	- **Outcome-focused:** "Trying to" emphasizes desired results, not tasks
    36	- **Root cause analysis:** "Because" pushes past symptoms to underlying issues
    37	- **Emotional validation:** "Makes me feel" humanizes the problem and builds empathy
    38	- **Contextual:** Constraints acknowledge real-world limitations
    39	
    40	### Anti-Patterns (What This Is NOT)
    41	- **Not a solution in disguise:** "The problem is we lack AI-powered analytics" = sneaking in a solution
    42	- **Not a business problem:** "Our revenue is down" isn't a user problem (it's a symptom)
    43	- **Not a feature request:** "Users need a dashboard" isn't a problem (what are they trying to do?)
    44	- **Not generic:** "Users want better UX" is too vague to be actionable
    45	
    46	### When to Use This
    47	- Kicking off discovery or problem validation work
    48	- Aligning stakeholders before solutioning
    49	- Socializing a problem with engineering, design, or exec teams
    50	- When you have feature requests but unclear underlying problems
    51	- Pitching why a problem is worth solving
    52	
    53	### When NOT to Use This
    54	- When you haven't done any user research yet (don't guess—interview first)
    55	- For internal operational problems (this is for user-facing problems)
    56	- As a substitute for a PRD (this frames the problem; PRD defines the solution)
    57	
    58	---
    59	
    60	## Application
    61	
    62	Use `template.md` for the full fill-in structure.
    63	
    64	### Step 1: Gather User Context
    65	Before drafting, ensure you have:
    66	- **User interviews or research:** Direct quotes, observed behaviors, pain points
    67	- **Jobs-to-be-Done insights:** What users are "hiring" your product to do (reference `skills/jobs-to-be-done/SKILL.md`)
    68	- **Persona clarity:** Who specifically experiences this problem (reference `skills/proto-persona/SKILL.md`)
    69	- **Constraints data:** Geographic, tech, time, demographic limitations
    70	
    71	**If missing context:** Run discovery interviews, contextual inquiries, or user shadowing. Don't fabricate problems.
    72	
    73	---
    74	
    75	### Step 2: Draft the Problem Framing Narrative
    76	
    77	Fill in the template from the persona's point of view:
    78	
    79	```markdown
    80	## Problem Framing Narrative
    81	
    82	**I am:** [Describe the key persona, highlighting 3-4 key characteristics]
    83	- [Key pain point or characteristic 1]
    84	- [Key pain point or characteristic 2]
    85	- [Key pain point or characteristic 3]
    86	
    87	**Trying to:**
    88	- [Single sentence listing the desired outcomes the persona cares most about]
    89	
    90	**But:**
    91	- [Describe the barriers preventing the persona from achieving outcomes]
    92	- [Job-to-be-done or outcome obstruction 1]
    93	- [Job-to-be-done or outcome obstruction 2]
    94	- [Job-to-be-done or outcome obstruction 3]
    95	
    96	**Because:**
    97	- [Describe the root cause empathetically]
    98	
    99	**Which makes me feel:**
   100	- [Describe the emotions from the persona's perspective]
   101	```
   102	
   103	**Quality checks:**
   104	- **"I am" specificity:** Can you picture this person? Or is it generic ("busy professionals")?
   105	- **"Trying to" clarity:** Is this an outcome (measurable) or a task (activity)?
   106	- **"But" depth:** Are these real barriers or just inconveniences?
   107	- **"Because" honesty:** Is this the root cause or just a symptom?
   108	- **"Makes me feel" authenticity:** Do these emotions come from research or assumptions?
   109	
   110	---
   111	
   112	### Step 3: Document Context & Constraints
   113	
   114	```markdown
   115	## Context & Constraints
   116	
   117	- [Enumerate geographic, technological, time-based, or demographic factors]
   118	- [e.g., "Must work offline in rural areas with limited connectivity"]
   119	- [e.g., "Used by non-technical users unfamiliar with complex software"]
   120	- [e.g., "Time-sensitive: decisions must be made within 24 hours"]
   121	```
   122	
   123	**Quality checks:**
   124	- **Relevance:** Do these constraints directly impact the problem?
   125	- **Specificity:** Are they concrete enough to inform design decisions?
   126	
   127	---
   128	
   129	### Step 4: Craft the Final Problem Statement
   130	
   131	Synthesize the narrative into one powerful sentence:
   132	
   133	```markdown
   134	## Final Problem Statement
   135	
   136	[Single, concise statement that provides a powerful and empathetic summary]
   137	```
   138	
   139	**Formula:** `[Persona] needs a way to [desired outcome] because [root cause], which currently [emotional/practical impact].`
   140	
   141	**Example:** "Enterprise IT admins need a way to provision user accounts in under 5 minutes because current processes take 2+ hours with manual approvals, which causes project delays and frustrated end-users."
   142	
   143	**Quality checks:**
   144	- **One sentence:** If it requires multiple sentences, the problem isn't crisp yet
   145	- **Measurable:** Can you tell if you've solved it?
   146	- **Empathetic:** Does it resonate emotionally?
   147	- **Shareable:** Could you say this in a meeting and have stakeholders nod?
   148	
   149	---
   150	
   151	### Step 5: Validate and Socialize
   152	
   153	- **Test with users:** Read it aloud to people who experience the problem. Do they say "Yes, exactly!"?
   154	- **Share with stakeholders:** Product, engineering, design, exec. Does it align everyone?
   155	- **Iterate based on feedback:** If anyone says "I don't think that's the real problem," dig deeper.
   156	
   157	---
   158	
   159	## Examples
   160	
   161	See `examples/sample.md` for full examples (good and bad problem statements).
   162	
   163	Mini example excerpt:
   164	
   165	```markdown
   166	**I am:** A software developer on a distributed team
   167	**Trying to:** Communicate in real-time with my team without losing context
   168	**But:** Email is too slow and IM is ephemeral
   169	**Because:** No tool combines real-time chat with searchable history
   170	**Which makes me feel:** Frustrated and disconnected
   171	```
   172	
   173	---
   174	
   175	## Common Pitfalls
   176	
   177	### Pitfall 1: Solution Smuggling
   178	**Symptom:** "The problem is we don't have [specific feature]"
   179	
   180	**Consequence:** You've predetermined the solution without validating the problem.
   181	
   182	**Fix:** Reframe around the user's desired outcome, not the feature. Ask "What are they trying to achieve?"
   183	
   184	---
   185	
   186	### Pitfall 2: Business Problem Disguised as User Problem
   187	**Symptom:** "Users want to increase our revenue" or "The problem is our churn rate"
   188	
   189	**Consequence:** These are company problems, not user problems. Users don't care about your metrics.
   190	
   191	**Fix:** Dig into *why* users churn or *what* would make them spend more. Frame it from their perspective.
   192	
   193	---
   194	
   195	### Pitfall 3: Generic Personas
   196	**Symptom:** "I am a busy professional trying to be more productive"
   197	
   198	**Consequence:** Too broad to be actionable. Every product claims to help "busy professionals."
   199	
   200	**Fix:** Get specific. "I am a sales rep managing 50+ leads manually in spreadsheets, trying to prioritize follow-ups without missing high-value opportunities."
   201	
   202	---
   203	
   204	### Pitfall 4: Symptom Instead of Root Cause
   205	**Symptom:** "Because the UI is confusing"
   206	
   207	**Consequence:** You're describing a symptom, not the underlying issue.
   208	
   209	**Fix:** Ask "Why is the UI confusing?" Keep asking "why" until you hit the root cause (e.g., "Because users have no mental model for how the system works").
   210	
   211	---
   212	
   213	### Pitfall 5: Fabricated Emotions
   214	**Symptom:** "Which makes me feel empowered and delighted"
   215	
   216	**Consequence:** These sound like marketing copy, not real user emotions.
   217	
   218	**Fix:** Use actual quotes from user interviews. Real emotions: "frustrated," "overwhelmed," "anxious," "stuck."
   219	
   220	---
   221	
   222	## References
   223	
   224	### Related Skills
   225	- `skills/jobs-to-be-done/SKILL.md` — Informs the "Trying to" and "But" sections
   226	- `skills/proto-persona/SKILL.md` — Defines the "I am" persona
   227	- `skills/positioning-statement/SKILL.md` — Problem statement informs positioning
   228	- `skills/user-story/SKILL.md` — Problem statement guides story prioritization
   229	
   230	### External Frameworks
   231	- Clayton Christensen, *Jobs to Be Done* — Origin of outcome-focused problem framing
   232	- Osterwalder & Pigneur, *Value Proposition Canvas* — Customer pains/gains/jobs
   233	- Dave Gray, *Empathy Mapping* — Emotional framing techniques
   234	
   235	### Dean's Work
   236	- [Link to relevant Dean Peters' Substack articles if applicable]
   237	
   238	### Provenance
   239	- Adapted from `prompts/framing-the-problem-statement.md` in the `https://github.com/deanpeters/product-manager-prompts` repo.
   240	
   241	---
   242	
   243	**Skill type:** Component
   244	**Suggested filename:** `problem-statement.md`
   245	**Suggested placement:** `/skills/components/`
   246	**Dependencies:** References `skills/jobs-to-be-done/SKILL.md`, `skills/proto-persona/SKILL.md`
   247	
     1	---
     2	name: prd-development
     3	description: Build a structured PRD that connects problem, users, solution, and success criteria. Use when turning discovery notes into an engineering-ready document for a major initiative.
     4	intent: >-
     5	  Guide product managers through structured PRD (Product Requirements Document) creation by orchestrating problem framing, user research synthesis, solution definition, and success criteria into a cohesive document. Use this to move from scattered notes and Slack threads to a clear, comprehensive PRD that aligns stakeholders, provides engineering context, and serves as a source of truth—avoiding ambiguity, scope creep, and the "build what's in my head" trap.
     6	type: workflow
     7	theme: pm-artifacts
     8	best_for:
     9	  - "Writing a complete PRD from scratch"
    10	  - "Structuring product requirements for an engineering handoff"
    11	  - "Documenting a major new feature before development begins"
    12	scenarios:
    13	  - "I need a PRD for a new AI-powered recommendation feature in our e-commerce platform"
    14	  - "I've completed a discovery sprint and need to turn the findings into a PRD my engineers can act on"
    15	estimated_time: "60-120 min"
    16	---
    17	
    18	
    19	## Purpose
    20	Guide product managers through structured PRD (Product Requirements Document) creation by orchestrating problem framing, user research synthesis, solution definition, and success criteria into a cohesive document. Use this to move from scattered notes and Slack threads to a clear, comprehensive PRD that aligns stakeholders, provides engineering context, and serves as a source of truth—avoiding ambiguity, scope creep, and the "build what's in my head" trap.
    21	
    22	This is not a waterfall spec—it's a living document that captures strategic context, customer problems, proposed solutions, and success criteria, evolving as you learn through delivery.
    23	
    24	## Key Concepts
    25	
    26	### What is a PRD?
    27	
    28	A PRD (Product Requirements Document) is a structured document that answers:
    29	1. **What problem are we solving?** (Problem statement)
    30	2. **For whom?** (Target users/personas)
    31	3. **Why now?** (Strategic context, business case)
    32	4. **What are we building?** (Solution overview)
    33	5. **How will we measure success?** (Metrics, success criteria)
    34	6. **What are the requirements?** (User stories, acceptance criteria, constraints)
    35	7. **What are we NOT building?** (Out of scope)
    36	
    37	### PRD Structure (Standard Template)
    38	
    39	```markdown
    40	# [Feature/Product Name] PRD
    41	
    42	## 1. Executive Summary
    43	- One-paragraph overview (problem + solution + impact)
    44	
    45	## 2. Problem Statement
    46	- Who has this problem?
    47	- What is the problem?
    48	- Why is it painful?
    49	- Evidence (customer quotes, data, research)
    50	
    51	## 3. Target Users & Personas
    52	- Primary persona(s)
    53	- Secondary persona(s)
    54	- Jobs-to-be-done
    55	
    56	## 4. Strategic Context
    57	- Business goals (OKRs)
    58	- Market opportunity (TAM/SAM/SOM)
    59	- Competitive landscape
    60	- Why now?
    61	
    62	## 5. Solution Overview
    63	- High-level description
    64	- User flows or wireframes
    65	- Key features
    66	
    67	## 6. Success Metrics
    68	- Primary metric (what we're optimizing for)
    69	- Secondary metrics
    70	- Targets (current → goal)
    71	
    72	## 7. User Stories & Requirements
    73	- Epic hypothesis
    74	- User stories with acceptance criteria
    75	- Edge cases, constraints
    76	
    77	## 8. Out of Scope
    78	- What we're NOT building (and why)
    79	
    80	## 9. Dependencies & Risks
    81	- Technical dependencies
    82	- External dependencies (integrations, partnerships)
    83	- Risks and mitigations
    84	
    85	## 10. Open Questions
    86	- Unresolved decisions
    87	- Areas requiring discovery
    88	```
    89	
    90	### Why This Works
    91	- **Alignment:** Ensures everyone (PM, design, eng, stakeholders) understands the "why"
    92	- **Context preservation:** Captures research and strategic rationale for future reference
    93	- **Decision log:** Documents what's in scope, out of scope, and why
    94	- **Execution clarity:** Provides engineering with user stories and acceptance criteria
    95	
    96	### Anti-Patterns (What This Is NOT)
    97	- **Not a detailed spec:** PRDs frame the problem and solution; they don't specify UI pixel-by-pixel
    98	- **Not waterfall:** PRDs evolve as you learn; they're not frozen contracts
    99	- **Not a substitute for collaboration:** PRDs complement conversation, not replace it
   100	
   101	### When to Use This
   102	- Starting a major feature or product initiative
   103	- Aligning cross-functional teams on scope and requirements
   104	- Documenting decisions for future reference
   105	- Onboarding new team members to a project
   106	
   107	### When NOT to Use This
   108	- For small bug fixes or trivial features (overkill)
   109	- When problem and solution are already clear and aligned (just write user stories)
   110	- For continuous discovery experiments (use Lean UX Canvas instead)
   111	
   112	---
   113	
   114	### Facilitation Source of Truth
   115	
   116	When running this workflow as a guided conversation, use [`workshop-facilitation`](../workshop-facilitation/SKILL.md) as the interaction protocol.
   117	
   118	It defines:
   119	- session heads-up + entry mode (Guided, Context dump, Best guess)
   120	- one-question turns with plain-language prompts
   121	- progress labels (for example, Context Qx/8 and Scoring Qx/5)
   122	- interruption handling and pause/resume behavior
   123	- numbered recommendations at decision points
   124	- quick-select numbered response options for regular questions (include `Other (specify)` when useful)
   125	
   126	This file defines the workflow sequence and domain-specific outputs. If there is a conflict, follow this file's workflow logic.
   127	
   128	## Application
   129	
   130	Use `template.md` for the full fill-in structure.
   131	
   132	This workflow orchestrates **8 phases** over **2-4 days**, using multiple component and interactive skills.
   133	
   134	---
   135	
   136	## Phase 1: Executive Summary (30 minutes)
   137	
   138	**Goal:** Write a one-paragraph overview for skimmers.
   139	
   140	### Activities
   141	
   142	**1. Draft Executive Summary**
   143	- **Format:** "We're building [solution] for [persona] to solve [problem], which will result in [impact]."
   144	- **Example:**
   145	  > "We're building a guided onboarding checklist for non-technical small business owners to solve the problem of 60% drop-off in the first 24 hours due to lack of guidance, which will increase activation rate from 40% to 60% and reduce churn by 10%."
   146	
   147	- **Participants:** PM
   148	- **Duration:** 30 minutes
   149	- **Output:** One-paragraph summary
   150	
   151	**Tip:** Write this first (forces clarity), but refine it last (after other sections are complete).
   152	
   153	---
   154	
   155	## Phase 2: Problem Statement (60 minutes)
   156	
   157	**Goal:** Frame the customer problem with evidence.
   158	
   159	### Activities
   160	
   161	**1. Write Problem Statement**
   162	- **Use:** `skills/problem-statement/SKILL.md` (component)
   163	- **Input:** Discovery insights from `skills/discovery-process/SKILL.md` or `skills/problem-framing-canvas/SKILL.md`
   164	- **Participants:** PM
   165	- **Duration:** 30 minutes
   166	- **Output:** Structured problem statement
   167	
   168	**Example Problem Statement:**
   169	
   170	```markdown
   171	## 2. Problem Statement
   172	
   173	### Who has this problem?
   174	Non-technical small business owners (solopreneurs, 1-10 employees) who sign up for our SaaS product.
   175	
   176	### What is the problem?
   177	60% of users abandon onboarding within the first 24 hours because they don't know what to do first. They see an empty dashboard with no guidance, get overwhelmed by options, and leave.
   178	
   179	### Why is it painful?
   180	- **User impact:** Wastes time (30-60 min trying to figure out product), never reaches "aha moment," churns before experiencing value
   181	- **Business impact:** 60% activation rate → high churn, low LTV, poor word-of-mouth
   182	
   183	### Evidence
   184	- **Interviews:** 8/10 churned users said "I didn't know what to do first" (discovery interviews, Feb 2026)
   185	- **Analytics:** 60% of signups complete 0 actions within 24 hours (Mixpanel, Jan 2026)
   186	- **Support tickets:** "How do I get started?" is #1 support question (350 tickets/month)
   187	- **Customer quote:** "I logged in, saw an empty dashboard, and thought 'now what?' I gave up and went back to my spreadsheet."
   188	```
   189	
   190	**2. Add Supporting Context (Optional)**
   191	- **Customer journey map:** If problem spans multiple touchpoints
   192	- **Use:** `skills/customer-journey-mapping-workshop/SKILL.md` output
   193	- **Jobs-to-be-done:** If motivations are key
   194	- **Use:** `skills/jobs-to-be-done/SKILL.md` output
   195	
   196	### Outputs from Phase 2
   197	
   198	- **Problem statement:** Who, what, why, evidence
   199	- **Supporting artifacts:** Journey map, JTBD (if relevant)
   200	
   201	---
   202	
   203	## Phase 3: Target Users & Personas (30 minutes)
   204	
   205	**Goal:** Define who you're building for.
   206	
   207	### Activities
   208	
   209	**1. Document Personas**
   210	- **Use:** `skills/proto-persona/SKILL.md` (component) output
   211	- **Participants:** PM
   212	- **Duration:** 30 minutes
   213	- **Format:** Include persona name, role, goals, pain points, behaviors
   214	
   215	**Example:**
   216	
   217	```markdown
   218	## 3. Target Users & Personas
   219	
   220	### Primary Persona: Solo Entrepreneur Sam
   221	- **Role:** Freelance consultant, solopreneur
   222	- **Company size:** 1 person (no IT support)
   223	- **Tech savviness:** Low (uses email, spreadsheets, basic SaaS)
   224	- **Goals:** Get value from software fast without technical expertise
   225	- **Pain points:** Overwhelmed by complex UIs, no time to watch tutorials, needs immediate value
   226	- **Current behavior:** Signs up for products, tries for 1 day, churns if not immediately useful
   227	
   228	### Secondary Persona: Small Business Owner (5-10 employees)
	< truncated lines 229-428 >
   429	- [ ] Progress bar updates (1/3 → 2/3 → 3/3)
   430	- [ ] Checklist persists across sessions (if user logs out and back in)
   431	
   432	**Story 3: Celebrate checklist completion**
   433	As a new user, I want to receive positive feedback when I complete the checklist, so I feel confident using the product.
   434	
   435	**Acceptance Criteria:**
   436	- [ ] When user completes all 3 steps, celebration modal appears
   437	- [ ] Message: "You're all set! Here's what to do next: [suggested next actions]"
   438	- [ ] Confetti animation (optional, nice-to-have)
   439	```
   440	
   441	**4. Document Constraints & Edge Cases**
   442	- **Technical constraints:** Platform limitations, browser support, etc.
   443	- **Edge cases:** What if user skips step 2? What if they complete steps out of order?
   444	
   445	### Outputs from Phase 7
   446	
   447	- **Epic hypothesis:** Testable statement
   448	- **User stories:** 3-10 stories with acceptance criteria
   449	- **Constraints:** Technical limitations, edge cases
   450	
   451	---
   452	
   453	## Phase 8: Out of Scope & Dependencies (30 minutes)
   454	
   455	**Goal:** Define what you're NOT building and what you depend on.
   456	
   457	### Activities
   458	
   459	**1. Document Out of Scope**
   460	- **Format:** List features/requests explicitly excluded
   461	- **Rationale:** Why not building now?
   462	
   463	**Example:**
   464	
   465	```markdown
   466	## 8. Out of Scope
   467	
   468	**Not included in this release:**
   469	- **Advanced onboarding personalization** (e.g., different checklists per persona) — Adds complexity, test simple version first
   470	- **Video tutorials embedded in checklist** — Resource-intensive, validate checklist concept first
   471	- **Gamification (badges, points)** — Nice-to-have, focus on core workflow guidance
   472	
   473	**Future consideration:**
   474	- Mobile-optimized onboarding (desktop-first for now)
   475	```
   476	
   477	**2. Document Dependencies**
   478	- **Technical dependencies:** Platform upgrades, API changes required
   479	- **External dependencies:** Third-party integrations, partnerships
   480	- **Team dependencies:** Design handoff, data pipeline work
   481	
   482	**Example:**
   483	
   484	```markdown
   485	## 9. Dependencies & Risks
   486	
   487	### Dependencies
   488	- **Design:** Wireframes for checklist UI (ETA: Week 1)
   489	- **Engineering:** No technical dependencies (uses existing modals framework)
   490	
   491	### Risks & Mitigations
   492	- **Risk:** Users dismiss checklist immediately, never see it
   493	  - **Mitigation:** Track dismissal rate; if >50%, iterate on messaging or timing
   494	- **Risk:** Checklist steps are too generic, don't resonate with all personas
   495	  - **Mitigation:** Start with primary persona (Solo Entrepreneur Sam), personalize later
   496	```
   497	
   498	**3. Document Open Questions**
   499	- **Unresolved decisions:** Areas requiring discovery or discussion
   500	
   501	**Example:**
   502	
   503	```markdown
   504	## 10. Open Questions
   505	
   506	- Should checklist be mandatory or optional? (Decision: Optional, dismissible)
   507	- Should we A/B test checklist vs. no checklist? (Decision: Yes, show to 50% of new users)
   508	- What happens if user completes steps out of order? (Decision: Allow any order, update checklist dynamically)
   509	```
   510	
   511	### Outputs from Phase 8
   512	
   513	- **Out of scope:** What we're NOT building
   514	- **Dependencies:** What we need before starting
   515	- **Risks:** Potential blockers and mitigations
   516	- **Open questions:** Unresolved decisions
   517	
   518	---
   519	
   520	## Complete Workflow: End-to-End Summary
   521	
   522	```
   523	Day 1:
   524	├─ Phase 1: Executive Summary (30 min)
   525	├─ Phase 2: Problem Statement (60 min)
   526	│  └─ Use: skills/problem-statement/SKILL.md
   527	├─ Phase 3: Target Users & Personas (30 min)
   528	│  └─ Use: skills/proto-persona/SKILL.md
   529	└─ Phase 4: Strategic Context (45 min)
   530	   └─ Use: skills/tam-sam-som-calculator/SKILL.md (optional)
   531	
   532	Day 2:
   533	├─ Phase 5: Solution Overview (60 min)
   534	│  └─ Use: skills/user-story-mapping-workshop/SKILL.md (optional)
   535	├─ Phase 6: Success Metrics (30 min)
   536	└─ Phase 7: User Stories & Requirements (90-120 min)
   537	   ├─ Use: skills/epic-hypothesis/SKILL.md
   538	   ├─ Use: skills/epic-breakdown-advisor/SKILL.md
   539	   └─ Use: skills/user-story/SKILL.md
   540	
   541	Day 3:
   542	├─ Phase 8: Out of Scope & Dependencies (30 min)
   543	└─ Review & Refine (60 min)
   544	   └─ Read full PRD, polish, get feedback
   545	
   546	Day 4 (Optional):
   547	└─ Stakeholder Review & Approval
   548	   └─ Present PRD to stakeholders, incorporate feedback
   549	```
   550	
   551	**Total Time Investment:**
   552	- **Fast track:** 1.5-2 days (straightforward feature, clear requirements)
   553	- **Typical:** 2-3 days (includes discovery synthesis, stakeholder review)
   554	- **Complex:** 3-4 days (major initiative, multiple personas, extensive user stories)
   555	
   556	---
   557	
   558	## Examples
   559	
   560	See `examples/sample.md` for full PRD examples.
   561	
   562	Mini example excerpt:
   563	
   564	```markdown
   565	## 2. Problem Statement
   566	- 60% of trial users drop off in first 24 hours
   567	## 6. Success Metrics
   568	- Activation rate: 40% → 60%
   569	```
   570	
   571	## Common Pitfalls
   572	
   573	### Pitfall 1: PRD Written in Isolation
   574	**Symptom:** PM writes PRD alone, presents finished doc to team
   575	
   576	**Consequence:** No buy-in, team doesn't understand rationale
   577	
   578	**Fix:** Collaborate on Phase 7 (user stories) with design + eng; review draft PRD before finalizing
   579	
   580	---
   581	
   582	### Pitfall 2: No Evidence in Problem Statement
   583	**Symptom:** "We believe users have this problem" (no data, no quotes)
   584	
   585	**Consequence:** Team questions whether problem is real
   586	
   587	**Fix:** Use discovery insights from `skills/discovery-process/SKILL.md`; include customer quotes, analytics, support tickets
   588	
   589	---
   590	
   591	### Pitfall 3: Solution Too Prescriptive
   592	**Symptom:** PRD specifies exact UI, pixel dimensions, button colors
   593	
   594	**Consequence:** Removes design collaboration, becomes waterfall spec
   595	
   596	**Fix:** Keep Phase 5 high-level; let design own UI details
   597	
   598	---
   599	
   600	### Pitfall 4: No Success Metrics
   601	**Symptom:** PRD defines problem + solution but no metrics
   602	
   603	**Consequence:** Can't validate if feature succeeded
   604	
   605	**Fix:** Always define primary metric in Phase 6 (what you're optimizing for)
   606	
   607	---
   608	
   609	### Pitfall 5: Out of Scope Not Documented
   610	**Symptom:** No section on what's NOT being built
   611	
   612	**Consequence:** Scope creep, stakeholders expect features not planned
   613	
   614	**Fix:** Explicitly document out of scope in Phase 8
   615	
   616	---
   617	
   618	## References
   619	
   620	### Related Skills (Orchestrated by This Workflow)
   621	
   622	**Phase 2:**
   623	- `skills/problem-statement/SKILL.md` (component)
   624	- `skills/problem-framing-canvas/SKILL.md` (interactive, for context)
   625	- `skills/customer-journey-mapping-workshop/SKILL.md` (interactive, optional)
   626	
   627	**Phase 3:**
   628	- `skills/proto-persona/SKILL.md` (component)
   629	- `skills/jobs-to-be-done/SKILL.md` (component, optional)
   630	
   631	**Phase 4:**
   632	- `skills/tam-sam-som-calculator/SKILL.md` (interactive, optional)
   633	
   634	**Phase 5:**
   635	- `skills/user-story-mapping-workshop/SKILL.md` (interactive, optional)
   636	
   637	**Phase 7:**
   638	- `skills/epic-hypothesis/SKILL.md` (component)
   639	- `skills/epic-breakdown-advisor/SKILL.md` (interactive)
   640	- `skills/user-story/SKILL.md` (component)
   641	
   642	### External Frameworks
   643	- Martin Eriksson, "How to Write a Good PRD" (2012) — PRD structure
   644	- Marty Cagan, *Inspired* (2017) — Product spec principles
   645	- Amazon, "Working Backwards" (PR/FAQ format) — Alternative to PRD
   646	
   647	### Dean's Work
   648	- [If Dean has PRD templates, link here]
   649	
   650	---
   651	
   652	**Skill type:** Workflow
   653	**Suggested filename:** `prd-development.md`
   654	**Suggested placement:** `/skills/workflows/`
   655	**Dependencies:** Orchestrates 8+ component and interactive skills across 8 phases
   656	
     1	---
     2	name: roadmap-planning
     3	description: Plan a strategic roadmap across prioritization, epic definition, stakeholder alignment, and sequencing. Use when turning strategy into a release plan that teams can execute.
     4	intent: >-
     5	  Guide product managers through strategic roadmap planning by orchestrating prioritization, epic definition, stakeholder alignment, and release sequencing skills into a structured process. Use this to move from disconnected feature requests to a cohesive, outcome-driven roadmap that aligns stakeholders, sequences work logically, and communicates strategic intent—avoiding "feature factory" roadmaps that lack strategic narrative or customer-centric framing.
     6	type: workflow
     7	theme: strategy-positioning
     8	best_for:
     9	  - "Building a strategic roadmap that survives exec review"
    10	  - "Prioritizing competing initiatives across multiple teams"
    11	  - "Planning and sequencing work for the next quarter or half-year"
    12	scenarios:
    13	  - "I have 15 competing initiatives and need to build a Q2 roadmap my exec team will actually approve"
    14	  - "I'm planning our 6-month product roadmap and need to sequence work across 3 teams"
    15	estimated_time: "45-90 min"
    16	---
    17	
    18	
    19	## Purpose
    20	Guide product managers through strategic roadmap planning by orchestrating prioritization, epic definition, stakeholder alignment, and release sequencing skills into a structured process. Use this to move from disconnected feature requests to a cohesive, outcome-driven roadmap that aligns stakeholders, sequences work logically, and communicates strategic intent—avoiding "feature factory" roadmaps that lack strategic narrative or customer-centric framing.
    21	
    22	This is not a Gantt chart—it's a strategic communication tool that shows what you're building, why it matters, and how it ladders up to business outcomes.
    23	
    24	## Key Concepts
    25	
    26	### What is Strategic Roadmap Planning?
    27	
    28	Roadmap planning is the process of:
    29	1. **Gathering inputs** — Customer problems, business goals, technical constraints
    30	2. **Defining initiatives** — Epics with clear hypotheses and success metrics
    31	3. **Prioritizing** — Rank initiatives by impact, effort, strategic fit
    32	4. **Sequencing** — Organize into releases/quarters with logical dependencies
    33	5. **Communicating** — Present roadmap to stakeholders with strategic narrative
    34	
    35	### Types of Roadmaps
    36	
    37	**Now/Next/Later Roadmap:**
    38	- **Now:** Current quarter (committed)
    39	- **Next:** Following quarter (high confidence)
    40	- **Later:** Future exploration (low confidence)
    41	- **Best for:** Agile teams, uncertainty, continuous discovery
    42	
    43	**Theme-Based Roadmap:**
    44	- Organize by strategic themes (e.g., "Retention," "Enterprise Expansion," "Mobile Experience")
    45	- **Best for:** Communicating to execs, showing strategic intent
    46	
    47	**Timeline Roadmap (Quarters):**
    48	- Q1: Epics A, B; Q2: Epics C, D; Q3: Epics E, F
    49	- **Best for:** Resource planning, stakeholder communication
    50	
    51	**Feature-Based Roadmap (Anti-Pattern):**
    52	- Lists features without context (e.g., "Dark mode," "SSO," "Advanced reporting")
    53	- **Why it fails:** No strategic narrative, no customer problems framed
    54	
    55	### Why This Works
    56	- **Outcome-driven:** Ties initiatives to business/customer outcomes
    57	- **Stakeholder alignment:** Transparent process reduces political friction
    58	- **Strategic clarity:** Shows not just "what" but "why"
    59	- **Flexible:** Adapts as you learn from discovery/delivery
    60	
    61	### Anti-Patterns (What This Is NOT)
    62	- **Not a commitment:** Roadmaps are strategic plans, not contracts
    63	- **Not a feature list:** Roadmaps frame problems, not just solutions
    64	- **Not waterfall:** Roadmaps evolve quarterly based on learning
    65	
    66	### When to Use This
    67	- Annual or quarterly planning cycles
    68	- After product strategy session (translate strategy to roadmap)
    69	- Onboarding new stakeholders (align on direction)
    70	- Reframing existing roadmap (shift from feature-driven to outcome-driven)
    71	
    72	### When NOT to Use This
    73	- For tactical sprint planning (use backlog instead)
    74	- When strategy is unclear (run product-strategy-session first)
    75	- When stakeholders expect date commitments (address expectations first)
    76	
    77	---
    78	
    79	### Facilitation Source of Truth
    80	
    81	When running this workflow as a guided conversation, use [`workshop-facilitation`](../workshop-facilitation/SKILL.md) as the interaction protocol.
    82	
    83	It defines:
    84	- session heads-up + entry mode (Guided, Context dump, Best guess)
    85	- one-question turns with plain-language prompts
    86	- progress labels (for example, Context Qx/8 and Scoring Qx/5)
    87	- interruption handling and pause/resume behavior
    88	- numbered recommendations at decision points
    89	- quick-select numbered response options for regular questions (include `Other (specify)` when useful)
    90	
    91	This file defines the workflow sequence and domain-specific outputs. If there is a conflict, follow this file's workflow logic.
    92	
    93	## Application
    94	
    95	Use `template.md` for the full fill-in structure.
    96	
    97	This workflow orchestrates **5 phases** over **1-2 weeks**, using multiple component and interactive skills.
    98	
    99	---
   100	
   101	## Phase 1: Gather Inputs (Day 1-2)
   102	
   103	**Goal:** Collect business goals, customer problems, technical constraints, stakeholder requests.
   104	
   105	### Activities
   106	
   107	**1. Review Business Goals (OKRs, Strategic Initiatives)**
   108	- **Source:** Company OKRs, exec strategy memos, board decks
   109	- **Questions:**
   110	  - What are the company's top 3 priorities this year?
   111	  - What metrics must we move? (revenue, retention, acquisition, efficiency)
   112	  - Are there strategic bets? (new markets, partnerships, product lines)
   113	- **Output:** 3-5 business outcomes to optimize for
   114	
   115	**2. Review Customer Problems (Discovery Insights)**
   116	- **Source:** Discovery interviews, support tickets, NPS feedback, churn surveys
   117	- **Use:** Insights from `skills/discovery-process/SKILL.md` (if recently completed)
   118	- **Questions:**
   119	  - What are the top 3-5 customer pain points?
   120	  - Which problems affect the most customers?
   121	  - Which problems have highest intensity?
   122	- **Output:** 3-5 validated customer problems
   123	
   124	**3. Review Technical Constraints & Opportunities**
   125	- **Source:** Engineering leadership, tech debt assessments
   126	- **Questions:**
   127	  - Are there technical blockers? (scaling, performance, security)
   128	  - Are there enabling investments? (platform upgrades, API rewrites)
   129	  - What's the technical roadmap? (migrations, deprecations)
   130	- **Output:** List of technical investments required
   131	
   132	**4. Review Stakeholder Requests**
   133	- **Source:** Sales, marketing, customer success, execs
   134	- **Questions:**
   135	  - What are sales asking for? (enterprise features, integrations)
   136	  - What's marketing requesting? (growth initiatives, positioning)
   137	  - What's customer success flagging? (churn risks, expansion blockers)
   138	- **Output:** List of stakeholder requests (not yet committed)
   139	
   140	### Outputs from Phase 1
   141	
   142	- **Business outcomes:** 3-5 OKRs or strategic goals
   143	- **Customer problems:** 3-5 validated pain points
   144	- **Technical investments:** Platform/tech debt items
   145	- **Stakeholder requests:** Feature requests from internal teams
   146	
   147	---
   148	
   149	## Phase 2: Define Initiatives (Epics) (Day 3-4)
   150	
   151	**Goal:** Turn inputs into epics with hypotheses, success metrics, and effort estimates.
   152	
   153	### Activities
   154	
   155	**1. Define Epic Hypotheses**
   156	- **Use:** `skills/epic-hypothesis/SKILL.md` (component)
   157	- **For each initiative:** Write hypothesis statement
   158	- **Format:** "We believe that [building X] for [persona] will achieve [outcome] because [assumption]."
   159	- **Participants:** PM
   160	- **Duration:** 60 minutes per epic
   161	- **Output:** 10-15 epic hypotheses
   162	
   163	**Example Epics (SaaS Product):**
   164	
   165	```
   166	Epic 1: Guided Onboarding
   167	Hypothesis: We believe that adding a step-by-step onboarding checklist for non-technical users will increase activation rate from 40% to 60% because users currently drop off due to lack of guidance.
   168	
   169	Success Metric: Activation rate (% completing first action within 24 hours)
   170	Target: 40% → 60%
   171	
   172	Epic 2: Enterprise SSO
   173	Hypothesis: We believe that adding SSO for enterprise accounts will increase enterprise deals closed from 2/quarter to 5/quarter because enterprise buyers require SSO for security compliance.
   174	
   175	Success Metric: Enterprise deals closed per quarter
   176	Target: 2 → 5
   177	
   178	Epic 3: Mobile-Optimized Workflows
   179	Hypothesis: We believe that optimizing core workflows for mobile will increase mobile DAU from 5% to 20% because mobile-first users currently can't complete workflows on the go.
   180	
   181	Success Metric: Mobile DAU as % of total DAU
   182	Target: 5% → 20%
   183	```
   184	
   185	**2. Estimate Effort (T-Shirt Sizing)**
   186	- **Participants:** PM + engineering lead
   187	- **Duration:** 90 minutes
   188	- **Method:**
   189	  - **Small (S):** 1-2 weeks (1-2 engineers)
   190	  - **Medium (M):** 3-4 weeks (2-3 engineers)
   191	  - **Large (L):** 2-3 months (3-5 engineers)
   192	  - **Extra Large (XL):** 3+ months (5+ engineers)
   193	- **Output:** Effort estimate per epic
   194	
   195	**3. Map to Business Outcomes**
   196	- **For each epic:** Tag with primary business outcome
   197	- **Example:**
   198	  - Epic 1 (Guided Onboarding) → Retention
   199	  - Epic 2 (Enterprise SSO) → Acquisition (enterprise)
   200	  - Epic 3 (Mobile Workflows) → Engagement
   201	
   202	### Outputs from Phase 2
   203	
   204	- **10-15 epics:** Each with hypothesis, success metric, effort estimate
   205	- **Business outcome mapping:** Which epics drive which OKRs
   206	
   207	---
   208	
   209	## Phase 3: Prioritize Initiatives (Day 5)
   210	
   211	**Goal:** Rank epics by impact, effort, and strategic fit.
   212	
   213	### Activities
   214	
   215	**1. Choose Prioritization Framework**
   216	- **Use:** `skills/prioritization-advisor/SKILL.md` (interactive)
   217	- **Participants:** PM
   218	- **Duration:** 30 minutes
   219	- **Output:** Recommended framework (RICE, ICE, Value/Effort, etc.)
   220	
   221	**2. Score Epics**
	< truncated lines 222-284 >
   285	
   286	**Alternative: Now/Next/Later Roadmap**
   287	
   288	```
   289	NOW (Current Quarter):
   290	- Guided Onboarding
   291	- Enterprise SSO
   292	- Mobile-Optimized Workflows
   293	
   294	NEXT (Following Quarter):
   295	- Advanced Reporting
   296	- Slack Integration
   297	- Pricing Page Redesign
   298	
   299	LATER (Future):
   300	- Mobile App
   301	- AI Recommendations
   302	- Multi-Language Support
   303	```
   304	
   305	**3. Validate with Engineering**
   306	- **Participants:** PM + engineering lead
   307	- **Questions:**
   308	  - Is sequencing realistic? (capacity, dependencies)
   309	  - Are there hidden technical blockers?
   310	  - Do we need to adjust scope?
   311	- **Output:** Validated roadmap sequence
   312	
   313	### Outputs from Phase 4
   314	
   315	- **Sequenced roadmap:** Epics organized by Q1, Q2, Q3
   316	- **Dependency map:** What depends on what
   317	- **Capacity check:** Engineering agrees sequence is feasible
   318	
   319	---
   320	
   321	## Phase 5: Communicate Roadmap (Week 2)
   322	
   323	**Goal:** Present roadmap to stakeholders, gather feedback, build alignment.
   324	
   325	### Activities
   326	
   327	**1. Create Roadmap Presentation**
   328	- **Format:** 30-45 min presentation
   329	- **Structure:**
   330	  - **Slide 1:** Strategic context (business goals, customer problems)
   331	  - **Slide 2-3:** Roadmap overview (Q1, Q2, Q3)
   332	  - **Slide 4-6:** Deep dive per quarter (epics, hypotheses, success metrics)
   333	  - **Slide 7:** What's NOT on roadmap (and why)
   334	  - **Slide 8:** Dependencies and risks
   335	- **Participants:** PM, design
   336	- **Duration:** 2-3 hours to prepare
   337	
   338	**2. Present to Stakeholders**
   339	- **Audience:** Execs, product leadership, engineering, sales, marketing, CS
   340	- **Duration:** 45 min presentation + 15 min Q&A
   341	- **Focus:**
   342	  - Strategic narrative: "Here's why we're prioritizing X over Y"
   343	  - Outcome focus: "Each epic drives [business outcome]"
   344	  - Flexibility: "This roadmap is a plan, not a commitment; we'll adjust as we learn"
   345	
   346	**3. Gather Feedback**
   347	- **Questions to ask:**
   348	  - Do these priorities align with business goals?
   349	  - Are we missing critical customer problems?
   350	  - Are dependencies clear?
   351	  - What concerns do you have?
   352	- **Output:** List of feedback, concerns, questions
   353	
   354	**4. Refine Roadmap**
   355	- **Based on feedback:** Adjust priorities, add missing epics, clarify dependencies
   356	- **Duration:** 1-2 days
   357	- **Output:** Final roadmap v1.0
   358	
   359	**5. Publish Roadmap**
   360	- **Internal:** Share with team (Confluence, Notion, Productboard, etc.)
   361	- **External (Optional):** Public roadmap for customers (use Now/Next/Later format)
   362	- **Format:** Visual roadmap + narrative doc
   363	
   364	### Outputs from Phase 5
   365	
   366	- **Roadmap presentation:** 30-45 min deck
   367	- **Stakeholder alignment:** Feedback incorporated, concerns addressed
   368	- **Published roadmap:** Accessible to team (internal) or customers (external)
   369	
   370	---
   371	
   372	## Complete Workflow: End-to-End Summary
   373	
   374	```
   375	Week 1:
   376	├─ Day 1-2: Gather Inputs
   377	│  ├─ Review business goals (OKRs)
   378	│  ├─ Review customer problems (discovery insights)
   379	│  ├─ Review technical constraints
   380	│  └─ Review stakeholder requests
   381	│
   382	├─ Day 3-4: Define Initiatives (Epics)
   383	│  ├─ skills/epic-hypothesis/SKILL.md (60 min per epic)
   384	│  ├─ Estimate effort (90 min)
   385	│  └─ Map to business outcomes
   386	│
   387	├─ Day 5: Prioritize Initiatives
   388	│  ├─ skills/prioritization-advisor/SKILL.md (30 min)
   389	│  ├─ Score epics (120 min)
   390	│  └─ Adjust for strategic fit
   391	│
   392	└─ Day 6-7: Sequence Roadmap
   393	   ├─ Map dependencies
   394	   ├─ Sequence by quarter (Q1, Q2, Q3)
   395	   └─ Validate with engineering
   396	
   397	Week 2:
   398	└─ Communicate Roadmap
   399	   ├─ Create presentation (2-3 hours)
   400	   ├─ Present to stakeholders (60 min)
   401	   ├─ Gather feedback
   402	   ├─ Refine roadmap (1-2 days)
   403	   └─ Publish roadmap
   404	```
   405	
   406	**Total Time Investment:**
   407	- **Fast track:** 1 week (existing epics, quick alignment)
   408	- **Typical:** 1.5-2 weeks (define epics, stakeholder review)
   409	
   410	---
   411	
   412	## Examples
   413	
   414	See `examples/sample.md` for full roadmap examples.
   415	
   416	Mini example excerpt:
   417	
   418	```markdown
   419	Now: Guided onboarding (activation +20%)
   420	Next: Enterprise SSO (deal velocity)
   421	Later: Mobile workflows (DAU lift)
   422	```
   423	
   424	## Common Pitfalls
   425	
   426	### Pitfall 1: Feature-Driven Roadmap (No Outcomes)
   427	**Symptom:** Roadmap lists features ("Dark mode," "SSO," "Advanced filters") with no context
   428	
   429	**Consequence:** No strategic clarity, stakeholders don't understand "why"
   430	
   431	**Fix:** Frame epics as hypotheses with success metrics (not just feature names)
   432	
   433	---
   434	
   435	### Pitfall 2: Prioritizing by HiPPO (Highest Paid Person's Opinion)
   436	**Symptom:** Execs dictate roadmap, no data-driven prioritization
   437	
   438	**Consequence:** Build wrong things, ignore customer problems
   439	
   440	**Fix:** Use prioritization framework (RICE, ICE) to transparently score epics
   441	
   442	---
   443	
   444	### Pitfall 3: Roadmap as Commitment (Waterfall Thinking)
   445	**Symptom:** Roadmap treated as contract, no flexibility to adjust
   446	
   447	**Consequence:** Can't pivot when you learn new information
   448	
   449	**Fix:** Communicate roadmap as "strategic plan, subject to change based on learning"
   450	
   451	---
   452	
   453	### Pitfall 4: No Dependencies Mapped
   454	**Symptom:** Sequence epics without checking technical dependencies
   455	
   456	**Consequence:** Q2 epic blocked because Q1 dependency didn't finish
   457	
   458	**Fix:** Map dependencies explicitly in Phase 4, validate with engineering
   459	
   460	---
   461	
   462	### Pitfall 5: Solo PM Roadmap (No Stakeholder Input)
   463	**Symptom:** PM creates roadmap alone, presents finished plan
   464	
   465	**Consequence:** No buy-in, stakeholders feel excluded
   466	
   467	**Fix:** Gather inputs (Phase 1) from all stakeholders, present draft (Phase 5) for feedback
   468	
   469	---
   470	
   471	## References
   472	
   473	### Related Skills (Orchestrated by This Workflow)
   474	
   475	**Phase 2:**
   476	- `skills/epic-hypothesis/SKILL.md` (component)
   477	
   478	**Phase 3:**
   479	- `skills/prioritization-advisor/SKILL.md` (interactive)
   480	
   481	**Phase 4:**
   482	- (Dependencies mapped manually, no specific skill)
   483	
   484	**Phase 5:**
   485	- (Presentation created manually, no specific skill)
   486	
   487	**Optional/Related:**
   488	- `skills/product-strategy-session/SKILL.md` (workflow) — Run before roadmap planning to establish strategy
   489	- `skills/discovery-process/SKILL.md` (workflow) — Provides customer problem inputs for Phase 1
   490	- `skills/user-story-mapping-workshop/SKILL.md` (interactive) — For complex epics requiring release planning
   491	
   492	### External Frameworks
   493	- Bruce McCarthy, *Product Roadmaps Relaunched* (2017) — Outcome-driven roadmaps
   494	- C. Todd Lombardo, *Product Roadmaps Relaunched* (2017) — Now/Next/Later framework
   495	- Intercom, "RICE Prioritization" (2016) — Prioritization framework
   496	
   497	### Dean's Work
   498	- [If Dean has roadmap planning resources, link here]
   499	
   500	---
   501	
   502	**Skill type:** Workflow
   503	**Suggested filename:** `roadmap-planning.md`
   504	**Suggested placement:** `/skills/workflows/`
   505	**Dependencies:** Orchestrates `skills/epic-hypothesis/SKILL.md`, `skills/prioritization-advisor/SKILL.md`, plus manual activities
   506	
     1	---
     2	name: frontend-design
     3	description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
     4	license: Complete terms in LICENSE.txt
     5	---
     6	
     7	This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.
     8	
     9	The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.
    10	
    11	## Design Thinking
    12	
    13	Before coding, understand the context and commit to a BOLD aesthetic direction:
    14	- **Purpose**: What problem does this interface solve? Who uses it?
    15	- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
    16	- **Constraints**: Technical requirements (framework, performance, accessibility).
    17	- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?
    18	
    19	**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.
    20	
    21	Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
    22	- Production-grade and functional
    23	- Visually striking and memorable
    24	- Cohesive with a clear aesthetic point-of-view
    25	- Meticulously refined in every detail
    26	
    27	## Frontend Aesthetics Guidelines
    28	
    29	Focus on:
    30	- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
    31	- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
    32	- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
    33	- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
    34	- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.
    35	
    36	NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.
    37	
    38	Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.
    39	
    40	**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.
    41	
    42	Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
    43	
Now I have everything I need. Running the full orchestrated cycle — all 4 skills with mandatory handoffs, applied to the business context from your document.
File created successfully: /mnt/user-data/outputs/full-cycle-skills-brazil.md
Ciclo completo executado com 4 handoffs obrigatórios. Aqui está o log de execução:

---

**ORCHESTRATION MAP executado como Saga Pattern:**

**→ ACTIVITY 1 — Discovery Process** ✅
Seis fases rodadas sobre o documento de análise do mercado americano como pesquisa secundária. Cinco pain points priorizados por frequência × intensidade. Decision Point 3: **GO** com base em validação por proxies de mercado (Voiceflow, Zapier, Intercom Fin). Personas identificadas: Bruno (builder BR) e Carla (compradora PME/mid-market BR).

**→ HANDOFF 1 → ACTIVITY 2 — Problem Statement** ✅
Narrativa centrada em Bruno: "sei construir, não sei empacotar e cobrar". Final Problem Statement sintetizado em uma sentença: *builders BR precisam de infraestrutura comercial localizada para transformar skills em receita recorrente B2B.*

**→ HANDOFF 2 → ACTIVITY 3 — PRD** ✅
PRD v0.1 completo com 3 epics hipótese (Empacotar / Gerenciar / Distribuir), 6 métricas com targets, 8 user stories com acceptance criteria, out of scope explícito, e mapa de riscos com mitigações (LGPD, billing BR, adoção de builders).

**→ HANDOFF 3 → ACTIVITY 4 — Roadmap** ✅
6 epics priorizados via RICE. Roadmap Now/Next/Later com sequenciamento de dependências (billing BR é pré-requisito do workspace completo — não pode ser paralelizado). Narrativa para stakeholders incluída.

**Compensation ativado:** Nenhum — todos os decision points retornaram GO. Loop de revalidação sugerido após o piloto de 20 builders no fim de Q2.