---
id: T2-02
title: "Agentic Software Engineering & Multi-Agent Orchestration: Research Literature"
date: 2026-08-19
status: complete
topic: agentic-se-research
tags: [multi-agent-systems, orchestration, role-specialization, failure-modes, empirical-research]
informs_decisions: [D-001, D-002, D-004, D-006]
confidence: Medium
---

# Agentic Software Engineering & Multi-Agent Orchestration: Research Literature

## 1. Research Question

Is Kramak's core architecture — a strict, sequential, non-parallel state machine consisting of one Planner session, followed by one Executor session, followed by a technical Auditor loop, with (a) high-reasoning models (Opus/o3/Gemini-Pro class) deliberately assigned to planning, (b) fast/precise models (Sonnet/4o/Flash class) assigned to execution as a cost/capability matching strategy, and (c) state persisted via a JSON-Schema-validated `state.json` between stages — supported by current empirical software-engineering research? Or does the evidence favor a continuous single-agent loop, or an emergent/dynamic multi-agent swarm, for autonomous coding work at this scale?

This report treats Kramak as three separable design claims, because the literature supports them to different degrees:

1. **Structural claim** — decision-making should be split into discrete, role-bounded stages (Plan → Execute → Audit) connected by hard session boundaries, rather than kept in one continuous agent loop.
2. **Routing claim** — different stages should run on models chosen for capability/cost fit (strong reasoning model for planning, fast/cheap model for execution).
3. **Control-plane claim** — state should be externalized into a schema-validated artifact rather than living implicitly in conversational history, and transitions should be governed by a finite state machine rather than free-form agent negotiation.

## 2. Key Findings

- **Controlled, apples-to-apples comparisons now consistently show that well-engineered single-agent loops match or beat homogeneous multi-agent workflows on coding-class benchmarks once compute is held constant.** Agentless (FSE 2025), *Rethinking the Value of Multi-Agent Workflow* (ICLR 2026), and *Do More Agents Help?* (BenchAgent, 2026) each find that adding agent/role structure over the same base model rarely produces a net-positive, cost-adjusted gain, and in BenchAgent's controlled protocol five of six tested multi-agent designs trailed a matched single-agent anchor by 2.56–11.29 accuracy points at higher cost. [Grade: A/B]

- **The most rigorous failure taxonomy of multi-agent LLM systems to date (MAST, Cemri et al., NeurIPS 2025) attributes most failures to specification, coordination, and verification breakdowns rather than raw model incapacity** — 1,600+ traces across seven frameworks, failure rates of 41–86.7%, concentrated in system-design/specification issues, inter-agent misalignment, and inadequate task verification. This is exactly the failure surface an FSM with schema-validated state is designed to close, which is the strongest argument *for* Kramak's control-plane claim. [Grade: A]

- **The specific pattern of splitting a coding task into separate sessions by SDLC role (planner / implementer / tester / reviewer) is the one pattern industry practitioners single out as the most likely to fail.** Anthropic's own January 2026 guidance reports an internal experiment in which planner/implementer/tester/reviewer subagents "spent more tokens on coordination than on actual work," and recommends decomposing by *context boundary*, not by *role*. Cognition's production experience (Devin) reaches the same conclusion from a different direction: reliability requires full-trace context sharing across any handoff, and this is where Kramak's structural claim is most exposed. [Grade: A]

- **Cost/capability-asymmetric model routing (strong model for planning, cheap/fast model for execution) is separately and independently well supported.** PEAR, IPIGuard's ablations, D-CIPHER, Dr. MAS, and AgentCARD all find that a weak planner degrades outcomes more than a weak executor, that planning is a small share of total tokens (so upgrading it is cheap leverage), and that heterogeneous-model teams sit on the cost–accuracy Pareto frontier versus homogeneous teams. Kramak's routing claim is the best-evidenced piece of the architecture. [Grade: B]

- **FSM-constrained control loops reliably beat free-form emergent agent dialogue when the comparison is apples-to-apples** — MetaGPT's founding thesis, AgenticLybic's FSM-routed SOTA result on OSWorld, and the general structured-workflow literature converge here. But the best-performing FSM patterns keep the *frontier reasoning* in one continuous thread and use isolated, blackbox sub-agent calls only for parallelizable search or verification — not full peer-to-peer session handoffs between differently-scoped agents. [Grade: B]

- **Self-critique/audit loops only work when grounded in external, checkable feedback.** Reflexion's gains come from self-generated *test execution* results, not introspection; Huang et al. (ICLR 2024) show that pure intrinsic self-correction (no external signal) reliably degrades accuracy on reasoning tasks. Anthropic separately documents an "early victory problem" — verification agents rubber-stamp weak work unless given explicit, concrete pass criteria. Whether Kramak's Auditor is tool-grounded (runs tests) or text-only materially changes which literature applies to it. [Grade: A/B]

- **Benchmark deltas currently available to arbitrate this debate should be heavily discounted.** SWE-bench Verified is saturated at the frontier (95–97%, within ~4 points, as of August 2026), an April 2026 UC Berkeley study reward-hacked SWE-bench Verified and Pro to near-100% scores with zero genuine task-solving via evaluation-infrastructure exploits, and an independent adversarial re-test (SWE-ABS) found roughly one in five "solved" patches from top agents were semantically wrong. No published study evaluates Kramak's exact combination of design choices as a single named system. [Grade: A for the invalidity findings; the absence-of-direct-evidence point is definitional]

