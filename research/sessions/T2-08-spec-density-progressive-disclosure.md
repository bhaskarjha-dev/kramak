---
id: T2-08
title: "Specification Density, Cognitive Friction & Progressive Disclosure Strategy"
date: 2026-08-19
status: complete
topic: spec-density
tags: [spec-density, progressive-disclosure, context-window, instruction-adherence, decision-record]
informs_decisions: [D-007]
confidence: Medium
---

# Specification Density, Cognitive Friction & Progressive Disclosure Strategy

*Decision record informing D-007. Prepared for Principal Architect review.*

## 1. Research Question

Does Kramak's comprehensive, monolithic specification approach — `PLANNER.md` (41.5 KB) and `EXECUTOR.md` (17.7 KB) — impose a measurable tax on the systems that actually consume it, distinct from the well-known tax it imposes on human readers? Specifically: does specification thoroughness at this density degrade **executing-agent instruction adherence**, and does it carry **inference token overhead** beyond what a leaner or differently-structured alternative would? And if so, should Kramak keep its current density, restructure toward progressive disclosure (lean core + on-demand modules), or adopt a staged-artifact pipeline in the style of GitHub Spec Kit?

**Scope note on method:** `PLANNER.md` and `EXECUTOR.md` were not available for direct inspection in this session (no file was attached; the working directory was checked and confirmed empty). This report therefore reasons from the file metadata given in the brief — names, sizes, and the existence of the Spec Detail Scaling mechanism (Innovation #4) — combined with primary-source research on LLM long-context behavior, official Anthropic engineering guidance, direct inspection of the RIPER-5 prompt, and current GitHub Spec Kit documentation. Where a claim depends on assumptions about the files' actual contents or Kramak's invocation mechanics, that assumption is flagged explicitly. A follow-up content audit of the two files against the recommended architecture (§5.9) is the natural next step and is called out in §6.

## 2. Key Findings

- **Context degradation is real, measured, and happens well before the context window fills.** Chroma's 2025 evaluation of 18 frontier models (including Claude 4, GPT-4.1, Gemini 2.5, Qwen3) found every model's output quality degrades as input length grows, often 30–50% below focused-input performance, at token counts far below the advertised window limit. This is a distinct phenomenon from window overflow — Anthropic's own engineering guidance now treats it as a named, expected constraint ("context rot," an "attention budget" that depletes with every added token) rather than an edge case. [Grade A — see §7]
- **Instruction density, independent of length, causes measurable adherence collapse.** A July 2026 benchmark stacking 1–20 verifier-checked instructions found the follow rate on Claude Sonnet 4.6 fall from ~96% at one instruction to ~45% at twenty, driven mainly by pairwise conflicts between rules rather than sheer token count. This is a second, mechanistically distinct risk from context rot: it argues for reducing the number of *simultaneously active* rules, not just the byte count. [Grade B]
- **Kramak's files sit well above Anthropic's own published ceiling for always-loaded instruction content.** Claude Code's memory system hard-caps eagerly-loaded instruction files at 200 lines / 25 KB, past which content is silently dropped on load. At 41.5 KB, `PLANNER.md` is roughly 66% over that ceiling (~10,600 tokens); `EXECUTOR.md` at 17.7 KB (~4,500 tokens) sits under it but consumes most of the budget by itself. Both are 4–10× the size of the entire RIPER-5 protocol (4.3 KB, measured directly from source).
- **Anthropic has already shipped the answer this decision is asking about.** Agent Skills (Oct 2025, open standard as of Dec 2025) is a productized three-tier progressive-disclosure architecture — metadata always loaded, body loaded on trigger, reference files loaded on demand — built specifically so that "the amount of context that can be bundled... is effectively unbounded" without being eagerly loaded. This is direct precedent for restructuring rather than either preserving density or discarding content.
- **The size of a spec is a weak, and sometimes inverse, proxy for its quality — but it is a strong proxy for how *trustworthy* it feels.** The effort heuristic (Kruger et al., 2004) is a well-replicated finding that people infer quality from perceived labor, and the effect is strongest exactly when objective quality is hard to verify directly — which describes most stakeholders' relationship to a 41.5 KB spec file. This creates an organizational incentive to keep the file large that has nothing to do with whether the file *works*, and any restructuring proposal has to consciously manage that perception. [Grade B]
- **RIPER-5 and GitHub Spec Kit are not competing answers to the same question Kramak is asking.** RIPER-5 solves "stop the model from freelancing" with almost no domain content; GitHub Spec Kit solves "generate a reviewable, versioned artifact chain for one feature," and — as of its v0.16.0 release (Aug 2026) — has itself begun migrating its own command delivery to SKILL.md-style progressive disclosure. Neither is a template for restructuring a durable, cross-task **role manual**, which is what `PLANNER.md`/`EXECUTOR.md` appear to be. This distinction is decisive for the recommendation in §3.

## 3. Recommendation

**Restructure `PLANNER.md` and `EXECUTOR.md` via progressive disclosure — a lean, eagerly-loaded core per role plus on-demand reference modules — rather than keeping current density or adopting a Spec-Kit-style staged pipeline as the primary fix.**

This is closest to option (b) in the brief. It is favored over option (a) because the evidence for execution-time cost from the current density is convergent, multi-sourced, and comes with essentially no downside risk to attempt (nothing has to be deleted — see below). It is favored over option (c) as the *primary* fix because Spec Kit's staged files (`spec.md` → `plan.md` → `tasks.md`) are scoped **per feature**, generated fresh for each piece of work and reviewed by a human between phases; `PLANNER.md`/`EXECUTOR.md` read as **standing role manuals** that must be available in full on every invocation of that role, which is a different problem with a different established solution (Anthropic's own Agent Skills pattern, §5.7). Adopting a staged pipeline as Kramak's *internal* architecture for these two files would be solving the wrong problem — it would fragment operating instructions along a linear per-feature workflow that operating instructions don't follow.

