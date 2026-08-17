# Kramak — Generic Adapter (Any AI Coding Agent)

For any AI coding tool that can read files and run commands:

## Setup

1. Copy the `spec/` and `templates/` directories into your project under `.kramak/` (or keep them referenced externally, or run `./init.sh`)
2. Add the following to your project's agent context file (AGENTS.md, README, or system prompt):

```markdown
## Autonomous Development Pipeline

When you receive the instruction "Start":

1. Read `.agents/pipeline/state.json` in this workspace
   - If missing → Read .kramak/spec/BOOTSTRAP.md and follow the bootstrap procedure
   - If present → Read state.phase and follow the matching procedure:
      - "planning" → Read and follow .kramak/spec/PLANNER.md
      - "executing" → Read and follow .kramak/spec/EXECUTOR.md
      - "auditing" → Read and follow .kramak/spec/EXECUTOR.md §STEP 8.5
      - "waiting" → Check `HUMAN-TASKS.md` & `INBOX.md`; if resolved or unblocked roadmap work exists, switch `phase` to "planning" and follow `PLANNER.md`; otherwise prompt user.

2. Before any work, read .kramak/spec/PRINCIPLES.md (non-negotiable rules)

3. Core rules:
   - Every token advances the project (no chat, no explanations)
   - Update .agents/pipeline/state.json after every work item
   - Verify all code references by reading actual files (never from memory)
   - Run build/check commands after every code change
   - At session end, state what capability the next session needs
```

3. Say "Start" to begin

## Minimum Requirements

Your AI agent needs these capabilities:
- ✅ Read files from the workspace
- ✅ Write/create files in the workspace
- ✅ Run terminal commands (git, build tools)
- ✅ Search/grep within files

Optional but recommended:
- 🔍 Web search (for research and API verification)
- 📝 Multi-file editing
