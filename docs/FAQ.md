# Kramak (क्रमक) — Frequently Asked Questions (FAQ)

> **Process control for autonomous coding agents**  
> *Layer 3 — Process Control, alongside `AGENTS.md` (Context) and `MCP` (Connectivity)*

---

## 1. General & Architecture

### What is Kramak in one sentence?
Kramak is a zero-dependency, file-based process control framework that enables autonomous AI coding agents to plan, execute, verify, and audit software changes through a deterministic finite state machine (FSM).

### How does Kramak fit alongside AGENTS.md and MCP?
Under the open agentic stack (AAIF):
- **Layer 1 — Context (`AGENTS.md`):** Answers **WHAT** your project is (tech stack, conventions, architecture).
- **Layer 2 — Protocol (`MCP`):** Provides **CONNECTIVITY** to tools, databases, and host APIs.
- **Layer 3 — Process (`Kramak`):** Governs **HOW** the agent works methodically (FSM state transitions, Grounded Verification, 3-Tier Hard Scope Checks, and audit loopbacks).

### Why is there an `AGENTS.md` inside `.kramak/` and should I move it?
**Do not move or delete `.kramak/AGENTS.md`.**  
- **Your Root `AGENTS.md`:** Belongs to *your application* (describing your business logic, frontend, and backend).  
- **The `.kramak/AGENTS.md`:** Belongs to *the Kramak engine* (defining Kramak's internal AAIF compliance and serving as an import target for adapters like Claude Code).  
They serve two completely different purposes and coexist cleanly.

### What if my project does NOT have an `AGENTS.md` yet?
You have two easy options:
1. **Use an IDE Adapter (Recommended):** Copy the matching file for your tool from `adapters/` (e.g., `adapters/cursor/.cursorrules`, `adapters/claude-code/CLAUDE.md`, or `adapters/antigravity/SKILL.md`).
2. **Create Root `AGENTS.md`:** Create a new `AGENTS.md` at your project root and add the 2-line hook pointing to `.kramak/ROUTER.md` (or copy `.kramak/AGENTS.md` to root as a starter template).

---

## 2. Onboarding & Tooling

### Do I need to install any npm packages, runtimes, or CLI tools?
**No.** Kramak has **zero mandatory runtime dependencies**. The core methodology consists purely of Markdown specifications and JSON Schemas (Draft 2020-12). You can bootstrap and run Kramak in any project simply by copying the `.kramak/` directory.

An optional companion CLI (`@kramak/cli`) is maintained separately for offline diagnostics, but is completely optional.

### What if my project doesn't have automated tests yet?
When Kramak runs its **`BOOTSTRAP`** phase, it inspects your package manifest (`package.json`, `Cargo.toml`, `pyproject.toml`, etc.):
- If tests are detected, it configures `state.toolchain.checkCommands` (e.g. `["npm test"]`).
- If no test suite exists, the Planner will either generate a baseline test suite during the first planning cycle or use syntax/build commands (e.g. `node --check`, `tsc --noEmit`, `python -m py_compile`) as verification gates.

---

## 3. Operations, Safety & Edge Cases

### How does the 3-Tier Hard Scope Check prevent agents from touching random files?
Unlike vague prompt instructions ("please only edit auth files"), Kramak enforces a **mechanical git gate**:
1. **Tier 1 (Post-Execution):** The executor runs `git diff --name-only` and checks every modified file against the active Work Item's `files_targeted`. Any unlisted file is automatically reverted via `git checkout -- <file>`.
2. **Tier 2 (Pre-Flight Parallel):** Verifies zero file-glob intersection across concurrent Work Items before provisioning worktrees.
3. **Tier 3 (Merge Queue):** Re-validates the diff against `main` HEAD prior to serializing branches.

### How does crash recovery work if my IDE or terminal closes mid-run?
Kramak uses **Write-Ahead Logging (WAL)** and level-triggered state reconciliation:
- All mutations are flushed to `.kramak/state.json.tmp` first, then atomically renamed to `state.json`.
- When you reopen your IDE and say `"Start"`, the agent reads `state.json`, compares it against `git status` and active worktrees, and resumes the exact active Work Item without data loss.

### What is the Progress-Aware Circuit Breaker?
If an agent gets stuck in a trial-and-error fix loop, the Circuit Breaker monitors two thresholds:
1. **Consecutive Failures:** Trips after 3 failed attempts on the same Work Item.
2. **Oscillating Error Hashes:** Trips if the agent repeats an identical error state hash on 2 non-adjacent tries.  
When tripped, the agent transitions to `phase: "escalated"` with a structured diagnostic reason and halts safely instead of burning tokens.

### Can I switch between Claude Code, Cursor, and Antigravity on the same project?
**Yes!** Because Kramak stores the state machine in `.kramak/state.json` (JSON Schema Draft 2020-12) and specifications in standard Markdown:
- You can generate batch plans in **Claude Code** (using Claude Opus 4.6).
- Open **Cursor** to execute the Work Items with fast autocomplete and inline edits.
- Trigger **Antigravity** to run a clean audit pass and merge branches.

---

## 4. Models & Capability Gating

### What models work with Kramak?
**Any modern LLM works with Kramak.** Kramak enforces a model-agnostic architecture (Constraint C3): it never hardcodes vendor model names. Instead, models qualify dynamically through capability tiers:
- **Planning Role:** Requires high architectural reasoning and constraint satisfaction.
- **Execution Role:** Requires fast, precise code edits and tool use.
- **Auditing Role:** Requires a fresh-session context to eliminate self-preference.

### What is the Canary Capability Gate?
The Canary Gate is a procedural verification battery (CT-1 to CT-5) that evaluates a model's competence dynamically without allowlists:
1. **CT-1:** DAG task scheduling under resource constraints.
2. **CT-2:** Injected plan-bug detection.
3. **CT-3:** Long-horizon register state tracking.
4. **CT-4:** Instruction hierarchy adherence under distraction.
5. **CT-5:** Cross-paraphrase logical consistency.

Models scoring $\ge 0.80$ qualify for autonomous planning. Models scoring $< 0.60$ fail-closed to `WAITING` for human assistance.