# Kramak — Effectiveness Assessment & Critical Analysis

> **Date:** 2026-08-20  
> **Methodology:** 10-dimension evaluation with weighted composite scoring  
> **Context:** Post-v1.1 deep analysis covering every file in the repository  
> **Counterpart:** Strategic roadmap derived from these findings at [`ROADMAP.md`](../ROADMAP.md)

---

## 1. Assessment Purpose

This document captures a comprehensive, honest evaluation of Kramak's likelihood of achieving its intended objective:

> **Provide a deterministic, model-agnostic, IDE-agnostic process control layer that prevents autonomous AI coding agents from drifting, hallucinating scope, burning tokens in fix loops, and producing unauditable changes.**

The assessment was conducted by reading every file in the repository (specification files, schemas, research sessions, adapters, templates, and documentation) and evaluating the project across 10 weighted dimensions.

---

## 2. Composite Rating: 7.5 / 10

| Dimension | Score | Weight | Weighted | Key Insight |
|---|---|---|---|---|
| Architectural Soundness | 9.0 | 1.0× | 9.0 | Algebraically closed FSM, progressive disclosure, WAL — exceptional design |
| Effectiveness vs Failure Modes | 8.0 | 1.5× | 12.0 | All 5 defenses well-designed; scope control is the strongest |
| **Agent Compliance** | **6.0** | **2.0×** | **12.0** | **Critical vulnerability: agents that need governance are worst at following it** |
| Adoption Friction | 7.0 | 1.0× | 7.0 | Zero-dep install is great; 150KB spec and 15+ files can intimidate |
| Model & IDE Compatibility | 8.0 | 1.0× | 8.0 | Genuinely model-agnostic; 7 IDE adapters |
| Specification Quality | 9.0 | 0.5× | 4.5 | 176 cataloged rules, JSON Schema validation, deterministic edge cases |
| Research Backing | 9.5 | 0.5× | 4.75 | 16 sessions, 11 ADRs, peer-reviewed citations — unusually rigorous |
| Competitive Positioning | 7.5 | 0.5× | 3.75 | Strongest architecture in category; real competition is the status quo |
| Sustainability | 7.0 | 1.0× | 7.0 | Clean architecture; bus factor = 1 is the risk |
| Core Value Delivery | 7.5 | 1.5× | 11.25 | Transformative for complex multi-session projects; overkill for quick tasks |
| | | **Σ / 10.5** | **79.25 / 105** | **= 7.5 / 10** |

---

## 3. Detailed Dimension Analysis

### 3.1 Architectural Soundness — 9/10

**Strengths:**
- The 9-state FSM is algebraically closed — every state has defined outgoing transitions, every transition has formal guard conditions. No undefined behavior states exist.
- Progressive disclosure (sub-2KB ROUTER.md → on-demand heavy specs) correctly treats LLM context windows as the scarcest resource.
- Planner/Executor role separation mirrors high-performing human engineering teams (architects don't write code, implementers don't redesign architecture).
- WAL for state persistence solves a real problem git-only approaches can't: inter-commit state evolution.
- The 3-tier scope check is defense-in-depth done right.

**Risks:**
- 9 states may be over-engineered for most real-world use cases. Most projects will never use `DISPATCH`, `MERGE_QUEUE`, or parallel worktrees. This complexity exists in the spec even when unused.
- The WAL protocol assumes fine-grained filesystem control (write .tmp → atomic rename → delete .wal) that many AI coding agents lack.

---

### 3.2 Effectiveness Against the 5 Failure Modes — 8/10

| Failure Mode | Defense Mechanism | Rating | Notes |
|---|---|---|---|
| **Goal drift** | ORIENT reading order, anti-anchoring protocol, PERCEIVE→REASON→DECIDE, strategic reorientation | ⭐⭐⭐⭐ | Forces systematic re-grounding every session |
| **Scope hallucination** | `files_targeted` + 3-tier scope check + pre-execution intercept | ⭐⭐⭐⭐⭐ | Kramak's strongest defense — deterministic set comparison |
| **Fix loops** | Circuit breaker (hash oscillation, consecutive failure cap, trajectory extension) | ⭐⭐⭐⭐ | Mathematically sound; depends on correct hash computation |
| **Unauditable changes** | JSONL ledger, batch plans, WI specs with BEFORE/AFTER, conventional commits | ⭐⭐⭐⭐ | Comprehensive audit trail when followed |
| **Over-modification** | Polish Ceiling Rule, ≤5 files/≤50 lines, DO NOT sections, neighborhood cleanup | ⭐⭐⭐⭐ | Quantitative constraints harder to ignore than vague guidelines |

