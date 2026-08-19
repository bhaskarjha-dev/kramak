# Kramak (à¤•à¥à¤°à¤®à¤•) â€” Frequently Asked Questions (FAQ)

> **Process control for autonomous coding agents**  
> *Layer 3 â€” Process, alongside `AGENTS.md` (Context) and `MCP` (Connectivity)*

---

## 1. General & Architecture

### What is Kramak in one sentence?
Kramak is a zero-dependency, file-based process control framework that enables autonomous AI coding agents to plan, execute, verify, and audit software changes through a deterministic finite state machine (FSM).

### How does Kramak fit alongside AGENTS.md and MCP?
Under the open agentic stack (AAIF):
- **Layer 1 â€” Context (`AGENTS.md`):** Answers **WHAT** your project is (tech stack, conventions, structure).
- **Layer 2 â€” Protocol (`MCP`):** Provides **CONNECTIVITY** to tools, language servers, and runtime environments.
- **Layer 3 â€” Process (`Kramak`):** Governs **HOW** the agent works methodically (FSM state transitions, Grounded Verification, 3-Tier Hard Scope Checks, and audit loopbacks).

### What is `.kramak/`?
`.kramak/` is the pipeline workspace and governance directory located at the root of your project. It contains:
- `ROUTER.md` (the master entry router and non-negotiable invariants)
- `state.json` (the persistent state of the active run)
- `schemas/` (JSON Schema Draft 2020-12 definitions)
- `planner/` and `executor/` (modular progressive disclosure specifications)
- `work-items/` (active, queued, and completed Work Items)
- `inbox/` (mid-project user inputs and bug reports)
- `ledger/` (immutable self-modification audit trail)

### What happened to the old `spec/` and `.agents/pipeline/` directories?
In Kramak v1.1, all pipeline operations are consolidated under `.kramak/`. The old `spec/` and `.agents/pipeline/` directories no longer exist. All specifications, schemas, templates, and runtime state live under `.kramak/`.

---

## 2. Tooling & Dependencies

### Do I need `kramak-cli` to use Kramak?
**No.** Kramak has **zero mandatory runtime dependencies**. The core methodology consists purely of Markdown specifications and JSON Schemas. You can bootstrap and run Kramak in any project simply by copying the `.kramak/` directory.

The standalone companion CLI (`@kramak/cli` / `npx @kramak/cli init`) is an optional convenience utility for offline schema validation, diagnostics, and project scaffolding.

### What happened to `init.sh`, `init.ps1`, and `validate.js`?
Per the EditorConfig model (Decision D-009), all executable scripts live in the standalone companion repository [`kramak-cli`](https://github.com/bhaskarjha-dev/kramak-cli). This ensures the core `kramak` repository remains 100% dependency-free with zero supply-chain risk.

---

## 3. Models & Capability Gating

### What models work with Kramak?
**Any capable LLM works with Kramak.** Kramak enforces a strict model-agnostic invariant (Constraint C3): it never checks model names (e.g., `claude-3-5-sonnet`, `gpt-4o`, `gemini-1.5-pro`). Instead, models qualify for roles based on capability assessment:
- **Planning:** Requires strong architectural reasoning and constraint satisfaction.
- **Execution:** Requires fast, precise tool use and code generation.
- **Auditing:** Requires a fresh-session context to eliminate self-preference.

### What is the Canary Capability Gate?
The Canary Gate is a procedural capability verification battery (CT-1 to CT-5) that evaluates a model's competence dynamically without hardcoded allowlists. It presents 5 randomized micro-challenges:
1. **CT-1:** DAG task scheduling under resource constraints.
2. **CT-2:** Injected plan-bug detection.
3. **CT-3:** Long-horizon register state tracking.
4. **CT-4:** Instruction hierarchy adherence under distraction.
5. **CT-5:** Cross-paraphrase logical consistency.

Models scoring $\ge 0.80$ qualify for the `PLANNING` role. Models scoring $< 0.60$ fail-closed to `WAITING` for human assistance.

---

## 4. Safety & Governance

### What is the Anti-Bias Guard (G1â€“G6)?
Kramak allows agents to propose edits to Kramak's own specifications during audits (self-improvement). To prevent recency bias, prompt degradation, and self-preference, all self-modifications must clear the G1â€“G6 governance framework:
- **G1:** History diff verification (why the change is needed).
- **G2:** Rollback precedent check (is reverting previous changes better?).
- **G3:** Dual-model / cross-family critique pass.
- **G4:** Immutable audit ledger logging (`.kramak/ledger/self-modifications.jsonl`).
- **G5:** Cooldown verification window.
- **G6:** Risk-tiered human approval gate (mandatory for governance and invariant changes).

### What is the 3-Tier Hard Scope Check?
The Hard Scope Check is a mechanical git gate that prevents agents from modifying files outside their declared task:
- **Tier 1 (Worktree):** Post-execution check comparing `git diff --name-only` against `files_targeted`.
- **Tier 2 (Pre-Flight):** Static check confirming zero file-glob overlap across concurrent parallel Work Items.
- **Tier 3 (Merge):** Re-verification against the integration branch HEAD prior to merging.

---

## 5. Workflows, Monorepos & Recovery

### How does Kramak work in a Monorepo?
1. **Root Configuration:** Place `.kramak/` at the repository root.
2. **Toolchain Detection:** Store monorepo-wide check commands (e.g., `pnpm run check` or `turbo check`) in `toolchain.checkCommands` in `.kramak/state.json`.
3. **Scoped Work Items:** In individual Work Items, target specific subpackages and declare package-specific verification commands (e.g., `pnpm --filter @repo/web test`).
4. **Domain Conventions:** The planner loads `.kramak/planner/domain-conventions.md` when monorepo structures are detected.

### How does crash recovery work?
Kramak uses Write-Ahead Logging (WAL) and level-triggered state reconciliation:
- All mutations write to `.kramak/state.json.tmp` first, then atomically rename to `.kramak/state.json`.
- If a session terminates unexpectedly mid-execution, the next agent session reads `state.json`, compares it against `git status` and active worktrees, recovers orphaned locks, and resumes the active Work Item.

### How does Kramak handle parallel multi-agent execution?
When concurrency $> 1$, Kramak provisions isolated git worktrees at `.kramak/worktrees/<id>` with single-writer state shards at `.kramak/work-items/WI-XXX.json`. Once audited, branches are merged into the integration branch through a serialized FIFO merge queue.

### Can I add requirements or report bugs while the agent is running?
**Yes.** Drop notes or bug reports into `.kramak/inbox/` (or `INBOX.md`). The Planner reviews unprocessed INBOX items during the PERCEIVE step of every planning cycle.

### What happens when a task requires an API key or human action?
The agent records the dependency in `HUMAN-TASKS.md` (using `.kramak/templates/HUMAN-TASKS.template.md`), flags `humanTasksPending: true` in `state.json`, and continues executing all non-blocked Work Items. It only transitions to `WAITING` if no unblocked tasks remain.
