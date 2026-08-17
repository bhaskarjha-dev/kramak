# Kramak — Windsurf (Cascade) Adapter

To use Kramak in [Windsurf by Codeium](https://codeium.com/windsurf), add the following to your project's `.windsurfrules` file (or Cascade custom system instructions):

```markdown
# Autonomous Development Pipeline (Kramak)

When the user says "Start", "begin", "continue", or "go":

1. Check if `.agents/pipeline/state.json` exists:
   - If missing: Read `.kramak/spec/BOOTSTRAP.md` and follow the bootstrap procedure.
   - If present: Read `state.phase` and follow the matching procedure:
     - `planning` -> Read `.kramak/spec/PLANNER.md`
     - `executing` -> Read `.kramak/spec/EXECUTOR.md`
     - `auditing` -> Read `.kramak/spec/EXECUTOR.md §STEP 8.5`

2. Before any work, read `.kramak/spec/PRINCIPLES.md` (non-negotiable development principles).

3. Core Operating Invariants:
   - Every token advances the project: write files and code, do not output chat summaries.
   - Grounded Verification: confirm every code change against actual files (never from memory).
   - Update `.agents/pipeline/state.json` after every work item.
   - Run project check commands after every code edit.
```

## Setup Instructions

1. Copy the `spec/` directory into your project as `.kramak/spec/`:
   ```bash
   mkdir -p .kramak && cp -r path/to/kramak/spec .kramak/
   ```
2. Create `.windsurfrules` in the root of your project with the content above.
3. Open Windsurf Cascade chat and say **"Start"**.
