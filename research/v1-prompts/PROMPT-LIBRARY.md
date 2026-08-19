---
title: "Kramak — Research Prompt Library"
generated: 2026-08-18
companion_files: ["RESEARCH-PIPELINE.md", "DECISIONS.md"]
usage: "Copy one session's prompt in full into a frontier model with web search / deep research enabled. Save the output to sessions/T2-##-[slug].md exactly as named in the session header."
---

# Kramak — Research Prompt Library

Each prompt below is a complete, self-contained, single-turn brief. Do not
prepend a persona ("You are a Principal Architect...") — the audience is
described *to* the researching model as context, not assigned as a role to
perform. Do not add search queries or minimum search counts; the model
should investigate dynamically based on what it finds.

**Evidence Standard — applies inside every prompt below**, repeated in
full each time so each prompt stays copy-paste-ready on its own:

> Grade every factual claim on a base scale — **A** (official docs / RFCs /
> primary source) · **B** (peer-reviewed or reproducible empirical data) ·
> **C** (vendor claims / marketing) · **D** (blog / tutorial / forum / AI
> recall) · **E** (unverifiable / rumor) — then append modifiers for
> corroboration (single-source / corroborated / contested), recency
> (fresh / aging / stale relative to **2026-08-18**), and directness
> (direct evidence for this exact claim / indirect analogy). Tag each
> source's verification status: fetched (retrieved live this session) |
> cached | recalled (from training, not verified this session) |
> secondhand | human-provided. Any claim marked "recalled" is capped at
> Grade D regardless of what the underlying source would otherwise merit —
> recall is not verification.

---

## T2-01 — Competitive & Category Landscape

*Layer 0 · Discovery · Unblocked · Informs D-008*

**BRIEF**
Investigate whether a genuine, currently-unfilled gap exists for a
standardized "Process" layer in AI-assisted software development. The
project under evaluation, Kramak, frames the 2026 AI coding landscape as
three layers: Context (AGENTS.md — solved), Protocol (MCP — solved), and
Process ("how to autonomously develop software" — claimed unsolved).
Kramak is a file-based, zero-runtime-dependency methodology: a 5-state
FSA (BOOTSTRAP → PLANNING → EXECUTING → AUDITING, with a WAITING
substate) that any AI coding agent can follow, with 8 existing IDE
adapters. The audience for this research is a Principal Architect
deciding whether continued investment in Kramak as currently scoped is
justified, or whether the "gap" it claims to fill is already substantially
occupied. Map the real competitive set as it exists today, not as Kramak's
own comparison docs describe it.

**SCOPE**
Today's date is 2026-08-18 — treat this as a fast-moving space and flag
anything you can't confirm is still current. In scope: RIPER-5, GitHub's
Spec Kit, Aider's own conventions, Devin's and OpenHands' built-in
orchestration, Cursor/Windsurf/Cline's native planning modes, BMAD-METHOD,
and any other named or emerging "agentic SDLC" / AI-development-process
frameworks, plus any effort extending AGENTS.md or MCP toward process
concerns. Also in scope: primary evidence (surveys, widely-discussed
GitHub issues/discussions, credible practitioner writeups) of what
developers actually report struggling with in AI-assisted development
right now. Out of scope: general AI coding *model* capability reviews
unrelated to process/methodology. Prefer official docs, source repos, and
primary practitioner accounts over SEO-optimized "best AI coding tools"
listicles.

**APPROACH**
Start broad — what frameworks and standards exist in this space today —
then narrow into how each actually structures its process (if disclosed),
not just its marketing description. Surface disagreement rather than
smoothing it over: if some practitioners think this problem is already
solved by individual tools' built-in orchestration and others think a
cross-tool standard is needed, present both positions with their
respective evidence. Actively look for evidence that the "gap" is
imagined rather than real — that would be a legitimate and useful finding.

