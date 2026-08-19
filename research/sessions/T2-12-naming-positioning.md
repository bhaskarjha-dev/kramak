---
id: T2-12
title: "Naming & Positioning Statement: Kramak vs. the Competitive Field"
date: 2026-08-19
status: complete
topic: naming-positioning
tags: [branding, positioning, tagline, discoverability, decision-record]
informs_decisions: [D-008]
confidence: Medium
---

# Naming & Positioning Statement: Kramak vs. the Competitive Field

## 1. Research Question

Does Kramak's current positioning — the fixed name **Kramak (क्रमक)**, the tagline *"The missing SDLC for AI agents,"* and the category framing *"Layer 3: Process alongside AGENTS.md and MCP"* — read clearly and competitively to English-speaking developers evaluating AI-agent tooling in August 2026? With the name itself out of scope, where should the surrounding copy change to maximize technical clarity, and how does that copy compare with RIPER-5, GitHub Spec Kit, and the agent-loop behavior developers already get for free from their coding agent of choice?

*Methodology note:* the brief's referenced `sessions/T2-01-competitive-landscape.md` was not present in the working environment for this analysis (uploads and workspace were checked directly; the path does not exist). Rather than block on it, the competitive findings below — on RIPER-5, GitHub Spec Kit, built-in agent loops, and the wider "agentic SDLC" terminology field — were independently reconstructed via web research current to August 19, 2026. Sourcing is graded and listed in Section 7. Anything below that turns out to duplicate or conflict with T2-01 once located should be reconciled against that file, not this one.

## 2. Key Findings

- **The name is not the primary risk — the borrowed category term is.** Non-English names have a real, working precedent in developer infrastructure (Kubernetes, Istio, Hasura), but every successful case pairs the name with a plain-English descriptor doing 100% of the explanatory work. Kramak already does this. The tagline's problem isn't "Kramak" — it's "SDLC." **[Grade A/B]**

- **Kramak's etymology is an unusually tight semantic fit.** Unlike Kubernetes ("helmsman," a metaphor for orchestration) or Istio ("sail," a metaphor for a mesh), Kramak's root translates close to literally onto the product category itself — a step-by-step, sequential procedure. That's a stronger starting point than most of the precedent set. **[Grade A]**

- **"SDLC" is the single most contested acronym in this exact space right now.** As of August 2026, "Agentic SDLC" is actively used by PwC, KPMG, Thoughtworks, IBM, Sonar, Snyk, Augment Code, CodeRabbit, Grid Dynamics, and EPAM, plus AWS's own branded "AI-DLC" workflow and at least two dedicated sites (ai-sdlc.io, asdlc.io). A tagline built on "the missing SDLC" is entering a room that is already, verifiably, not empty. **[Grade A/B]**

- **The dominant readings of "SDLC" don't match Kramak's actual scope claim.** Most institutional "Agentic SDLC" content describes full-lifecycle, org-wide transformation (roles, governance, ROI, board-level change) — the enterprise Scrum/Jira register the brief worried about. Kramak's own category framing ("Layer 3," alongside two narrow technical standards) is a much smaller claim. The word "SDLC" invites a bigger promise than the product is making. **[Grade B]**

- **Direct competitors solved this by not fighting over the same word.** GitHub Spec Kit coined its own term, "Spec-Driven Development" (SDD), and owns it outright. RIPER-5 never named a category at all — it only named its five workflow steps. Neither is competing for share of a term that PwC and AWS also use. **[Grade A]**

- **The proposed alternatives fix ambiguity but introduce genericness.** "Autonomous Agent Process Framework" and "Deterministic Plan-Execute-Audit Loop" are unambiguous but not ownable — both phrases are near-identical to dozens of existing academic and vendor terms already circulating (Plan-and-Execute, Plan-Do-Check-Act, "governed orchestration framework"). Precision was gained; distinctiveness was lost. **[Grade B]**

- **Discovery in 2026 runs through documentation quality, not name searchability.** Developers increasingly find tools via GitHub topic search, comparison content, and AI answer-engines reading READMEs — not by guessing a brand name. A distinctive, non-English name shifts essentially all discoverability work onto category framing and copy, which is exactly the lever this brief has open to it. **[Grade B]**

## 3. Recommendation