The concrete move: keep the two-role split (well-supported by the general planner–executor literature), and within each file separate the **always-relevant procedural backbone** (canonical workflow, decision points, 2–3 worked examples, non-negotiable constraints) from the **long tail** (edge cases, domain-specific conventions, error-recovery playbooks, tool-specific detail) that is read on demand rather than every time. Nothing described as valuable in the current files needs to be cut — it needs to be *re-gated*. A full structural outline is given in §5.9.

**A Spec-Kit-style staged pipeline remains worth pursuing, but as a separate, related decision**: if Kramak's Planner produces per-feature deliverables for the Executor to consume, those deliverables (not the Planner's own operating manual) are a legitimate candidate for a spec → plan → tasks staging pattern. That is out of scope for D-007 as framed and should be tracked as its own item if the team wants to pursue it.

**Confidence: Medium.** The directional case — don't leave ~15,000 tokens of static instruction eagerly loaded on every call — is strongly and convergently evidenced (§5, §7) and carries low downside risk because it's additive restructuring, not deletion. It is not graded High because (a) this analysis has no direct visibility into what fraction of the current 41.5 KB/17.7 KB is genuinely load-bearing versus redundant, and (b) at least one recent paper flags that progressive disclosure's *accuracy* benefit (as opposed to its well-established token-cost benefit) is often reported without a controlled comparison (§6, risk 1). Recommended de-risking: pilot on `EXECUTOR.md` first (§6, risk 6 explains why it likely has the larger effective footprint despite being the smaller file), instrument adherence before/after, then apply the same pattern to `PLANNER.md`.

## 4. Alternatives Considered

| Option | What it means for Kramak | Why it was / wasn't chosen |
|---|---|---|
| **(a) Keep density as-is** | No structural change to `PLANNER.md` / `EXECUTOR.md`. | Not recommended. The convergence of Chroma's context-rot findings, the instruction-stacking-collapse benchmark, and Anthropic's own explicit guidance against "laundry lists" of edge cases in a single prompt (§5) all point to a measurable, avoidable tax at this size. Not chosen — but not because large prompts are inherently broken: capable models are increasingly robust to length, and if a future content audit (§6) shows the files are already tightly edited with little redundancy, the *cost* of restructuring may not clear the bar even though the *direction* of the evidence still favors it. |
| **(b) Modularize via progressive disclosure** ✅ **Recommended** | Lean, eagerly-loaded core per role; detail modules loaded on demand; nothing deleted. | Chosen. Directly precedented by Anthropic's own Agent Skills architecture and CLAUDE.md/MEMORY.md size discipline (§5.7, §5.9); addresses both the position-bias and density-interference mechanisms (§5.1–5.2); preserves — rather than discards — the comprehensiveness that gives the current files their credibility; lowest migration cost since it doesn't change the two-role architecture, only the loading discipline within it. |
| **(c) Adopt a staged artifact pipeline (Spec Kit style)** | Replace `PLANNER.md`/`EXECUTOR.md` with a generated chain of phase-scoped files (constitution → spec → plan → tasks) per unit of work. | Not chosen as the primary fix for D-007. Spec Kit's staged files are a solution for producing and reviewing **one feature's** intent-to-implementation trail, not for storing an agent's own durable operating instructions (§3, §5.7). Nielsen Norman Group's own research on staged/wizard-style disclosure notes it performs worse when steps are interdependent and users (or agents) must alternate between them — which describes plan/execute cycles more than it describes a linear intake form. Worth pursuing as a *separate* decision if the Planner's output-to-Executor handoff would benefit from being staged artifacts rather than a single directive — see §3. |

