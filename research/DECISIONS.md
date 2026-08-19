---
title: "Kramak — Decision Registry (DECISIONS.md)"
project: "Kramak (क्रमक)"
version_under_review: "1.0.0"
target_version: "1.1.0"
generated: "2026-08-19"
status: "phase-0-sealed"
companion_files: ["RESEARCH-PIPELINE.md", "PROMPT-LIBRARY.md", "FOUNDING-ARCHITECTURE.md"]
schema_version: "3.0"
---

# Kramak (क्रमक) — Architectural Decision Registry

> **Locked Decision Source of Truth**  
> Companion to [RESEARCH-PIPELINE.md](file:///d:/dev/pro/kramak/research/RESEARCH-PIPELINE.md), [PROMPT-LIBRARY.md](file:///d:/dev/pro/kramak/research/PROMPT-LIBRARY.md), and [FOUNDING-ARCHITECTURE.md](file:///d:/dev/pro/kramak/FOUNDING-ARCHITECTURE.md).  
> This registry tracks all 11 architectural decisions governing Kramak's v1.0.0 audit and v1.1+ evolution. All decisions are locked following the successful clearance of the Phase 0 Exit Gate.

---

## 1. Decision Registry Status & Lifecycle

1. **Current State:** **Phase 0 Sealed (11/11 Decisions Locked).**
2. **Phase 0 Exit Gate:** Cleared on 2026-08-19.
   - **Track A (Fast-Track):** 4 Two-Way Door Decisions (D-002, D-005, D-007, D-011) — 100% PASS.
   - **Track B (Rigorous 9-Step):** 7 One-Way Door Decisions (D-001, D-003, D-004, D-006, D-008, D-009, D-010) — 100% PASS.
3. **Phase 1 Implementation:** Approved for v1.1.0 specification authoring and scaffolding.
4. **Reversal & Decay Protocol:** Every locked decision has a measurable review trigger. When a trigger condition is met during operation, the decision is reopened for formal re-evaluation.

---

## 2. Fixed Constraints (Non-Negotiable Axioms)

The following foundational principles are fixed by authorial convention and core project scope. They are **not** open for re-litigation:

| # | Fixed Constraint | Scope & Boundary |
|---|---|---|
| **C1** | **Project Name: Kramak (क्रमक)** | Sanskrit naming (*√kram* + *-aka*, "the agent who progresses methodically") is an immutable authorial convention across projects. D-008 evaluates tagline, positioning, and subtitle legibility. |
| **C2** | **Zero Mandatory Runtime Dependencies** | The core specification consists purely of Markdown specifications, JSON Schemas (Draft 2020-12), and Git repository mechanics. D-009 houses all optional companion tooling in a separate repository (`kramak-cli`). |
| **C3** | **Model-Agnostic via Capability Assessment** | Kramak operates across any LLM without model-name checking. D-004 hardens the capability gate using procedural Canary Challenges (CT-1..5). |
| **C4** | **IDE-Agnostic Core + Adapter Translation** | The core state machine and Work Item specifications are IDE-neutral; platform adapters translate into host-native instructions. D-005 establishes a universal `AGENTS.md`/`SKILL.md` baseline with Tier 1 deep overlays. |
| **C5** | **MIT License** | Fully open source, community-accessible, and commercially unencumbered. |
| **C6** | **v1.0.0 Shipped Baseline** | August 2026 release (48 files, 8 adapters, 12 innovations) is the historical baseline upgraded to v1.1+. |

---

## 3. Decision Registry Summary

| ID | Title | Door Type | Track | Status | Chosen Option / Resolution | Informing Sessions | Validated Innovations |
|---|---|:---:|:---:|:---:|---|---|---|
| **D-001** | Core FSA State Topology & Role Separation | 🔒 One-Way | Track B | `accepted` | 7-State Closed FSM with Bounded Retries & Pareto Role Split | T2-05, T2-02, T2-15, T2-16 | #3 (Perspective Planning) |
| **D-002** | Multi-Agent Orchestration & Parallel Execution | 🔁 Two-Way | Track A | `accepted — review at trigger` | Option B: Sequential Default + Worktree-Isolated Extension | T2-06, T2-02, T2-03, T2-15, T2-16 | Post-v1.0.0 Roadmap |
| **D-003** | State Persistence, Invariants & Schema Versioning | 🔒 One-Way | Track B | `accepted` | SemVer JSON Schema Draft 2020-12 + WAL Atomic Writes | T2-04, T2-05, T2-15, T2-16 | #7 (State Reconciliation) |
| **D-004** | Model-Agnostic Capability Gating & Calibration | 🔒 One-Way | Track B | `accepted` | Hybrid Gate: Stage 1 Self-Report + Stage 2 Canary Battery | T2-10, T2-04, T2-15, T2-16 | #12 (Capability Gate) |
| **D-005** | Adapter Portfolio Economics & Integration Strategy | 🔁 Two-Way | Track A | `accepted — review at trigger` | Universal AGENTS.md Core + Tier 1 Deep Overlays (Claude/Cursor) | T2-11, T2-03, T2-14, T2-16 | #11 (Auto-Bootstrap) |
| **D-006** | Self-Improvement Governance & Anti-Bias Guard | 🔒 One-Way | Track B | `accepted` | Hardened G1–G6 Anti-Bias Guard + Immutable Ledger & Gate | T2-07, T2-02, T2-15, T2-16 | #2 (Anti-Bias Guard) |
| **D-007** | Specification Density & Progressive Disclosure | 🔁 Two-Way | Track A | `accepted` | Progressive Disclosure: Lean ROUTER.md + On-Demand Modules | T2-08, T2-01, T2-14, T2-16 | #4 (Spec Detail Scaling) |
| **D-008** | Category Positioning, Naming & Tagline Legibility | 🔒 One-Way | Track B | `accepted` | Process Control Framing + Sanskrit Name + 3-Layer Mental Model | T2-12, T2-01, T2-14, T2-16 | Category Positioning |
| **D-009** | Pure-Methodology vs. Optional Tooling/CLI Layer | 🔒 One-Way | Track B | `accepted` | Option 3 (EditorConfig Model): Decoupled Companion kramak-cli | T2-09, T2-01, T2-03, T2-14, T2-16 | Distribution Model |
| **D-010** | Execution Integrity, Grounding & Scope Enforcement | 🔒 One-Way | Track B | `accepted` | 3-Tier Hard Scope Check + Grounded Grep Quotes + WAL | T2-13, T2-04, T2-15, T2-16 | #1, #6, #8, #9, #10 |
| **D-011** | Quantitative Design Parameters & Failure Taxonomy | 🔁 Two-Way | Track A | `accepted` | METR Horizon Recalibration + Polish Ceiling + Repair Taxonomy | T2-04, T2-13, T2-15, T2-16 | #5, METR Cap, Polish Ceiling |

**Distribution:** 7 One-Way Doors (Track B: 9-Step Rigorous Gate) · 4 Two-Way Doors (Track A: Fast-Track Gate).

---

## 4. Architectural Decision Records (ADRs)

```yaml
---
id: D-001
title: "Core FSA State Topology & Planner/Executor Role Separation"
status: accepted
door_type: one-way
route: deep-research
track: Track B
date: 2026-08-19
confidence: high
chosen_option: "H3 (7-State Closed-Loop FSM with Bounded Retries & Pareto Role Split)"
evidence_refs: ["T2-05", "T2-02", "T2-15", "T2-16"]
review_trigger: "Empirical SWE-bench or agentic benchmark data demonstrating that unified single-agent loops equal or exceed role-split accuracy with lower token cost and zero context loss."
---
```

### D-001 — Core FSA State Topology & Planner/Executor Role Separation 🔒

- **Context & Problem:** Kramak structures autonomous development as a deterministic state machine, pairing a high-reasoning "Planner" model with a fast/precise "Executor" model. Research evaluated whether modern large-context models make role splits obsolete or whether FSM-constrained cognitive separation remains optimal.
- **Validates Claims:** Innovation #3 (Perspective-Based Planning: PERCEIVE → REASON → DECIDE).
- **Resolution:** **Accepted H3.** Upgrade the v1.0.0 5-state FSA to an algebraically closed 7-state control plane (`BOOTSTRAP`, `PLANNING`, `DISPATCH`, `EXECUTING`, `AUDITING`, `WAITING`, `ESCALATED`, `COMPLETE`). The Planner operates a tool-grounded PERCEIVE→REASON→DECIDE loop using expensive reasoning models; the Executor executes an interleaved ReAct loop; the Auditor performs execution-grounded test runs.
- **Alternatives Considered & Rejected:**
  - *H1 (Status Quo 5-State FSA):* Rejected because v1.0.0 lacked explicit terminal/completion states, bounded retry loops, and formalized model tier routing for Auditing.
  - *H2 (Unified Single-Agent Continuous Loop):* Rejected because empirical multi-agent literature (T2-02, T2-05) demonstrates 15–28% higher defect rates in unconstrained continuous loops due to planning context drift and confirmation bias.
- **Review Trigger:** Empirical benchmark data showing unified-agent loops match role-split accuracy with lower token overhead.

---

```yaml
---
id: D-002
title: "Multi-Agent Orchestration & Parallel Execution Evolution Path"
status: accepted — review at trigger
door_type: two-way
route: deep-research
track: Track A
date: 2026-08-19
confidence: high
chosen_option: "H2 (Option B: Sequential Baseline Default with Git-Worktree Parallel Extension)"
evidence_refs: ["T2-06", "T2-02", "T2-03", "T2-15", "T2-16"]
review_trigger: "≥2 major AI coding IDEs ship stable, default multi-agent parallel execution as standard workflow, or >2 merge-thrash incidents occur per 10 parallel batches."
---
```

### D-002 — Multi-Agent Orchestration & Parallel Execution Evolution 🔁

- **Context & Problem:** 2026 developer tools introduce native subagents (Antigravity) and background worktree execution (Cursor). Kramak needed an evolution path for parallel Work Items without sacrificing deterministic auditability.
- **Validates Claims:** Post-v1.0.0 Architecture Roadmap.
- **Resolution:** **Accepted H2.** Retain deterministic single-agent sequential execution as zero-configuration default (`concurrency.budget = 1`). Provide an opt-in parallel execution extension with git-worktree filesystem isolation (`.kramak/worktrees/<id>`), per-Work-Item single-writer state shards (`.kramak/work-items/WI-XXX.json`), Tier 2 pre-flight scope exclusion, and a serialized FIFO merge queue.
- **Alternatives Considered & Rejected:**
  - *H1 (Strict Sequential Only):* Rejected as overly restrictive for multi-module codebases where independent tasks can execute in parallel with zero merge conflict risk.
  - *H3 (Multi-Agent Native Swarm Core):* Rejected because emergent swarm dialogue introduces 37% coordination failure rates (MAST benchmark) and write race conditions on `state.json`.
- **Review Trigger:** Ecosystem standard shifts or merge collision rate exceeding 2 per 10 batches.

---

```yaml
---
id: D-003
title: "State Persistence, Invariants & Schema Versioning Policy"
status: accepted
door_type: one-way
route: confirm
track: Track B
date: 2026-08-19
confidence: high
chosen_option: "H1 + H3 (SemVer JSON Schema Draft 2020-12 with WAL Atomic Writes & Migration Shims)"
evidence_refs: ["T2-04", "T2-05", "T2-15", "T2-16"]
review_trigger: "First proposed breaking schema change, or reports of state file corruption across crash recovery."
---
```

### D-003 — State Persistence, Invariants & Schema Versioning Policy 🔒

- **Context & Problem:** `state.json` is the cross-session persistence backbone and wire format. Schema invariants must ensure permanent backward compatibility and crash recovery without partial write corruption.
- **Validates Claims:** Innovation #7 (State Reconciliation & Crash Recovery).
- **Resolution:** **Accepted H1+H3.** Standardize on JSON Schema Draft 2020-12 with strict SemVer (`schema_version: "1.1.0"`). Implement Write-Ahead Logging (WAL) and atomic writes (write to `.kramak/state.json.tmp`, flush, atomic rename). Embed non-destructive migration shims in `BOOTSTRAP` to upgrade v1.0.0 state files automatically.
- **Alternatives Considered & Rejected:**
  - *H2 (Additive-Only Guarantee):* Rejected as overly rigid for major architectural transitions where legacy deprecated fields must eventually be cleaned up.
- **Review Trigger:** Breaking schema evolution proposal or state corruption incident.

---

```yaml
---
id: D-004
title: "Model-Agnostic Capability Gating & Self-Assessment Calibration"
status: accepted
door_type: one-way
route: deep-research
track: Track B
date: 2026-08-19
confidence: high
chosen_option: "H2 (Hybrid Gate: Advisory Stage 1 Self-Assessment + Binding Stage 2 Canary Challenge Battery CT-1..5)"
evidence_refs: ["T2-10", "T2-04", "T2-15", "T2-16"]
review_trigger: "Confirmed leakage of Canary Challenge generator templates into public pre-training corpora, or new benchmark papers on task-level LLM self-calibration."
---
```

### D-004 — Model-Agnostic Capability Gating & Calibration 🔒

- **Context & Problem:** Kramak strictly forbids model-name checking (Constraint C3). Innovation #12 relied on structured self-assessment to qualify models for the Planner role. Research revealed that subjective LLM self-assessment suffers from severe overconfidence and sycophancy.
- **Validates Claims:** Innovation #12 (Capability Gate Check).
- **Resolution:** **Accepted H2.** Replace pure self-report with a hybrid gate: an advisory Stage 1 self-assessment questionnaire followed by a binding Stage 2 Canary Challenge Battery of 5 procedurally generated, deterministically graded micro-tasks (CT-1: DAG Scheduling, CT-2: Plan-Bug Detection, CT-3: State Tracking, CT-4: Instruction Hierarchy, CT-5: Paraphrase Consistency). Pass threshold: Score $\ge 0.80$; Fail-closed threshold: Score $< 0.60 \rightarrow$ route to `WAITING`.
- **Alternatives Considered & Rejected:**
  - *H1 (Pure Self-Report Checklist):* Rejected because empirical calibration literature (T2-10) shows weaker models over-claim capabilities 70%+ of the time.
  - *H3 (Model-Name Allowlist):* Rejected as a violation of non-negotiable Constraint C3.
- **Review Trigger:** Canary template dataset leakage or new LLM calibration benchmarks.

---

```yaml
---
id: D-005
title: "Adapter Portfolio Economics & Integration Surface Strategy"
status: accepted — review at trigger
door_type: two-way
route: fast-spike
track: Track A
date: 2026-08-19
confidence: high
chosen_option: "H3 (Universal AGENTS.md/SKILL.md Core + Tier 1 Deep Overlays + Community Governance)"
evidence_refs: ["T2-11", "T2-03", "T2-14", "T2-16"]
review_trigger: "Upstream format deprecation in Claude Code or Cursor, or promotion of Google Antigravity to Tier 1 upon enterprise/CLI stabilization."
---
```

### D-005 — Adapter Portfolio Economics & Integration Strategy 🔁

- **Context & Problem:** Maintaining 8 bespoke IDE adapters creates unsustainable overhead for a solo maintainer in a rapidly shifting tooling landscape.
- **Validates Claims:** Innovation #11 (Auto-Bootstrap across toolchains).
- **Resolution:** **Accepted H3.** Adopt a universal `AGENTS.md` + `SKILL.md` baseline emitted at project root. Maintain deep logic for Tier 1 tools (Claude Code `@AGENTS.md` bridge in `CLAUDE.md`, Cursor `.cursor/rules/*.mdc` glob rules). Tier 2 (Antigravity, Copilot) and Tier 3 (Devin, Cline, Aider) operate as thin wrappers over the universal core. Deprecate Roo Code (upstream shutdown). Move long-tail adapters to `kramak-community-adapters` with automated contract testing.
- **Alternatives Considered & Rejected:**
  - *H1 (Full Bespoke 8-Adapter Maintenance):* Rejected due to high maintenance burden and brittle synchronization across 8 diverging configuration formats.
  - *H2 (Universal Only / Zero Host Overlays):* Rejected because it sacrifices critical IDE capabilities like Cursor glob scoping and Claude Code subagent hooks.
- **Review Trigger:** IDE configuration format deprecations or Antigravity enterprise CLI stabilization.

---

```yaml
---
id: D-006
title: "Self-Improvement Governance & Anti-Bias Guard Robustness"
status: accepted
door_type: one-way
route: deep-research
track: Track B
date: 2026-08-19
confidence: high
chosen_option: "H2 + H3 (Hardened G1–G6 Anti-Bias Guard with Immutable Ledger & Risk-Tiered Human Gate)"
evidence_refs: ["T2-07", "T2-02", "T2-15", "T2-16"]
review_trigger: "Any incident where a pipeline self-modification introduces a regression caught only after merge, or G6 human gate approval rate >98% with <30s review."
---
```

### D-006 — Self-Improvement Governance & Anti-Bias Guard 🔒

- **Context & Problem:** Kramak is self-improving (agents propose edits to Kramak's own specs during audits). Innovation #2 used a 5-point checklist to prevent recency bias. Research showed checklists fail against LLM compliance theater and self-preference.
- **Validates Claims:** Innovation #2 (Anti-Bias Guard).
- **Resolution:** **Accepted H2+H3.** Replace the 5-point checklist with the hardened G1–G6 framework: programmatic git history diff (G1), automated precedent cross-check (G2), dual-model critique pass (G3), immutable audit ledger `.kramak/ledger/self-modifications.jsonl` (G4), canary cooldown window (G5), and risk-tiered human gate (G6). A strict Preamble establishes that self-modifications to governance rules are maximum blast radius and require mandatory named human approval.
- **Alternatives Considered & Rejected:**
  - *H1 (Proportionate 5-Point Checklist As-Is):* Rejected because empirical safety literature (T2-07) proves LLMs routinely self-rationalize flawed modifications through subjective checklists.
- **Review Trigger:** Spec regression slipping past G1–G6 or human rubber-stamping.

---

```yaml
---
id: D-007
title: "Specification Density, Cognitive Friction & Progressive Disclosure"
status: accepted
door_type: two-way
route: deep-research
track: Track A
date: 2026-08-19
confidence: high
chosen_option: "H2 (Progressive Disclosure: Lean ROUTER.md + Phase CORE.md + On-Demand Playbooks)"
evidence_refs: ["T2-08", "T2-01", "T2-14", "T2-16"]
review_trigger: "Agent benchmark adherence dropping >5% on modular specs compared to monolithic specs, or persistent user feedback citing spec navigation friction."
---
```

### D-007 — Specification Density & Progressive Disclosure Strategy 🔁

- **Context & Problem:** Monolithic specs (`PLANNER.md` 41.5KB, `EXECUTOR.md` 17.7KB) exceed Claude Code's 25KB eager-load ceiling, trigger attention decay, and induce 45% adherence collapse when 20+ rules are stacked in context.
- **Validates Claims:** Innovation #4 (Spec Detail Scaling: 🔴 Guided / 🟡 Directed / 🟢 Outcome).
- **Resolution:** **Accepted H2.** Modularize specifications into a progressive disclosure hierarchy: `.kramak/ROUTER.md` (≤ 2.0 KB, always loaded, holding non-negotiable invariants), `planner/CORE.md` (≤ 8.5 KB, loaded during `PLANNING`), `executor/CORE.md` (≤ 6.5 KB, loaded during `EXECUTING`), on-demand specialized playbooks (edge cases, tool playbooks, error recovery), and dynamic `PROGRESS.md`. Non-negotiable invariants are never scaled down in any detail tier.
- **Alternatives Considered & Rejected:**
  - *H1 (Preserve Monolithic Specs):* Rejected due to proven context degradation, token waste, and IDE prompt-truncation ceilings.
  - *H3 (Spec Kit Staged Artifact Pipeline):* Rejected because multi-step artifact generation introduces unnecessary ceremony overhead for routine coding tasks.
- **Review Trigger:** Benchmark evidence of modular spec adherence degradation.

---

```yaml
---
id: D-008
title: "Category Positioning, Naming & Tagline Legibility"
status: accepted
door_type: one-way
route: fast-spike
track: Track B
date: 2026-08-19
confidence: high
chosen_option: "H2 (Preserve Sanskrit Name 'Kramak' + Process Control Tagline + 3-Layer Mental Model)"
evidence_refs: ["T2-12", "T2-01", "T2-14", "T2-16"]
review_trigger: "Adoption analytics showing search discovery friction, or organic search referral traffic dropping >25% over 90 days."
---
```

### D-008 — Category Positioning, Naming & Tagline Legibility 🔒

- **Context & Problem:** Evaluated whether the Sanskrit name "Kramak" and tagline ("The missing SDLC for AI agents") created discovery or comprehension friction among developers.
- **Validates Claims:** Category Framing & Market Positioning.
- **Resolution:** **Accepted H2.** Preserve the Sanskrit name "Kramak (क्रमक)" (methodical sequential progression). Retire "SDLC" from primary tagline to avoid enterprise buzzword contamination and overclaiming. Lead with: *"Kramak: process control for autonomous coding agents"*. Subtitle: *"Layer 3 — Process, alongside AGENTS.md (Context) and MCP (Connectivity)"*. Retain "Agentic SDLC" as secondary SEO keyword.
- **Alternatives Considered & Rejected:**
  - *H1 (Status Quo Tagline "The Missing SDLC"):* Rejected because "SDLC" invites false comparisons to Jira/Scrum and enterprise lifecycle frameworks.
  - *H3 (Reposition to "Agent Orchestration Standard"):* Rejected because Kramak governs process, not runtime model execution swarms.
- **Review Trigger:** Organic search referral drop >25% or user confusion surveys.

---

```yaml
---
id: D-009
title: "Pure-Methodology Identity vs. Optional Tooling/CLI Layer"
status: accepted
door_type: one-way
route: deep-research
track: Track B
date: 2026-08-19
confidence: high
chosen_option: "H3 (Option 3 / EditorConfig Model: Decoupled Companion Repository kramak-cli)"
evidence_refs: ["T2-09", "T2-01", "T2-03", "T2-14", "T2-16"]
review_trigger: "Companion CLI download traffic <10% of core repository views after 2 minor release cycles."
---
```

### D-009 — Pure-Methodology Identity vs. Optional Tooling/CLI Layer 🔒

- **Context & Problem:** Evaluated whether shipping an official CLI binary compromises Kramak's brand promise of "pure methodology, zero mandatory runtime dependencies."
- **Validates Claims:** Distribution Model & Tooling Strategy.
- **Resolution:** **Accepted H3.** Adopt the EditorConfig model: decouple all executable tooling into an independent companion repository (`github.com/bhaskarjha-dev/kramak-cli`) publishing `@kramak/cli` (npm) and `kramak-cli` (cargo). Keep the core `kramak` repository 100% pure Markdown, JSON Schemas, and templates. Remove `init.sh`, `init.ps1`, and `validate.js` from core root, providing 90-day redirection shims. Core README leads with 30-second pure copy-paste bootstrap.
- **Alternatives Considered & Rejected:**
  - *H1 (Strict Pure-Files / Zero CLI Anywhere):* Rejected because manual schema validation creates developer onboarding friction.
  - *H2 (Bundled CLI in Core Repo):* Rejected because package manifests (`package.json`, lockfiles) in the core repo directly invalidate the zero-dependency brand promise upon inspection.
- **Review Trigger:** Low companion CLI discovery traffic (<10% ratio).

---

```yaml
---
id: D-010
title: "Execution Integrity, Grounding & Scope Enforcement"
status: accepted
door_type: one-way
route: confirm
track: Track B
date: 2026-08-19
confidence: high
chosen_option: "H2 (3-Tier Hard Scope Check + Grounded Grep Line Citations + WAL Recovery + Progress-Aware Circuit Breaker)"
evidence_refs: ["T2-13", "T2-04", "T2-15", "T2-16"]
review_trigger: "Documented instance of an agent bypassing Hard Scope Check or hallucinating code while claiming grep verification."
---
```

### D-010 — Execution Integrity, Grounding & Scope Enforcement 🔒

- **Context & Problem:** Audited the core correctness mechanisms: Grounded Verification (grep-confirmed quotes), Hard Scope Check (`git diff --name-only`), Circuit Breaker, State Reconciliation, INBOX, and Human Tasks.
- **Validates Claims:** Innovations #1, #6, #8, #9, #10.
- **Resolution:** **Accepted H2.** Confirm all core mechanisms with concrete hardening:
  - *Grounded Verification:* Mandatory line-number citations and relevance checks via live grep.
  - *3-Tier Hard Scope Check:* Tier 1 (worktree diff), Tier 2 (pre-flight glob intersection), Tier 3 (merge re-verification).
  - *Progress-Aware Circuit Breaker:* Detects state-hash repeat oscillations in addition to 3-attempt caps.
  - *State Reconciliation:* Write-Ahead Logging (WAL) intent-before-mutation ordering with atomic temp-rename writes.
  - *Human Tasks & INBOX:* Formalized blocking vs. non-blocking task protocols.
- **Alternatives Considered & Rejected:**
  - *H1 (Mechanisms Confirmed As-Is without Hardening):* Rejected because unhardened scope checks allowed agents to modify declared file lists to evade diff gates.
- **Review Trigger:** Real-world incident of scope evasion or grep hallucination.

---

```yaml
---
id: D-011
title: "Quantitative Design Parameters & Failure Taxonomy"
status: accepted
door_type: two-way
route: evidentiary-audit
track: Track A
date: 2026-08-19
confidence: high
chosen_option: "H2 (METR Horizon Recalibration + Polish Ceiling FeatBench Grounding + 6 Repair-Oriented Categories)"
evidence_refs: ["T2-04", "T2-13", "T2-15", "T2-16"]
review_trigger: "Audit failures failing to classify into the 6 categories, or updated METR task-horizon benchmark publications."
---
```

### D-011 — Quantitative Design Parameters & Failure Taxonomy 🔁

- **Context & Problem:** Evidentiary audit of Kramak's quantitative numbers: 2-hour Work Item cap (citing METR), Polish Ceiling Rule, and 6-category Failure Taxonomy.
- **Validates Claims:** Innovation #5 (Failure Taxonomy), METR citation accuracy, Polish Ceiling Rule.
- **Resolution:** **Accepted H2.**
  - *2-Hour Task Cap:* Recalibrated citation to clarify that METR measures human-task-horizon capability frontiers (80% reliability threshold $\approx 30$–$45$ minutes of autonomous agent work $\approx 2$ hours of human engineering equivalent).
  - *Polish Ceiling Rule:* Grounded in FeatBench empirical scope-creep literature (constraining diffs to $\le 5$ files and $\le 50$ lines per standard Work Item).
  - *Failure Taxonomy:* Formalized as 6 repair-oriented categories (`code-drift`, `verification-fail`, `scope-exceeded`, `dependency-missing`, `ambiguous-spec`, `tool-error`) crosswalked with classical ODC and modern MAST taxonomies.
- **Alternatives Considered & Rejected:**
  - *H1 (Parameters Validated As-Is):* Rejected because METR citation was overstated as a prescriptive engineering cap rather than a derived scaling heuristic.
  - *H3 (Expand Taxonomy to 8 Categories):* Rejected because the 6 categories provide mutually exclusive, collectively exhaustive coverage when mapped to automated remediation actions.
- **Review Trigger:** Publication of new METR capability benchmarks or unclassifiable audit failure modes.

---

## 5. Traceability & Coverage Matrix

### 5.1 Innovation Coverage (12 Innovations → Decisions & Sessions)

| # | Innovation Claim | Description | Primary Decision | Primary Informing Sessions | Status |
|---|---|---|:---:|---|:---:|
| **#1** | Grounded Verification | Spec quotes actual code confirmed by grep | **D-010** | T2-13, T2-04, T2-15 | **Validated & Hardened** |
| **#2** | Anti-Bias Guard | 5-point checklist before self-modification | **D-006** | T2-07, T2-02, T2-15 | **Upgraded to G1–G6** |
| **#3** | Perspective-Based Planning | PERCEIVE → REASON → DECIDE cycle | **D-001** | T2-05, T2-02, T2-15 | **Validated & Formulated** |
| **#4** | Spec Detail Scaling | 🔴 Guided / 🟡 Directed / 🟢 Outcome tiers | **D-007** | T2-08, T2-01, T2-14 | **Validated & Modularized** |
| **#5** | Failure Taxonomy | 6 categories for structured diagnosis | **D-011** | T2-04, T2-13, T2-15 | **Recalibrated & Mapped** |
| **#6** | Hard Scope Check | `git diff --name-only` vs declared scope | **D-010** | T2-13, T2-04, T2-15 | **Upgraded to 3-Tier** |
| **#7** | State Reconciliation | Crash recovery from `state.json` mismatch | **D-003** & **D-010** | T2-04, T2-13, T2-15 | **Upgraded with WAL** |
| **#8** | Circuit Breaker | Terminates infinite audit-fix-audit loops | **D-010** | T2-13, T2-04, T2-15 | **Upgraded Progress-Aware** |
| **#9** | INBOX System | Structured mid-project user input | **D-010** | T2-13, T2-14, T2-15 | **Validated** |
| **#10** | Human Task Protocol | Tracks non-blocking human action items | **D-010** | T2-13, T2-15 | **Validated** |
| **#11** | Auto-Bootstrap | Detects project type and toolchain | **D-005** | T2-11, T2-03, T2-14 | **Universal Base Emitted** |
| **#12** | Capability Gate Check | Structured model capability self-assessment | **D-004** | T2-10, T2-04, T2-15 | **Upgraded to Canary (CT-1..5)**|

---

## 6. Phase 0 Exit Gate Record

```yaml
---
gate: "Phase 0 Exit Gate"
date: "2026-08-19"
overall_verdict: "PASS (UNCONDITIONAL GO)"
sealed_by: "Principal Architect"
target_phase: "Phase 1 Scaffolding & v1.1.0 Implementation"
sealed_fad_ref: "FOUNDING-ARCHITECTURE.md"
---
```

- **Track A (Two-Way Doors):** PASS (4/4 decisions locked).
- **Track B (One-Way Doors):** PASS (7/7 decisions locked via 9-step gate).
- **Contradictions:** Zero unresolved tensions.
- **Evidentiary Standard:** 100% Grade A/B backing for irreversible pillars; zero unverified recalled citations.
- **Premortem:** Completed with 3 top catastrophic failure scenarios mitigated by structural invariants.

*Decision Registry is fully sealed. Proceed to Phase 1 Scaffolding.*
