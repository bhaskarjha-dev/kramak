# PROMPT-LIBRARY.md

**Kramak Phase 0 — Research Prompt Library**

This file contains the eight copy-paste-ready research prompts specified by the Research Pipeline and Decision Registry — one per session, T1-01 through T1-08, organized by layer. Each prompt is a complete, self-contained brief (BRIEF / SCOPE / APPROACH / DELIVERABLE / FORMAT) built for a single-turn run in a frontier model's deep-research or web-search mode (Claude, Gemini, or ChatGPT research modes). None of them assume the reader has seen the Research Pipeline document, the Decision Registry, or any other prompt in this library — everything a fresh session needs is inline.

Two rules run through every prompt below rather than being stated once and assumed. First, every prompt anchors research to **today, 2026-08-18** — AI-coding tooling and competitor products in this space have historically moved on a timescale of months, so anything recalled from training without a fresh check is treated as potentially stale. Second, every prompt requires **inline evidence grading** on every factual claim — a base grade (A–E), corroboration/recency/directness modifiers, and a verification tag — because a research pass that sounds authoritative isn't the same thing as one that's checkable.

## How to Use This Library

- Copy everything inside a session's fenced block into a fresh chat with a deep-research- or web-search-capable model. Run one session per chat — each prompt is designed as its own single-turn brief, not a multi-turn conversation.
- Save the raw output exactly as the filename given for that session under `sessions/` — e.g. `sessions/T1-01-competitive-landscape.md`. Filenames are fixed by the Research Pipeline's Session Matrix, not invented here.
- T1-01, T1-02, T1-03, T1-04, T1-05, and T1-06 are unblocked or only softly dependent on each other — they can run in any order, including fully in parallel. If running them serially, the suggested order is **T1-02 → T1-01 → T1-03 → T1-04 → T1-05 → T1-06**.
- T1-07 and T1-08 are hard-gated synthesis steps. Don't open either until its required inputs exist — each prompt below states exactly what to paste in, and what to do if an input is missing.
- Once a session's output exists, open its decision record(s) in `DECISIONS.md` and move `Status` from `proposed` toward a terminal state, per the process the Research Pipeline already defines. Decision recording, conflict resolution, and the Phase 0 exit gate all live in the pipeline document and its templates (`DECISIONS.template.md`, `CONFLICT-RESOLUTION.template.md`, `FOUNDING-ARCHITECTURE.template.md`, `PHASE-0-GATE.template.md`) — this library covers the research prompts only.

**Route legend** (for navigating the index below — the prompts themselves explain their own rigor bar inline, so this is for your reference, not something the target AI needs to parse): *Discovery* — open landscape/literature scan, no single decision gate. *Fast Spike* — lighter pass for a two-way, reversible decision. *Deep Research* — full-rigor pass for a one-way, irreversible decision, requiring 2+ corroborating sources. *Confirm* — validate a known pattern against a specific choice. *Gated synthesis* — consolidation of prior sessions' outputs, not fresh research.

## Session Index

| ID | Title | Layer | Route | Decisions Informed | Hard Dependencies |
|---|---|---|---|---|---|
| T1-01 | Competitive & Prior-Art Landscape | 0 | Discovery / Confirm | D-007, D-008 | none |
| T1-02 | Research Literature: Orchestration & Safety | 0 | Discovery | background: D-001–D-004, D-009 | none |
| T1-03 | State Topology & Crash Recovery | 1 | Deep Research | D-001 | none |
| T1-04 | Role Separation, Capability Gating & Multi-Agent Evolution | 1 | Deep Research | D-002, D-010 | none |
| T1-05 | Self-Improvement Governance | 1 | Fast Spike | D-003, D-009 (part) | none |
| T1-06 | Framework Evolution & Parameter Audit | 1 | Confirm + Fast Spike | D-004, D-005, D-006, D-009 (part) | none |
| T1-07 | Architecture Change-Set Blueprint | 2 | Gated synthesis | consolidates T1-03–T1-06 | T1-03, T1-04, T1-05, T1-06 |
| T1-08 | Founding Architecture Document | Sink | Gated synthesis | compiles everything | T1-07 |

---

## Layer 0 — Landscape and Discovery

### T1-01 — Competitive & Prior-Art Landscape

> **Session file:** `sessions/T1-01-competitive-landscape.md` · **Layer:** 0 · **Route:** Discovery, doubling as Confirm for D-007 and D-008 · **Decisions informed:** D-007, D-008 (background: D-001, D-002, D-005, D-006) · **Dependencies:** none — fully unblocked

Copy everything in the box below into a fresh chat with a deep-research-capable model.

