---
title: "Kramak — Decision Registry"
generated: 2026-08-18
companion_files: ["RESEARCH-PIPELINE.md", "PROMPT-LIBRARY.md"]
---

# Kramak — Decision Registry

Seeded from the 10 open questions in the project vision. Each entry
starts at `status: proposed`. Update status to `under-review` once its
informing sessions begin, and to `confirmed` once it clears the
applicable Phase 0 gate (Track A for two-way doors, Track B for one-way
doors — see `RESEARCH-PIPELINE.md` §5). If a decision is still `proposed`
or `under-review` when T2-16 runs, that's a gate failure to report, not
something to force a verdict on.

Legend: 🔒 one-way door (irreversible / high switching cost) · 🔁 two-way
door (reversible / low switching cost).

---

## D-001 — Core FSA State Model & Planner/Executor Role Separation 🔒

- **Status:** proposed
- **Door type:** one-way — `state.json` + the FSA shape are the
  interoperability contract that all 8 adapters and any external adopter
  depend on; changing it after adoption breaks every dependent repo.
- **Competing hypotheses:**
  - **H1:** The current 5-state FSA (BOOTSTRAP → PLANNING → EXECUTING →
    AUDITING, with WAITING) and strict planner/executor split is optimal
    for reliability and auditability — confirm as-is.
  - **H2:** A simpler continuous single-agent loop with internal
    mode-switching achieves comparable reliability with less handoff
    overhead — the role split is unnecessary complexity.
  - **H3:** The split is directionally right but under-specified — it
    should expand into more granular states (e.g. a separate REVIEW
    state) to reduce ambiguity at the current handoff points.
- **Informing sessions:** T2-04, T2-02, T2-14, T2-16
- **Review trigger:** credible evidence emerges (via T2-04 or later) that
  single-agent continuous loops match or beat split-role reliability in
  comparable systems, or repeated post-launch reports of planner/executor
  handoff friction accumulate.

---

## D-002 — State Persistence & Schema Versioning Policy 🔒

- **Status:** proposed
- **Door type:** one-way — `state.json`'s schema is a wire-format
  contract; unannounced breaking changes strand existing adopters.
- **Competing hypotheses:**
  - **H1:** The current `state.json` + JSON Schema approach is sufficient
    as-is and only needs a formal semver + migration-script policy layered
    on top.
  - **H2:** The schema needs an explicit additive-only evolution guarantee
    written into the spec now, before any external adopter accumulates
    state that a future breaking change could strand.
- **Informing sessions:** T2-04, T2-14, T2-16 *(evaluated as a corollary
  of the T2-04 state-machine verdict — no dedicated session; escalate to
  a standalone T2-04-A spike if T2-04 surfaces schema-specific findings
  that need deeper treatment)*
- **Review trigger:** the first breaking-change proposal to `state.json`,
  or the first external-adopter report of migration pain.

---

## D-003 — Distribution Model: Pure Files vs. Optional CLI/Runtime 🔒

- **Status:** proposed
- **Door type:** one-way (practical) — "zero runtime dependencies" is
  core brand equity; walking it back after a community forms around that
  claim carries real reputational cost even if a CLI is technically
  optional.
- **Competing hypotheses:**
  - **H1:** Maintain strict zero-dependency purity — no CLI, ever, at any
    optionality level.
  - **H2:** Ship a thin, strictly optional, non-blocking CLI/validator
    (e.g. `npx`-invoked) that enhances but never gates core file-based
    usage.
  - **H3:** The current pure-files stance is actively suppressing
    adoption relative to what a light optional tool would unlock.
- **Informing sessions:** T2-10, T2-03, T2-15, T2-16
- **Review trigger:** recurring user friction reports about manual
  `state.json` validation, or a competitor's optional-tooling approach
  visibly outcompeting Kramak on adoption.

---

## D-004 — Model-Agnostic Capability Gate (vs. Model-Name Checking) 🔒

- **Status:** proposed
- **Door type:** one-way — the model-agnostic value proposition is
  foundational; if self-assessment turns out unreliable, retrofitting an
  external capability proxy after ecosystem adoption is a significant
  rework, not a config change.
