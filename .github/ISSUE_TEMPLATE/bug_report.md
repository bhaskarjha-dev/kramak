---
name: Bug Report
about: Something isn't working as expected when following the Kramak methodology
title: "[Bug]: "
labels: bug
assignees: ''
---

## Describe the bug
A clear and concise description of what went wrong.

## Environment
- **IDE/Agent:** (e.g., Cursor, Claude Code, Antigravity, other)
- **Model:** (e.g., Claude Opus, GPT-4o, Gemini Pro)
- **Spec version:** (check `VERSION` file)
- **Phase:** (bootstrap / planning / dispatch / executing / auditing / merge_queue / waiting / escalated / complete)

## What happened
1. The agent was in `[phase]`...
2. It tried to...
3. The result was...

## Expected behavior
What should have happened instead.

## Relevant files
If possible, paste the relevant section of:
- `state.json`
- The failing work item (from `.kramak/work-items/` or `state.failed`)
- Any error output

## Additional context
Any other context about the problem.
