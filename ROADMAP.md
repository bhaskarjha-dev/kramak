# Kramak (क्रमक) — Strategic Roadmap

> **Last Updated:** September 2026  
> **Current Version:** 1.1.0  
> **Status:** Post-v1.1 Vision & Implementation Backlog  
> **Source:** Derived from research pipeline, empirical effectiveness assessments, and the September 2026 Strategic Review

---

## Vision & Architectural Tenets

Kramak aims to become the **universal open standard for autonomous coding agent process control** — the EditorConfig of the agentic SDLC:

1. **Protocol-First (No Forking, No Vendor Lock-In):** Reaffirm ADR D-009. We do not fork agent harnesses. Kramak remains an open, portable Layer 3 process standard that composes with any agent harness, model, and IDE without vendor lock-in.
2. **Exploratory Mechanical Enforcement (Candidate Backstops):** Evaluate optional, host-agnostic mechanical backstops — such as portable git pre-commit hooks, open agent plugin events, and CI scope verification (GitHub Actions validating PR diffs against `files_targeted`) — to prevent prompt-drift while keeping the core specification 100% zero-dependency.
3. **Validated with Scope-Centric Benchmarks:** Test against OverEager-Gen and SNARE to prove quantitative reductions in unauthorized modifications and scope creep.
4. **Two Tiers, One Standard:** Full Kramak provides the deep 9-state enterprise specification with Canary qualification; Kramak Lite provides the 45KB single-file front door.

---

## Strategic Phases

```
Phase 1: VALIDATE        Phase 2: HARDEN          Phase 3: GROW           Phase 4: STANDARDIZE
(Prove it works)         (Close the gaps)         (Build community)       (Industry adoption)
─────────────────        ─────────────────        ─────────────────       ─────────────────
OverEager Benchmarks     Native Hook Enforcers    Ecosystem plugins       AAIF formal standard
Demo recordings          CI Scope Backstop        Visual dashboard        Cross-org governance
Dogfooding log           Kramak Lite (Shipped)    Template gallery        Certification program
```

---

## Phase 1: VALIDATE — Prove Kramak Works (Priority: Immediate)

> **Goal:** Generate quantitative evidence and compelling demonstrations that Kramak delivers measurable improvement over unstructured agent usage.

### P1-01: Benchmark Suite & Published Results
- **What:** Run Kramak-governed agents against targeted scope-violation suites: **OverEager-Gen** (Qu et al. 2026) and **SNARE** (2026). Measure unauthorized file modification rate, regressive implementation rate, fix-loop frequency, and token efficiency with/without Kramak.
- **Why:** Generic SWE-bench scores whether an agent fixed a bug, but ignores whether it also modified out-of-scope files or deleted config. OverEager-Gen directly scores the exact failure mode Kramak's `files_targeted` prevents.
- **Output:** `research/benchmarks/` directory with methodology, raw transcripts, and summary report. Add headline metrics to README.md.
- **Assessment Reference:** Risk #3 (Adoption Chicken-and-Egg), Recommendation #2

### P1-02: Compelling Demo Recording
- **What:** Record a real project going from "Start" through the full lifecycle: bootstrap → planning (with Canary Gate) → executing (with scope check catching a violation) → auditing → complete.
- **Why:** One good demo is worth 150KB of spec. The assessment noted the research directory signals "PhD thesis" more than "practical tool."
- **Output:** Video/GIF in `docs/assets/`, linked from README. Ideally across 2+ IDEs (Cursor + Claude Code) to demonstrate IDE-agnosticism.
- **Assessment Reference:** Recommendation #5

### P1-03: Dogfooding Log
- **What:** Use Kramak to govern its own development (the companion CLI, adapter improvements, documentation updates). Document the experience honestly — what worked, what was friction, what the agent ignored.
- **Why:** Eating your own dogfood reveals UX problems that spec-reading can't.
- **Output:** `research/dogfooding/` with session logs, friction points, and spec amendments.
- **Assessment Reference:** Dimension 3 (Agent Compliance — 6/10)

---

## Phase 2: HARDEN — Close the Critical Gaps (Priority: High)

> **Goal:** Address the top-rated risks from the effectiveness assessment, particularly the Compliance Paradox and context budget concerns.

### P2-01: Candidate Mechanical Enforcement (Hooks + CI Backstop)
- **What:** Evaluate evolving enforcement from self-administered prompt compliance to programmatic interception via optional satellite tools:
  - **Local Interception Hooks (Candidate):** Portable shell scripts, open agent plugin hooks, and git pre-commit hooks to intercept file writes and abort out-of-scope edits before commit.
  - **CI Scope Backstop (Candidate):** Optional GitHub Actions status check that verifies PR diffs strictly adhere to declared `files_targeted`, ensuring out-of-scope changes cannot merge even if local hooks are bypassed.
  - **Shared Verification Engine:** Expose scope checks and state validation as reusable logic without forcing a monolithic runtime.