## 3. Recommendation

**Decompose the verdict — do not accept or reject Kramak as one unit.** The three design claims have different evidence profiles and should be evaluated (and potentially revised) independently:

| Kramak component | Verdict | Confidence |
|---|---|---|
| **Routing claim** — strong model for Planner, fast/cheap model for Executor | **Evidence-backed** | High |
| **Control-plane claim** — FSM discipline + schema-validated externalized state, vs. free-form emergent dialogue | **Evidence-backed** | Medium-High |
| **Structural claim** — hard session boundary *by SDLC role* (separate Planner/Executor/Auditor sessions), as opposed to a continuous thread or a context-boundary-based split | **Evidence-neutral to contradicted** | Medium |

Three concrete changes would move the structural claim from "contradicted" toward "evidence-backed," without touching the parts of Kramak the evidence already supports:

1. **Stop compressing the handoff artifact.** The literature is specific that the failure mode is losing the *trace*, not merely losing "a plan." If the Executor session currently receives a distilled plan document rather than the Planner's full reasoning trace (including rejected alternatives and the "why," not just the "what"), this is the single highest-leverage fix available and directly targets Anthropic's documented "telephone game" failure and Cognition's Principle 1 (share full agent traces, not just messages).
2. **Re-scope the Auditor as a blackbox, execution-grounded verifier, not a text reviewer.** Give it the artifact plus concrete, comprehensive, mechanically-checkable pass criteria (full test suite run, explicit negative tests, no partial credit for "looks right") rather than open-ended code-quality judgment. This sidesteps both the intrinsic-self-correction failure mode and the "early victory" shortcut-taking failure mode documented above, and is the one multi-agent pattern (verification subagent) that both Anthropic and Cognition independently endorse as reliably working.
3. **Re-test the "separate session" decision against a continuous-thread control.** Before treating the three-session design as load-bearing, benchmark it against a single continuous Planner-model session that hands off via in-thread compaction/tool-call delegation rather than a hard session boundary — this is the design pattern the strongest recent evidence (Cognition, Anthropic, *Rethinking the Value of Multi-Agent Workflow*) suggests should be the null hypothesis to beat, not an alternative to dismiss.

**Do not use SWE-bench Verified/Pro leaderboard position as the evaluation criterion for any of the above**, given the validity findings in §5.5. If a comparative benchmark is required, prefer a held-out or adversarially-strengthened task set (or execution-grounded internal tasks) over public leaderboard percentage.

## 4. Alternatives Considered

| Architecture | Description | What the evidence says |
|---|---|---|
| **Continuous single-agent loop** (one frontier model, one session, tool-grounded self-verification) | E.g., Devin/Cognition's default pattern, SWE-agent/mini-SWE-agent, OneFlow | Matches or beats homogeneous multi-agent workflows in controlled tests (Xu et al. 2026; Fu et al. 2026); simplest to reason about and debug; loses the one thing multi-model routing buys (per-stage cost/capability matching), since a single agent can't split a KV-cache across different underlying models. |
| **Structured-but-non-agentic pipeline** (fixed phases, no agent decides its own next action) | Agentless (localization → repair → patch validation) | Beat contemporary agent-based baselines on both accuracy and cost at publication; became an industry reference baseline (adopted by OpenAI and DeepSeek for model evaluation) specifically because removing agentic decision-making removes a large source of variance. Less applicable to Kramak, which needs an agentic Executor for arbitrary repo changes, but instructive: simplicity und constraint are themselves a competitive architecture, not merely a fallback. |
| **Emergent / dynamic multi-agent swarm** (free-form dialogue, no fixed roles, agents self-organize or negotiate) | Early ChatDev/CAMEL-style group chat, dynamic workflow generation (AFlow, agent-generated topologies) | Explicitly the pattern most consistently criticized in the literature — MAST's inter-agent-misalignment category, Cognition's "actions carry implicit decisions" argument, and Ao et al.'s decision-theoretic result (a delegated network cannot beat a centralized decision-maker absent new information) all target this pattern specifically. Kramak's strict, sequential, schema-governed design already avoids this failure mode by construction — this is a genuine point in its favor. |
| **Orchestrator + parallel isolated sub-agents** (Anthropic Research pattern) | Lead agent spawns several parallel subagents with clean, independent context windows, then synthesizes | Strong, well-evidenced pattern (90.2% internal-eval improvement over single-agent on breadth-first research), but the gain is specifically for *read-heavy, parallelizable, independently-decomposable* work at ~15x token cost. Coding is comparatively write-heavy and sequentially coupled (each change constrains the next), which is precisely the condition under which Anthropic's own more recent guidance says multi-agent decomposition backfires. Weak fit for Kramak's use case. |
| **Single main thread + blackbox verification sub-agent** | Claude Code subagent pattern; Anthropic's "verification subagent" recommendation | Closest pattern to what the evidence actually supports for coding: one continuous high-capability thread does the reasoning-heavy work, with narrowly-scoped, context-isolated sub-agent calls used *only* for parallel search or blackbox test/verification — never for parallel writing. This is structurally close to Kramak's Auditor stage but structurally further from Kramak's Planner→Executor split. |
| **Kramak (as specified)** | Strict sequential session-per-role FSM + heterogeneous model routing + schema-validated state | Routing and control-plane claims are evidence-backed; the specific choice to make Planner→Executor a *hard session boundary organized by SDLC role*, rather than a context-boundary or a continuous thread, is the component with the weakest and most contested support. |
