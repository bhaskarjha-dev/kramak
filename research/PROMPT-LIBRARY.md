# Kramak (क्रमक) — Research Prompt Library

> **Master Phase 0 Prompt Library**  
> Sixteen complete, self-contained, copy-paste ready research prompts corresponding to the DAG in [RESEARCH-PIPELINE.md](file:///d:/dev/pro/kramak/research/RESEARCH-PIPELINE.md) and [DECISIONS.md](file:///d:/dev/pro/kramak/research/DECISIONS.md).

---

## How to Use This Library

1. **One Chat per Session:** Copy the entire prompt within a session block (from `## BRIEF` to the end of `## FORMAT`) and paste it as the opening turn into a frontier model with live web search / deep research enabled (Gemini 1.5 Pro/2.0, Claude 3.5 Sonnet/Opus, or GPT-4o/o3 Deep Research).
2. **Upstream Attachments:** Where a session lists required inputs (e.g., T2-06 requires T2-05), attach or paste the referenced markdown file from `sessions/` into the chat context.
3. **Save Raw Output:** Save the returned output to `sessions/T2-##-[slug].md` exactly as named in the header.
4. **Update Decision Registry:** Update the matching `D-NNN` entry in [DECISIONS.md](file:///d:/dev/pro/kramak/research/DECISIONS.md) immediately upon session completion.
5. **Universal Evidence Standard:** Every session enforces the inline grading taxonomy below.

```
Evidence Standard:
- Base Scale: A (Official docs/RFCs/source) · B (Peer-reviewed/empirical benchmarks) · C (Vendor claims/marketing) · D (Blog/tutorial/AI recall) · E (Unverifiable)
- Modifiers: Corroboration (single / corroborated by 2+ sources / contested) · Recency (fresh <3m / aging 3-12m / stale >12m relative to Aug 2026) · Directness (direct / indirect)
- Verification Tag: fetched (retrieved live) | cached | recalled (from model weights) | secondhand | human-provided
*Rule: Any recalled claim is capped at Grade D regardless of apparent authority.*
```

---

## Session Index

| ID | Title | Layer | Route | Door Type | Hard Dependencies | Output Target |
|---|---|:---:|:---:|:---:|---|---|
| [T2-01](#t2-01) | Competitive Landscape & Real-World Pain Points | 0 | Discovery | — | none | `sessions/T2-01-competitive-landscape.md` |
| [T2-02](#t2-02) | Agentic SE & Multi-Agent Orchestration Literature | 0 | Discovery | — | none | `sessions/T2-02-orchestration-research-literature.md` |
| [T2-03](#t2-03) | IDE Ecosystem Map & Convergence Trends (8 Tools) | 0 | Discovery | — | none | `sessions/T2-03-ide-ecosystem-scan.md` |
| [T2-04](#t2-04) | Evidentiary Audit of Parameter Claims & Citations | 0 | Discovery | — | none | `sessions/T2-04-evidentiary-audit.md` |
| [T2-05](#t2-05) | Core Orchestration Loop: Retrospective Validation | 1 | Deep Research | 🔒 One-Way | none | `sessions/T2-05-core-loop-retrospective.md` |
| [T2-06](#t2-06) | Multi-Agent & Parallel Evolution Design Options | 1 | Deep Research | 🔁 Two-Way | **T2-05** | `sessions/T2-06-multiagent-parallel-evolution.md` |
| [T2-07](#t2-07) | Self-Improvement Governance & Anti-Bias Guard | 1 | Deep Research | 🔒 One-Way | none | `sessions/T2-07-self-improvement-governance.md` |
| [T2-08](#t2-08) | Specification Density & Progressive Disclosure | 1 | Deep Research | 🔁 Two-Way | none | `sessions/T2-08-spec-density-progressive-disclosure.md` |
| [T2-09](#t2-09) | Pure-Methodology Identity vs. Optional Tooling | 1 | Deep Research | 🔒 One-Way | none | `sessions/T2-09-pure-methodology-tooling.md` |
| [T2-10](#t2-10) | Capability Gate Check: Self-Assessment Reliability | 1 | Deep Research | 🔒 One-Way | none | `sessions/T2-10-capability-gate-reliability.md` |
| [T2-11](#t2-11) | Adapter Strategy: Breadth vs. Depth (8 Tools) | 1 | Fast Spike | 🔁 Two-Way | none | `sessions/T2-11-adapter-strategy.md` |
| [T2-12](#t2-12) | Naming & Positioning: Kramak vs. Competitive Field | 1 | Fast Spike | 🔒 One-Way | none | `sessions/T2-12-naming-positioning.md` |
| [T2-13](#t2-13) | Core Guardrails, Grounding & Parameter Bundle | 1 | Confirm / Audit | 🔒 One-Way | none | `sessions/T2-13-guardrail-confirmation-bundle.md` |
| [T2-14](#t2-14) | Positioning, Distribution & Platform Layer Blueprint | 2 | Synthesis | — | **T2-08, T2-09, T2-11, T2-12** | `sessions/T2-14-positioning-platform-blueprint.md` |
| [T2-15](#t2-15) | Core Engine, Verification & Governance Blueprint | 2 | Synthesis | — | **T2-05, T2-06, T2-07, T2-10, T2-13** | `sessions/T2-15-core-engine-governance-blueprint.md` |
| [T2-16](#t2-16) | Grand Synthesis: FAD Compilation & Gate Readiness | Sink | Synthesis / Gate | — | **T2-14, T2-15** | `sessions/T2-16-grand-synthesis-fad.md` |

---

## Layer 0 — Landscape & Discovery

---

### T2-01
#### Competitive Landscape & Real-World Pain Points: AI-Agent Development Process Frameworks in 2026
*Layer 0 · Discovery · Informs D-007, D-008, D-009 · Dependencies: None*  
*Target Output:* `sessions/T2-01-competitive-landscape.md`

```markdown
## BRIEF

Investigate the current (August 2026) landscape of process/methodology frameworks for AI-assisted and autonomous software development, and the real pain points practitioners report when working with AI coding agents without such a framework. You are informing several downstream decisions about Kramak (क्रमक), an existing, shipped (v1.0.0) file-based, model-agnostic, IDE-agnostic development methodology — a deterministic 5-state FSM (BOOTSTRAP → PLANNING → EXECUTING → AUDITING, looping back to PLANNING, with a WAITING substate) that any AI coding agent can follow by reading Markdown specs and a JSON-Schema-validated state.json. 

Kramak's own framing is that the AI coding landscape has three layers: Context (AGENTS.md, AAIF standard — solved), Protocol (MCP — solved), and Process ("how to autonomously develop software" — claimed unstandardized), and that Kramak fills the third. 

Known named comparators include:
1. RIPER-5 (a community-originated Cursor rule set, "Research → Innovate → Plan → Execute → Review", which began as a single prompt file and forked into memory-bank variants),
2. GitHub Spec Kit (an official, actively maintained spec-driven-development toolkit with a CLI and 30+ agent integrations),
3. Built-in task orchestration inside Devin, OpenHands, and Google Antigravity.

Your audience is a Principal Architect who needs production-grade, evidence-backed intelligence — not promotional summaries — to determine whether Kramak's claimed "Process-layer gap" is real, partially occupied, or already solved by native IDE capabilities.

## SCOPE

Temporal anchor: today is August 19, 2026. Prioritize sources active within the last 3–6 months.

In scope:
- RIPER-5 and its major active forks.
- GitHub Spec Kit (architecture, CLI distribution, agent adoption, community extensions).
- Aider's built-in conventions, OpenHands multi-agent loop, Devin compound-system architecture.
- Any emerging agentic SDLC frameworks (BMAD-METHOD, Spec-Driven Development standards).
- Primary developer discourse (Hacker News, r/programming, GitHub discussions, X/Twitter) detailing actual developer failure modes with coding agents.

Out of scope:
- Raw foundation-model coding capability benchmarks unrelated to process or workflow structure.

Source priority:
1. Official GitHub repositories, source code, and published RFCs.
2. Peer-reviewed or arXiv empirical software engineering papers.
3. High-signal developer community discourse with visible engagement. Avoid unverified SEO listicles.

## APPROACH

Start broad across the entire agentic-SDLC space, then deeply examine the mechanical differences between Kramak, Spec Kit, RIPER-5, and IDE-native orchestration. Actively hunt for disconfirming evidence against the hypothesis that a separate process framework is needed: do developers prefer per-tool native agent loops over cross-tool file-based methodologies? Report conflicting views with their respective evidence grades.

## DELIVERABLE

Produce a comprehensive report covering:
1. Complete inventory of comparable frameworks, detailing mechanical architecture, licensing, and adoption momentum (stars, forks, contributor velocity).
2. Sourced synthesis of actual developer struggles in 2026 AI-assisted workflows (context rot, scope creep, infinite fix loops).
3. Explicit verdict: does an unfilled "Process Layer" gap exist, partially exist, or not exist?
4. Concrete recommendations for Kramak's positioning relative to Spec Kit and RIPER-5.
5. Inline evidence grades for every claim and open risks with measurable reversal triggers.

## FORMAT

Produce a single complete Markdown file. Open with exact YAML frontmatter:

---
id: T2-01
title: "Competitive Landscape & Real-World Pain Points: AI-Agent Development Process Frameworks in 2026"
date: 2026-08-19
status: complete
topic: competitive-landscape
tags: [competitive-analysis, agentic-sdlc, spec-kit, riper-5, positioning]
informs_decisions: [D-007, D-008, D-009]
confidence: <High | Medium | Low>
---

Body sections in exact order:
1. **Research Question**
2. **Key Findings** (3–7 bullets)
3. **Recommendation** (isolated from rejected alternatives)
4. **Alternatives Considered**
5. **Detailed Findings**
6. **Open Questions & Risks** (with specific reversal triggers)
7. **Sources & Evidence Ledger** (every source graded per the Universal Evidence Standard)
```

---

### T2-02
#### Agentic Software Engineering & Multi-Agent Orchestration: Research Literature
*Layer 0 · Discovery · Informs D-001, D-002, D-004, D-006 · Dependencies: None*  
*Target Output:* `sessions/T2-02-orchestration-research-literature.md`

```markdown
## BRIEF

Survey the academic and applied research literature on autonomous coding-agent architectures: planning loops, multi-agent software engineering orchestration, role specialization (planner/executor/critic splits), and documented failure modes. 

Kramak implements a strict sequential single-Planner session → single-Executor session → technical Auditor loop, deliberately assigning high-reasoning models (Opus/o3/Gemini Pro class) to planning and fast/precise models (Sonnet/4o/Flash class) to execution as a cost/capability matching strategy, persisting state via a JSON-Schema-validated state.json. 

Your audience is a Principal Architect evaluating whether this role-separated state machine architecture is supported by empirical software engineering research, or whether continuous single-agent loops or emergent multi-agent swarms perform better.

## SCOPE

Temporal anchor: August 19, 2026.

In scope:
- Peer-reviewed (ICSE, FSE, ASE, NeurIPS/ICLR agent workshops) and arXiv research on LLM multi-agent software engineering (MetaGPT, ChatDev, AutoGen, SWE-agent).
- Empirical SWE-bench comparisons of single-agent versus role-specialized multi-agent pipelines.
- Research on coordination overhead, context fragmentation, and error propagation in multi-agent handoffs.
- Published empirical failure taxonomies for autonomous coding agents.
- Research on LLM self-critique, reflection loops (Reflexion), and finite state machine control planes.

Out of scope:
- General robotics or game-theoretic multi-agent systems not applied to software development.

## APPROACH

Systematically examine role-specialized agent architectures. Actively look for studies where multi-agent role splits underperformed single-agent loops due to context-boundary loss or coordination overhead. Map the state of evidence on whether structured FSM constraints prevent error compounding compared to free-form agent dialogue.

## DELIVERABLE

Produce a comprehensive report covering:
1. Empirical evidence on planner/executor/auditor role separation versus unified single-agent loops (including benchmark deltas where available).
2. Documented autonomous-coding failure taxonomies and compounding error dynamics.
3. Analysis of FSM-constrained agent control loops versus dynamic emergent orchestration.
4. An explicit verdict on whether Kramak's core architectural loop is evidence-backed, evidence-neutral, or contradicted by current research.
5. Inline evidence grades and open research risks.

## FORMAT

Produce a single Markdown file opening with YAML frontmatter:

---
id: T2-02
title: "Agentic Software Engineering & Multi-Agent Orchestration: Research Literature"
date: 2026-08-19
status: complete
topic: agentic-se-research
tags: [multi-agent-systems, orchestration, role-specialization, failure-modes, empirical-research]
informs_decisions: [D-001, D-002, D-004, D-006]
confidence: <High | Medium | Low>
---

Body sections in exact order:
1. **Research Question**
2. **Key Findings** (3–7 bullets)
3. **Recommendation**
4. **Alternatives Considered**
5. **Detailed Findings**
6. **Open Questions & Risks** (with reversal triggers)
7. **Sources & Evidence Ledger** (graded per Universal Evidence Standard)
```

---

### T2-03
#### Coding-Agent & IDE Ecosystem Map: Native Orchestration & Extension Surfaces (8 Target Tools)
*Layer 0 · Discovery · Informs D-002, D-005, D-009 · Dependencies: None*  
*Target Output:* `sessions/T2-03-ide-ecosystem-scan.md`

```markdown
## BRIEF

Produce a comprehensive technical capability scan of the 8 IDE/agent ecosystems Kramak currently targets: Google Antigravity, Cursor, Claude Code, Windsurf, Cline/Roo Code, GitHub Copilot Workspace, Aider, and the Generic fallback. 

Examine each tool's native orchestration capabilities, multi-agent or subagent features, workspace isolation (e.g. git worktrees), and the exact file/configuration formats used for custom instructions. 

Your audience is a Principal Architect evaluating:
1. Whether native IDE features are rendering external process frameworks redundant.
2. How Kramak should architect multi-agent execution compatibility (e.g. Antigravity subagents vs. Cursor background tasks).
3. The maintenance burden and breaking-change risks across the 8-adapter portfolio.

## SCOPE

Temporal anchor: August 19, 2026. Prioritize official documentation and changelogs from the past 3 months.

In scope (per tool):
- Native planning/task-breakdown features.
- Native subagent / multi-agent concurrency mechanisms and workspace isolation methods.
- Rule file format, location, and precedence (`.cursor/rules/*.mdc`, `CLAUDE.md`, `.windsurfrules`, `.clinerules`, `AGENTS.md`, Antigravity skills).
- Release velocity and extension API stability.

Out of scope:
- Pricing and consumer UI commentary.

## APPROACH

Systematically profile all 8 target ecosystems. Identify where tools are converging on shared standards (like `AGENTS.md` and MCP) versus where proprietary configuration surfaces are diverging. Differentiate strictly between GA features and experimental previews.

## DELIVERABLE

Produce a comprehensive report covering:
1. Per-tool breakdown across the 8 targets (Native Orchestration level, Multi-Agent support, Config format, Stability rating).
2. Cross-tool convergence analysis (are IDEs standardizing on AGENTS.md or diverging?).
3. Risk analysis of adapter maintenance overhead for a solo maintainer.
4. Recommendations on adapter prioritization and multi-agent integration primitives.
5. Inline evidence grades and open risks with revisit triggers.

## FORMAT

Produce a single Markdown file opening with YAML frontmatter:

---
id: T2-03
title: "Coding-Agent & IDE Ecosystem Map: Native Orchestration & Extension Surfaces"
date: 2026-08-19
status: complete
topic: ide-ecosystem-scan
tags: [ide-ecosystem, coding-agents, adapters, subagents, multi-agent-tooling]
informs_decisions: [D-002, D-005, D-009]
confidence: <High | Medium | Low>
---

Body sections in exact order:
1. **Research Question**
2. **Key Findings** (3–7 bullets)
3. **Recommendation**
4. **Alternatives Considered**
5. **Detailed Findings** (structured tool by tool)
6. **Open Questions & Risks** (with reversal triggers)
7. **Sources & Evidence Ledger** (graded per Universal Evidence Standard)
```

---

### T2-04
#### Evidentiary Audit of Kramak's Existing Design-Parameter Citations & Claims
*Layer 0 · Discovery · Informs D-003, D-004, D-010, D-011 · Dependencies: None*  
*Target Output:* `sessions/T2-04-evidentiary-audit.md`

```markdown
## BRIEF

Independently fact-check and audit the evidentiary basis of specific quantitative parameters and policy claims embedded in Kramak's shipped v1.0.0 specification:
1. The **"2-hour Work Item cap"**, which Kramak's docs justify by citing METR's research on AI agent task-completion time horizons.
2. The **"no personas"** design rule in planning prompts.
3. The empirical boundaries of Kramak's **Failure Taxonomy** (6 categories).
4. The **Capability Gate Check** confidence self-assessment thresholds.
5. The **"Polish Ceiling Rule"** (preventing scope inflation and over-engineering during execution).

Your audience is a Principal Architect determining whether these numbers and rules are rigorous, defensible derivations from primary literature, or intuition-based heuristics requiring citation correction.

## SCOPE

Temporal anchor: August 19, 2026.

In scope:
- Primary METR publications on AI task-horizon scaling curves (note: METR measures capability scaling across task lengths, not prescriptive engineering caps; check if Kramak's 2-hour cap is a faithful derived rule or an overstated citation).
- Empirical research on persona adoption versus direct role specification in LLM prompts.
- Empirical literature on software failure taxonomies and autonomous agent failure modes.
- Research on scope creep, over-completion, and hallucinated refactoring in LLM code generation.

Out of scope:
- Redesigning the underlying mechanisms (covered in Layer 1). This session audits existing citations and claims.

## APPROACH

Fetch and analyze primary source papers directly. For Kramak-specific internal concepts (Polish Ceiling Rule), identify the closest published software-engineering and AI-safety analogues. Evaluate each claim objectively.

## DELIVERABLE

Structure the core deliverable as a **Per-Claim Evidentiary Audit Table**:
- Claim / Parameter → Primary Source Cited → Actual Finding in Literature → Evidentiary Grade → Verdict (`Confirmed` | `Needs Citation Correction` | `Heuristic / Assumption`).
- Detailed analysis for the METR 2-hour cap, Persona rule, Failure Taxonomy, Capability Gate, and Polish Ceiling.
- Recommended text adjustments for the v1.1+ specification.
- Inline evidence grades and open risks.

## FORMAT

Produce a single Markdown file opening with YAML frontmatter:

---
id: T2-04
title: "Evidentiary Audit of Kramak's Existing Design-Parameter Citations & Claims"
date: 2026-08-19
status: complete
topic: evidentiary-audit
tags: [citation-audit, metr, personas, failure-taxonomy, polish-ceiling, parameter-calibration]
informs_decisions: [D-003, D-004, D-010, D-011]
confidence: <High | Medium | Low>
---

Body sections in exact order:
1. **Research Question**
2. **Key Findings** (3–7 bullets)
3. **Recommendation (Per-Claim Audit Table)**
4. **Alternatives Considered**
5. **Detailed Findings**
6. **Open Questions & Risks** (with reversal triggers)
7. **Sources & Evidence Ledger** (graded per Universal Evidence Standard)
```

---

## Layer 1 — Architectural Decisions

---

### T2-05
#### Core Orchestration Loop: Retrospective Validation Against Agentic-SE Research
*Layer 1 · One-Way Door · Deep Research · Informs D-001 · Dependencies: Soft on T2-01, T2-02*  
*Target Output:* `sessions/T2-05-core-loop-retrospective.md`

```markdown
## BRIEF

Validate whether Kramak's shipped v1.0.0 core architecture is a sound, evidence-aligned design, or whether it exhibits fundamental structural flaws. 

The architecture under review consists of:
1. A deterministic 5-state FSM (`BOOTSTRAP` → `PLANNING` → `EXECUTING` → `AUDITING`, with `WAITING` for human input).
2. A strict split between a high-reasoning "Planner" session and a fast/precise "Executor" session per Work Item.
3. Perspective-Based Planning (PERCEIVE → REASON → DECIDE assessment cycle).
4. Cross-session state persistence in `state.json` validated against JSON Schema.

Evaluate this single-agent-per-phase architecture *on its own merits*, not against multi-agent swarms (which T2-06 addresses). Determine whether the cognitive role separation between architect and coder is justified by evidence on task performance and context preservation.

## SCOPE

Temporal anchor: August 19, 2026.

In scope:
- Academic and empirical evidence on planner/executor role separation in LLM software engineering.
- Cost/quality trade-offs of capability-matched model routing (expensive reasoning models for planning, efficient models for execution).
- Empirical comparison of the PERCEIVE → REASON → DECIDE cycle against ReAct, Reflexion, and Plan-and-Solve patterns.
- Evaluation of state-machine transitions and crash-recovery invariants.

## APPROACH

Synthesize empirical findings from T2-02 with Kramak's specific state machine implementation. Actively investigate whether modern large-context frontier models make the planner/executor split obsolete due to handoff context loss. Surface any structural state machine failure points.

## DELIVERABLE

Produce a comprehensive report covering:
1. Empirical evaluation of planner/executor role separation efficacy in coding tasks.
2. Cost/accuracy efficiency of capability-based model routing.
3. Comparison of Perspective-Based Planning with alternative cognitive loop architectures.
4. An explicit verdict on D-001: is the 5-state FSA topology and role split evidence-aligned, neutral, or contradicted?
5. Concrete recommendations for state machine topology refinements.
6. Inline evidence grades and open risks with reversal triggers.

## FORMAT

Produce a single Markdown file opening with YAML frontmatter:

---
id: T2-05
title: "Core Orchestration Loop: Retrospective Validation Against Agentic-SE Research"
date: 2026-08-19
status: complete
topic: core-loop-retrospective
tags: [fsm-topology, role-separation, planner-executor, perspective-planning, decision-record]
informs_decisions: [D-001]
confidence: <High | Medium | Low>
---

Body sections in exact order:
1. **Research Question**
2. **Key Findings** (3–7 bullets)
3. **Recommendation** (isolated decision on D-001)
4. **Alternatives Considered**
5. **Detailed Findings**
6. **Open Questions & Risks** (with reversal triggers)
7. **Sources & Evidence Ledger** (graded per Universal Evidence Standard)
```

---

### T2-06
#### Core Orchestration Loop: Multi-Agent & Parallel Evolution Design Options
*Layer 1 · Two-Way Door · Deep Research · Informs D-002 · Hard Dependency on T2-05; Soft on T2-02, T2-03*  
*Target Output:* `sessions/T2-06-multiagent-parallel-evolution.md`

```markdown
## BRIEF

Using `sessions/T2-05-core-loop-retrospective.md` as foundational input, investigate how Kramak should evolve toward multi-agent and parallel Work Item execution in v1.1+. 

2026 developer tooling increasingly supports multi-agent workflows natively: Google Antigravity features hierarchical subagent delegation (planner delegating to specialized coder/tester subagents with git-worktree isolation), and Cursor 2.0 provides parallel background execution. 

Your audience is a Principal Architect requiring a concrete technical evolution path:
1. How to support parallel execution while preserving deterministic auditability.
2. Necessary modifications to `state.json` schema to handle concurrent Work Item updates.
3. How to adapt the Hard Scope Check (`git diff --name-only`) for concurrent worktree execution.
4. New failure modes introduced by parallelism and required Circuit Breaker extensions.

## SCOPE

Temporal anchor: August 19, 2026.

In scope:
- Production multi-agent coding patterns (Antigravity subagents, Cursor background workers, OpenHands swarms).
- Concurrency control, workspace isolation (git worktrees), and conflict-free merge strategies for parallel AI agents.
- Schema extensions for `state.json` (tracking concurrent work items, subagent IDs, worktree branches).
- Task-independence heuristics (determining when Work Items can safely execute in parallel).

Out of scope:
- Re-evaluating single-agent sequential execution fundamentals (covered in T2-05).

## APPROACH

Treat T2-05's verdict as given. Explore concrete architectural options: (A) Pure sequential baseline, (B) Opt-in parallel execution extension with git worktrees, (C) Fully multi-agent native core. Analyze the trade-offs of each option for a solo maintainer and autonomous workflows.

## DELIVERABLE

Produce a comprehensive report covering:
1. Analysis of production multi-agent concurrency mechanisms and git-worktree isolation.
2. Concrete schema delta for `state.json` to support parallel Work Item states.
3. Concurrency adaptations for Hard Scope Check and Circuit Breakers.
4. An explicit recommendation on D-002: sequential default with opt-in worktree parallelism vs. multi-agent native.
5. Implementation roadmap and failure modes.
6. Inline evidence grades and open risks with reversal triggers.

## FORMAT

Produce a single Markdown file opening with YAML frontmatter:

---
id: T2-06
title: "Core Orchestration Loop: Multi-Agent & Parallel Evolution Design Options"
date: 2026-08-19
status: complete
topic: multiagent-parallel-evolution
tags: [multi-agent, subagents, git-worktrees, concurrency-control, decision-record]
informs_decisions: [D-002]
confidence: <High | Medium | Low>
---

Body sections in exact order:
1. **Research Question**
2. **Key Findings** (3–7 bullets)
3. **Recommendation** (isolated decision on D-002)
4. **Alternatives Considered**
5. **Detailed Findings**
6. **Open Questions & Risks** (with reversal triggers)
7. **Sources & Evidence Ledger** (graded per Universal Evidence Standard)
```

---

### T2-07
#### Self-Improvement Governance: Anti-Bias Guard Robustness & Safe Self-Modification Design
*Layer 1 · One-Way Door · Deep Research · Informs D-006 · Dependencies: Soft on T2-02*  
*Target Output:* `sessions/T2-07-self-improvement-governance.md`

```markdown
## BRIEF

Investigate safe self-modification patterns in autonomous systems to stress-test Kramak's **Anti-Bias Guard** (Innovation #2) — a 5-point checklist designed to govern pipeline self-improvement and prevent recency bias when AI agents propose changes to Kramak's own specification files. 

Your audience is a Principal Architect evaluating whether a 5-point checklist is adequate governance for an autonomous self-modifying development framework, or whether structural backstops (versioned rollback logs, automated regression testing against historical audit logs, cooling-off periods, dual-model critique, or mandatory human PR gates) are required.

## SCOPE

Temporal anchor: August 19, 2026.

In scope:
- Recursive self-improvement and self-modification safety literature, calibrated specifically for *file-based, human-auditable, git-backed* developer frameworks (avoiding existential-risk over-generalization).
- Software engineering safety patterns: canary deployments, versioned configuration rollbacks, immutable audit ledgers.
- Failure modes of checklist-based LLM self-evaluation (sycophancy, compliance theater, reward hacking).
- Empirical governance mechanisms for self-evolving agent prompts and specs.

## APPROACH

Calibrate rigor to Kramak's actual risk surface: Markdown files in a git repo proposing edits to other Markdown files. Stress-test each of the 5 checklist items against documented LLM cognitive failure modes. Identify where automated checks fail and what structural controls close the gap.

## DELIVERABLE

Produce a comprehensive report covering:
1. Systematic evaluation of the 5-point Anti-Bias Guard checklist (identifying specific failure modes that slip through each point).
2. Assessment of software-engineering safe-deployment patterns applicable to Kramak.
3. Concrete recommendation on D-006: retain checklist as-is, add automated git-rollback/regression verification, or mandate human approval gates.
4. Concrete specification language for the hardened Anti-Bias Guard.
5. Inline evidence grades and open risks with reversal triggers.

## FORMAT

Produce a single Markdown file opening with YAML frontmatter:

---
id: T2-07
title: "Self-Improvement Governance: Anti-Bias Guard Robustness & Safe Self-Modification Design"
date: 2026-08-19
status: complete
topic: self-improvement-governance
tags: [governance, anti-bias-guard, self-modification, safety, rollback, decision-record]
informs_decisions: [D-006]
confidence: <High | Medium | Low>
---

Body sections in exact order:
1. **Research Question**
2. **Key Findings** (3–7 bullets)
3. **Recommendation** (isolated decision on D-006)
4. **Alternatives Considered**
5. **Detailed Findings**
6. **Open Questions & Risks** (with reversal triggers)
7. **Sources & Evidence Ledger** (graded per Universal Evidence Standard)
```

---

### T2-08
#### Specification Density, Cognitive Friction & Progressive Disclosure Strategy
*Layer 1 · Two-Way Door · Deep Research · Informs D-007 · Dependencies: Soft on T2-01*  
*Target Output:* `sessions/T2-08-spec-density-progressive-disclosure.md`

```markdown
## BRIEF

Investigate the trade-off between specification thoroughness and adoption/execution friction, and apply findings to Kramak's primary spec files (`PLANNER.md` at 41.5KB, `EXECUTOR.md` at 17.7KB). 

Compare Kramak's comprehensive monolithic spec approach against:
1. RIPER-5 (lightweight single-file `.cursorrules` prompt).
2. GitHub Spec Kit (staged multi-file workflow: spec → plan → tasks).

Crucially, evaluate how large system prompt files affect **executing LLM agent adherence, context degradation, and inference token overhead**, distinct from human developer reading fatigue. 

Your audience is a Principal Architect deciding whether to maintain current density, restructure via progressive disclosure (lean core + on-demand modules), or adopt a staged artifact pipeline.

## SCOPE

Temporal anchor: August 19, 2026.

In scope:
- Research on LLM long-context instruction following, "lost in the middle" effects, and prompt density versus adherence.
- Progressive disclosure information architecture patterns in developer tools and agent frameworks.
- Onboarding friction and abandonment patterns in developer-facing specifications.
- Spec Detail Scaling (Innovation #4: 🔴 Guided / 🟡 Directed / 🟢 Outcome) effectiveness.

## APPROACH

Analyze documentation density from two perspectives: human developer onboarding psychology and LLM agent instruction-adherence mechanics. Evaluate empirical evidence on whether large prompt files cause instruction dilution in executing agents.

## DELIVERABLE

Produce a comprehensive report covering:
1. Empirical evidence on context length and instruction density effects on AI agent execution accuracy.
2. Developer adoption dynamics around specification complexity versus perceived rigor.
3. Comparative architectural analysis: Kramak monolithic vs. RIPER-5 minimal vs. Spec Kit staged files.
4. Concrete recommendation on D-007: keep density as-is, modularize with progressive disclosure, or adopt staged generation.
5. Structural outline of the recommended information architecture.
6. Inline evidence grades and open risks with reversal triggers.

## FORMAT

Produce a single Markdown file opening with YAML frontmatter:

---
id: T2-08
title: "Specification Density, Cognitive Friction & Progressive Disclosure Strategy"
date: 2026-08-19
status: complete
topic: spec-density
tags: [spec-density, progressive-disclosure, context-window, instruction-adherence, decision-record]
informs_decisions: [D-007]
confidence: <High | Medium | Low>
---

Body sections in exact order:
1. **Research Question**
2. **Key Findings** (3–7 bullets)
3. **Recommendation** (isolated decision on D-007)
4. **Alternatives Considered**
5. **Detailed Findings**
6. **Open Questions & Risks** (with reversal triggers)
7. **Sources & Evidence Ledger** (graded per Universal Evidence Standard)
```

---

### T2-09
#### "Pure Methodology" Positioning: Optional Tooling / CLI Layer Tradeoffs
*Layer 1 · One-Way Door · Deep Research · Informs D-009 · Dependencies: Soft on T2-01, T2-03*  
*Target Output:* `sessions/T2-09-pure-methodology-tooling.md`

```markdown
## BRIEF

Investigate precedents, developer adoption patterns, and brand trade-offs for zero-runtime-dependency developer frameworks that add — or deliberately refuse to add — an optional tooling or CLI layer. 

Kramak's foundational positioning is "pure methodology, zero mandatory runtime dependencies" (pure Markdown and JSON Schemas). However, Kramak already includes `init.sh`/`init.ps1` bootstrap scripts and `validate.js` as convenience utilities. Meanwhile, GitHub Spec Kit ships a dedicated Python CLI (`specify-cli`), which has facilitated 30+ integrations and broad adoption. 

Your audience is a Principal Architect deciding whether to:
1. Maintain strict zero-dependency purity (no official CLI binary).
2. Package an optional companion CLI/validator in the core repo (e.g. `npx kramak` or `cargo install kramak`).
3. Decouple all tooling into a separate companion repository (e.g. `kramak-cli`), keeping the core spec repo 100% pure.

## SCOPE

Temporal anchor: August 19, 2026.

In scope:
- Case studies of pure convention/specification standards (AGENTS.md, EditorConfig, Twelve-Factor App, Conventional Commits, Semantic Versioning) and their tooling trajectories.
- GitHub Spec Kit's CLI-centric adoption vs. AGENTS.md's pure-markdown adoption.
- Developer onboarding friction associated with manual validation vs. one-command validation.
- Analysis of whether `init.sh` and `validate.js` already violate pure-spec positioning in practice.

## APPROACH

Examine historical precedents where adding companion tooling either expanded adoption or diluted a project's core identity. Evaluate whether companion tooling can remain strictly optional without becoming a de facto hard dependency.

## DELIVERABLE

Produce a comprehensive report covering:
1. Precedent survey of developer standards adding optional companion tooling.
2. Analysis of GitHub Spec Kit CLI adoption vs. AGENTS.md zero-tooling adoption.
3. Assessment of Kramak's existing scripts (`init.sh`, `validate.js`) relative to the brand promise.
4. Concrete recommendation on D-009: pure-files only, bundled optional CLI, or decoupled companion repo.
5. Functional boundary definition: what an optional tool should and shouldn't do.
6. Inline evidence grades and open risks with reversal triggers.

## FORMAT

Produce a single Markdown file opening with YAML frontmatter:

---
id: T2-09
title: "\"Pure Methodology\" Positioning: Optional Tooling / CLI Layer Tradeoffs"
date: 2026-08-19
status: complete
topic: pure-methodology-tooling
tags: [zero-dependency, companion-cli, brand-positioning, spec-kit, distribution, decision-record]
informs_decisions: [D-009]
confidence: <High | Medium | Low>
---

Body sections in exact order:
1. **Research Question**
2. **Key Findings** (3–7 bullets)
3. **Recommendation** (isolated decision on D-009)
4. **Alternatives Considered**
5. **Detailed Findings**
6. **Open Questions & Risks** (with reversal triggers)
7. **Sources & Evidence Ledger** (graded per Universal Evidence Standard)
```

---

### T2-10
#### Capability Gate Check: LLM Self-Assessment Reliability
*Layer 1 · One-Way Door · Deep Research · Informs D-004 · Dependencies: Soft on T2-02, T2-04*  
*Target Output:* `sessions/T2-10-capability-gate-reliability.md`

```markdown
## BRIEF

Investigate current research on whether Large Language Models can reliably self-assess or self-report their own capability level, and apply findings to Kramak's **Capability Gate Check** (Innovation #12). 

Kramak enforces strict model-agnosticism: it forbids hardcoding model names (e.g. checking for "gpt-4" or "claude-3-5-sonnet") and instead requires the executing agent to complete a structured self-assessment questionnaire to qualify for the high-reasoning Planner role. 

Your audience is a Principal Architect who needs to know whether pure self-assessment is trustworthy, whether smaller/cheaper models suffer from overconfidence/sycophancy, and what objective, model-agnostic diagnostic backstops (e.g. lightweight canary reasoning challenges) should be added.

## SCOPE

Temporal anchor: August 19, 2026.

In scope:
- Empirical research on LLM calibration and task/role-level self-evaluation (distinguished from single-answer confidence scores).
- Overconfidence, sycophancy, and capability over-claiming across model tiers.
- Deterministic, model-agnostic capability verification patterns (canary micro-tasks, diagnostic reasoning probes).
- Alternative gating mechanisms used in production agentic systems.

## APPROACH

Differentiate between per-answer confidence calibration (well-studied) and role-level capability self-assessment (narrower). Look specifically for empirical evidence on whether less capable models accurately self-disqualify from complex reasoning tasks. Design an objective backstop that preserves model-agnosticism.

## DELIVERABLE

Produce a comprehensive report covering:
1. Empirical review of LLM role-level self-assessment accuracy across frontier and efficient model classes.
2. Direction and magnitude of self-assessment calibration error.
3. Analysis of objective canary tasks vs. pure self-reporting.
4. Concrete recommendation on D-004: maintain pure self-assessment, implement diagnostic canary challenge, or use hybrid spot-checks.
5. Concrete prompt specification for the hardened Capability Gate.
6. Inline evidence grades and open risks with reversal triggers.

## FORMAT

Produce a single Markdown file opening with YAML frontmatter:

---
id: T2-10
title: "Capability Gate Check: LLM Self-Assessment Reliability"
date: 2026-08-19
status: complete
topic: capability-gate-reliability
tags: [self-assessment, calibration, capability-gating, model-agnostic, canary-tasks, decision-record]
informs_decisions: [D-004]
confidence: <High | Medium | Low>
---

Body sections in exact order:
1. **Research Question**
2. **Key Findings** (3–7 bullets)
3. **Recommendation** (isolated decision on D-004)
4. **Alternatives Considered**
5. **Detailed Findings**
6. **Open Questions & Risks** (with reversal triggers)
7. **Sources & Evidence Ledger** (graded per Universal Evidence Standard)
```

---

### T2-11
#### Adapter Strategy: Breadth vs. Depth Across 8 IDE/Agent Ecosystems
*Layer 1 · Two-Way Door · Fast Spike · Informs D-005 · Dependencies: Soft on T2-03*  
*Target Output:* `sessions/T2-11-adapter-strategy.md`

```markdown
## BRIEF

Using ecosystem findings from `sessions/T2-03-ide-ecosystem-scan.md`, determine whether Kramak should maintain all 8 IDE/agent adapters (Google Antigravity, Cursor, Claude Code, Windsurf, Cline/Roo Code, GitHub Copilot, Aider, Generic), consolidate to a deeply-maintained core set, or shift toward an AGENTS.md-native universal adapter core. 

Your audience is a Principal Architect facing real maintainability constraints for a solo-maintained open-source project in a fast-moving tooling landscape.

## SCOPE

Temporal anchor: August 19, 2026.

In scope:
- Relative market share, developer momentum, and extension stability of the 7 named tools.
- Maintenance economics of multi-target adapter ecosystems in comparable developer tools (linters, formatters, test runners).
- Community-maintenance patterns (how to enable third-party adapter contributions without gating core releases).
- The feasibility of a universal `AGENTS.md` / `SKILL.md` baseline that reduces IDE-specific adapter files to thin wrappers.

## APPROACH

Execute a fast, decisive spike. Rank the 8 adapters by maintenance cost versus adoption value. Establish clear deprecation and community-handoff criteria.

## DELIVERABLE

Produce a report covering:
1. Prioritized tier list of the 8 adapters with per-tool maintenance cost vs. value rationale.
2. Concrete recommendation on D-005: maintain all 8, consolidate to Tier 1 core (Antigravity, Cursor, Claude Code) + Generic, or adopt an AGENTS.md-native universal core.
3. Explicit deprecation triggers for underperforming adapters.
4. Community contribution specification for long-tail adapters.
5. Inline evidence grades and recommended revisit cadence.

## FORMAT

Produce a single Markdown file opening with YAML frontmatter:

---
id: T2-11
title: "Adapter Strategy: Breadth vs. Depth Across 8 IDE/Agent Ecosystems"
date: 2026-08-19
status: complete
topic: adapter-strategy
tags: [adapters, ide-ecosystem, maintenance-strategy, agents-md, decision-record]
informs_decisions: [D-005]
confidence: <High | Medium | Low>
---

Body sections in exact order:
1. **Research Question**
2. **Key Findings** (3–7 bullets)
3. **Recommendation** (isolated decision on D-005)
4. **Alternatives Considered**
5. **Detailed Findings**
6. **Open Questions & Risks** (with revisit cadence)
7. **Sources & Evidence Ledger** (graded per Universal Evidence Standard)
```

---

### T2-12
#### Naming & Positioning Statement: Kramak vs. the Competitive Field
*Layer 1 · One-Way Door · Fast Spike · Informs D-008 · Dependencies: Soft on T2-01*  
*Target Output:* `sessions/T2-12-naming-positioning.md`

```markdown
## BRIEF

Using competitive findings from `sessions/T2-01-competitive-landscape.md`, evaluate Kramak's category positioning, tagline, and discoverability. 

The project name **"Kramak" (क्रमक)** — Sanskrit for *sequential, step-by-step procedure* — is a fixed maintainer convention and is **not** open for reconsideration. What is open is how Kramak positions *around* the name: its tagline ("The missing SDLC for AI agents"), category framing ("Layer 3: Process alongside AGENTS.md and MCP"), and README messaging. 

Evaluate how this positioning resonates with English-speaking developers evaluating AI tools, compared against RIPER-5 and GitHub Spec Kit.

## SCOPE

Temporal anchor: August 19, 2026.

In scope:
- Developer-tool naming and positioning case studies (e.g. Sanskrit/non-English names in successful open source: Kubernetes, Istio, Temporal, Trino, Hasura).
- Positioning comparison against RIPER-5, Spec Kit, and Aider.
- Clarity of "SDLC for AI agents" vs. "Autonomous Agent Process Framework" vs. "Deterministic Plan-Execute-Audit Loop".
- Search discoverability and SEO optimization for the "Kramak" name and category keywords.

## APPROACH

Analyze how developers discover and adopt methodology standards. Test whether "SDLC" creates false expectations (inviting enterprise Scrum/Jira comparisons) versus highlighting autonomous agent execution control. Formulate concrete tagline and README copy options.

## DELIVERABLE

Produce a report covering:
1. Comparative positioning analysis of Kramak, Spec Kit, RIPER-5, and built-in agent loops.
2. Evidence on non-English naming adoption dynamics in developer infrastructure.
3. Concrete recommendation on D-008: refined tagline, category subtitle, and one-paragraph elevator pitch that preserves "Kramak" while maximizing technical clarity.
4. Objective analysis of the discoverability trade-offs of the Sanskrit root.
5. Inline evidence grades and open risks with reversal triggers.

## FORMAT

Produce a single Markdown file opening with YAML frontmatter:

---
id: T2-12
title: "Naming & Positioning Statement: Kramak vs. the Competitive Field"
date: 2026-08-19
status: complete
topic: naming-positioning
tags: [branding, positioning, tagline, discoverability, decision-record]
informs_decisions: [D-008]
confidence: <High | Medium | Low>
---

Body sections in exact order:
1. **Research Question**
2. **Key Findings** (3–7 bullets)
3. **Recommendation** (concrete tagline + explainer copy)
4. **Alternatives Considered**
5. **Detailed Findings**
6. **Open Questions & Risks** (with reversal triggers)
7. **Sources & Evidence Ledger** (graded per Universal Evidence Standard)
```

---

### T2-13
#### Core Guardrail, Grounding & Coordination Mechanisms: Confirmation Bundle
*Layer 1 · One-Way Door · Confirm / Audit · Informs D-003, D-010, D-011 · Dependencies: Soft on T2-04*  
*Target Output:* `sessions/T2-13-guardrail-confirmation-bundle.md`

```markdown
## BRIEF

Verify and confirm that Kramak's core execution-integrity, grounding, and human-coordination mechanisms represent sound implementations of established software engineering, distributed systems, and human-computer interaction (HCI) patterns. 

The mechanisms under audit:
1. **Grounded Verification (Innovation #1):** Specs must quote existing codebase lines confirmed by grep.
2. **Hard Scope Check (Innovation #6):** Deterministic `git diff --name-only` enforcement against the Work Item's declared file list.
3. **Circuit Breaker (Innovation #8):** Terminates infinite audit-fix-audit loops.
4. **State Reconciliation (Innovation #7):** Crash recovery restoring consistent state from `state.json` + git working tree.
5. **Failure Taxonomy (Innovation #5):** 6-category structured failure diagnosis.
6. **INBOX System & Human Task Protocol (Innovations #9 & #10):** Asynchronous user input and human blocking-task tracking.

Your audience is a Principal Architect requiring an efficient confirm-or-flag audit across all six mechanisms.

## SCOPE

Temporal anchor: August 19, 2026.

In scope:
- Grounding and citation-forcing patterns in LLM code generation.
- Deterministic diff-based scope enforcement and pre-commit hook security.
- Circuit breaker, exponential backoff, and retry-budget patterns in distributed systems.
- Idempotent state resumption, WAL-style crash recovery, and state reconciliation algorithms.
- SRE root-cause failure taxonomy design.
- Asynchronous human-in-the-loop escalation patterns in automation.

## APPROACH

Structure this as six compact sub-investigations. For each mechanism, compare Kramak's implementation against established engineering patterns, issue an explicit `Confirm` or `Flag for Hardening` verdict, and specify concrete improvements.

## DELIVERABLE

Structure the core deliverable with six distinct subsections and a **Summary Verdict Table**:
- Summary Verdict Table: Mechanism → Pattern Checked Against → Verdict (`Confirm` / `Flag`) → Concrete Hardening Required.
- In-depth analysis for each of the 6 mechanisms.
- Identification of the thinnest-evidenced mechanism requiring real-world telemetry validation.
- Recommendations for D-003, D-010, and D-011.
- Inline evidence grades throughout.

## FORMAT

Produce a single Markdown file opening with YAML frontmatter:

---
id: T2-13
title: "Core Guardrail, Grounding & Coordination Mechanisms: Confirmation Bundle"
date: 2026-08-19
status: complete
topic: guardrail-confirmation-bundle
tags: [grounded-verification, scope-check, circuit-breaker, state-reconciliation, failure-taxonomy, human-tasks, decision-record]
informs_decisions: [D-003, D-010, D-011]
confidence: <High | Medium | Low>
---

Body sections in exact order:
1. **Research Question**
2. **Key Findings** (organized across the 6 mechanisms)
3. **Recommendation (Summary Verdict Table)**
4. **Alternatives Considered**
5. **Detailed Findings** (6 subsections)
6. **Open Questions & Risks**
7. **Sources & Evidence Ledger** (graded per Universal Evidence Standard)
```

---

## Layer 2 — Blueprints & Specifications

---

### T2-14
#### Positioning, Distribution & Platform Layer Blueprint
*Layer 2 · Synthesis · Hard-gated on T2-08, T2-09, T2-11, T2-12 · Informs D-005, D-007, D-008, D-009*  
*Target Output:* `sessions/T2-14-positioning-platform-blueprint.md`

```markdown
## BRIEF

Synthesize the verdicts from the Specification Density decision (T2-08), the Pure Methodology / Optional Tooling decision (T2-09), the Adapter Strategy decision (T2-11), and the Naming & Positioning decision (T2-12), incorporating landscape context from T2-01, into a unified, actionable **Positioning, Distribution & Platform Layer Blueprint** for Kramak. 

Do not reopen upstream research questions; treat verdicts as settled inputs and resolve any tensions between them into an implementable specification roadmap.

Your audience is a Principal Architect who will use this blueprint directly to rewrite Kramak's README, update positioning copy, restructure documentation, and implement the adapter maintenance policy.

## SCOPE

Temporal anchor: August 19, 2026.

In scope:
- Reconciling the 4 upstream decisions into a unified distribution and positioning roadmap.
- Concrete revised README copy: tagline, category subtitle, elevator pitch, and comparison table.
- Detailed progressive-disclosure spec restructuring plan (if T2-08 recommended modularization).
- Companion CLI strategy and repository boundary definition (per T2-09).
- Adapter tiering, maintenance matrix, and deprecation triggers (per T2-11).
- Backward-compatibility and migration guidance for existing v1.0.0 adopters.

## APPROACH

Read all 4 upstream session outputs. Identify and resolve any strategic tensions (e.g. ensuring tagline messaging aligns with spec density and companion tooling choices). Output concrete text and structural specifications.

## DELIVERABLE

Produce a comprehensive blueprint covering:
1. Finalized Positioning & Messaging Copy (tagline, subtitle, elevator pitch).
2. Specification Restructuring Blueprint (file layout, progressive disclosure hierarchy).
3. Tooling & Distribution Architecture (optional companion CLI boundary and scripts).
4. Adapter Portfolio Roadmap (Tier 1 core vs. community-maintained adapters).
5. Migration & Backward Compatibility Guide for v1.0.0 projects.
6. Traceability matrix mapping blueprint items to upstream session evidence.

## FORMAT

Produce a single Markdown file opening with YAML frontmatter:

---
id: T2-14
title: "Positioning, Distribution & Platform Layer Blueprint"
date: 2026-08-19
status: complete
topic: positioning-platform-blueprint
tags: [synthesis, blueprint, positioning, spec-restructuring, adapter-strategy, companion-tooling]
informs_decisions: [D-005, D-007, D-008, D-009]
confidence: <High | Medium | Low>
---

Body sections in exact order:
1. **Synthesis Mandate**
2. **Executive Summary of Upstream Verdicts**
3. **Recommendation (The Master Platform Blueprint)**
4. **Alternatives Considered & Reconciled Tensions**
5. **Detailed Specifications & Spec-Delta Text**
6. **Open Risks & Implementation Dependencies**
7. **Traceability Ledger** (mapping blueprint sections to source sessions)
```

---

### T2-15
#### Core Engine, Verification & Governance Hardening Blueprint
*Layer 2 · Synthesis · Hard-gated on T2-05, T2-06, T2-07, T2-10, T2-13 · Informs D-001, D-002, D-003, D-004, D-006, D-010, D-011*  
*Target Output:* `sessions/T2-15-core-engine-governance-blueprint.md`

```markdown
## BRIEF

Synthesize the verdicts from the Core Loop Retrospective (T2-05), Multi-Agent Evolution (T2-06), Self-Improvement Governance (T2-07), Capability Gate Reliability (T2-10), and Guardrail Confirmation Bundle (T2-13) into an authoritative **Core Engine, Verification & Governance Hardening Blueprint** for Kramak v1.1+. 

Specify exact modifications to:
1. The 5-state FSA transition rules in `spec/PLANNER.md` and `spec/EXECUTOR.md`.
2. The `state.json` schema (in `templates/` and `spec/state.schema.json`) for multi-agent execution and versioning.
3. The hardened Anti-Bias Guard 5-point checklist and self-modification governance.
4. The Capability Gate Check diagnostic verification procedure.
5. Grounded Verification, Hard Scope Check, and Circuit Breaker enforcement rules.

Your audience is a Principal Architect preparing to author the v1.1+ specification changes.

## SCOPE

Temporal anchor: August 19, 2026.

In scope:
- Reconciling the 5 upstream decision records into an internally consistent technical specification.
- Concrete before/after spec deltas for `spec/PLANNER.md`, `spec/EXECUTOR.md`, and `spec/PRINCIPLES.md`.
- Formal JSON Schema deltas for `state.schema.json` (supporting versioning, worktree tracking, and subagent state).
- Exact specification text for hardened Anti-Bias Guard and Capability Gate canary tasks.
- Reconciling multi-agent concurrency with deterministic State Reconciliation.

## APPROACH

Review all 5 upstream decision files. Resolve cross-cutting interactions (e.g. how multi-agent parallel execution interacts with Capability Gating and Hard Scope Checks). Provide exact drop-in text and schema deltas.

## DELIVERABLE

Produce a comprehensive blueprint covering:
1. State Machine Topology & FSM Specification Deltas (states, transitions, invariants).
2. JSON Schema Delta Specification for `state.json` (with versioning and worktree extensions).
3. Hardened Governance Specification (Anti-Bias Guard, rollback log, human gate).
4. Hardened Verification Specification (Capability Gate canary, Hard Scope Check, Circuit Breaker).
5. Implementation sequencing and backward-compatibility audit.
6. Traceability ledger connecting all spec deltas to upstream session evidence.

## FORMAT

Produce a single Markdown file opening with YAML frontmatter:

---
id: T2-15
title: "Core Engine, Verification & Governance Hardening Blueprint"
date: 2026-08-19
status: complete
topic: core-engine-governance-blueprint
tags: [synthesis, blueprint, fsm-spec, json-schema, anti-bias-guard, capability-gate, spec-delta]
informs_decisions: [D-001, D-002, D-003, D-004, D-006, D-010, D-011]
confidence: <High | Medium | Low>
---

Body sections in exact order:
1. **Synthesis Mandate**
2. **Executive Summary of Upstream Engine Verdicts**
3. **Recommendation (The Master Engine Blueprint)**
4. **Alternatives Considered & Reconciled Tensions**
5. **Detailed Spec Deltas & Schema Definitions**
6. **Open Risks & Implementation Dependencies**
7. **Traceability Ledger** (mapping engine deltas to source sessions)
```

---

## Sink — Grand Synthesis

---

### T2-16
#### Grand Synthesis: Kramak Founding Architecture Document (FAD) Compilation & Phase 0 Gate Readiness
*Sink · Compilation & Gating · Hard-gated on T2-14, T2-15 · Informs All Decisions*  
*Target Output:* `sessions/T2-16-grand-synthesis-fad.md`

```markdown
## BRIEF

This is the terminal sink node of the Kramak Research Pipeline. Integrate the Positioning & Platform Blueprint (T2-14), the Core Engine & Governance Blueprint (T2-15), and all 11 decision records from `DECISIONS.md` to compile the authoritative **Founding Architecture Document (FAD)** for Kramak, following the structure in `templates/FOUNDING-ARCHITECTURE.template.md`. 

In addition, perform the final **Phase 0 Exit Gate Audit** across Track A (two-way doors) and Track B (one-way doors) using `templates/PHASE-0-GATE.template.md`. 

Your audience is the Principal Architect authorizing the transition from Phase 0 (Research & Validation) to Phase 1 (Implementation & v1.1 Specification Authoring).

## SCOPE

Temporal anchor: August 19, 2026.

In scope:
- Complete compilation of the Founding Architecture Document populating all 9 sections of `templates/FOUNDING-ARCHITECTURE.template.md`.
- Comprehensive audit of all 11 decisions in `DECISIONS.md` ensuring no decisions remain `proposed`.
- Cross-blueprint consistency audit ensuring zero unresolved contradictions between platform and engine blueprints.
- Gary Klein Premortem protocol verification for all one-way door decisions.
- Definitive GO / NO-GO / GO-WITH-CONDITIONS verdict for v1.1 implementation.

Out of scope:
- Introducing new unverified primary research (flag any genuine unresolved gap for `templates/CONFLICT-RESOLUTION.template.md`).

## APPROACH

Systematically ingest the Layer 2 blueprints (T2-14, T2-15) and all 11 decision records. Verify that every decision meets its evidence threshold. Perform the 12-month prospective hindsight premortem exercise. Seal the Founding Architecture Document.

## DELIVERABLE

Produce a comprehensive synthesis deliverable containing:
1. Complete, sealed **Founding Architecture Document (FAD)** ready to be committed to repository root.
2. Completed **Phase 0 Gate Checklist** across Track A and Track B.
3. Cross-Cutting Consistency Matrix verifying alignment between state machine, schema, adapters, and positioning.
4. Comprehensive Gary Klein Premortem analysis (top 3 failure scenarios and mitigations).
5. Explicit **GO / NO-GO Verdict** for v1.1 specification release authoring.

## FORMAT

Produce a single Markdown file opening with YAML frontmatter:

---
id: T2-16
title: "Grand Synthesis: Kramak Founding Architecture Document (FAD) Compilation & Phase 0 Gate Readiness"
date: 2026-08-19
status: complete
topic: grand-synthesis-fad
tags: [fad-compilation, grand-synthesis, phase-0-gate, premortem, go-no-go]
informs_decisions: [D-001, D-002, D-003, D-004, D-005, D-006, D-007, D-008, D-009, D-010, D-011]
confidence: <High | Medium | Low>
---

Body structure:
1. **Executive Architecture Summary & Gate Verdict** (GO / NO-GO / GO-WITH-CONDITIONS)
2. **Complete Founding Architecture Document (FAD)** (Sections 1–9 per `templates/FOUNDING-ARCHITECTURE.template.md`)
3. **Completed Two-Track Phase 0 Exit Gate** (Track A & Track B audit per `templates/PHASE-0-GATE.template.md`)
4. **Gary Klein Premortem Analysis & Risk Register**
5. **Master Traceability Matrix** (Connecting all FAD chapters to T2-01 through T2-15 sessions)
```
