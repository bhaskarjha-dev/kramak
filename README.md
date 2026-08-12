<div align="center">

<img src="docs/assets/logo.png" alt="Kramak" width="180" />

# Kramak (क्रमक)

**The missing SDLC for AI agents.**

*√kram (to step, to progress methodically) + -aka (the agent who does)*

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Spec Version](https://img.shields.io/badge/spec-v1.0.0-7C3AED.svg)](#)
[![Pure Methodology](https://img.shields.io/badge/type-pure_methodology-green.svg)](#)
[![IDE Agnostic](https://img.shields.io/badge/IDE-agnostic-orange.svg)](#)

</div>

---

> AGENTS.md tells AI what your project is. Kramak tells AI how to build it — autonomously, verifiably, across any tool.

---

## What is this?

Kramak is a **file-based, model-agnostic, IDE-agnostic autonomous development methodology.** It provides a complete Plan → Execute → Audit loop that any AI coding agent can follow to develop software without human intervention.

It's like Scrum or Kanban, but for AI-assisted development.

> **This repo contains zero executable code.** Kramak is a set of markdown specifications and JSON templates — a pure process framework. You bring it into *your* project, and any AI agent that can read files can follow it.

### Why does this exist?

The AI coding landscape in 2026 has a gap:

| Layer | Standard | Status |
|-------|----------|--------|
| **Context** ("What is my project?") | AGENTS.md | ✅ 60k+ repos, AAIF standard |
| **Protocol** ("How do tools connect?") | MCP | ✅ Industry standard |
| **Process** ("How to autonomously develop?") | ??? | ❌ **This is the gap** |

Kramak fills it.

---

## Key Features

| Feature | What it does | Why it matters |
|---------|-------------|----------------|
| **Grounded Verification** | Every spec quotes actual code, confirmed by grep | Prevents hallucinated specs |
| **Anti-Bias Guard** | 5-point checklist before pipeline self-improvement | Prevents recency bias in self-evolving systems |
| **Perspective-Based Planning** | PERCEIVE → REASON → DECIDE assessment cycle | Ensures strategic thinking from the right angle |
| **Failure Taxonomy** | 6 failure categories with structured diagnosis | Enables learning from failures |
| **Spec Detail Scaling** | 🔴 Guided (exact BEFORE/AFTER) · 🟡 Directed (intent+constraints) · 🟢 Outcome (goal+criteria) | Right level of detail per risk level |
| **Hard Scope Check** | `git diff --name-only` vs spec file list | Deterministic scope enforcement |
| **State Reconciliation** | Crash recovery from state.json inconsistency | Survives session crashes |
| **Circuit Breaker** | Stops infinite audit-fix-audit loops | Prevents wasted work |
| **INBOX System** | Structured mid-project user input | Users can contribute without breaking flow |
| **Human Task Protocol** | Tracks tasks requiring human action | Pipeline doesn't block on what it can't do |
| **Auto-Bootstrap** | Detects project type and toolchain automatically | Works on any project from day 1 |

---

## Quick Start

### 1. Get Kramak

```bash
git clone https://github.com/YOUR_USERNAME/kramak.git
```

### 2. Set up your project

**Option A — Copy into project:**
```bash
# Copy the spec into your project
cp -r kramak/spec/ your-project/.kramak/

# Copy workspace templates
cp -r kramak/templates/ your-project/.agents/pipeline/
```

**Option B — Use an adapter:**
- [Antigravity IDE](adapters/antigravity/SKILL.md)
- [Cursor](adapters/cursor/README.md)
- [Claude Code](adapters/claude-code/README.md)
- [Any AI tool](adapters/generic/README.md)

### 3. Say "Start"

The agent will bootstrap your project (detect toolchain, create pipeline files) and begin the Plan → Execute → Audit loop.

---

## How It Works

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│ PLANNING │ ──→ │EXECUTING │ ──→ │ AUDITING │ ──→ (back to Planning)
│          │     │          │     │          │
│ • Assess │     │ • Pick   │     │ • Review │
│ • Decide │     │ • Code   │     │ • Verify │
│ • Spec   │     │ • Verify │     │ • Plan   │
│          │     │ • Commit │     │   next   │
└──────────┘     └──────────┘     └──────────┘
```

**State persists across sessions** via `state.json` and work item files. No conversation history needed.

**Model agnostic** — uses capability self-assessment, not model names. Planning needs reasoning. Execution needs speed. Any model that can read/write files works.

**IDE agnostic** — just markdown files and JSON. Adapters exist for specific IDEs.

---

## What's In This Repo vs. What's In Your Project

Kramak lives in **two places** — this is by design:

| Location | What's There | Purpose |
|----------|-------------|---------|
| **This repo** (`kramak/`) | `spec/` — the methodology specs | The "rulebook" — read-only reference |
| | `templates/` — workspace file templates | Starting point for your pipeline files |
| | `adapters/` — IDE-specific integrations | How to wire Kramak into your tool |
| | `docs/` — documentation | Learning and comparison |
| **Your project** (`.agents/pipeline/`) | `state.json` — current state | Cross-session memory |
| | `queue/`, `active/`, `done/`, `failed/` | Work item lifecycle |
| | `plans/` — batch plans | Strategic planning artifacts |
| | `INBOX.md` — user input | Mid-project notes and feedback |
| | `HUMAN-TASKS.md` — human actions | Tasks the pipeline can't do |
| | `PLANNING-LOG.md` — planning history | Why past decisions were made |

The `spec/` files are referenced (read) by the AI agent. The `.agents/pipeline/` files are written and managed by the agent during development.

---

## Project Structure

```
kramak/
├── README.md              ← You are here
├── LICENSE
├── CHANGELOG.md           ← Evolution history
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── VERSION                ← Spec version (1.0.0)
├── spec/                  ← The core methodology
│   ├── PLANNER.md         ← Planning procedure
│   ├── EXECUTOR.md        ← Execution procedure  
│   ├── PRINCIPLES.md      ← Development principles
│   └── BOOTSTRAP.md       ← First-time setup
├── templates/             ← Workspace file templates
│   ├── state.json         ← State schema
│   ├── INBOX.md           ← User input inbox
│   ├── HUMAN-TASKS.md     ← Human task tracker
│   ├── PLANNING-LOG.md    ← Planning history template
│   ├── queue/             ← Work items waiting
│   ├── active/            ← Work item in progress
│   ├── done/              ← Completed items (audit trail)
│   ├── failed/            ← Failed items with diagnosis
│   └── plans/             ← Batch plans
├── adapters/              ← IDE-specific integrations
│   ├── antigravity/       ← Google Antigravity IDE
│   ├── cursor/            ← Cursor
│   ├── claude-code/       ← Claude Code
│   └── generic/           ← Any AI coding tool
├── hooks/                 ← Git hooks
│   └── pre-commit         ← Build/check verification
├── docs/                  ← Documentation
│   ├── GETTING-STARTED.md
│   ├── COMPARISON.md      ← vs RIPER-5, Spec Kit, AGENTS.md
│   └── assets/            ← Logo and images
├── examples/              ← Sample adoption walkthrough
└── .github/               ← Issue & PR templates
```

---

## What makes this different?

See [docs/COMPARISON.md](docs/COMPARISON.md) for a detailed comparison with RIPER-5, GitHub Spec Kit, AGENTS.md, and more.

**TL;DR:** Kramak is the only methodology that is simultaneously:
- ✅ Fully autonomous (zero human intervention during execution)
- ✅ IDE-agnostic (works in any tool that reads files)
- ✅ Model-agnostic (self-assesses capabilities)
- ✅ Self-improving (with Anti-Bias Guard governance)
- ✅ Crash-resilient (state reconciliation)
- ✅ Verification-grounded (grep-confirmed specs, hard diff scope checks)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

Pipeline changes must pass the **Anti-Bias Guard** — a 5-point checklist that prevents recency bias in self-evolving systems.

---

## License

MIT — see [LICENSE](LICENSE).
