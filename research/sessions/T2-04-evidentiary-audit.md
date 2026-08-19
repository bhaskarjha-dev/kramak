---
id: T2-04
title: "Evidentiary Audit of Kramak's Existing Design-Parameter Citations & Claims"
date: 2026-08-19
status: complete
topic: evidentiary-audit
tags: [citation-audit, metr, personas, failure-taxonomy, polish-ceiling, parameter-calibration]
informs_decisions: [D-003, D-004, D-010, D-011]
confidence: Medium
---

# T2-04 — Evidentiary Audit of Kramak's Existing Design-Parameter Citations & Claims

## 1. Research Question

Do the five headline design parameters shipped in Kramak v1.0.0 — the 2‑hour Work Item cap, the no‑personas rule, the six‑category Failure Taxonomy, the Capability Gate Check's confidence thresholds, and the Polish Ceiling Rule — rest on primary research that actually says what the spec implies it says, or are they intuition‑based heuristics wearing a citation? This audit answers that question claim‑by‑claim, working from primary sources fetched and read directly (not secondhand summaries), so a Principal Architect has a clean basis for deciding whether each parameter should be kept as‑is, recalibrated, re‑cited, or explicitly reclassified as engineering judgment ahead of v1.1.

**Scoping note.** No copy of the Kramak v1.0.0 specification text was available in this session — checked `/mnt/user-data/uploads` and prior‑session transcripts (both empty), and web search returns no publicly indexed "Kramak" project as of 2026‑08‑19. This audit therefore evaluates each claim as characterized in the T2‑04 brief, which is specific enough to check against primary literature for four of five items and is explicit that the fifth (Polish Ceiling) is a Kramak‑original concept requiring analogue‑hunting rather than citation‑checking. Where the brief's characterization and Kramak's actual source text might diverge in wording, that gap is flagged per‑claim below. This is why overall confidence is rated **Medium** rather than High: confidence in *what the literature actually says* is high (primary sources were fetched and read directly, listed in §7); confidence in *exact fidelity to Kramak's own citation language* is necessarily lower without the source document. Recommend a follow‑up pass (T2‑05 or equivalent) that line‑checks this audit's conclusions against the literal v1.0.0 text once available.

This audit is scoped to inform **D‑003, D‑004, D‑010, and D‑011**.

---

## 2. Key Findings

1. **The 2‑hour cap has a real anchor — but the wrong one for what a "cap" should mean.** METR's own GPT‑5 evaluation (Aug 2025) measured GPT‑5's 50%‑success time horizon at 2h17m — plausibly the literal source of "2 hours." But that's a coin‑flip threshold. METR's own FAQ states directly that time horizon is not a measure of safe or reliable autonomous duration, and METR's own data shows the 80%‑reliability horizon (the bar METR itself recommends for anything you'd actually delegate) runs **4–8× shorter** — roughly 17–34 minutes off that same GPT‑5 anchor.

2. **The cap is also already stale by the metric's own logic.** Frontier 50%‑horizons had passed 2 hours by December 2025 (Claude Opus 4.5: ~4h49m, later revised to ~5h20m under improved methodology), and METR's live tracking page (last updated May 2026) now flags some models as pushing past its 16‑hour measurement ceiling. A fixed "2 hours" cannot stay anchored to a metric with a 3–7 month doubling time without a defined refresh mechanism.

3. **"No personas" is the best‑evidenced rule of the five.** Zheng et al. (EMNLP 2024 Findings) is a large, controlled study (162 personas, 4 LLM families, 2,410 factual questions) finding personas in system prompts do not improve — and can mildly hurt — objective‑task performance versus a no‑persona control. Caveat: the study tests factual QA, not agentic planning, so transfer to planning prompts is reasonable but not directly tested.

4. **The 6‑category Failure Taxonomy doesn't match any published taxonomy checked.** The most relevant recent reference (MAST, multi‑agent LLM systems, NeurIPS 2025) uses 3 categories / 14 modes; the classical software‑defect standard (Orthogonal Defect Classification, 1992) uses 8 categories. No canonical source checked converges on 6, so absent a disclosed crosswalk, "6" reads as a Kramak‑authored synthesis, not an imported number.

5. **The Capability Gate Check's confidence self‑assessment sits on the shakiest ground of the five.** A fast‑growing 2025–2026 literature on verbalized LLM confidence — including work specifically on agentic, tool‑use, and post‑execution settings — consistently finds overconfidence that RLHF/post‑training tends to worsen, not fix. One specific finding lands directly on this design: post‑hoc self‑assessment (checking your own completed work) is *less* reliable than pre‑hoc assessment.