- **Why:** The assessment's #1 critical risk: "agents that need governance are the worst at following governance specs." Programmatic interception removes reliance on voluntary model compliance, but must remain strictly opt-in and host-agnostic.
- **Output:** `scripts/hooks/`, `.github/workflows/verify-scope.yml`, and additions to [`kramak-cli`](https://github.com/bhaskarjha-dev/kramak-cli)
- **Assessment Reference:** Risk #1 (Compliance Paradox), Recommendation #1

### P2-02: Kramak Lite Standalone Specification (Status: ✅ Shipped v2.3.0)
- **What:** A standalone, single-file ~45KB specification with 100% enforceable rule coverage, 6-state FSM, and zero runtime dependencies.
- **Status:** Shipped as an independent repository at [`bhaskarjha-dev/kramak-lite`](https://github.com/bhaskarjha-dev/kramak-lite). Serves as the primary onboarding front door.
- **Output:** Complete v2.3.0 engine with 11 production templates, WAL atomic state writes, and 5-lens strategic vision.

### P2-03: Context Budget Optimization Audit
- **What:** Measure the actual token cost of loading Kramak specs in each phase. Map: ROUTER.md tokens + CORE.md tokens + on-demand module tokens. Identify opportunities to reduce without losing invariant coverage.
- **Why:** The assessment estimated that a planning session loads ~65KB of spec, consuming 20-40% of context before any actual work begins.
- **Targets:**
  - Reduce ROUTER.md to ≤1.5KB (currently 1.9KB — already near-optimal)
  - Reduce planner/CORE.md to ≤25KB (currently 32KB — review for redundancy)
  - Ensure on-demand modules are truly loaded only when triggered
- **Output:** Token budget analysis in `research/context-budget-audit.md`. Spec amendments if warranted.
- **Assessment Reference:** Risk #2 (Context Budget Exhaustion)

### P2-04: Status Dashboard (Human Oversight UI)
- **What:** A single-file HTML page (zero dependencies, inline CSS/JS) that reads `state.json` and renders: current FSM state (with visual state diagram), work item queue, completed/failed items, circuit breaker status, session history, and capability gate results.
- **Why:** Human oversight shouldn't require reading raw JSON. The assessment noted "everything is JSON + Markdown — fine for agent consumption but poor for human oversight."
- **Output:** `tools/dashboard.html` (or delivered via `kramak-cli status --web`)
- **Assessment Reference:** Recommendation #4

---

## Phase 3: GROW — Build Community & Ecosystem (Priority: Medium)

> **Goal:** Transform Kramak from a single-maintainer project into a community-driven open standard.

### P3-01: Template Gallery
- **What:** Curated collection of pre-built `.kramak/` configurations for common project types: Next.js SaaS, Python FastAPI backend, Rust CLI tool, Go microservice, React Native app, Monorepo (Turborepo). Each template includes pre-configured toolchain detection, starter inbox items, and example Work Items.
- **Why:** Reduces "blank page" friction. Developers can pick a template instead of starting from the generic scaffold.
- **Output:** `examples/templates/` directory, linked from README.

### P3-02: Community Adapters & Contributions
- **What:** Establish the community adapter repository for niche IDEs and emerging AI tools. Create contribution guides with clear quality gates.
- **Why:** 7 adapters is good; the long tail of IDE diversity is better served by community.
- **Output:** Active [`kramak-community-adapters`](https://github.com/bhaskarjha-dev/kramak-community-adapters) repo.

### P3-03: Integration with MCP Servers
- **What:** Explore making Kramak's state machine queryable via MCP (Model Context Protocol). An MCP server that exposes `kramak/state`, `kramak/queue`, `kramak/scope-check` as tools would allow agents to interact with Kramak programmatically rather than parsing Markdown.
- **Why:** MCP is Layer 2 in the same AAIF stack. A Kramak MCP server would make the Layer 2 ↔ Layer 3 integration seamless.
- **Output:** `kramak-mcp-server` package (likely in the CLI repo).

### P3-04: Blog Posts & Conference Talks
- **What:** Write and publish:
  1. "Why Your AI Coding Agent Needs a Process Layer" (problem statement)
  2. "Kramak vs. Vibe Coding: A Quantitative Comparison" (benchmark results from P1-01)
  3. "Building a 9-State FSM for AI Agents — Design Decisions" (architectural deep dive)
- **Why:** Thought leadership drives adoption. The research foundation provides rich material.
- **Output:** Published articles, linked from `docs/`.

---

## Phase 4: STANDARDIZE — Industry Adoption (Priority: Future)

> **Goal:** Position Kramak as the industry standard for autonomous agent process control.

### P4-01: AAIF Formal Standard Proposal
- Submit Kramak's FSM, invariants, and schema contracts as a formal AAIF (Agentic AI Foundation) standard for Layer 3 Process Control.

### P4-02: Cross-Organization Governance
- Develop enterprise governance extensions: role-based human gates, compliance audit reports, integration with existing CI/CD pipelines.

### P4-03: Certification Program
- Define a "Kramak Compliant" certification for AI coding tools that implement the core FSM and invariants.

---

## Issue Backlog (From Deep Analysis)

Issues discovered during comprehensive project analysis, tracked here for future resolution:

### Spec Quality Issues

| ID | Priority | Issue | Location |
|---|---|---|---|
| SQ-01 | Low | `RULES-INVENTORY.md` references line numbers from pre-v1.1 monolithic spec that no longer match current file structure | [RULES-INVENTORY.md](.kramak/RULES-INVENTORY.md) |
| SQ-02 | Low | Polish Ceiling Rule is defined in 3 places (planner/CORE.md §4.2, edge-cases.md §4, RULES-INVENTORY rules #9/#69) — consolidate canonical source | [planner/CORE.md](.kramak/planner/CORE.md), [edge-cases.md](.kramak/planner/edge-cases.md) |
| SQ-03 | Low | `RULES-INVENTORY.md` header says "extracted from `.kramak/planner/CORE.md`, `.kramak/ROUTER.md`, and `.kramak/planner/CORE.md`" — duplicated source reference (should include executor/CORE.md) | [RULES-INVENTORY.md](.kramak/RULES-INVENTORY.md) L3 |

### Architecture Considerations

| ID | Priority | Consideration | Context |
|---|---|---|---|
| AC-01 | Medium | 9-state FSM complexity — most projects will never use DISPATCH, MERGE_QUEUE, or parallel worktrees. Consider whether these should be a separate "advanced" profile vs. always-present states. | Assessment Dimension 1 |
| AC-02 | Medium | WAL protocol assumes fine-grained filesystem control (write .tmp → atomic rename → delete .wal) that many AI agents lack. Consider fallback for environments without atomic rename. | Assessment Dimension 1 |
| AC-03 | Medium | Canary Gate CT-1→CT-5 requires abstract reasoning capabilities that may penalize models good at code but weak at constraint puzzles. Consider whether CT scores should weight differently for executor-only sessions. | Assessment Dimension 5 |
| AC-04 | Low | The HUMAN-TASKS.md protocol requires developers to manually edit Markdown to unblock the pipeline — consider whether the CLI or dashboard should provide a simpler UX for this. | Assessment Dimension 4 |
| AC-05 | Medium | License Harmonization: Evaluate unifying root Kramak (MIT) and Kramak Lite (Apache 2.0) on a single license terms to avoid ecosystem friction. | Strategic Review Section 8 |

### Competitive & Positioning

| ID | Priority | Item | Context |
|---|---|---|---|
| CP-01 | High | No published benchmark data comparing Kramak-governed vs. unstructured agent performance | Assessment Risk #3 |
| CP-02 | High | No demo video or visual walkthrough showing the lifecycle in action | Assessment Recommendation #5 |
| CP-03 | Medium | Platform absorption risk — major AI vendors may build process control natively into their agents | Assessment Risk #4 |

---

## Success Metrics

| Metric | Current | Phase 1 Target | Phase 2 Target | Phase 3 Target |
|---|---|---|---|---|
| GitHub Stars | — | 100 | 500 | 2,000 |
| Published Benchmarks | 0 | 1 suite | 2 suites | 3+ suites |
| IDE Adapters | 7 | 7 | 8 | 12+ (with community) |
| Community Contributors | 1 | 3 | 10 | 25+ |
| Demo/Tutorial Content | 0 | 1 video | 3 pieces | 6+ pieces |
| Kramak-CLI Downloads | — | 50/month | 200/month | 1,000/month |

---

## Guiding Principles for Roadmap Execution

1. **Ship lightweight before heavy.** Keep Kramak Lite as the zero-dependency front door. Add mechanical enforcement via Layer 1 hooks and Layer 2 CI backstops before investing in a monolithic binary CLI.
2. **Maintain zero-dependency core.** All new tooling goes in `kramak-cli`, satellite hooks, or separate repos. The core `kramak` repository stays pure Markdown + JSON Schema.
3. **Evidence over opinion.** Every roadmap item traces to a specific finding, risk, or recommendation from the effectiveness assessment.
4. **Ship the smallest useful thing.** Each item should deliver standalone value, not depend on the entire roadmap completing.
5. **Measure what matters.** Track the 5 failure modes Kramak claims to solve using targeted scope-violation benchmarks (OverEager-Gen/SNARE). If scope violations don't decrease measurably, the framework isn't working regardless of how elegant the spec is.
