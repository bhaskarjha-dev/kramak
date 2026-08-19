# Kramak (क्रमक) — Process Control for Autonomous Coding Agents

> **Layer 3 — Process Control** (alongside `AGENTS.md` for Context and `MCP` for Connectivity)  
> Deterministic state machine governing the Plan → Execute → Audit lifecycle.

---

## 1. Project Identity & Purpose

**Kramak (क्रमक)** is an open-source, model-agnostic, and IDE-agnostic process control framework for autonomous coding agents. It provides a formal finite state machine (FSM) that guides an AI agent through software engineering tasks with externalized state, grounded verification, and deterministic scope enforcement.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          THE 3-LAYER AGENTIC STACK                           │
├───────────────────┬───────────────────────────────┬─────────────────────────┤
│ Layer             │ Standard / Technology         │ Role in System          │
├───────────────────┼───────────────────────────────┼─────────────────────────┤
│ Layer 1: Context  │ AGENTS.md / SKILL.md (AAIF)   │ Repository Context      │
│ Layer 2: Protocol │ Model Context Protocol (MCP)  │ Tool & Environment Comm │
│ Layer 3: Process  │ Kramak (क्रमक)                │ Runtime State & Control │
└───────────────────┴───────────────────────────────┴─────────────────────────┘
```

---

## 2. Quick Entry Point

To initiate or resume autonomous execution:
1. **State:** Read [.kramak/state.json](.kramak/state.json). If missing, initialize from [.kramak/schemas/state.schema.json](.kramak/schemas/state.schema.json) with `phase: "bootstrap"`.
2. **Inbox Priority:** Check [.kramak/inbox/](.kramak/inbox/) for urgent items. Time-sensitive INBOX items trigger immediate processing, not waiting for the next planning cycle. The ORIENT step checks INBOX FIRST.
3. **Router:** Read [.kramak/ROUTER.md](.kramak/ROUTER.md) and dispatch according to `state.phase`.

---

## 3. Core Architectural Constraints

- **Zero Mandatory Runtime Dependencies:** Pure Markdown specifications, JSON Schemas (Draft 2020-12), and Git repository mechanics.
- **Model-Agnostic:** Capability-based role routing (Reasoning, Precision, Verification tiers); never hardcodes model names.
- **IDE-Agnostic:** Core state machine lives in `.kramak/`; declarative adapters translate into host-native toolchains.

---

## 4. Non-Negotiable Invariants

The following invariants apply across all execution tiers and are never scaled away:
1. **Grounded Verification:** Verify all claims, file paths, and code references via live `grep` or file reads before proposing edits. Never cite from memory.
2. **3-Tier Hard Scope Check:** Compare `git diff --name-only` against the Work Item's `files_targeted`. Automatically revert unlisted file modifications.
3. **Progress-Aware Circuit Breaker:** Repeated state hash on non-adjacent tries or 3 consecutive failures on the same Work Item trips escalation (`phase: "escalated"`); stop immediately.
4. **WAL Atomic Writes:** Mutations write to `.kramak/state.json.tmp` first, flush, and atomically rename. Recovery renames `.tmp` or replays `.wal`.
5. **Anti-Bias Guard (G1–G6):** Self-modifications to `.kramak/` require G1 history diff, G2 rollback check, G3 dual-model critique, G4 ledger logging, G5 cooldown, and G6 risk-tiered human gate.

---

## 5. Specification & Schema Directory

| Component | Path | Description |
|---|---|---|
| **Router** | [.kramak/ROUTER.md](.kramak/ROUTER.md) | Universal entry contract & phase routing table |
| **Planner Core** | [.kramak/planner/CORE.md](.kramak/planner/CORE.md) | Strategic planning, DAG formulation, and bootstrap |
| **Executor Core** | [.kramak/executor/CORE.md](.kramak/executor/CORE.md) | ReAct execution, technical audit, and merge queue |
| **State Schema** | [.kramak/schemas/state.schema.json](.kramak/schemas/state.schema.json) | JSON Schema Draft 2020-12 for `state.json` |
| **Work Item Schema** | [.kramak/schemas/work-item.schema.json](.kramak/schemas/work-item.schema.json) | JSON Schema Draft 2020-12 for Work Items |
| **Audit Ledger** | [.kramak/ledger/FORMAT.md](.kramak/ledger/FORMAT.md) | Immutable audit trail format for `.kramak/` edits |
| **Templates** | [.kramak/templates/](.kramak/templates/) | Standardized templates for Work Items, Tasks, Retros |
