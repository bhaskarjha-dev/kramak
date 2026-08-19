---
id: T2-09
title: "\"Pure Methodology\" Positioning: Optional Tooling / CLI Layer Tradeoffs"
date: 2026-08-19
status: complete
topic: pure-methodology-tooling
tags: [zero-dependency, companion-cli, brand-positioning, spec-kit, distribution, decision-record]
informs_decisions: [D-009]
confidence: Medium
---

# "Pure Methodology" Positioning: Optional Tooling / CLI Layer Tradeoffs

*Prepared for a Principal Architect decision on D-009. Temporal anchor: 2026-08-19. Evidence grading legend is defined at the head of Section 7; inline tags take the form `[S#-Grade]`.*

## 1. Research Question

Kramak's foundational claim is "pure methodology, zero mandatory runtime dependencies" — Markdown files and JSON Schemas, hand-implementable by anyone. Its closest competitor-by-category, GitHub Spec Kit, has built broad adoption on top of a dedicated Python CLI, and Kramak's own repository already ships `init.sh`, `init.ps1`, and `validate.js` as convenience utilities. This memo asks three linked questions: **(1)** what do precedents from mature pure-convention specifications and from CLI-centric specification frameworks actually show about the adoption, fragmentation, and brand-dilution effects of adding — or refusing to add — an optional tooling layer; **(2)** do Kramak's existing scripts already compromise its zero-dependency positioning in practice, independent of what D-009 decides; and **(3)**, given both, should Kramak remain pure-files-only, bundle an optional CLI in its core repository, or decouple all tooling into a separate companion repository? Findings inform D-009; Section 3 isolates the recommendation itself so it can be read on its own.

## 2. Key Findings

1. **Zero-tooling purity is a proven, sufficient path to mass adoption on its own.** SemVer, Twelve-Factor, and — most relevantly, since it is the newest and most directly comparable case — AGENTS.md all reached broad, durable adoption with no official CLI, validator, or schema whatsoever. AGENTS.md went from roughly 20,000 adopting repositories within a month of launch to 60,000+ within four months `[S10-B][S11-B]`, driven entirely by third parties (AI vendors, editors) choosing to support the format on their own schedule — not by the spec maintaining a distribution funnel `[S7-A]`.

2. **Where companion tooling exists around a pure spec, the healthy pattern is a plural, independently-governed ecosystem — not one blessed implementation.** Conventional Commits spawned commitlint, semantic-release, Commitizen, git-cliff (Rust), EasyBuild (.NET), and gitlint (Python) — at least five languages, none official — while the spec repository itself has never shipped a CLI `[S23-A]`. EditorConfig runs the same pattern one layer down: officially maintained but separately versioned "core" libraries in C, Python, .NET, Lua and Java, explicitly kept apart from "the specification" `[S13-A][S14-A][S15-A]`.

3. **GitHub Spec Kit's adoption is real and substantially CLI-driven, but it is not evidence that bundling preserves purity — because Spec Kit never claimed purity.** `specify-cli` is a hard-dependency Python package (PyPI, installed via `uv`/`pipx`) with explicit prerequisites — Python 3.11+, a package manager, Git `[S1-A]` — inside a repository with 128.6k stars and 30–35 supported agent integrations `[S1-A][S4-A]`. Its own maintainers currently have an *open* proposal to extract `specify-cli` into a separate, reusable installer repository — i.e., drifting toward the decoupled shape Kramak is evaluating, not away from it `[S3-A]`.

4. **Pure specs pay a documented cost for having no enforcement mechanism.** SemVer has no built-in way to check that a release actually complies with its own rules, and real-world adherence is described in practitioner commentary as relying on developer discipline that degrades at scale `[S21-B]`. A 466-repository empirical study of AGENTS.md found no established content structure and high variation in practice `[S12-B]`, prompting a live community proposal to formalize previously-implicit conventions `[S9-A]`. This is the concrete shape of the "manual validation friction" named in scope.

5. **Kramak's `init.sh` / `init.ps1` / `validate.js` already show the "optional-in-prose, load-bearing-in-practice" pattern seen elsewhere.** Community coverage explicitly frames Spec Kit's own CLI as "entirely optional" `[S5-B]` — the templates can be copied by hand — yet every onboarding path, including the official README, leads with CLI installation, and non-interactive/CI runs default to assuming it `[S1-A][S6-B]`. A script that ships inside a "pure" repository and is the only tested path to compliance is a de facto dependency regardless of its documentation label — a dynamic Kramak's existing scripts are already subject to today, before D-009 changes anything.