6. **The Polish Ceiling Rule targets a real, well‑quantified, very recent problem — but the fix itself is untested.** FeatBench (2026) found that agent "scope creep" (its term) drove roughly three‑quarters of analyzed failures on realistic feature‑implementation tasks, with resolution collapsing for patches over ~50 lines or five files. That's strong support for *why* a ceiling rule exists. No published study validates any specific ceiling *mechanism* — that part is, and will remain, Kramak's own engineering judgment until Kramak generates its own before/after telemetry.

7. **Pattern across all five:** every rule points in an empirically defensible direction; none of the five specific numeric thresholds is a value the cited literature actually outputs. This reads as a citation‑hygiene problem, not a wrong‑instincts problem — the fix in most cases is disclosure and recalibration, not redesign (redesign is explicitly out of scope for this session; see Layer 1).

---

## 3. Recommendation (Per‑Claim Audit Table)

**Evidentiary Grade scale.** The T2‑series "Universal Evidence Standard" document was not available in this session, so the four‑tier scale below is applied in its place and should be reconciled against the canonical standard if one exists elsewhere in the Kramak decision log.

| Grade | Meaning |
|---|---|
| **A** | Primary source directly supports the claim as stated, in the same domain/context, with matching magnitude. |
| **B** | Primary source directly supports the claim's *direction*, but domain, scope, or magnitude doesn't fully match. |
| **C** | Relevant, credible primary source exists, but the claim as stated requires an extrapolation, a cherry‑picked reading, or omits a caveat the source itself flags. |
| **D** | No identifiable primary‑source support for the specific parameter; internally plausible engineering heuristic only. |

| # | Claim / Parameter | Primary Source Cited (per brief) | Actual Finding in Literature | Grade | Verdict |
|---|---|---|---|:---:|---|
| 1 | 2‑hour Work Item cap | "METR's research on AI agent task‑completion time horizons" — no specific paper, model, date, or reliability threshold given | METR's 50%‑time‑horizon is an explicitly *descriptive* capability metric, not a prescriptive duration guideline (METR's FAQ states this directly). A real anchor exists — GPT‑5's official 50%‑horizon was 2h17m (Aug 2025) — but the matching 80%‑horizon (METR's own recommended bar for delegation) is 4–8× shorter, and frontier 50%‑horizons had already exceeded 2h by Dec 2025 | **C** | **Needs Citation Correction** |
| 2 | "No personas" rule in planning prompts | Not specified in brief | Zheng et al., EMNLP 2024 Findings: personas in system prompts do not improve, and can mildly degrade, LLM performance vs. a no‑persona control (162 personas, 4 LLM families, n = 2,410) | **B** | **Confirmed** |
| 3 | Failure Taxonomy — 6 categories | Implied empirical derivation; no specific source given | MAST (Cemri et al., NeurIPS 2025): 3 categories / 14 modes. ODC (Chillarege et al., 1992): 8 categories. No canonical taxonomy checked converges on 6 categories | **D** | **Heuristic / Assumption** |
| 4 | Capability Gate Check confidence thresholds | Implied self‑assessment capability; no specific source given | Kadavath et al. (2022) shows self‑evaluation is *possible* under structured elicitation and multi‑sampling. The dominant 2025–2026 literature on verbalized, single‑number confidence — especially agentic/post‑hoc — finds consistent, RLHF‑amplified overconfidence | **D** | **Heuristic / Assumption** |
| 5 | Polish Ceiling Rule | None — flagged in brief as Kramak‑original | FeatBench (2026): agent "scope creep" drives ~73.6% of analyzed failures on realistic feature tasks. Closest classical analogue is "gold plating" (PM literature); closest AI‑safety analogue is reward hacking / specification gaming. Problem well‑evidenced; specific ceiling *mechanism* has no independent validation | **B** (problem) / **D** (mechanism) | **Heuristic / Assumption** |

### Recommended text adjustments for v1.1+