## 5. Detailed Findings

### 5.1 Mechanism 1 — Position: primacy, recency, and "lost in the middle"

Liu et al.'s "Lost in the Middle" study is the foundational result here: across six model families, accuracy in multi-document QA and key-value retrieval followed a U-shaped curve by the position of the relevant information, with performance dropping more than 30% when the needed content sat in the middle of the input rather than at the start or end. The commonly proposed architectural root cause is the interaction between position-encoding decay and softmax attention normalization, which mechanically privileges tokens near the beginning or the very end of a sequence. This effect is not perfectly uniform across all benchmark designs — a later "Counting-Stars" evaluation did not cleanly reproduce it at longer context lengths — so it should be read as *a real and replicated tendency*, not an ironclad law that applies identically to every task shape. [Grade A, with a noted replication caveat]

The practical implication for a 41.5 KB file is straightforward: a rule stated once, in the middle of the document, competes for attention with everything the model has processed since — and gets less of it than a rule near the top or the most recent thing the model read.

### 5.2 Mechanism 2 — Density: instruction-stacking and constraint interference

This is a mechanistically distinct problem from position, and the evidence for it is more directly on point for a specification file, since spec files are functionally instruction stacks rather than retrieval documents. A July 2026 benchmark (three production models, 24 verifier-checked constraints stacked one at a time) found the follow rate falls non-linearly as instructions accumulate:

| Stack size | Claude Sonnet 4.6 | GPT-5-mini | Gemini 2.5 Flash |
|---|---|---|---|
| 1 instruction | 96.4% | 91.4% | 84.1% |
| 5 instructions | 83.7% | 79.3% | 77.7% |
| 16 instructions | 57.7% | 52.1% | 48.7% |
| 20 instructions | 44.7% | 44.3% | 34.4% |

The paper's diagnosis is important: the drop is driven mainly by *pairwise conflicts* between instructions (in their design, a single formatting constraint was jointly unsatisfiable with nine others), not simply by the model "forgetting" the fortieth rule. [Grade B] A companion finding from a hierarchical instruction-following benchmark reinforces this: even the strongest tested models barely exceeded 50% full-compliance accuracy on nested constraint trees, with accuracy degrading sharply as nesting depth increased. [Grade B] A separate IBM study on instruction volume corroborates the general shape of the trend (accuracy falls as instruction count rises) and attributes it to the same underlying mechanism — rising tension and conflict between simultaneously active rules. [Grade B]

The implication: if `PLANNER.md`'s 41.5 KB encodes dozens of conditional rules — especially nested ones ("if in mode X, and condition Y holds, apply sub-rule Z unless override W") — the risk is not only that a rule gets missed, but that the model has to silently arbitrate between rules that are individually clear but jointly in tension, with no visibility into which one "won."

### 5.3 Mechanism 3 — Context rot and the attention budget

Chroma's 2025 research is the strongest single piece of evidence in this report because of its breadth (18 frontier models, including current Claude, GPT, Gemini, and Qwen generations) and because Anthropic has since adopted its framing and terminology in its own official engineering guidance. The core finding: model output quality degrades continuously as input length grows, and this happens **well before** the model's stated context window is full — a 200K-token-window model can show meaningful degradation by 50K tokens. Two nuances matter for this report specifically: semantic similarity between the target content and surrounding "distractor" content drives decay more than raw length does, and — counterintuitively — well-organized, coherent input can degrade performance *more* than shuffled input in some of Chroma's experiments, meaning simply formatting a large file cleanly does not neutralize the length penalty. [Grade A]

