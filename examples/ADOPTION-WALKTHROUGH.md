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

Copy the `.kramak/` directory from the Kramak repository into your project:

```bash
# Clone Kramak and copy the governance directory
git clone https://github.com/bhaskarjha-dev/kramak.git /tmp/kramak
cp -r /tmp/kramak/.kramak ./
```

That's it. No package install, no build step, no runtime dependency.

## Step 2: Point Your Agent to Kramak

Add this to your project's `AGENTS.md` (or your IDE's instructions file):

```markdown
# Autonomous Development
Before performing work, read [.kramak/ROUTER.md](.kramak/ROUTER.md) and follow
the active state in `.kramak/state.json` (create if missing with `phase: "bootstrap"`).
```

Or copy the appropriate adapter from `adapters/` if you use a specific IDE:
- **Claude Code:** Copy `adapters/claude-code/CLAUDE.md` → your project root as `CLAUDE.md`
- **Cursor:** Copy `adapters/cursor/.cursorrules` → your project root
- **Antigravity:** Copy `adapters/antigravity/SKILL.md` → `.agents/skills/kramak/SKILL.md`
- **Copilot:** Copy `adapters/copilot/copilot-instructions.md` → `.github/copilot-instructions.md`

## Step 3: Say "Start"

The agent bootstraps automatically:
1. Reads `.kramak/ROUTER.md` → sees no `state.json` → enters `BOOTSTRAP`
2. Detects your toolchain (Node.js + pnpm + TypeScript)
3. Runs the Capability Gate (CT-1 to CT-5 micro-challenges)
4. Creates `state.json` with detected build/check commands
5. Enters **PLANNING** phase

## After Bootstrap

```
my-app/
├── src/
│   ├── index.ts
│   └── ...
├── .kramak/                         ← Kramak governance (specs + runtime)
│   ├── ROUTER.md                    ← Entry point (always loaded first)
│   ├── AGENTS.md                    ← AAIF context bridge
│   ├── SKILL.md                     ← AAIF skill definition
│   ├── state.json                   ← Cross-session persistent state
│   ├── schemas/                     ← JSON Schema validation contracts
│   ├── planner/                     ← Planning specs (loaded during PLANNING)
│   │   ├── CORE.md
│   │   ├── capability-gate.md
│   │   ├── output-contract.md
│   │   ├── edge-cases.md
│   │   └── domain-conventions.md
│   ├── executor/                    ← Execution specs (loaded during EXECUTING)
│   │   ├── CORE.md
│   │   ├── error-recovery.md
│   │   ├── tool-playbooks.md
│   │   └── PROGRESS.md
│   ├── work-items/                  ← Active and queued Work Items
│   ├── inbox/                       ← Your notes to the agent
│   ├── ledger/                      ← Immutable audit trail
│   └── templates/                   ← WI, human task, retrospective templates
├── AGENTS.md
├── package.json
├── tsconfig.json
└── README.md
```

## Step 4: The Loop Begins

From here, the agent cycles autonomously through the 8-state FSM:

```
BOOTSTRAP → PLANNING → DISPATCH → EXECUTING → AUDITING → COMPLETE
                ↑                                  │
                └──────── (retry on failure) ───────┘
```

1. **PLANNING** — Assesses the project, runs PERCEIVE → REASON → DECIDE, writes Work Items
2. **DISPATCH** — Routes WIs (sequential or parallel via git worktrees)
3. **EXECUTING** — Codes, verifies, commits per WI scope (3-Tier Scope Check enforced)
4. **AUDITING** — Reviews the batch, fixes issues, loops back or completes
5. **WAITING** — Blocks on human input when needed (reachable from any active state)

### Communicate with the Agent

Drop notes in `.kramak/inbox/` at any time:

```markdown
<!-- .kramak/inbox/bug-api-500.md -->
### Bug: API returns 500 on empty input
**Type:** bug
**Priority:** critical
The /api/search endpoint crashes when query is empty string.
```

The planner picks this up at the next ORIENT step (INBOX is checked first, every session).

## Tips

- **Use a strong reasoning model for planning** and a fast/precise model for execution — Kramak's Capability Gate routes by capability tier, not model name.
- **Check `state.json`** to see the current phase and what the agent plans to do next.
- **Don't touch `.kramak/ledger/`** — it's an immutable, append-only audit trail.
- **The agent self-recovers** — the Circuit Breaker catches loops, the error-recovery decision tree handles failures, and WAITING/ESCALATED states ensure human involvement when needed.