6. **Distributing an optional CLI via `npx`/`cargo install` imports real, current supply-chain risk into the spec's own trust boundary.** 2025–2026 saw a self-replicating npm worm compromise roughly 500 packages via postinstall scripts and a compromise of a package with 70M+ weekly downloads `[S28-B]`, prompting npm to ship a major security redesign in July 2026 that blocks install scripts and remote sources by default `[S29-B]`. A repository with no package manifest at all cannot be compromised this way; a repository that ships one — even "optionally" — inherits the risk under the project's own name.

7. **EditorConfig shows the long-run payoff of getting the spec right and leaving distribution to the ecosystem.** Editor vendors have progressively absorbed EditorConfig support as a native feature rather than a plugin, with bundled support reported for recent Vim and Emacs releases `[S16-C]`, so most users today install nothing at all. This is the strongest available precedent for the specific shape of Option 3: a tiny, well-specified core, plus tooling that lives — and can eventually disappear into the ecosystem — outside the spec's own trust boundary.

## 3. Recommendation

> **Decision: Adopt Option 3 — decouple all tooling into a separate companion repository (e.g. `kramak-cli`), and migrate the existing `init.sh`, `init.ps1`, and `validate.js` into it as part of the same change.** After this change, the core Kramak repository should contain only Markdown and JSON Schema files — no package manifest, lockfile, or executable script of any kind.

**Why:**

- It is the only option that makes "zero mandatory runtime dependencies" a claim a skeptical outsider can *verify by listing the repository root*, rather than a claim that depends on trusting Kramak's own framing of "mandatory" (Finding 5).
- It matches the strongest available structural precedent for this exact situation — EditorConfig's spec-plus-independently-versioned-cores model — rather than GitHub Spec Kit's, which solves a different problem: Spec Kit never promised purity, so its CLI-first growth is not evidence that bundling is compatible with a purity claim (Findings 3, 7).
- It resolves, rather than freezes, the tension that already exists: `init.sh`, `init.ps1`, and `validate.js` currently sit inside the "pure" repository today (Section 5.4). Of the three D-009 options, Option 3 is the only one that both keeps them available to existing users and removes them from the trust boundary the brand claim depends on.
- It keeps the `npx`/`cargo install` supply-chain surface (Finding 6) out of the artifact developers vendor, fork, or cite as "the spec." A compromised `kramak-cli` release becomes a companion-tool incident, not a spec-integrity incident.
- It does not meaningfully sacrifice one-command validation. For the JSON Schema half of Kramak's artifacts, that convenience already exists for free in off-the-shelf, multi-language validators (Section 5.3); the companion repo's unique job is the smaller, genuinely Kramak-specific surface — Markdown structure and cross-file consistency — that generic tools cannot check.

**Sub-decisions implied by this recommendation:**

1. Host the tooling under a distinctly named, MIT/permissive-licensed repository (`kramak-cli` or equivalent) with its own independent SemVer track.
2. Publish a compatibility matrix from the first release (e.g., "`kramak-cli` 1.x validates Kramak spec 1.x"), avoiding SemVer's own reference-implementation gap, which allowed incompatible dialects to emerge across ecosystems `[S22-B]`.
3. Add one prominent, permanent link from the core repository's README to the companion repository — the single highest-leverage mitigation against the discovery-friction cost this recommendation accepts (Section 6, Risk 1).
4. Do not reimplement JSON Schema validation; document a short snippet using an existing validator (`ajv`, `jsonschema`) instead, and reserve `kramak-cli`'s custom code for what generic tools cannot check (Section 5.5).
5. Treat the migration of `init.sh` / `init.ps1` / `validate.js` as a breaking change requiring a deprecation shim, not a silent relocation (Section 6, Risk 4).

**Confidence calibration:** rated **Medium** in the frontmatter. Confidence in the underlying *precedent pattern* is High — every case surveyed corroborates the same structural logic, and Spec Kit's own maintainers are independently converging on it `[S3-A]`. The rating is held at Medium because the residual uncertainty is Kramak-specific, not pattern-specific: EditorConfig and Spec Kit each had either a decade of runway or a major-vendor distribution channel behind their tooling model. It is not yet known how much discovery friction a smaller, earlier-stage project like Kramak can absorb before it costs more adoption than the purity claim earns back (Section 6, Risks 1 and 6).

## 4. Alternatives Considered

