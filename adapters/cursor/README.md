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
   - NO → Bootstrap: scan workspace, detect toolchain, create pipeline files

2. Read PRINCIPLES from: .kramak/spec/PRINCIPLES.md

3. Follow the phase:
   - planning → Read .kramak/spec/PLANNER.md
   - executing → Read .kramak/spec/EXECUTOR.md
   - auditing → Read .kramak/spec/PLANNER.md §STEP 7

4. At session end, recommend capabilities (not model names) for next phase.

## Core Rules
- No human output — every token advances the project
- Update state.json continuously
- Verify every code reference by reading the actual file
- Run build/check commands after every change
```

## Setup

1. Copy the `spec/` directory from Kramak into your project as `.kramak/spec/` (or reference it by path)
2. Create `.cursor/rules/kramak.mdc` with the content above
3. Say "Start" in Cursor chat