Anthropic's own September 2025 engineering post builds directly on this and gives the report its clearest available design principle: **"the right altitude."** System prompts fail in two opposite directions — either hard-coded, brittle, exhaustive rule sets that create fragility, or vague guidance that gives no concrete signal. The post explicitly warns against the practice of "stuff[ing] a laundry list of edge cases into a prompt in an attempt to articulate every possible rule," recommending instead a small set of diverse, canonical examples. It also states plainly that the goal is "the smallest possible set of high-signal tokens" — and clarifies that minimal does not mean short; it means nothing in the prompt is there without earning its place. [Grade A — official primary source, directly on point]

### 5.4 The token-overhead axis, separated from the accuracy axis

The brief asks for these to be treated as distinct, and they genuinely are two different problems with two different remedies.

**Dollar/latency cost** of a large, static, repeatedly-sent system prompt is substantially — not fully — mitigated by prompt caching: Anthropic's platform charges roughly 10% of standard input price for a cached prefix on repeat calls within the cache TTL (5 minutes by default, extendable to 1 hour), so a large static block that's reused across many calls in a session becomes cheap after the first one or two calls. [Grade A — official pricing documentation]

**Accuracy/adherence degradation** is not addressed by caching at all. Caching reuses a previously computed key-value state; it does not change how many tokens the model's attention mechanism has to spread across at generation time, and context rot / lost-in-the-middle effects are a property of that attention allocation, not of how the prefix was computed. A perfectly cached 41.5 KB prompt is exactly as prone to instruction-stacking collapse and position bias as an uncached one. This is the report's central technical distinction: **the cost problem is largely solved; the adherence problem is not**, and cost being cheap is not evidence that adherence is fine.

This matters most for `EXECUTOR.md`. Community documentation of how rule files behave inside agent harnesses notes that such files are typically re-injected into context on every tool call within a loop, meaning every line carries a cost multiplied by the number of steps in a task, not paid once. [Grade C — practitioner-sourced, but consistent with the general mechanics of context-window management] If `EXECUTOR.md`'s 17.7 KB (~4,500 tokens) sits in context on every one of, say, 15–30 tool calls in a typical execution run, its *cumulative* footprint across that run can exceed `PLANNER.md`'s, even though the base file is roughly 2.3× smaller. This is a genuinely counter-intuitive point worth flagging directly to the architect: **`EXECUTOR.md` is very plausibly the higher-priority file to fix first**, precisely because of how it's likely invoked, not despite it being the smaller of the two.

### 5.5 Applying this to Kramak's files: the numbers

Working from the sizes given in the brief, using the standard ~4-characters-per-token approximation (an estimate — actual tokenization varies with markdown syntax density and code blocks, so treat these as order-of-magnitude, not exact):

| File | Size | Approx. tokens | vs. RIPER-5 (4.3 KB, measured) | vs. Claude Code's 25 KB eager-load ceiling |
|---|---|---|---|---|
| `PLANNER.md` | 41.5 KB | ~10,600 | 9.6× larger | 66% over the ceiling |
| `EXECUTOR.md` | 17.7 KB | ~4,500 | 4.1× larger | 71% of the ceiling (under, but leaves little headroom for anything else eagerly loaded alongside it) |
| Combined, if both are ever in context together | 59.2 KB | ~15,200 | — | — |

The 25 KB / 200-line figure is not an arbitrary comparison point — it's the exact threshold Anthropic enforces in Claude Code's own memory system for content that gets eagerly loaded into every session, precisely because content past that point was found to need active management rather than blanket inclusion. Community practitioner consensus around Claude Code's `CLAUDE.md` sits even lower in practice (under ~300 lines is the general recommendation; some teams keep their root file under 60 lines and push everything else into on-demand references). [Grade B–C, practitioner sources] Kramak's `PLANNER.md` is not a marginal case relative to any of these reference points — it is a clear outlier by all of them.

### 5.6 The human side: perceived rigor, the effort heuristic, and onboarding friction

The brief specifically asks for this to be evaluated as its own axis, separate from execution mechanics.