- **Competing hypotheses:**
  - **H1:** Capability self-assessment via structured checklist is
    reliable enough as the sole gating mechanism.
  - **H2:** LLM self-assessment of own capability is fundamentally
    unreliable (per calibration research) and needs an external,
    deterministic proxy — e.g. a small canary task — instead of pure
    self-report.
  - **H3:** A hybrid — self-assessment plus a lightweight canary
    verification step — captures most of the model-agnostic benefit while
    mitigating the calibration risk.
- **Informing sessions:** T2-09, T2-14, T2-16
- **Review trigger:** a documented case of a model self-rating "capable"
  and then failing the gated task, or new research materially revising
  the picture on LLM self-evaluation calibration.

---

## D-005 — Adapter Interface Contract & Portfolio Breadth 🔁

- **Status:** proposed
- **Door type:** two-way — adapters are additive/removable without
  breaking the core spec contract; portfolio composition can change
  release to release.
- **Competing hypotheses:**
  - **H1:** Maintain all 8 adapters (Antigravity, Cursor, Claude Code,
    Windsurf, Cline, Copilot, Aider, Generic) at current depth.
  - **H2:** Consolidate to the 3–4 highest-usage-share tools with deeper
    integration; deprecate the rest to community-maintained status.
  - **H3:** Formalize a generic adapter spec/SDK so third parties can
    self-maintain adapters, decoupling portfolio breadth from
    solo-maintainer bandwidth entirely.
- **Informing sessions:** T2-11, T2-01, T2-15, T2-16
- **Review trigger:** any adapter's underlying tool ships a breaking
  config/interface change, or usage signals show materially low adoption
  for a given adapter.

---

## D-006 — Self-Improvement Governance Model (Anti-Bias Guard) 🔒

- **Status:** proposed
- **Door type:** one-way — safety/trust-critical; retrofitting governance
  after a bad self-modification has already shipped is a one-way
  reputational door, not just a spec edit.
- **Competing hypotheses:**
  - **H1:** The 5-point checklist is sufficient given Kramak's scope
    (bounded, human-supervised, not autonomous recursive
    self-improvement).
  - **H2:** The checklist needs a mandatory cooling-off / external-review
    step before any pipeline self-modification ships.
  - **H3:** Governance should add versioned rollback plus automated
    regression testing against prior audit logs, not just a pre-change
    checklist.
- **Informing sessions:** T2-06, T2-14, T2-16
- **Review trigger:** any incident where a self-improvement change
  introduced a regression that shipped before detection.

---

## D-007 — Specification Complexity & Modularization 🔁

- **Status:** proposed
- **Door type:** two-way — the spec can be refactored (e.g. core +
  optional modules) without breaking the underlying FSA/state contract.
- **Competing hypotheses:**
  - **H1:** The current monolithic PLANNER.md (41.5KB) / EXECUTOR.md
    (17.7KB) is appropriately thorough for the reliability it buys —
    confirm as-is.
  - **H2:** The spec should split into a minimal core (~10–15KB) plus
    optional extension modules loaded on demand.
  - **H3:** Complexity isn't the actual adoption blocker — onboarding
    path and lack of worked examples are, independent of raw KB size.
- **Informing sessions:** T2-12, T2-03, T2-15, T2-16
- **Review trigger:** post-launch adoption signals (issues/discussion
  citing "too complex"), or direct user feedback crossing a noticeable
  threshold.

---

## D-008 — Naming & Positioning Strategy 🔒

- **Status:** proposed
- **Door type:** one-way (practical) — technically renamable, but brand
  equity, SEO, and backlinks accumulate quickly once external references
  exist, making a later rename costly in practice.
- **Competing hypotheses:**
  - **H1:** "Kramak" + Sanskrit-rooted branding + "the missing SDLC for AI
    agents" tagline is correct and sufficiently differentiating.
  - **H2:** The name/tagline creates real discoverability friction for
    the target English-speaking developer audience; keep the name, fix
    the framing.
  - **H3:** Positioning should shift from "SDLC" framing (competes for
    Scrum/Kanban mindshare) to "agent orchestration methodology" framing
    (competes more directly with RIPER-5/Spec Kit mindshare).
- **Informing sessions:** T2-13, T2-01, T2-15, T2-16
- **Review trigger:** low organic discovery/search-traffic signals, or
  repeated evidence of user confusion about what category Kramak belongs
  to.

---