**DELIVERABLE**
Your output must address:
- A direct answer: does an unfilled Process-layer gap exist, partially exist, or not exist
- A comparison of the 4–6 closest contenders on approach (not marketing copy)
- Deep analysis of the two closest competitors to Kramak specifically (let the evidence — not Kramak's own framing — determine which two)
- What practitioners report actually struggling with in AI-assisted development in 2026, with direct sourcing
- Explicit disconfirming evidence for the "the gap is real" hypothesis
- Inline evidence grades throughout, plus open risks

**FORMAT**
Produce one complete Markdown file. Open with YAML frontmatter:
```yaml
---
id: T2-01
title: "Competitive & Category Landscape"
date: 2026-08-18
status: draft
topic: competitive-landscape
tags: [positioning, competitors, category-gap]
informs_decisions: [D-008]
confidence: <low | medium | high>
---
```
Body sections, in order: **Research Question** → **Key Findings** (3–7
bullets) → **Recommendation** (isolated from rejected framings) →
**Alternatives Considered** → **Detailed Findings** → **Open Questions &
Risks** (each with a stated reversal trigger) → **Sources & Evidence
Ledger** (every source, graded per the Evidence Standard above).

---

## T2-02 — Agent Orchestration & Failure Mode Research

*Layer 0 · Discovery · Unblocked · Informs D-001, D-004, D-006, D-010, D-011*

**BRIEF**
Survey academic and applied research on (a) multi-agent / role-separated
LLM software-engineering systems, and (b) documented failure modes of
autonomous coding agents. Kramak encodes a specific hypothesis: pairing a
high-reasoning "Planning" role with a fast/precise "Executing" role, plus
a separate "Auditing" role, reduces hallucinated specs, scope creep, and
infinite repair loops. It also imposes a "2-hour work item cap," citing
METR's research on AI task-completion time horizons. This is foundational
research for a Principal Architect who needs to know whether Kramak's
core mechanisms are evidence-backed or intuition-based before they harden
into a stable public contract.

**SCOPE**
Today's date is 2026-08-18. In scope: peer-reviewed and arXiv-preprint
research on multi-agent software-engineering architectures (e.g.
AutoGen-, MetaGPT-, ChatDev-style systems), SWE-bench and comparable
benchmark failure analyses, METR's actual published findings on AI task
time horizons — including their stated confidence intervals and
limitations — and research on LLM self-critique/self-repair loop
dynamics. Out of scope: general LLM capability benchmarking unrelated to
agentic software engineering or failure taxonomy. Prioritize primary
papers and official METR publications over secondary summaries.

**APPROACH**
Start with the state of the art on role-separated agent architectures,
then narrow into documented failure modes and how various systems attempt
to mitigate them. Specifically verify what METR's research actually
claims — the shape of the time-horizon trend and its uncertainty bounds —
and check whether a fixed "2-hour" work-item cap is a defensible
derivation from that research or a loose approximation; flag any mismatch
you find rather than assuming the citation is accurate. Seek disconfirming
evidence: cases where role-separated architectures underperformed
simpler single-agent continuous loops.

**DELIVERABLE**
Your output must address:
- State of the art on planner/executor-style role separation, with evidence for and against
- A catalogue of documented autonomous-coding-agent failure modes with sources
- What METR's research actually says, and an explicit verdict on whether "2 hours" is defensible or needs recalibration
- Disconfirming evidence for role-separation's superiority over single-agent loops
- Honest assessment of how thin or mature this literature actually is
- Inline evidence grades and open risks

**FORMAT**
```yaml
---
id: T2-02
title: "Agent Orchestration & Failure Mode Research"
date: 2026-08-18
status: draft
topic: agent-orchestration-research
tags: [multi-agent, failure-modes, metr, planner-executor]
informs_decisions: [D-001, D-004, D-006, D-010, D-011]
confidence: <low | medium | high>
---
```
Same body structure as T2-01: Research Question → Key Findings →
Recommendation → Alternatives Considered → Detailed Findings → Open
Questions & Risks → Sources & Evidence Ledger, with the Evidence Standard
applied throughout.

---

## T2-03 — OSS Standard Adoption Dynamics

*Layer 0 · Discovery · Unblocked · Informs D-003, D-007, D-008*

**BRIEF**
Investigate what actually drives adoption versus stagnation for
developer-facing conventions, methodologies, and standards. Use case
studies such as Conventional Commits, Semantic Versioning, the Twelve-Factor
App, EditorConfig, and — most relevantly, since Kramak explicitly
positions itself alongside them — the rapid adoption of AGENTS.md and
MCP. Kramak's core spec is over 60KB across PLANNER.md (41.5KB) and
EXECUTOR.md (17.7KB), competing partly on rigor against far lighter
named alternatives such as RIPER-5 (reportedly a single `.cursorrules`
file). The audience is a Principal Architect deciding where to spend
limited solo-maintainer effort: rigor and completeness, or minimalism and
onboarding speed.

**SCOPE**
Today's date is 2026-08-18. In scope: documented adoption trajectories and
case studies of developer standards/methodologies, and specifically
whatever evidence exists on AGENTS.md's and MCP's adoption speed and what
drove it, since they are Kramak's own explicit reference points. Out of
scope: general open-source growth-hacking advice not specific to
standards/conventions adoption.

**APPROACH**
Start broad with what's known about standard-adoption patterns generally,
then narrow specifically into AGENTS.md and MCP's trajectories as the
most directly comparable and recent cases. Surface the genuine tension
in the evidence rather than resolving it prematurely: rigor/completeness
and minimalism both have real success stories in this reference class —
find out which tends to win and under what conditions, rather than
assuming one is categorically better.

**DELIVERABLE**
Your output must address:
- Patterns that correlate with successful standard adoption vs. failed/stalled ones
- Specific evidence on AGENTS.md's and MCP's adoption speed and drivers
- An honest treatment of the rigor-vs-minimalism tension in this exact reference class, with conditions under which each tends to win
- Disconfirming evidence for any single "adopt minimalism" or "adopt rigor" conclusion
- Inline evidence grades and open risks

**FORMAT**
```yaml
---
id: T2-03
title: "OSS Standard Adoption Dynamics"
date: 2026-08-18
status: draft
topic: adoption-dynamics
tags: [oss-standards, adoption, agents-md, mcp]
informs_decisions: [D-003, D-007, D-008]
confidence: <low | medium | high>
---
```
Same body structure as T2-01, Evidence Standard applied throughout.

---

## T2-04 — State Machine & Role Separation Deep Dive

*Layer 1 · One-way door · Unblocked · Informs D-001*

**BRIEF**
Kramak's core is a deterministic 5-state finite-state automaton —
BOOTSTRAP → PLANNING → EXECUTING → AUDITING → (back to PLANNING), with a
WAITING substate reachable from PLANNING and AUDITING — pairing a
high-reasoning "planner" model with a fast/precise "executor" model,
with state persisted in a git-tracked `state.json` validated against a
JSON Schema across sessions. This is Kramak's single most load-bearing,
hardest-to-reverse design choice: changing it after external adoption
breaks every dependent repo's `state.json` and all 8 IDE adapters at
once. Investigate whether this specific FSA shape and role split is the
right abstraction against plausible alternatives — a continuous
single-agent loop with internal mode-switching; a more granular state set
(e.g. a separate REVIEW or PLAN-REVIEW state); or a hierarchical/nested
state machine. The audience is a Principal Architect who must decide
whether to lock this design into a stable v1 contract now, or hold it
open for a v2 redesign before adoption raises the switching cost further.

**SCOPE**
Today's date is 2026-08-18. In scope: state-machine and workflow-design
research applied to agentic systems; documented alternative architectures
from comparable tools (Devin, OpenHands, Aider, Cursor/Windsurf agent
modes, RIPER-5, Spec Kit) insofar as their state or role models are
publicly disclosed; and general software-process research on separating
"design" from "implementation" roles, including its known failure modes
(handoff overhead, spec drift between roles). Out of scope: UI/UX of how
states are displayed to the user; implementation-language specifics of
`state.json` itself (that belongs to D-002, not this session).

**APPROACH**
Start with how comparable tools structure their internal agent
state/roles (where disclosed), then narrow into the specific tradeoffs of
role separation versus a single continuous loop. Explicitly look for
cases where role-separated architectures underperformed single-agent
designs, not only cases where separation helped — a one-sided literature
review here would defeat the purpose of this session.

**DELIVERABLE**
Your output must address:
- A clear recommendation: keep the current FSA as-is, modify it, or redesign it
- Evaluation of at least two concrete alternative architectures
- Deep comparison against the one or two closest disclosed competitor architectures
- Specific critique of the WAITING-state design and the PLANNING→EXECUTING→AUDITING handoff points as likely failure points
- Inline evidence grades throughout
- Open risks, each with an explicit reversal trigger (what future evidence would flip this recommendation)

**FORMAT**
```yaml
---
id: T2-04
title: "State Machine & Role Separation Deep Dive"
date: 2026-08-18
status: draft
topic: state-machine-design
tags: [fsa, planner-executor, role-separation, core-architecture]
informs_decisions: [D-001]
confidence: <low | medium | high>
---
```
Same body structure as T2-01, Evidence Standard applied throughout.

---

## T2-05 — Multi-Agent Orchestration Evolution Path

*Layer 1 · Two-way door · Depends on T2-04 · Informs D-009*

**BRIEF**
Kramak currently assumes exactly one planner session and one executor
session active at a time. 2026 AI coding tools increasingly expose native
parallelism — Antigravity subagents, Claude Code's parallel task
execution among them. Investigate whether Kramak should evolve toward
multi-agent/parallel-executor orchestration (e.g. fanning independent
Work Items out to multiple concurrent executor sessions), or whether
single-agent-per-phase is a durable feature rather than a current
limitation. Read `sessions/T2-04-state-machine-role-separation.md` first
— this session's evaluation of *whether and how* to extend the
planner/executor split depends on that session's verdict on the split
itself. The audience is a Principal Architect scoping the v1.1/v2.0
roadmap.

**SCOPE**
Today's date is 2026-08-18. In scope: native multi-agent/parallel-execution
capabilities actually shipped (not just announced) by major 2026 AI
coding tools and IDEs; research and postmortems on coordination overhead
and merge-conflict/race-condition risk in parallel LLM-driven code
changes; design patterns for safely parallelizing independent work units
(dependency-graph partitioning, lock-based coordination). Out of scope:
general distributed-systems consensus theory not applied to this problem;
UI for visualizing parallel agents.

**APPROACH**
Start with what native parallel-agent capabilities actually exist and are
actually stable today, distinguishing shipped features from roadmap
promises. Then narrow into the concrete coordination risks of applying
that to Kramak's file-based, git-tracked state model specifically. Weigh
this against T2-04's verdict — if T2-04 recommends a redesign of the base
FSA, treat multi-agent extension as premature and say so.

**DELIVERABLE**
Your output must address:
- A clear recommendation: stay single-agent, add an optional parallel-execution extension, or defer entirely
- An honest maturity assessment of native multi-agent primitives as of today's date, not as advertised
- Concrete risk analysis of parallel WI execution against `state.json` writes and git merge conflicts
- How this recommendation interacts with T2-04's verdict
- Inline evidence grades and open risks with reversal triggers

**FORMAT**
```yaml
---
id: T2-05
title: "Multi-Agent Orchestration Evolution Path"
date: 2026-08-18
status: draft
topic: multi-agent-orchestration
tags: [parallelism, multi-agent, roadmap]
informs_decisions: [D-009]
confidence: <low | medium | high>
---
```
Same body structure as T2-01, Evidence Standard applied throughout.

---

## T2-06 — Self-Improvement Governance & Anti-Bias Guard

*Layer 1 · One-way door · Unblocked · Informs D-006*

**BRIEF**
Kramak includes an "Anti-Bias Guard" — a 5-point checklist gating any
change where the pipeline modifies its own specification files —
intended to prevent recency bias in a methodology that has already
evolved through 24 self-directed iterations. Investigate what research on
safe self-modification in AI and software systems says about whether a
5-point checklist is a robust safeguard on its own, or whether it needs
supplementation — a mandatory cooling-off period, an external/human
review gate, automated regression testing against prior audit logs, or
versioned rollback. The audience is a Principal Architect responsible for
the safety of a framework explicitly designed to rewrite its own
governing documents.

**SCOPE**
Today's date is 2026-08-18. In scope: literature on safe/bounded
self-modification — not limited to LLM systems, including classical
self-modifying-code and change-management research; any disclosed
self-improvement governance mechanisms in comparable AI-agent frameworks;
research on recency/availability bias specifically in iterative,
human-in-the-loop system design; and research on where checklist-only
governance is known to be insufficient in adjacent high-stakes domains
(e.g. aviation, medicine). Out of scope: AGI-scale existential-risk
recursive self-improvement research not applicable to a bounded,
human-supervised checklist for editing methodology documents.

**APPROACH**
Start with what's known generally about checklist-based governance
effectiveness, then narrow into self-modifying-system-specific risks.
Actively seek documented failures of checklist-only governance in
adjacent domains — this is the evidence most likely to challenge the
current design, so don't stop at confirming cases.

**DELIVERABLE**
Your output must address:
- A recommendation: the 5-point checklist is sufficient as-is / needs specific additions / needs a structurally different mechanism
- Comparison against how change-management or checklist-heavy adjacent domains handle this exact problem
- An explicit list of failure scenarios the current guard would and would not catch
- Inline evidence grades and open risks with reversal triggers

**FORMAT**
```yaml
---
id: T2-06
title: "Self-Improvement Governance & Anti-Bias Guard"
date: 2026-08-18
status: draft
topic: self-improvement-governance
tags: [anti-bias-guard, self-modification, governance, safety]
informs_decisions: [D-006]
confidence: <low | medium | high>
---
```
Same body structure as T2-01, Evidence Standard applied throughout.

---

## T2-07 — Grounding & Planning Mechanisms Validation

*Layer 1 · One-way door · Unblocked · Informs D-010*

**BRIEF**
PLANNER.md (41.5KB) implements four related mechanisms: (1) **Grounded
Verification** — every spec must quote actual code, confirmed by grep, to
prevent hallucinated specs; (2) **Hard Scope Check** — a deterministic
`git diff --name-only` comparison against a spec's declared file list;
(3) **Perspective-Based Planning** — a PERCEIVE → REASON → DECIDE
assessment cycle; (4) **Spec Detail Scaling** — three tiers of
specification detail (🔴 Guided: exact before/after, 🟡 Directed:
intent+constraints, 🟢 Outcome: goal+criteria) matched to task risk.
Investigate whether these four mechanisms are grounded in — or
contradicted by — research on LLM hallucination mitigation, grounding
techniques, deterministic vs. LLM-judged scope/compliance checking, task
decomposition, and variable-detail prompting/scaffolding. The audience is
a Principal Architect auditing whether Kramak's flagship mechanisms are
genuinely evidence-backed innovations or intuition dressed up as
methodology.

**SCOPE**
Today's date is 2026-08-18. In scope: research on grounding LLM outputs
in verifiable source artifacts; deterministic vs. LLM-judged compliance
checking; task-decomposition and chain-of-thought scaffolding research;
any published evaluation of variable-detail-level prompting strategies.
Out of scope: general prompt-engineering listicles without empirical
backing.

**APPROACH**
Evaluate each of the four mechanisms as its own sub-question rather than
one undifferentiated cluster — they likely have different evidentiary
footing. Actively look for disconfirming cases: instances where
grep-based grounding was gamed, or a grep-verified spec still resulted in
hallucinated downstream behavior.

**DELIVERABLE**
Your output must address:
- A separate verdict for each of the four mechanisms — strongly supported / plausible-but-unvalidated / needs revision
- The closest real research analogue identified for each mechanism
- Explicit disconfirming evidence sought and reported, even if none was found
- Inline evidence grades and open risks with reversal triggers

**FORMAT**
```yaml
---
id: T2-07
title: "Grounding & Planning Mechanisms Validation"
date: 2026-08-18
status: draft
topic: grounding-mechanisms
tags: [grounded-verification, scope-check, spec-scaling, hallucination-mitigation]
informs_decisions: [D-010]
confidence: <low | medium | high>
---
```
Same body structure as T2-01, Evidence Standard applied throughout.

---

## T2-08 — Failure Handling & Continuity Validation

*Layer 1 · One-way door · Unblocked · Informs D-011*

**BRIEF**
Kramak implements a 6-category Failure Taxonomy for structured diagnosis,
a Circuit Breaker to stop infinite audit-fix-audit loops, a State
Reconciliation mechanism for crash recovery from `state.json`
inconsistency, an INBOX System for structured mid-project user input, and
a Human Task Protocol that tracks tasks requiring human action without
blocking the pipeline. It also imposes a "2-hour work item cap" (citing
METR) and a "Polish Ceiling Rule" limiting how much refinement an
executor may apply beyond spec. Investigate whether this cluster is
grounded in documented autonomous-agent failure research and in
crash-recovery / human-in-the-loop design patterns, and specifically
stress-test the 2-hour cap and Polish Ceiling Rule as calibrated
parameters rather than assumed-correct numbers. The audience is a
Principal Architect deciding whether these thresholds need recalibration
before wider adoption.

**SCOPE**
Today's date is 2026-08-18. In scope: documented infinite-loop /
repair-loop failure patterns in autonomous coding agents and how
comparable tools stop them; crash-recovery / checkpoint-reconciliation
patterns from distributed systems; human-in-the-loop task-tracking
patterns in agentic pipelines; METR's actual published findings on AI
task-completion time horizons, checked against how a fixed "2-hour" cap
would map onto that research (this overlaps with T2-02 — treat that
session's findings as a starting point if available, but this session
should reach its own independent verdict on the parameter itself). Out of
scope: general SRE/uptime practices unrelated to LLM-agent failure
recovery.

**APPROACH**
Check whether the six failure categories are complete and non-overlapping
against documented failure taxonomies elsewhere, rather than assuming the
count of six is correct. Independently verify the "2 hours" and Polish
Ceiling figures against whatever primary research is available, rather
than accepting the citation at face value.

**DELIVERABLE**
Your output must address:
- A recommendation per mechanism (taxonomy, circuit breaker, reconciliation, INBOX, human task protocol)
- An explicit verdict on whether "2 hours" is a defensible derived figure from METR's research or should be recalibrated, with the actual cited figures shown
- An assessment of whether 6 categories over- or under-fit real documented failure modes
- Inline evidence grades and open risks with reversal triggers

**FORMAT**
```yaml
---
id: T2-08
title: "Failure Handling & Continuity Validation"
date: 2026-08-18
status: draft
topic: failure-handling
tags: [failure-taxonomy, circuit-breaker, state-reconciliation, metr]
informs_decisions: [D-011]
confidence: <low | medium | high>
---
```
Same body structure as T2-01, Evidence Standard applied throughout.

---

## T2-09 — Capability Gate & Self-Assessment Reliability

*Layer 1 · One-way door · Unblocked · Informs D-004*

**BRIEF**
Kramak deliberately avoids checking model names and instead asks the
acting model to self-assess its own capability against a gate before
taking on a role or task ("Capability Gate Check"), as the load-bearing
mechanism behind its model-agnostic value proposition. Investigate what
research on LLM self-assessment, self-evaluation calibration, and
metacognitive accuracy says about whether models can reliably judge their
own capability. There is a well-documented general risk that LLMs are
poorly calibrated judges of their own competence — this session exists
specifically to find out whether that risk applies here and how badly.
The audience is a Principal Architect who must decide whether pure
self-report is sufficient, or whether an external/deterministic proxy
(e.g. a small canary task) is needed alongside or instead of it.

**SCOPE**
Today's date is 2026-08-18. In scope: research on LLM calibration,
self-evaluation/self-critique reliability, overconfidence in self-rated
task competence, and any existing "capability gate" or canary-task
patterns used by comparable agentic frameworks. Out of scope: benchmark
leaderboards comparing raw model capability across vendors — that is not
the question here; the question is self-assessment reliability, not
absolute capability.

**APPROACH**
Actively seek documented cases of models confidently self-rating
"capable" and then failing the gated task — this is the specific failure
mode that would invalidate the current design, so it should be searched
for directly rather than incidentally.

**DELIVERABLE**
Your output must address:
- A recommendation: pure self-assessment / self-assessment plus a canary-task hybrid / a different mechanism entirely
- Direct evidence on LLM self-assessment calibration, with specific studies named
- An assessment of how much this strengthens or weakens the model-agnostic value proposition overall
- Inline evidence grades and open risks with reversal triggers

**FORMAT**
```yaml
---
id: T2-09
title: "Capability Gate & Self-Assessment Reliability"
date: 2026-08-18
status: draft
topic: capability-self-assessment
tags: [model-agnostic, capability-gate, calibration]
informs_decisions: [D-004]
confidence: <low | medium | high>
---
```
Same body structure as T2-01, Evidence Standard applied throughout.

---

## T2-10 — Distribution Model: Pure Files vs. Optional CLI/Runtime

*Layer 1 · One-way door · Unblocked · Informs D-003*

**BRIEF**
Kramak's core identity is "zero runtime dependencies — pure markdown
specifications, JSON Schemas, and templates," reinforced by
`init.sh`/`init.ps1` bootstrap scripts and a `validate.js` integrity
checker. Investigate the tradeoffs of maintaining strict file-only purity
versus shipping an optional, non-blocking CLI/runtime layer (e.g. a thin
`npx`-invoked validator/scaffolder) that enhances but never gates core
usage, using comparable OSS spec-standards (the Twelve-Factor App,
EditorConfig, AGENTS.md) as reference points for how they balanced
tooling against purity. Where this recommendation touches infrastructure
choices — what a hypothetical CLI would be built on — default to
established, widely-adopted open-source tooling rather than custom-built
infrastructure; reserve custom engineering effort for Kramak's actual
proprietary logic (the FSA semantics, grounding rules, spec templates),
not for reinventing schema validation or CLI scaffolding. The audience is
a Principal Architect deciding the v1.1+ distribution strategy.

**SCOPE**
Today's date is 2026-08-18. In scope: how comparable dev
standards/methodologies balanced pure-spec purity against optional
tooling and what that did to their adoption and trust; the specific risk
that "zero dependency" is core brand equity an optional CLI could
undermine even if technically non-blocking; established tooling options
(if a CLI were built) for schema validation and lightweight scaffolding.
Out of scope: designing the CLI itself in implementation detail — that
belongs to a later build phase, not this research session.

**APPROACH**
Start with how the named comparable standards handled this exact
tradeoff, then narrow into whether "optional and non-blocking" tooling
can be trusted to stay that way over time or tends to become de-facto
mandatory once it exists — this is a governance risk as much as a
technical one.

**DELIVERABLE**
Your output must address:
- A recommendation: stay pure-files-only / add strictly optional non-blocking tooling / other
- Evidence from comparable standards on this exact purity-vs-tooling tradeoff
- An explicit test of whether "optional and non-blocking" tends to hold or erode over a project's lifetime
- Inline evidence grades and open risks with reversal triggers

**FORMAT**
```yaml
---
id: T2-10
title: "Distribution Model: Pure Files vs. Optional CLI/Runtime"
date: 2026-08-18
status: draft
topic: distribution-model
tags: [zero-dependency, cli, distribution, purity]
informs_decisions: [D-003]
confidence: <low | medium | high>
---
```
Same body structure as T2-01, Evidence Standard applied throughout.

---

## T2-11 — Adapter Strategy & Auto-Bootstrap

*Layer 1 · Two-way door · Unblocked · Informs D-005*

**BRIEF**
Kramak ships 8 IDE/agent adapters — Antigravity, Cursor, Claude Code,
Windsurf, Cline, Copilot, Aider, and a Generic fallback — plus an
Auto-Bootstrap mechanism that detects project type and toolchain
automatically across 5 scenarios. Investigate the current
usage/market-share and interface-stability profile of each of the 8
target tools, and whether maintaining depth across all 8 is sustainable
versus consolidating to fewer, deeper integrations, or formalizing a
generic adapter spec/SDK that lets third parties self-maintain adapters.
The audience is a Principal Architect allocating limited solo-maintainer
time across adapter surface area.

**SCOPE**
Today's date is 2026-08-18. In scope: current adoption/usage signals for
each of the 8 named tools among AI-assisted developers; the documented
rate of breaking interface or config-format changes for each tool over
roughly the past 12–18 months; prior art for third-party-maintained
adapter/plugin ecosystems in comparable dev-tooling projects. Out of
scope: a deep technical how-to for building each individual adapter.

**APPROACH**
Start with usage-signal evidence for each of the 8 tools (however
imperfect — grade accordingly), then narrow into churn/stability history
per tool. Weigh maintenance sustainability against coverage: an adapter
for a tool with 2% usage share and frequent breaking changes has a very
different cost/benefit than one for a stable, widely-used tool.

**DELIVERABLE**
Your output must address:
- A recommendation: maintain all 8 / consolidate to N / formalize an adapter SDK for community maintenance
- Per-tool usage-signal and churn-risk assessment, each individually graded
- Whether Auto-Bootstrap's 5 detection scenarios still map to how these tools structure projects today
- Inline evidence grades and open risks with reversal triggers

**FORMAT**
```yaml
---
id: T2-11
title: "Adapter Strategy & Auto-Bootstrap"
date: 2026-08-18
status: draft
topic: adapter-strategy
tags: [ide-adapters, auto-bootstrap, maintenance-burden]
informs_decisions: [D-005]
confidence: <low | medium | high>
---
```
Same body structure as T2-01, Evidence Standard applied throughout.

---

## T2-12 — Spec Complexity & Adoption Psychology

*Layer 1 · Two-way door · Unblocked · Informs D-007*

**BRIEF**
PLANNER.md is 41.5KB and EXECUTOR.md is 17.7KB — over 60KB of core
specification a new adopter must absorb — against the explicitly named
competitor RIPER-5, reportedly implemented as a single `.cursorrules`
file. Investigate developer-adoption and cognitive-load research on
framework/methodology complexity versus onboarding friction, to determine
whether Kramak's specification size is a meaningful adoption risk, and if
so, whether a "minimal core + optional extension modules" restructuring —
without changing the underlying FSA or decisions reached elsewhere in
this pipeline — would materially help. The audience is a Principal
Architect deciding whether to invest in a spec-modularization pass before
pursuing broader adoption.

**SCOPE**
Today's date is 2026-08-18. In scope: research or case evidence on
documentation size, onboarding friction, and adoption rate specifically
for developer tools and methodologies (not general UX literature); a
direct comparison of what a new adopter must actually read and understand
for Kramak vs. RIPER-5 and Spec Kit. Out of scope: general technical
writing style guidance unrelated to adoption outcomes.

**APPROACH**
Investigate whether raw spec *size* or something more specific — e.g.
unclear entry points, lack of a "quickstart" path, or absence of worked
examples — is the more likely adoption blocker; these are not the same
thing and conflating them would produce the wrong recommendation.

**DELIVERABLE**
Your output must address:
- A recommendation: keep as-is / modularize into core+extensions / restructure some other way
- Evidence on whether spec size specifically, or onboarding friction more broadly, is the likelier adoption blocker
- A concrete "time/effort to first successful use" comparison across Kramak, RIPER-5, and Spec Kit, estimated as best the available material allows
- Inline evidence grades and open risks with reversal triggers

**FORMAT**
```yaml
---
id: T2-12
title: "Spec Complexity & Adoption Psychology"
date: 2026-08-18
status: draft
topic: spec-complexity
tags: [onboarding, cognitive-load, riper-5, spec-kit]
informs_decisions: [D-007]
confidence: <low | medium | high>
---
```
Same body structure as T2-01, Evidence Standard applied throughout.

---

## T2-13 — Naming, Positioning & Competitive Framing

*Layer 1 · One-way door (practical) · Unblocked · Informs D-008*

**BRIEF**
The project is named "Kramak" (क्रमक, Sanskrit for "sequential/procedural"),
part of the author's consistent Sanskrit-naming convention across
projects, positioned with the tagline "the missing SDLC for AI agents" —
framed against traditional SDLC methodologies (Scrum, Kanban) — while its
actual competitive set is closer to RIPER-5, Spec Kit, and the built-in
orchestration of tools like Devin and OpenHands. Investigate whether this
name is discoverable and parseable for the target English-speaking
developer audience, and whether the "SDLC" framing (competing for
Scrum/Kanban mindshare) or an "agent orchestration methodology" framing
(competing more directly with RIPER-5/Spec Kit mindshare) is the sharper
positioning. Draw on `sessions/T2-01-competitive-category-landscape.md`
and `sessions/T2-03-oss-standard-adoption-dynamics.md` where relevant, if
they're available. The audience is a Principal Architect and de facto
marketing owner of an OSS project deciding its public-facing framing
before wider promotion.

**SCOPE**
Today's date is 2026-08-18. In scope: naming/discoverability research for
developer tools (searchability, memorability, pronounceability for a
global English-reading audience); positioning-framing research
(category-creation vs. category-association strategy in dev tooling); how
AGENTS.md and MCP — Kramak's own explicit reference points — chose and
communicated their names and framing. Out of scope: logo/visual-identity
design; deep trademark/legal clearance — note it as an open risk if
relevant, but do not attempt legal analysis.

**APPROACH**
Weigh the discoverability question and the framing question separately —
a name can be a real friction point even if the SDLC-vs-orchestration
framing question resolves independently, and vice versa. Ground the
framing recommendation in the actual competitive set identified by T2-01
if that session is available, not in Kramak's own self-description.

**DELIVERABLE**
Your output must address:
- A recommendation: keep the name and tagline as-is / adjust the tagline or framing / a more substantial repositioning
- Explicit assessment of discoverability friction for "Kramak"/"क्रमक" specifically
- A recommendation on "SDLC" vs. "agent orchestration" framing, reasoned against the actual competitive set (not Kramak's self-description)
- Inline evidence grades and open risks with reversal triggers

**FORMAT**
```yaml
---
id: T2-13
title: "Naming, Positioning & Competitive Framing"
date: 2026-08-18
status: draft
topic: naming-positioning
tags: [branding, positioning, discoverability, tagline]
informs_decisions: [D-008]
confidence: <low | medium | high>
---
```
Same body structure as T2-01, Evidence Standard applied throughout.

---

## T2-14 — Evidence-Grounded Innovation Scorecard *(Layer 2 Blueprint)*

*Layer 2 · Synthesis, not new primary research · Depends on T2-04, T2-06, T2-07, T2-08, T2-09*

**BRIEF**
Synthesize the findings of `sessions/T2-04-state-machine-role-separation.md`,
`sessions/T2-06-self-improvement-governance.md`,
`sessions/T2-07-grounding-planning-mechanisms.md`,
`sessions/T2-08-failure-handling-continuity.md`, and
`sessions/T2-09-capability-gate-self-assessment.md` into a single
evidence-grounded scorecard covering all 12 of Kramak's claimed
innovations — Grounded Verification, Anti-Bias Guard, Perspective-Based
Planning, Spec Detail Scaling, Failure Taxonomy, Hard Scope Check, State
Reconciliation, Circuit Breaker, INBOX System, Human Task Protocol,
Auto-Bootstrap, and Capability Gate Check — each rated strongly evidenced
/ plausible-but-unvalidated / contradicted-or-needs-redesign, with the
evidence grade carried through from its source session. This is a
synthesis session: do not re-run web research for facts already gathered
in the five source sessions. The audience is a Principal Architect who
needs one authoritative artifact answering "which of my 12 claimed
innovations can I actually defend publicly, and which need rework first?"

**SCOPE**
Today's date is 2026-08-18. In scope: the findings, recommendations, and
evidence ledgers of the five named source sessions — read them directly
rather than re-deriving their conclusions. Light supplementary search is
permitted only to resolve a specific contradiction between two source
sessions, not to open new lines of inquiry. Out of scope: any innovation
or mechanism not covered by the five source sessions (Perspective-Based
Planning through Human Task Protocol should already be covered across
T2-07 and T2-08; Auto-Bootstrap is covered in T2-11, not this session's
input set — note it as out of scope for this scorecard rather than
guessing at its rating).

**APPROACH**
Read all five source session files in full before synthesizing anything.
Build the scorecard directly from their Recommendation and Key Findings
sections. Where two source sessions imply conflicting conclusions about
the same innovation, surface the conflict explicitly — log it for
`templates/CONFLICT-RESOLUTION.template.md` rather than silently picking
a winner.

**DELIVERABLE**
Your output must address:
- A scorecard covering the 11 innovations in scope for these five sessions (one row each), with verdict, carried-through evidence grade, and a one-line justification
- An explicit list of innovations requiring redesign before they can be claimed as evidence-backed
- An explicit list of unresolved conflicts between source sessions, if any
- A short, prioritized punch-list of what to fix before a v1.1 release makes public claims about these innovations

**FORMAT**
```yaml
---
id: T2-14
title: "Evidence-Grounded Innovation Scorecard"
date: 2026-08-18
status: draft
topic: innovation-scorecard
tags: [synthesis, evidence-audit, innovations]
informs_decisions: [D-001, D-004, D-006, D-010, D-011]
confidence: <low | medium | high>
---
```
Body: **Research Question** → **Key Findings** (organized as the
scorecard table itself) → **Recommendation** → **Alternatives
Considered** → **Detailed Findings** → **Open Questions & Risks** →
**Sources & Evidence Ledger** (the five source session files plus any
supplementary sources used to resolve conflicts).

---

## T2-15 — Adoption & Positioning Roadmap *(Layer 2 Blueprint)*

*Layer 2 · Synthesis, not new primary research · Depends on T2-05, T2-10, T2-11, T2-12, T2-13*

**BRIEF**
Synthesize the findings of `sessions/T2-05-multi-agent-orchestration-path.md`,
`sessions/T2-10-distribution-model-cli.md`,
`sessions/T2-11-adapter-strategy-bootstrap.md`,
`sessions/T2-12-spec-complexity-adoption-psychology.md`, and
`sessions/T2-13-naming-positioning.md` into a concrete, prioritized
v1.1/v2.0 roadmap covering how Kramak should evolve its distribution,
adapter portfolio, spec structure, multi-agent posture, and public
positioning — without compromising its zero-mandatory-dependency,
model-agnostic, IDE-agnostic principles. This is a synthesis session
pulling from the five source sessions' recommendations, not new primary
research. The audience is a Principal Architect who needs one sequenced
roadmap rather than five separate recommendations to reconcile manually.

**SCOPE**
Today's date is 2026-08-18. In scope: the findings, recommendations, and
evidence ledgers of the five named source sessions. Light supplementary
search only to resolve contradictions between them. Out of scope:
engineering-level implementation detail — that belongs to actual build
sessions, not this planning artifact.

**APPROACH**
Read all five source session files in full before synthesizing. Sequence
recommendations by two factors: (a) how one-way/costly-to-reverse each is
— do those first, before further adoption raises the stakes — and (b)
genuine dependency between them (e.g. positioning likely needs to be
settled before adapter-portfolio decisions are communicated externally).
Surface any conflicts between source sessions explicitly rather than
resolving them silently.

**DELIVERABLE**
Your output must address:
- A sequenced roadmap (not a flat list) covering distribution model, adapter strategy, spec structure, multi-agent posture, and naming/positioning
- Explicit rationale for the sequencing chosen
- A short "do not do yet" list — items the source evidence suggests are premature — with reasoning
- An explicit list of unresolved conflicts between source sessions, if any
- Evidence grades carried through from the source sessions

**FORMAT**
```yaml
---
id: T2-15
title: "Adoption & Positioning Roadmap"
date: 2026-08-18
status: draft
topic: adoption-roadmap
tags: [synthesis, roadmap, positioning, distribution]
informs_decisions: [D-003, D-005, D-007, D-008, D-009]
confidence: <low | medium | high>
---
```
Body: **Research Question** → **Key Findings** (organized as the
sequenced roadmap itself, with sequencing rationale) → **Recommendation**
→ **Alternatives Considered** → **Detailed Findings** → **Open Questions
& Risks** → **Sources & Evidence Ledger**.

---

## T2-16 — Grand Synthesis: Founding Architecture Document *(Sink)*

*Sink · Synthesis, not new primary research · Depends on T2-14, T2-15*

**BRIEF**
Compile the Founding Architecture Document (FAD) for Kramak by pulling
the confirmed verdict for every decision in `DECISIONS.md` (D-001 through
D-011), drawn directly from the Recommendation sections of
`sessions/T2-04-*.md` through `sessions/T2-13-*.md` and the two Layer-2
blueprints, `sessions/T2-14-innovation-scorecard.md` and
`sessions/T2-15-adoption-positioning-roadmap.md`. This is the terminal
synthesis session of the pipeline: it does not conduct new primary
research, only compiles, reconciles, and produces the single authoritative
document that the Phase 0 gate (Track A / Track B, defined in
RESEARCH-PIPELINE.md §5) will be evaluated against. The audience is the
Principal Architect and, functionally, future contributors who need one
document stating what Kramak's architecture is and why, with the evidence
trail intact.

**SCOPE**
Today's date is 2026-08-18. In scope: all prior session files (T2-01
through T2-15) and the current state of `DECISIONS.md`. Out of scope: new
research — this session is compilation and reconciliation only. Use
`templates/FOUNDING-ARCHITECTURE.template.md` as the base structure to
fill in.

**APPROACH**
Read every prior session file and the current state of `DECISIONS.md`
before writing anything. For each D-NNN decision, pull the confirmed
verdict, its supporting evidence grade, and its review trigger from the
source sessions rather than re-summarizing from memory or inventing
a synthesis that isn't actually supported by them. Explicitly flag any
D-NNN entry that lacks a clear verdict from its informing sessions — that
is a gate failure to report, not something to paper over with a
plausible-sounding conclusion. Apply the Track A / Track B criteria from
RESEARCH-PIPELINE.md §5 to each decision and state pass/fail for each,
showing your reasoning against the specific criteria, not just a verdict.

**DELIVERABLE**
Your output must address:
- One FAD covering the full architecture: state machine, persistence/versioning, distribution model, capability gate, adapter strategy, self-improvement governance, spec structure, naming/positioning, multi-agent posture, and grounding/failure mechanisms
- A Track A / Track B gate-status table listing every D-NNN decision and whether it passes its applicable gate, with reasoning
- An explicit list of any decision that failed its gate and what additional research it still needs
- Evidence grades carried through from every contributing session
- A final overall confidence assessment for the architecture as a whole

**FORMAT**
```yaml
---
id: T2-16
title: "Grand Synthesis — Founding Architecture Document"
date: 2026-08-18
status: draft
topic: founding-architecture
tags: [synthesis, fad, phase-0-gate]
informs_decisions: [D-001, D-002, D-003, D-004, D-005, D-006, D-007, D-008, D-009, D-010, D-011]
confidence: <low | medium | high>
---
```
Body follows `templates/FOUNDING-ARCHITECTURE.template.md`'s structure,
closing with the Track A/Track B gate-status table described above and a
full **Sources & Evidence Ledger** aggregating citations from every
contributing session.
