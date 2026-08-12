# Kramak vs Alternatives

## How Kramak compares to existing approaches

### vs RIPER-5

| Aspect | Kramak | RIPER-5 |
|--------|--------|---------|
| **Autonomy** | Fully autonomous — zero human intervention | Requires human mode-switching between phases |
| **IDE support** | Any IDE (file-based) | Cursor-specific (.cursorrules) |
| **Model support** | Any model (self-assessment) | Designed for Claude in Cursor |
| **Verification** | Grounded (grep-confirmed specs) | Trust-based (agent self-assessment) |
| **Crash recovery** | State reconciliation from state.json | No persistence between sessions |
| **Self-improvement** | Anti-Bias Guard governs changes | Static rules |
| **Failure handling** | 6-category taxonomy with diagnosis | Basic retry |
| **Scope control** | Hard diff scope check (git-based) | Prompt-based ("don't touch other files") |

### vs GitHub Spec Kit

| Aspect | Kramak | Spec Kit |
|--------|--------|----------|
| **Installation** | Zero install — just files | Requires CLI (`uv install specify-cli`) |
| **Autonomy** | Fully autonomous | Semi — CLI-driven with human gates |
| **Crash recovery** | State reconciliation | File-based but no crash recovery |
| **Pipeline governance** | Anti-Bias Guard for self-improvement | Static workflow |
| **Human task tracking** | Structured HUMAN-TASKS.md | Not included |
| **User input protocol** | INBOX.md for mid-project input | Not included |

### vs AGENTS.md (the standard)

Kramak is **complementary** to AGENTS.md, not a replacement.

```
AGENTS.md = "Here's my project" (context — WHAT)
Kramak    = "Here's how to autonomously develop it" (process — HOW)
```

AGENTS.md tells agents about your project. Kramak tells agents how to work on it.

### vs Aider

| Aspect | Kramak | Aider |
|--------|--------|-------|
| **Type** | Pure methodology (no code) | CLI tool (executable) |
| **Approach** | Agent reads specs, follows process | Conversational code editing |
| **Persistence** | Full state across sessions | Git-based, conversation-scoped |
| **Planning** | Multi-perspective strategic assessment | User-directed |
| **Scope control** | Deterministic (git diff vs spec) | Conversational |
| **Self-improvement** | Built-in (Anti-Bias Guard) | Not applicable |

### vs OpenHands / Devin

| Aspect | Kramak | OpenHands / Devin |
|--------|--------|-------------------|
| **Type** | Pure methodology (no runtime) | Full agent platform (sandboxed) |
| **IDE lock-in** | None — works anywhere | Own environment |
| **Model lock-in** | None — capability-based | Platform-specific |
| **Cost** | Free (MIT) | Platform pricing |
| **Customization** | Full — edit the specs | Configuration-based |
| **Process governance** | Anti-Bias Guard, circuit breaker | Platform-managed |

### What Kramak has that nobody else does

1. **Grounded Verification Protocol** — every spec must quote actual code, grep-verified
2. **Anti-Bias Guard** — 5-point checklist before any pipeline self-improvement
3. **Perspective-Based Planning** — PERCEIVE → REASON → DECIDE assessment cycle
4. **Failure Taxonomy** — 6 categories with structured diagnosis
5. **Spec Detail Scaling** — 🔴 Guided / 🟡 Directed / 🟢 Outcome based on risk
6. **Hard Diff Scope Check** — `git diff --name-only` compared against spec
7. **State Reconciliation** — crash recovery from state.json inconsistency
8. **Circuit Breaker** — stops infinite audit-fix-audit loops
9. **INBOX System** — structured user input processing mid-project
10. **Human Task Tracking** — separate protocol for tasks requiring human action
11. **Token-Reasoning Principle** — never suppress model reasoning tokens
12. **Capability Gate Check** — model self-assessment, not model names
