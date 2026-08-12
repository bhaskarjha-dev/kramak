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

# Copy templates
cp -r path/to/kramak/templates/ my-app/.agents/pipeline/
```

Add to your `AGENTS.md`:
```markdown
## Autonomous Development (Kramak)
When you see "Start": read .kramak/spec/BOOTSTRAP.md and follow it.
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