```
## BRIEF

I'm the founder and sole architect of Kramak (क्रमक), an open-source, MIT-licensed, file-based development methodology for AI coding agents. It's pure markdown specs, JSON Schema, and templates — zero runtime dependencies, no mandatory installs. It defines a 5-state loop (BOOTSTRAP → PLANNING → EXECUTING → AUDITING → back to PLANNING, plus a WAITING side-state) that any AI coding agent — Cursor, Claude Code, Windsurf, Cline, Copilot, Aider, Google Antigravity, or a generic model — can follow to plan, execute, and audit software changes autonomously. State persists in a state.json file validated against a JSON Schema, so work survives a session crash or a model swap. A high-reasoning model acts as "architect" during PLANNING; a faster, more precise model acts as "executor" during EXECUTING; the executor also performs technical audits during AUDITING, with findings routed back to the planner.

My positioning claim is that the 2026 AI-coding landscape has three layers — Context ("what is my project," served by AGENTS.md and the AAIF standard), Protocol ("how do tools connect," served by MCP), and Process ("how to autonomously develop software," which I claim is unserved) — and that Kramak is the first standardized answer to that third layer. I ship 8 IDE/agent adapters (Antigravity, Cursor, Claude Code, Windsurf, Cline, Copilot, Aider, Generic) and existing internal comparison docs against RIPER-5, Spec Kit, Aider, and OpenHands/Devin. Version 1.0.0 shipped August 2026 after 24 iterations of solo development; there is no adoption data yet.

I need this landscape re-derived independently, not confirmed from my own comparison docs, because I wrote those myself and may have under- or over-stated how mature the competition already is. Specifically: is GitHub Spec Kit already doing what I think only Kramak does, at a scale my docs understate? Is the "Process" gap actually still open, or did something fill it while I was building v1.0.0? This informs two decisions directly — how many and which IDE adapters are worth maintaining, and whether "Kramak," its Sanskrit meaning, and "the missing SDLC for AI agents" are the right name and positioning given who I'm actually competing with — plus background context for four other architectural decisions being researched elsewhere in this program.

Audience: a Principal Architect deciding whether to continue, reposition, or materially retract Kramak's differentiation claims before a v1.1 release. Assume they want production-grade competitive intelligence, not a comfortable summary.

## SCOPE

Anchor all research to today, 2026-08-18. This space — IDE agent features, competitor products, standards-body activity — has historically moved on a timescale of months, so treat anything recalled from training without a fresh check as potentially stale, especially version numbers, feature lists, and "who supports what now."

In scope: process/methodology frameworks for AI-assisted software development — GitHub Spec Kit, RIPER-5 and its forks, Aider's built-in workflow conventions, Devin's internal planning/execution architecture, OpenHands' multi-agent orchestration, and any comparable framework, open-source, commercial, or built into an existing tool, that has launched or materially changed since early-to-mid 2025; the current state of AGENTS.md/AAIF and MCP as the two adjacent, already-standardized layers; ecosystem stability and release cadence for each of Kramak's 8 target integrations (Antigravity, Cursor, Claude Code, Windsurf, Cline, Copilot, Aider, and general/"Generic" agent support); naming and positioning precedent for developer tools built on non-English linguistic roots.

Out of scope: Kramak's internal architecture quality (covered by other sessions in this program) and general LLM capability benchmarking unrelated to process or orchestration.

Prioritize official documentation, GitHub repositories and READMEs, release notes, and primary announcement sources over secondary blog coverage or SEO-optimized "best AI coding tools" roundups. Where a claim exists only in marketing copy, grade it as such rather than treating it as settled fact.

## APPROACH

Start broad — establish the current shape of the whole landscape before drilling into any one competitor — then let what you find determine where to go deeper. If you discover a framework or feature that materially threatens the "Process is an unserved layer" claim, or a competitor whose adapter/integration footprint already exceeds 8 IDEs, treat that as the most important finding, not a footnote. Actively look for evidence that would disprove Kramak's positioning, not only evidence that supports it — a landscape scan that only confirms priors from the founder's own comparison docs has failed at its job. Where sources disagree — on how mature a competing framework's governance is, or how stable a given IDE's extension/agent API is — report the disagreement and both positions rather than picking whichever sounds more authoritative. Don't stop at the tools named above if the trail leads to something newer or more directly competitive.

## DELIVERABLE

Give the Principal Architect a decision-ready view, not a survey. Your output must include:

- A direct recommendation on **adapter strategy**: which of the 8 target integrations are worth building and maintaining an adapter for today, based on each ecosystem's actual stability and agent-extensibility, not just popularity — and at least three genuinely distinct options weighed, not a single default (for example: maintain all 8; consolidate to a smaller core set plus a documented extension pattern for the rest; conclude that per-IDE adapters are the wrong model entirely).
- A direct recommendation on **naming and positioning**: whether "Kramak," its Sanskrit meaning, and "the missing SDLC for AI agents" tagline hold up against the real competitive set you find, with a specific alternative framing if you conclude the current one doesn't — again with distinct options weighed (keep name and tagline; keep the name but change the tagline; conclude the positioning problem runs deeper than naming).
- Deep, side-by-side analysis of the top contenders you identify — expect this to include GitHub Spec Kit, RIPER-5, Aider, Devin, and OpenHands, but let your research determine the final list — covering what each actually does for phase/process structure, how it persists state, how it's governed, and how mature its integration footprint is.
- Inline evidence grades on every specific claim (adoption figures, feature availability, governance model, release cadence): base grade **A** (official docs/RFCs/source code) · **B** (peer-reviewed or independently reproduced empirical claims) · **C** (vendor claims, press releases, marketing copy) · **D** (blog posts, tutorials, or anything reconstructed from model recall) · **E** (unverifiable). Modifiers on each: corroboration (**single** / **corroborated** by 2+ independent sources / **contested**), recency (**fresh** — updated within roughly the last 3 months / **aging** / **stale**), directness (**direct** / **indirect**, inferred). Verification tag: **fetched** / **cached** / **recalled** / **secondhand** / **human-provided** — anything tagged recalled is capped at Grade D no matter how confident it sounds.
- An Open Risks section with a concrete reversal trigger for each risk — a specific future event (e.g., "if Spec Kit ships a governed multi-agent extension mechanism before Q1 2027") that would flip your adapter-strategy or naming recommendation.

## FORMAT

Produce one complete Markdown file. Open with YAML frontmatter using these exact values for the fixed fields, and your own judgment for the rest:
- id: T1-01
- title: Competitive & Prior-Art Landscape
- date: 2026-08-18
- status: complete, or needs-follow-up with a one-line reason if you hit a genuine research dead end
- topic: competitive-landscape
- tags: 3–6 short tags you choose based on what you actually cover
- informs_decisions: [D-007, D-008]
- confidence: your overall confidence (high/medium/low) plus a one-sentence justification

Body, in this order: **Research Question** (restate what this session resolves, in a sentence or two) → **Key Findings** (3–7 bullets — the load-bearing discoveries) → **Recommendation** (your adapter-strategy and naming/positioning calls, stated plainly) → **Alternatives Considered** (the options you weighed and why you didn't pick them — don't delete rejected options, this is the record that has to survive) → **Detailed Findings** (the full competitive analysis, evidence-graded inline as specified above) → **Open Questions & Risks** (with reversal triggers) → **Sources & Evidence Ledger** (every source used, with its grade and verification tag, so the grading can be audited without redoing the research).
```

### T1-02 — Research Literature: Orchestration & Safety

> **Session file:** `sessions/T1-02-orchestration-research-literature.md` · **Layer:** 0 · **Route:** Discovery · **Decisions informed:** background only — D-001, D-002, D-003, D-004, D-009 · **Dependencies:** none — fully unblocked

Copy everything in the box below into a fresh chat with a deep-research-capable model.

```
## BRIEF

I'm the founder of Kramak (क्रमक), a file-based, model-agnostic methodology for autonomous AI-driven software development. It runs a 5-state loop — BOOTSTRAP → PLANNING → EXECUTING → AUDITING → back to PLANNING, plus a WAITING side-state — where a high-reasoning "planner" model creates Work Items and a faster "executor" model implements them one at a time, then performs a technical self-audit whose findings route back to the planner. All state persists in a state.json file validated against a JSON Schema, specifically so an interrupted or crashed session can resume without losing progress. Two governance mechanisms sit on top of this loop: an "Anti-Bias Guard" — a 5-point checklist the pipeline must pass before it's allowed to modify its own specification files — and a "Circuit Breaker," a hard stop meant to prevent infinite audit-fix-audit cycles. A separate mechanism, "Grounded Verification," requires that every specification quote actual code from the target repository, confirmed by a grep-style check, specifically to reduce hallucinated specs. Work Items are capped at roughly 2 hours of execution time — a limit I set citing METR's AI-task-length research — and each Work Item's spec detail scales across three tiers (fully guided before/after diffs, directed intent-plus-constraints, or outcome-only goal-plus-criteria) depending on assessed risk.

None of this was derived from the agentic-AI or AI-safety research literature — it came from 24 iterations of solo, intuition-driven development. I need to know whether it's actually consistent with what's published, where it diverges, and where the literature suggests something I haven't considered. This is background input for several architectural decisions being researched in depth elsewhere in this program (state topology, role separation, self-improvement governance, and schema/parameter choices) — your job isn't to make those calls, it's to give the sessions that do make them an accurate map of what the literature says, including where it's silent or contested.

Audience: a Principal Architect who wants these mechanisms graded against published research, not against the founder's own confidence.

## SCOPE

Anchor to 2026-08-18. Agentic-AI and LLM-safety research has been moving fast enough that anything recalled from training rather than freshly checked should be treated as possibly superseded, especially specific benchmark results and paper findings.

In scope, four threads: (a) plan-execute-reflect loop architectures in single- and multi-agent LLM systems, and their documented failure modes; (b) grounding and anti-hallucination techniques specifically for AI-generated specifications or plans, as distinct from grounding for general question-answering; (c) safety research on self-modifying and self-improving AI systems, including circuit-breaker patterns and governance for recursive self-improvement; (d) empirical software-engineering research on AI-agent task sizing and context/attention limits — including a direct check of the specific METR task-horizon research I'm citing for the 2-hour Work Item cap, to confirm the citation is being applied correctly and not just gestured at.

Out of scope: product reviews or competitor feature comparisons (covered by a separate session in this program); general LLM capability leaderboards unrelated to orchestration or safety.

Prioritize peer-reviewed papers, preprints from recognized labs (arXiv, ACL, NeurIPS, ICLR, safety-focused research organizations), and primary research-lab publications over blog summaries of papers — flag clearly whenever you're relying on a secondary summary rather than the primary source.

## APPROACH

Start with a broad survey of each of the four threads to establish what's settled, what's actively contested, and what's simply thin, before drilling into specific papers. Let what you find shape where you spend the remaining effort — if one thread turns out to have far more directly relevant published work than another, follow that imbalance rather than forcing equal coverage. Explicitly seek findings that would undercut Kramak's design choices, not only ones that validate them — a governance mechanism that "sounds reasonable" surviving contact with zero disconfirming search is a red flag about the search, not a clean bill of health for the mechanism. Where the literature itself is split — on how well grounding techniques generalize to structured technical specs, say, or on the safety implications of recursive self-critique — report the split explicitly rather than resolving it for the reader. Verify the METR citation specifically rather than assuming the founder's characterization of it is accurate; check what the research actually measured and whether "2-hour work items" is a reasonable derived threshold or a strained one.

## DELIVERABLE

This output feeds several downstream architectural decisions, so organize it by thread rather than as a flat literature dump. It must include:

- For each of the four in-scope threads, a clear statement of what the current research consensus is (if one exists), what's contested, and what's simply unstudied.
- A direct, sourced assessment of whether Grounded Verification, the Anti-Bias Guard, the Circuit Breaker, and the 2-hour Work Item cap are consistent with, contradicted by, or simply untouched by the literature — treat "the literature doesn't address this" as a legitimate and important finding, not a gap to paper over.
- Where you find academic or lab work proposing an approach Kramak doesn't currently use — for grounding, for loop-failure recovery, for self-modification governance, or for task sizing — name it specifically as an alternative worth downstream sessions weighing, not just noted as existing in the abstract.
- Inline evidence grades on every factual claim: base grade **A** (official docs/RFCs/source code) · **B** (peer-reviewed or independently reproduced empirical work) · **C** (vendor claims, marketing, press) · **D** (blog posts, tutorials, or model recall) · **E** (unverifiable). Modifiers: corroboration (**single** / **corroborated** / **contested**), recency (**fresh** / **aging** / **stale**), directness (**direct** / **indirect**). Verification tag: **fetched** / **cached** / **recalled** / **secondhand** / **human-provided** — anything recalled rather than fetched is capped at Grade D regardless of confidence. Peer-reviewed findings should generally ground out at B, not A — reserve A for primary technical documentation, not empirical results.
- An Open Risks section noting where absence of evidence is being treated as evidence of safety (a known failure mode when citing research) versus genuinely unstudied territory, with a note on what would need to be true for each risk to resolve.

## FORMAT

Produce one complete Markdown file. Frontmatter:
- id: T1-02
- title: Research Literature: Orchestration & Safety
- date: 2026-08-18
- status: complete, or needs-follow-up with a one-line reason
- topic: research-literature
- tags: 3–6 tags you choose (e.g. agentic-loops, ai-safety, grounding, task-sizing)
- informs_decisions: [D-001, D-002, D-003, D-004, D-009] — background only; this session doesn't own a decision directly
- confidence: high/medium/low plus a one-sentence justification

Body: **Research Question** → **Key Findings** (3–7 bullets) → **Recommendation** (here: a synthesis judgment on which mechanisms are literature-consistent, literature-contradicted, or literature-silent — not a design decision, which is out of scope for this session) → **Alternatives Considered** (approaches the literature surfaces that Kramak doesn't currently use) → **Detailed Findings** (organized by the four threads) → **Open Questions & Risks** → **Sources & Evidence Ledger**.
```

