---
name: kramak
description: "Autonomous development pipeline — deterministic Plan→Execute→Audit lifecycle"
trigger: "Start"
---

# Kramak — Autonomous Development Pipeline

Use when the user says **"Start"** (or "begin", "continue", "go", "kramak") to run or resume autonomous software development.

---

## 1. Execution Procedure on "Start" Trigger

```
┌────────────────────────┐
│ 1. Read state.json     │ ── Missing? ──► Create default state.json (phase: "bootstrap")
└───────────┬────────────┘
            │
┌───────────▼────────────┐
│ 2. Check INBOX/        │ ── Time-Sensitive Item? ──► Process immediately (ORIENT checks INBOX first)
└───────────┬────────────┘
            │
┌───────────▼────────────┐
│ 3. Read ROUTER.md      │ ── Ingest non-negotiable invariants & active phase route
└───────────┬────────────┘
            │
┌───────────▼────────────┐
│ 4. Dispatch by Phase   │ ── Follow spec for state.phase (see Routing Table below)
└────────────────────────┘
```

1. **Inspect State:** Read [.kramak/state.json](file:///d:/dev/pro/kramak/.kramak/state.json). If it does not exist, initialize it using default values from [.kramak/schemas/state.schema.json](file:///d:/dev/pro/kramak/.kramak/schemas/state.schema.json) with `phase: "bootstrap"`.
2. **Check Priority Inbox:** Check [.kramak/inbox/](file:///d:/dev/pro/kramak/.kramak/inbox/) for pending user guidance. Time-sensitive INBOX items trigger immediate processing, not waiting for the next planning cycle. The ORIENT step checks INBOX FIRST.
3. **Read Router:** Read [.kramak/ROUTER.md](file:///d:/dev/pro/kramak/.kramak/ROUTER.md) to load core invariants.
4. **Follow Routing Table:** Execute the corresponding specification for `state.phase`.

---

## 2. Phase Routing Table

| Operational Phase | Specification Target | Primary Action | Required Capability Tier |
|---|---|---|---|
| `bootstrap` | [.kramak/planner/CORE.md](file:///d:/dev/pro/kramak/.kramak/planner/CORE.md) §BOOTSTRAP | Toolchain detection & stack init | Reasoning Tier |
| `planning` | [.kramak/planner/CORE.md](file:///d:/dev/pro/kramak/.kramak/planner/CORE.md) | Formulate batch DAG & work items | Reasoning Tier |
| `dispatch` | [.kramak/planner/CORE.md](file:///d:/dev/pro/kramak/.kramak/planner/CORE.md) §DISPATCH | Provision worktrees & state shards | Reasoning / Precision Tier |
| `executing` | [.kramak/executor/CORE.md](file:///d:/dev/pro/kramak/.kramak/executor/CORE.md) | Implement active Work Item | Precision Tier |
| `auditing` | [.kramak/executor/CORE.md](file:///d:/dev/pro/kramak/.kramak/executor/CORE.md) §AUDIT | Verify code against test suite | Verification Tier |
| `merge_queue` | [.kramak/executor/CORE.md](file:///d:/dev/pro/kramak/.kramak/executor/CORE.md) §MERGE | Serialized FIFO integration | Precision Tier |
| `waiting` | — | Resolve human tasks / INBOX | User / External Action |
| `escalated` | — | Inspect circuit breaker reason | Human Developer Review |
| `complete` | — | Review milestone summary | Pipeline Terminated |

---

## 3. Capability Requirements by Phase

- **PLANNING Phase:**
  - Strong multi-step causal reasoning and architecture synthesis
  - Large context window (100K+ tokens) for broad codebase scanning
  - Web search and documentation retrieval tools (helpful for API research)
- **EXECUTING Phase:**
  - Fast and accurate code editing and diff application
  - Direct filesystem and terminal/build tool access
  - Tight ReAct execution loop adherence
- **AUDITING Phase:**
  - Fresh, uncontaminated context window
  - Test runner, linter, and build execution access
  - Rigorous git diff analysis and scope verification

---

## 4. Model Tier Recommendations

Kramak routes tasks strictly by **capability tier**, never by proprietary model name:

- **Reasoning Tier:** Models with strong chain-of-thought capabilities, high context capacity, and architectural decomposition skills $\rightarrow$ Recommended for `BOOTSTRAP`, `PLANNING`, and `DISPATCH`.
- **Precision Tier:** Fast models optimized for low latency, precise tool execution, and code manipulation $\rightarrow$ Recommended for `EXECUTING` and `MERGE_QUEUE`.
- **Verification Tier:** Models or clean subagent sessions operating with fresh context and test execution access $\rightarrow$ Recommended for `AUDITING`.

*At session completion, always recommend CAPABILITIES (not model names) for the subsequent session.*
