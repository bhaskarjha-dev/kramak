---
title: "Kramak — Decision Registry (DECISIONS.md)"
project: "Kramak (क्रमक)"
version_under_review: "1.0.0"
generated: "2026-08-19"
companion_files: ["RESEARCH-PIPELINE.md", "PROMPT-LIBRARY.md"]
schema_version: "3.0"
---

# Kramak (क्रमक) — Architectural Decision Registry

> **Live Decision Source of Truth**  
> Companion to [RESEARCH-PIPELINE.md](file:///d:/dev/pro/kramak/research/RESEARCH-PIPELINE.md) and [PROMPT-LIBRARY.md](file:///d:/dev/pro/kramak/research/PROMPT-LIBRARY.md).  
> This registry tracks all 11 architectural decisions governing Kramak's v1.0.0 validation and v1.1+ evolution.

---

## 1. How to Use This Registry

1. **Initial State:** Every decision starts at `status: proposed`.
2. **Execution:** When research sessions begin for a decision, move `status` to `under-review`.
3. **Verdict:** When informing sessions conclude, update `status` to `accepted`, `accepted — review at trigger`, `deferred`, or `rejected`.
4. **Hypothesis Recording:** Move rejected hypotheses into an `Alternatives Considered & Rejected` section with causal rationale rather than deleting them.
5. **Phase 0 Exit Gate:** Before code/spec modifications for v1.1+, all decisions must clear their designated gate track:
   - **Track A (Fast-Track):** Two-way door decisions (🔁).
   - **Track B (Rigorous 9-Step):** One-way door decisions (🔒) — requiring Gary Klein premortem, ACH matrix, Grade A/B evidence, and architect sign-off.
   - *No decision may remain silently `proposed` when Phase 0 concludes.*

---

## 2. Fixed Constraints (Non-Negotiable Axioms)

The following foundational principles are fixed by authorial convention and core project scope. They are **not** open for re-litigation. Research sessions evaluate mechanism design, execution details, and positioning *around* these constraints, but never the axioms themselves.

| # | Fixed Constraint | Scope & Boundary |
|---|---|---|
| **C1** | **Project Name: Kramak (क्रमक)** | Sanskrit naming (*√kram* + *-aka*, "the agent who progresses methodically") is a standing authorial convention across projects. D-008 evaluates tagline, positioning, and subtitle legibility, not changing the name itself. |
| **C2** | **Zero Mandatory Runtime Dependencies** | The core specification consists purely of Markdown specifications, JSON Schemas, and workspace templates. D-009 evaluates an *optional* companion CLI/validator, never a mandatory dependency. |
| **C3** | **Model-Agnostic via Capability Assessment** | Kramak operates across any LLM without model-name checking. D-004 evaluates how to harden self-assessment/canary validation, never introducing model-name allowlists. |
| **C4** | **IDE-Agnostic Core + Adapter Translation** | The core state machine and Work Item specifications are IDE-neutral; tool-specific adapters translate into native instructions. D-005 evaluates portfolio breadth and maintenance strategy, not whether adapters exist. |
| **C5** | **MIT License** | Fully open source, community-accessible, and commercially unencumbered. |
| **C6** | **v1.0.0 Shipped Baseline** | August 2026 release (48 files, 8 adapters, 12 innovations across 24 iterations) is the historical baseline under audit. |

---

## 3. Decision Registry Summary

| ID | Title | Door Type | Route | Track | Status | Informing Sessions | Validated Innovations |
|---|---|:---:|:---:|:---:|:---:|---|---|
| **D-001** | Core FSA State Topology & Role Separation | 🔒 One-Way | Deep Research | Track B | `proposed` | T2-05, T2-02, T2-15, T2-16 | #3 (Perspective Planning) |
| **D-002** | Multi-Agent Orchestration & Parallel Execution | 🔁 Two-Way | Deep Research / Spike | Track A | `proposed` | T2-06, T2-02, T2-03, T2-15, T2-16 | — (v1.1+ Evolution) |
| **D-003** | State Persistence, Invariants & Schema Versioning | 🔒 One-Way | Confirm / Deep Research | Track B | `proposed` | T2-04, T2-05, T2-15, T2-16 | #7 (State Reconciliation) |
| **D-004** | Model-Agnostic Capability Gating & Calibration | 🔒 One-Way | Deep Research | Track B | `proposed` | T2-10, T2-04, T2-15, T2-16 | #12 (Capability Gate) |
| **D-005** | Adapter Portfolio Economics & Integration Strategy | 🔁 Two-Way | Fast Spike | Track A | `proposed` | T2-11, T2-03, T2-14, T2-16 | #11 (Auto-Bootstrap) |
| **D-006** | Self-Improvement Governance & Anti-Bias Guard | 🔒 One-Way | Deep Research | Track B | `proposed` | T2-07, T2-02, T2-15, T2-16 | #2 (Anti-Bias Guard) |
| **D-007** | Specification Density & Progressive Disclosure | 🔁 Two-Way | Deep Research | Track A | `proposed` | T2-08, T2-01, T2-14, T2-16 | #4 (Spec Detail Scaling) |
| **D-008** | Category Positioning, Naming & Tagline Legibility | 🔒 One-Way | Fast Spike | Track B | `proposed` | T2-12, T2-01, T2-14, T2-16 | — (Category Framing) |
| **D-009** | Pure-Methodology vs. Optional Tooling/CLI Layer | 🔒 One-Way | Deep Research | Track B | `proposed` | T2-09, T2-01, T2-03, T2-14, T2-16 | — (Distribution Model) |
| **D-010** | Execution Integrity, Grounding & Scope Enforcement | 🔒 One-Way | Confirm / Deep Research | Track B | `proposed` | T2-13, T2-04, T2-15, T2-16 | #1 (Grounded), #6 (Scope), #8 (Breaker), #9 (INBOX), #10 (Human) |
| **D-011** | Quantitative Design Parameters & Failure Taxonomy | 🔁 Two-Way | Evidentiary Audit / Confirm | Track A | `proposed` | T2-04, T2-13, T2-15, T2-16 | #5 (Failure Taxonomy), METR 2h cap, Polish Ceiling |

**Distribution:** 7 One-Way Doors (Track B: 9-Step Rigorous Gate) · 4 Two-Way Doors (Track A: Fast-Track Gate).

---

## 4. Architectural Decision Records (Seed Form)

```yaml
---
id: D-001
title: "Core FSA State Topology & Planner/Executor Role Separation"
status: proposed
door_type: one-way
route: deep-research
track: Track B
date: 2026-08-19
confidence: medium
evidence_refs: []
informed_by_sessions: ["T2-05", "T2-02", "T2-15", "T2-16"]
review_trigger: "Credible evidence from T2-05/T2-02 that single-agent unified loops equal or exceed split-role reliability without context-handoff penalties, or repeated reports of handoff friction in production."
---
```

### D-001 — Core FSA State Topology & Planner/Executor Role Separation 🔒

- **Context & Problem:** Kramak structures autonomous development as a deterministic finite state automaton (`BOOTSTRAP` → `PLANNING` → `EXECUTING` → `AUDITING`, with `WAITING` for human input), pairing a high-reasoning "Planner" model with a fast/precise "Executor" model. The FSA topology and role contract form the public interface that all 8 adapters and external adopters depend on.
- **Validates Claims:** Innovation #3 (Perspective-Based Planning: PERCEIVE → REASON → DECIDE).
- **Competing Hypotheses:**
  - **H1 (Status Quo):** The 5-state FSA with strict cognitive role separation (architect vs. implementer) maximizes reliability, prevents context drift, and reduces spec hallucinations.
  - **H2 (Unified Single-Agent):** Modern frontier models perform better in a continuous loop with internal mode-switching; the role split introduces unnecessary handoff latency and context loss.
  - **H3 (Refined Granular Topology):** The role split is correct, but the FSA is under-specified (e.g., `WAITING` should be a flag/sub-state, or a dedicated `RECONCILING` state is needed for crash recovery).
- **Review Trigger:** Empirical SWE-bench or agentic benchmark data showing unified-agent loops match role-split accuracy with lower token overhead, or real-world crash logs showing unhandled state transitions.

---

```yaml
---
id: D-002
title: "Multi-Agent Orchestration & Parallel Execution Evolution Path"
status: proposed
door_type: two-way
route: deep-research
track: Track A
date: 2026-08-19
confidence: medium
evidence_refs: []
informed_by_sessions: ["T2-06", "T2-02", "T2-03", "T2-15", "T2-16"]
review_trigger: "Two or more major AI coding IDEs (e.g. Antigravity, Cursor, Claude Code) ship stable, default multi-agent parallel execution as standard workflow."
---
```

### D-002 — Multi-Agent Orchestration & Parallel Execution Evolution 🔁

- **Context & Problem:** Kramak v1.0.0 enforces a sequential single-Planner/single-Executor per Work Item. As 2026 developer tools introduce native subagents (Google Antigravity) and background worktree execution (Cursor 2.0), Kramak must decide whether and how to support parallel Work Item execution.
- **Validates Claims:** Post-v1.0.0 Architecture Roadmap.
- **Competing Hypotheses:**
  - **H1 (Sequential Simplicity):** Maintain strict single-agent sequential execution. Deterministic ordering and absence of merge conflicts outweigh parallel throughput gains for target users.
  - **H2 (Parallel Extension Layer):** Introduce an opt-in parallel execution state/mode with git-worktree isolation and subagent delegation, leaving sequential as the default.
  - **H3 (Multi-Agent Native Core):** Restructure the core state machine to be natively parallel, treating sequential execution as a concurrency limit of 1.
- **Review Trigger:** Ecosystem adoption data showing multi-agent tools dominating single-agent workflows, or demonstrated git-worktree merge automation reliability.

---

```yaml
---
id: D-003
title: "State Persistence, Invariants & Schema Versioning Policy"
status: proposed
door_type: one-way
route: confirm
track: Track B
date: 2026-08-19
confidence: high
evidence_refs: []
informed_by_sessions: ["T2-04", "T2-05", "T2-15", "T2-16"]
review_trigger: "First proposed breaking change to state.json schema, or reports of state file corruption across crash recovery."
---
```

### D-003 — State Persistence, Invariants & Schema Versioning Policy 🔒

- **Context & Problem:** `state.json` is the cross-session persistence backbone and wire format. Any unannounced breaking change or ambiguous schema invariant risks stranding in-flight adopter projects.
- **Validates Claims:** Innovation #7 (State Reconciliation & Crash Recovery).
- **Competing Hypotheses:**
  - **H1 (SemVer + Migration Policy):** Current JSON Schema (draft 2020-12) with explicit `version` field and documented semver deprecation windows is sufficient.
  - **H2 (Additive-Only Guarantee):** The schema must commit to strict additive-only evolution (no required field removals or type changes) to guarantee permanent backward compatibility.
  - **H3 (Self-Healing Version Negotiation):** The schema should include automated self-healing migration scripts executed during `BOOTSTRAP` or `State Reconciliation`.
- **Review Trigger:** Incompatible schema evolution proposal, or third-party adapter failing to parse state after a minor release.

---

```yaml
---
id: D-004
title: "Model-Agnostic Capability Gating & Self-Assessment Calibration"
status: proposed
door_type: one-way
route: deep-research
track: Track B
date: 2026-08-19
confidence: medium
evidence_refs: []
informed_by_sessions: ["T2-10", "T2-04", "T2-15", "T2-16"]
review_trigger: "Documented instances of under-capable models self-rating 'capable' and corrupting planning phases, or publication of definitive LLM self-assessment calibration benchmarks."
---
```

### D-004 — Model-Agnostic Capability Gating & Calibration 🔒

- **Context & Problem:** Kramak forbids model-name checking to maintain strict model-agnosticism. Innovation #12 relies on structured self-assessment to gate whether a model qualifies for Planner-tier tasks. However, LLM calibration research indicates self-evaluation can suffer from sycophancy or overconfidence.
- **Validates Claims:** Innovation #12 (Capability Gate Check).
- **Competing Hypotheses:**
  - **H1 (Checklist Self-Report):** Structured multi-point self-assessment prompt is reliable enough to filter out low-reasoning models without hardcoded name lists.
  - **H2 (Objective Canary Diagnostic):** Pure self-assessment is untrustworthy; the gate must require a deterministic, lightweight diagnostic reasoning task (a small canary challenge) before assigning the Planner role.
  - **H3 (Hybrid Calibration):** Self-assessment combined with audit-stage spot-checks and runtime token/complexity heuristics provides sufficient gating without canary latency.
- **Review Trigger:** Evidence that models below the reasoning threshold routinely pass the self-assessment, or new benchmark papers on task-level LLM self-calibration.

---

```yaml
---
id: D-005
title: "Adapter Portfolio Economics & Integration Surface Strategy"
status: proposed
door_type: two-way
route: fast-spike
track: Track A
date: 2026-08-19
confidence: high
evidence_refs: []
informed_by_sessions: ["T2-11", "T2-03", "T2-14", "T2-16"]
review_trigger: "Breaking configuration/API changes in 2+ supported IDEs, or usage data showing zero adoption for specific adapters over 6 months."
---
```

### D-005 — Adapter Portfolio Economics & Integration Strategy 🔁

- **Context & Problem:** Kramak currently maintains 8 adapters (Antigravity, Cursor, Claude Code, Windsurf, Cline, Copilot, Aider, Generic). Fast-moving IDE release cadences create ongoing maintenance burden for a solo maintainer.
- **Validates Claims:** Innovation #11 (Auto-Bootstrap across toolchains).
- **Competing Hypotheses:**
  - **H1 (Full Portfolio Maintenance):** Retain all 8 adapters to maximize ecosystem reach and distribution footprint.
  - **H2 (Tiered Consolidation):** Deeply maintain the top 3–4 high-momentum tools (Antigravity, Cursor, Claude Code) + Generic, moving the remainder to community maintenance.
  - **H3 (AGENTS.md-Native Convergence):** Standardize on an AGENTS.md / SKILL.md universal adapter core, reducing IDE-specific adapter files to minimal 5-line stubs.
- **Review Trigger:** Upstream IDE format deprecation (e.g. changes in `.cursorrules` or `.clinerules`), or release of a universal AI agent configuration standard.

---

```yaml
---
id: D-006
title: "Self-Improvement Governance & Anti-Bias Guard Robustness"
status: proposed
door_type: one-way
route: deep-research
track: Track B
date: 2026-08-19
confidence: medium
evidence_refs: []
informed_by_sessions: ["T2-07", "T2-02", "T2-15", "T2-16"]
review_trigger: "Any incident where a pipeline self-modification introduces a regression caught only after merge, or safety literature identifying failure modes in checklist-based governance."
---
```

### D-006 — Self-Improvement Governance & Anti-Bias Guard 🔒

- **Context & Problem:** Kramak is self-improving: during audits, agents may propose improvements to Kramak's own spec files. Innovation #2 (Anti-Bias Guard) uses a 5-point checklist to prevent recency bias. Because this modifies the system's own rules, governance robustness is safety-critical.
- **Validates Claims:** Innovation #2 (Anti-Bias Guard).
- **Competing Hypotheses:**
  - **H1 (Proportionate Checklist):** The 5-point checklist combined with standard git pull request review is proportionate for a local, file-based methodology.
  - **H2 (Structural Governance Backstop):** The checklist requires structural enforcement: mandatory versioned rollback logs, automated regression verification against historical audit logs, and an explicit dual-model critique pass.
  - **H3 (Mandatory Human-in-the-Loop Gate):** Self-modifications to `.kramak/spec/` must be hard-blocked until an interactive human sign-off is recorded.
- **Review Trigger:** Documented failure of the 5-point checklist to prevent spec degradation in real-world self-evolution cycles.

---

```yaml
---
id: D-007
title: "Specification Density, Cognitive Friction & Progressive Disclosure"
status: proposed
door_type: two-way
route: deep-research
track: Track A
date: 2026-08-19
confidence: medium
evidence_refs: []
informed_by_sessions: ["T2-08", "T2-01", "T2-14", "T2-16"]
review_trigger: "Empirical findings on agent context-window degradation from large system instructions, or persistent user feedback citing spec size as an onboarding blocker."
---
```

### D-007 — Specification Density & Progressive Disclosure Strategy 🔁

- **Context & Problem:** Kramak's core specifications are comprehensive (`PLANNER.md` is 41.5KB, `EXECUTOR.md` is 17.7KB). While detailed rules ensure deterministic execution, high token count incurs context overhead and potential instruction attenuation in smaller-context models.
- **Validates Claims:** Innovation #4 (Spec Detail Scaling: 🔴 Guided / 🟡 Directed / 🟢 Outcome).
- **Competing Hypotheses:**
  - **H1 (Preserve Comprehensive Density):** Thoroughness is Kramak's core value proposition; cutting spec size directly degrades agent compliance and audit rigor.
  - **H2 (Progressive Disclosure Architecture):** Restructure specs into a lean core (~10KB) loaded on boot, with specialized phase instructions and templates dynamically pulled on demand.
  - **H3 (Staged Artifact Workflow):** Adopt a multi-file staged approach (similar to Spec Kit's sequential generation) where agents read only the artifact relevant to the active sub-phase.
- **Review Trigger:** Benchmark evidence of agent compliance dropping as prompt size exceeds 30KB, or launch of competing lightweight frameworks capturing significant market share.

---

```yaml
---
id: D-008
title: "Category Positioning, Naming & Tagline Legibility"
status: proposed
door_type: one-way
route: fast-spike
track: Track B
date: 2026-08-19
confidence: high
evidence_refs: []
informed_by_sessions: ["T2-12", "T2-01", "T2-14", "T2-16"]
review_trigger: "Adoption analytics showing search discovery friction, or developer sentiment surveys indicating confusion regarding 'SDLC for AI agents' vs. agent frameworks."
---
```

### D-008 — Category Positioning, Naming & Tagline Legibility 🔒

- **Context & Problem:** Kramak positions itself as "The missing SDLC for AI agents," claiming category ownership of "Layer 3: Process" alongside AGENTS.md (Context) and MCP (Protocol). We must evaluate whether this framing and the Sanskrit name "Kramak" create adoption/search friction among English-speaking developers.
- **Validates Claims:** Category Framing & Market Positioning.
- **Competing Hypotheses:**
  - **H1 (Maintain Category Ownership):** The 3-layer model (Context / Protocol / Process) and "missing SDLC" tagline are compelling and differentiating; keep the name and tagline as-is.
  - **H2 (Refined Subtitle & Pragmatic Framing):** Keep "Kramak" but update the tagline and README subtitle to emphasize immediate concrete utility (e.g., "Deterministic Plan-Execute-Audit Loop for AI Coding Agents") alongside the category claim.
  - **H3 (Reposition to Agent Orchestration Standard):** Shift framing away from human SDLC analogies (Scrum/Kanban) toward "Autonomous Agent Control Plane" to align with agentic AI tooling mindshare.
- **Review Trigger:** Evidence of developer confusion between Kramak and AI coding agents themselves (e.g. thinking Kramak is an IDE rather than a methodology).

---

```yaml
---
id: D-009
title: "Pure-Methodology Identity vs. Optional Tooling/CLI Layer"
status: proposed
door_type: one-way
route: deep-research
track: Track B
date: 2026-08-19
confidence: high
evidence_refs: []
informed_by_sessions: ["T2-09", "T2-01", "T2-03", "T2-14", "T2-16"]
review_trigger: "Developer friction reports regarding manual validate.js invocation or bootstrap script execution across heterogeneous environments."
---
```

### D-009 — Pure-Methodology Identity vs. Optional Tooling/CLI Layer 🔒

- **Context & Problem:** Kramak's core brand promise is "pure methodology, zero mandatory runtime dependencies." However, GitHub Spec Kit's success with a companion CLI (`specify-cli`) demonstrates that optional companion tooling can dramatically reduce onboarding friction.
- **Validates Claims:** Distribution Model & Tooling Strategy.
- **Competing Hypotheses:**
  - **H1 (Strict Pure-Files Only):** Reject any standalone CLI binary. Maintain pure Markdown, JSON Schemas, and lightweight optional shell scripts (`init.sh`/`init.ps1`, `validate.js`).
  - **H2 (Optional Companion CLI in Core Repo):** Ship an optional, non-blocking companion CLI (`npx kramak` / `cargo install kramak`) for scaffolding, state validation, and linting that is never required for core execution.
  - **H3 (Decoupled Companion Project):** Keep the core Kramak repo 100% pure markdown/spec, and create a separate sibling repository (e.g., `kramak-cli`) for all companion tooling.
- **Review Trigger:** Adoption data showing CLI-driven frameworks convert 3x more users than pure-spec repos, or community creation of third-party CLI tooling for Kramak.

---

```yaml
---
id: D-010
title: "Execution Integrity, Grounding & Scope Enforcement"
status: proposed
door_type: one-way
route: confirm
track: Track B
date: 2026-08-19
confidence: high
evidence_refs: []
informed_by_sessions: ["T2-13", "T2-04", "T2-15", "T2-16"]
review_trigger: "Documented cases of an agent bypassing Hard Scope Check or hallucinating code while claiming grep verification."
---
```

### D-010 — Execution Integrity, Grounding & Scope Enforcement 🔒

- **Context & Problem:** Kramak claims four core execution integrity innovations: Grounded Verification (grep-confirmed quotes), Hard Scope Check (`git diff --name-only` enforcement), Circuit Breaker (limiting audit loops), and State Reconciliation (crash recovery), plus INBOX and Human Task Protocol. These correctness guarantees underpin trust in autonomous execution.
- **Validates Claims:** Innovation #1 (Grounded Verification), #6 (Hard Scope Check), #8 (Circuit Breaker), #9 (INBOX System), #10 (Human Task Protocol).
- **Competing Hypotheses:**
  - **H1 (Mechanisms Confirmed):** All six mechanisms are sound, represent established resilience/verification patterns, and require no structural alterations.
  - **H2 (Mechanisms Need Hardening):** Grounded Verification and Hard Scope Check have edge cases (e.g., agents modifying the file list in the spec to evade scope limits) and require stricter pre-commit hook enforcement.
  - **H3 (Static Analysis Integration):** Grep and git diff checks are necessary but insufficient; higher-risk Work Items require automated test/typecheck execution gates.
- **Review Trigger:** Real-world incident of unauthorized file modifications slipping past the Hard Scope Check during an unattended run.

---

```yaml
---
id: D-011
title: "Quantitative Design Parameters & Failure Taxonomy"
status: proposed
door_type: two-way
route: evidentiary-audit
track: Track A
date: 2026-08-19
confidence: medium
evidence_refs: []
informed_by_sessions: ["T2-04", "T2-13", "T2-15", "T2-16"]
review_trigger: "Audit findings failing to classify into the 6 Failure Taxonomy categories, or new empirical data on AI agent task duration frontiers from METR."
---
```

### D-011 — Quantitative Design Parameters & Failure Taxonomy 🔁

- **Context & Problem:** Kramak incorporates specific quantitative heuristics: a "2-hour Work Item cap" (citing METR task-horizon research), a 6-category Failure Taxonomy, and a "Polish Ceiling Rule" to prevent over-engineering. We must audit the exact evidentiary basis of these numbers.
- **Validates Claims:** Innovation #5 (Failure Taxonomy), METR citation accuracy, Polish Ceiling Rule.
- **Competing Hypotheses:**
  - **H1 (Parameters Validated As-Is):** All heuristics are well-calibrated and citations accurately reflect the underlying research.
  - **H2 (Citation Recalibration Required):** The 2-hour cap is a defensible derived rule-of-thumb, but the citation must be clarified to reflect that METR measures capability trends rather than prescribing task limits; the Polish Ceiling Rule must be grounded in scope-creep literature.
  - **H3 (Taxonomy Revision):** The 6 failure categories have overlaps or omit key agentic failure modes (e.g., silent tool-call degradation, context window truncation) and should expand to 8 categories.
- **Review Trigger:** Publication of updated METR benchmarks or observed failure modes in Kramak audit logs that require a miscellaneous catch-all.

---

## 5. 100% Traceability & Coverage Matrix

### 5.1 Innovation Coverage (12 Innovations → Decisions)

| Innovation Claim | Description | Primary Decision | Informing Sessions |
|---|---|:---:|---|
| **#1 Grounded Verification** | Spec quotes actual code, verified by grep | **D-010** | T2-13, T2-04 |
| **#2 Anti-Bias Guard** | 5-point checklist before self-modification | **D-006** | T2-07, T2-02 |
| **#3 Perspective-Based Planning** | PERCEIVE → REASON → DECIDE cycle | **D-001** | T2-05, T2-02 |
| **#4 Spec Detail Scaling** | 🔴 Guided / 🟡 Directed / 🟢 Outcome tiers | **D-007** | T2-08, T2-01 |
| **#5 Failure Taxonomy** | 6 failure categories for structured diagnosis | **D-011** | T2-04, T2-13 |
| **#6 Hard Scope Check** | `git diff --name-only` vs spec file list | **D-010** | T2-13, T2-04 |
| **#7 State Reconciliation** | Crash recovery from `state.json` inconsistency | **D-003** & **D-010** | T2-04, T2-13 |
| **#8 Circuit Breaker** | Stops infinite audit-fix-audit loops | **D-010** | T2-13, T2-04 |
| **#9 INBOX System** | Structured mid-project user input | **D-010** | T2-13 |
| **#10 Human Task Protocol** | Tracks non-blocking human action items | **D-010** | T2-13 |
| **#11 Auto-Bootstrap** | Detects project type and toolchain | **D-005** | T2-11, T2-03 |
| **#12 Capability Gate Check** | Structured capability self-assessment | **D-004** | T2-10, T2-04 |

### 5.2 Founder Uncertainties Coverage (10 Uncertainties → Decisions)

| # | Founder's Stated Uncertainty | Decision(s) | Primary Session(s) |
|---|---|:---:|---|
| **1** | Empirical validity of the 12 claimed innovations | D-001, D-004, D-006, D-007, D-010, D-011 | T2-02, T2-04, T2-05, T2-07, T2-08, T2-10, T2-13 |
| **2** | Spec complexity vs. developer adoption | D-007 | T2-08, T2-01, T2-14 |
| **3** | Pure methodology vs. optional companion CLI | D-009 | T2-09, T2-01, T2-03, T2-14 |
| **4** | Reality of the "Layer 3: Process" competitive gap | D-008, D-001 | T2-01, T2-12, T2-14 |
| **5** | State machine topology & role-split optimality | D-001, D-003 | T2-05, T2-02, T2-15 |
| **6** | 8-adapter portfolio breadth vs. maintenance cost | D-005 | T2-11, T2-03, T2-14 |
| **7** | Naming, Sanskrit branding & tagline legibility | D-008 | T2-12, T2-01, T2-14 |
| **8** | Evolution path toward multi-agent orchestration | D-002 | T2-06, T2-02, T2-03, T2-15 |
| **9** | Self-improvement governance & Anti-Bias robustness | D-006 | T2-07, T2-02, T2-15 |
| **10** | Quantitative parameter evidence (METR, Polish Ceiling) | D-011, D-010 | T2-04, T2-13, T2-15 |

---

## 6. Decision Lifecycle & Maintenance Protocol

- **Updating Entries:** When a session in `PROMPT-LIBRARY.md` completes, update the corresponding `D-NNN` entry above immediately. Set `status` to `accepted` / `accepted — review at trigger` / `deferred` / `rejected`, record the chosen hypothesis, and append the session reference.
- **Conflict Escalation:** If two sessions reach contradictory conclusions on the same decision, instantiate [templates/CONFLICT-RESOLUTION.template.md](file:///d:/dev/pro/kramak/research/templates/CONFLICT-RESOLUTION.template.md) and execute an Analysis of Competing Hypotheses (ACH) matrix before locking the decision.
- **Review Triggers:** Every locked decision has a measurable review trigger. When a review trigger is tripped during future operations or telemetry, the decision is automatically reopened for evaluation.