---

## Layer 1 — Architectural Decisions

### T1-03 — State Topology & Crash Recovery

> **Session file:** `sessions/T1-03-state-topology.md` · **Layer:** 1 · **Route:** Deep Research (1 of 2, joint with T1-04) — one-way door · **Decisions informed:** D-001 · **Dependencies:** none — soft/advisory only (T1-01, T1-02, if available)

Copy everything in the box below into a fresh chat with a deep-research-capable model.

```
## BRIEF

I'm the founder of Kramak (क्रमक), a file-based, model-agnostic methodology for autonomous AI-driven software development, built as a 5-state finite-state loop: BOOTSTRAP → PLANNING → EXECUTING → AUDITING, looping back to PLANNING, with WAITING modeled as a side-state reachable from PLANNING or EXECUTING (used, for example, when the pipeline needs human input mid-project). State is externalized entirely to a state.json file validated against a JSON Schema, so that if a session crashes, the model is swapped, or the IDE restarts, a fresh agent session can read state.json and resume exactly where the prior one left off — this "State Reconciliation" crash-recovery model is one of Kramak's core claimed differentiators. In PLANNING, a high-reasoning model reads the codebase and produces Work Items; in EXECUTING, a faster model implements them one at a time; in AUDITING, the executor performs a technical self-audit and routes findings back to PLANNING. This topology has been through 24 iterations of solo development but was never benchmarked against alternative topologies, or against how comparable tools — GitHub Spec Kit's phase artifacts, Devin's internal state/"Wiki" model, OpenHands' session model — actually persist and recover state.

I need to know whether 5 states plus a side-state is the right shape — too coarse, too granular, or structurally wrong (is WAITING really a peer state, or should it be a sub-state or a flag on whichever state it interrupts?) — and whether State Reconciliation actually holds up as a crash-recovery strategy against known agentic-loop failure modes, not just against the failure modes I happened to think of myself. This is a one-way door: once adopters build tooling, adapters, and their own automation against state.json's shape and the FSA's topology, changing either becomes a breaking change for every in-flight project, so I need to get it right — or deliberately wrong for a good, load-bearing reason — before a v1.1 release locks it in further.

Audience: a Principal Architect deciding whether to revise the FSA before broader adoption makes its current shape a de facto contract. This decision is being treated as irreversible, so it needs production-grade rigor, not a quick gut check.

## SCOPE

Anchor to 2026-08-18.

In scope: finite-state-machine and workflow-engine design patterns as applied to, or transferable from, agentic AI systems and general long-running-process systems; how comparable AI-development frameworks and agent platforms model and persist state, and specifically how they recover from interruption — crash, timeout, context overflow, human interruption — including but not limited to GitHub Spec Kit, Devin, OpenHands, and Aider; general crash-recovery and checkpoint/resume patterns from distributed systems and workflow orchestration (for example the saga pattern, state-machine checkpointing, idempotent replay) to the extent they transfer to a single-machine, file-based, non-networked context; documented failure modes specific to plan-execute-reflect loops in LLM agents (stuck loops, state drift, partial-completion ambiguity).

Out of scope: whether planner and executor should be different models at all — that's a separate, parallel session's territory; treat the existence of distinct planning, execution, and auditing phases as given, and focus purely on how many states, what shape, and how state persists and recovers across them. Also out of scope: self-improvement governance mechanisms (Anti-Bias Guard, Circuit Breaker), covered elsewhere.

If prior session output on the competitive landscape or the orchestration/safety literature is available to you, use it as informative context on how competitors persist state and what the literature says about loop failure modes — but produce a complete, standalone analysis even without it.

Prefer official docs, published architecture descriptions, and source code where public, over secondhand blog descriptions of how a given tool "probably" works internally.

## APPROACH

Start by mapping the general design space for phase-based, stateful agentic loops before evaluating Kramak's specific 5-plus-1 shape against it — you want to know what the space of reasonable alternatives looks like, not just whether Kramak's current choice is defensible in isolation. From there, let your findings drive where you dig deeper: if you find a documented failure mode that the State Reconciliation model doesn't obviously handle — partial-write corruption of state.json, ambiguity about which Work Item was "in progress" at crash time, drift between state.json and the actual repository contents — treat resolving that as more important than confirming the parts that already look fine. Actively look for reasons the current topology is wrong: too many states creating unnecessary transition overhead, too few states collapsing meaningfully different situations into one, or WAITING modeled at the wrong level — rather than defaulting to confirming the founder's design. Where sources disagree about the right way to model interruption and resume — some favoring explicit sub-states, others favoring flags or metadata on a coarser state — surface the disagreement rather than picking a side for the reader.

## DELIVERABLE

Because this is a one-way-door decision, your output needs to do more than describe options — it needs to leave a clean paper trail. It must include:

- A direct recommendation: keep the current 5-state-plus-WAITING topology as-is, revise its shape (state exactly how — for example "collapse AUDITING into EXECUTING," "promote WAITING to a genuine peer state with its own entry/exit contract," "add an explicit FAILED or RECOVERING state"), or replace it with a materially different model — plus a similarly direct verdict on whether State Reconciliation, as described, is adequate crash recovery or needs a specific structural change.
- At least two genuine alternatives explicitly evaluated and rejected, with the reasoning spelled out, not just named in passing — for example a simpler 3-state loop, a sub-state/flag-based model for WAITING instead of a peer state, or an event-sourced/append-only log model instead of a single mutable state.json snapshot.
- Deep, comparative analysis of how your identified top contenders actually model and recover state — expect Spec Kit, Devin, and OpenHands to be relevant, but let the research determine the final set — the specific mechanism each uses, not just that it "has state."
- An explicit compatibility check: confirm your recommendation doesn't silently require a mandatory runtime dependency, doesn't require knowing which model is in use, and doesn't assume a specific IDE — flag clearly if any option you evaluated would violate one of these.
- Inline evidence grades on every factual claim: base grade **A** (official docs/RFCs/source code) · **B** (peer-reviewed/empirical) · **C** (vendor claims) · **D** (blog/tutorial/recall) · **E** (unverifiable). Modifiers: corroboration (**single** / **corroborated** / **contested**), recency (**fresh** / **aging** / **stale**), directness (**direct** / **indirect**). Verification tag: **fetched** / **cached** / **recalled** / **secondhand** / **human-provided**, with recalled claims capped at Grade D. This decision needs 2+ independent corroborating sources to clear its review gate — flag explicitly wherever your core recommendation currently rests on only one.
- An Open Risks section where each risk carries a concrete reversal trigger — a specific future condition that would flip the recommendation. This decision is tracked as irreversible, so vague risk language isn't sufficient here.

## FORMAT

Produce one complete Markdown file. Frontmatter:
- id: T1-03
- title: State Topology & Crash Recovery
- date: 2026-08-18
- status: complete, or needs-follow-up with a one-line reason
- topic: state-machine-design
- tags: 3–6 tags you choose (e.g. fsa-topology, crash-recovery, state-json)
- informs_decisions: [D-001]
- confidence: high/medium/low plus a one-sentence justification

Body: **Research Question** → **Key Findings** (3–7 bullets) → **Recommendation** → **Alternatives Considered** (the rejected topologies, with rationale — this record has to survive even though it's not the final answer) → **Detailed Findings** → **Open Questions & Risks** (each with a reversal trigger) → **Sources & Evidence Ledger**.
```