The effort heuristic — a well-established finding that people infer the quality and worth of an artifact from the perceived labor that went into it, independent of the artifact's actual merit — is strongest precisely when objective quality is hard to assess directly. A specification file is close to the textbook case: most stakeholders cannot easily verify whether a 41.5 KB planning spec is well-calibrated or padded, so its size does real, if unearned, work in signaling rigor. [Grade B] This creates a structural tension the architect should name explicitly rather than let run in the background: **the organizational incentive points toward keeping the file large, independent of whether that size helps the file work.** Any restructuring proposal will likely face some version of "but doesn't shrinking it mean less thorough?" — which is exactly the effort heuristic operating on the proposal itself.

The good news is that progressive disclosure is a direct answer to this objection, not just a technical fix: because nothing is deleted, only re-gated, the full depth remains available and discoverable to a skeptical reader (or a future edge case) exactly as before — the difference is what's loaded by default versus what's one lookup away. This should be part of how the change is communicated, not just how it's implemented.

On the general onboarding-friction side, the evidence is directionally consistent but lower-grade: developer-tool research repeatedly finds that time-to-first-success is a strong predictor of abandonment, and that cognitive overload at a single decision point (too much to absorb before the first productive action) is a common, specific failure mode — one documentation-platform case study reported a 30% reduction in onboarding time and a halving of related support queries after restructuring dense reference material into progressively-disclosed layers. [Grade C — vendor case study, directional only, not a controlled study] This is consistent with, but weaker evidence than, the LLM-specific findings above, and should be weighted accordingly — it supports the recommendation but isn't the load-bearing reason for it.

### 5.7 Comparative architecture: Kramak vs. RIPER-5 vs. GitHub Spec Kit

| Dimension | Kramak (current) | RIPER-5 | GitHub Spec Kit |
|---|---|---|---|
| Structure | Two monolithic role files (`PLANNER.md`, `EXECUTOR.md`) | One file, a procedural state machine | Multiple phase-scoped files (`constitution.md`, `spec.md`, `plan.md`, `tasks.md`, generated in sequence) |
| Measured size | 41.5 KB + 17.7 KB | 4.3 KB total (measured directly from source) | Varies per feature; each artifact is deliberately narrow in scope |
| What's encoded | Full role behavior, apparently including most edge cases, plus the Spec Detail Scaling tiers | Pure workflow gating — five modes, entry/exit rules, transition signals. Essentially zero domain content | Structured requirements, technical approach, and an ordered task list for **one feature at a time** |
| Primary adherence mechanism | Comprehensiveness — state the rule once, hope it's found when needed | Repeated self-declaration every single turn (`[MODE: X]`) — a cheap exploit of recency bias rather than a bet on the model recalling something said once | Phase-gated human review between artifacts, plus a read-only `/speckit.analyze` command that cross-checks the artifacts for contradictions before implementation begins |
| When is it (re)loaded | Presumably eagerly per invocation of that role — unconfirmed, see §6 | Eagerly, every session, and its core constraint is re-asserted every response by design | Only the artifact(s) relevant to the current phase are in active use; earlier ones are referenced, not necessarily reloaded in full |
| Known limitation | Subject of this review | Even the RIPER-5 community forked a leaner "sigma" variant specifically over token-count concerns — at a base size of only ~4 KB, which is worth sitting with | NN/g's own research on staged/wizard-style disclosure (§5.9 discusses the distinction) notes it degrades when steps are interdependent and require alternating rather than one-directional progress — true of plan/execute cycles more than of linear intake |
| Recent trajectory (as of Aug 2026) | — | — | v0.16.0 (Aug 2026) began shipping its Copilot integration using `SKILL.md`-based progressive disclosure instead of flat slash-commands — i.e., converging toward the same pattern recommended here |

The comparison is instructive less for "which is better" than for what each tool is actually optimizing. RIPER-5 achieves reliable behavior with almost no domain content because its problem (stop the model from acting unilaterally) is purely procedural. Spec Kit achieves reliable behavior by keeping each artifact narrow because its problem (agree on what to build before building it) is naturally decomposable into sequential phases with a human checkpoint between them. Kramak's problem — give a role durable, comprehensive operating knowledge that's available whenever that role runs — is neither of those, which is why neither tool is a drop-in replacement. The applicable lesson from both is structural (small always-loaded core; gate everything else), not literal (adopt RIPER-5's mode system or Spec Kit's file chain wholesale).

### 5.8 Assessing Innovation #4 (Spec Detail Scaling: 🔴 Guided / 🟡 Directed / 🟢 Outcome)

