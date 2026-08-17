# Kramak — Cline & Roo Code Adapter

To use Kramak with [Cline](https://github.com/cline/cline) or [Roo Code](https://github.com/RooVetGit/Roo-Code), add the following to `.clinerules` in your workspace root:

```markdown
# Autonomous Development Pipeline (Kramak)

When you receive the instruction "Start", "begin", "continue", or "go":

1. Read `.agents/pipeline/state.json`
   - If missing -> Read `.kramak/spec/BOOTSTRAP.md` and follow the bootstrap procedure.
   - If present -> Read `state.phase` and follow the matching procedure:
     - `planning` -> Read `.kramak/spec/PLANNER.md`
     - `executing` -> Read `.kramak/spec/EXECUTOR.md`
     - `auditing` -> Read `.kramak/spec/EXECUTOR.md §STEP 8.5`

2. Read `.kramak/spec/PRINCIPLES.md` (Constitutional rules).

3. Operational Constraints:
   - Do NOT ask questions or produce conversational chat tokens. Write changes to files and update state.json.
   - For Guided items (🔴): strictly respect BEFORE/AFTER replacements verified via grep.
   - Run verification commands after each change.
   - At session boundary, update state.json `nextAction` and notify with one sentence.
```

## Setup Instructions

1. Copy Kramak specs into `.kramak/spec/`:
   ```bash
   cp -r path/to/kramak/spec/ .kramak/spec/
   ```
2. Create `.clinerules` in your workspace root with the snippet above.
3. Open Cline / Roo Code and trigger the loop with **"Start"**.
