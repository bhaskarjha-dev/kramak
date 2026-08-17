# Kramak — Aider Adapter

[Aider](https://aider.chat/) is an AI pair programming tool in the terminal. To use Kramak's structured Plan-Execute-Audit lifecycle inside Aider:

## Configuration

Add the following to your project's `.aider.conf.yml` or load it with `CONVENTIONS.md`:

```yaml
# .aider.conf.yml
read:
  - .kramak/spec/PRINCIPLES.md
  - .agents/pipeline/state.json
```

Add a `CONVENTIONS.md` (or include in your system prompt):

```markdown
# Kramak Autonomous Development Loop

When instructed to "Start", "begin", "continue", or "go":

1. Read `.agents/pipeline/state.json`.
   - If missing: read `.kramak/spec/BOOTSTRAP.md` and initialize pipeline.
   - If `phase == "planning"`: read `.kramak/spec/PLANNER.md` and write work items to `.agents/pipeline/queue/`.
   - If `phase == "executing"`: read `.kramak/spec/EXECUTOR.md`, execute active/queued work items, and run verification.
   - If `phase == "auditing"`: read `.kramak/spec/EXECUTOR.md §STEP 8.5` and perform technical audit.

2. Always adhere to `.kramak/spec/PRINCIPLES.md`.
3. Update `.agents/pipeline/state.json` after completing or failing each item.
```

## Running with Aider

```bash
# Start Aider with Kramak context
aider --read .kramak/spec/PRINCIPLES.md --read .agents/pipeline/state.json
```

Then type `/ask Start` or `Start`.