**Key insight:** All 5 defenses are well-designed *as specifications*. But they're only effective if the agent complies. This is the fundamental tension of a pure-spec approach — it's a constitution, not a compiler.

---

### 3.3 Agent Compliance & Specification Adherence — 6/10

> **This is Kramak's single biggest vulnerability — hence the 2.0× weight.**

**The Compliance Paradox:** Kramak is a governance framework for agents that struggle with governance. It asks the patient to administer their own medicine.

**Evidence for optimism:**
- Modern frontier models are increasingly good at following complex multi-step instructions.
- Progressive disclosure reduces cognitive load — agents only need ROUTER.md (34 lines) to know where to go.
- The Canary Capability Gate tests instruction-following before trusting the agent with planning.

**Evidence for concern:**
- Kramak's own cited research acknowledges LLM performance degrades at 40-50% context utilization. A planning session loads ~65KB of spec — a significant context burden.
- Empirical data from FeatBench, SWE-Bench, and METR shows agents struggle with plan compliance over extended sessions — the very failure Kramak tries to prevent.
- The spec contains deeply nested conditional logic (e.g., "If CT-2 < 1.0 AND composite ≥ 0.60, elevate medium-risk to 🔴 Guided AND run self-audit TWICE"). LLMs are unreliable at following deeply nested conditionals.
- No enforcement mechanism exists in pure-spec mode. The spec says "run `git diff --name-only` vs files_targeted" — but nothing prevents an agent from skipping that step.

---

### 3.4 Adoption Friction — 7/10

**Low friction:** Zero dependencies, 45-second quickstart, 7 IDE adapters, "say Start" universal trigger.

**Higher friction:** Developers must understand the FSM to debug issues; `.kramak/` adds 15+ files; 600KB research directory signals "PhD thesis" more than "practical tool"; no visual dashboard; HUMAN-TASKS.md requires manual Markdown editing.

---

### 3.5 Model & IDE Compatibility — 8/10

**Strong:** Model-agnostic by design, capability tiers not model names, works with any agent that can read files and run commands.

**Risks:** Some agents lack the autonomous loop capability to drive the FSM; the Canary Gate may penalize agents good at code but weak at abstract reasoning.

---

### 3.6 Specification Quality — 9/10

**Exceptional:** 176 rules cataloged and cross-referenced; JSON Schema Draft 2020-12 validation; deterministic edge case decision tables; failure taxonomy mapped to ODC + MAST.

**Minor issues:**
- `RULES-INVENTORY.md` references line numbers from pre-v1.1 monolithic spec
- Polish Ceiling Rule defined in 3 places (consolidation opportunity)
- `RULES-INVENTORY.md` header duplicates source reference

---

### 3.7 Research Backing — 9.5/10

Kramak's standout dimension. 16 formal research sessions across 4 dependency waves. 11 architectural decisions with one-way/two-way door classification. Premortem failure analysis on irreversible decisions. Explicit evidence grading. ACH templates for contradiction resolution. Peer-reviewed literature references.

**Slight deduction:** Some research sessions are frontier-AI-generated rather than peer-reviewed human research.

---

### 3.8 Competitive Positioning — 7.5/10

Kramak has the deepest FSM and most rigorous specification among alternatives (Spec Kit, BMAD, RIPER-5, OpenSpec). The real competition isn't other frameworks — it's the *status quo* of unstructured agent usage. The biggest adoption hurdle is convincing people they need process control at all.

---

### 3.9 Sustainability — 7/10

