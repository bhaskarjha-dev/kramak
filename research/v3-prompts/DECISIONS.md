# Kramak — Decision Registry (DECISIONS.md)

Companion to `RESEARCH-PIPELINE.md` — see that document for full session prompts, complexity scoring, and DAG structure behind these entries. This registry is the live source of truth for decision status as research completes; update it in place as each session finishes (see "How to Execute This Pipeline" in the companion document).

**Status legend:** `proposed` (awaiting research) → `decided` (research complete, verdict adopted) | `decided — revisit at trigger` (adopted with a named re-review condition) | `deferred` (explicitly punted, reason stated) | `rejected` (researched and explicitly not adopted)

---

## Fixed Constraints (Not Subject to Re-Litigation)

Stated, decided elements from the project vision — not open questions. No session in this pipeline should reopen them. Listed here so they're not mistaken for pending decisions.

| Constraint | Note |
|---|---|
| Project name: **Kramak** (क्रमक) | Sanskrit naming is a standing personal convention across the maintainer's projects, not project-specific — not open for reconsideration. D-001 addresses tagline/framing only. |
| Zero mandatory runtime dependencies (core spec) | Core integrity claim. D-006 may explore an *optional* companion, never a required one. |
| Model-agnostic via capability self-assessment | No model-name checks, ever. D-004 may refine the mechanism, not the principle. |
| IDE-agnostic core + adapter-translation pattern | D-007 addresses adapter *portfolio breadth*, not whether the adapter pattern itself is used. |
| MIT license | Fixed. |
| v1.0.0 already shipped (August 2026) | Historical fact. Design choices within it remain open to revision for v1.1+. |

---

## Proposed Decisions

### D-001 — Category Positioning & Adoption Dynamics

