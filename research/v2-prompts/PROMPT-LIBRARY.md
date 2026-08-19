# Kramak — Phase 0 Prompt Library

Sixteen complete, self-contained research prompts, one per session in `RESEARCH-PIPELINE.md`. Each is written to be copied in full — from the opening `BRIEF` line to the closing YAML frontmatter template — and pasted as a single first message into a frontier model with web search or deep research enabled. None of them assume you've read another prompt first; if you only ever open one of these, it should still make complete sense on its own.

Every prompt ends with the same required output shape (YAML frontmatter + seven body sections), because the whole point of this library is that sixteen independently-run sessions come back structurally comparable. Don't strip the FORMAT block to save space — it's doing real work.

**Contents:** [T2-01](#t2-01) · [T2-02](#t2-02) · [T2-03](#t2-03) · [T2-04](#t2-04) · [T2-05](#t2-05) · [T2-06](#t2-06) · [T2-07](#t2-07) · [T2-08](#t2-08) · [T2-09](#t2-09) · [T2-10](#t2-10) · [T2-11](#t2-11) · [T2-12](#t2-12) · [T2-13](#t2-13) · [T2-14](#t2-14) · [T2-15](#t2-15) · [T2-16](#t2-16)

---

## T2-01
### Competitive Landscape & Real-World Pain Points — AI-Agent Development Process Frameworks in 2026
*Layer 0 · Discovery · Informs D-003, D-004, D-006, D-007*

```markdown
## BRIEF

Investigate the current (August 2026) landscape of process/methodology frameworks for
AI-assisted and autonomous software development, and the real pain points practitioners
report when working with AI coding agents *without* such a framework. You're informing
several downstream decisions about Kramak, an existing, shipped (v1.0.0) file-based,
model-agnostic, IDE-agnostic development methodology — a deterministic 5-state FSM
(BOOTSTRAP → PLANNING → EXECUTING → AUDITING, looping back to PLANNING, with a WAITING
substate) that any AI coding agent can follow by reading Markdown specs and a
JSON-Schema-validated state.json. Kramak's own framing is that the AI coding landscape has
three layers — Context (AGENTS.md, solved), Protocol (MCP, solved), and Process (nothing
standardized) — and that it fills the third. Known named comparators: RIPER-5 (a
community-originated Cursor rule set, "Research → Innovate → Plan → Execute → Review",
which started as a single pasted prompt and has since forked into heavier variants with
persistent memory banks), GitHub's Spec Kit (an official, actively maintained
spec-driven-development toolkit with a CLI and 30+ agent integrations), and the built-in
task orchestration inside tools like Devin, OpenHands, and Google Antigravity. Your
audience is a Principal Architect who needs production-grade, evidence-backed tradeoffs —
not a summary — because this finding will directly shape how Kramak positions itself,
whether its spec density is defensible, and whether the problem it claims to solve is
real at all.

## SCOPE

Temporal anchor: today is 2026-08-18 (or, if you're running this session later than that,
use your actual current date and prioritize sources current as of *that* date instead).

In scope: RIPER-5, Spec Kit, and any other comparable process/methodology frameworks you
find (don't stop at the two named); how each actually works mechanically, not just its
name or tagline; adoption/momentum signals where available (stars, forks, download
counts, contributor activity — treat raw star counts skeptically, since hype and organic
depth diverge); primary developer discourse (Hacker News, r/programming, X/Twitter,
GitHub issues/discussions on major agent tools) on what people report struggling with in
AI-assisted development specifically.

Out of scope: general AI model capability news unrelated to process/methodology; raw
benchmarking of which model writes better code (that's a different question from how
work gets structured and verified).

Source priority: official repos, docs, and any published RFCs first; peer-reviewed or
arXiv research on developer-tool adoption or agentic workflows second; high-signal
developer discourse third. Deprioritize marketing blog posts making adoption claims you
can't independently verify.

## APPROACH

Start broad — get a real map of what exists in this space in 2026, not just the two named
comparators — then narrow into how the leading few actually work mechanically (what a
user does day to day, not just their pitch). Separately, go looking for primary
developer discourse on AI-assisted-development pain points, independent of any specific
framework's marketing.

Actively seek disconfirming evidence for the premise that a dedicated "process" layer is
even needed. Look specifically for arguments or evidence that per-tool built-in
orchestration (Antigravity's subagent hierarchy, Devin's autonomous task management, etc.)
is already sufficient and a separate, portable framework is unnecessary overhead — and
for the counter-evidence to that. A related nuance worth checking: portable "Agent
Skills" (the SKILL.md standard) solve a different problem than Kramak — reusable,
on-demand *capabilities* rather than an end-to-end development *process* — but verify
that distinction holds up rather than assuming it, since if the boundary is blurrier than
it looks, that's exactly the kind of finding this session exists to surface. Surface
disagreement rather than resolving it prematurely.

## DELIVERABLE

Your output must address:
- An inventory of comparable frameworks/approaches with their actual mechanics, license,
  and adoption signals (not just names and taglines)
- A synthesis of what practitioners report struggling with in AI-assisted development,
  drawn from source-diverse primary discourse, not a single forum thread
- An explicit, direct assessment of whether "the gap" Kramak claims to fill is real, and
  how confident that assessment is
- A recommendation on how Kramak should honestly characterize its position relative to
  this landscape
- Every non-trivial factual claim carrying an evidence grade (see below)
- Open risks — including, explicitly, anything suggesting the gap is closing fast enough
  that this finding could be stale within months

## FORMAT

Produce a single, complete Markdown file. Start with YAML frontmatter exactly matching
this shape (fill in date/status/confidence when you finish; the rest is pre-set):

---
id: T2-01
title: "Competitive Landscape & Real-World Pain Points: AI-Agent Development Process Frameworks in 2026"
date: <date you complete this, YYYY-MM-DD>
status: complete
topic: competitive-landscape
tags: [landscape, positioning, competitive-analysis, ai-agent-process-frameworks]
informs_decisions: [D-003, D-004, D-006, D-007]
confidence: <High | Medium | Low>
---

Then these body sections, in order:

1. **Research Question** — restate what you're answering in your own words
2. **Key Findings** — 3 to 7 bullets, the headline takeaways
3. **Recommendation** — your call, isolated on its own, not interleaved with rejected
   alternatives
4. **Alternatives Considered** — the paths you didn't recommend, and why
5. **Detailed Findings** — the full analysis
6. **Open Questions & Risks** — including reversal triggers: what would change this
   verdict
7. **Sources & Evidence Ledger** — every source used, each claim graded:
   - Base grade: A (official docs/RFCs) · B (peer-reviewed/empirical) · C (vendor claims)
     · D (blog/tutorial/AI recall) · E (unverifiable)
   - Modifiers: corroboration (single/corroborated/contested) · recency
     (fresh/aging/stale) · directness (direct/indirect)
   - Verification: fetched · cached · recalled · secondhand · human-provided (anything
     you're recalling rather than actually fetching is capped at Grade D, regardless of
     how authoritative the original source is)
```

---

## T2-02
### Agentic Software Engineering & Multi-Agent Orchestration — Research Landscape
*Layer 0 · Discovery · Informs D-001, D-002, D-005, D-008*

```markdown
## BRIEF

Survey the academic and industry research literature on autonomous coding-agent
architectures: planning-loop shapes, multi-agent orchestration for software engineering,
role specialization (planner/executor/critic-style splits), and documented agent failure
modes. You're grounding several decisions about Kramak, an existing, shipped development
methodology whose core mechanic is a strict single-Planner-session → single-Executor-session
→ Auditor-pass loop, deliberately routing "high-reasoning" models (Opus/o3/Gemini-Pro
class) to planning and "fast/precise" models (Sonnet/4o/Flash class) to execution as a
cost/capability-matching design choice, with state persisted across sessions via a
JSON-Schema-validated state.json specifically to survive crashes and interruptions. Your
audience is a Principal Architect deciding whether this architecture is evidence-aligned
as shipped, and separately, whether it should evolve toward parallel/multi-agent
execution given that 2026 tooling (Google Antigravity's hierarchical subagent model,
Cursor 2.0's parallel isolated background execution) increasingly supports that natively.
This session doesn't need to resolve either question — it needs to map the evidence base
thoroughly enough that two later sessions can.

## SCOPE

Temporal anchor: today is 2026-08-18 (use your actual current date if running later, and
prioritize sources current as of that date).

In scope: peer-reviewed and arXiv-preprint research on agent planning architectures
(plan-and-execute patterns, reflection/self-critique loops like Reflexion, ReAct-style
interleaved reasoning, role-specialized multi-agent systems for SE — MetaGPT, ChatDev,
AutoGen and their academic treatment, and any systematic literature reviews of the space,
e.g. survey papers covering LLM-based multi-agent systems for software engineering);
empirical comparisons of single-agent vs. multi-agent coding performance, including any
findings on coordination overhead or error compounding; documented failure-mode
taxonomies for LLM agents generally and for coding agents specifically; research on LLM
self-assessment/capability calibration (distinct from simple per-answer confidence
calibration — look specifically for task-or-role-level self-assessment research, which is
a narrower and less-studied question).

Out of scope: general LLM capability benchmarks unrelated to orchestration architecture;
prompt-engineering micro-optimizations that don't bear on structural/loop design.

Source priority: peer-reviewed papers and arXiv preprints with empirical evaluation
first; official technical write-ups from agent-framework builders documenting design
rationale second; blog-post summaries of papers only as a pointer to the primary source,
never as the citation itself.

## APPROACH

Start broad on autonomous software-engineering agent architecture, then narrow into
specific comparisons: single- vs. multi-agent, role-specialized vs. generalist,
sequential vs. parallel. Actively seek studies where multi-agent or parallel approaches
*underperformed* single-agent approaches — coordination overhead, context fragmentation,
error compounding across agents — with the same rigor you'd apply to studies favoring
multi-agent designs. This field has genuine, live disagreement; represent it as such
rather than picking a side. Separately, look for what research says about LLM
self-assessment of task-level or role-level capability specifically (not just "is this
answer correct" confidence calibration, which is a different and much more heavily
studied question), and about failure-mode classification for autonomous coding agents.

## DELIVERABLE

Your output must address:
- A map of the major architectural patterns in the current literature, with their
  empirical support (or lack of it)
- Direct evidence, for and against, on whether multi-agent/parallel orchestration
  improves or harms autonomous coding-task outcomes, including any coordination-overhead
  findings
- What the literature says (if anything specific enough to cite) about LLM self-assessment
  of task/role-level capability, distinguished from general answer-confidence calibration
- What the literature says about failure-mode taxonomies for autonomous coding agents
- A clear-eyed statement of where the evidence is strong, where it's thin, and where it's
  actively contested
- Evidence grades throughout; open risks and disagreements in the literature itself

## FORMAT

Produce a single, complete Markdown file. Start with YAML frontmatter exactly matching
this shape (fill in date/status/confidence when you finish):

---
id: T2-02
title: "Agentic Software Engineering & Multi-Agent Orchestration: Research Landscape"
date: <date you complete this, YYYY-MM-DD>
status: complete
topic: agentic-se-research
tags: [research-landscape, multi-agent, planner-executor, failure-modes, self-assessment]
informs_decisions: [D-001, D-002, D-005, D-008]
confidence: <High | Medium | Low>
---

Then these body sections, in order: **Research Question**; **Key Findings** (3–7
bullets); **Recommendation** (your overall read of where the evidence points, isolated
from rejected framings); **Alternatives Considered** (other ways to characterize this
literature that you considered and set aside); **Detailed Findings**; **Open Questions &
Risks**; **Sources & Evidence Ledger**, with every claim graded on the same scale used
throughout this pipeline:
- Base grade: A (official docs/RFCs) · B (peer-reviewed/empirical) · C (vendor claims) ·
  D (blog/tutorial/AI recall) · E (unverifiable)
- Modifiers: corroboration (single/corroborated/contested) · recency
  (fresh/aging/stale) · directness (direct/indirect)
- Verification: fetched · cached · recalled · secondhand · human-provided (recalled
  claims are capped at Grade D regardless of how authoritative the underlying source is)
```

---

## T2-03
### AI Coding Agent / IDE Ecosystem Map & Convergence Trends, 2026
*Layer 0 · Discovery · Informs D-004, D-006*

```markdown
## BRIEF

Map the current (August 2026) competitive and technical landscape of the AI coding
agents/IDEs Kramak currently ships adapters for — Antigravity, Cursor, Claude Code,
Windsurf, Cline, Copilot, Aider — plus any significant new entrants, their relative
momentum, and the degree to which they're converging on shared conventions (AGENTS.md,
MCP, Agent Skills/SKILL.md) that could reduce the need for bespoke per-tool adapters.
Kramak is a shipped, file-based development methodology; its adapter layer exists purely
to translate its IDE-agnostic core spec into each tool's own configuration conventions.
The maintainer has explicitly flagged that maintaining 8 adapters against a fast-moving
landscape may be unsustainable. Your audience is a Principal Architect who needs a
current, evidence-grounded picture of this landscape to inform whether Kramak should
maintain, prune, or restructure its adapter strategy — and separately, whether tool
convergence changes the calculus on whether an optional Kramak tooling layer makes sense.

## SCOPE

Temporal anchor: today is 2026-08-18 (use your actual current date if running later, and
flag explicitly that this territory changes fast enough that it should be re-checked on
whatever cadence you'd recommend).

In scope: the named 7 tools (an 8th, "Generic," is Kramak's own fallback adapter and
doesn't need external research) plus any new entrants with real traction since early
2026; each tool's configuration/rules-file conventions (what file(s) it reads, its
native format); native multi-step orchestration or "process" features any of them ship
that could compete with or complement what Kramak provides; each tool's AGENTS.md and MCP
support status specifically (not just "supports agents" — does it read AGENTS.md
natively, and as of what version); adoption/momentum signals, read skeptically (star
counts diverge from actual depth of use — contributor density and retention are better
signals where you can find them).

Out of scope: raw model-quality comparisons between the underlying LLMs each tool uses —
this is about tool-level orchestration conventions, not which model writes better code.

Source priority: official docs and changelogs first; developer-reported adoption data
(surveys, usage rankings) second; community discourse third, used only to corroborate,
not as a primary source on momentum.

## APPROACH

Start broad on the current state of each named tool, then narrow into (a) how far
convention convergence around AGENTS.md/MCP/Agent Skills has actually gone — is
per-tool bespoke adaptation still necessary, or has at least some of the ecosystem
settled on a shared baseline that a single AGENTS.md-native path could now serve; (b)
whether any of the named tools has shipped native multi-step "process" orchestration
substantial enough to make a Kramak adapter for it partially redundant; (c) momentum —
which of these are growing, shrinking, or stagnant, with real evidence rather than
vibes. Actively look for evidence that the 8-adapter strategy is already partly outdated
— specifically, whether any adapter is now unnecessary because its underlying tool reads
AGENTS.md-style files well enough on its own.

## DELIVERABLE

Your output must address:
- A current-state profile of each of the 7 targeted tools plus any notable new entrants,
  covering configuration conventions and native orchestration features
- A direct convergence assessment: is bespoke per-tool adaptation still necessary across
  the board, partially, or is a single AGENTS.md-native approach now sufficient for some
  or all of them
- A momentum ranking with the evidence behind it, explicitly noting where signal is weak
- A recommendation on adapter prioritization
- Evidence grades throughout
- An explicit risk section flagging that this is the fastest-decaying research in the
  whole pipeline, with a recommended re-check cadence

## FORMAT

Produce a single, complete Markdown file. Start with YAML frontmatter exactly matching
this shape (fill in date/status/confidence when you finish):

---
id: T2-03
title: "AI Coding Agent / IDE Ecosystem Map & Convergence Trends, 2026"
date: <date you complete this, YYYY-MM-DD>
status: complete
topic: ide-ecosystem-map
tags: [landscape, ide-tools, agents-md, mcp, convergence, adapters]
informs_decisions: [D-004, D-006]
confidence: <High | Medium | Low>
---

Then these body sections, in order: **Research Question**; **Key Findings** (3–7
bullets); **Recommendation** (isolated, not interleaved with rejected framings);
**Alternatives Considered**; **Detailed Findings**; **Open Questions & Risks**;
**Sources & Evidence Ledger**, with every claim graded:
- Base grade: A (official docs/RFCs) · B (peer-reviewed/empirical) · C (vendor claims) ·
  D (blog/tutorial/AI recall) · E (unverifiable)
- Modifiers: corroboration (single/corroborated/contested) · recency
  (fresh/aging/stale) · directness (direct/indirect)
- Verification: fetched · cached · recalled · secondhand · human-provided (recalled
  claims capped at Grade D regardless of apparent source authority)
```

---

## T2-04
### Evidentiary Audit of Kramak's Existing Design-Parameter Citations & Claims
*Layer 0 · Discovery · Informs D-002, D-008, D-009*

```markdown
## BRIEF

This is a fact-checking and grading exercise, not a from-scratch design exercise.
Independently verify the evidentiary basis of specific claims already embedded in
Kramak's shipped v1.0.0 spec: (a) a "2-hour work item cap," which the spec justifies by
citing METR's research on AI agent task-completion time horizons; (b) a "no personas"
design principle; (c) to whatever extent external evidence exists, sanity-check the
boundaries of Kramak's "Failure Taxonomy" (6 categories), its "Capability Gate" confidence
thresholds, and its "Polish Ceiling Rule" (an internal term with no assumed external
definition — treat it as Kramak's own name for a scope-discipline/over-engineering
guardrail, and look for the closest generalizable research on that underlying concept
rather than searching for the term itself). Your audience is a Principal Architect
auditing whether specific numeric and policy claims already published in the spec are
defensible as stated, overstated, or in need of a citation correction — independent of
whether the underlying design choice itself should change.

## SCOPE

Temporal anchor: today is 2026-08-18 (use your actual current date if running later).

In scope: METR's published research on AI agent time horizons — note before you start
that METR's actual metric is the length of task (measured by expert-human completion
time) at which a model succeeds with a given probability (50% or 80%), and that this is a
*measurement/trend* paper about a doubling-every-~7-months capability curve, not a
prescriptive guideline for how to size tasks for an agent — so the audit question is
specifically whether Kramak's "2-hour cap" is a faithful, clearly-labeled *derived
application* of that trend data, or an overstated citation implying METR recommended
something it didn't; current research or practitioner consensus specifically on LLM
persona-assignment effects on output quality (there is a live, non-trivial literature
here — treat "no personas" as a real empirical question, not a settled one either way);
whatever direct or indirect research exists on failure-taxonomy design, autonomous-system
confidence thresholds, and scope-discipline/over-engineering tendencies in agentic
systems, to the extent it bears on the three internal-term parameters.

Out of scope: redesigning any of these mechanisms — that's explicitly other sessions'
job. This session only grades what's already claimed.

Source priority: for the METR claim, the original METR publication(s) fetched directly —
do not rely on a secondhand characterization of what METR found. For persona effects,
peer-reviewed/arXiv sources first. For the internal-term parameters, be explicit when
you're reasoning by analogy rather than citing something on point.

## APPROACH

For each claim, locate and fetch the primary source directly rather than working from
memory or a summary of it, assess whether Kramak's stated application is a faithful
representation or a stretch, and grade accordingly. Where no direct external research
exists for a Kramak-specific term (most likely the Polish Ceiling Rule, and possibly
parts of the Failure Taxonomy and Capability Gate thresholds), say so plainly rather than
forcing a citation to fit, and look instead for the closest generalizable research as
indirect, clearly-labeled-as-indirect evidence.

## DELIVERABLE

Because this is a multi-claim audit, structure the Recommendation as a **per-claim
verdict table** rather than one single call. Your output must address:
- A verified characterization of what METR's research actually measured and shows, and a
  direct verdict: is the "2-hour work item cap" citation faithful, overstated, or
  defensible-with-caveats
- Current evidence on persona effects on LLM output quality
- Whatever direct or indirect evidence exists for the Failure Taxonomy, Capability Gate
  thresholds, and Polish Ceiling Rule, with direct and indirect evidence clearly
  distinguished from each other
- An explicit per-claim verdict table: claim → grade → verdict (confirmed / needs
  citation correction / no direct evidence found, best treated as an assumption)
- A recommendation on any claims needing rewording in the shipped spec, independent of
  whether the underlying design choice changes

## FORMAT

Produce a single, complete Markdown file. Start with YAML frontmatter exactly matching
this shape (fill in date/status/confidence when you finish):

---
id: T2-04
title: "Evidentiary Audit of Kramak's Existing Design-Parameter Citations & Claims"
date: <date you complete this, YYYY-MM-DD>
status: complete
topic: evidentiary-audit
tags: [citation-audit, metr, personas, failure-taxonomy, capability-gate]
informs_decisions: [D-002, D-008, D-009]
confidence: <High | Medium | Low>
---

Then these body sections, in order: **Research Question**; **Key Findings** (3–7
bullets); **Recommendation** — here, the per-claim verdict table described above;
**Alternatives Considered** — alternative interpretations where the evidence was
genuinely ambiguous; **Detailed Findings**; **Open Questions & Risks**; **Sources &
Evidence Ledger**, with every claim graded:
- Base grade: A (official docs/RFCs) · B (peer-reviewed/empirical) · C (vendor claims) ·
  D (blog/tutorial/AI recall) · E (unverifiable)
- Modifiers: corroboration (single/corroborated/contested) · recency
  (fresh/aging/stale) · directness (direct/indirect)
- Verification: fetched · cached · recalled · secondhand · human-provided (recalled
  claims capped at Grade D regardless of apparent source authority — this matters
  especially here, since the entire point of this session is to fetch primary sources
  rather than recall them)
```

---

## T2-05
### Core Orchestration Loop: Retrospective Validation Against Agentic-SE Research
*Layer 1 · One-way · Novel · Deep Research (part A of D-001) · Informs D-001*

```markdown
## BRIEF

Validate whether Kramak's shipped core architecture is a sound, evidence-aligned design,
or whether it has structural weaknesses the shipped version doesn't address. The
architecture: a deterministic 3-phase FSM (PLANNING → EXECUTING → AUDITING, looping back
to PLANNING, with a WAITING substate for human input); a strict *single* high-reasoning
model (Opus/o3/Gemini-Pro class) Planner session, deliberately separated from a *single*
fast/precise model (Sonnet/4o/Flash class) Executor session per work item, as a
cost/capability-matching design choice; a "Perspective-Based Planning" sub-mechanism
inside the Planning phase (a PERCEIVE → REASON → DECIDE assessment cycle); and state
persisted across sessions via a JSON-Schema-validated state.json, specifically to survive
crashes and interruptions. Your audience is a Principal Architect deciding whether to
preserve this architecture unchanged into the next iteration or flag it for revision —
evaluate the current single-agent-per-phase design *on its own terms*, not against
multi-agent alternatives (that's a separate session's job — assume this one's verdict
feeds it).

## SCOPE

Temporal anchor: today is 2026-08-18 (use your actual current date if running later).

In scope: research/evidence on planner/executor role separation specifically for coding
or software-planning tasks (general agent-role-separation research is relevant too, but
weight coding-specific findings more heavily); evidence on capability-matched model
routing (cheap model for execution, expensive model for planning) and its cost/quality
tradeoffs; evidence on the PERCEIVE→REASON→DECIDE loop shape specifically, and how it
compares to documented alternatives (ReAct, Reflexion, plan-and-solve, and any other
named reasoning-loop patterns you find) as applied to software-planning tasks.

Out of scope: multi-agent or parallel evolution options — a separate session (which will
read this one's verdict first) handles that. Stay disciplined about not drifting into
"and here's what it should become," even where the temptation is obvious.

Source priority: peer-reviewed/arXiv empirical studies first; documented design rationale
from agent-framework builders (MetaGPT, ChatDev, AutoGen-class projects, if their reasoning
for role splits is published) second; blog commentary last, and only as a pointer.

## APPROACH

Start broad on planner/executor role-separation research, then narrow into
capability-matched model routing evidence and reasoning-loop-shape evidence specific to
code-generation/software-planning tasks. Actively seek evidence *against* role
separation — for instance, research suggesting a single sufficiently capable model
handling both planning and execution outperforms a split due to context loss at the
session boundary — and disclose it prominently if you find it, rather than downplaying it
because it complicates the verdict.

## DELIVERABLE

Your output must address:
- Evidence on planner/executor role-separation efficacy specifically for coding/software
  tasks
- Evidence on capability-matched model routing cost/quality tradeoffs
- Evidence on the PERCEIVE→REASON→DECIDE loop shape versus documented alternatives
- An explicit verdict: is the current architecture evidence-aligned, evidence-neutral (no
  direct evidence either way), or evidence-contradicted — and how confident is that call
- Specific structural weaknesses found, if any, with a severity assessment for each
- Evidence grades throughout; open risks

## FORMAT

Produce a single, complete Markdown file. Start with YAML frontmatter exactly matching
this shape (fill in date/status/confidence when you finish):

---
id: T2-05
title: "Core Orchestration Loop: Retrospective Validation Against Agentic-SE Research"
date: <date you complete this, YYYY-MM-DD>
status: complete
topic: core-loop-retrospective
tags: [architecture, planner-executor, fsm, role-separation, retrospective-validation]
informs_decisions: [D-001]
confidence: <High | Medium | Low>
---

Then these body sections, in order: **Research Question**; **Key Findings** (3–7
bullets); **Recommendation** (isolated, not interleaved with rejected framings);
**Alternatives Considered**; **Detailed Findings**; **Open Questions & Risks** (include
reversal triggers — what evidence would flip this verdict); **Sources & Evidence
Ledger**, with every claim graded:
- Base grade: A (official docs/RFCs) · B (peer-reviewed/empirical) · C (vendor claims) ·
  D (blog/tutorial/AI recall) · E (unverifiable)
- Modifiers: corroboration (single/corroborated/contested) · recency
  (fresh/aging/stale) · directness (direct/indirect)
- Verification: fetched · cached · recalled · secondhand · human-provided (recalled
  claims capped at Grade D)
```

---

## T2-06
### Core Orchestration Loop: Multi-Agent & Parallel Evolution Design Options
*Layer 1 · One-way · Novel · Deep Research (part B of D-001) · Hard-gated on T2-05 · Informs D-001*

```markdown
## BRIEF

Before starting this session, read T2-05's findings if they're available to you (it's
the retrospective-validation half of this same decision — this session assumes its
verdict as a starting point rather than re-litigating whether the current
single-Planner/single-Executor architecture is sound). This session investigates whether
and how Kramak — a shipped, file-based development methodology currently built around a
strict sequential 3-phase FSM with one Planner session and one Executor session per work
item — should evolve toward multi-agent or parallel execution, given that 2026 tooling
increasingly supports this natively: Google Antigravity ships a hierarchical subagent
model (a primary agent decomposing work and delegating to specialized subagents —
architect, coder, tester, documentation — with workspace isolation via git worktrees and
asynchronous background execution), and Cursor 2.0 has introduced parallel isolated
multi-agent execution for background tasks. Your audience is a Principal Architect who
needs a *concrete* evolution path, not a philosophical yes/no: enough detail to actually
inform a spec-writing decision. Specifically address what changes to the state.json
schema and the Hard Scope Check (currently a `git diff --name-only` comparison against
each work item's declared file list) would be needed to handle concurrent writes and
concurrent scope-checking, and what new failure modes parallelism introduces that the
existing Circuit Breaker and Failure Taxonomy don't yet cover.

## SCOPE

Temporal anchor: today is 2026-08-18 (use your actual current date if running later).

In scope: concrete multi-agent coding-orchestration patterns already in production
(Antigravity's subagent architecture and its concurrency-control mechanisms
specifically — how does it prevent two parallel agents from corrupting shared state or
producing conflicting file edits; Cursor 2.0's parallel background execution; any other
2026-era tool with a shipped, non-experimental parallel-agent feature), and any
published evidence on *when* parallelism helps versus hurts coding-task outcomes
specifically — task independence as a precondition for safe parallelism is the key
variable to chase down.

Out of scope: re-litigating whether planner/executor separation itself is sound (T2-05's
job) — take its verdict as given and focus specifically on the add-parallelism question.

Source priority: official technical documentation from tools with shipped (not
roadmapped) parallel-agent features first; empirical research on multi-agent
coordination overhead second; speculative commentary last, if at all.

## APPROACH

Start broad on production multi-agent coding-orchestration patterns in 2026, then narrow
into concurrency-control mechanics specifically — how do shipped tools actually prevent
state corruption or conflicting edits between parallel agents (git-worktree isolation,
locking, merge strategies) — and into evidence on task-independence as a precondition
for safe parallelism. Surface disagreement on whether parallel execution is mature
enough for fully autonomous (unsupervised) use today versus only advisable under active
human supervision — this matters directly for whether Kramak, which is explicitly
designed to run without human intervention, should adopt it yet.

## DELIVERABLE

Your output must address:
- A survey of production multi-agent coding-orchestration patterns with their actual
  concurrency-control mechanisms
- Evidence on when parallel execution helps versus hurts coding-task outcomes
- At least two concrete, technically specific evolution options for Kramak — for
  example, one option bounding parallel Executors to work items the Planner has
  explicitly flagged as independently-scoped, versus an option treating "multi-agent" as
  an IDE-adapter-level concern that stays outside Kramak's core spec entirely — each with
  explicit tradeoffs, not just a label
- A recommendation with an explicit confidence level
- New failure modes parallelism would introduce, and whether the existing Circuit
  Breaker, Hard Scope Check, and Failure Taxonomy cover them as-is or need extension
- Evidence grades throughout; open risks and reversal triggers

## FORMAT

Produce a single, complete Markdown file. Start with YAML frontmatter exactly matching
this shape (fill in date/status/confidence when you finish):

---
id: T2-06
title: "Core Orchestration Loop: Multi-Agent & Parallel Evolution Design Options"
date: <date you complete this, YYYY-MM-DD>
status: complete
topic: core-loop-multi-agent-evolution
tags: [architecture, multi-agent, parallelism, subagents, concurrency-control]
informs_decisions: [D-001]
confidence: <High | Medium | Low>
---

Then these body sections, in order: **Research Question**; **Key Findings** (3–7
bullets); **Recommendation** (isolated, not interleaved with rejected framings);
**Alternatives Considered** (your other concrete evolution option(s), with their
tradeoffs); **Detailed Findings**; **Open Questions & Risks** (include what new failure
modes parallelism introduces and reversal triggers); **Sources & Evidence Ledger**, with
every claim graded:
- Base grade: A (official docs/RFCs) · B (peer-reviewed/empirical) · C (vendor claims) ·
  D (blog/tutorial/AI recall) · E (unverifiable)
- Modifiers: corroboration (single/corroborated/contested) · recency
  (fresh/aging/stale) · directness (direct/indirect)
- Verification: fetched · cached · recalled · secondhand · human-provided (recalled
  claims capped at Grade D)
```

---

## T2-07
### Self-Improvement Governance: Anti-Bias Guard Robustness & Safe Self-Modification Design
*Layer 1 · One-way · Novel · Deep Research · Informs D-002*

```markdown
## BRIEF

Investigate what research and practitioner experience say about safe self-modification
in autonomous or AI-driven systems, and use it to stress-test Kramak's existing
"Anti-Bias Guard" — a 5-point checklist that gates pipeline self-improvement, i.e., the
process by which Kramak's own spec files get proposed for change by the pipeline itself,
based on accumulated experience, with the explicit goal of preventing recency bias in a
self-evolving system. Your audience is a Principal Architect who wants a direct answer to
whether a lightweight checklist is adequate here, or whether something more robust —
versioned rollback, mandatory human confirmation, a cooling-off period, review by a
separate model from the one that authored the change — is warranted before trusting the
pipeline to modify its own governing rules in unsupervised production use.

## SCOPE

Temporal anchor: today is 2026-08-18 (use your actual current date if running later).

In scope: research on recursive self-improvement risk in AI systems, read for what
actually transfers to a *lightweight, file-based, human-auditable* self-modification
context — this is a much lower-stakes setting than model-weight self-modification, and
part of this session's job is calibrating rigor to that lower stakes level rather than
importing conclusions built for existential-risk-scale problems wholesale; safe
self-modification / safe-deployment design patterns from ordinary software engineering
(feature flags, canary rollouts, versioned config with rollback) as directly relevant
analogues, since Kramak's self-modification is closer in kind to "a config file changing
itself" than to "a model updating its own weights"; any documented case studies —
successes or failures — of comparable self-improving process/agent frameworks, if
publicly discussed.

Out of scope: AI alignment research on existential or catastrophic risk from frontier
model self-improvement. That is a different scale of problem than a Markdown spec editing
its own process rules; importing that framing wholesale would be a category error, not
rigor. Stay grounded at the appropriate scale.

Source priority: peer-reviewed/arXiv safety research, explicitly filtered for relevance
at this scale, first; software-engineering safe-deployment literature (canary/rollback
patterns) second; documentation from any comparable self-improving dev-tooling project
third.

## APPROACH

Start broad on safe self-modification / recursive self-improvement safety research, then
narrow specifically into what transfers to a file-based, auditable process framework
rather than a weight-updating model. Actively look for the argument that a 5-point
checklist is, in fact, sufficient at this stakes level — avoid the failure mode of
over-engineering governance for what is, mechanically, a markdown file proposing an edit
to another markdown file, reviewable by a human at any point.

## DELIVERABLE

Your output must address:
- Relevant self-modification safety research, explicitly filtered and calibrated for a
  file-based process framework rather than a weight-updating model
- Analogous safe-deployment patterns from software engineering (feature flags, canary
  rollout, versioned rollback) and how directly they map onto this problem
- A specific, itemized stress-test of the existing 5-point Anti-Bias Guard checklist —
  for each point, state whether it's sufficient, and name the specific failure mode(s), if
  any, that would slip through it
- A recommendation: keep as-is, or a specific, minimal hardening — not a wholesale
  rewrite unless the evidence genuinely demands one
- Evidence grades throughout; open risks and reversal triggers

## FORMAT

Produce a single, complete Markdown file. Start with YAML frontmatter exactly matching
this shape (fill in date/status/confidence when you finish):

---
id: T2-07
title: "Self-Improvement Governance: Anti-Bias Guard Robustness & Safe Self-Modification Design"
date: <date you complete this, YYYY-MM-DD>
status: complete
topic: self-improvement-governance
tags: [governance, self-modification, safety, anti-bias-guard, rollback]
informs_decisions: [D-002]
confidence: <High | Medium | Low>
---

Then these body sections, in order: **Research Question**; **Key Findings** (3–7
bullets); **Recommendation** (isolated, not interleaved with rejected framings);
**Alternatives Considered**; **Detailed Findings**; **Open Questions & Risks**;
**Sources & Evidence Ledger**, with every claim graded:
- Base grade: A (official docs/RFCs) · B (peer-reviewed/empirical) · C (vendor claims) ·
  D (blog/tutorial/AI recall) · E (unverifiable)
- Modifiers: corroboration (single/corroborated/contested) · recency
  (fresh/aging/stale) · directness (direct/indirect)
- Verification: fetched · cached · recalled · secondhand · human-provided (recalled
  claims capped at Grade D)
```

---

## T2-08
### Specification Density & Progressive Disclosure Strategy
*Layer 1 · One-way · Novel · Deep Research · Informs D-003*

```markdown
## BRIEF

Investigate the tradeoff between specification thoroughness and adoption friction for
developer-facing (and, distinctly, *agent*-facing) process documentation, and apply the
findings to Kramak's specific situation: its two primary spec files, PLANNER.md (41.5KB)
and EXECUTOR.md (17.7KB), against RIPER-5 — the most-cited low-complexity comparator,
which began life as a single pasted prompt (and has since organically grown heavier
community forks with persistent memory banks, which is itself a data point worth
weighing). Your audience is a Principal Architect deciding whether to restructure the
spec's information architecture — for instance, a short quick-start with detail deferred
to referenced files, read on demand — or preserve current density on the theory that
autonomous, unsupervised production-code changes warrant thorough guardrails that a
terser spec can't carry.

## SCOPE

Temporal anchor: today is 2026-08-18 (use your actual current date if running later).

In scope: research and practitioner evidence on documentation length/density versus
adoption for developer tools generally; progressive-disclosure information-architecture
patterns used by successful technical specs; and — treat this as a distinct sub-question
worth real attention, since Kramak's primary reader is an LLM agent, not a human —
whatever research exists on how instruction/context-file *length* affects an *executing
agent's* adherence and task success, independent of human adoption concerns. Start your
search for this sub-question assuming there is real, recent, specific empirical work on
this exact question (context-file length effects on agent task performance and inference
cost) — verify what it actually found rather than assuming it doesn't exist. Also
directly compare Kramak's single-few-large-files approach against Spec Kit's
opposite strategy — many smaller, staged files (a spec, a plan, a task list, generated in
sequence) — as a live alternative density distribution, not just a density *level*.

Out of scope: cosmetic writing-style advice unrelated to structural/architectural
document organization.

Source priority: developer-tool adoption research/case studies first; technical-writing
and information-architecture research second; direct inspection of comparable
agent-rule-file conventions' actual size and structure third.

## APPROACH

Start broad on documentation-density-versus-adoption evidence, then narrow into
progressive-disclosure patterns used by developer tools specifically, then pursue the
agent-context-length sub-question as its own thread — this is likely to be the most
evidence-rich and most directly decision-relevant part of this session, since it bears
on Kramak's actual audience (executing LLM agents) rather than on human developers
browsing docs. Surface disagreement — actively look for cases where a more thorough spec
measurably *outperformed* a terser one, not only cases favoring brevity, since the easy
narrative here ("shorter is always better") is exactly the kind of thing that deserves a
disconfirming check.

## DELIVERABLE

Your output must address:
- Evidence on documentation density versus developer-tool adoption
- Progressive-disclosure architecture patterns with concrete examples
- A specific, well-evidenced sub-finding on whether and how spec/context-file length
  affects LLM instruction-adherence and task success — this is unique to Kramak's
  audience being AI agents rather than only humans, and should get real depth
- A direct comparison of Kramak's few-large-files approach against Spec Kit's
  many-small-staged-files approach as two different answers to the same problem
- A concrete recommendation: preserve current density, restructure with a
  progressive-disclosure layer, adopt a staged multi-file approach, or another specific
  alternative — with a sketch of what the restructuring would actually look like if you
  recommend one
- Evidence grades throughout; open risks and reversal triggers

## FORMAT

Produce a single, complete Markdown file. Start with YAML frontmatter exactly matching
this shape (fill in date/status/confidence when you finish):

---
id: T2-08
title: "Specification Density & Progressive Disclosure Strategy"
date: <date you complete this, YYYY-MM-DD>
status: complete
topic: spec-density
tags: [documentation, progressive-disclosure, context-length, agent-adherence, adoption]
informs_decisions: [D-003]
confidence: <High | Medium | Low>
---

Then these body sections, in order: **Research Question**; **Key Findings** (3–7
bullets); **Recommendation** (isolated, not interleaved with rejected framings, and
concrete enough to act on); **Alternatives Considered**; **Detailed Findings**; **Open
Questions & Risks**; **Sources & Evidence Ledger**, with every claim graded:
- Base grade: A (official docs/RFCs) · B (peer-reviewed/empirical) · C (vendor claims) ·
  D (blog/tutorial/AI recall) · E (unverifiable)
- Modifiers: corroboration (single/corroborated/contested) · recency
  (fresh/aging/stale) · directness (direct/indirect)
- Verification: fetched · cached · recalled · secondhand · human-provided (recalled
  claims capped at Grade D)
```

---

## T2-09
### "Pure Methodology" Positioning: Optional Tooling/CLI Layer Tradeoffs
*Layer 1 · One-way · Novel · Deep Research · Informs D-004*

```markdown
## BRIEF

Investigate precedents and tradeoffs for zero-runtime-dependency developer tools/specs
that later added — or deliberately declined to add — an optional tooling/CLI layer, and
apply the findings to Kramak's specific situation: a stated constraint that "no runtime
dependencies" is critical to the integrity of its "pure methodology" claim, while the
project already ships init.sh/init.ps1 bootstrapper scripts and a validate.js integrity
checker as convenience utilities. Worth knowing going in: the most prominent named
competitor in this space, GitHub's Spec Kit, made the opposite bet — it's explicitly
CLI-based (a Python "Specify CLI" installed via `uv tool install`), and that hasn't
stopped it from reaching 30+ agent integrations and 138+ community extensions. That's a
real data point, not a foregone conclusion either way — verify what it actually implies
rather than treating it as settling the question. Your audience is a Principal Architect
deciding whether an explicitly optional, separately-distributed tooling layer can coexist
with an unconditionally dependency-free *core* spec without diluting the brand promise,
or whether the promise needs to stay absolute with zero exceptions.

## SCOPE

Temporal anchor: today is 2026-08-18 (use your actual current date if running later).

In scope: precedents from comparable "pure spec/convention" ecosystems — AGENTS.md
itself (which has stayed schema-free, plain Markdown, with no official companion CLI,
despite 60,000+ repository adoption) and the Agent Skills/SKILL.md standard are the
closest direct analogues, but look for others too, including outside the AI-coding space
(EditorConfig, dotfile/config-convention ecosystems) — and how each did or didn't add
optional tooling over time, and what happened when they did or didn't; general
product-strategy research or case studies on "core + optional extension" architectures
and whether they tend to strengthen or dilute a minimalism-based value proposition.

Out of scope: implementation specifics of what a hypothetical Kramak CLI would actually
contain — that's a Layer 2 blueprinting question, not this session's job. Focus on the
strategic tradeoff, informed by real precedent; you can gesture at what an optional layer
might cover without fully designing it.

Source priority: documented project histories/changelogs of comparable tools (official
sources) first; product-strategy research/case studies second; opinion commentary last,
and used sparingly.

## APPROACH

Start broad on "zero-dependency developer tool later adds optional tooling" precedent,
then narrow into specific comparable projects' actual history — did adding (or not
adding) optional tooling correlate with adoption growth, adoption backlash, or no
measurable effect. Actively seek cases where an optional layer *damaged* a
minimalism-based brand promise, not just success stories — the maintainer's stated
concern is specifically about protecting the "pure methodology" claim's integrity, so the
disconfirming case matters as much as the confirming one.

## DELIVERABLE

Your output must address:
- A precedent survey with concrete before/after outcomes where discoverable, including
  AGENTS.md, Agent Skills, and Spec Kit's contrasting choice
- A synthesis of when "core + optional extension" strengthens versus dilutes a
  minimalism-based value proposition
- A direct assessment of whether Kramak's *existing* init.sh/validate.js scripts already
  constitute the thing being debated — i.e., is part of this decision already moot in
  practice, with the real open question being promotion/framing rather than existence
- A recommendation with explicit boundary conditions: what an optional layer could safely
  include versus what would cross into compromising the zero-dependency promise
- Evidence grades throughout; open risks and reversal triggers

## FORMAT

Produce a single, complete Markdown file. Start with YAML frontmatter exactly matching
this shape (fill in date/status/confidence when you finish):

---
id: T2-09
title: "\"Pure Methodology\" Positioning: Optional Tooling/CLI Layer Tradeoffs"
date: <date you complete this, YYYY-MM-DD>
status: complete
topic: pure-methodology-tooling
tags: [zero-dependency, cli, brand-positioning, spec-kit-comparison, precedent]
informs_decisions: [D-004]
confidence: <High | Medium | Low>
---

Then these body sections, in order: **Research Question**; **Key Findings** (3–7
bullets); **Recommendation** (isolated, with explicit boundary conditions);
**Alternatives Considered**; **Detailed Findings**; **Open Questions & Risks**;
**Sources & Evidence Ledger**, with every claim graded:
- Base grade: A (official docs/RFCs) · B (peer-reviewed/empirical) · C (vendor claims) ·
  D (blog/tutorial/AI recall) · E (unverifiable)
- Modifiers: corroboration (single/corroborated/contested) · recency
  (fresh/aging/stale) · directness (direct/indirect)
- Verification: fetched · cached · recalled · secondhand · human-provided (recalled
  claims capped at Grade D)
```

---

## T2-10
### Capability Gate Check: LLM Self-Assessment Reliability
*Layer 1 · One-way · Novel · Deep Research · Informs D-005*

```markdown
## BRIEF

Investigate current research and evidence on whether large language models can reliably
self-assess or self-report their own capability level, and apply the findings to
Kramak's "Capability Gate Check" mechanism — a deliberate design choice to avoid
model-name checking entirely (consistent with a stated hard constraint that Kramak must
work with any AI model without checking which one it is) in favor of having the model
answer a structured self-assessment before being trusted with Planner-tier
(high-reasoning) work. Your audience is a Principal Architect who needs to know whether
this mechanism is trustworthy enough to gate a consequential role assignment on its own,
or whether it needs an objective behavioral backstop, given that model-agnosticism
without name-checking is described as critical to Kramak's core promise, not a
nice-to-have.

## SCOPE

Temporal anchor: today is 2026-08-18 (use your actual current date if running later).

In scope: research on LLM self-evaluation and calibration specifically regarding
*capability level* for a class of task or role — this is a narrower and less-studied
question than general per-answer confidence calibration (how confident is a model that
*this specific answer* is correct), and it's important to keep the two apart rather than
letting broader calibration research stand in for the narrower claim Kramak actually
relies on; any documented alternative or complementary gating approaches used by
comparable production agent systems — deterministic diagnostic tasks, behavioral proxies,
periodic spot-checks rather than pure self-report.

Out of scope: general prompt-engineering technique research unrelated to
self-assessment/capability-gating specifically.

Source priority: peer-reviewed/arXiv calibration research first, with explicit attention
to whether each paper is actually studying task/role-level self-assessment or the more
common (and less relevant) per-answer confidence calibration; documented alternative
gating mechanisms from comparable production agent systems second; general commentary
last.

## APPROACH

Start broad on "LLM self-assessment capability calibration," then narrow specifically
into task-level or role-level self-assessment, filtering out studies that are actually
about per-answer confidence (a much more common research question that doesn't directly
answer whether a model can accurately self-report "am I capable enough for this class of
work"). Actively seek evidence on the *direction* of any miscalibration found — does
self-assessment tend to over-claim capability, under-claim it, or vary unpredictably by
model or vendor — since the right mitigation differs depending on which failure mode
actually dominates. If the evidence base for the narrow question turns out to be thin,
say so directly rather than substituting adjacent research and presenting it as if it
answers the same question.

## DELIVERABLE

Your output must address:
- Direct evidence on LLM self-assessment of task/role-level capability, explicitly
  distinguished from simple per-answer confidence calibration
- The direction and magnitude of any miscalibration found, and whether it varies
  systematically by model class or vendor
- Alternative or complementary gating mechanisms (deterministic diagnostic tasks,
  behavioral proxies, audit-stage spot-checks) with their own tradeoffs
- A recommendation: keep pure self-assessment, add a lightweight objective backstop, or a
  specific hybrid — concrete enough to inform a spec change
- An explicit, honest flag if the evidence base here is thin — this is a newer and
  narrower question than general calibration research, and overstating confidence in a
  sparse literature would be a worse outcome than admitting the gap
- Evidence grades throughout; open risks and reversal triggers

## FORMAT

Produce a single, complete Markdown file. Start with YAML frontmatter exactly matching
this shape (fill in date/status/confidence when you finish):

---
id: T2-10
title: "Capability Gate Check: LLM Self-Assessment Reliability"
date: <date you complete this, YYYY-MM-DD>
status: complete
topic: capability-gate-reliability
tags: [self-assessment, calibration, model-agnostic, capability-gating]
informs_decisions: [D-005]
confidence: <High | Medium | Low>
---

Then these body sections, in order: **Research Question**; **Key Findings** (3–7
bullets); **Recommendation** (isolated, not interleaved with rejected framings);
**Alternatives Considered**; **Detailed Findings**; **Open Questions & Risks**;
**Sources & Evidence Ledger**, with every claim graded:
- Base grade: A (official docs/RFCs) · B (peer-reviewed/empirical) · C (vendor claims) ·
  D (blog/tutorial/AI recall) · E (unverifiable)
- Modifiers: corroboration (single/corroborated/contested) · recency
  (fresh/aging/stale) · directness (direct/indirect)
- Verification: fetched · cached · recalled · secondhand · human-provided (recalled
  claims capped at Grade D)
```

---

## T2-11
### Adapter Strategy: Breadth vs. Depth Across 8 IDE/Agent Ecosystems
*Layer 1 · Two-way · Novel · Fast Spike · Informs D-006*

```markdown
## BRIEF

Using whatever ecosystem-landscape findings are available to you (a companion session
covers the full landscape map — if you have access to it, build on it rather than
re-deriving it; if not, gather what you need directly), determine whether Kramak — a
shipped development methodology currently maintaining 8 IDE/agent adapters (Antigravity,
Cursor, Claude Code, Windsurf, Cline, Copilot, Aider, and a tool-agnostic "Generic"
fallback) — should maintain all 8, consolidate to fewer with deeper investment per tool,
or shift strategy toward an AGENTS.md-native-first approach as that convention's
cross-tool convergence matures. Your audience is a Principal Architect facing a concrete
maintainability decision, given an already-flagged concern that this landscape moves fast
enough for adapters to go stale quickly.

## SCOPE

Temporal anchor: today is 2026-08-18 (use your actual current date if running later).

In scope: relative momentum and adoption of the 7 real (non-Generic) named tools plus any
significant new entrants; maintenance-cost patterns for multi-target
adapter/plugin ecosystems in comparable developer-tool projects (how do linter, formatter,
or similar multi-editor-integration projects actually prioritize which integrations to
build and maintain deeply versus superficially).

Out of scope: redoing the full ecosystem landscape mapping from scratch — if that
research is available to you, treat it as given and focus on the prioritization decision
itself, not on re-litigating the landscape.

Source priority: official adoption/usage data where published first; developer-tool
ecosystem case studies on adapter/plugin prioritization strategy second; community
sentiment as a supplementary signal only, never as the primary basis for a ranking —
raw popularity signals (stars, mentions) are known to diverge from actual depth of
engagement, so corroborate with something sturdier where you can.

## APPROACH

This is a fast spike — move quickly from landscape signal to a concrete prioritization
call rather than re-mapping the whole space in depth. Still spend a moment seeking
disconfirming evidence for whatever prioritization looks obvious at first pass: if the
largest tools by raw size seem like the clear priority, specifically check whether any
smaller or more niche tool has outsized community engagement, contributor activity, or
strategic relevance (e.g. being the one most likely to become a reference implementation
others copy) that argues against a pure size-ranking.

## DELIVERABLE

Your output must address:
- A prioritized tier list of the 7 real adapters (plus any strong new entrants), with
  brief rationale per tool
- A specific recommendation: maintain all, consolidate to N (name them), or shift to an
  AGENTS.md-native-first strategy — with a concrete, stated threshold for what would
  trigger deprecating a specific adapter
- Evidence grades throughout
- An explicit note that this decision has an unusually short natural shelf-life, with a
  recommended revisit cadence

## FORMAT

Produce a single, complete Markdown file. Start with YAML frontmatter exactly matching
this shape (fill in date/status/confidence when you finish):

---
id: T2-11
title: "Adapter Strategy: Breadth vs. Depth Across 8 IDE/Agent Ecosystems"
date: <date you complete this, YYYY-MM-DD>
status: complete
topic: adapter-strategy
tags: [adapters, ide-ecosystem, maintenance-strategy, agents-md-convergence]
informs_decisions: [D-006]
confidence: <High | Medium | Low>
---

Then these body sections, in order: **Research Question**; **Key Findings** (3–7
bullets); **Recommendation** (isolated, with a concrete deprecation threshold);
**Alternatives Considered**; **Detailed Findings**; **Open Questions & Risks** (include a
recommended revisit cadence); **Sources & Evidence Ledger**, with every claim graded:
- Base grade: A (official docs/RFCs) · B (peer-reviewed/empirical) · C (vendor claims) ·
  D (blog/tutorial/AI recall) · E (unverifiable)
- Modifiers: corroboration (single/corroborated/contested) · recency
  (fresh/aging/stale) · directness (direct/indirect)
- Verification: fetched · cached · recalled · secondhand · human-provided (recalled
  claims capped at Grade D)
```

---

## T2-12
### Naming & Positioning Statement: Kramak vs. the Competitive Field
*Layer 1 · Two-way · Novel · Fast Spike · Informs D-007*

```markdown
## BRIEF

Using whatever competitive-landscape findings are available to you (a companion session
covers this in depth — build on it if you have access, gather what you need directly if
not), evaluate Kramak's current naming ("Kramak," Sanskrit-derived, meaning
"sequential/procedural" — this reflects the maintainer's personal, stated naming
convention across their projects, and is not itself an open question; do not attempt to
talk them out of using Sanskrit-rooted names) and positioning (a tagline styled as "the
missing SDLC for AI agents," implicitly inviting comparison to Scrum/Kanban) against the
*actual* competitive field: RIPER-5 (community-originated, bluntly and informally
positioned — its own origin story is a developer's forum post literally titled around
fixing a specific model's overeager behavior), GitHub Spec Kit (official, more formally
positioned, backed by GitHub's own blog and documentation), and the built-in orchestration
inside tools like Devin, OpenHands, and Antigravity. Your audience is a Principal
Architect who wants an honest assessment of the recognizability and positioning tradeoff
a Sanskrit-rooted name creates for a primarily English-speaking, search-driven developer
audience — while keeping the name itself as a given constraint, not a decision on the
table.

## SCOPE

Temporal anchor: today is 2026-08-18 (use your actual current date if running later).

In scope: research/evidence on naming and positioning effects specifically for
developer-tool adoption (general consumer-brand research transfers less directly and
should be weighted lower); a direct comparison of how the actual named competitors
position and name themselves, since the honest comparison set matters more than an
abstract taxonomy of naming theory.

Out of scope: general branding theory disconnected from developer-tool audiences. Do not
treat renaming as a live option to resolve one way or the other — the naming convention
is a stated personal constraint. What's genuinely open is how to position *around* the
existing name, and, separately and clearly labeled as such, a fair presentation of the
tradeoff the name creates (without resolving it unilaterally).

Source priority: developer-tool positioning case studies/evidence first; general
brand-naming research second, weighted lower since it transfers imperfectly; direct
comparison of named competitors' actual public positioning throughout.

## APPROACH

This is a fast spike — move from landscape context to a concrete tagline/positioning
recommendation quickly rather than conducting an open-ended branding study. Present the
honest tradeoff on the name's recognizability directly and evenly, in both directions,
without resolving it unilaterally, since it intersects a stated personal preference the
maintainer has already decided on — your job is to inform, not to talk them out of it or
rubber-stamp it uncritically.

## DELIVERABLE

Your output must address:
- How the actual named competitors position and name themselves, and what that implies
  about the comparison set Kramak's tagline should actually be targeting
- Evidence on developer-tool naming/positioning effects on adoption
- A concrete revised positioning-statement recommendation (a tagline plus a
  one-paragraph explainer) that keeps the name "Kramak" but improves the comparative
  framing
- A clearly-separated, even-handed presentation of the case for and against reconsidering
  the name itself — without a forced verdict, since that call belongs to the maintainer
- Evidence grades throughout; open risks and reversal triggers

## FORMAT

Produce a single, complete Markdown file. Start with YAML frontmatter exactly matching
this shape (fill in date/status/confidence when you finish):

---
id: T2-12
title: "Naming & Positioning Statement: Kramak vs. the Competitive Field"
date: <date you complete this, YYYY-MM-DD>
status: complete
topic: naming-positioning
tags: [branding, positioning, tagline, competitive-comparison]
informs_decisions: [D-007]
confidence: <High | Medium | Low>
---

Then these body sections, in order: **Research Question**; **Key Findings** (3–7
bullets); **Recommendation** (the concrete tagline + explainer, isolated from the
rejected framings); **Alternatives Considered** (other taglines/framings you weighed);
**Detailed Findings** (including the clearly-separated for/against presentation on the
name question); **Open Questions & Risks**; **Sources & Evidence Ledger**, with every
claim graded:
- Base grade: A (official docs/RFCs) · B (peer-reviewed/empirical) · C (vendor claims) ·
  D (blog/tutorial/AI recall) · E (unverifiable)
- Modifiers: corroboration (single/corroborated/contested) · recency
  (fresh/aging/stale) · directness (direct/indirect)
- Verification: fetched · cached · recalled · secondhand · human-provided (recalled
  claims capped at Grade D)
```

---

## T2-13
### Core Guardrail, Grounding & Coordination Mechanisms — Confirmation Bundle
*Layer 1 · One-way · Known · Confirm · Informs D-008*

```markdown
## BRIEF

This is a confirmation session, not an open-ended design session: verify that six
already-shipped Kramak mechanisms are correctly-applied instances of established
engineering or HCI patterns. If T2-04's evidentiary audit is available to you, use it as
a starting point for the two mechanisms it already touches (Failure Taxonomy and
Capability Gate thresholds) rather than re-deriving that ground from scratch. The six
mechanisms, exactly as shipped: **(1) Grounded Verification** — every spec must quote
actual code, confirmed by grep, specifically to prevent hallucinated specs; **(2) Hard
Scope Check** — a deterministic `git diff --name-only` comparison against each work
item's declared file list, enforcing scope; **(3) Circuit Breaker** — stops infinite
audit-fix-audit loops; **(4) State Reconciliation** — crash recovery from state.json
inconsistency; **(5) Failure Taxonomy** — 6 failure categories with structured diagnosis;
**(6) INBOX System + Human Task Protocol** — structured mid-project user input, and
tracking of tasks that require human action without blocking the pipeline. Your audience
is a Principal Architect who wants a rigorous but efficient confirm-or-flag pass across
all six — not a from-scratch redesign of any of them.

## SCOPE

Temporal anchor: today is 2026-08-18 (use your actual current date if running later).

In scope, one established-pattern family per mechanism: grounding/citation-forcing for
hallucination mitigation (mechanism 1); deterministic diff-based scope/change control
(mechanism 2); circuit-breaker and backoff patterns from resilience engineering
(mechanism 3); idempotent recovery/reconciliation patterns from distributed systems
(mechanism 4); root-cause and failure-taxonomy design from SRE and software-quality
literature, plus any LLM-agent-specific failure-taxonomy research if discoverable
(mechanism 5); human-in-the-loop escalation and asynchronous-input patterns from HCI and
RPA literature (mechanism 6).

Out of scope: proposing an entirely new mechanism to replace any of these. Flag concrete,
scoped fixes only where a mechanism genuinely deviates from best practice — don't redesign
wholesale.

Source priority: established/canonical sources and peer-reviewed literature for each
pattern family first; production case studies from comparable systems second; blog
commentary last.

## APPROACH

Treat this as six compact sub-investigations under one session, kept roughly balanced —
don't let any single mechanism consume disproportionate effort. For each, briefly state
the established pattern it should resemble, check the described Kramak implementation
against it, and flag any deviation plainly. Two of the six (Failure Taxonomy and INBOX
System specifically) are more bespoke and less likely to map cleanly onto one named
pattern — where that's true, say so explicitly and evaluate against the closest available
analogues rather than forcing an artificial fit.

## DELIVERABLE

Because this covers six mechanisms, structure both **Key Findings** and **Detailed
Findings** as six clearly-labeled subsections (one per mechanism), and make
**Recommendation** a summary verdict table across all six rather than a single
paragraph. For each mechanism, your output must address:
- The established pattern(s) it's being checked against
- A confirm/flag verdict
- If flagged, a specific and scoped fix suggestion

Plus, across the whole bundle: an overall summary table; evidence grades per mechanism;
and an open-risks section that names which of the six has the thinnest evidence base and
would most benefit from real production data rather than literature alone.

## FORMAT

Produce a single, complete Markdown file. Start with YAML frontmatter exactly matching
this shape (fill in date/status/confidence when you finish):

---
id: T2-13
title: "Core Guardrail, Grounding & Coordination Mechanisms — Confirmation Bundle"
date: <date you complete this, YYYY-MM-DD>
status: complete
topic: guardrail-confirmation-bundle
tags: [grounding, circuit-breaker, scope-check, failure-taxonomy, human-in-the-loop]
informs_decisions: [D-008]
confidence: <High | Medium | Low>
---

Then these body sections, in order: **Research Question**; **Key Findings** — six
subsections, one per mechanism; **Recommendation** — the summary verdict table across
all six, isolated from the detailed reasoning; **Alternatives Considered** — for any
mechanism you flagged, the fix options you weighed; **Detailed Findings** — six
subsections, one per mechanism; **Open Questions & Risks** (name the thinnest-evidence
mechanism explicitly); **Sources & Evidence Ledger**, with every claim graded:
- Base grade: A (official docs/RFCs) · B (peer-reviewed/empirical) · C (vendor claims) ·
  D (blog/tutorial/AI recall) · E (unverifiable)
- Modifiers: corroboration (single/corroborated/contested) · recency
  (fresh/aging/stale) · directness (direct/indirect)
- Verification: fetched · cached · recalled · secondhand · human-provided (recalled
  claims capped at Grade D)
```

---

## T2-14
### Positioning & Adoption Blueprint
*Layer 2 · Synthesis · Hard-gated on T2-08, T2-12 · Informs D-003, D-007*

```markdown
## BRIEF

This is a synthesis session, not a new research session. Synthesize the verdicts from
the Specification Density decision (informed by session T2-08) and the Naming &
Positioning decision (informed by session T2-12), together with the competitive-landscape
findings from session T2-01, into one coherent, executable positioning-and-adoption
blueprint for Kramak — a shipped, file-based AI-agent development methodology. Do not
reopen either upstream decision's research question. Treat their verdicts as fixed
inputs, and produce a concrete, internally-consistent artifact: revised tagline and
elevator-pitch copy, a specific plan for any spec restructuring T2-08 recommended (or an
explicit confirmation that none is needed, if it recommended preserving current
density), and a brief rollout/migration note for existing v1.0.0 adopters if the
restructuring is nontrivial. Your audience is a Principal Architect who will use this
blueprint as the literal source text for updating Kramak's README, its docs, and
possibly the structure of PLANNER.md/EXECUTOR.md themselves.

## SCOPE

Temporal anchor: today is 2026-08-18 (use your actual current date if running later).

In scope: producing the concrete artifacts described above; checking the T2-08 and T2-12
recommendations against each other for mutual consistency — for instance, a tagline that
promises simplicity would sit awkwardly next to a decision to preserve maximal spec
density unchanged, and that tension needs to be resolved explicitly here, not left for
the reader to notice.

Out of scope: re-researching either upstream decision from scratch. If you find the
upstream verdicts insufficient to produce a concrete blueprint — genuinely ambiguous or
missing something this session needs — say so explicitly as an open risk rather than
quietly inventing new research to paper over the gap.

Source priority: primarily the upstream session artifacts (T2-01, T2-08, T2-12) as
direct inputs. Light supplementary research only to fill a genuine, narrow gap needed to
make the blueprint concrete (for example, confirming a specific formatting convention).

## APPROACH

This is synthesis, not landscape research, so "start broad, narrow down" doesn't apply
the same way here. Read the upstream decisions carefully, check them against each other
for consistency, and produce the concrete deliverable directly. Where the upstream
sessions left genuine ambiguity — a conditional recommendation, a "depends on X" — resolve
it explicitly here with stated reasoning, rather than passing the ambiguity forward
unresolved into a document meant to be final copy.

## DELIVERABLE

Your output must address:
- A specific revised tagline plus a one-paragraph positioning statement
- A specific spec-restructuring plan if T2-08 recommended one (what moves where, what
  stays, a rough before/after size comparison), or an explicit confirmation that no
  restructuring is needed if T2-08 recommended preserving current density
- A migration note addressing existing v1.0.0 adopters, if restructuring is nontrivial
- An explicit consistency check between the tagline/positioning and the spec-density
  decision, naming any tension found and how you resolved it
- Citations back to the specific upstream finding supporting each blueprint choice (most
  content here should trace to already-graded upstream evidence rather than introducing
  new claims)
- Open risks

## FORMAT

Produce a single, complete Markdown file. Start with YAML frontmatter exactly matching
this shape (fill in date/status/confidence when you finish):

---
id: T2-14
title: "Positioning & Adoption Blueprint"
date: <date you complete this, YYYY-MM-DD>
status: complete
topic: positioning-adoption-blueprint
tags: [synthesis, blueprint, tagline, spec-restructuring, migration]
informs_decisions: [D-003, D-007]
confidence: <High | Medium | Low>
---

Then these body sections, in order: **Research Question** (framed as a synthesis task);
**Key Findings** — a summary of the upstream verdicts being synthesized, not new
landscape findings; **Recommendation** — the blueprint itself: tagline, positioning
paragraph, restructuring plan or confirmation, migration note; **Alternatives
Considered** — other syntheses you considered and set aside; **Detailed Findings**;
**Open Questions & Risks**; **Sources & Evidence Ledger** — here, primarily a ledger of
which upstream session (T2-01/T2-08/T2-12) supports which specific blueprint choice, plus
grades for any genuinely new supplementary claim introduced in this session:
- Base grade: A (official docs/RFCs) · B (peer-reviewed/empirical) · C (vendor claims) ·
  D (blog/tutorial/AI recall) · E (unverifiable)
- Modifiers: corroboration (single/corroborated/contested) · recency
  (fresh/aging/stale) · directness (direct/indirect)
- Verification: fetched · cached · recalled · secondhand · human-provided
```

---

## T2-15
### v1.x/v2 Architecture Evolution Blueprint
*Layer 2 · Synthesis · Hard-gated on T2-05, T2-06, T2-07, T2-09, T2-10 (informed by T2-11) · Informs D-001, D-002, D-004, D-005*

```markdown
## BRIEF

This is a synthesis session, not a new research session. Synthesize the verdicts from
four decisions — the Core Orchestration Loop decision (informed by sessions T2-05 and
T2-06), the Self-Improvement Governance decision (T2-07), the Pure Methodology/Optional
Tooling decision (T2-09), and the Capability Gate Check decision (T2-10) — informed by
the Adapter Strategy decision (T2-11) for integration-layer compatibility considerations,
into one coherent technical roadmap for Kramak's next iteration. Specify: what changes,
if any, to the state.json JSON Schema, to the core spec files (PLANNER.md, EXECUTOR.md,
and the auditing-phase equivalent), and to the adapter layer are implied by the four
synthesized decisions; a rough sequencing/phasing plan for implementing them; and an
explicit backward-compatibility assessment for existing v1.0.0 adopters — does any of
this require a major version bump, and if so, what's the deprecation/migration path.
Your audience is a Principal Architect who will use this roadmap as the literal starting
point for the next iteration's actual spec-writing work, which sits outside this
pipeline's scope.

## SCOPE

Temporal anchor: today is 2026-08-18 (use your actual current date if running later).

In scope: producing the concrete roadmap artifact described above; resolving tensions
*between* the four upstream decisions where they interact — for instance, if the Core
Orchestration Loop decision recommends bounded multi-agent parallelism, check whether
that changes what the Capability Gate Check needs to gate (role assignment for a single
Executor is a different problem than role assignment across several concurrent
Executors), and whether it interacts with any hardening the Self-Improvement Governance
decision recommended.

Out of scope: re-researching any of the four upstream decisions — treat their verdicts as
fixed inputs. If a genuine, unresolved conflict surfaces between two upstream verdicts
that this session cannot responsibly resolve on its own, flag it explicitly for the
conflict-resolution process rather than silently picking a side to keep the roadmap tidy.

Source priority: primarily the upstream session artifacts as direct inputs. Light
supplementary research only where genuinely needed to make the roadmap concrete — for
example, current JSON Schema versioning best practice, if that specific question wasn't
already covered upstream.

## APPROACH

This is synthesis, not landscape research. Read all four upstream decisions, map out
where they interact or create dependencies on each other, and produce a phased, concrete
roadmap. Be explicit about sequencing logic — what has to happen before what, and why,
not just a flat list of changes.

## DELIVERABLE

Your output must address:
- A summary of each of the four synthesized decisions' verdicts, cited back to their
  source sessions
- A concrete technical roadmap: what changes to the state.json schema, the core spec
  files, and the adapter layer are implied, in what sequence
- Explicit resolution — or explicit escalation to the conflict-resolution process — of
  any tension found between the upstream decisions
- A backward-compatibility and versioning assessment for existing v1.0.0 adopters
- Citations tracing each roadmap item back to the upstream session that justifies it
- Open risks for the roadmap itself, distinct from risks already logged in each upstream
  decision

## FORMAT

Produce a single, complete Markdown file. Start with YAML frontmatter exactly matching
this shape (fill in date/status/confidence when you finish):

---
id: T2-15
title: "v1.x/v2 Architecture Evolution Blueprint"
date: <date you complete this, YYYY-MM-DD>
status: complete
topic: architecture-evolution-blueprint
tags: [synthesis, blueprint, roadmap, state-schema, versioning, backward-compatibility]
informs_decisions: [D-001, D-002, D-004, D-005]
confidence: <High | Medium | Low>
---

Then these body sections, in order: **Research Question** (framed as a synthesis task);
**Key Findings** — a summary of the four upstream verdicts being synthesized; 
**Recommendation** — the phased technical roadmap itself; **Alternatives Considered** —
other sequencing or scoping choices you weighed; **Detailed Findings**; **Open Questions
& Risks**; **Sources & Evidence Ledger** — a ledger of which upstream session supports
which roadmap item, plus grades for any new supplementary claim:
- Base grade: A (official docs/RFCs) · B (peer-reviewed/empirical) · C (vendor claims) ·
  D (blog/tutorial/AI recall) · E (unverifiable)
- Modifiers: corroboration (single/corroborated/contested) · recency
  (fresh/aging/stale) · directness (direct/indirect)
- Verification: fetched · cached · recalled · secondhand · human-provided
```

---

## T2-16
### Grand Synthesis: FAD Compilation & Phase 0 Gate Readiness
*Sink · Compilation · Hard-gated on T2-13, T2-14, T2-15 · Informs all decisions*

```markdown
## BRIEF

This is the pipeline's sink node: compilation and conflict-detection, not new primary
research. Compile the complete Founding Architecture Document (FAD) for Kramak's next
iteration by integrating three inputs: the Core Guardrail/Grounding/Coordination
confirmation bundle (session T2-13), the Positioning & Adoption Blueprint (session
T2-14), and the Architecture Evolution Blueprint (session T2-15) — cross-checked against
every decision logged in the project's decision registry (DECISIONS.md) for mutual
consistency. Your audience is a Principal Architect performing final review before
authorizing the next phase of actual spec-writing and implementation work to begin.

## SCOPE

Temporal anchor: today is 2026-08-18 (use your actual current date if running later).

In scope: cross-referencing all upstream decisions for mutual consistency — for example,
does the Architecture Evolution Blueprint's roadmap assume anything the Positioning
Blueprint contradicts; do the Guardrail bundle's confirm/flag verdicts get correctly
reflected in the roadmap wherever relevant (if the Failure Taxonomy was flagged for a
fix, does the roadmap actually account for it, or does it fall through a crack between
the two blueprints); producing a Phase 0 gate-readiness checklist, split into two tracks
— a lightweight track for reversible (two-way-door) decisions and a rigorous track for
irreversible (one-way-door) decisions, since those shouldn't cost the same to close out.

Out of scope: any new primary research. If you find a genuine gap — a decision with no
session coverage, or two sessions that contradict each other unresolved — your job is to
surface it clearly for the conflict-resolution process, not to silently resolve it by
inventing new analysis on the spot. That would defeat the point of having a compilation
step at all.

Source priority: exclusively the upstream session artifacts and the decision registry.
No new external research is expected; light verification fetches are fine if a specific,
narrow factual cross-check genuinely needs one.

## APPROACH

This is compilation and audit, not landscape research. Systematically walk every decision
in the registry, confirm it has a completed, filed session artifact (or an explicit
"resolved without a dedicated session" note, for the couple of decisions the pipeline
settled that way), confirm its recorded verdict is reflected consistently across both
Layer 2 blueprints, and produce the gate-readiness checklist. Flag anything incomplete or
contradictory explicitly and plainly — resist the pull to smooth things over into a
falsely tidy picture just because a clean GO recommendation is the more satisfying
output.

## DELIVERABLE

Your output must address:
- A decision-by-decision compilation confirming each decision's status, verdict, and
  supporting session(s)
- An explicit list of any cross-decision conflicts found, each routed to the
  conflict-resolution process rather than resolved unilaterally here
- A completed two-track (reversible / irreversible) gate-readiness checklist, decision by
  decision
- An explicit GO / NO-GO / GO-WITH-CONDITIONS recommendation for proceeding to the next
  implementation phase
- If GO-WITH-CONDITIONS: the specific conditions, stated concretely enough to act on
- Open risks carried forward that this pipeline could not fully resolve on its own

## FORMAT

Produce a single, complete Markdown file. Start with YAML frontmatter exactly matching
this shape (fill in date/status/confidence when you finish):

---
id: T2-16
title: "Grand Synthesis: FAD Compilation & Phase 0 Gate Readiness"
date: <date you complete this, YYYY-MM-DD>
status: complete
topic: grand-synthesis
tags: [fad-compilation, gate-readiness, conflict-detection, go-no-go]
informs_decisions: [D-001, D-002, D-003, D-004, D-005, D-006, D-007, D-008, D-009, D-010]
confidence: <High | Medium | Low>
---

Then these body sections, in order: **Research Question** (framed as a compilation/audit
task); **Key Findings** — the decision-by-decision compilation status; **Recommendation**
— the GO / NO-GO / GO-WITH-CONDITIONS call, isolated and stated plainly first;
**Alternatives Considered** — what a different call (e.g. a stricter or looser gate)
would have looked like, and why you didn't make it; **Detailed Findings** — the full
two-track gate checklist plus any conflicts found; **Open Questions & Risks** — carried
forward into the next phase; **Sources & Evidence Ledger** — here, a ledger of
session-artifacts-as-sources (which T2-NN file supports which compiled claim), since this
is a compilation exercise rather than one drawing on new external sources.
```
