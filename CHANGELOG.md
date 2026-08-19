# Changelog

All notable changes to the Kramak specification are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [1.1.0] — 2026-08-19

### The Process Control Transformation

Kramak v1.1.0 represents a comprehensive architectural overhaul, restructuring the framework into a progressive-disclosure specification, establishing formal JSON Schema Draft 2020-12 validation contracts, introducing an 9-state closed-loop FSM, and refining positioning as **Layer 3 — Process Control** in the AAIF agentic stack.

### Added
- **9-State Closed-Loop FSM:** Upgraded core automaton from 5 states to an algebraically closed 9-state control plane (`BOOTSTRAP`, `PLANNING`, `DISPATCH`, `EXECUTING`, `AUDITING`, `MERGE_QUEUE`, `WAITING`, `ESCALATED`, `COMPLETE`) with bounded retry budgets.
- **Progressive Disclosure Architecture:** Restructured monolithic specifications into a sub-2KB eager router (`.kramak/ROUTER.md`), core role specifications (`planner/CORE.md`, `executor/CORE.md`), and on-demand reference playbooks.
- **JSON Schema Draft 2020-12 Contracts:** Added strict machine-readable schemas for `.kramak/schemas/state.schema.json`, `.kramak/schemas/work-item.schema.json`, and `.kramak/schemas/work-item-state.schema.json`.
- **Universal AAIF Baseline:** Generated universal `.kramak/AGENTS.md` (Context) and `.kramak/SKILL.md` (Skills) standard bridges at project root.
- **Canary Capability Gate (CT-1 to CT-5):** Replaced subjective model self-assessment with 5 procedurally generated, deterministically graded micro-challenges (DAG scheduling, plan-bug detection, state tracking, instruction hierarchy, paraphrase consistency).
- **Anti-Bias Guard (G1–G6):** Upgraded the 5-point checklist into a hardened 6-step governance framework with history diffs, rollback cross-checks, dual-model critique passes, immutable ledger logging, and risk-tiered human approval gates.
- **Immutable Self-Modification Ledger:** Added `.kramak/ledger/FORMAT.md` and append-only `.kramak/ledger/self-modifications.jsonl` to track pipeline self-improvements.
- **3-Tier Hard Scope Check:** Added Tier 1 worktree diff verification, Tier 2 pre-flight glob exclusion verification, and Tier 3 post-merge re-validation.
- **Write-Ahead Logging (WAL):** Atomic state updates via `.kramak/state.json.tmp` flushes and renames, with level-triggered state reconciliation.
- **Parallel Worktree Execution & Merge Queue:** Added git-worktree isolation (`.kramak/worktrees/<id>`), single-writer state shards (`.kramak/work-items/WI-XXX.json`), and a serialized FIFO merge queue for concurrent Work Items.
- **On-Demand Reference Playbooks:**
  - `.kramak/planner/edge-cases.md` (refactors >10 files, migrations, deprecations)
  - `.kramak/planner/output-contract.md` (Work Item JSON/Markdown authoring rules)
  - `.kramak/planner/domain-conventions.md` (monorepos, polyglot environments)
  - `.kramak/executor/error-recovery.md` (diagnostic and rollback playbooks)
  - `.kramak/executor/tool-playbooks.md` (git, patch, build tool execution patterns)
  - `.kramak/executor/PROGRESS.md` (dynamic execution session scratchpad)
- **Standardized Templates:** Added `.kramak/templates/WORK-ITEM.template.md`, `HUMAN-TASKS.template.md`, and `RETROSPECTIVE.template.md`.
- **Founding Architecture Document (FAD):** Sealed `FOUNDING-ARCHITECTURE.md` as the authoritative architectural baseline.

### Changed
- **Positioning & Tagline:** Repositioned from *"The missing SDLC for AI agents"* to *"Kramak: process control for autonomous coding agents — Layer 3: Process, alongside AGENTS.md (context) and MCP (connectivity)"* (Decision D-008). Retained "Agentic SDLC" as secondary SEO keyword.
- **Primary Workspace Directory:** Migrated pipeline workspace from `.agents/pipeline/` to `.kramak/`.
- **Adapter Portfolio Restructuring:**
  - **Tier 1 (Deep):** Claude Code (`CLAUDE.md` with `@.kramak/AGENTS.md` bridge) and Cursor (`.cursor/rules/kramak-core.mdc` with glob-scoped matching).
  - **Tier 2 (Monitor):** Google Antigravity (`GEMINI.md` / `SKILL.md`) and GitHub Copilot (`.github/copilot-instructions.md`).
  - **Tier 3 (Thin):** Devin Desktop (`AGENTS.md`), Cline (`.clinerules`), and Aider (`CONVENTIONS.md`).
- **Tooling Boundary (EditorConfig Model):** Decoupled executable tooling into the standalone companion repository [`kramak-cli`](https://github.com/bhaskarjha-dev/kramak-cli) per Decision D-009. The core `kramak` repository contains exclusively pure Markdown and JSON Schemas.
- **Complete Documentation Overhaul:** Rewrote `README.md`, `docs/GETTING-STARTED.md`, `docs/COMPARISON.md`, `docs/SPECIFICATION.md`, `docs/FAQ.md`, and `CONTRIBUTING.md`.

### Deprecated
- **`spec/` Monolithic Paths:** Monolithic files (`spec/PLANNER.md`, `spec/EXECUTOR.md`, `spec/PRINCIPLES.md`, `spec/state.schema.json`) replaced by stub forwarding notices pointing to `.kramak/`.
- **Standalone Root Scripts:** `init.sh`, `init.ps1`, and `validate.js` replaced with 90-day redirection shims pointing to `@kramak/cli` and manual copy-paste instructions.
- **Roo Code Adapter:** Formally deprecated following upstream project shutdown; redirected to Cline adapter.

---

## [1.0.0] — 2026-08-12

### The Public Release

Kramak (formerly "Builoop") — the missing SDLC for AI agents. This is the first public release of the complete methodology specification.

### Core Specification
- **PLANNER.md** — Complete planning procedure with perspective-based assessment (PERCEIVE → REASON → DECIDE), strategic vision lenses, spec detail scaling (🔴/🟡/🟢), and bounded autonomy
- **EXECUTOR.md** — Execution procedure with risk-based autonomy, neighborhood cleanup, failure taxonomy (6 categories), session continuity intelligence, and executor-driven auditing
- **PRINCIPLES.md** — Development constitution covering thinking, safety, human-in-the-loop, quality, and meta-principles including the Anti-Bias Guard
- **BOOTSTRAP.md** — Auto-detection of project type, toolchain, and 5-scenario bootstrapping

### Key Features
- Grounded Verification Protocol (grep-confirmed specs)
- Anti-Bias Guard (5-point checklist for pipeline self-improvement)
- Spec Detail Scaling (Guided / Directed / Outcome based on risk)
- Circuit Breaker (prevents infinite audit-fix loops)
- Hard Diff Scope Check (deterministic scope enforcement via git)
- State Reconciliation (crash recovery)
- Capability Gate Check (model self-assessment)
- INBOX system (structured mid-project user input)
- Human Task Protocol (pipeline doesn't block on what it can't do)

### IDE Adapters
- Antigravity IDE (SKILL.md)
- Cursor (.mdc rule)
- Claude Code (CLAUDE.md section)
- Generic (any AI tool with file access)