### T1-04 — Role Separation, Capability Gating & Multi-Agent Evolution

> **Session file:** `sessions/T1-04-role-separation-multiagent.md` · **Layer:** 1 · **Route:** Deep Research (2 of 2, joint with T1-03) — one-way door for D-002, two-way watch-item for D-010 · **Decisions informed:** D-002, D-010 · **Dependencies:** none — soft/advisory only (T1-02, if available)

Copy everything in the box below into a fresh chat with a deep-research-capable model.

```
## BRIEF

I'm the founder of Kramak (क्रमक), a file-based, model-agnostic methodology for autonomous AI-driven software development, that splits cognitive labor across two roles inside its PLANNING/EXECUTING/AUDITING loop: a "planner" — intended to be a high-reasoning model (my working examples: Opus-class, o3-class, Gemini-Pro-class) — that reads the codebase, assesses state, and writes Work Items with grounded specifications; and an "executor" — intended to be a faster, more precise model (Sonnet-class, 4o-class, Flash-class) — that implements Work Items one at a time and, after a batch, performs a technical self-audit whose findings route back to the planner. Kramak is required to be model-agnostic: nothing in the spec is allowed to check a model's name or vendor. Instead, a "Capability Gate Check" mechanism asks a model to self-assess whether it has the reasoning capability a given role requires, rather than Kramak — or the adopter's own tooling — hardcoding "use model X for this, model Y for that." Today's implementation assumes exactly one planner session and one executor session at a time; it has no concept of parallel sub-agents.

I need two things resolved here, because they're two faces of the same architectural bet. First: is splitting "architect" and "executor" across model tiers actually empirically justified, or does a single capable model running the whole PLANNING→EXECUTING→AUDITING loop itself perform just as well — or better, with less handoff overhead and less risk of a grounded spec getting lossy in translation to the executor? Second, and more forward-looking: 2026 tooling increasingly supports genuine multi-agent parallelism — Antigravity has subagent support, Claude Code has native parallelism, OpenHands runs multiple agents concurrently, and Devin's internal architecture is already described as a compound or swarm model rather than one agent per role. Should Kramak's core loop evolve toward parallel orchestration — for example multiple executors working different Work Items concurrently under one planner — or is single-agent-per-phase a deliberate, defensible simplicity choice rather than a limitation to be engineered away? This second question is being tracked as a reversible, watch-and-revisit decision rather than something that needs resolving now, but I still need a real, evidence-based recommendation on it, not a placeholder.

Audience: a Principal Architect setting the core role model for v1.x and deciding how much runway to leave for a future multi-agent version, without over- or under-building for a parallelism wave that may or may not be ready to build on yet.

## SCOPE

Anchor to 2026-08-18 — subagent and parallelism support in specific coding tools is exactly the kind of feature that could have shipped, changed, or been deprecated in the months since early 2026, so verify current capability rather than assuming.

In scope: empirical or well-documented evidence, not just intuition or marketing, on whether splitting planning and execution across different models or capability tiers improves outcomes versus a single-model loop, in coding or adjacent structured-reasoning tasks; how capability-based self-assessment, as opposed to model-identity checking, is implemented elsewhere, and what's known about its reliability — does asking a model "are you capable enough for this role" produce a trustworthy signal, or is that a known-unreliable pattern; the current, verified state of multi-agent or subagent support in Antigravity, Claude Code, OpenHands, and Devin's internal architecture, and what orchestration pattern each actually uses — true parallelism, sequential delegation, or something else.

Out of scope: the state-machine topology question of how many phases exist and how they persist — that's a separate, parallel session's territory; treat the existence of a planning phase and an execution phase as given, and focus on who or what fills those roles and how many of them there can be at once. Also out of scope: self-improvement and governance mechanisms, covered elsewhere.

If the orchestration/safety literature session's output is available to you, treat it as informative background on plan-execute-reflect architectures — but this session must stand on its own and produce a complete deliverable without it.

Prefer primary documentation — official docs, changelogs, published architecture writeups from the tool vendors themselves — and any available empirical research over marketing claims about "autonomous coding agents," a space prone to overstating capability.

## APPROACH

Start broad on the underlying question — does role or capability separation empirically help in agentic coding workflows at all — before narrowing to Kramak's specific two-tier, two-session implementation. Let what you find about capability-based self-assessment's reliability shape how hard you push on the multi-agent question: if self-assessment turns out to be a shaky signal even for a two-role system, that's directly relevant to whether adding more concurrent agents multiplies that unreliability. Seek out evidence that would argue against role separation — cases where a unified single-agent loop matched or beat a split architecture, or where handoff between planner and executor introduced its own class of errors (lossy spec translation, an executor "improvising" beyond what was grounded) — rather than only collecting evidence that a planner/executor split is sensible. Where a vendor's own claims about its multi-agent or parallelism features are the only source available, treat that as Grade C and say so, rather than upgrading it because the vendor sounds confident.

## DELIVERABLE

This session resolves two decisions with different stakes — one is a one-way door, the other is a tracked, reversible watch-item — so hold them to different evidentiary bars, but cover both fully. It must include:

- A direct recommendation on the **planner/executor split**: is the high-reasoning-planner / fast-executor division empirically justified, should it remain but be implemented differently at the boundary, or should Kramak collapse toward a single-agent loop — plus a direct, concrete assessment of whether the current Capability Gate Check mechanism is a reliable way to implement model-agnostic role assignment, or needs a different mechanism.
- A direct recommendation on **multi-agent evolution**: should Kramak's roadmap begin building toward parallel/multi-agent orchestration now, deliberately defer it with a specific named trigger condition to revisit, or treat single-agent-per-phase as a durable design choice rather than a temporary limitation — and why.
- At least two genuine alternatives explicitly evaluated and rejected for the role-split question — for example a single unified model for the whole loop, a three-way split with a dedicated auditor model rather than the executor doing double duty, or capability tiers determined by task-complexity scoring rather than self-assessment.
- Deep analysis of how your identified top contenders handle this — expect Devin's planner/swarm split and OpenHands' multi-agent orchestration to be directly relevant, alongside whatever current subagent support Antigravity and Claude Code actually have — the specific mechanism each uses, not just that it "supports multiple agents."
- An explicit compatibility check: any recommendation must remain genuinely model-agnostic, with no model-name-checking even implicitly, and must not introduce a mandatory runtime dependency — flag clearly if an option you evaluated (a specific multi-agent orchestration library, for instance) would violate either.
- Inline evidence grades on every factual claim: base grade **A** (official docs/RFCs/source code) · **B** (peer-reviewed/empirical) · **C** (vendor claims) · **D** (blog/tutorial/recall) · **E** (unverifiable). Modifiers: corroboration (**single** / **corroborated** / **contested**), recency (**fresh** / **aging** / **stale**), directness (**direct** / **indirect**). Verification tag: **fetched** / **cached** / **recalled** / **secondhand** / **human-provided**, with recalled claims capped at Grade D. The role-split recommendation, as a one-way door, needs 2+ independent corroborating sources — flag explicitly if it currently rests on fewer.
- An Open Risks section with a reversal trigger for each risk. For the multi-agent question specifically, the reversal trigger IS the mechanism by which that decision gets revisited, so make it concrete and checkable — a specific capability, adoption threshold, or tooling milestone — not vague language like "if things change."

## FORMAT

Produce one complete Markdown file. Frontmatter:
- id: T1-04
- title: Role Separation, Capability Gating & Multi-Agent Evolution
- date: 2026-08-18
- status: complete, or needs-follow-up with a one-line reason
- topic: role-architecture
- tags: 3–6 tags you choose (e.g. planner-executor-split, capability-gating, multi-agent-orchestration)
- informs_decisions: [D-002, D-010]
- confidence: high/medium/low plus a one-sentence justification

Body: **Research Question** → **Key Findings** (3–7 bullets) → **Recommendation** (state both calls clearly, as separate sub-points) → **Alternatives Considered** → **Detailed Findings** → **Open Questions & Risks** → **Sources & Evidence Ledger**.
```