Clean architecture, MIT license, anti-bias governance, companion CLI separation. Risks: single maintainer (bus factor = 1), no visible community traction, 150KB spec surface area maintenance burden, platform absorption risk as AI vendors build process control natively.

---

### 3.10 Core Value Delivery — 7.5/10

| Context | Value |
|---|---|
| Teams already using structured AI workflows | Moderate improvement (formalizes existing practices) |
| Developers doing unstructured "vibe coding" | High potential *if the agent follows the spec* |
| Complex multi-session projects | **Kramak's sweet spot** — significant improvement |
| Quick one-off tasks | Negative value (overhead exceeds task time) |

---

## 4. Five Critical Risks

| # | Risk | Severity | Mitigation Path |
|---|---|---|---|
| 1 | **The Compliance Paradox** — agents that need governance are worst at following governance specs | 🔴 Critical | Evolve `kramak-cli` from optional to primary enforcement layer |
| 2 | **Context Budget Exhaustion** — loading specs consumes 20-40% of agent context before work begins | 🟡 High | Continue optimizing progressive disclosure; add "Kramak Lite" mode |
| 3 | **Adoption Chicken-and-Egg** — no community = no validation = no community | 🟡 High | Publish benchmarks, demo videos, and quantitative before/after comparisons |
| 4 | **Platform Absorption** — AI vendors build process control natively into their agents | 🟡 High | Position as cross-platform open standard (EditorConfig model) |
| 5 | **Maintenance Scalability** — 150KB spec, 176 rules, single maintainer | 🟢 Medium | Community building; modular architecture already enables distributed ownership |

---

## 5. Recommendations (Prioritized)

### Must-Do (Critical for success)

1. **Make `kramak-cli` the primary enforcement layer.** Programmatic scope checks, state validation, and circuit breaker enforcement that don't depend on agent self-discipline. This directly addresses Risk #1.

2. **Publish benchmark results.** Run Kramak-governed agents against SWE-Bench/FeatBench and show quantitative improvement. This addresses Risk #3.

3. **Create "Kramak Lite" mode.** 3-state subset (PLANNING → EXECUTING → AUDITING) for 80% of value with 20% complexity. This addresses Risk #2.

### Should-Do (Significant improvement)

4. **Build a status dashboard.** Single-file HTML that reads `state.json` and renders the FSM state visually. Human oversight shouldn't require reading JSON.

5. **Record a compelling demo video.** Show a real project lifecycle with the agent following the FSM and catching scope violations.

### Nice-to-Do (Strategic positioning)

6. **Explore MCP integration.** A Kramak MCP server would make Layer 2 ↔ Layer 3 seamless.

7. **Publish thought leadership.** Blog posts and conference talks on why agents need process control.

---

## 6. When Kramak Succeeds vs. Fails

### ✅ Conditions for Success
- Frontier model agent (Claude Opus/Sonnet, GPT-4o, Gemini Pro) with strong instruction-following
- Complex multi-session project (>1 day of AI-assisted development)
- Developer understands the FSM lifecycle and can intervene at WAITING/ESCALATED
- Companion CLI provides programmatic enforcement
- Project type benefits from formal scope control (multi-file features, database migrations, auth systems)

### ❌ Conditions for Underperformance
- Weaker model that can't reliably follow 500+ lines of conditional Markdown
- Quick one-off task where planning overhead exceeds execution time
- No human available to resolve WAITING/ESCALATED states promptly
- "Install and forget" attitude without understanding the lifecycle
- Solo script or prototype that doesn't need audit trails

---

## 7. Methodology Notes

- **Scope:** Every file in the repository was read, including all specification files (`.kramak/`), schemas, research sessions (16 × 30-50KB), adapters, templates, documentation, changelog, contributing guide, and license.
- **Scoring:** Each dimension scored 1-10 with explicit weight reflecting importance to achieving the stated objective. Agent Compliance weighted 2.0× as the highest-impact risk factor.
- **Bias disclosure:** This assessment was conducted by an AI agent (the very type of system Kramak governs). The analysis attempts honesty over advocacy, but inherent perspective bias should be acknowledged.
- **Validation path:** These findings should be validated against real-world usage data once benchmark results (Roadmap P1-01) are available.
