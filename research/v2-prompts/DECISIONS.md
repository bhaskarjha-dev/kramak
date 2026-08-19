---
registry: decisions
project: Kramak (क्रमक)
version_under_review: 1.0.0
generated: 2026-08-18
source_pipeline: RESEARCH-PIPELINE.md
---

# Kramak — Decision Registry

This is the seed registry produced by Phase 0 planning. It follows the
structure in `templates/DECISIONS.template.md`. As each session in
`RESEARCH-PIPELINE.md` completes, update the matching entry below in
place: move `Status` to `resolved` / `accepted` / `deferred`, add the
`Recommendation`, and move any rejected hypothesis into an `Alternatives
Considered` note rather than deleting it. No entry should still read
`proposed` when Phase 0 closes — see the Phase 0 Exit Gate in
`RESEARCH-PIPELINE.md` §5.

## Registry Summary

| ID | Title | Door | Route | Status | Session(s) |
|---|---|---|---|---|---|
| D-001 | FSA State Topology & Crash Recovery Model | One-way | Deep Research | proposed | T1-03 |
| D-002 | Planner/Executor Role Separation & Capability-Based Gating | One-way | Deep Research | proposed | T1-04 |
| D-003 | Self-Improvement Governance Mechanism Adequacy | Two-way | Fast Spike | proposed | T1-05 |
| D-004 | State/Schema Versioning Strategy | One-way | Confirm | proposed | T1-06 |
| D-005 | Specification Complexity & Progressive Disclosure | Two-way | Fast Spike | proposed | T1-06 |
| D-006 | Pure-Methodology Positioning vs. Optional Tooling Layer | Two-way | Fast Spike | proposed | T1-06 |
| D-007 | Adapter Portfolio & IDE Ecosystem Investment Strategy | Two-way | Confirm (via T1-01) | proposed | T1-01 |
| D-008 | Naming & Positioning Legibility | One-way | Confirm (via T1-01) | proposed | T1-01 |
| D-009 | Design Parameter Validation | Two-way | Fast Spike | proposed | T1-05, T1-06 |
| D-010 | Multi-Agent / Parallel Orchestration Evolution | Two-way | Fast Spike (watch-item) | proposed | T1-04 |

---

## D-001: FSA State Topology & Crash Recovery Model

- **Status:** proposed
- **Door Type:** One-way — `state.json`'s shape and the FSA topology are
  a de facto public contract once adapters and adopters depend on them.
- **Route:** Deep Research (shared 2-session budget with D-002; see
  RESEARCH-PIPELINE.md §3.1)
- **Informing Session(s):** T1-03 (primary), T1-01 & T1-02 (background)
- **Competing Hypotheses:**
  - **H1:** The current 5-state topology (BOOTSTRAP → PLANNING → EXECUTING
    → AUDITING, with WAITING as a side-state) is correctly scoped and
    needs no structural change.
  - **H2:** WAITING is miscast as a peer state — it should be a sub-state
    or flag on whichever of the other three triggered it, not a parallel
    fifth state.
  - **H3:** The topology is under-specified for crash recovery — a
    distinct `RECONCILING` state (rather than folding State Reconciliation
    into a transition-time check) would make recovery behavior auditable
    and independently testable.
- **Review Trigger:** Re-open if (a) State Reconciliation produces
  incorrect recovery in real usage, (b) a competing framework's
  differently-shaped state machine demonstrates measurably better
  crash-recovery outcomes, or (c) adoption data shows users repeatedly
  stuck in WAITING in ways suggesting it needs first-class-state treatment.

## D-002: Planner/Executor Role Separation & Capability-Based Gating

- **Status:** proposed
- **Door Type:** One-way — the role contract is what the "high-reasoning
  vs. fast/precise" model split and every adapter's invocation pattern
  assume.
- **Route:** Deep Research (shared 2-session budget with D-001)
- **Informing Session(s):** T1-04 (primary), T1-02 (background)
- **Competing Hypotheses:**
  - **H1:** Splitting architect/executor roles across model capability
    tiers measurably improves spec quality and execution reliability
    versus a single-agent-does-everything loop.
  - **H2:** The split adds coordination overhead (context hand-off loss
    between sessions) that a sufficiently capable single agent, well
    prompted, would avoid — it's solving a today's-models problem that
    capability growth will erase.
  - **H3:** The right framing isn't "2 roles" but "N roles gated by
    capability, not identity" — the current binary split is a
    simplification that should generalize.