### T1-05 — Self-Improvement Governance

> **Session file:** `sessions/T1-05-self-improvement-governance.md` · **Layer:** 1 · **Route:** Fast Spike — two-way door · **Decisions informed:** D-003, D-009 (Capability Gate part) · **Dependencies:** none — soft/advisory only (T1-02, if available)

Copy everything in the box below into a fresh chat with a deep-research-capable model.

```
## BRIEF

I'm the founder of Kramak (क्रमक), a file-based, model-agnostic methodology for autonomous AI-driven software development whose PLANNING→EXECUTING→AUDITING loop is itself allowed to propose changes to its own specification files — the methodology can evolve its own spec documents and templates based on what it learns from running real projects. Three mechanisms currently guard that process: an "Anti-Bias Guard" — a 5-point checklist the pipeline must pass before any self-modification of its own spec files is allowed, intended to prevent recency bias (over-weighting the last thing that went wrong) from corrupting the methodology over time; a "Circuit Breaker" — a hard stop intended to prevent infinite audit-fix-audit loops, where the executor keeps "fixing" a Work Item, the audit keeps finding new issues, and the cycle never terminates; and a "Capability Gate Check" — the self-assessment mechanism a model uses to judge whether it's capable enough for the role it's about to perform, which matters here because an unreliable capability self-assessment is itself a self-trust risk. All three were designed from my own 24 iterations of experience, not from safety research on self-modifying systems.

I need a fast, sharp check on whether these three mechanisms are actually adequate against what's known about recursive self-modification failure modes and self-critique loop failures — not a full literature survey, since a separate, broader session in this program already covers that wider landscape, but a targeted spike specifically asking: where would each of these three mechanisms plausibly fail, and is there a materially stronger, still-lightweight alternative I should be using instead? This is being tracked as a reversible decision — these are checklist and threshold mechanisms in markdown files, not load-bearing architecture, so they can be revised without breaking adopters — but reversible doesn't mean unimportant: this is Kramak's core trust claim, that it's safe to let an autonomous pipeline modify its own rules, and a checklist that looks reasonable but doesn't actually catch real failure modes is a liability worth finding now.

Audience: a Principal Architect who needs to know whether a foundational trust and safety claim is actually defensible, and wants concrete gaps surfaced, not a validation exercise.

## SCOPE

Anchor to 2026-08-18.

In scope: known failure modes of self-critique and self-audit loops in LLM systems — both the "audit-fix-audit never terminates" failure and subtler ones, like an audit that's systematically blind to a class of errors because the same model, or a similarly biased model, both wrote and is now checking the work; documented patterns for governing recursive self-modification in AI or software systems, at whatever level of rigor is actually available — this includes formal AI-safety research on recursive self-improvement and more mundane precedent from adjacent domains (self-modifying configuration systems, auto-tuning systems, CI/CD pipelines that can modify their own pipeline definitions) where a lighter-weight but still-informative precedent may exist; specifically, the reliability of self-assessment or self-reported-capability mechanisms — is a model asking itself "am I capable enough for this" a mechanism with any track record, positive or negative.

Out of scope: the broader plan-execute-reflect literature survey, already covered by a separate session in this program — go narrower and faster here, specifically on self-modification and self-critique governance, not the general landscape. Also out of scope: the state-machine and role-separation questions, covered elsewhere.

Given the fast-spike nature of this session, it's fine to lean on a smaller set of well-chosen, high-quality sources rather than attempting exhaustive coverage — but say explicitly where you've made that tradeoff.

## APPROACH

Move quickly to the specific question rather than re-surveying the general agentic-AI landscape — this is a spike, not a deep-research pass. Start from the three mechanisms as given and actively try to break each one: what's the most plausible way the Anti-Bias Guard's 5-point checklist gets satisfied on paper while the underlying bias persists anyway? What's the most plausible way the Circuit Breaker's threshold gets tuned so loosely it doesn't fire before real damage, or so tightly it blocks legitimate iterative fixes? What's the most plausible way a model's self-reported capability assessment is wrong, and in which direction — over-confident or under-confident — is that error more likely and more costly? If you find a concrete, known pattern that addresses any of these gaps better than what Kramak currently has, even a partial or lightweight one, surface it specifically rather than only critiquing the status quo. Don't soften findings to be encouraging — the point of this spike is to find out whether the trust claim survives scrutiny, not to reassure the founder.

## DELIVERABLE

Because this is a two-way-door, fast-spike session, your recommendation needs at least one solid source behind it but doesn't need the exhaustive multi-source corroboration a one-way decision would — if you end up relying on Grade C or D evidence for part of your answer, say so explicitly and explain why that's an acceptable tradeoff for a mechanism that's cheap to revise later. Your output must include:

- A direct verdict, mechanism by mechanism, on whether the Anti-Bias Guard, the Circuit Breaker, and the Capability Gate Check are adequate as designed, need a specific named modification, or should be replaced — don't hedge into "it depends" without also giving your actual read.
- At least one concrete alternative or strengthening for any mechanism you find inadequate — a spike that only says "this might not be enough" without proposing what "enough" would look like hasn't done its job.
- An options evaluation: for each mechanism, briefly note what a stronger version would look like and what it would cost, in complexity and adopter friction, versus the current lightweight version. This pipeline defaults to commodity, off-the-shelf patterns over bespoke ones wherever a viable established pattern exists — flag clearly if a known, established governance pattern could replace a bespoke Kramak mechanism.
- Inline evidence grades on every factual claim: base grade **A** (official docs/RFCs/source code) · **B** (peer-reviewed/empirical) · **C** (vendor claims) · **D** (blog/tutorial/recall) · **E** (unverifiable). Modifiers: corroboration (**single** / **corroborated** / **contested**), recency (**fresh** / **aging** / **stale**), directness (**direct** / **indirect**). Verification tag: **fetched** / **cached** / **recalled** / **secondhand** / **human-provided**, with recalled claims capped at Grade D.
- An Open Risks section with a review trigger for each item — a condition under which this reversible decision should be revisited regardless of the normal review cadence, for example "if Kramak's self-modification feature sees real adopter usage and produces a documented bad outcome, re-open this immediately."

## FORMAT

Produce one complete Markdown file. Frontmatter:
- id: T1-05
- title: Self-Improvement Governance
- date: 2026-08-18
- status: complete, or needs-follow-up with a one-line reason
- topic: self-modification-governance
- tags: 3–6 tags you choose (e.g. anti-bias-guard, circuit-breaker, capability-gate, recursive-self-improvement)
- informs_decisions: [D-003, D-009]
- confidence: high/medium/low plus a one-sentence justification

Body: **Research Question** → **Key Findings** (3–7 bullets) → **Recommendation** → **Alternatives Considered** → **Detailed Findings** → **Open Questions & Risks** → **Sources & Evidence Ledger**.
```

