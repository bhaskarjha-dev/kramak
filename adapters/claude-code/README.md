# Kramak — Claude Code Adapter

Add the following section to your `CLAUDE.md` file:

```markdown
## Autonomous Development Pipeline (Kramak)

When I say "Start":

1. Read `.agents/pipeline/state.json`
   - If it doesn't exist: read .kramak/spec/BOOTSTRAP.md and bootstrap
   - If it exists: follow the procedure for state.phase

2. Phases:
   - planning → Follow .kramak/spec/PLANNER.md
   - executing → Follow .kramak/spec/EXECUTOR.md
   - auditing → Follow .kramak/spec/PLANNER.md §STEP 7

3. Always read .kramak/spec/PRINCIPLES.md first

4. Rules: No human output. Update state.json. Verify all code references. 
   Run build/check commands after every change.
```

## Setup

1. Copy the `spec/` directory from Kramak into your project as `.kramak/spec/` (or reference it by path)
2. Add the section above to your `CLAUDE.md`
3. Say "Start" in Claude Code