| | **Option 1** — Pure files only | **Option 2** — Bundled CLI in core repo | **Option 3** — Decoupled companion repo *(recommended)* |
|---|---|---|---|
| Closest precedent | SemVer, Twelve-Factor, AGENTS.md | GitHub Spec Kit | EditorConfig |
| Brand claim verifiable by inspection? | Yes | No | Yes |
| One-command validation available? | No, unless third parties build it | Yes, day one | Yes, one link away |
| Maintenance surface in core repo | None | CLI + spec, coupled release cadence | Spec only |
| Supply-chain surface in core repo | None | `npx`/`cargo install` exposure | None |
| Resolves existing `init.sh`/`validate.js` tension | Only by deleting them | No — adds a second, larger instance | Yes |
| Fit vs. a CLI-saturated SDD field | Weakest (only "hard mode" entrant) | Strongest | Moderate (one extra click) |

### Option 1 — Strict zero-dependency purity

No official CLI or validator anywhere; `init.sh`, `init.ps1`, and `validate.js` are either deleted or reduced to inert, non-executable templates. This is a legitimate, precedented position — SemVer, Twelve-Factor, and Conventional Commits' own repository all operate this way `[S20-A][S17-A][S24-A]` — and it produces the cleanest possible brand claim, with zero ongoing maintenance and no possibility of the "official vs. unofficial" confusion that plural tooling can create.

Its cost is that it forfeits one-command validation entirely, including for the JSON Schema half of Kramak's artifacts, where zero-effort tooling already exists off the shelf (Section 5.3) — Option 1 throws that away for no purity benefit, since a companion repo achieves the same repo-root purity without giving up the convenience. It also forces a harder choice than Option 3 does: either delete scripts that existing users may already depend on (a breaking, credibility-costing move with no replacement offered) or keep them and continue making a claim the repository's own file listing contradicts. Finally, in a competitive field where every adjacent SDD framework — Spec Kit, OpenSpec, BMAD-METHOD, Kiro — ships a CLI as the default experience `[S31-C]`, Option 1 makes Kramak the only "bring your own tooling" entrant, a real adoption headwind that Option 3 avoids while keeping the same brand claim.

**Why not chosen:** Option 1 is dominated by Option 3 unless Kramak wants *zero official tooling anywhere*, which is a stronger and more costly claim than "zero mandatory dependencies in the core repo" requires.

### Option 2 — Bundled optional CLI/validator in the core repo

`npx kramak` or `cargo install kramak`, living in the same repository as the spec files, mirroring GitHub Spec Kit's `specify-cli`. This is the fastest path from discovery to a working setup — a single repository, a single README, one command away from validation — and Spec Kit's growth curve is real evidence that this accelerates integrations and awareness `[S1-A]`.

The difficulty is structural, not stylistic: a repository containing a `package.json`, `Cargo.toml`, or `pyproject.toml` is not zero-dependency by any externally verifiable definition, regardless of how the documentation describes the CLI as optional (Finding 5). This option keeps `init.sh`/`validate.js`'s current soft-mandatory status and adds a second, more visible instance of the same problem, plus the `npx`/`cargo install` supply-chain surface (Finding 6), inside the same trust boundary as the spec text itself — a compromised release becomes a spec-repository security advisory, not a separate one. On the distribution mechanism itself: `npx` pulls from a registry and can execute install-time scripts, which is the exact mechanism behind the 2025–2026 npm worm incidents `[S28-B]`; `cargo install` instead compiles from source via crates.io, a different and — in the sources reviewed for this memo — less frequently exploited trust model, though Rust's own build-script/proc-macro execution model is a structurally comparable code-execution-on-install surface that has not been eliminated, only less publicized to date. Neither channel is risk-free; both import a security posture the pure-files repo does not otherwise have. Even Spec Kit's own maintainers are discussing pulling the CLI *out* into a separate, reusable repository `[S3-A]` — i.e., trending toward Option 3's shape, not away from it.

**Why not chosen:** highest onboarding velocity of the three, but at direct cost to the one claim Kramak has chosen to make its identity. Option 3 recovers most of the velocity (one link away) without paying that cost.

## 5. Detailed Findings

### 5.1 Precedent survey: pure conventions and their tooling trajectories