### T1-06 — Framework Evolution & Parameter Audit

> **Session file:** `sessions/T1-06-framework-evolution-parameter-audit.md` · **Layer:** 1 · **Route:** Confirm + Fast Spike, bundled 4 parts — one-way door for D-004, two-way for the rest · **Decisions informed:** D-004, D-005, D-006, D-009 (remainder) · **Dependencies:** none — soft/advisory only (T1-01, if available)

Copy everything in the box below into a fresh chat with a deep-research-capable model.

```
## BRIEF

I'm the founder of Kramak (क्रमक), a file-based, MIT-licensed, zero-runtime-dependency methodology for autonomous AI-assisted software development — pure markdown specs, JSON Schema, and templates, with no mandatory CLI, package, or install. Version 1.0.0, released August 2026, ships 48 files, including two large specification documents (PLANNER.md at roughly 41.5 KB, EXECUTOR.md at roughly 17.7 KB), a state.json file whose shape is validated against a JSON Schema, and an optional set of supporting scripts — init.sh/init.ps1 bootstrappers and a validate.js integrity checker — that adopters can use but that the methodology doesn't require. Several concrete design parameters were set by intuition across 24 development iterations rather than by external benchmark: a 6-category "Failure Taxonomy" for diagnosing why a Work Item failed, a "Polish Ceiling Rule" intended to stop the executor from over-engineering beyond what a Work Item's spec called for, and a roughly 2-hour cap on Work Item scope, which I've attributed to METR's AI-task-duration research without independently re-checking it in this context.

This session bundles four separable but similarly scoped questions, all reversible except the schema-versioning question, which is treated as irreversible once adopters have live projects running against a given state.json shape:

1. **Spec size vs. adoption.** Is 41.5 KB plus 17.7 KB of required reading, before an agent or human can use Kramak, a real adoption barrier — and if so, does restructuring toward progressive disclosure (a short quick-start surface with the full spec as reference material, rather than one monolithic document) solve it?
2. **state.json schema versioning.** How should Kramak version this schema going forward without breaking adopters' in-flight projects — what does established config and schema-versioning practice, not bespoke invention, suggest?
3. **Pure-methodology vs. optional tooling.** Kramak currently ships zero mandatory runtime dependencies as a deliberate purity claim. Is an optional, never-mandatory CLI or validator layer, in the spirit of what GitHub Spec Kit ships, worth adding — or does it undermine the "pure files, any agent can read them" positioning that differentiates Kramak?
4. **Parameter audit.** Do the Failure Taxonomy's 6 categories, the Polish Ceiling Rule, and the 2-hour Work Item cap — re-checking the METR citation specifically — actually hold up, or were they set from intuition in a way that doesn't survive scrutiny?

Audience: a Principal Architect scoping exactly what changes before or alongside a v1.1 release — every one of these four sub-questions needs a real, usable answer, not a general validation.

## SCOPE

Anchor to 2026-08-18.

In scope: (1) precedent and any available research on how documentation and onboarding size affects developer-tool adoption, and progressive-disclosure documentation patterns specifically — how other complex specs or standards structure a short path in alongside full reference depth; (2) established schema and config-versioning practice — semantic versioning, deprecation windows, migration tooling — as used by Kubernetes CRDs, Terraform state files, JSON:API, or comparable precedent, applied to a small, file-based, non-networked JSON Schema context, not a database-migration context; (3) how GitHub Spec Kit specifically justifies and scopes its optional CLI layer, and any other comparable "pure spec, optional tooling" precedent in developer tools; (4) whatever direct evidence exists for or against 6-category failure taxonomies in software-engineering diagnostic frameworks, for "ceiling" or anti-overengineering rules in AI-agent task execution, and a direct re-check of the METR AI-task-duration research to confirm what it actually measured and whether a 2-hour Work Item cap is a reasonable derived threshold.

Out of scope: the state machine's topology and crash recovery, and the self-improvement governance mechanisms — both covered by separate sessions in this program, even though schema versioning here touches state.json's shape; keep this session's schema-versioning sub-question scoped to how to version changes safely, not what the schema should contain.

If a prior session's competitive-landscape output is available to you, use it for sub-question 3 specifically — Spec Kit's tooling choice — but this session should stand on its own and produce a complete answer to all four sub-questions without it.

Prefer official versioning specifications (SemVer, JSON Schema versioning guidance), primary vendor documentation (Kubernetes, Terraform, GitHub Spec Kit's own docs), and the METR paper itself over secondary commentary.

## APPROACH

Treat this as four fast, focused sub-investigations rather than one diffuse one — establish a broad view of the relevant precedent for each sub-question, then go deep only where you find something that would actually change the founder's plans. Weight your effort toward wherever the evidence is thin or surprising, not evenly across all four. Default to recommending established, off-the-shelf patterns over bespoke ones for all four sub-questions — this program's stated bias is to reserve "build something custom" for Kramak's actual proprietary logic, the methodology itself, not its supporting infrastructure like versioning schemes or documentation structure, so if you find yourself about to recommend a bespoke solution, treat that as a claim that needs unusually strong justification, not a default. For the parameter audit specifically, actively try to find evidence that the Failure Taxonomy, the Polish Ceiling Rule, or the 2-hour cap are wrong or arbitrary, rather than confirming they're plausible — and check the METR citation against what the paper actually says, not against how the founder has characterized it.

## DELIVERABLE

Structure your output around the four sub-questions clearly, so a reader can find each decision's answer without re-reading the whole document. For each of the four parts, it must include:

- **Spec size:** a direct recommendation — restructure toward progressive disclosure, and roughly how, or leave the current monolithic docs as-is — with the adoption-precedent evidence behind it.
- **Schema versioning:** a direct recommendation for a specific versioning approach for state.json, with at least two alternatives considered and rejected. This is the one-way door in the bundle, so it needs fuller treatment: 2+ independent corroborating sources, and an explicit compatibility check confirming the recommendation doesn't introduce a mandatory runtime dependency.
- **Optional tooling layer:** a direct recommendation on whether to add an optional CLI or validator, benchmarked specifically against Spec Kit's choice, with the tradeoff stated plainly — what an optional layer buys versus what it risks for the "pure methodology" claim.
- **Parameter audit:** a direct, per-parameter verdict on the Failure Taxonomy's 6 categories, the Polish Ceiling Rule, and the 2-hour Work Item cap — keep, revise and specify how, or drop each — including the specific finding on what the METR research actually supports.
- Inline evidence grades on every factual claim across all four parts: base grade **A** (official docs/RFCs/source code) · **B** (peer-reviewed/empirical) · **C** (vendor claims) · **D** (blog/tutorial/recall) · **E** (unverifiable). Modifiers: corroboration (**single** / **corroborated** / **contested**), recency (**fresh** / **aging** / **stale**), directness (**direct** / **indirect**). Verification tag: **fetched** / **cached** / **recalled** / **secondhand** / **human-provided**, with recalled claims capped at Grade D.
- An Open Risks section covering all four parts, each risk with a reversal or review trigger. For schema versioning specifically, the one-way door in this bundle, make the trigger concrete, since it can't be casually revisited later.

## FORMAT

Produce one complete Markdown file. Frontmatter:
- id: T1-06
- title: Framework Evolution & Parameter Audit
- date: 2026-08-18
- status: complete, or needs-follow-up with a one-line reason
- topic: framework-evolution
- tags: 3–6 tags you choose (e.g. schema-versioning, progressive-disclosure, optional-tooling, parameter-audit)
- informs_decisions: [D-004, D-005, D-006, D-009]
- confidence: high/medium/low plus a one-sentence justification

Body: **Research Question** (state all four sub-questions) → **Key Findings** (3–7 bullets spanning the four parts) → **Recommendation** (four clearly labeled sub-recommendations) → **Alternatives Considered** (per sub-question, at minimum for schema versioning and the optional-tooling question) → **Detailed Findings** (organized by the four parts) → **Open Questions & Risks** → **Sources & Evidence Ledger**.
```

