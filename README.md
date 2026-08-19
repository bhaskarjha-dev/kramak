<div align="center">

<img src="docs/assets/logo.png" alt="Kramak" width="180" />

# Kramak (क्रमक)

**Process control for autonomous coding agents**

*Layer 3 — Process Control, alongside AGENTS.md (Context) and MCP (Connectivity)*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Spec Version](https://img.shields.io/badge/Spec-v1.1.0-7C3AED.svg)](VERSION)
[![Dependencies: 0 Mandatory](https://img.shields.io/badge/Dependencies-0_Mandatory-brightgreen.svg)](.kramak/ROUTER.md)
[![JSON Schema: Draft 2020-12](https://img.shields.io/badge/JSON_Schema-2020--12-blueviolet.svg)](.kramak/schemas/state.schema.json)
[![AAIF Stack: Layer 3 Process](https://img.shields.io/badge/AAIF_Stack-Layer_3_Process-orange.svg)](https://agenticai.foundation)
[![Companion CLI](https://img.shields.io/badge/CLI-Optional_Companion-lightgrey.svg)](https://github.com/bhaskarjha-dev/kramak-cli)

</div>

---

### What is Kramak?

**Kramak (क्रमक)** is Sanskrit for *a methodical, step-by-step procedure* (*krama* + *-aka*, "the agent who progresses methodically") — an exact description of what autonomous AI coding agents need to operate reliably.

- **What:** A deterministic finite state machine (FSM) governing the autonomous Plan $\rightarrow$ Execute $\rightarrow$ Audit lifecycle.
- **Why:** AI agents without process control drift from goals, hallucinate scope, over-modify files, and burn tokens in unguided fix loops.
- **How:** Pure Markdown specifications + JSON Schemas (Draft 2020-12). Zero mandatory runtime dependencies. Any IDE. Any model.

Kramak serves as the deterministic process layer between your specification and your shipped code — built for developers and teams standardizing their **agentic SDLC**.

---

## The 3-Layer Agentic Stack

Under the open standards landscape governed by the Agentic AI Foundation (AAIF), autonomous development is structured into three complementary layers:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          THE 3-LAYER AGENTIC STACK                           │
├─────────────────────┬───────────────────────────┬───────────────────────────┤
│ Layer               │ Standard / Technology     │ Role in System            │
├─────────────────────┼───────────────────────────┼───────────────────────────┤
│ Layer 1: Context    │ AGENTS.md / SKILL.md      │ Repository Knowledge      │
│ Layer 2: Protocol   │ Model Context Protocol    │ Tool & Host Connectivity  │
│ Layer 3: Process    │ Kramak (क्रमक)            │ State Machine & Control   │
└─────────────────────┴───────────────────────────┴───────────────────────────┘
```

- **Layer 1 — Context (`AGENTS.md`):** Tells the agent *what* a project is, its architectural layout, and conventions.
- **Layer 2 — Protocol (`MCP`):** Gives the agent *connectivity* to tools, language servers, and runtime environments.
- **Layer 3 — Process (`Kramak`):** Governs *how* the agent works methodically: what it plans before writing code, how it verifies changes against scope, and how it logs progress so humans retain deterministic auditability.

---

## Quick Start (45 Seconds — No CLI Required)

Kramak requires **zero package installations**. You can bootstrap any repository with a pure copy-paste:

### Step 1: Copy the `.kramak/` governance directory into your project

```bash
# macOS / Linux (Bash)
cp -r /path/to/kramak/.kramak ./

# Windows (PowerShell)
Copy-Item -Recurse -Force "path\to\kramak\.kramak" ".\"
```

---

### Step 2: Connect Your Agent (Choose Path A or Path B)

```
                    Do you already have an AGENTS.md or IDE rule file?
                                       │
                       ┌───────────────┴───────────────┐
                       ▼                               ▼
                     YES                               NO
        ┌─────────────────────────────┐  ┌─────────────────────────────┐
        │ Keep your project context.  │  │ Copy your IDE adapter from  │
        │ Append the 2-line hook:     │  │ adapters/ or copy           │
        │ "Read .kramak/ROUTER.md"    │  │ .kramak/AGENTS.md to root   │
        └─────────────────────────────┘  └─────────────────────────────┘
```

#### Path A — If your project already has `AGENTS.md` (or `CLAUDE.md`, `.cursorrules`):
Append this 2-line hook to the bottom of your existing file:

```markdown
## Autonomous Process Control
Before taking action, read [.kramak/ROUTER.md](.kramak/ROUTER.md) and follow the active state in `.kramak/state.json`.
```

#### Path B — If this is a fresh project (or you want an IDE-native configuration):
Copy the pre-configured adapter file for your tool:

| IDE | Copy Command (Bash / PowerShell) | Target Location |
|---|---|---|
| **Cursor** | `cp adapters/cursor/.cursorrules ./` | `.cursorrules` |
| **Claude Code** | `cp adapters/claude-code/CLAUDE.md ./` | `CLAUDE.md` |
| **Antigravity** | `cp adapters/antigravity/SKILL.md .agents/skills/kramak/SKILL.md` | `.agents/skills/kramak/SKILL.md` |
| **Copilot** | `cp adapters/copilot/copilot-instructions.md .github/copilot-instructions.md` | `.github/copilot-instructions.md` |
| **Devin / Aider / Generic** | `cp .kramak/AGENTS.md ./AGENTS.md` | `AGENTS.md` |

---

### Step 3: Say "Start" to your IDE agent

Invoke your AI coding agent and say:
> **`Start`** *(or "Plan next batch")*

---

## What Happens When You Say "Start" (The 60-Second Loop)

```
User says "Start"
       │
       ▼
┌─────────────────┐  ──► Inspects workspace & toolchain (npm, pytest, cargo)
│ 1. BOOTSTRAP    │  ──► Initializes .kramak/state.json
└────────┬────────┘
         ▼
┌─────────────────┐  ──► Runs Canary Capability Gate (CT-1 to CT-5)
│ 2. PLANNING     │  ──► Ingests tasks from .kramak/inbox/
│                 │  ──► Outputs Work Items (.kramak/work-items/WI-001.json)
└────────┬────────┘
         ▼
┌─────────────────┐  ──► Modifies strictly declared files_targeted
│ 3. EXECUTING    │  ──► Runs test suites (e.g., npm test)
│                 │  ──► Enforces 3-Tier Scope Check (reverts unlisted diffs)
└────────┬────────┘
         ▼
┌─────────────────┐  ──► Fresh-context verification pass
│ 4. AUDITING     │  ──► Confirms zero regression & seals audit trail
│                 │  ──► Marks batch COMPLETE (or bounded retry loop)
└─────────────────┘
```

---

## 12 Validated Innovations

Kramak's design parameters and safety mechanisms are informed by peer-reviewed software engineering and multi-agent systems research:

1. **Grounded Verification:** Planning specs must cite verified file paths and exact line numbers confirmed via live `grep` or file reads before proposing edits.
2. **Anti-Bias Guard (G1–G6):** Programmatic governance framework protecting self-modifications against recency bias, self-preference, and prompt degradation.
3. **Perspective-Based Planning:** Cognitive separation using a structured PERCEIVE $\rightarrow$ REASON $\rightarrow$ DECIDE loop for architectural planning.
4. **Spec Detail Scaling:** Work Items declare a detail tier (🔴 Guided / 🟡 Directed / 🟢 Outcome) to match specification depth to risk level while keeping non-negotiable invariants 100% active.
5. **Repair-Oriented Failure Taxonomy:** 6 standardized failure categories (`code-drift`, `verification-fail`, `scope-exceeded`, `dependency-missing`, `ambiguous-spec`, `tool-error`) mapped to automated remediation actions.
6. **3-Tier Hard Scope Check:** Tier 1 worktree diff check, Tier 2 pre-flight glob exclusion check, and Tier 3 merge re-verification prevent out-of-scope code mutation.
7. **State Reconciliation & WAL:** Write-Ahead Logging (`state.json.tmp` atomic rename) and level-triggered crash recovery survive session aborts.
8. **Progress-Aware Circuit Breaker:** Detects both raw attempt counts (cap: 3) and state-hash repeat oscillations to prevent circular fix loops.
9. **INBOX System:** Dedicated protocol (`.kramak/inbox/`) for structured user guidance and bug injection during live runs.
10. **Human Task Protocol:** Non-blocking external dependency tracking (`HUMAN-TASKS.md`) allowing the agent to continue unblocked work.
11. **Universal Auto-Bootstrap:** Universal `AGENTS.md` + `SKILL.md` baseline emitted at project root, auto-detecting project type and toolchains.
12. **Canary Capability Gate:** Procedural micro-challenge battery (CT-1 to CT-5) assessing model reasoning competence without hardcoding model names.

---

## Adapter Portfolio

Kramak operates across any AI coding environment via a tiered adapter architecture:

| Tier | Target Environment | Integration Mechanism | Status |
|---|---|---|---|
| **Tier 1 (Deep)** | **Claude Code** | `CLAUDE.md` with `@.kramak/AGENTS.md` bridge + skill definitions | Fully Supported |
| **Tier 1 (Deep)** | **Cursor** | `.cursorrules` with glob-scoped activation rules | Fully Supported |
| **Tier 2 (Monitor)** | **Google Antigravity** | `.agents/skills/kramak/SKILL.md` + task integration | Fully Supported |
| **Tier 2 (Monitor)** | **GitHub Copilot** | `.github/copilot-instructions.md` with `AGENTS.md` bridge | Fully Supported |
| **Tier 3 (Thin)** | **Devin Desktop** | Native `AGENTS.md` + `SKILL.md` ingestion | Fully Supported |
| **Tier 3 (Thin)** | **Cline** | `.clinerules` pointing to `.kramak/ROUTER.md` | Fully Supported |
| **Tier 3 (Thin)** | **Aider** | `CONVENTIONS.md` / `AGENTS.md` reference | Fully Supported |

---

## Documentation Quick Links

- 📖 **[Getting Started Guide](docs/GETTING-STARTED.md)** — In-depth setup, IDE matrix, and interaction patterns.
- 💡 **[Adoption Walkthrough](examples/ADOPTION-WALKTHROUGH.md)** — Step-by-step example on an existing codebase.
- ❓ **[Frequently Asked Questions](docs/FAQ.md)** — Architectural answers, multi-IDE handoffs, and edge cases.
- 📊 **[Comparative Analysis](docs/COMPARISON.md)** — Kramak vs Spec Kit, BMAD, RIPER-5, and OpenSpec.
- 📐 **[Formal Specification](docs/SPECIFICATION.md)** — 9-State FSM definition, invariants, and schemas.

---

## License

Kramak is open source software licensed under the [MIT License](LICENSE).