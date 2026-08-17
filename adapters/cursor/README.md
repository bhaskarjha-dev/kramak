# Kramak — Cursor Adapter

Add the following to your `.cursor/rules/kramak.mdc` file:

```mdc
---
description: Autonomous development pipeline — triggered when user says "Start"
globs: .agents/pipeline/**
alwaysApply: false
---

# Kramak Pipeline

When the user says "Start", "begin", "continue", or "go":

1. Check if `.agents/pipeline/state.json` exists
   - YES → Read state.json, follow the procedure for state.phase
   - NO → Read .kramak/spec/BOOTSTRAP.md and follow the bootstrap procedure

2. Read PRINCIPLES from: .kramak/spec/PRINCIPLES.md

3. Follow the phase:
   - planning → Read .kramak/spec/PLANNER.md
   - executing → Read .kramak/spec/EXECUTOR.md
   - auditing → Read .kramak/spec/EXECUTOR.md §STEP 8.5
   - waiting → Check HUMAN-TASKS.md & INBOX.md; if resolved or unblocked roadmap work exists, set phase to "planning" and follow .kramak/spec/PLANNER.md; otherwise prompt user

4. At session end, recommend capabilities (not model names) for next phase.

## Core Rules
- No human output — every token advances the project
- Update state.json continuously
- Verify every code reference by reading the actual file
- Run build/check commands after every change
```

## Setup

1. Copy the `spec/` and `templates/` directories from Kramak into your project as `.kramak/spec/` and `.kramak/templates/` (or run `./init.sh`)
2. Create `.cursor/rules/kramak.mdc` with the content above
3. Say "Start" in Cursor chat