---

## Layer 2 — Blueprint

### T1-07 — Architecture Change-Set Blueprint

> **Session file:** `sessions/T1-07-architecture-blueprint.md` · **Layer:** 2 · **Route:** Gated synthesis — consolidation, not fresh research · **Decisions informed:** consolidates T1-03–T1-06 (the full architectural implications of D-001 through D-006, D-009, D-010) · **Dependencies:** hard — T1-03, T1-04, T1-05, and T1-06 must all be complete and pasted in below

Copy everything in the box below into a fresh chat. Light verification of a specific claim is fine if something in the pasted inputs looks stale or inconsistent, but this session's primary job is synthesis, not new web research.

```
## BRIEF

This is a synthesis session, not a fresh research session — treat it accordingly. Kramak (क्रमक) is a file-based, model-agnostic, IDE-agnostic methodology for autonomous AI-driven software development, currently at v1.0.0, built around a 5-state loop (BOOTSTRAP → PLANNING → EXECUTING → AUDITING → back to PLANNING, plus a WAITING side-state), a planner/executor role split, and 12 claimed differentiating mechanisms: Grounded Verification, Anti-Bias Guard, Perspective-Based Planning, Spec Detail Scaling, Failure Taxonomy, Hard Scope Check, State Reconciliation, Circuit Breaker, INBOX System, Human Task Protocol, Auto-Bootstrap, and Capability Gate Check. Four research sessions have just been completed, each producing a verdict on part of this architecture: state topology and crash recovery; role separation, capability gating, and multi-agent evolution; self-improvement governance; and a four-part bundle covering spec complexity, schema versioning, optional tooling, and specific design parameters.

Your job is to consolidate those four session outputs — pasted in below — into one concrete, decision-grade change-set: for each of the 12 claimed innovations, a clear call on whether it ships as-is, needs a specific named revision, or should be deprecated; and a clear statement of what changes, if anything, in state.json's schema, the FSA topology, the planner/executor role model, and the boundary between the core methodology and optional adapters or tooling. This is not a rewrite of Kramak's actual specification prose — a later implementation pass does that. This is the blueprint that pass will work from, so it needs to be unambiguous enough that someone who never read the four source sessions could implement from your blueprint alone.

Audience: a Principal Architect about to start a v1.1 implementation pass who needs one authoritative, non-contradictory change-set, not four separate research memos to reconcile by hand.

## SCOPE

Anchor to 2026-08-18 as this document's compilation date — note explicitly if any input session's findings look like they may have gone stale by the time you're compiling this, for example if there's a long gap between when a session was run and when this synthesis happens.

In scope: full reconciliation of the four input sessions' recommendations against each other and against the 12 claimed innovations and Kramak's fixed constraints — zero mandatory runtime dependencies, model-agnostic with no model-name-checking, IDE-agnostic core spec, MIT license. This includes actively checking for contradictions between sessions — for example, if the state-topology session's recommendation implies a state.json shape the schema-versioning session didn't anticipate, or if the role-separation session's capability-gating recommendation conflicts with a parameter the audit session flagged — and resolving or explicitly flagging each one, rather than silently picking whichever session you read most recently.

Out of scope: producing new research findings not present in, or reasonably inferable from, the four input sessions — if you notice a gap none of them addressed, name the gap explicitly rather than filling it with your own unresearched judgment. Also out of scope: rewriting the actual specification documents — this is the change-set that informs that rewrite, not the rewrite itself.

**Required inputs — paste all four below before running this prompt:** the full session outputs for state topology and crash recovery; role separation, capability gating, and multi-agent evolution; self-improvement governance; and framework evolution and parameter audit. This session cannot produce a valid deliverable without all four — if any is missing, say so plainly and produce only a partial blueprint clearly marked as such, rather than inventing a placeholder for the missing input.

[PASTE T1-03, T1-04, T1-05, AND T1-06 SESSION OUTPUTS HERE BEFORE SENDING]

## APPROACH

Read all four inputs fully before drafting anything, specifically looking for where they agree, where they're independent — covering different ground with no overlap — and where they conflict, even indirectly, through a shared dependency like state.json's shape or the definition of a Work Item. Where two sessions genuinely conflict, don't average or split the difference silently — state both positions, note which has the stronger evidence grade per the source sessions' own grading, and make an explicit call, flagged as a judgment call if the evidence doesn't clearly settle it. Walk through all 12 claimed innovations methodically rather than only addressing the ones the four sessions happened to focus on most — for any innovation none of them touched directly, say explicitly that it's out of this research program's scope and should ship as-is pending future review, rather than silently omitting it.

## DELIVERABLE

Your output is a blueprint, so organize it for someone implementing from it, not someone researching further. It must include:

- A per-innovation list covering all 12 claimed innovations, each marked ship-as-is, revise (with the specific revision), or deprecate, with a one-line reason traceable to a specific input session's finding.
- A consolidated statement of what changes, or explicitly does not change, in: state.json's JSON Schema, the FSA topology (states and transitions), the planner/executor role model and Capability Gate Check mechanism, and the boundary between required core spec and optional tooling or adapters.
- An explicit conflicts-and-resolutions section: every place two input sessions disagreed or had overlapping-but-inconsistent implications, how you resolved it, and why.
- A compatibility check confirming the full consolidated change-set, taken together and not just decision-by-decision, doesn't violate Kramak's fixed constraints — it's possible for four individually compliant recommendations to combine into something that isn't, and that's specifically what this check is for.
- Evidence grades carried through, not re-derived: when you cite a finding from an input session, carry its original grade and verification tag forward rather than re-asserting it as your own fresh claim. If you state something not present in any input — a genuine gap you're flagging, or a synthesis-level judgment call — grade it honestly as your own recall or judgment (D or lower) rather than borrowing the weight of a source you're not actually citing.
- A carried-forward Open Risks section: consolidate the input sessions' risks without dropping any, and add any new risk that only becomes visible once you see all four together — for example a risk that only exists because two recommendations interact.

## FORMAT

Produce one complete Markdown file. Frontmatter:
- id: T1-07
- title: Architecture Change-Set Blueprint
- date: 2026-08-18
- status: complete, or needs-follow-up with a one-line reason (for example, if an input session was missing)
- topic: architecture-blueprint
- tags: 3–6 tags you choose (e.g. change-set, v1.1-planning, synthesis)
- informs_decisions: [D-001, D-002, D-003, D-004, D-005, D-006, D-009, D-010] — this session consolidates the full architectural registry
- confidence: high/medium/low plus a one-sentence justification

Body: **Research Question** (here, the synthesis question — what the v1.1 architecture change-set looks like once the four input sessions are reconciled) → **Key Findings** (3–7 bullets — the headline calls) → **Recommendation** (the full per-innovation and per-subsystem change-set) → **Alternatives Considered** (where a conflict between sessions meant genuinely choosing between two defensible paths) → **Detailed Findings** (the full reconciliation, including the conflicts-and-resolutions section) → **Open Questions & Risks** → **Sources & Evidence Ledger** (here, the four input session files plus any direct light verification you did yourself — not a fresh source list).
```