- **Review Trigger:** Re-open if planner-tier and executor-tier model
  capability converges enough that the split's coordination overhead no
  longer justifies its accuracy benefit, or if T1-04 finds no measurable
  quality difference in the literature or in practice.

## D-003: Self-Improvement Governance Mechanism Adequacy

- **Status:** proposed
- **Door Type:** Two-way — the checklist itself is a freely revisable
  markdown artifact with no schema/adapter dependency.
- **Route:** Fast Spike
- **Informing Session(s):** T1-05
- **Competing Hypotheses:**
  - **H1:** The 5-point Anti-Bias Guard checklist, combined with the
    Circuit Breaker, is a proportionate safeguard for a file-based
    methodology with no autonomous deployment authority.
  - **H2:** A 5-point checklist is too thin for genuine recursive
    self-improvement risk — needs a staged rollout, a human-approval gate,
    or a stronger audit trail before a self-proposed pipeline change takes
    effect.
- **Review Trigger:** Re-open if a real self-improvement cycle produces a
  change a human reviewer judges the checklist should have caught and
  didn't, or if T1-05 surfaces an established stronger pattern from the
  safety literature.

## D-004: State/Schema Versioning Strategy

- **Status:** proposed
- **Door Type:** One-way — once external tooling parses `state.json`
  directly, its shape is a contract.
- **Route:** Confirm (bundled into T1-06, part 2 of 4)
- **Informing Session(s):** T1-06
- **Competing Hypotheses:**
  - **H1:** A simple schema `version` field plus documented migration
    notes — standard config-versioning practice — is sufficient given
    Kramak's current adoption scale.
  - **H2:** Given the "standard" ambition, Kramak needs a formal
    deprecation-window policy and migration tooling (even if optional)
    before wider adoption, or early adopters get burned by a breaking
    v1.x → v2 change.
- **Review Trigger:** Re-open before any release that changes a required
  field in `state.json`'s schema, or once non-Kramak-authored tooling is
  known to parse `state.json` directly.

## D-005: Specification Complexity & Progressive Disclosure Strategy

- **Status:** proposed
- **Door Type:** Two-way — content/length is revisable without touching
  the FSA/role contract established in D-001/D-002.
- **Route:** Fast Spike (bundled into T1-06, part 1 of 4)
- **Informing Session(s):** T1-06
- **Competing Hypotheses:**
  - **H1:** The 41.5 KB / 17.7 KB spec size is appropriate for what it
    does — complexity critiques compare against RIPER-5's much narrower
    scope (a single-IDE prompt file), not an apples-to-apples competitor.
  - **H2:** The spec should restructure into a small mandatory core plus
    optional/linked detail sections (progressive disclosure), so an agent
    loads only what a given phase needs.
- **Review Trigger:** Re-open if onboarding feedback consistently cites
  spec size as an abandonment reason, or a competitor demonstrates
  equivalent capability at meaningfully lower spec footprint.

## D-006: Pure-Methodology Positioning vs. Optional Tooling Layer

- **Status:** proposed
- **Door Type:** Two-way — an *optional*, non-mandatory addition doesn't
  reverse the "zero mandatory dependencies" commitment.
- **Route:** Fast Spike (bundled into T1-06, part 3 of 4)
- **Informing Session(s):** T1-06
- **Competing Hypotheses:**
  - **H1:** Zero mandatory runtime dependencies should stay absolute — no
    CLI, ever — because the "pure files" claim *is* the differentiation.
  - **H2:** An optional (never mandatory) validator/CLI, in the mold of
    what GitHub Spec Kit ships, would materially improve `state.json`
    integrity and onboarding without compromising the zero-mandatory-
    dependency commitment.
- **Review Trigger:** Re-open if `validate.js`'s manual-invocation model
  is shown to catch state corruption too late in practice, or if T1-06's
  precedent research finds optional tooling consistently helps adoption
  without diluting positioning.