| Standard | Origin | Official tooling? | How adoption actually happened |
|---|---|---|---|
| Twelve-Factor App | Heroku, c. 2011 `[S17-A]` | None, ever | Word-of-mouth plus framework authors (Rails, Django, Next.js) building the practices in |
| Semantic Versioning | Tom Preston-Werner, c. 2009–2011 `[S20-A]` | None (spec repo only) | Independent multi-language libraries (e.g. `node-semver`); no official reference implementation |
| Conventional Commits | Formalized c. 2017, dovetails explicitly with SemVer `[S24-A]` | None (spec repo only) | Eight-plus independent third-party tools across five-plus languages `[S23-A]` |
| EditorConfig | c. 2011–2012 `[S13-A]` | Yes — but structurally separate "cores," never called "the spec" itself | Editor vendors absorbed support natively over roughly a decade `[S16-C]` |
| AGENTS.md | OpenAI-led coalition, Aug 2025 `[S7-A]` | None, by explicit design `[S7-A]` | Every major AI coding vendor built a reader within months; Linux Foundation governance from Dec 2025 `[S11-B]` |

**Twelve-Factor App** has never had, and does not seek, any official tooling. When Heroku moved the methodology to open community governance, the announcement explicitly framed the effort as documentation work rather than software: contributors would use pull requests and issues, but "it's not software we're working on" `[S18-A]`. The only conformance tooling that exists (e.g., a small third-party command-line checker called `dodeka`) is unofficial, niche, and was built by the ecosystem without any involvement from the methodology's maintainers `[S19-C]` — illustrating that a pure spec can attract tooling from outside without ever needing to build or bless it itself.

**Semantic Versioning** is a single Markdown document (`semver.md`) published from a GitHub repository via an automated daily build `[S20-A]`. It has never shipped a validator, and its own text provides no mechanism to check that a release actually complies with its rules; practitioner commentary describes real-world SemVer compliance as depending on "developer discipline, common sense, and code reviews," a reliance that is explicitly flagged as "inconsistent and error-prone" at scale `[S21-B]`. The absence of *any* official reference implementation also has a documented downside: different ecosystems (npm, PyPI, Maven) built their own, sometimes incompatible interpretations of pre-release and build-metadata handling, producing what practitioners call "SemVer versioning flavours" that a general processing tool had to be built to reconcile `[S22-B]`. This is a genuine cautionary counterpoint to the zero-tooling model, revisited as a risk in Section 6.

**Conventional Commits** is the strongest existing precedent for "pure spec, healthy multi-language tooling ecosystem, no official CLI." The specification's own documentation page lists third-party tooling spanning JavaScript (commitlint, semantic-release, Commitizen, cz-git), Rust (git-cliff), .NET (the EasyBuild ecosystem), PHP (php-conventional-changelog), and Python (gitlint) `[S23-A]` — none of them maintained by the Conventional Commits project itself. The specification dovetails explicitly with SemVer by design `[S24-A]`, giving downstream tools a stable contract to build against without the spec ever needing to pick a language or ship a binary.

**EditorConfig** formalizes the "cores are not the spec" boundary more explicitly than any other precedent surveyed. Its specification defines "cores" (reference parsing libraries) and "plugins" (editor integrations) as distinct roles from "the specification" itself `[S14-A]`, and the project maintains — separately, with independent version numbers — cores in C, Python, .NET, Lua, and Java `[S13-A][S15-A]`. The trajectory this produced is the most favorable one available to a pure spec: editor vendors began absorbing support natively rather than requiring a plugin at all, with bundled support reported for recent releases of Vim and Emacs alongside long-standing native or extension-based support in JetBrains IDEs and VS Code `[S16-C]`. Most EditorConfig users today install nothing.

**AGENTS.md** is the newest and most directly comparable precedent, because it solves the same category of problem Kramak does — giving multiple independent tools a shared, portable convention to read — under genuinely similar competitive pressure (before AGENTS.md, every AI vendor had its own proprietary instruction file). It launched in August 2025 through a coalition including OpenAI, Google, Cursor, and Factory `[S28-B via S7-A cross-reference]`, reached roughly 20,000 adopting repositories within a month `[S10-B]`, and passed 60,000 by December 2025, at which point OpenAI donated stewardship to the Linux Foundation's newly formed Agentic AI Foundation for neutral, multi-vendor governance `[S11-B]`. Its own FAQ is unambiguous about the tooling posture: asked whether there are required fields, the answer is simply that it is standard Markdown with no schema at all `[S7-A]`. The cost of this design is real and documented: an empirical study of 466 real-world AGENTS.md files found no established content structure and substantial variation in practice `[S12-B]`, and the community is now drafting a proposal to make previously implicit conventions explicit, specifically because nothing had been enforcing them `[S9-A]`.

### 5.2 GitHub Spec Kit (CLI-centric) vs. AGENTS.md (zero-tooling): head to head

