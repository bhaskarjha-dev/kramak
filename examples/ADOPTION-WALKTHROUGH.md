# Example: Adopting Kramak in Your Project

This walkthrough shows what happens when you bring Kramak into an existing project.

---

## Before

Your project has code and an `AGENTS.md`, but no development process for AI agents:

```
my-app/
├── src/
│   ├── index.ts
│   └── ...
├── package.json
├── tsconfig.json
├── AGENTS.md          ← tells agents WHAT the project is
└── README.md
```

## Step 1: Add Kramak

```bash
# Copy spec files
cp -r path/to/kramak/spec/ my-app/.kramak/

# Copy spec and template reference files
cp -r path/to/kramak/spec/ my-app/.kramak/
cp -r path/to/kramak/templates/ my-app/.kramak/

# Copy initial runtime files
mkdir -p my-app/.agents/pipeline
cp -r path/to/kramak/templates/* my-app/.agents/pipeline/
```

Add to your `.agents/AGENTS.md` (or `AGENTS.md`):
```markdown
# Project Context

## Autonomous Development (Kramak)
When you receive the instruction "Start", "begin", "continue", or "go":
1. Read `.agents/pipeline/state.json`
   - If missing: read `.kramak/spec/BOOTSTRAP.md` and bootstrap
   - If present: follow procedure for `state.phase`:
     - `planning` -> Read `.kramak/spec/PLANNER.md`
     - `executing` -> Read `.kramak/spec/EXECUTOR.md`
     - `auditing` -> Read `.kramak/spec/EXECUTOR.md §STEP 8.5`
     - `waiting` -> Check `HUMAN-TASKS.md` & `INBOX.md`; if resolved or unblocked roadmap work exists, switch `phase` to `planning` and follow `PLANNER.md`; otherwise prompt user.
2. Before any work, read `.kramak/spec/PRINCIPLES.md` (non-negotiable).
3. Rules: Every token advances the project. Continuous state update. Grounded verification.
```

## Step 2: Say "Start"

The agent bootstraps automatically:
1. Detects your toolchain (Node.js + pnpm + TypeScript)
2. Creates `state.json` with detected build/check commands
3. Creates `INBOX.md`, `HUMAN-TASKS.md`, `PLANNING-LOG.md`
4. Creates `queue/`, `active/`, `done/`, `failed/`, `plans/` directories
5. Enters the **planning phase**

## After Bootstrap

```
my-app/
├── src/
│   ├── index.ts
│   └── ...
├── .kramak/                    ← Kramak spec (read-only reference)
│   └── spec/
│       ├── PLANNER.md
│       ├── EXECUTOR.md
│       ├── PRINCIPLES.md
│       └── BOOTSTRAP.md
├── .agents/
│   ├── AGENTS.md               ← your project context
│   └── pipeline/               ← managed by the AI agent
│       ├── state.json           ← cross-session memory
│       ├── INBOX.md             ← your notes to the agent
│       ├── HUMAN-TASKS.md       ← tasks only you can do
│       ├── PLANNING-LOG.md      ← planning decision history
│       ├── queue/               ← work items to execute
│       ├── active/              ← work item in progress
│       ├── done/                ← completed (audit trail)
│       ├── failed/              ← failed with diagnosis
│       └── plans/               ← batch plans
├── package.json
├── tsconfig.json
└── README.md
```

## Step 3: The Loop Begins

From here, the agent cycles autonomously:

1. **PLANNING** — Assesses the project, chooses a perspective, writes work items
2. **EXECUTING** — Picks work items from `queue/`, codes, verifies, commits
3. **AUDITING** — Reviews the batch, fixes issues, plans next

You can contribute at any time by dropping notes in `INBOX.md`:

```markdown
### [2026-08-12] Bug: API returns 500 on empty input
**Type:** bug
The /api/search endpoint crashes when query is empty string.
```

The planner picks this up at the next planning session and creates a work item for it.

## Tips

- **Use a strong reasoning model for planning** (Claude Opus, Gemini Pro) and a fast model for execution (Claude Sonnet, GPT-4o-mini)
- **Check `state.json`** to see what the agent plans to do next
- **Review `done/` files** to see the audit trail of completed work
- **Don't delete `failed/` files** — they contain diagnosis that helps future sessions
