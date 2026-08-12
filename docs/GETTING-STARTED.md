# Getting Started with Kramak

## What is Kramak?

Kramak is a file-based, model-agnostic, IDE-agnostic autonomous development methodology. It tells AI coding agents **how to autonomously develop your project** through a Plan → Execute → Audit loop.

**AGENTS.md tells agents WHAT your project is. Kramak tells them HOW to build it.**

---

## Quick Start (5 minutes)

### Option A: Copy spec files into your project

```bash
# Clone Kramak
git clone https://github.com/YOUR_USERNAME/kramak.git

# Copy spec files to your project
cp -r kramak/spec/ your-project/.kramak/

# Copy workspace templates
cp -r kramak/templates/ your-project/.agents/pipeline/
```

Then add to your project's AGENTS.md:
```markdown
## Autonomous Development (Kramak)
When you see "Start": read .kramak/spec/BOOTSTRAP.md and follow it.
```

### Option B: Reference Kramak externally

Keep Kramak as a separate directory and reference it from your project's agent context.

### Option C: Use an IDE adapter

See the `adapters/` directory for IDE-specific setup:
- **Antigravity IDE** → `adapters/antigravity/SKILL.md`
- **Cursor** → `adapters/cursor/README.md`
- **Claude Code** → `adapters/claude-code/README.md`
- **Any other tool** → `adapters/generic/README.md`

---

## How It Works

### The Loop

```
                ┌──────────────┐
                │   PLANNING   │ ← Strong reasoning model
                │              │   Reads code, writes specs
                │  Assess →    │   
                │  Prioritize →│
                │  Write WIs   │
                └──────┬───────┘
                       │
                       ▼
                ┌──────────────┐
                │  EXECUTING   │ ← Fast execution model
                │              │   Follows specs precisely
                │  Pick WI →   │
                │  Code →      │
                │  Verify →    │
                │  Commit      │
                └──────┬───────┘
                       │
                       ▼
                ┌──────────────┐
                │   AUDITING   │ ← Fresh executor session
                │              │   Reviews what was built
                │  Check →     │
                │  Fix or →    │
                │  Plan next   │
                └──────┬───────┘
                       │
                       └──────── (back to Planning)
```

### State Persistence

Everything is stored in files:
- `state.json` — cross-session memory (phase, queue, completed items)
- `queue/` — work items waiting for execution
- `done/` — completed work items (audit trail)
- `failed/` — failed items with diagnosis
- `plans/` — batch plans with strategic intent
- `PLANNING-LOG.md` — history of what perspectives were taken and why

### Model Agnostic

Kramak doesn't require specific models. It requires **capabilities**:
- Planning needs strong reasoning
- Execution needs fast, precise code generation
- Auditing needs a fresh context (executor in new session)

Any model that can read files, write code, and run commands can use Kramak.

---

## User Input During Development

Drop notes into `.agents/pipeline/INBOX.md`:

```markdown
### [2026-08-12] Bug: Login fails on mobile
**Type:** bug
Safari on iPhone doesn't send the auth cookie.
```

The planner processes these at the start of each planning session.

---

## Human Tasks

When the pipeline encounters something it can't do (API key procurement, account signups), it creates an entry in `HUMAN-TASKS.md` and continues with non-blocked work.

---

## Pre-commit Hook (Optional)

Install the pre-commit hook for deterministic verification:

```bash
cp hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

This automatically reads your project's check commands from `state.json` and runs them before every commit.