**Status:** proposed
**Door type:** One-way (irreversible) — positioning becomes costly to reverse once comparison docs, README framing, and any community perception solidify around it.
**Validates claim:** the "Layer 3: Process" gap premise, and the spec-complexity-vs-adoption tradeoff (project vision, uncertainty items #2 and #4).

**Question:** Is the "Layer 3: Process" gap (alongside AGENTS.md for Context and MCP for Protocol) real, and does Kramak's ~60 KB, 48-file specification surface help or hurt adoption relative to lightweight comparators like RIPER-5?

**Competing hypotheses:**
- **H1 — Gap is real, lean in.** The process layer is genuinely unfilled; Kramak should double down on "the missing SDLC for AI agents" framing and treat comprehensiveness as a credibility signal, not a liability.
- **H2 — Gap is illusory, reposition.** IDE-native orchestration and ad hoc convention already serve this need well enough; Kramak should reposition around a narrower, more defensible wedge (e.g. cross-tool state portability, crash-resistant execution) rather than category ownership.
- **H3 — Gap partially exists, differentiate on mechanism, not category.** Adjacent efforts (Spec Kit, BMAD-style methods) are already encroaching; Kramak should compete on specific, provably-better mechanisms rather than claiming an empty category.

**Informing sessions:** T2-01 (landscape, required input) → T2-05 (decision) → T2-14 (blueprint)
**Review trigger:** A competing framework achieves standardization-level adoption (referenced alongside AGENTS.md/MCP) before Kramak does; or direct user feedback shows confusion about what problem Kramak solves.

---

### D-002 — Core Execution Architecture: State Machine, Role Separation & Multi-Agent Evolution

**Status:** proposed
**Door type:** One-way (irreversible) — the highest-stakes decision in this pipeline. The FSM, role split, and any multi-agent evolution ripple into every spec file, the `state.json` schema, and all eight adapters.
**Validates claim:** the state-machine design itself, and the single-planner/single-executor model (project vision, uncertainty items #5 and #8).

**Question:** Is the five-state BOOTSTRAP→PLANNING→EXECUTING→AUDITING(/WAITING) loop with a hard planner/executor role split the right abstraction, and should Kramak evolve toward native multi-agent execution given where Antigravity, Claude Code, and peers are heading?

**Competing hypotheses:**
- **H1 — Hold the design.** Current state count and role separation are correctly scoped; evolve incrementally, not structurally.
- **H2 — Collapse the split.** Planner/executor separation introduces coordination overhead unsupported by current multi-agent SWE research; simplify toward a less rigidly role-divided loop.
- **H3 — Go multi-agent-native.** Single-agent-per-phase is already behind where 2026 tooling is heading; define a multi-agent-native execution mode as the primary path, with single-agent as a fallback.

**Informing sessions:** T2-02 + T2-04 (landscape, required inputs) → T2-06 (decision) → T2-12 (blueprint)
**Review trigger:** A majority of the eight target tools ship stable native multi-agent parallelism as default UX; or real-world Kramak usage data shows planner/executor handoff is a disproportionate failure point.

---

### D-003 — Execution Integrity & Recovery Mechanisms

**Status:** proposed
**Door type:** One-way (irreversible) — these are Kramak's correctness guarantees; misdesigning them undermines every other feature's trustworthiness.
**Validates claim:** innovations #1 (Grounded Verification), #6 (Hard Scope Check), #7 (State Reconciliation), #8 (Circuit Breaker), plus the METR-derived duration cap and Polish Ceiling Rule (project vision, uncertainty item #10).

**Question:** Do Grounded Verification, Hard Scope Check, Circuit Breaker, State Reconciliation, the "2-hour work item" cap, and the Polish Ceiling Rule hold up against current agent-failure-mode research — including a direct check of the METR sourcing behind the duration cap?

**Competing hypotheses:**
- **H1 — Sufficient as designed.** All six mechanisms are well-evidenced and adequately close the failure modes they target.
- **H2 — Address symptoms, miss root causes.** Current agent-reliability research documents failure modes (e.g. silent tool-call failures, partial-write corruption) these six mechanisms don't cover; additional or different guardrails are needed.
- **H3 — Some mechanisms are under-evidenced extrapolations.** Specifically, the METR-derived duration cap may be a looser fit for this exact use case than presented.

**Informing sessions:** T2-03 (landscape, required input) → T2-07 (decision) → T2-12 (blueprint)
**Review trigger:** Real-world usage, once observable, shows scope violations, infinite loops, or state corruption these mechanisms fail to catch; or new agent-reliability research materially changes the picture.

---

### D-004 — Planning Cognition & Calibration Mechanisms

**Status:** proposed
**Door type:** One-way (irreversible) — governs how every Work Item gets specified; changing this reshapes `PLANNER.md`'s core logic.
**Validates claim:** innovations #3 (Perspective-Based Planning), #4 (Spec Detail Scaling), #5 (Failure Taxonomy), #12 (Capability Gate Check) (project vision, uncertainty items #1 and #10).

**Question:** Do Perspective-Based Planning (PERCEIVE→REASON→DECIDE), Spec Detail Scaling (🔴 Guided / 🟡 Directed / 🟢 Outcome), the six-category Failure Taxonomy, and Capability Gate Check (self-assessed, not model-name-based) align with current research on planning cognition, task-detail calibration, and capability self-assessment?

**Competing hypotheses:**
- **H1 — Well-grounded.** All four mechanisms align with or are supported by current prompting/planning research, including the "no personas" principle.
- **H2 — Intuition-derived, untested.** These reinvent, or miss, established patterns from the literature; 24 iterations of personal experience is not the same as validation.
- **H3 — Partially grounded, needs recalibration.** The general approach is sound but specific thresholds (e.g. Capability Gate Check criteria) need adjustment as model capability curves shift.

**Informing sessions:** T2-08 (decision, self-contained — no required landscape input) → T2-13 (blueprint)
**Review trigger:** A frontier model release shifts where the 🔴/🟡/🟢 boundary should sit; or user data shows frequent detail-level miscalibration.

---

### D-005 — Governance & Human-Interface Mechanisms

**Status:** proposed
**Door type:** One-way (irreversible) — the Anti-Bias Guard specifically governs self-modification; this is the pipeline's most safety-relevant decision.
**Validates claim:** innovations #2 (Anti-Bias Guard), #9 (INBOX System), #10 (Human Task Protocol), #11 (Auto-Bootstrap) (project vision, uncertainty item #9).

**Question:** Is a five-point checklist a robust enough control on pipeline self-modification, and are INBOX System, Human Task Protocol, and Auto-Bootstrap well-designed for their respective roles?

**Competing hypotheses:**
- **H1 — Adequate at this risk scale.** A file-based methodology edited via normal git review is a fundamentally lower-stakes context than unsupervised production self-modification; a checklist is proportionate.
- **H2 — Insufficient, needs structural reinforcement.** Self-modification/safety research shows checklist-based self-assessment has known reliability gaps; Kramak needs a structural backstop — e.g. an explicit mandatory human-review gate — rather than relying on the checklist alone.
- **H3 — Anti-Bias Guard is fine; the other three need more scrutiny than assumed.** Priorities may be inverted from what the maintainer currently expects.

**Informing sessions:** T2-09 (decision, self-contained — no required landscape input) → T2-13 (blueprint)
**Review trigger:** Any observed incident or near-miss of runaway/unintended self-modification; or before Kramak ever removes the human git-review step from its own self-modification path.

---

### D-006 — Pure-Methodology Identity vs. Optional CLI/Runtime

**Status:** proposed
**Door type:** One-way (irreversible) — adding tooling, even optional, changes the "zero dependency" identity claim and creates a maintenance surface that's hard to walk back once adopted.
**Validates claim:** the pure-methodology positioning tradeoff (project vision, uncertainty item #3).

**Question:** Should Kramak remain strictly pure-file, or add an optional (never mandatory) CLI/runtime for state validation, scaffolding, or bootstrap automation — building on what `init.sh`/`init.ps1` and `validate.js` already do?

**Competing hypotheses:**
- **H1 — Stay pure.** Any tooling gap is better solved by documentation and discipline than by code; purity is the differentiator worth protecting.
- **H2 — Add optional bundled tooling.** A companion CLI reduces adoption friction without compromising the claim, since the spec remains fully usable without it.
- **H3 — Optional tooling, separate repository.** Spin any CLI into a distinct project entirely, structurally preserving the core repo's zero-dependency claim regardless of what the companion does.

**Informing sessions:** T2-01 + T2-04 (landscape, required inputs) → T2-10 (decision) → T2-14 (blueprint)
**Review trigger:** User feedback shows `validate.js`-adjacent manual friction is a top adoption blocker; or a competing framework's optional tooling demonstrably outcompetes Kramak on ease-of-adoption without sacrificing a portability claim.

---

### D-007 — Adapter Portfolio Strategy

**Status:** proposed
**Door type:** Two-way (reversible) — adapters can be added, deprecated, or handed to community maintenance without touching the core spec.
**Validates claim:** the adapter-strategy tradeoff (project vision, uncertainty item #6).

**Question:** Should Kramak maintain all eight adapters (Antigravity, Cursor, Claude Code, Windsurf, Cline, Copilot, Aider, Generic) as-is, consolidate to a smaller deeply-maintained set, or open a lighter-weight community-contribution path for the long tail?

**Competing hypotheses:**
- **H1 — Keep all eight.** Breadth is a distribution advantage worth the maintenance cost.
- **H2 — Consolidate.** Focus deep maintenance on the 3–4 highest-momentum tools plus Generic; deprecate the rest.
- **H3 — Hybrid, community path.** Keep breadth but shift long-tail adapter maintenance to a lighter-weight community-contribution model.

**Informing sessions:** T2-04 (landscape, required input) → T2-11 (decision, fast spike) → T2-14 (blueprint)
**Review trigger:** Any major version bump in one of the eight target tools; also revisit on a recurring cadence (e.g. every two quarters) rather than only reactively, given how fast this ecosystem moves.

---

## Coverage Check

All twelve claimed innovations from the project vision map onto exactly one decision each, with no gaps and no overlaps:

| Innovation | Decision |
|---|---|
| #1 Grounded Verification | D-003 |
| #2 Anti-Bias Guard | D-005 |
| #3 Perspective-Based Planning | D-004 |
| #4 Spec Detail Scaling | D-004 |
| #5 Failure Taxonomy | D-004 |
| #6 Hard Scope Check | D-003 |
| #7 State Reconciliation | D-003 |
| #8 Circuit Breaker | D-003 |
| #9 INBOX System | D-005 |
| #10 Human Task Protocol | D-005 |
| #11 Auto-Bootstrap | D-005 |
| #12 Capability Gate Check | D-004 |

All ten numbered uncertainties from the project vision map onto at least one decision:

| Uncertainty | Decision(s) |
|---|---|
| #1 Empirical validation of the 12 innovations | D-003, D-004, D-005 |
| #2 Spec complexity vs. adoption | D-001 |
| #3 Pure methodology vs. optional CLI | D-006 |
| #4 Is the competitive gap real | D-001 |
| #5 State machine design | D-002 |
| #6 Adapter strategy | D-007 |
| #7 Naming and positioning | D-001 (tagline/framing only — name itself is fixed, see Fixed Constraints) |
| #8 Multi-agent orchestration | D-002 |
| #9 Self-improvement governance | D-005 |
| #10 Evidence for specific design choices | D-003, D-004 |

## Notes on Using This Registry

- Update a `Status` line the moment its informing session(s) complete — don't batch updates until the end of the pipeline; a stale registry is worse than an incomplete one.
- If a session's verdict doesn't cleanly match H1/H2/H3, add the actual verdict as a new line rather than forcing it into the closest listed hypothesis — the hypotheses are starting scaffolding, not a multiple-choice constraint on the answer.
- `rejected` is a legitimate, useful outcome. If research shows a mechanism should be removed rather than kept or strengthened, record that plainly — a decision registry that only ever confirms existing designs isn't doing its job.
