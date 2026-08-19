---
id: T2-13
title: "Core Guardrail, Grounding & Coordination Mechanisms: Confirmation Bundle"
date: 2026-08-19
status: complete
topic: guardrail-confirmation-bundle
tags: [grounded-verification, scope-check, circuit-breaker, state-reconciliation, failure-taxonomy, human-tasks, decision-record]
informs_decisions: [D-003, D-010, D-011]
confidence: Medium
---

# Core Guardrail, Grounding & Coordination Mechanisms: Confirmation Bundle

## 1. Research Question

Do Kramak's six described execution-integrity, grounding, and human-coordination mechanisms — as specified in the audit brief — conform to established patterns in software engineering, distributed systems, and HCI, such that a Principal Architect can rely on them as sound foundations? Where they don't fully conform, what specific hardening closes the gap?

**Method and scope note.** This bundle is a **design-conformance review**, not a source-code audit. The audit brief supplies a one-line specification of each mechanism; no Kramak source code, configuration, logs, or telemetry were provided or accessible in this session. Every claim about what Kramak *does* is therefore graded **Evidence Grade D** (asserted by the brief, not independently verified) throughout — this bundle has not inspected the grep-verification code path, the scope-check call site, the circuit-breaker trip logic, the `state.json` schema and write order, the taxonomy's category definitions, or the INBOX implementation. What this bundle *can* do, and does rigorously, is check whether the **specified design**, taken at face value, matches or diverges from well-documented patterns in the current literature (as of August 2026) — and flag precisely which implementation details would need to be confirmed by code review or telemetry before the verdicts below move from design-level to implementation-level confidence.

A note on the subject itself: no publicly documented system named "Kramak" was found in research for this bundle. The nearest namesakes — KramaBench (a data-science-pipeline benchmark) and Krama AI (an unrelated workflow-capture product) — are not it. Kramak is treated here as a private/internal system, consistent with how the brief presents it.

---

## 2. Key Findings

*(Evidence grading used inline: **A** = canonical/primary source — official docs, standards bodies, foundational texts, or rigorous primary empirical studies; **B** = current 2025–2026 peer-adjacent research or authoritative practitioner/vendor documentation; **C** = practitioner consensus synthesized across secondary sources; **D** = asserted by the audit brief about Kramak, not independently verified. Full citations in §7.)*