| Dimension | GitHub Spec Kit | AGENTS.md |
|---|---|---|
| Format | Python CLI (`specify-cli`) plus generated scaffolding | Plain Markdown, no schema |
| Prerequisites | Python 3.11+, `uv` or `pipx`, Git `[S1-A]` | None — any text editor |
| Adoption metric | 128.6k GitHub stars; 30–35 supported agent integrations `[S1-A][S4-A]` | 60,000+ repositories `[S11-B]` |
| Growth driver | Spec-side — the CLI itself scaffolds and distributes the workflow | Client-side — AI vendors independently built readers |
| Governance | GitHub, single-vendor open source | Linux Foundation / Agentic AI Foundation, multi-vendor `[S11-B]` |
| Tooling trajectory | Expanding into a platform (extensions, presets, bundles) `[S1-A]`; maintainers separately proposing to split the CLI out `[S3-A]` | Deliberately flat; a v1.1 proposal formalizes existing informal conventions rather than adding tooling `[S9-A]` |

Both figures indicate mainstream reach, and they are not directly comparable units (stars vs. adopting repositories), so raw scale does not cleanly favor one tooling philosophy over the other — what matters for Kramak is which precedent its *situation* resembles. Spec Kit's growth is genuinely CLI-driven: `specify init` is the mechanism by which a project acquires the entire Spec-Driven Development scaffold, and the CLI has since grown its own sub-platform of extensions, presets, and bundles on top of that entry point `[S1-A]` — evidence that once a bundled tool becomes the default path, more official surface tends to accrete around it rather than stay minimal. AGENTS.md's growth is not CLI-driven at all; it is the result of a dozen-plus independent vendors each deciding, on their own schedule, to read one more file.

Kramak's competitive position resembles AGENTS.md's more than Spec Kit's. Spec Kit created and now leads a category of CLI-first tools; competing with it on CLI polish is competing on its terms. Kramak is instead entering a field already saturated with CLI-first competitors — Spec Kit, OpenSpec, BMAD-METHOD, Kiro, and others `[S31-C]` — where "pure and portable, no install required" is a differentiator precisely *because* every other option already offers a CLI. AGENTS.md's zero-friction, spec-only path is the more relevant model for a project whose stated identity is being the non-CLI option in a CLI-saturated category, not a reason to imitate the CLI-first incumbents.

### 5.3 Onboarding friction: manual vs. one-command validation

The concern raised in scope — that manual validation creates more friction than one-command validation — is well evidenced and should not be dismissed. SemVer's own ecosystem shows what happens when a spec has no way to check itself: compliance "relies almost entirely on developer discipline," which is described in practitioner commentary as inconsistent at scale `[S21-B]`. AGENTS.md shows the same effect on a newer, more directly comparable format: a 466-repository study found no established content structure and substantial variation in how the file is used `[S12-B]`, and its community is now formalizing previously implicit rules for exactly that reason `[S9-A]`.

Kramak's situation is more favorable than either precedent on one specific point: its core artifacts are JSON Schema plus Markdown, not an arbitrary bespoke format. The JSON Schema half of the validation problem is already solved, for free, by an existing multi-language tooling ecosystem. `ajv` alone sees on the order of 270 million weekly npm downloads `[S26-B]`, and mature equivalents exist for Python, Java, and Rust, all indexed on JSON Schema's own official tools directory `[S27-A]` — none of it requiring a single line of Kramak-authored code. The genuinely Kramak-specific validation surface — whether a Markdown file contains the required sections, cross-references its schema correctly, or follows Kramak's own structural conventions — is real, but narrower than "validate my spec" implies, and is precisely the surface a companion tool should focus on (Section 5.5). Framed this way, one-command validation and repository purity are not actually in tension: the JSON half needs a documentation pointer to existing tools, not bundled code, and only the Markdown half needs any Kramak-specific tooling at all.

### 5.4 Do `init.sh`, `init.ps1`, and `validate.js` already violate pure-spec positioning?

