<div align="center">

<img src="docs/assets/logo.png" alt="Kramak" width="180" />

# Kramak (क्रमक)

**Process control for autonomous coding agents**

*Layer 3 — Process, alongside AGENTS.md (context) and MCP (connectivity)*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Spec Version](https://img.shields.io/badge/Spec-v1.1.0-7C3AED.svg)](VERSION)
[![Dependencies: 0 Mandatory](https://img.shields.io/badge/Dependencies-0_Mandatory-brightgreen.svg)](.kramak/ROUTER.md)
[![JSON Schema: Draft 2020-12](https://img.shields.io/badge/JSON_Schema-2020--12-blueviolet.svg)](.kramak/schemas/state.schema.json)
[![AAIF Stack: Layer 3 Process](https://img.shields.io/badge/AAIF_Stack-Layer_3_Process-orange.svg)](https://agenticai.foundation)
[![Companion CLI](https://img.shields.io/badge/CLI-Optional_Companion-lightgrey.svg)](https://github.com/bhaskarjha-dev/kramak-cli)

</div>

---

### What is Kramak?

**Kramak (क्रमक)** is Sanskrit for *a methodical, step-by-step procedure* (*√kram* + *-aka*, "the agent who progresses methodically") — an exact description of what autonomous AI coding agents need to operate reliably.

- **What:** A deterministic finite state machine (FSM) governing the autonomous Plan → Execute → Audit lifecycle.
- **Why:** AI agents without process control drift from goals, hallucinate scope, over-modify files, and burn tokens in unguided loops.
- **How:** Pure Markdown specifications + JSON Schemas (Draft 2020-12). Zero mandatory runtime dependencies. Any IDE. Any model.

Kramak serves as the deterministic process layer between your specification and your shipped code — built for teams standardizing their **agentic SDLC**.

---

## The 3-Layer Agentic Stack

Under the open standards landscape governed by the Agentic AI Foundation (AAIF), autonomous development is structured into three complementary layers:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          THE 3-LAYER AGENTIC STACK                           │
├───────────────────┬───────────────────────────────┬─────────────────────────┤
│ Layer             │ Standard / Technology         │ Role in System          │
├───────────────────┼───────────────────────────────┼─────────────────────────┤
│ Layer 1: Context  │ AGENTS.md / SKILL.md (AAIF)   │ Repository Knowledge    │
│ Layer 2: Protocol │ Model Context Protocol (MCP)  │ Tool & Host Connectivity│
│ Layer 3: Process  │ Kramak (क्रमक)                │ State Machine & Control │
└───────────────────┴───────────────────────────────┴─────────────────────────┘
```

- **Layer 1 — Context (`AGENTS.md`):** Tells the agent *what* a project is, its architectural layout, and conventions.
- **Layer 2 — Protocol (`MCP`):** Gives the agent *connectivity* to tools, language servers, and runtime environments.
- **Layer 3 — Process (`Kramak`):** Governs *how* the agent works: what it plans before writing code, how it verifies changes against scope, and how it logs progress so humans retain deterministic auditability.

Kramak is agent-agnostic and model-agnostic. It works seamlessly with Claude Code, Cursor, Google Antigravity, GitHub Copilot, Devin Desktop, Cline, and Aider.

---

## Quick Start (30 Seconds — No CLI Required)

Kramak requires **zero package installations**. You can bootstrap any repository with a pure copy-paste:

### 1. Copy the `.kramak/` governance directory into your project

```bash
# Clone or copy .kramak into your project root
cp -r /path/to/kramak/.kramak ./
```

### 2. Point your agent to the entry router

If your project uses `AGENTS.md` (or your IDE's instructions file), add:

```markdown
# Autonomous Development
Before performing work, read [.kramak/ROUTER.md](.kramak/ROUTER.md) and follow the active state in [.kramak/state.json](.kramak/state.json).
```

### 3. Say "Start" to your IDE agent

Your agent will inspect `.kramak/state.json` (or initialize with `phase: "bootstrap"`), read `.kramak/ROUTER.md`, and enter `PLANNING`.

> **Optional CLI:** If you prefer CLI-driven scaffolding and offline validation, use our standalone companion tool:
> ```bash
> npx @kramak/cli init
> npx @kramak/cli validate
> ```
> *Note: `@kramak/cli` is an optional companion tool hosted in a separate repository; the core Kramak specification remains 100% dependency-free.*

---

## How It Works: The 8-State Closed-Loop FSM

Kramak models autonomous development as an algebraically closed, deterministic finite state automaton (FSM):

```mermaid
graph TD
    BOOTSTRAP["1. BOOTSTRAP<br/><i>Toolchain & Stack Init</i>"] --> PLANNING["2. PLANNING<br/><i>Reasoning Tier (PERCEIVE ➔ REASON ➔ DECIDE)</i>"]
    
    PLANNING -->|Sequential (concurrency = 1)| EXECUTING["4. EXECUTING<br/><i>Precision Tier (ReAct + Scope Check)</i>"]
    PLANNING -->|Parallel (concurrency > 1)| DISPATCH["3. DISPATCH<br/><i>Worktree Spawn & Sharding</i>"]
    DISPATCH --> EXECUTING
    
    EXECUTING --> AUDITING["5. AUDITING<br/><i>Execution-Grounded Inspection</i>"]
    
    AUDITING -->|Retry Budget OK (<3 tries)| EXECUTING
    AUDITING -->|Retry Exhausted / Re-plan| PLANNING
    AUDITING -->|Sequential Pass| COMPLETE["8. COMPLETE<br/><i>All WIs Verified & Sealed</i>"]
    AUDITING -->|Parallel Pass| MERGE_QUEUE["6. MERGE_QUEUE<br/><i>Serialized FIFO Integration</i>"]
    MERGE_QUEUE --> COMPLETE
    
    PLANNING -.-> WAITING["7. WAITING<br/><i>Human Block / Low Canary</i>"]
    EXECUTING -.-> WAITING
    AUDITING -.-> WAITING
    WAITING -.-> PLANNING
    WAITING -.-> EXECUTING
    
    PLANNING -.-> ESCALATED["ESCALATED<br/><i>Circuit Breaker Tripped</i>"]
    EXECUTING -.-> ESCALATED
    AUDITING -.-> ESCALATED
    ESCALATED -.-> WAITING
```

### State Progression Overview

| State | Role | Primary Objective | Invariants Enforced |
|---|---|---|---|
| **`BOOTSTRAP`** | Orchestrator | Detect toolchain, initialize `.kramak/state.json`, run crash reconciliation | Schema validity, clean working tree |
| **`PLANNING`** | Planner | Ingest requirements, formulate DAG, author Work Items (`WI-XXX.json`) | Grounded Verification (grep line citations) |
| **`DISPATCH`** | Orchestrator | Provision isolated git worktrees (`.kramak/worktrees/<id>`) for parallel tasks | Pre-flight file-scope mutual exclusion |
| **`EXECUTING`** | Executor | Implement declared Work Item, verify tests, enforce scope limits | 3-Tier Hard Scope Check (`git diff --name-only`) |
| **`AUDITING`** | Auditor | Execute test suite in fresh session, verify diffs, evaluate retry budgets | Execution-grounded verification, bounded retries |
| **`MERGE_QUEUE`** | Orchestrator | Serialize worktree branches into integration branch in FIFO order | Linear commit history, zero regression |
| **`WAITING`** | Coordinator | Pause autonomous loop for human action item in `HUMAN-TASKS.md` or INBOX | State checkpoint sealed |
| **`ESCALATED`** | Breaker | Hard stop on repeated failure oscillations or 3 consecutive failed retries | Prevents infinite token burn |
| **`COMPLETE`** | Orchestrator | Final summary and release verification | All Work Items `done` and clean diff |

---

## This Repo vs. Your Project

To keep governance clean and unambiguous:

| Dimension | This Repository (`kramak`) | Your Project (`your-repo/`) |
|---|---|---|
| **Role** | **The Specification** (read-only reference) | **The Application** (active development) |
| **Contents** | Core Markdown specs, JSON Schemas, templates, adapters | Your source code + `.kramak/` directory |
| **State File** | Reference schema (`.kramak/schemas/state.schema.json`) | Live state (`.kramak/state.json`) |
| **Work Items** | Work item templates (`.kramak/templates/`) | Project tasks (`.kramak/work-items/*.json`) |
| **Runtime Code** | **Zero dependencies** (pure Markdown & JSON Schema) | Your chosen language and runtime |

---

## 12 Validated Innovations

Kramak's design parameters and safety mechanisms are informed by peer-reviewed software engineering and multi-agent systems research:

1. **Grounded Verification:** Planning specs must cite verified file paths and exact line numbers confirmed via live `grep` or file reads before proposing edits.
2. **Anti-Bias Guard (G1–G6):** Programmatic governance framework protecting self-modifications against recency bias, self-preference, and prompt degradation.
3. **Perspective-Based Planning:** Cognitive separation using a structured PERCEIVE → REASON → DECIDE loop for architectural planning.
4. **Spec Detail Scaling:** Work Items declare a detail tier (🔴 Guided / 🟡 Directed / 🟢 Outcome) to match specification depth to risk level while keeping non-negotiable invariants 100% active.
5. **Repair-Oriented Failure Taxonomy:** 6 standardized failure categories (`code-drift`, `verification-fail`, `scope-exceeded`, `dependency-missing`, `ambiguous-spec`, `tool-error`) mapped to automated remediation actions.
6. **3-Tier Hard Scope Check:** Tier 1 worktree diff check, Tier 2 pre-flight glob exclusion check, and Tier 3 merge re-verification prevent out-of-scope code mutation.
7. **State Reconciliation & WAL:** Write-Ahead Logging (`state.json.tmp` atomic rename) and level-triggered crash recovery survive session aborts.
8. **Progress-Aware Circuit Breaker:** Detects both raw attempt counts (cap: 3) and state-hash repeat oscillations to prevent circular fix loops.
9. **INBOX System:** Dedicated protocol (`.kramak/inbox/` or `INBOX.md`) for structured user guidance and bug injection during live runs.
10. **Human Task Protocol:** Non-blocking external dependency tracking (`HUMAN-TASKS.md`) allowing the agent to continue unblocked work.
11. **Universal Auto-Bootstrap:** Universal `AGENTS.md` + `SKILL.md` baseline emitted at project root, auto-detecting project type and toolchains.
12. **Canary Capability Gate:** Procedural micro-challenge battery (CT-1 to CT-5) assessing model reasoning competence without hardcoding model names.

---

## Adapter Portfolio

Kramak operates across any AI coding environment via a tiered adapter architecture:

| Tier | Target Environment | Integration Mechanism | Status |
|---|---|---|---|
| **Tier 1 (Deep)** | **Claude Code** | `CLAUDE.md` with `@.kramak/AGENTS.md` bridge + skill definitions | Fully Supported |
| **Tier 1 (Deep)** | **Cursor** | `.cursor/rules/kramak-core.mdc` with glob-scoped activation | Fully Supported |
| **Tier 2 (Monitor)** | **Google Antigravity** | `.gemini/AGENTS.md` + `skills/` integration | Fully Supported |
| **Tier 2 (Monitor)** | **GitHub Copilot** | `.github/copilot-instructions.md` with `AGENTS.md` bridge | Fully Supported |
| **Tier 3 (Thin)** | **Devin Desktop** | Native `AGENTS.md` + `SKILL.md` ingestion | Fully Supported |
| **Tier 3 (Thin)** | **Cline** | `.clinerules/kramak.md` pointing to `.kramak/ROUTER.md` | Fully Supported |
| **Tier 3 (Thin)** | **Aider** | `CONVENTIONS.md` / `AGENTS.md` reference | Fully Supported |
| **Tier 4 (Sunset)** | **Roo Code** | Deprecated following upstream project shutdown (redirected to Cline) | Deprecated |

*Community adapters for other IDEs and custom agent harnesses are hosted under [`kramak-community-adapters`](https://github.com/bhaskarjha-dev/kramak-community-adapters).*

---

## How Kramak Compares

| Dimension | Kramak (क्रमक) | GitHub Spec Kit | RIPER-5 / Forks | BMAD Method | GSD / OpenSpec |
|---|---|---|---|---|---|
| **Primary Focus** | **Runtime Process Control & Audit Governance** | Pre-execution Spec Generation | Interactive Mode Prompting | Agile Persona Framework | Execution / Delta Specs |
| **Category Layer** | **Layer 3: Process Control** | Spec-Driven Development (SDD) | System Prompt Convention | Agile Methodology | Sub-agent / Delta Spec |
| **State Persistence** | **Deterministic `state.json` (Draft 2020-12) + WAL** | Plain Markdown artifacts (no schema) | Markdown memory banks (no schema) | Markdown stories (no schema) | Markdown delta files |
| **Enforcement Model** | **8-State FSM & 3-Tier Hard Scope Checks** | Advisory (slash commands in any order) | Advisory (LLM self-compliance) | Advisory (workflow guidelines) | Advisory (prompt instructions) |
| **Verification Loop** | **Built-in `AUDITING` → `PLANNING` Loopback** | Optional bolt-on (`/speckit.converge`) | Advisory Review Mode | Optional Module ("BMad Loop") | Sub-agent verifier |
| **Tooling Footprint** | **Zero mandatory dependencies** (Pure Markdown + Schemas) | Mandatory CLI (`specify-cli`, `uv`, Python 3.11+) | Zero dependencies (single prompt) | Node/Python setup | Tool-specific prompts |
| **Interoperability** | **Model & IDE Agnostic** (Emits `AGENTS.md` / `SKILL.md`) | Multi-tool (30+ agents) | Tool-specific forks | Multi-IDE persona configs | Tool-specific prompts |

*For in-depth, research-backed comparisons and evidence grades, see [docs/COMPARISON.md](docs/COMPARISON.md).*

---

## Optional Companion CLI

While Kramak requires no tooling to operate, an optional companion CLI is available for automated scaffolding, schema validation, and diagnostics:

```bash
# Initialize Kramak in your repository
npx @kramak/cli init

# Validate state.json and work items against JSON Schemas
npx @kramak/cli validate

# Diagnose environment, git status, and adapter configurations
npx @kramak/cli doctor
```

The CLI is maintained in the companion repository [`kramak-cli`](https://github.com/bhaskarjha-dev/kramak-cli).

---

## Documentation

- [Getting Started Guide](docs/GETTING-STARTED.md) — 30-second setup and operating instructions
- [Formal Specification](docs/SPECIFICATION.md) — 8-state FSM, transition tables, and filesystem invariants
- [Comparative Analysis](docs/COMPARISON.md) — Research-backed comparisons vs. Spec Kit, RIPER-5, BMAD, GSD
- [Frequently Asked Questions (FAQ)](docs/FAQ.md) — Common questions, monorepos, recovery, and models
- [Founding Architecture Document](FOUNDING-ARCHITECTURE.md) — Authoritative architectural specification

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

All modifications to `.kramak/` specifications, schemas, or invariants must pass the **Anti-Bias Guard (G1–G6)** to prevent recency bias and maintain specification integrity.

---

## License

[MIT](LICENSE) © 2026 Bhaskar Jha and Kramak contributors.