- **2‑hour cap:** State explicitly which model, which date, and which reliability threshold the number is anchored to, and add a review cadence (e.g., "revisit each time METR publishes a frontier update," given the metric's 3–7 month doubling time). If the intent is a deliberately conservative round number rather than a derived one, say *"informed by"* rather than *"based on"* METR's research.
- **No personas:** Add one clause acknowledging the supporting study is factual‑QA‑based, not planning‑specific — e.g., "generalized by default to planning prompts pending agentic‑specific replication."
- **Failure Taxonomy:** Either publish a crosswalk mapping Kramak's 6 categories onto MAST's 14 modes / ODC's 8 types (this upgrades the claim to a defensible derived synthesis), or change "derived from failure‑mode research" to "informed by, and independently synthesized from, published taxonomies for our operational use."
- **Capability Gate:** Replace or supplement a single verbalized‑confidence number with a consistency/agreement‑based signal where feasible. If keeping verbalized confidence, validate the chosen threshold against Kramak's own outcome telemetry rather than citing calibration research as a general guarantee, and avoid gating purely post‑hoc — that is the specific configuration the literature flags as weakest.
- **Polish Ceiling:** Cite FeatBench‑style findings explicitly as the empirical *motivation* for the rule; relabel the enforcement mechanism as Kramak's own engineering response rather than implying it is literature‑validated; instrument pre/post regression‑rate telemetry to build first‑party evidence over time.

---

## 4. Alternatives Considered

**Charitable vs. strict reading of the METR citation.** Considered whether "2 hours" could be fully rescued by assuming Kramak deliberately chose a mid‑2025‑vintage, 50%‑reliability, single‑model anchor as a *conservative floor* rather than a frontier‑tracking ceiling. Plausible, but unverifiable without the source text, and it doesn't resolve the core problem — even as a floor, the number needs a stated reliability threshold to be defensible, which the brief's characterization lacks. Graded on the citation as described, not on a best‑case reconstruction of what Kramak might have meant.

**Whether the Failure Taxonomy's "6" could be a legitimate coarsening of MAST's 14.** Considered mapping Kramak's categories onto MAST's modes speculatively, to "rescue" the citation. Rejected: without Kramak's actual category names, any such mapping would be invented by this audit, not verified — which would recreate the exact fabrication risk this audit exists to catch. Recommended instead (§3) as something Kramak should publish itself.

**Whether Capability Gate confidence could be judged "probably fine in practice" despite weak general literature.** Considered deferring to the possibility that Kramak's own threshold is empirically well‑calibrated even if the general literature is pessimistic — general calibration findings don't automatically transfer to one team's specific model/threshold/prompt combination. This is a live possibility, which is why the verdict is **Heuristic / Assumption** (untested) rather than **Needs Citation Correction** (contradicted) — the rule isn't shown wrong, it's unproven either way absent Kramak's own telemetry.

**Whether to grade all five rules on one averaged score.** Rejected in favor of independent per‑claim grades. The five rules have genuinely different evidentiary footings (personas well‑supported; capability gate weakly supported), and a blended score would obscure exactly the distinction a Principal Architect needs to prioritize fixes.

**Which analogue set best fits Polish Ceiling.** Considered leading with reward hacking / specification gaming (the AI‑safety framing named in the brief's Approach) as the primary analogue. Reprioritized FeatBench/SlopCodeBench (direct empirical coding‑agent studies) as primary, with reward hacking as secondary theoretical framing — because reward hacking classically describes *under*‑delivery against a gamed proxy, while Polish Ceiling addresses *over*‑delivery. The mechanisms are conceptually related (both are proxy/intent divergence) but not the same failure direction, and the coding‑agent studies are the tighter empirical match.

---

## 5. Detailed Findings

### 5.1 The 2‑Hour Work Item Cap

METR's metric — introduced in *Measuring AI Ability to Complete Long Software Tasks* (Kwa, West, et al., arXiv:2503.14499, NeurIPS 2025) — is the **50%‑task‑completion time horizon**: the duration a skilled human would need for a task that a given model completes with 50% success probability. METR's own live FAQ page is explicit that this is a task‑difficulty measure calibrated in human‑equivalent time, not a stopwatch on how long an agent runs, and not a claim about safe autonomous duration. That distinction is load‑bearing for this audit: if Kramak's 2‑hour figure is read as "how long we let the agent work unsupervised," that is a direct misreading of the metric METR defines; if it is read as "we size Work Items to roughly what a low‑context human could do in 2 hours," that is a faithful use of the metric's intended purpose, contingent on picking the right reliability threshold and model snapshot.

**A real anchor exists.** METR's official GPT‑5 evaluation (Aug 7, 2025) reports GPT‑5's 50%‑time horizon as **2h17m** (95% CI: 65 min–4h25m), against OpenAI o3's 1h30m in the same report. If Kramak's docs cite METR generically without a specific figure, 2h17m rounding to "2 hours" is a plausible, defensible literal source — this is the strongest part of the citation.

**But 50% success is a coin flip, and Kramak is setting an execution cap, not a research benchmark.** METR's own FAQ works through exactly this ambiguity: for tasks in the 90‑minute‑to‑3‑hour range, a GPT‑5‑class agent (~2h17m horizon) succeeds 100% of the time on about a third of such tasks, fails 100% of the time on another third, and is genuinely mixed on the rest. METR's own GPT‑5 report states that 80%‑reliability horizons — the threshold METR recommends once "significant reliability" matters — run **4–8× shorter** than the matching 50%‑horizon. Applied to the 2h17m (137 min) GPT‑5 anchor, that implies a *reliable* work‑item size closer to **17–34 minutes**, not 2 hours. The original paper's own worked example is consistent: Claude 3.7 Sonnet's 50%‑horizon of 59 minutes corresponds to an 80%‑horizon of about 15 minutes (~4×).

**The cap is also a moving target that has already moved.** METR's tracked model horizons (50%, in minutes):

| Model | 50%‑horizon | Source / vintage |
|---|---|---|
| Claude 3.7 Sonnet | ~56–60 min | Original paper, Mar 2025 |
| OpenAI o3 | ~90 min → 121 min | METR GPT‑5 report (Aug 2025) → Time Horizon 1.1 (Jan 2026) |
| GPT‑5 | ~137 min (2h17m) → 214 min (3h34m, **+55%**) | METR GPT‑5 report (Aug 2025) → TH1.1 (Jan 2026) |
| Claude Opus 4.5 | ~289 min (4h49m) → 320 min (5h20m, +11%) | Added Dec 2025 → TH1.1 revision (Jan 2026) |
| Opus 4.6, Opus 4.7, Grok 4.3, GPT‑5.4/5.5, Gemini 3.x | Added progressively Feb–Apr 2026; several (incl. Opus 4.7, Grok 4.3, GPT‑5.5) still unpublished as of the page's May 8, 2026 update | metr.org/time‑horizons |

Two things stand out. First, a **methodology revision alone** — a larger task suite, no model change — moved GPT‑5's own measured horizon by +55% between two METR publications eight months apart. A spec that hard‑codes a single figure is one methodology refresh away from being visibly wrong. Second, frontier 50%‑horizons had already cleared 2 hours by the end of 2025 (Opus 4.5), and METR's own May 2026 update note ("measurements above 16 hrs are unreliable with our current task suite") implies some 2026 models are approaching the edge of what METR can even measure. By the temporal anchor of this audit (Aug 19, 2026), it is very likely — though not confirmed, since METR has not yet published figures for several 2026 models — that frontier 50%‑horizons are well past 2 hours.

**Two countervailing considerations, for balance.** (1) METR's own limitations note (Jan 22, 2026) discloses that the 80%‑horizon is not a fully independent estimate — it comes from the same two‑parameter logistic fit as the 50%‑horizon and was originally "kind of an afterthought/robustness check," so the 4–8× ratio, while real and repeatedly observed, carries its own estimation uncertainty. (2) METR's tasks are self‑contained and well‑specified; METR separately found that a one‑point increase in task "messiness" cuts success rates by roughly 8.1%, and real Work Items are messier than METR's benchmark tasks — which cuts in the *opposite* direction, toward a tighter cap than the clean‑benchmark numbers suggest. The honest summary is that a defensible number could reasonably land anywhere from ~15 minutes to several hours depending on which reliability threshold, which model vintage, and how much of a messiness discount is applied — which is precisely why "2 hours, per METR" as a bare citation is under‑specified rather than simply wrong. **Grade C / Needs Citation Correction.**

### 5.2 The "No Personas" Rule

The controlling study is Zheng, Pei, Logeswaran, Lee, and Jurgens, *When "A Helpful Assistant" Is Not Really Helpful: Personas in System Prompts Do Not Improve Performances of Large Language Models* (Findings of ACL: EMNLP 2024; arXiv:2311.10054). The design is a large controlled comparison: 162 role personas spanning 6 interpersonal‑relationship types and 8 expertise domains, tested against a no‑persona control across 4 popular LLM families on 2,410 factual questions drawn from MMLU. The finding, in the paper's own framing, is that persona prompting has "no or small negative" effect on objective‑task performance relative to the control — this is a genuinely close match to a "no personas" default for tasks with checkable, objective outcomes.

Two nuances worth carrying into the spec. First, this is not a static literature: the same paper's original (Nov 2023) version, run on a smaller sample (3 LLMs, ~2,457 questions), reportedly found the *opposite* — a positive effect from adding interpersonal roles. The Oct 2024 revision, with the larger and more systematic 162‑persona design, reversed that finding to null‑to‑negative. That reversal is itself informative: it shows the field's belief about persona prompting moved toward "no personas" as the evidence got stronger, which is reassuring for Kramak's rule, but it also shows this specific question has been sample‑size‑sensitive before. Second, and more important for scope: Zheng et al.'s 2,410 questions are closed‑form factual recall (MMLU‑style), not open‑ended agentic planning or code generation. The correlational analysis in the paper (persona word frequency, prompt‑question similarity, and prompt perplexity are all only weakly correlated with performance shifts) suggests the null effect isn't an artifact of one narrow mechanism, which supports generalizing the finding — but it hasn't been *directly* tested in a planning‑prompt or coding‑agent context.

A partial counter‑exists in the literature: *Better Zero‑Shot Reasoning with Role‑Play Prompting* (Kong et al.; encountered here via secondary summary, not independently fetched — see §7) reports roughly a 10% accuracy gain from a "role immersion" method. That method is structurally different from a static system‑prompt persona: it is a three‑call protocol (a role‑setting prompt, a role‑feedback prompt, then the actual query), which is closer to an ensembling technique than to "add a persona line to the prompt." If anything, this strengthens the case against Kramak's likely target (simple static personas in planning prompts) rather than weakening it, since the one credible positive result requires machinery Kramak's "no personas" rule isn't describing anyway.

**Grade B / Confirmed**, with a recommended scope caveat (§3) rather than a correction — the rule is doing the right thing for a documented reason; the spec should just say the reason is factual‑QA‑derived and generalized by default rather than agentic‑planning‑derived.

### 5.3 Failure Taxonomy (6 Categories)

Two credible reference points exist, and neither lands on 6.

**MAST** (*Why Do Multi‑Agent LLM Systems Fail?*, Cemri, Pan, Yang, et al., arXiv:2503.13657, NeurIPS 2025) is the most directly relevant taxonomy available, since it is purpose‑built for multi‑agent LLM system failures rather than general software defects. The authors hand‑annotated 150 execution traces with expert human annotators (inter‑annotator agreement κ = 0.88) to build a taxonomy of **14 failure modes clustered into 3 top‑level categories**: specification and system‑design issues, inter‑agent misalignment, and task verification issues — reported elsewhere as roughly a 42% / 37% / 21% split of failure incidence. They then built a separate LLM‑as‑judge classifier (reaching ~94% accuracy and κ = 0.77 agreement with human labels) to scale annotation across MAST‑Data, a corpus of 1,600+ traces spanning 7 popular multi‑agent frameworks. A correlation check between categories (0.17–0.32) supports the 3‑category structure's distinctiveness — this is about as methodologically rigorous as failure‑taxonomy construction currently gets in the agentic‑LLM literature, and it is 3 categories, not 6.

**Orthogonal Defect Classification** (Chillarege, Bhandari, Chaar, Halliday, Moebus, Ray, and Wong, *IEEE Transactions on Software Engineering*, vol. 18(11), 1992, pp. 943–956) is the classical, pre‑LLM reference point — still actively used and extended today (recent examples found in this research pass include Kubernetes configuration‑defect studies and NoSQL‑database defect studies). ODC defines **8 orthogonal defect categories**. Also not 6.

Neither the most rigorous recent agentic‑specific taxonomy nor the most established classical taxonomy converges on 6 categories, and no other canonical source turned up in this pass that does either. This doesn't mean 6 is wrong — a practitioner‑facing taxonomy is allowed to trade granularity for memorability, and 6 categories may simply be a better fit for how Kramak's engineers actually triage failures day to day than MAST's 14 fine‑grained modes would be. But that is a **design choice**, not a number the cited research outputs, and the spec should not imply otherwise. If Kramak's 6 categories are in fact an intentional coarsening of MAST's 14 (or a blend of MAST and ODC), that is a legitimate and even strong position — but it needs to be shown as a crosswalk, not asserted as a citation. **Grade D / Heuristic / Assumption.**

### 5.4 Capability Gate Check Confidence Thresholds

The foundational reference for LLM self‑assessment is Kadavath et al. (Anthropic), *Language Models (Mostly) Know What They Know* (arXiv:2207.05221, 2022). Its core finding is genuinely supportive of the underlying premise: larger models can be reasonably well calibrated on self‑evaluation (estimating "P(True)" — the probability their own answer is correct), calibration improves with model scale, and self‑evaluation improves further when the model is shown several of its own candidate samples before judging one. The important caveat inside that same paper is that calibration is highly sensitive to *how* confidence is elicited — structured formats (multiple‑choice, true/false) calibrate better than open‑ended formats.

That caveat turns out to matter a great deal, because the elicitation format most Capability‑Gate‑style designs actually use — a single freeform verbalized number ("state your confidence 0–100%") — is exactly the format a substantial and fast‑growing 2025–2026 literature finds unreliable:

- *Calibrating Verbalized Confidence with Self‑Generated Distractors* (Wang & Stengel‑Eskin, UT Austin, arXiv:2509.25532, 2025) finds verbalized confidence scores are "empirically found to be miscalibrated, reporting high confidence on instances with low accuracy," and traces this to a suggestibility mechanism that gets worse precisely when the model has the least real information.
- *The Confidence Dichotomy: Analyzing and Mitigating Miscalibration in Tool‑Use Agents* (arXiv:2601.07264, 2026) reports that moderate overconfidence has now been documented consistently across instruction‑tuned, reasoning, and vision‑language models — and specifically in tool‑use agent settings, which is Kramak's actual context.
- *Agentic Uncertainty Reveals Agentic Overconfidence* (arXiv:2602.06948, 2026) extends this to multi‑step agentic task completion and reports two findings that bear directly on gate design: post‑execution self‑assessment is *less* well calibrated than pre‑execution assessment, and self‑correction attempts without external feedback frequently make performance worse rather than better (consistent with earlier findings that LLMs struggle to self‑correct reasoning unaided).
- *Wired for Overconfidence* (COLM 2026, arXiv:2604.01457) traces verbalized overconfidence to identifiable, stable internal circuits — evidence this is a structural property of current post‑trained models, not sampling noise — and notes that RLHF/alignment tuning tends to *increase* overconfidence relative to pretrained checkpoints.
- A 2026 study on self‑ vs. externally‑provided answers (arXiv:2606.03437) found LLMs are reliably worse‑calibrated when judging their own answers than when judging an answer attributed to someone else, and ties part of the mechanism to reward‑model bias toward high‑confidence outputs during PPO training.

To be fair to the other side: verbalized confidence is not universally worse than every alternative — Tian et al. (2023, cited secondarily via a 2026 medical‑QA paper) found that for RLHF‑tuned models, verbalized confidence can be *better* calibrated than raw token log‑probabilities, cutting expected calibration error by up to 50% on open‑domain QA. That is a low bar (log‑prob confidence on RLHF'd models is known to be poor), and every source reviewed here that compares verbalized confidence to consistency‑ or ensemble‑based methods (sampling multiple attempts and checking agreement) finds the latter more reliable.

Put together: the *idea* that a model can meaningfully self‑report something about its own reliability is not baseless — it has real support under the right elicitation conditions. But a bare single‑number verbalized‑confidence gate, checked after the agent has already produced its output, is close to the specific configuration this literature most consistently flags as the least trustworthy one available, and the newest, most directly on‑point papers (agentic, tool‑use, post‑execution) are the most pessimistic of the set. **Grade D / Heuristic / Assumption.**

### 5.5 The Polish Ceiling Rule

No academic paper defines a "Polish Ceiling Rule" — this is expected, since the brief flags it as Kramak‑original, and this section follows the Approach's instruction to find the closest published analogues rather than search for a citation that doesn't exist.

**Direct empirical match (coding agents).** *FeatBench: Towards More Realistic Evaluation of Feature‑level Code Generation* (Chen, Li, and Li, Tsinghua University et al., arXiv:2509.22237, 2026) is the tightest fit found in this pass. Testing SOTA agents (Trae‑agent, Agentless) with SOTA models (GPT‑5, DeepSeek V3.1, and others) on 157 realistic feature‑implementation tasks across 27 actively maintained repositories, the best configuration resolved only 29.94% of tasks. Of 122 manually reviewed failure cases, **"regressive implementation" was the predominant failure reason, accounting for 73.6%** of the cases — and the paper traces most of that to a pattern it names "aggressive implementation": agents proactively extending features or refactoring code beyond what was asked, i.e., scope creep. A concrete example from the paper: a task asked for C++26 support for the GCC compiler; the reference patch touched two files; the agent additionally (unrequested) began adding Intel C++ compiler support in one file but never wired up the corresponding logic in the other, breaking previously‑passing tests. The same paper finds a sharp complexity cliff — success rates reach 36% for single‑file, 1–30‑line patches but collapse to near zero for patches over 50 lines or spanning five or more files — and, notably, that the same aggressive‑implementation tendency is a double‑edged sword: it is the leading cause of defects, but occasionally produces architecture that is more modular than the human‑authored reference patch. A related paper, *SlopCodeBench* (arXiv:2603.24755, 2026), independently reports that LLM‑generated code favors verbose constructions and accumulates redundant methods under iterative editing, consistent with the same underlying tendency.

**Classical software‑engineering analogue.** Project‑management literature draws a precise distinction that is worth importing into Kramak's own terminology: **"gold plating"** is when the delivering team adds unrequested extras beyond the agreed scope (PMBOK/PMP‑standard terminology), as distinct from **"scope creep,"** which is client‑ or stakeholder‑driven expansion. By that classical distinction, what FeatBench calls "scope creep" in LLM agents is, strictly, gold plating — the agent, not any external requester, is the source of the unrequested expansion. This is a minor terminology point but a real one, and worth a footnote in Kramak's own docs for precision, since the two failure modes have different root causes and different fixes in the human‑team literature.

**AI‑safety analogue (looser fit).** Reward hacking / specification gaming — formalized in Amodei et al.'s *Concrete Problems in AI Safety* (2016) and catalogued extensively by Krakovna et al. (2020) — is the closest AI‑safety theoretical frame for "an agent optimizes something other than the designer's true intent." It is conceptually related to Polish Ceiling (both are proxy/intent divergence problems) but points in the opposite direction: classical reward hacking is about an agent *under*‑delivering while gaming a narrow metric, whereas Polish Ceiling is about an agent *over*‑delivering past the requested scope. Useful as framing; not a mechanistic match.

**Verdict.** The problem Polish Ceiling addresses is real, current, and now well‑quantified — arguably better‑evidenced than any other claim in this audit except the persona rule. But FeatBench and SlopCodeBench diagnose the disease; they say nothing about whether any particular ceiling *mechanism* (however Kramak implements it — line counts, file counts, hunk counts, or something else) actually cures it. That validation doesn't exist yet in the published literature and can currently only come from Kramak's own before/after telemetry. **Grade B (problem) / D (mechanism) / Heuristic / Assumption (rule as a whole).**

---

## 6. Open Questions & Risks

1. **No access to Kramak's literal source text.** Every grade above is based on the T2‑04 brief's characterization, not a line‑check against v1.0.0's actual citation language. *Reversal trigger:* obtaining the source document and re‑running this audit against exact quoted text — some grades could move in either direction.
2. **METR's metric moves faster than a spec version cycle.** Doubling time is currently estimated at 3–7 months depending on window, and a pure methodology refresh (TH1.0→TH1.1) alone moved GPT‑5's own number by 55%. *Reversal trigger:* Kramak adopting a defined model+date+reliability‑threshold triple with a stated refresh cadence, rather than a bare constant — at which point Grade C could become Grade A without changing the underlying number much.
3. **The persona finding is domain‑transferred, not domain‑tested.** Zheng et al. is factual QA; Kramak's planning prompts are agentic. *Reversal trigger:* a controlled study of personas specifically in planning or coding‑agent system prompts, in either direction.
4. **Capability Gate literature is moving fast and could resolve favorably.** Multiple sources cited in §5.4 are under a year old, and calibration‑aware training / consistency‑based confidence are active research areas. *Reversal trigger:* either a published, validated agentic‑calibration method Kramak could point to directly, or — independently of the general literature — Kramak's own telemetry showing its specific threshold is in fact well‑calibrated against real outcomes, which would justify the rule on its own terms regardless of what the general literature says.
5. **FeatBench/SlopCodeBench are recent, single‑study findings.** The 73.6% figure is specific to that benchmark's repositories, agents, and models, and has not yet been independently replicated. *Reversal trigger:* replication (or contradiction) by an independent benchmark, or — more directly useful to Kramak — internal defect/regression telemetry from Kramak's own agent runs.
6. **Forcing the Failure Taxonomy to match MAST or ODC could reduce its practical value.** 14 modes may be too fine‑grained for a team triage workflow; 8 ODC categories are designed for human‑authored defects, not agent behavior. *Reversal trigger:* Kramak publishing an explicit crosswalk from its 6 categories to MAST's 14/ODC's 8 — this would upgrade the verdict to Confirmed (Derived) without requiring the number itself to change.
7. **"Audit theater" risk.** Retrofitting citations onto numbers that were actually chosen by intuition is a subtler failure than having no citation at all, because it lends false authority to a guess. *Mitigation, not a reversal trigger:* v1.1+ should distinguish explicitly, in its own text, between "derived from" and "informed by / consistent with" language for each of these five rules — the recommended text adjustments in §3 do this for all five.

---

## 7. Sources & Evidence Ledger

Grading approach: sources are tiered by how directly their claims were verified in this session — **Tier 1** (peer‑reviewed publication, or official primary‑org report, fetched and read directly), **Tier 2** (arXiv preprint or official lab blog/notes, fetched and read directly), **Tier 3** (reputable secondary commentary, used for corroboration, fetched directly), **Tier 4** (secondary source encountered but not independently fetched — used only as light corroboration, flagged explicitly, never load‑bearing alone).

**2‑hour cap (METR)**
- Kwa, West, et al. (METR), *Measuring AI Ability to Complete Long Software Tasks*, arXiv:2503.14499, NeurIPS 2025 (orig. Mar 2025, rev. Jul 2026). **Tier 1.** Defines the 50%/80% time‑horizon metric; source of the ~5× and ~7‑month figures.
- METR, *Measuring AI Ability to Complete Long Software Tasks* [blog], metr.org, Mar 19 2025 (self‑flagged as partly superseded by the live chart). **Tier 2.**
- METR, *Time Horizon 1.1* [blog], metr.org, Jan 29 2026. **Tier 2.** Source of TH1.0→TH1.1 revision table and post‑2024 doubling‑time acceleration.
- METR, *Task‑Completion Time Horizons of Frontier AI Models* [live page + FAQ], metr.org/time‑horizons/, last updated May 8 2026. **Tier 2.** Source of the "not autonomous runtime" clarification, per‑model update log, and unpublished‑model list.
- METR, *Details about METR's evaluation of OpenAI GPT‑5*, metr.org/evaluations/gpt‑5‑report/, Aug 7 2025. **Tier 2.** Source of the 2h17m GPT‑5 figure and the "4–8× shorter" 80%‑horizon statement.
- METR, *Clarifying limitations of time horizon* [notes], metr.org/notes/2026‑01‑22‑time‑horizon‑limitations/, Jan 22 2026. **Tier 2.** Source of the 80%/50% non‑independence caveat and the Opus 4.5 confidence‑interval example.

**No personas**
- Zheng, Pei, Logeswaran, Lee, and Jurgens, *When "A Helpful Assistant" Is Not Really Helpful: Personas in System Prompts Do Not Improve Performances of Large Language Models*, Findings of ACL: EMNLP 2024, arXiv:2311.10054. **Tier 1.** Primary source for the persona‑null‑effect finding and its revision history.
- Kong et al., *Better Zero‑Shot Reasoning with Role‑Play Prompting* — encountered via secondary blog summaries (PromptHub; danjcleary Substack), not independently fetched. **Tier 4.** Used only to characterize the counter‑evidence and its structural difference from static personas.

**Failure Taxonomy**
- Cemri, Pan, Yang, et al., *Why Do Multi‑Agent LLM Systems Fail?*, arXiv:2503.13657, NeurIPS 2025. **Tier 1.** Primary source for MAST's 3‑category/14‑mode structure and construction methodology (150 traces, κ = 0.88).
- Secondary summaries (futureagi.substack.com; augmentcode.com) reporting the ~42%/37%/21% category‑incidence split. **Tier 3.** Category structure independently confirmed against the Tier‑1 source; incidence percentages are secondary‑sourced only.
- Chillarege, Bhandari, Chaar, Halliday, Moebus, Ray, and Wong, *Orthogonal Defect Classification — A Concept for In‑Process Measurements*, IEEE Trans. Software Engineering, 18(11), 1992, pp. 943–956. **Tier 1** (classical peer‑reviewed source; count and framing cross‑confirmed via Wikipedia, ACM DL record, and multiple citing papers rather than a direct fetch of the 1992 original).

**Capability Gate**
- Kadavath et al. (Anthropic), *Language Models (Mostly) Know What They Know*, arXiv:2207.05221, 2022. **Tier 2.** Foundational, favorable‑with‑caveats reference on self‑evaluation and calibration.
- Wang and Stengel‑Eskin (UT Austin), *Calibrating Verbalized Confidence with Self‑Generated Distractors*, arXiv:2509.25532, 2025. **Tier 2.**
- *The Confidence Dichotomy: Analyzing and Mitigating Miscalibration in Tool‑Use Agents*, arXiv:2601.07264, 2026. **Tier 2.**
- *Agentic Uncertainty Reveals Agentic Overconfidence*, arXiv:2602.06948, 2026. **Tier 2.** Most directly relevant to a post‑hoc agentic gate check.
- *Wired for Overconfidence: A Mechanistic Perspective on Inflated Verbalized Confidence in LLMs*, COLM 2026, arXiv:2604.01457. **Tier 1.**
- *Large Language Models Are Overconfident in Their Own Responses*, arXiv:2606.03437, 2026. **Tier 2.**
- Tian et al. (2023) finding on verbalized‑vs‑logprob calibration — encountered via secondary citation in a 2026 medical‑QA paper, not independently fetched. **Tier 4.**

**Polish Ceiling**
- Chen, Li, and Li, *FeatBench: Towards More Realistic Evaluation of Feature‑level Code Generation*, arXiv:2509.22237, 2026. **Tier 2.** Primary source for the 73.6% regression/scope‑creep figure and patch‑size correlation data.
- *SlopCodeBench: Benchmarking How Coding Agents Degrade Over Long‑Horizon Iterative Tasks*, arXiv:2603.24755, 2026. **Tier 3** (abstract/intro fetched; full results not reviewed).
- Amodei et al., *Concrete Problems in AI Safety* (2016); Krakovna et al., *Specification gaming examples in AI* (2020, ongoing catalog, AlignmentForum). **Tier 3/4** — foundational but encountered here via citation in multiple 2025–2026 papers plus a direct fetch of the Krakovna catalog's framing page, not the original Amodei et al. full text.
- Practitioner/PM sources on the gold‑plating vs. scope‑creep distinction (ProjectCubicle, Breeze.pm, 4PMTI, Wrike, PM Study Circle, Project Management Academy, Modall) — seven independent sources, mutually consistent, tied to PMBOK/PMP terminology. **Tier 3.** A specific PMI/KPMG cost‑overrun statistic surfaced in one of these (Breeze.pm) was **not** independently located and is deliberately omitted from the findings above as unverified.