**Keep "Kramak" as specified. Retire "SDLC" from the primary brand promise. Keep it as a secondary keyword.**

The evidence doesn't support dropping "SDLC" from Kramak's vocabulary entirely — it's a real, high-intent search term (Section 5) — but it does support removing it from the *tagline*, where it currently does two jobs it's bad at: promising something bigger than the product ("missing," full lifecycle) and competing for share of mind against PwC, KPMG, IBM, and AWS. Below is a primary tagline plus two supporting variants for different surfaces, a refined category subtitle, and a one-paragraph elevator pitch.

**Primary tagline (hero / README H1 subtitle):**
> **Kramak: process control for autonomous coding agents**

Rationale: leads with the actual differentiator (control over how an agent's work proceeds, not what it produces), names the audience precisely ("autonomous coding agents," not the vaguer "AI agents"), and borrows no contested acronym. "Process control" also carries a useful secondary association from reliability/manufacturing engineering — discipline and guardrails around something that would otherwise run open-loop — which is thematically on-brand rather than accidental.

**Variant — meaning-forward (About section, first-time visitors):**
> **Kramak — step-by-step discipline for autonomous coding agents**

Rationale: leans on the literal Sanskrit translation as a feature rather than a fact to be excused. Use this where there's room for one more sentence of context (the elevator pitch below supplies it); it earns the name rather than hiding it.

**Variant — SEO/comparison-content bridge (long-form docs, "Kramak vs. X" pages, meta description):**
> **Kramak: the process layer between your spec and your shipped code — built for teams standardizing their agentic SDLC**

Rationale: this is the one place "agentic SDLC" belongs — late in the sentence, as a keyword that captures real search traffic (Section 5), not as the load-bearing promise. Reserve it for pages competing on that search term specifically; keep it off the primary tagline and the GitHub repo description.

**Category subtitle:**
> **Layer 3 — Process, alongside AGENTS.md (context) and MCP (connectivity)**

Rationale: the "Layer 3" framing itself is sound — AGENTS.md and MCP are both real, Linux Foundation–governed standards, and positioning as the logical third layer is a legitimate, evidence-backed claim (Section 5). The only change is adding one-word glosses for each, so a reader who knows MCP but not AGENTS.md (or vice versa) still gets the analogy in one pass.

**Elevator pitch (one paragraph):**
> Kramak (क्रमक) is Sanskrit for a step-by-step procedure — an apt name for a tool built to give one to autonomous coding agents. AGENTS.md tells an agent what a project is and how it's built; MCP gives it the tools to act. Neither governs how the work itself proceeds once an agent starts: what gets planned before code is written, what gets checked before a step is marked done, what gets logged so a human can audit the run afterward. Kramak is that layer — plan, execute, verify, checkpoint — sitting alongside AGENTS.md and MCP rather than replacing either, and working with whichever coding agent a team already runs.

**Concrete README/GitHub copy:**
- GitHub repo description field: *"Process control for autonomous coding agents — plan, execute, verify, checkpoint. Sits alongside AGENTS.md and MCP."* (≈115 characters)
- Suggested GitHub topics: `ai-agents`, `agentic-coding`, `agents-md`, `model-context-protocol`, `autonomous-agents`, `ai-coding-agents`, `agent-workflow`, `developer-tools`
- First README sentence should state, plainly, that Kramak is agent-agnostic middleware (works with Claude Code, Cursor, Copilot, Codex CLI, etc.) — this heads off the likeliest first-glance misreading, that Kramak is itself a coding agent competing with the tool a visitor already uses.

## 4. Alternatives Considered

| Option | Verdict |
|---|---|
| **Keep tagline as-is** ("The missing SDLC for AI agents") | Not recommended. High recognition value from a familiar acronym, but "missing" overclaims against a crowded field (Section 5), and "SDLC" primes the wrong scope (enterprise lifecycle vs. Layer 3 process). |
| **Adopt "Autonomous Agent Process Framework" verbatim** | Not recommended as a tagline. Fully unambiguous, but generic to the point of being indistinguishable from RFP boilerplate; scores poorly on the distinctiveness dimension that actually drives brand recall (Section 5). Reasonable as a *category descriptor deep in docs*, not as the headline. |
| **Adopt "Deterministic Plan-Execute-Audit Loop" verbatim** | Not recommended as a tagline. Most technically precise of the three, and "deterministic" directly addresses the field's current anxiety (agent non-determinism, "verification debt"). But it reads as an architecture-pattern name, not a product category — nearly identical phrasing already exists across academic and vendor agent-loop literature, so it can't be owned the way "SDD" or "service mesh" was. Worth keeping as *internal/technical vocabulary* (e.g., a docs page titled "How Kramak's loop works") rather than the public tagline. |
| **Coin an entirely new, unclaimed category term** (the Spec Kit playbook) | Considered and partially adopted. Fully committing to a new coined term (e.g., something Kramak owns the way GitHub owns "SDD") is the strongest long-run play, but it requires sustained content investment to seed adoption and carries its own risk (see Risk 2, Section 6). The recommendation above is a middle path: don't coin a new acronym yet, but stop centering "SDLC" as the brand promise while reserving it for search-facing copy. |
| **Lead with the Sanskrit meaning explicitly** (own the translation rather than omit it) | Adopted, partially. Kramak's literal meaning is a genuine asset — closer to the product than most naming precedent — so hiding it wastes it. The recommendation surfaces it once, in the elevator pitch and the meaning-forward variant, rather than in the primary tagline where it would cost a beat of processing time on every read. |

## 5. Detailed Findings

### Comparative positioning: Kramak vs. Spec Kit vs. RIPER-5 vs. built-in agent loops

"Built-in agent loops" here means the planning/execution behavior a coding agent already ships with — Claude Code's and Cursor's native agent modes, GitHub Copilot's agent mode, Codex CLI, and Aider's repo-map-plus-commit loop are the concrete instances. This is the real zero-cost alternative Kramak is competing against: a team can simply not adopt any process layer and rely on what's already installed.

| Axis | Kramak (current) | GitHub Spec Kit | RIPER-5 | Built-in agent loops |
|---|---|---|---|---|
| Name transparency | Opaque without translation | Fully descriptive | Acronym that decodes to 5 plain English words | N/A — no separate brand |
| Category term | "SDLC" (borrowed, contested) | "SDD" (coined, owned) [1][2] | None claimed | None claimed |
| Institutional backing | Independent, per brief context | GitHub [1][2] | None — pseudonymous, grassroots origin on the Cursor forum [3] | Vendor (Anthropic, Cursor, OpenAI, etc.) |
| Primary distribution | Ground-zero | github.com + GitHub's own blog + docs.github.com-style hub [1][2] | Cursor community forum + a long tail of independent GitHub forks [3][4] | Pre-installed; zero discovery cost |
| Structural claim | Full "SDLC," positioned as Layer 3 | Explicit 4-phase workflow (Specify → Plan → Tasks → Implement), 30+ agent integrations [2] | 5-mode prompt protocol (Research, Innovate, Plan, Execute, Review) [3][4] | Native reason-act or plan-and-execute loop; ~30–35% multi-step task success in controlled benchmarks [documented in agent-loop literature, Grade B] |
| Tool-agnostic? | Implied, unconfirmed | Yes, explicitly [2] | Yes, via community ports to Claude Code, Copilot, Roo/Kilo [4] | No — locked to the host tool by definition |

Three things stand out. First, Spec Kit's advantage isn't its name — "Spec-Driven Development" is exactly as literal as "process control for autonomous coding agents" — it's that GitHub's own blog and domain authority did the discovery work a name alone never could [1]. Second, RIPER-5 shows the cost of *not* having one canonical source: it has real organic mindshare but is fragmented across a dozen-plus forks and dialects (CursorRIPER, CursorRIPER.sigma, RIPER-5-CONDENSED, GitHub Copilot and Claude Code ports), so search results for "RIPER-5" scatter across unofficial repos rather than concentrating authority in one place [3][4]. That is a direct argument for Kramak — as a single, maintainer-controlled project — to say so explicitly in its copy ("the canonical implementation is here"), since that consolidation is an advantage RIPER-5 structurally lacks. Third, built-in agent loops are the baseline every process layer has to beat, and the honest baseline isn't zero — CMU-cited benchmarks put native multi-step agent task success around 30–35%, which is exactly the gap a process-control layer should be quantifying itself against, rather than against an abstract "SDLC" claim.

### Non-English naming precedent in developer infrastructure

Five cases were examined; two turned out not to be clean analogues, which is itself informative.

- **Kubernetes** — Greek for "helmsman/pilot." Google-backed, open-sourced 2014. The name alone was not enough: the community produced "K8s," a numeronym that solved pronunciation and typing friction the Greek word itself couldn't. The metaphor also seeded a whole nautical naming family (Helm, Harbor, Skipper, Argo), compounding recognition across the ecosystem rather than resting on one name [8].
- **Istio** — Greek for "sail," deliberately chosen to extend Kubernetes' nautical theme. Backed by Google, IBM, and Lyft jointly at launch — three companies' distribution muscle behind one name [9].
- **Hasura** — the closest direct precedent. A portmanteau of Sanskrit *Asura* ("demon," referencing background "daemon" processes) and *Haskell* (its implementation language), confirmed on Hasura's own site. It is genuinely Sanskrit-rooted, genuinely a developer tool, and it worked [10].
- **Temporal** — turned out to be a plain English word (Latin-rooted, but fully naturalized), not a foreign name at all. Included here for completeness since the brief's example set assumed it was a non-English case; it isn't, and shouldn't be cited as one in Kramak's own materials.
- **Trino** — no deliberate etymological story: the rename from PrestoSQL was forced by a trademark dispute, not chosen for meaning. It succeeded on technical continuity, a clean migration path, and backing from Starburst, AWS, and the Linux Foundation — evidence that institutional weight and execution can carry a name with zero semantic resonance at all [11].

The pattern across the working cases (Kubernetes, Istio, Hasura) is consistent: short, phonetically simple names (two to three syllables, no consonant clusters unfamiliar to English speakers), paired with a plain-English descriptor that carries all the explanatory load, backed by an institution with real distribution reach. Kramak clears the phonetic bar comfortably — six letters, two syllables, sits inside the six-to-eight-character range that brand-memorability research consistently identifies as the sweet spot [17] — and its etymology is a tighter fit to the product than any of the three. What it doesn't have, and can't manufacture through naming alone, is Google's, IBM's, or the Linux Foundation's distribution reach. That gap has to be closed with content and category clarity, not absorbed by the name.

### The category-term test: "SDLC" vs. the two alternatives

The brief asked directly whether "SDLC" creates false expectations or highlights autonomous agent execution control. The evidence says: **both, which is the actual problem.** The term is genuinely used both ways in circulation as of August 2026 — Sonar's "AC/DC" framework and independent practitioner writeups use it close to Kramak's intended, execution-control sense [14], while PwC, KPMG, Thoughtworks, IBM, and Grid Dynamics use it for board-level, full-lifecycle transformation narratives — roles changing, governance, ROI [15]. The second group is larger, more institutionally resourced, and further along in owning the term's default reading. EPAM goes further and argues explicitly that "SDLC" is the *wrong* frame for agentic systems, proposing "ADLC" instead, on the grounds that classical SDLC assumes fully-specified, pre-validated behavior that agentic systems structurally violate [13]. A term that one well-resourced competitor is actively arguing *against using* for this exact category is not a safe anchor for a differentiated tagline.

Two more concrete signals sharpen this: `ai-sdlc.io` already brands itself, literally, "The Autonomous AI-SDLC Framework," citing design principles drawn from Kubernetes, Terraform, and OpenTelemetry — i.e., a direct competitor is pursuing the identical positioning territory under an even more literal version of the same name [16]. AWS has its own formalized, separately branded "AI-DLC" workflow. Kramak's tagline isn't just imprecise; it's contesting ground that is already staked, by parties with materially more distribution reach.

Against that backdrop, the two proposed alternatives:

- *"Autonomous Agent Process Framework"* clears up the false-expectation problem completely — it makes no lifecycle claim at all — but it reads as a category description, not a name for one. It is close enough to generic industry phrasing ("governed orchestration framework," "process-aware agent architecture") that it would not be quotable or ownable in the way "spec-driven development" now is for Spec Kit.
- *"Deterministic Plan-Execute-Audit Loop"* is the most technically honest of the three and speaks directly to what the field is currently anxious about (agent non-determinism, unreviewable output, "verification debt" as multiple sources term it [13][14]). Its failure mode is the same one that shows up across the academic and vendor agent-loop literature: "plan-and-execute," "plan-do-check-act," and "plan-execute-verify" are all pre-existing, widely used pattern names. A phrase already this close to common technical vocabulary functions as a mechanism description, not a brand.

Neither alternative should replace "SDLC" wholesale; the recommendation in Section 3 borrows the audience-precision of the first and the control-emphasis of the second while keeping the phrase short enough to be a tagline rather than a spec title.

### Discoverability trade-offs of the Sanskrit root

Taken on its own terms, the Sanskrit root is a small net cost at launch that becomes a non-issue once the project has any inbound links at all — with one caveat worth planning around.

*In favor:* a direct collision check turned up no competing product, company, or notable trademark using "Kramak" — the closest hits are a rare Belarusian/East Slavic surname (roughly 1 in 143 million people globally) and a single, low-traffic 2007 Urban Dictionary joke entry, neither with meaningful search authority [20]. The etymology itself is verifiable and accurate: Sanskrit *kramaka* is glossed directly as "one who proceeds methodically," from the root *kram*, "to go, to step, to proceed in order" [19] — which is a materially better fit to "sequential procedure" than the nautical metaphors Kubernetes and Istio rely on. Once a name is indexed anywhere, a genuinely unique word wins its own exact-match search trivially, which no descriptive, multi-word phrase can do.

*Against:* a distinctive coined name carries zero pre-existing search equity. Nobody is typing "Kramak" today, so — unlike a descriptive name, which can catch incidental category traffic even before brand recognition exists — discovery has to route entirely through category and comparison search, not name recall, until awareness is built by other means [261][262]. No numeronym or informal shorthand has emerged the way "K8s" did for Kubernetes, though at six letters Kramak is short enough that it likely doesn't need one the way ten-letter "Kubernetes" did. And unlike Kubernetes (Google), Istio (Google/IBM/Lyft), or Hasura (venture-backed with a marketing team), Kramak — as an apparently independent project — has no institutional co-sponsor to force awareness through sheer distribution reach; the naming decision doesn't create that gap, but it also does nothing to close it.

*Net read:* the Sanskrit root is defensible and low-risk on its own; it simply means the README, GitHub topic tags, and comparison content have to do all the work a bigger name-brand would otherwise share. That's a reason to over-invest in exactly those surfaces — not a reason to reconsider the name.

## 6. Open Questions & Risks

- **Risk: "SDLC" search volume may be worth more than this analysis credits, even net of brand dilution.** The term clearly carries real search traffic (Section 5). *Reversal trigger:* if referral analytics after 60–90 days show meaningful traffic from "agentic SDLC" / "AI SDLC" queries converting to stars/installs at a rate comparable to other channels, reconsider reintroducing a softened form of "SDLC" into the primary tagline rather than confining it to secondary copy.

- **Risk: an orphaned coined term is worse than a crowded borrowed one.** If Kramak leans toward inventing its own category language (the Spec Kit playbook) and no third party — press, comparison articles, competitors — ever repeats it, the project ends up with no category anchor at all, which is a worse outcome than sharing a crowded one. *Reversal trigger:* if, after a sustained content push (roughly one to two quarters), zero third-party mentions adopt any Kramak-coined term unprompted, fall back to a conventional, even if shared, descriptor rather than continuing to push an unadopted one.

- **Risk: the "Layer 3, alongside AGENTS.md and MCP" framing depends on those standards' continued neutral prestige.** Both are currently Linux Foundation–governed and well regarded, which is exactly why the association is valuable [6][7]. *Reversal trigger:* if a better-resourced competitor (particularly one connected to an AAIF member) stakes the identical "process layer" claim with more institutional backing within the next two to three quarters, the framing needs a sharper point of differentiation or risks being absorbed into a larger player's narrative.

- **Risk: no organic nickname may ever emerge, or an unflattering one might.** Kubernetes got "K8s" through years of organic community use; that can't be manufactured on a schedule, and it may not happen for Kramak at all — or community shorthand could land somewhere the team doesn't want. *Reversal trigger:* monitor community references (forums, social, issue trackers) through the first two quarters; if confusion about pronunciation or an unwanted informal name persists without a natural alternative emerging, proactively publish a preferred short form rather than leaving it to chance.

- **Risk: this entire competitive read is a snapshot as of August 2026 in a fast-moving category.** "Agentic SDLC," "ADLC," "AI-DLC," and "ASDLC" all emerged or gained traction within roughly the past year, per the sources below. *Reversal trigger:* re-run this specific competitive and terminology scan in Q1 2027; if "Agentic SDLC" consolidates as the industry's stable, dominant term rather than staying fragmented across competing labels, the crowding concern weakens and riding the consolidated term may become the better play — revisit the tagline recommendation at that point rather than treating this analysis as permanent.

## 7. Sources & Evidence Ledger

**Grading standard applied** (no prior "Universal Evidence Standard" document was available in the workspace at the time of writing; the following was applied consistently and should be reconciled with the project's canonical standard if one exists elsewhere):
- **Grade A** — primary source: official project documentation, company/foundation announcements, standards-body press releases, primary lexicon or etymological sources.
- **Grade B** — secondary/reputable: established tech press, peer-reviewed or preprint research, analyst-firm reports, practitioner writeups with clear, checkable sourcing.
- **Grade C** — tertiary/community: forums, aggregators, crowdsourced reference sites. Directional signal only; not treated as load-bearing on its own.

| # | Source | Used for | Grade |
|---|---|---|---|
| 1 | GitHub Blog, "Spec-driven development with AI" (Sept 2025) | Spec Kit positioning, launch framing | A |
| 2 | github/spec-kit official README, docs, and DeepWiki architecture overview | Spec Kit workflow, integrations, "SDD" terminology | A |
| 3 | Cursor Community Forum, original "RIPER-5 Mode" thread (robotlovehuman, Mar 2025) | RIPER-5 origin, grassroots/pseudonymous authorship | A |
| 4 | GitHub topic page `riper-5` and fork repositories (CursorRIPER, CursorRIPER.sigma, claude-code-riper-5, etc.) | RIPER-5 fragmentation across forks | B |
| 5 | aider.chat official site and docs | Aider tagline, positioning as terminal pair-programmer | A |
| 6 | agents.md official site; Linux Foundation/AAIF press materials | AGENTS.md standard, adoption scale, governance | A |
| 7 | Anthropic, "Donating the Model Context Protocol and establishing the Agentic AI Foundation" (Dec 9, 2025) | MCP governance transfer, adoption figures | A |
| 8 | kubernetes.io docs; Wikipedia; GeekWire interview with Kubernetes/Heptio namers | Kubernetes etymology, K8s numeronym origin | A |
| 9 | Tetrate, "How Istio got its name" (interview with namers) | Istio etymology and naming process | A |
| 10 | hasura.io/about; HasuraHQ/PromptQL official social post | Hasura etymology (Asura + Haskell) | A |
| 11 | trino.io rebrand announcement (Dec 27, 2020); Starburst blog | Trino/PrestoSQL rename circumstances | A |
| 12 | Temporal official docs and GitHub repository | Confirming Temporal is an English word, not a foreign-origin name | A |
| 13 | EPAM, "Agentic Development Lifecycle (ADLC): A New Model for AI Systems Beyond SDLC" | Explicit rejection of "SDLC" as agentic-era framing | B |
| 14 | Sonar, "What is Agentic SDLC" (AC/DC framework) | Practitioner-register use of "Agentic SDLC" | B |
| 15 | PwC Middle East, "Agentic SDLC in practice" (2026 report); KPMG, Thoughtworks, IBM, Grid Dynamics equivalents | Institutional/enterprise-register use of "Agentic SDLC" | B |
| 16 | ai-sdlc.io; asdlc.io | Direct naming/positioning collisions in the "SDLC" category space | B/C |
| 17 | Alter & Oppenheimer processing-fluency research; *Psychology & Marketing*; ScienceDirect brand-naming studies | Name pronounceability, memorability, and fluency effects | B |
| 18 | daily.dev Ads / Infrasity / DevTune, developer-tool discovery and GitHub SEO reporting (2026) | How developers discover tools; README/docs as the primary discoverability surface | B/C |
| 19 | Sanskrit/Hindi lexicon sources (wisdomlib.org — *Kramaka*, *Kram*; maxgyan.com; HinKhoj) | Verifying Kramak's etymology and translation | A |
| 20 | Forebears.io (surname incidence); Urban Dictionary | Name-collision and trademark-adjacent check | C |
