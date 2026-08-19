# Comparative Analysis: Kramak vs. the AI Development Landscape

> **Positioning:** Process control for autonomous coding agents  
> *Layer 3 — Process Control, alongside `AGENTS.md` (Context) and `MCP` (Connectivity)*

---

## 1. Executive Landscape Overview

As of August 2026, the autonomous AI coding ecosystem is structured around two established standards under the **Agentic AI Foundation (AAIF)**:
- **Layer 1 — Context (`AGENTS.md`):** Over 60,000 repositories declare project context and conventions in a standardized Markdown format.
- **Layer 2 — Protocol (`MCP`):** Over 110 million monthly SDK downloads connect agents to tools and host APIs.
- **Layer 3 — Process (`Kramak`):** Governs the runtime state machine, planning loops, scope enforcement, and auditability.

While the Process layer contains multiple active projects (>200,000 combined GitHub stars across Spec Kit, BMAD, GSD, OpenSpec, and RIPER-5 forks), existing tools focus primarily on **pre-execution specification generation** or **conversational prompt conventions**. 

**Kramak is uniquely positioned as the deterministic runtime process-control and audit substrate that composes with, rather than replaces, upstream specification tools.**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         UPSTREAM vs RUNTIME COMPOSITION                     │
├─────────────────────────────────────────────────────────────────────────────┤
│   [Requirements & Specs]   ──►  GitHub Spec Kit / OpenSpec / Human Prompts │
│             │                                                               │
│             ▼                                                               │
│   [Runtime Process Control] ──►  KRAMAK (Plan ──► Execute ──► Audit FSM)    │
│             │                                                               │
│             ▼                                                               │
│   [Shipped Production Code] ──►  Tested, Scoped, Audited Pull Request       │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Master Comparison Matrix

| Dimension | Kramak (क्रमक) | GitHub Spec Kit | RIPER-5 & Forks | BMAD Method | GSD ("Get Stuff Done") | OpenSpec |
|---|---|---|---|---|---|---|
| **Primary Category** | **Runtime Process Control** | Spec-Driven Dev (SDD) | System Prompt Mode | Agile Persona Framework | Execution Orchestration | Delta Specifications |
| **State Persistence** | **`state.json` (Draft 2020-12) + WAL** | Plain Markdown files | Markdown memory bank | Markdown story files | Markdown session logs | Markdown delta files |
| **State Machine** | **9-State Closed FSM** | None (advisory slash commands) | None (advisory prompt mode) | 4-Phase loop (advisory) | Multi-agent wave loop | 3-Step delta lifecycle |
| **Scope Enforcement** | **3-Tier Hard Scope Check** (`git diff`) | Advisory | Advisory ("don't edit X") | Human-in-the-loop review | Sub-agent diff review | Advisory delta bounds |
| **Verification Gate** | **Grounded Verification** (live grep) | Manual checklist (`/checklist`) | Unverified self-claim | Verification story | Sub-agent test runner | Test suite execution |
| **Audit Loopback** | **Core FSM loopback** (`AUDIT ──► PLAN`) | Optional (`/speckit.converge`) | Advisory review mode | Optional module ("BMad Loop") | Sub-agent debugger | Manual delta merge |
| **Model Gating** | **Procedural Canary Battery** (CT-1..5) | Static model allowlist | Hardcoded system prompts | Role persona prompts | Hardcoded model routing | None |
| **Dependencies** | **0 Mandatory** (Pure Markdown + JSON) | Python runtime (`specify-cli`) | None (Prompt only) | Node.js / CLI package | Node.js runtime | CLI binary |

---

## 3. Detailed Architectural Differentiators

### 1. Mechanical Enforcement vs. Advisory Guidelines
- **Other Tools:** Rely on LLMs reading advisory prompt rules like *"Please do not modify files outside src/components"*. Under long contexts or high reasoning load, models frequently drift and violate advisory rules.
- **Kramak:** Enforces a **mechanical git gate (Tier 1 Scope Check)**. The executor runs `git diff --name-only` against `files_targeted` and automatically reverts any unlisted modifications.

### 2. Algebraically Closed 9-State Automaton vs. Open-Ended Loops
- **Other Tools:** Operate in linear scripts or open-ended chat loops where models get stuck in circular fix loops after errors.
- **Kramak:** Operates an **algebraically closed 9-state FSM** (`BOOTSTRAP`, `PLANNING`, `DISPATCH`, `EXECUTING`, `AUDITING`, `MERGE_QUEUE`, `WAITING`, `ESCALATED`, `COMPLETE`) with bounded retry budgets and a **Progress-Aware Circuit Breaker** that detects repeating error state hashes.

### 3. Model-Agnostic Capability Gating vs. Hardcoded Model Names
- **Other Tools:** Hardcode specific model strings (e.g. `claude-3-5-sonnet-20241022`). When new models launch, tools break or require upstream updates.
- **Kramak:** Evaluates models dynamically through the **Canary Capability Gate (CT-1 to CT-5)**, measuring reasoning competence, instruction hierarchy adherence, and state tracking rather than brand names.

---

## 4. How Kramak Composes with the Ecosystem

Kramak does not compete with upstream specification generators or IDE prompt extensions — it provides the execution backbone:

1. **With GitHub Spec Kit:** Use Spec Kit to generate your architectural user stories and specs $\rightarrow$ point Kramak's `PLANNER` to the generated specs to execute and audit the build deterministically.
2. **With AGENTS.md:** Use root `AGENTS.md` to define your repository context $\rightarrow$ Kramak uses that context while enforcing the Plan-Execute-Audit process.
3. **With MCP (Model Context Protocol):** Connect database and testing tools via MCP servers $\rightarrow$ Kramak commands the agent when to call those tools during execution and auditing.