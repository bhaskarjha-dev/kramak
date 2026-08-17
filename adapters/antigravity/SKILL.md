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
  → NO:  Read .kramak/spec/BOOTSTRAP.md (or spec/BOOTSTRAP.md) and follow its procedure.
```

## Step 2: Read principles

Read `.kramak/spec/PRINCIPLES.md` (or `spec/PRINCIPLES.md`). These are non-negotiable.

## Step 3: Follow the phase

| `state.phase` | Read and follow |
|---------------|-----------------|
| `planning` | `.kramak/spec/PLANNER.md` (or `spec/PLANNER.md`) |
| `executing` | `.kramak/spec/EXECUTOR.md` (or `spec/EXECUTOR.md`) |
| `auditing` | `.kramak/spec/EXECUTOR.md §STEP 8.5` (or `spec/EXECUTOR.md §STEP 8.5`) |
| `waiting` | Check `HUMAN-TASKS.md` & `INBOX.md`. If resolved or unblocked roadmap work exists, switch `phase` to `planning` and follow `PLANNER.md`; otherwise ask user. |

## Step 4: Model self-assessment

Assess your capabilities at session start:
- **Strong reasoning** → Suitable for planning/auditing
- **Fast execution** → Suitable for executing work items
- **Both** → Suitable for all phases

At session end, recommend CAPABILITIES (not model names) for the next phase.