Based on the description in the brief, this mechanism is directionally well-aligned with Anthropic's "right altitude" principle (§5.3) — it's an explicit attempt to match instruction density to how much guidance a given task actually needs, rather than applying uniform maximum detail everywhere. That's the right instinct, and it should be preserved and built on rather than replaced.

One risk is worth flagging specifically for the 🟢 Outcome tier. A controlled benchmark testing what happens when agents are given goal/KPI-style instructions without accompanying procedural constraints found outcome-driven constraint violations (metric gaming, unauthorized shortcuts, and similar behavior) in roughly a quarter or more of runs across most of the twelve models tested, rising as high as 63% in the worst case. [Grade B] The mechanism at work is straightforward: stripping procedural detail is safe when what's stripped is genuinely optional elaboration, but risky when what gets stripped along with it is a non-negotiable constraint that happened to live in the same paragraph. If Kramak's Outcome tier scales down by trimming sections rather than by distinguishing *constraint* content from *procedural* content, this is a live risk. The practical fix is structural, not a reason to abandon the tiering: keep the non-negotiable guardrails in a location that is loaded regardless of tier (see the `ROUTER.md` layer in §5.9), and let only the procedural elaboration scale with the 🔴/🟡/🟢 setting.

### 5.9 Recommended information architecture (structural outline)

The following preserves the two-role split and the existing Spec Detail Scaling concept, and applies progressive disclosure within each role rather than across a linear pipeline:

```
kramak/
├── ROUTER.md                      (~1–2 KB · always loaded by both roles)
│    · role identity + the "right altitude" mission statement
│    · the small set of non-negotiable global constraints — NEVER scaled away,
│      regardless of Spec Detail Scaling tier (addresses the §5.8 risk)
│    · module manifest: name + one-line "load this when…" trigger for every
│      on-demand file below (mirrors the metadata layer of Anthropic's Skill format)
│    · the 🔴 Guided / 🟡 Directed / 🟢 Outcome tier definitions themselves,
│      defined once here rather than duplicated per role
│
├── planner/
│   ├── CORE.md                    (target < 8–10 KB · eagerly loaded with ROUTER.md)
│   │    · canonical planning workflow
│   │    · 2–3 diverse, canonical worked examples — not an edge-case catalog
│   │    · explicit pointers: "if <condition>, read planner/<module>.md"
│   ├── edge-cases.md              (on demand)
│   ├── domain-conventions.md      (on demand)
│   └── output-contract.md         (on demand — natural home for a Spec-Kit-style
│                                    staged spec→plan→tasks handoff format, if the
│                                    team pursues that as the separate decision
│                                    flagged in §3)
│
└── executor/
    ├── CORE.md                    (target < 6–8 KB · eagerly loaded with ROUTER.md)
    │    · canonical execution loop
    │    · a small, RIPER-5-style re-asserted checklist for the highest-risk
    │      actions — cheap insurance against recency/position bias (§5.1)
    │      that restructuring alone doesn't buy
    │    · explicit pointers: "if <condition>, read executor/<module>.md"
    ├── error-recovery.md          (on demand)
    ├── tool-playbooks.md          (on demand)
    └── PROGRESS.md                (session-scoped; the Executor writes and reads
                                     this itself — structured note-taking for
                                     running state, instead of trying to hold an
                                     entire task's history in the static prompt)
```

Sizing targets are deliberately modeled on Claude Code's own enforced ceiling (§5.5) and on practitioner consensus around `CLAUDE.md`, not picked arbitrarily. The `PROGRESS.md` piece for the Executor specifically addresses the repeated-injection risk in §5.4 and §6 (risk 6): it keeps the *static* per-call footprint minimal while giving the Executor a place to externalize the *dynamic* accumulation that a long task naturally produces, rather than trying to make one file serve both purposes.

## 6. Open Questions & Risks