---

## Sink — Synthesis

### T1-08 — Founding Architecture Document

> **Session file:** `sessions/T1-08-founding-architecture-document.md` · **Layer:** Sink · **Route:** Gated synthesis — consolidation, not fresh research · **Decisions informed:** compiles the full Decision Registry, D-001 through D-010 · **Dependencies:** hard — T1-07 must be complete and pasted in below, along with the finalized Decision Registry

Copy everything in the box below into a fresh chat, with the required inputs pasted in as instructed.

```
## BRIEF

This is the final compilation step of Kramak's Phase 0 research program, not a fresh research session. Kramak (क्रमक) is a file-based, model-agnostic, IDE-agnostic methodology for autonomous AI-driven software development, MIT-licensed, currently at v1.0.0. Phase 0 ran eight research sessions specifically to pressure-test Kramak's 12 claimed innovations and core architecture against external evidence — competitive landscape, academic literature, and targeted deep-research or fast-spike sessions on state topology, role separation, self-improvement governance, and framework and parameter choices — before those choices get locked in further by a v1.1 implementation pass. The immediately prior session already consolidated the four architectural research sessions into a concrete change-set. A parallel process has been recording every individual decision (D-001 through D-010) in a Decision Registry, each one moved from `proposed` to a terminal state — `resolved`, `accepted`, or `deferred` with a review trigger — as its informing session or sessions completed.

Your job is to compile everything — the full research trail and the finalized Decision Registry — into a single Founding Architecture Document: the durable, canonical record of what Kramak's architecture is and why, written for an audience that has not read any of the eight underlying sessions and will not want to. This document is meant to outlive this specific research program — future contributors, and Kramak's own self-improvement cycles, should be able to read it before proposing an architecture change and understand both the current design and the evidence-graded reasoning behind it, without archaeology through eight separate files.

Audience: a future contributor, or a future self-improvement cycle, human or AI, encountering Kramak's architecture for the first time and needing to understand not just what it is, but what's settled, what's provisional, and what's already been tried and rejected.

## SCOPE

Anchor to 2026-08-18 as this document's compilation date — the document should read as a snapshot as of that date, with review triggers doing the work of signaling what might need re-checking later, rather than the document itself trying to predict the future.

In scope: full compilation of all prior research findings and the complete Decision Registry — all ten decisions, D-001 through D-010, each in whatever terminal state it reached — into one coherent narrative and reference document. This includes representing genuinely deferred or contested decisions honestly as such, not smoothing them into false certainty for the sake of a cleaner document.

Out of scope: introducing any new research, recommendation, or evidence not already present in the input sessions or the Decision Registry — this document's entire authority comes from faithfully compiling what came before it, not from adding new judgment calls. If you notice something the underlying research left unresolved, represent it as unresolved here rather than resolving it yourself.

**Required inputs:** the finalized Decision Registry — all ten D-NNN records in a terminal state — and the Architecture Change-Set Blueprint from the immediately prior session, at minimum. Paste in as many of the earlier research sessions as you have available; the more of the underlying trail you provide, the more this document's "why," not just "what," can be sourced accurately. If the Decision Registry has any decision still marked `proposed` rather than a terminal state, stop and say so explicitly — per this program's own exit gate, this document should not be finalized while any decision is still open.

[PASTE THE FINALIZED DECISION REGISTRY AND THE T1-07 BLUEPRINT HERE — PLUS AS MANY OF T1-01 THROUGH T1-06 AS AVAILABLE — BEFORE SENDING]

## APPROACH

Before drafting, check that every decision in the Decision Registry you've been given has actually reached a terminal state — this is a hard gate, not a formality, so don't proceed past it silently if something's still `proposed`. Then read the full trail you've been given and organize the document around Kramak's actual architecture — the state machine, the role model, the governance mechanisms, the 12 claimed innovations, the supporting-tooling boundary — rather than around the research program's own session structure; a future reader shouldn't need to know what any individual session was to understand the document. Preserve disagreement and uncertainty faithfully: where the underlying research left something genuinely contested, or where a decision was deferred with a review trigger rather than resolved, represent that honestly rather than writing with more confidence than the source material earned. Where the research trail shows an idea that was seriously considered and rejected — an alternative FSA topology, a different role model, a stronger self-improvement governance mechanism that wasn't adopted — keep that in the document rather than only documenting what was kept. That's the point of a founding document like this: the reasoning has to survive, not just the conclusion.

## DELIVERABLE

This is the capstone document for the whole research program, so treat completeness and traceability as the top priorities. It must include:

- A complete architecture summary: the state machine, the role model, the 12 claimed innovations, each with its current status (validated, revised, or deprecated, per the change-set blueprint), and the governance mechanisms — described as the actual current design, not as a list of research findings.
- A full decision log: all ten decisions, each with its final status, its core rationale, and a pointer to which session or sessions informed it, so a future reader can go deeper if they want to.
- A consolidated Alternatives Considered / Rejected Ideas section spanning the whole research program — don't let this get lost inside individual sessions; it belongs at the founding-document level so it's easy to find later.
- A consolidated Open Risks & Review Triggers section — every deferred decision and every reversal or review trigger from every input session, in one place, so nothing that needs future attention is buried in a session file nobody re-reads.
- An explicit statement confirming the final, compiled architecture is checked against Kramak's fixed constraints — zero mandatory runtime dependencies, model-agnostic, IDE-agnostic, MIT license — as a whole, not just decision by decision, since this is the first point in the process where every decision's implications are visible together.
- Evidence grades and sourcing carried through faithfully from the inputs, not re-asserted as fresh claims — if you state something not traceable to an input, flag it plainly as a compilation-level observation rather than researched fact.
- If a `templates/FOUNDING-ARCHITECTURE.template.md` file exists in this project and you have access to it, follow its structure in preference to the generic body-section list below; treat the structure given here as the fallback if that template isn't available to you.

## FORMAT

Produce one complete Markdown file. Frontmatter:
- id: T1-08
- title: Founding Architecture Document
- date: 2026-08-18
- status: complete, or needs-follow-up with a one-line reason (for example, if a decision was still open)
- topic: founding-architecture
- tags: 3–6 tags you choose (e.g. fad, phase-0-capstone, decision-log)
- informs_decisions: [D-001, D-002, D-003, D-004, D-005, D-006, D-007, D-008, D-009, D-010] — full compilation
- confidence: high/medium/low plus a one-sentence justification

Body (or the project's own FAD template structure, if available — see above): **Research Question** (here, what Kramak's architecture is and why, once every Phase 0 decision has reached a terminal state) → **Key Findings** (3–7 bullets — the headline state of the architecture post-Phase-0) → **Recommendation** (here, the compiled architecture statement itself — what ships) → **Alternatives Considered** (the consolidated, program-wide rejected-ideas record) → **Detailed Findings** (the full architecture description plus the complete decision log) → **Open Questions & Risks** (the consolidated review-trigger register) → **Sources & Evidence Ledger** (the full list of input sessions and the Decision Registry, as this document's provenance).
```

---

## Closing Note

All eight prompts in this library are independent single-turn runs; none of them chain automatically, and this file doesn't run any of them for you. Once `sessions/T1-01-*.md` through `sessions/T1-08-*.md` all exist, Phase 0 still isn't finished by virtue of that alone — the Research Pipeline's own exit gate, the Track A and Track B criteria applied per decision in `DECISIONS.md`, is what determines completion, not the existence of eight files.