## D-009 — Multi-Agent Orchestration Extension 🔁

- **Status:** proposed
- **Door type:** two-way — can be introduced as an additive, opt-in
  extension layer without breaking single-agent-per-phase mode.
- **Competing hypotheses:**
  - **H1:** Keep single-planner/single-executor permanently — simplicity
    is a feature, not a limitation; multi-agent stays out of scope.
  - **H2:** Add an optional "parallel execution" mode/state that fans
    independent Work Items out to multiple concurrent executor sessions.
  - **H3:** Multi-agent support is premature — revisit once native
    tool-level parallelism (Antigravity subagents, etc.) stabilizes
    further.
- **Informing sessions:** T2-05, T2-02, T2-15, T2-16
- **Review trigger:** two or more major AI coding tools ship stable,
  widely-adopted native multi-agent parallelism primitives.

---

## D-010 — Grounding & Scope-Enforcement Mechanism Design 🔒

- **Status:** proposed
- **Door type:** one-way — these are the primary anti-hallucination /
  anti-scope-creep guarantees the whole methodology's trust claim rests
  on; weakening or replacing them after adoption is a credibility risk.
- **Competing hypotheses:**
  - **H1:** Grep-verified Grounded Verification plus `git diff`-based Hard
    Scope Check are sufficient deterministic guardrails as-is.
  - **H2:** Higher-risk Work Item types need additional static-analysis
    or test-execution grounding beyond grep/diff checks alone.
- **Informing sessions:** T2-07, T2-14, T2-16
- **Review trigger:** a documented case of a grounded, scope-checked Work
  Item still producing a hallucinated or scope-violating change.

---

## D-011 — Failure Taxonomy, Circuit Breaker & Continuity Parameters 🔁

- **Status:** proposed
- **Door type:** two-way — thresholds and category definitions are
  internal, tunable parameters that don't break the core FSA contract if
  recalibrated.
- **Competing hypotheses:**
  - **H1:** The current 6-category Failure Taxonomy, circuit-breaker
    thresholds, 2-hour Work Item cap, and Polish Ceiling Rule are
    well-calibrated as-is.
  - **H2:** Thresholds need empirical recalibration — the "2-hour" cap in
    particular may not map cleanly onto METR's actual reported
    time-horizon figures.
  - **H3:** The taxonomy's categories overlap or are incomplete relative
    to documented failure modes in the wider literature.
- **Informing sessions:** T2-08, T2-02, T2-14, T2-16
- **Review trigger:** repeated circuit-breaker false-positive/negative
  reports post-launch, or new METR/task-horizon research revising the
  underlying time-horizon figures.

---

## Registry Summary

| ID | Decision | Door | Status | Sessions |
|---|---|:-:|---|---|
| D-001 | State machine & role separation | 🔒 | proposed | T2-04, T2-02, T2-14, T2-16 |
| D-002 | State persistence & schema versioning | 🔒 | proposed | T2-04, T2-14, T2-16 |
| D-003 | Distribution model (files vs. CLI) | 🔒 | proposed | T2-10, T2-03, T2-15, T2-16 |
| D-004 | Capability gate / self-assessment | 🔒 | proposed | T2-09, T2-14, T2-16 |
| D-005 | Adapter interface & portfolio breadth | 🔁 | proposed | T2-11, T2-01, T2-15, T2-16 |
| D-006 | Self-improvement governance | 🔒 | proposed | T2-06, T2-14, T2-16 |
| D-007 | Spec complexity & modularization | 🔁 | proposed | T2-12, T2-03, T2-15, T2-16 |
| D-008 | Naming & positioning | 🔒 | proposed | T2-13, T2-01, T2-15, T2-16 |
| D-009 | Multi-agent orchestration extension | 🔁 | proposed | T2-05, T2-02, T2-15, T2-16 |
| D-010 | Grounding & scope-enforcement mechanisms | 🔒 | proposed | T2-07, T2-14, T2-16 |
| D-011 | Failure taxonomy & continuity parameters | 🔁 | proposed | T2-08, T2-02, T2-14, T2-16 |

**7 one-way doors, 4 two-way doors.** Per `RESEARCH-PIPELINE.md` §5, the
7 one-way doors must each clear Track B before being claimed as settled
architecture; the 4 two-way doors only need Track A.
