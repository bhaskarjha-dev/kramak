# Kramak (क्रमक) — Frequently Asked Questions (FAQ)

---

## 1. General & Methodology

### What is Kramak in one sentence?
Kramak is a pure, file-based SDLC that enables AI coding assistants (like Cursor, Claude Code, Antigravity, Windsurf, Cline) to autonomously build, verify, and audit software without human intervention.

### How does Kramak differ from AGENTS.md?
- **AGENTS.md** answers **WHAT** your project is (tech stack, conventions, architecture overview).
- **Kramak** answers **HOW** the AI builds the project (planning loops, failure diagnosis, verification gates, state persistence, audit trails).

---

## 2. Monorepos & Large Codebases

### How does Kramak work in a Monorepo (Turborepo, Nx, pnpm workspaces)?
1. **Root Configuration:** Place `.kramak/` and `.agents/pipeline/` at the repository root.
2. **Toolchain Detection:** Store monorepo-wide check commands (e.g., `pnpm run check` or `turbo check`) in `toolchain.checkCommands` in `state.json`.
3. **Scoping Work Items:** In individual work item specs, target specific packages and specify package-scoped verification commands (e.g., `pnpm --filter @repo/web build`).

---

## 3. Models & Runtime

### Do I have to switch models between Planning and Execution?
No. While using a high-reasoning model for Planning (Claude Opus, Gemini Pro, GPT-o1/o3) and a fast model for Execution (Claude Sonnet, Gemini Flash, GPT-4o) maximizes cost efficiency, **you can run Kramak entirely with a single capable model**. 

The agent will assess its capabilities during the Capability Gate Check and proceed.

### What happens if my AI session crashes mid-execution?
Kramak is **crash-resilient**:
- If a session terminates while an item is in `active/`, the next session will read `state.json`, detect the file in `active/`, and automatically resume it.
- State reconciliation (`ORIENT` step) runs at the start of every session to align `state.json` with the filesystem.

---

## 4. Workflows & Human Collaboration

### Can I add requirements or report bugs while the agent is running?
Yes! Simply append your notes to `.agents/pipeline/INBOX.md`. The planner automatically reviews and incorporates unprocessed INBOX items during the Strategic Reorientation step of the next planning session.

### What happens when a task requires an API key or human action?
The pipeline will not stall. It writes the requirement to `.agents/pipeline/HUMAN-TASKS.md`, marks `humanTasksPending: true`, and continues executing all non-blocked work items.

---

## 5. Git & Tooling

### How do I validate my pipeline state?
Run the built-in zero-dependency validator:
```bash
node scripts/validate.js
```
Or install the pre-commit hook (`cp hooks/pre-commit .git/hooks/pre-commit`) to validate pipeline state and run build checks automatically before every commit.