In the sense that matters for brand credibility: yes, though not in the sense of technical necessity. Two different bars are being conflated by "zero mandatory runtime dependencies" — whether the scripts are *required* to use the spec (by the brief's own account, they are not), and whether their mere presence lets an outside observer falsify the purity claim on inspection. Today the repository fails the second, easier test: anyone running the same comparison this memo performs can point at the file listing and find `.sh`, `.ps1`, and `.js` files sitting alongside "pure Markdown and JSON Schemas." Whether they are optional is a documentation nuance competing against a much simpler, more visually confirmable counter-narrative.

This is not a hypothetical failure mode — it is the exact pattern already documented for GitHub Spec Kit's own CLI. Community coverage explicitly frames `specify-cli` as "entirely optional," noting the underlying templates can be copied by hand directly from the repository `[S5-B]`. In practice, however, the official quick-start begins with CLI installation as step one `[S1-A]`, and non-interactive or CI invocations default to assuming the CLI is present `[S1-A][S6-B]`. "Optional" survives in the documentation; it does not survive in the onboarding path most users actually take. Kramak's scripts are smaller and newer than Spec Kit's CLI, but the mechanism that turns "optional" into "the default path" — being the only tested, documented route to a working setup — does not depend on scale, and nothing about Kramak's scripts is exempt from it.

A second, independent cost is unrelated to branding. `init.sh` and `init.ps1` already require paired maintenance across two shell dialects, and `validate.js` adds a third language surface (Node/JavaScript) to a repository whose positioning implies language-agnosticism. Spec Kit's own internal documentation flags exactly this cost for its own three-way script split, noting that the shell variants require paired maintenance and diverge on JSON handling, with consolidation onto a single runtime a stated but not-yet-completed goal `[S2-A]`. Kramak is carrying a comparable maintenance tax today, independent of what D-009 decides.

**Conclusion:** D-009 is not a decision about whether to introduce this tension — it already exists and is currently visible in the repository. That argues for treating the decision as time-sensitive rather than purely exploratory.

### 5.5 Functional boundary definition: what an optional Kramak tool should and shouldn't do

An optional tool survives contact with a "zero mandatory dependency" claim only if every check it performs is also fully describable — and independently performable by hand — in the plain-text spec itself. That is the operational test applied below, drawn from EditorConfig's precedent of documenting property semantics independently of any core or plugin `[S14-A]`, and from Conventional Commits keeping its normative text free of any reference to a specific tool `[S24-A]`.

**An optional Kramak tool should:**
- Validate the structure and syntax of files that already exist — JSON Schema conformance, required Markdown sections present, cross-references resolved — and stop there.
- Produce a pass/fail result with a human-readable diagnostic, in the manner of a linter, not a build system.
- Run fully offline after installation, with no telemetry and no network calls as part of ordinary validation.
- Declare the spec version it validates against and refuse, loudly, to silently validate a mismatched version (Section 6, Risk 5).
- Leave the files it checks unmodified unless the user passes an explicit, opt-in flag.
- Ship with the smallest practical dependency footprint — a single binary or a dependency-free script — echoing both EditorConfig's "cores" design and the maintenance lesson Spec Kit has already learned from its own split-language scripts `[S2-A]`.

**An optional Kramak tool should not:**
- Generate or scaffold spec content as its primary function. The moment a tool authors content rather than checking it, it stops being an optional validator and becomes the workflow runtime — the exact property that makes Spec Kit's CLI load-bearing rather than optional.
- Be referenced in the spec's own normative language. Normative text should describe file shape ("a Kramak spec file MUST contain X"), never tool invocation — the latter would make the zero-dependency claim false on its own terms.
- Collect telemetry by default, or require an account, registry login, or network access to perform basic validation.
- Be the sole documentation of any rule it enforces. Every check the tool performs must also exist in the plain-text spec, so a team that installs nothing can still self-check by hand — this is the actual, falsifiable test for "genuinely optional," not a claim in a README.
- Live inside the core spec repository (Section 3).

## 6. Open Questions & Risks

1. **Discovery friction may suppress companion-repo adoption more than modeled.** Unlike EditorConfig (a decade to be absorbed natively into editors) or Spec Kit (GitHub's own distribution reach), Kramak is an earlier-stage, lower-awareness project; a second repository may simply be missed. *Reversal trigger:* if, after two full release cycles post-split, companion-repo traffic stays below roughly 10% of core-repo traffic, or support channels show repeated confusion about where the tooling lives, escalate to more prominent in-README quick-start commands pointing at the companion repo.
2. **The community may fragment into incompatible unofficial validators**, echoing SemVer's cross-ecosystem dialect drift `[S22-B]`. *Reversal trigger:* if two or more incompatible community validators emerge and produce conflicting pass/fail results on the same spec file within twelve months, publish an official conformance test suite (behavioral reference, not a bundled binary) — mirroring EditorConfig's cores-as-shared-reference-behavior model.
3. **`npx kramak` may become the de facto onboarding command via third-party tutorials regardless of official positioning**, as already happened informally with Spec Kit's nominally optional CLI `[S5-B]`. *Reversal trigger:* if a majority of third-party tutorials or blog posts present a CLI as step one within six to twelve months of the companion repo's release, treat this as market feedback that the audience wants a CLI-first identity, and revisit whether "pure methodology" remains the intended differentiator.
4. **Migrating `init.sh` / `init.ps1` / `validate.js` may break existing users' paths, bookmarks, or CI pipelines.** *Reversal trigger:* if migration-related issues exceed an agreed threshold in the sixty days after the split, ship a deprecation shim (old paths print a redirect notice rather than failing silently) instead of a hard cut.
5. **Versioning drift between the spec and the companion CLI could produce silent false-positives or false-negatives** if a CLI release quietly stops matching the current spec version. *Reversal trigger:* the first user-reported case of a compatibility mismatch causing an incorrect pass/fail result should mandate a machine-readable compatibility matrix before the next minor release, not after.
6. **Competitive pressure from a CLI-saturated SDD landscape** could make "go find our second repository" read as friction rather than principle, since peers (Spec Kit, OpenSpec, BMAD, Kiro) all default to one-command onboarding `[S31-C]`. *Reversal trigger:* if comparative adoption velocity versus CLI-bundling peers diverges sharply (roughly an order of magnitude slower) over two to three quarters, with tooling named as a blocker in user feedback, revisit a narrowly scoped, read-only validator (no scaffolding or generation features) as a middle path — not a return to Option 2's full bundling.
7. **Supply-chain exposure is deferred, not eliminated.** Even in a separate repository, a compromised `kramak-cli` release will likely be reported publicly as "Kramak has a vulnerability," regardless of repository boundaries `[S28-B][S29-B]`. This does not reverse D-009, but it should trigger a parallel decision — out of scope here — on `kramak-cli`'s own publishing hygiene (release provenance, maintainer 2FA, minimal or absent install-time scripts) before its first release.

## 7. Sources & Evidence Ledger

No separately circulated Universal Evidence Standard was available for this memo, so the following four-tier rubric is applied and disclosed here:

- **A — Primary/Official.** The specification, repository, or documentation maintained by the project itself; live platform data (e.g., star/fork counts) pulled directly from the source on the memo's temporal anchor date.
- **B — Corroborated Secondary.** Reputable technical journalism, named-author practitioner writing, industry security research, or preprint empirical studies; independently checkable and consistent with other sources found.
- **C — Illustrative/Single-Source.** Marketing blogs, AI-synthesized reference sites, small or niche projects, or competitive-landscape surveys used only to illustrate a pattern, never as the sole basis for a load-bearing claim.
- **Given** — Facts about Kramak itself, taken as stated in the requesting brief. No public, independently indexed "Kramak" specification project was found during research conducted on 2026-08-19, so these are stipulated inputs, not verified findings.

| # | Source | Supports | Grade |
|---|---|---|---|
| S1 | [github.com/github/spec-kit](https://github.com/github/spec-kit) — official README, live repo data | Star/fork counts, prerequisites, "30+" integrations, extensions/presets/bundles system | A |
| S2 | [spec-kit `AGENTS.md`](https://github.com/github/spec-kit/blob/main/AGENTS.md) | Cost of maintaining paired `.sh`/`.ps1` scripts; stated-but-incomplete consolidation goal | A |
| S3 | [spec-kit Issue #796](https://github.com/github/spec-kit/issues/796) | Open maintainer proposal to extract `specify-cli` into a separate, reusable repo | A |
| S4 | [Spec Kit Documentation site](https://github.github.com/spec-kit/) | "35 integrations" figure (later snapshot than README's "30+"), core philosophy | A |
| S5 | [Den Delimarsky, "What's The Deal With GitHub Spec Kit"](https://den.dev/blog/github-spec-kit/) | CLI framed as "entirely optional"; templates copyable by hand | B |
| S6 | [MarkTechPost, Spec-Kit overview](https://www.marktechpost.com/2026/05/08/meet-github-spec-kit-an-open-source-toolkit-for-spec-driven-development-with-ai-coding-agents/) | Integration count context (29 named + Generic) at an earlier 2026 snapshot | B |
| S7 | [agents.md](https://agents.md/) — official site | "60k+ projects," no-schema-by-design FAQ, coalition origin, Linux Foundation stewardship | A |
| S8 | [github.com/agentsmd/agents.md](https://github.com/agentsmd/agents.md) | Official sample file and design principles | A |
| S9 | [agentsmd/agents.md Issue #135](https://github.com/agentsmd/agents.md/issues/135) | v1.1 proposal to formalize previously implicit conventions | A |
| S10 | [InfoQ, "AGENTS.md Emerges as Open Standard"](https://www.infoq.com/news/2025/08/agents-md/) | ~20,000-repo adoption figure at one month post-launch | B |
| S11 | [CDO Magazine, "Agentic AI Foundation Launched"](https://www.cdomagazine.tech/aiml/agentic-ai-foundation-launched-to-advance-open-standards) | 60,000+ figure, Dec-2025 Linux Foundation/AAIF donation | B |
| S12 | [arXiv 2510.21413, "Context Engineering for AI Agents in OSS"](https://arxiv.org/pdf/2510.21413) | 466-repo empirical study; no established AGENTS.md content structure | B (preprint) |
| S13 | [editorconfig.org](https://editorconfig.org/) | Cores-vs-plugins model; native support bundled in some editors | A |
| S14 | [spec.editorconfig.org](https://spec.editorconfig.org/index.html) | Formal definition separating "specification," "cores," and "plugins" | A |
| S15 | [editorconfig-core-c](https://github.com/editorconfig/editorconfig-core-c) / [NuGet `editorconfig`](https://www.nuget.org/packages/editorconfig) | Multiple officially maintained, independently versioned language cores | A |
| S16 | [Grokipedia, "EditorConfig"](https://grokipedia.com/page/editorconfig) | Vim 9.0 / Emacs 30 native-support dates | C (single, AI-synthesized source — used only for these two illustrative dates) |
| S17 | [12factor.net](https://12factor.net/) | Methodology text; explicitly language- and stack-agnostic | A |
| S18 | [12factor.net/blog/open-source-announcement](https://12factor.net/blog/open-source-announcement) | 2024 move to open governance; "not software we're working on" framing | A |
| S19 | [PyPI, `dodeka`](https://pypi.org/project/dodeka/) | Unofficial, third-party Twelve-Factor conformance CLI (illustrative only) | C |
| S20 | [github.com/semver/semver](https://github.com/semver/semver) (`semver.md`) | Spec text; automated daily publish; no enforcement tooling | A |
| S21 | [JAVAPRO International, "Semantic Versioning done automatically"](https://javapro.io/2026/03/26/semantic-versioning-done-automatically/) | "No mechanism to enforce" SemVer; reliance on developer discipline | B |
| S22 | [GitLab Engineering blog, SemVer processing](https://about.gitlab.com/blog/generic-semantic-version-processing/) | Cross-ecosystem SemVer dialect fragmentation (npm/pip/Maven) | B |
| S23 | [conventionalcommits.org/en/about](https://www.conventionalcommits.org/en/about/) | Official list of third-party, multi-language tooling | A |
| S24 | [conventionalcommits.org v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) | Spec text; explicit SemVer dovetail | A |
| S25 | [ajv.js.org](https://ajv.js.org/) / [github.com/ajv-validator/ajv](https://github.com/ajv-validator/ajv) | JSON Schema JS tooling maturity and adoption | A |
| S26 | [form.io, "JSON Schema Validator Tools for Production Apps"](https://form.io/json-schema-validator-tools-production-apps/) | ~270M weekly Ajv downloads (via Snyk); Python/Java equivalents | B |
| S27 | [json-schema.org/tools](https://json-schema.org/tools) | Official, multi-language validator directory | A |
| S28 | npm supply-chain security cluster: [Snyk](https://snyk.io/articles/npm-security-best-practices-shai-hulud-attack/), [Endor Labs](https://www.endorlabs.com/learn/how-to-defend-against-npm-software-supply-chain-attacks), [Splunk](https://www.splunk.com/en_us/blog/security/npm-supply-chain-attack-detection-analysis.html) | 2025–2026 Shai-Hulud worm and related npm postinstall-script compromises | B |
| S29 | [TechTimes, "npm v12 Ships This Month"](https://www.techtimes.com/articles/319890/20260708/npm-v12-ships-this-month-blocking-install-scripts-that-enabled-year-supply-chain-attacks.htm) | npm v12 (July 2026) blocks install scripts/remote sources by default | B |
| S30 | [Shiplight.ai blog](https://www.shiplight.ai/blog/spec-driven-development-with-spec-kit) | "120,000+ stars" figure for Spec Kit — directionally corroborated by, and superseded by, the direct S1 fetch (128.6k) | C |
| S31 | [cameronsjo/spec-compare](https://github.com/cameronsjo/spec-compare) | Competitive SDD landscape (Spec Kit, OpenSpec, BMAD, Kiro, and others) for positioning context | C |
| K1 | Kramak repository and positioning language | Baseline facts about Kramak's current state (`init.sh`/`init.ps1`/`validate.js`, "pure Markdown and JSON Schemas" claim) | Given |
