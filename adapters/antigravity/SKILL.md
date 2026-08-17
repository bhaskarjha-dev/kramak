---
name: kramak
description: >
  Use when the user says "Start" to begin autonomous development.
  Provides a complete Plan-Execute-Audit pipeline for any software project.
  Works with any model — self-detects capabilities and adapts behavior.
  Also use when the user wants to set up autonomous development on a new or existing project.
---

# Kramak — Autonomous Development Pipeline

When the user says **"Start"** (or "begin", "continue", "go"):

## Step 1: Check if pipeline exists

```
Does .agents/pipeline/state.json exist?
  → YES: Read it. Follow the procedure for state.phase (see Step 3).
  → NO:  Read spec/BOOTSTRAP.md from the Kramak project and follow its procedure.
```

## Step 2: Read principles

Read `spec/PRINCIPLES.md` from the Kramak project. These are non-negotiable.

## Step 3: Follow the phase

| `state.phase` | Read and follow |
|---------------|-----------------|
| `planning` | `spec/PLANNER.md` |
| `executing` | `spec/EXECUTOR.md` |
| `auditing` | `spec/EXECUTOR.md` §STEP 8.5 |

## Step 4: Model self-assessment

Assess your capabilities at session start:
- **Strong reasoning** → Suitable for planning/auditing
- **Fast execution** → Suitable for executing work items
- **Both** → Suitable for all phases

At session end, recommend CAPABILITIES (not model names) for the next phase.