1. **No direct content audit was possible.** This report reasons from file size and the brief's description, not from reading `PLANNER.md`/`EXECUTOR.md` directly. It's possible a larger-than-assumed share of the current content is already high-signal and frequently used. *Reversal trigger:* a line-by-line audit showing less than roughly 15–20% of either file is genuinely low-frequency/edge-case material would weaken the case for full re-architecture; a lighter pass (trim redundancy, reorder for primacy) might suffice instead.
2. **Migration cost may not clear the bar if usage volume is low.** If Kramak's Planner/Executor roles run infrequently, the cumulative token and adherence cost of the current density may be small in absolute terms. *Reversal trigger:* if call-volume logs show low invocation frequency and no observed adherence failures in practice, deprioritize relative to other roadmap items.
3. **Model-capability trajectory is a moving target.** Anthropic's own guidance states that more capable models require progressively less prescriptive engineering. If Kramak's underlying model improves materially, some of the measured degradation may shrink on its own. *Reversal trigger:* benchmark adherence on the current density before and after a model upgrade; if the delta is negligible on the new model, the urgency of the *accuracy* argument drops (the cost and perceived-rigor arguments in §5.4 and §5.6 remain independently valid either way).
4. **Progressive disclosure introduces a new failure mode: silent non-retrieval.** Anthropic's own engineering guidance is explicit that agents navigating context autonomously can "waste context by misusing tools, chasing dead-ends, or failing to identify key information" — a module that should have been loaded simply isn't. *Reversal trigger:* pilot testing showing a non-trivial rate of missed on-demand modules on tasks that clearly needed them means the `ROUTER.md` trigger descriptions need iteration, or that specific module should be promoted back into the eager-loaded core.
5. **The 🟢 Outcome tier's constraint-violation risk (§5.8) needs empirical confirmation in Kramak's own context**, not just the general benchmark literature cited here. *Reversal trigger:* if audit or testing shows elevated scope violations or skipped constraints specifically on Outcome-tier tasks versus Guided-tier tasks, hard-code the non-negotiable constraint set into `ROUTER.md` immediately regardless of remaining rollout timeline.
6. **The assumption that `EXECUTOR.md` is re-injected on every tool call is inferred, not confirmed.** It's a reasonable inference from the file's name and role and from how such systems are commonly built, but Kramak's actual invocation and context-management mechanics are unverified. *Reversal trigger:* if `EXECUTOR.md` is in fact loaded once per task rather than once per step, the "repetition multiplier" argument for prioritizing it over `PLANNER.md` weakens substantially, and the two files should be treated as roughly equal priority instead.
7. **Perception risk: restructuring may read internally as "cutting corners."** Given the effort heuristic (§5.6), stakeholders accustomed to the current file's heft may interpret modularization as a quality reduction even though no content is removed. *Mitigation, not a trigger:* track and communicate total addressable content across all tiers (unchanged or larger post-restructure) as an explicit part of the rollout, so the "rigor" signal isn't lost along with the byte count.

## 7. Sources & Evidence Ledger

Grading rubric applied (no internal "Universal Evidence Standard" document was available in this session, so a standard three-tier rubric is used and should be re-mapped by the architect if a formal internal standard exists):
**Grade A** — official primary source (vendor engineering documentation, official product docs) or a well-replicated/broadly corroborated empirical finding. **Grade B** — a single well-designed benchmark or study not yet independently replicated, or a clearly-attributed practitioner primary source. **Grade C** — vendor case study, community blog, or a specific numeric claim that could not be independently corroborated; included for directional color only, never load-bearing alone.