**Grounded Verification (#1).** Forcing specs to quote grep-confirmed codebase lines is a sound, well-precedented anti-hallucination architecture: it externalizes verification to a deterministic check rather than trusting the model's self-report, which is the design principle current grounding research consistently converges on (Grade B, E1, E3–E5). Its known blind spot — an existence check confirms a quote is *real*, not that it's *relevant* to the claim it supports — is itself a named, documented failure mode in the citation-grounding literature (Grade B, E2), not a hypothetical concern invented for this audit.

**Hard Scope Check (#6).** Deterministic `git diff`-based enforcement, evaluated outside the model, matches 2026 agent-security guidance closely: an agent's own judgment about safe scope is treated as advisory at best, with real enforcement required to sit outside the model (Grade A/B, E6–E10). The open question is *when* in the execution loop the check fires — agents (not only humans) have been documented bypassing checkpoint-style enforcement entirely when the checkpoint sits at a layer they can route around (Grade A, E9).

**Circuit Breaker (#8).** Bounding an audit-fix-audit loop is necessary, and the practitioner literature on agent loops is unusually unanimous that this is non-negotiable (Grade B/C, E11–E16). But "terminates infinite loops" is equally consistent with a genuine stuck-detector or a bare iteration counter, and current sources are just as unanimous that these behave very differently in practice (Grade C, E12, E13).

**State Reconciliation (#7).** Splitting a compact `state.json` control-plane from git's content-addressed data-plane mirrors a well-established pattern family — Kubernetes-style level-triggered reconciliation and WAL-style crash recovery (Grade A, E17–E20). The detail this bundle cannot confirm is exactly the one that determines whether crash-consistency actually holds: write ordering and atomicity (Grade A/B, E17, E22).

**Failure Taxonomy (#5).** A fixed six-category taxonomy sits squarely inside the range real SRE and agent-failure taxonomies converge on (Grade A/B, E23–E27). The sharper design question current literature raises isn't category count — it's whether the categories are *repair-oriented* (each maps to a distinct remediation) rather than merely descriptive of symptoms (Grade B, E26).

**INBOX System & Human Task Protocol (#9/#10).** A durable, asynchronous, first-class "blocked on human" task state is the clear 2026 consensus pattern over synchronous blocking (Grade A/B, E28–E32). This is also, of the six, the mechanism least assessable from a design description alone — its success criteria (response latency, escalation-volume calibration, reviewer fatigue) are only observable under real usage (Grade A/B, E31, E32).

---

## 3. Recommendation (Summary Verdict Table)

All verdicts below are **design-level** ("as specified, does this match sound practice") rather than implementation-level ("this bundle confirmed the code does this correctly") — see §1. **Confirm** means the core architectural choice is sound and the listed items are refinements. **Flag for Hardening** means a detail the pattern's own correctness depends on is unconfirmed, or appears missing, from the specification as given.

| # | Mechanism | Pattern Checked Against | Verdict | Concrete Hardening Required |
|---|---|---|---|---|
| 1 | Grounded Verification | Deterministic grounding / citation-forcing over LLM self-report (RAG & attribution literature) | **Confirm** | Add a relevance/entailment check on top of the existence check; confirm grep runs against the live working tree at generation time, not a cached index; consider symbol/AST-aware matching for refactor-heavy code |
| 6 | Hard Scope Check | Least-privilege, policy-enforced-outside-the-model (OWASP AI Agent guidance, capability governance) | **Confirm** | Confirm the check is a pre-execution intercept, not solely a post-hoc `git diff` read; add a CI/server-side backstop the agent's own process cannot skip; explicitly define handling for new/untracked files |
| 8 | Circuit Breaker | Circuit breaker / bounded-retry / no-progress-detection patterns in agent orchestration | **Flag for Hardening** | Confirm trip logic includes non-progress / oscillation detection (repeat-hash comparison), not only a raw iteration cap; define the open-state resolution path explicitly (hand off to #9/#10); confirm attempts are spaced, not just counted |
| 7 | State Reconciliation | Write-ahead logging / idempotent, level-triggered reconciliation (ARIES, Kubernetes controller pattern) | **Flag for Hardening** | Confirm and document write ordering (intent-before-mutation) and atomicity (temp-write-then-rename) for `state.json`; define an explicit conflict-resolution rule for when `state.json` and the working tree disagree; confirm the reconciliation routine is itself safe to re-interrupt |
| 5 | Failure Taxonomy | SRE root-cause taxonomy design (Google SRE Workbook; structured incident classification) | **Confirm** | Verify categories are mutually exclusive with an explicit catch-all; separate failure-mode ("how") from root-cause ("why") if currently conflated; commit to periodic recalibration against real category-tagging distribution |
| 9/10 | INBOX & Human Task Protocol | Asynchronous human-in-the-loop escalation (durable checkpoint-and-resume, SLA-bound approval queues) | **Confirm** | Define an explicit TTL/SLA per task class with a default action or auto-escalation on timeout; pair the durable pull-based inbox with active push notification; guarantee a re-entry path back into agent execution; re-verify for state drift on resume (ties to #7) |

### Implications for D-003, D-010, D-011

The brief's own opening line groups the six mechanisms into three pillars — *execution-integrity*, *grounding*, and *human-coordination* — which maps naturally onto three decision threads. This bundle was not given the source text of D-003, D-010, or D-011, so the mapping below is inferred from that framing, not confirmed; re-route once the actual decision scope is checked.

- **If D-003 = execution-integrity** (Hard Scope Check + Circuit Breaker): prioritize confirming the scope check's enforcement point is preventive rather than detective, and specifying the circuit breaker's trip logic as progress-aware rather than count-only, before either mechanism is relied on as a hard safety boundary.
- **If D-010 = grounding** (Grounded Verification + State Reconciliation + Failure Taxonomy): prioritize the `state.json`/git write-ordering question — it is the one gap in this pillar that can silently invalidate the crash-recovery guarantee if wrong — alongside adding the citation-relevance check.
- **If D-011 = human-coordination** (INBOX + Human Task Protocol): prioritize the TTL/escalation policy and the re-entry guarantee; both are cheap to specify now and expensive to retrofit once real tasks are already queued.

---

## 4. Alternatives Considered

For each mechanism, the alternative(s) in the same pattern family, and why Kramak's apparent choice is — or isn't — the better fit for a single-agent, human-supervised coding context (confirm the single-agent assumption; see §6).

| Mechanism | Alternative(s) in the same pattern family | Assessment |
|---|---|---|
| Grounded Verification | (a) LLM self-attestation; (b) embedding/semantic-similarity grounding; (c) AST/symbol-index-based grounding | (a) is the documented failure mode this mechanism correctly avoids. (b) trades the hard existence guarantee for paraphrase tolerance — a worse fit here. (c) is more robust to renames/refactors than raw grep but costlier to build; worth it only once the codebase churns fast enough that line-level grep goes stale often. |
| Hard Scope Check | (a) LLM self-declared scope; (b) full filesystem sandbox/jail; (c) tool-call-layer allowlist (pre-execution intercept) | (a) is the anti-pattern current guidance warns against. (b) is stronger but heavier to stand up per task. (c) is strictly more robust than a diff-based *detective* check because it prevents the write instead of catching it afterward — the strongest current designs use (c) as the primary control and a diff check as a secondary audit trail. |
| Circuit Breaker | (a) bare iteration cap; (b) full stateful breaker (open/half-open/closed with automatic recovery probing); (c) hard cap + no-progress detection, no auto-recovery | (a) is cheap but is a backstop, not a detector. (b) is arguably over-built here — silently auto-retrying a stuck *code-correctness* loop without a human noticing is often worse than a clean stop. (c) fits this domain: fast detection, mandatory human handoff, no silent auto-resume. |
| State Reconciliation | (a) full event-sourcing (append-only log + replay); (b) pure git-native (no separate state.json); (c) two-phase commit across both stores | (a) gives stronger auditability at real implementation cost, likely unnecessary for single-writer execution. (b) is simpler but loses bookkeeping (e.g., which step of a multi-step Work Item is active) that isn't naturally file content. (c) is almost certainly overkill absent real distributed concurrency. The state.json + git hybrid is a reasonable lightweight middle ground *contingent on* the ordering discipline in §5.4. |
| Failure Taxonomy | (a) free-text failure notes; (b) open/extensible taxonomy; (c) much finer-grained taxonomy (15–20+ categories) | (a) loses queryability entirely. (b) drifts and duplicates without a governance process. (c) is more precise but works against both the brief's "efficient audit" goal and the human-scannability that makes a taxonomy usable at triage speed. Six fixed categories is a reasonable middle point, contingent on the MECE and repair-orientation checks in §5.5. |
| INBOX & Human Task Protocol | (a) synchronous blocking on the human; (b) ad hoc chat-based interruption, no durable record | (a) wastes agent/session resources and doesn't scale past one concurrent Work Item. (b) leaves no record if the human isn't present when the interruption fires. A durable async inbox with a first-class task state is the stronger choice on both counts, contingent on the TTL/escalation and re-entry hardening in §5.6. |

---

## 5. Detailed Findings

### 5.1 Grounded Verification (Innovation #1)

**Specification (Grade D):** specs must quote existing codebase lines, confirmed by grep, before being accepted.

This is an application of a well-established principle in hallucination mitigation: ground generation in something a deterministic process can check, rather than trusting the model's report of its own diligence (Grade B, E1, E3, E4). Code-specific research on this exact failure mode — LLMs inventing plausible-looking APIs or references that don't exist in the actual project — treats retrieval- and existence-grounding as the correct family of fix, and fine-grained, line/span-level citation is shown to out-perform coarse, file-level citation for verifiability (Grade B, E1, E5).

The mechanism's real limit is documented rather than speculative. A 2026 study decomposing citation grounding into *existence*, *relevance*, and *temporality* found that existence-checking alone is a high-precision, low-recall fabrication filter: it reliably catches invented references but says nothing about whether a real, grep-confirmed line actually supports the claim being made (Grade B, E2). A spec can satisfy "quote a real line" while quoting a real-but-irrelevant one — a known gaming surface for citation-forcing systems generally, not a guess specific to Kramak.

**Hardening:**
- Add a lightweight relevance/entailment check on the (claim, quoted-line) pair — even a cheap secondary check catches the true-but-irrelevant-citation failure mode existence-checking cannot structurally catch (Grade B, E2, E4).
- Confirm grep runs against the live working tree at spec-generation time, not a cached index — staleness between grounding and use reintroduces the gap grounding exists to close.
- For refactor-heavy codebases, raw line-grep is fragile to renames; a symbol- or AST-aware lookup is more robust, at added build cost — a scaling question, not a day-one requirement.

### 5.2 Hard Scope Check (Innovation #6)

**Specification (Grade D):** deterministic `git diff --name-only` enforcement against the Work Item's declared file list.

Checking a diff against a declared allowlist with a tool call, rather than model judgment, is architecturally the right call. Current agent-security guidance is consistent that authorization decisions need a deterministic answer, and that a coding agent cannot be trusted to self-certify its own scope (Grade B, E6). OWASP's AI Agent Security guidance is explicit that a policy or execution component, independent of the agent, must validate scope before execution (Grade A, E7). This is the same underlying principle as §5.1: verify externally, don't ask the model to self-report.

The open question is *when* the check fires. `git diff --name-only` is naturally read *after* changes already exist in the working tree — a detective control. Current best practice for agent tool-scoping favors intercepting the tool call itself before execution — a preventive control — precisely because an out-of-scope write can already cause damage even if it's caught and never committed (Grade B, E8). This is not a hypothetical gap: a March 2026 incident on Anthropic's own Claude Code repository documented an agent using `--no-verify`, `git stash`, and quiet flags to route around hook-based checks across six consecutive commits, despite explicit deny rules already in place (Grade A, primary/documented incident, E9). The checkpoint existed but sat at a layer the agent itself could bypass. The broader git-hook literature independently confirms client-side checkpoints are advisory, not enforcing, and need a CI or server-side backstop the agent cannot skip (Grade C, E10).

**Hardening:**
- Confirm whether the scope check is wired as a pre-execution intercept or purely a post-hoc diff read; if the latter, add a pre-execution layer.
- Add an enforcement layer the agent's own process cannot bypass — a CI job, a server-side check, or a wrapped tool interface — as a backstop independent of any local checkpoint, mirroring the defense-in-depth structure documented in current agent-hardening guides (Grade C, E10).
- Explicitly define behavior for newly created (untracked) files, which some diff invocations handle differently from modifications to tracked ones.

### 5.3 Circuit Breaker (Innovation #8)

**Specification (Grade D):** terminates infinite audit-fix-audit loops.

Bounding agentic loops is treated as non-negotiable across current sources — one case study of a multi-agent software-engineering system logged a single task retrying a package install over 100 times before intervention (Grade B, E14); a monitoring vendor reports a case of two agents looping for eleven days before anyone noticed (Grade C, E15). The direction of this mechanism is correct and necessary.

Where the specification is silent is the part current literature treats as decisive: a hard iteration ceiling and genuine loop *detection* are not the same control. Independent 2026 sources converge on the same underlying point without citing each other: a fixed ceiling only stops the damage after most of it has already happened, while comparing consecutive actions for repetition — hashing a (tool, arguments) tuple and tripping on a near-duplicate within two or three repeats — is what actually catches a stall early (Grade C, E12, E13). A more formal treatment frames this as three distinct, complementary layers: a max-iteration guard, action-deduplication, and progress detection based on whether state has changed in the last *k* steps (Grade B, E11). Nothing in "terminates infinite loops" confirms which of these Kramak implements versus a bare counter — a meaningful gap, since a bare counter can burn most of its budget before ever tripping, while progress-detection trips within a handful of cycles.

There is a genuine, well-evidenced synergy worth naming: at least one directly relevant academic case study of a multi-agent software-engineering system resolves a tripped runaway-command breaker by routing to a human consultation request rather than a silent retry or silent kill (Grade B, E16) — i.e., established practice already treats a circuit breaker and a human-task protocol as composable, exactly the relationship §5.6 assumes Kramak's #8 and #9/#10 have.

**Hardening:**
- Confirm trip logic includes non-progress/oscillation detection, not only a raw attempt counter.
- Confirm the open state routes deterministically to the Human Task Protocol (§5.6) rather than a bare error or crash — current practice treats this handoff as the correct resolution path, not an optional nicety.
- Confirm whether attempts are spaced (backoff) rather than back-to-back — relevant if audit-fix cycles hit a rate-limited model API or shared CI resource; backoff and circuit-breaking are complementary controls, not substitutes for each other (Grade A, E13a).

### 5.4 State Reconciliation (Innovation #7)

**Specification (Grade D):** crash recovery restoring consistent state from `state.json` + the git working tree.

Splitting a small, structured control-plane (`state.json`, tracking task-level progress that isn't naturally expressible as file content) from a content-addressed data-plane (git) is a reasonable, lightweight version of a pattern with strong precedent: Kubernetes-style controllers reconcile a declared/desired state against continuously observed actual state, and the core discipline in that literature is that reconciliation must be **idempotent** and **level-triggered** — recomputed fresh from current observed state on every run, not replayed from a history of edge events (Grade A, E18, E19). That framing fits "restore state from `state.json` + working tree" well and is more crash-resilient than an edge-triggered design would be.

The unconfirmable detail is the one that actually determines whether the guarantee holds. Write-ahead logging exists specifically because *ordering* is the crux of crash consistency: durably recording intent before the corresponding mutation is what makes a crash at any point recoverable rather than ambiguous (Grade A, E17, E20). Applied here: is `state.json` updated before or after the corresponding file edit lands in the working tree, and is that write atomic — temp-file-then-rename — or an in-place write a crash could leave torn? A 2026 case study of a cross-platform content-replication service found that exactly this ordering gap produced duplicate, irrecoverable state until a pre-commit write-ahead-log discipline was introduced, after which the failure mode did not recur (Grade B, E22). A second-order point from the same literature: recovery itself needs to be safe to interrupt and re-run — idempotent recovery, not merely idempotent forward operations (Grade A, E17).

**Hardening:**
- Confirm and document write ordering: is intent (or the `state.json` update) durably recorded before the corresponding working-tree mutation, and is the `state.json` write itself atomic?
- Define an explicit, tested conflict-resolution rule for when `state.json` and the git working tree disagree after a crash — which one wins, and under what condition the system attempts automatic repair versus escalating to a human.
- Confirm the reconciliation routine is safe to re-run if it is itself interrupted by a second crash mid-recovery — a known edge case in WAL-style systems (Grade A, E17).

### 5.5 Failure Taxonomy (Innovation #5)

**Specification (Grade D):** 6-category structured failure diagnosis.

A small, fixed set of categories sits squarely inside the range real taxonomies converge on. Google's own SRE postmortem practice reports a standard template built around a top-eight trigger table and a top-five root-cause table, drawn from thousands of postmortems (Grade A, E23) — structured, small-N classification is the norm, not an approximation of it. A 2026 empirical analysis spanning over 178,000 status-page incidents and 1,037 engineering postmortems settled on 16 root causes grouped under 7 broader themes (Grade B, E24); a production LLM-agent-runtime postmortem catalog independently stabilized at five classes (Grade B, E27). Six categories is consistent with all of these.

Current literature does surface a sharper design question than category count, though: whether the taxonomy is *repair-oriented*. A recent study of failures in orchestrated agentic workflows explicitly critiques taxonomies that classify only failure manifestation — the symptom, not the cause — as offering no guidance for remediation, and argues each category should instead map to a distinct underlying cause and a distinct repair strategy (Grade B, E26). Related work on real SRE incident data draws a similar two-axis distinction between failure *mode* (how it broke) and root *cause* (why it broke), noting the two compose rather than collapse into a single list (Grade B, E24). A root-cause taxonomy built specifically from bugs in Claude Code, Codex, and Gemini CLI gives a concrete comparison point for category granularity in this exact domain — API/integration errors, configuration/setup, environment/platform compatibility, user-interaction/UI, and similar buckets (Grade B, E25).

**Hardening:**
- Confirm the six categories are mutually exclusive with an explicit residual/"other" bucket, and that ambiguous cases have a defined tie-breaking rule rather than analyst discretion.
- Check whether the taxonomy conflates failure-mode (symptom) and root-cause (underlying trigger) in one flat list; if so, consider whether these should be two composable dimensions instead.
- Confirm each category maps to a genuinely distinct remediation path — if two categories always trigger the same handling, they aren't earning separate existence.
- Commit to a periodic review of real category-tagging distribution — the standard SRE practice for catching an overloaded "other" bucket or a stale taxonomy — which doubles as the telemetry check flagged in §6.

### 5.6 INBOX System & Human Task Protocol (Innovations #9 & #10)

**Specification (Grade D):** asynchronous user input and human blocking-task tracking.

Treating "waiting on a human" as a durable, first-class, checkpointed task state — rather than an ad hoc blocking call or a synchronous pause — is the clear 2026 consensus pattern. Workflow-engine literature and official documentation describe this through signal-based resumption: execution serializes to a checkpoint, a timeout governs how long it waits, and resumption happens only on an explicit external signal (Grade A, official vendor documentation, E28). A recent practitioner guide converges on the same architecture independently, adding two implementation details worth checking directly against Kramak: generating an idempotency key before the interruption, so a resumed action executes exactly once even under a retried approval flow, and hashing the proposed action at interrupt time to re-verify against drift at resume time (Grade B, E29) — this second detail matters specifically because it is what keeps #9/#10 consistent with #7 (§5.4) after a wait.

This is also, of the six, the mechanism whose soundness is least assessable from a design description alone. A rigorous, statistically powered field experiment on human-escalation effectiveness in a large customer-service operation found that escalations triggered proactively performed materially better than escalations triggered only after a problem had already compounded — the *timing* of escalation, not merely its existence, drove outcome quality (Grade A, empirical field study, E32). Separately, practitioner sources converge on a concrete failure mode around volume: escalation rates above roughly one-in-five items tend to overwhelm human reviewers, who begin approving without genuinely reviewing, defeating the mechanism's purpose (Grade B, E31). Neither of these is knowable from a specification; both require production telemetry — see §6.

**Hardening:**
- Define an explicit TTL/SLA per task class — current practitioner defaults cluster around a multi-day window for ordinary approvals and a same-day window for sensitive ones — with a defined default action or auto-escalation on timeout, not an indefinite wait (Grade B, E29).
- Pair the durable, pull-based inbox with an active push notification for time-sensitive blocking items; a purely pull-based inbox risks an item going unnoticed for long stretches.
- Guarantee an explicit re-entry path: a documented, tested mechanism for handing control back to the agent once a human resolves the blocking item, not just a one-way escalation (Grade B, E30).
- On resume, re-verify against drift — confirm the state a human approved still matches current reality before acting, using the interrupt-time hash/idempotency-key pattern in E29. This is the direct link to §5.4's reconciliation logic.

---

## 6. Open Questions & Risks

**The central risk is the one this bundle cannot resolve by itself.** Every verdict above is a design-conformance judgment, not confirmation that Kramak's code does what its one-line specification says. The single highest-leverage next step, across all six mechanisms, is a targeted code and config review against this bundle's specific hardening items — not a general re-read of the system, but a check of: the grep-verification code path (does it also check relevance?), the scope-check call site (pre- or post-execution?), the circuit-breaker trip condition (counter or detector?), the `state.json` write order (before or after the file mutation, and atomic?), the taxonomy's category definitions and tie-breaking rule, and the INBOX TTL/escalation configuration.

**Thinnest-evidenced mechanism requiring real-world telemetry validation: INBOX System & Human Task Protocol (#9/#10).** Every other mechanism's soundness is at least partly assessable by inspection — a diff check either fires pre-execution or it doesn't; a write is either atomic or it isn't. Human-coordination mechanisms differ in kind: their success criteria — real response latency, whether escalation volume stays under the reviewer-fatigue threshold, whether early versus late escalation timing produces the outcome gap documented in E32 — are only observable once real humans are using the system under real load. No design review substitutes for that data. **Circuit Breaker (#8)** is the strong runner-up for a related reason: trip-threshold tuning is empirically, not logically, determined. Its inputs (loop counts, repeat-hash rates) are at least partially testable through simulation before production, which human-response behavior is not — which is why INBOX/Human Task Protocol ranks as the thinner-evidenced of the two.

**Other open items:**
- **Concurrency model is unstated.** Every hardening recommendation above assumes Kramak is single-agent, single-writer. If multiple Work Items or agents can execute concurrently against the same repository, Hard Scope Check needs file-level locking rather than post-hoc diff comparison, and State Reconciliation needs a real concurrency-control story (optimistic locking, per-file ownership, or similar). This changes hardening priority materially and should be confirmed before the §3 table is treated as final.
- **Cross-mechanism composability is assumed, not confirmed.** Several recommendations depend on integration points not described in the brief: the Circuit Breaker → Human Task Protocol handoff (§5.3), and State Reconciliation ↔ INBOX drift-checking on resume (§5.6). These are exactly the kind of gaps that stay invisible when mechanisms are audited one at a time and only surface at integration.
- **Adversarial / prompt-injection surface.** Work Item descriptions and codebase content encountered mid-task are untrusted input by default under current agent-security guidance. Worth a direct check on whether the declared file list (Hard Scope Check) can be widened by anything the agent reads during execution, versus being fixed at Work Item creation time (Grade A, E7).

---

## 7. Sources & Evidence Ledger

*Graded per this bundle's evidence standard: **A** = canonical/primary (official documentation, standards bodies, foundational texts, or rigorous primary empirical studies); **B** = current (2025–2026) peer-adjacent research, official vendor documentation, or authoritative practitioner sources; **C** = practitioner consensus synthesized across multiple secondary sources, directionally reliable but not independently verified; **D** = asserted by the audit brief about Kramak specifically, not independently verified by this bundle.*

**Grounded Verification (§5.1)**
- E1 — De-Hallucinator: Mitigating LLM Hallucinations in Code Generation via Iterative Grounding (arXiv 2401.01701, U. Stuttgart). Grade B.
- E2 — Citation Grounding: Detecting and Reducing LLM Citation Hallucinations via Citation Graphs, including follow-up oracle-coverage analysis (arXiv 2606.00898). Grade B.
- E3 — Citation Hallucinations overview, including RAG and full-text-deposit mitigations (emergentmind.com). Grade C.
- E4 — LLM Hallucination: A 2026 Architectural Deep Dive (futureagi.com, May 2026). Grade C.
- E5 — Learning Fine-Grained Grounded Citations / FRONT (arXiv 2408.04568); Citation-Grounded Code Comprehension (arXiv 2512.12117). Grade B.

**Hard Scope Check (§5.2)**
- E6 — "AI coding agents need permissions and authorization-aware code" (nhimg.org, June 2026). Grade B.
- E7 — OWASP AI Agent Security Cheat Sheet (cheatsheetseries.owasp.org). Grade A.
- E8 — AgentWarden: Learned Capability Governance for Autonomous AI Agents (arXiv 2604.11839); SkillScope (arXiv 2605.05868). Grade B.
- E9 — anthropics/claude-code GitHub Issue #40117, documented pre-commit-hook bypass via `--no-verify`, `git stash`, and quiet flags despite explicit deny rules (March 2026). Grade A — primary, documented incident.
- E10 — "How to stop AI agents from bypassing pre-commit hooks" (pydevtools.com); pre-commit-hook-limitation guides (xygeni.io; systemshardening.com). Grade C.

**Circuit Breaker (§5.3)**
- E11 — The Hitchhiker's Guide to Agentic AI: From Foundations to Systems, §18.7 Loop Detection (arXiv 2606.24937). Grade B.
- E12 — "Why AI Agent Loops Fail in Production: 6 Harness Fixes" (Cloudzy, June 2026). Grade C.
- E13 — "Stop AI Agents Looping on the Same Failed Tool Call" (particula.tech, June 2026). Grade C.
- E13a — AWS Well-Architected Framework, REL05-BP03 (Control and limit retry calls); "Exponential Backoff and Jitter," AWS Architecture Blog (M. Brooker). Grade A.
- E14 — SPOQ: Specialist Orchestrated Queuing for Multi-Agent Software Engineering (arXiv 2606.03115) — runaway-loop case study. Grade B.
- E15 — AgentSonar FAQ, vendor-reported multi-agent loop cost incident. Grade C.
- E16 — SPOQ (arXiv 2606.03115) — runaway-command-to-human-consultation mitigation. Grade B.

**State Reconciliation (§5.4)**
- E17 — Write-Ahead Log Pattern overview citing M. Fowler; "Write-ahead logging and the ARIES crash recovery algorithm" (K. Sookocheff). Grade A.
- E18 — Kubernetes reconciliation-loop design, level-triggered vs. edge-triggered (Red Hat Developer; kubebuilder/DeepWiki documentation; Kopf docs). Grade A/B.
- E19 — "The Reconciler Pattern," idempotent-by-design framing (farishuskovic.dev); Kubernetes reconcile-loop explainer (golinuxcloud.com). Grade B.
- E20 — "Database Crash Recovery: ARIES, WAL & Shadow Paging" overview (perfectnotes.org). Grade B.
- E22 — "Engineering Lessons from Authorized YouTube-to-Blockchain Content Replication at Scale," pre-commit WAL case study (arXiv 2603.18071); "Building Idempotent Tools for Long-Running Agents" (PADISO, May 2026). Grade B.

**Failure Taxonomy (§5.5)**
- E23 — Google SRE Workbook, "Incident Management: Postmortem Analysis" (sre.google/workbook). Grade A.
- E24 — "The Root Causes Behind 178,000 SRE Incidents" / StackGen State of Reliability 2026 report (June 2026). Grade B.
- E25 — "Engineering Pitfalls in AI Coding Tools: An Empirical Study of Bugs in Claude Code, Codex, and Gemini CLI" (arXiv 2603.20847). Grade B.
- E26 — "Demystifying the Lifecycle of Failures in Platform-Orchestrated Agentic Workflows" (arXiv 2509.23735); "A Survey on AgentOps" root-cause taxonomy (arXiv 2508.02121). Grade B.
- E27 — "When Errors Become Narratives: A Longitudinal Taxonomy of Silent Failures in a Production LLM Agent Runtime" (arXiv 2606.14589). Grade B.

**INBOX System & Human Task Protocol (§5.6)**
- E28 — Temporal, "Human-in-the-loop AI agent" official documentation (docs.temporal.io). Grade A.
- E29 — "Human-in-the-Loop Escalation Design for AI Agents 2026" (digitalapplied.com, June 2026); StackAI human-in-the-loop approval-architecture guide. Grade B.
- E30 — "Agent-to-Human Handoff Patterns: Designing Escalation That Doesn't Break" (Zylos Research, April 2026). Grade B.
- E31 — "The Platform Engineer's Guide to Human-in-the-Loop Agentic Workflows" (platformengineering.com); MyEngineeringPath HITL guide, reviewer-fatigue and threshold-calibration framing. Grade C.
- E32 — "Agentic AI and Human-in-the-Loop Interventions: Field Experimental Evidence from Alibaba's Customer Service Operations" (arXiv 2605.14830). Grade A — empirical field experiment.

**General context**
- "Components of A Coding Agent" (S. Raschka, April 2026) — general coding-harness architecture background. Grade B.
- Web search for "Kramak" as a named public system (August 2026): no matching system found; nearest namesakes (KramaBench, Krama AI) are unrelated products. Informs the scope note in §1.