## D-007: Adapter Portfolio & IDE Ecosystem Investment Strategy

- **Status:** proposed
- **Door Type:** Two-way — adapters are designed to be independently
  addable/removable by Kramak's own architecture.
- **Route:** Confirm — resolved directly from T1-01's findings, no
  dedicated session (see RESEARCH-PIPELINE.md §3.5)
- **Informing Session(s):** T1-01
- **Competing Hypotheses:**
  - **H1:** 8 adapters is the right breadth — covers the dominant tools
    without diluting maintenance effort, and the core-spec-plus-adapter
    architecture keeps new adapters cheap to add later.
  - **H2:** Given how fast ecosystems evolve, and that Spec Kit already
    supports 30+ integrations, Kramak should either invest in far fewer,
    deeper integrations or adopt a lighter-weight, community-contributable
    adapter format so maintenance doesn't fall solely on the founder.
- **Review Trigger:** Re-open if any of the 8 adapters goes 2+ major IDE
  versions without an update, or if community adapter contributions
  materialize and change the maintenance-burden calculus.

## D-008: Naming & Positioning Legibility

- **Status:** proposed
- **Door Type:** One-way — branding is costly, not impossible, to reverse
  post-launch.
- **Route:** Confirm — resolved directly from T1-01's findings, no
  dedicated session (see RESEARCH-PIPELINE.md §3.5)
- **Informing Session(s):** T1-01
- **Competing Hypotheses:**
  - **H1:** "Kramak" is fine — Sanskrit-rooted technical names have real
    precedent in successful developer tools, and the name signals
    intentionality rather than hurting adoption.
  - **H2:** The name and/or tagline creates a legibility tax for the
    target audience (English-speaking developers evaluating many tools
    quickly) that measurably costs adoption, independent of the
    methodology's merit.
- **Review Trigger:** Re-open if adoption metrics (stars, forks,
  discussion mentions) significantly underperform methodology-quality
  signals (e.g. positive hands-on reviews) in a way attributable to
  discovery/legibility rather than substance.

## D-009: Design Parameter Validation

- **Status:** proposed
- **Door Type:** Two-way — internal tooling parameters, not user-facing
  contracts.
- **Route:** Fast Spike (split: Capability Gate via T1-05; remainder via
  T1-06, part 4 of 4)
- **Informing Session(s):** T1-05 (Capability Gate thresholds), T1-06
  (Failure Taxonomy, Polish Ceiling Rule, WI-cap re-verification)
- **Competing Hypotheses:**
  - **H1:** The Failure Taxonomy's 6 categories, the Polish Ceiling Rule,
    and the Capability Gate thresholds are reasonable engineering
    judgment calls that don't need external validation.
  - **H2:** At least one parameter is miscalibrated in a way that shows
    up under scrutiny — e.g. the Failure Taxonomy missing a documented
    common failure mode, or the Capability Gate threshold being gameable.
- **Review Trigger:** Re-open if real Auditing-phase data shows failures
  that don't map cleanly to any of the 6 Failure Taxonomy categories.

## D-010: Multi-Agent / Parallel Orchestration Evolution

- **Status:** proposed
- **Door Type:** Two-way — a roadmap/research direction, not an
  immediate commitment.
- **Route:** Fast Spike (watch-item; bundled into T1-04)
- **Informing Session(s):** T1-04
- **Competing Hypotheses:**
  - **H1:** Single-planner/single-executor-per-phase is a deliberate
    simplicity feature, not a limitation — multi-agent coordination
    overhead and failure modes (e.g. conflicting concurrent edits)
    outweigh throughput gains for Kramak's target user.
  - **H2:** 2026 tooling has moved the ecosystem toward native multi-agent
    support (subagents, parallel execution), and Kramak's single-threaded
    model will look dated within a year if it doesn't at least define an
    extension point for parallel EXECUTING sessions.
- **Review Trigger:** Re-open once 2+ of Kramak's 8 target IDEs/agents
  ship multi-agent orchestration as a *default* (not opt-in/experimental)
  capability. This is a forward-looking watch-item feeding D-001/D-002,
  not an immediate blocking decision.
