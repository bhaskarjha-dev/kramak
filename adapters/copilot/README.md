# Kramak — GitHub Copilot Workspace & Agent Adapter

To use Kramak with GitHub Copilot (Workspace, Edits, and Copilot Chat in VS Code), add the following to `.github/copilot-instructions.md`:

```markdown
# Autonomous Development Methodology (Kramak)

When instructed to "Start", "begin", "continue", or "go":

1. Check `.agents/pipeline/state.json`:
   - If not found: Follow `.kramak/spec/BOOTSTRAP.md` to initialize project context and state.
   - If found: Check `state.phase`:
     - `planning` -> Follow `.kramak/spec/PLANNER.md`
     - `executing` -> Follow `.kramak/spec/EXECUTOR.md`
     - `auditing` -> Follow `.kramak/spec/EXECUTOR.md §STEP 8.5`

2. Follow `.kramak/spec/PRINCIPLES.md` at all times:
   - Grounded Verification: read real code files before writing work item specs or applying diffs.
   - Neighborhood Cleanup: leave edited files cleaner than you found them.
   - Update `state.json` after every work item.
```

## Setup Instructions

1. Copy Kramak specs into `.kramak/spec/`:
   ```bash
   cp -r path/to/kramak/spec/ .kramak/spec/
   ```
2. Create `.github/copilot-instructions.md` with the instructions above.
3. In Copilot Chat / Workspace, say **"Start"**.