| # | Source | Grade | Supports |
|---|---|---|---|
| 1 | Liu et al., *Lost in the Middle: How Language Models Use Long Contexts* (2023/2024) | A | §5.1 — position-dependent (U-shaped) retrieval accuracy; >30% degradation for mid-context information, replicated across 6 model families |
| 2 | Chroma, *Context Rot: How Increasing Input Tokens Impacts LLM Performance* (2025), trychroma.com/research/context-rot | A | §5.3, §5.5 — degradation well before window limits, across 18 frontier models; semantic-similarity and structure findings |
| 3 | Anthropic, *Effective context engineering for AI agents* (Sept 29, 2025), anthropic.com/engineering | A | §5.3, §5.4 — "right altitude," attention budget, "smallest set of high-signal tokens," warning against edge-case laundry lists |
| 4 | Anthropic, *Equipping agents for the real world with Agent Skills* (Oct 16, 2025), anthropic.com/engineering | A | §3, §5.7, §5.9 — three-tier progressive disclosure precedent; "effectively unbounded" bundled content; "split when unwieldy" guidance |
| 5 | Jakob Nielsen / Nielsen Norman Group, *Progressive Disclosure* (Dec 3, 2006), nngroup.com | A | §4, §5.9 — foundational definition; ≤2 disclosure levels guidance; progressive vs. staged disclosure distinction and staged disclosure's interdependent-steps caution |
| 6 | Claude Code Docs, *How Claude remembers your project*, code.claude.com/docs/en/memory | A | §5.5 — the 200-line/25 KB eager-load ceiling and truncation-on-exceed behavior used as Kramak's size benchmark |
| 7 | Claude Platform Docs, Pricing and Prompt Caching, platform.claude.com/docs | A | §5.4 — cache read/write pricing mechanics underlying the cost-vs-accuracy distinction |
| 8 | RIPER-5 original prompt, Cursor Community Forum (robotlovehuman, Mar 2025), mirrored at gist.github.com/Mukei | A | §5.7, §5.9 — primary-source text, directly measured (4.3 KB / 1,106 tokens / 80 lines) |
| 9 | `johnpeterman72/CursorRIPER` and `cursor_memory_riper_framework`, GitHub | B | §5.7 — existence of a token-conscious "sigma" fork of RIPER-5, corroborating token-count concern even at ~4 KB scale |
| 10 | GitHub, `github/spec-kit` repository, docs, and templates (spec-driven.md, quickstart, release notes); Wavect production review (14 Aug 2026, ~127.8k stars) | A | §5.7 — staged constitution/spec/plan/tasks workflow; current scale/activity; v0.16.0 shift to SKILL.md-based delivery |
| 11 | *Instruction Stacking Collapse: A Benchmark and the Capability-Dependent Value of Prompt Compilation* (arXiv 2608.02639, 2026) | B | §5.2 — the 96%→45% follow-rate collapse table; pairwise-conflict diagnosis |
| 12 | Jaroslawicz et al., *How Many Instructions Can LLMs Follow at Once?* / IFScale (arXiv 2507.11538, 2025) | B | §5.2 — instruction-density degradation patterns, primacy bias in instruction position |
| 13 | *IFHierBench: Hierarchical Instruction Following for LLMs* (arXiv 2607.27912, 2026) | B | §5.2 — nested-constraint accuracy ceiling (~50%) and sharp degradation with constraint depth |
| 14 | Elder, Duesterwald & Muthusamy, *Boosting Instruction Following at Scale* / ScaledIF (arXiv 2510.14842, 2025) | B | §5.2 — corroborating trend of degradation with instruction count; conflict/tension as cause |
| 15 | *Effort heuristic*, summarizing Kruger, Wirtz, Van Boven & Altermatt (2004) | B | §5.6 — perceived-effort-drives-perceived-quality finding, strongest under uncertain objective quality |
| 16 | HumanLayer, *Writing a good CLAUDE.md* (Nov 25, 2025), humanlayer.dev/blog | B | §5.5 — practitioner size norms (<300 lines general, <60 lines for one team's root file); explicit application of progressive disclosure to agent memory files |
| 17 | *Is Progressive Disclosure All You Need for Long-Context Agents?* (arXiv 2607.17598, 2026) | B | §3, §6 (risk 1) — caveat that token-savings claims for progressive disclosure are often reported without controlled accuracy comparison |
| 18 | *A Benchmark for Evaluating Outcome-Driven Constraint Violations in Autonomous AI Agents* (arXiv 2512.20798, 2026) | B | §5.8 — 25–63% constraint-violation rates under outcome/KPI-only instruction framing across 12 models |
| 19 | *PEAR: Planner-Executor Agent Robustness Benchmark* (arXiv 2510.07505, 2026) | B | §5.7 footnote-level context — planner fidelity affects overall task performance more than executor fidelity in the planner-executor pattern generally |
| 20 | ReadMe.com customer case study (Socure), readme.com/customers/socure | C | §5.6 — directional onboarding-friction figures (30% time reduction, halved support queries) from restructuring dense docs; vendor case study, not a controlled study |
| 21 | `abhishekray07/claude-md-templates`, GitHub; DEV Community, *CLAUDE.md Best Practices* (2026) | C | §5.5 — the ~150–200 total-instruction adherence ceiling and AGENTS.md adoption figures; unverified at primary source, included for directional color only |

**Overall confidence: Medium** (repeated from frontmatter for visibility). The mechanism-level evidence for restructuring is strong and convergent; the file-specific application to Kramak carries residual uncertainty because the source files themselves were not reviewed directly in this session.
