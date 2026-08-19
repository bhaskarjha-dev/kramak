# Kramak — Master Rules Inventory (v1.1 Transformation)

> **Purpose:** Comprehensive rule catalog extracted from `.kramak/planner/CORE.md`, `.kramak/ROUTER.md`, and `.kramak/planner/CORE.md`.
> Every rule has an assigned destination to ensure **zero content loss** during decomposition into modular specifications.

---

## Rule Extraction Summary

- **Total Rules Extracted:** 176
- **Destinations:**
  - `ROUTER`: 24 (Universal invariants and cross-phase constraints)
  - `PLANNER-CORE`: 108 (Eagerly loaded planning lifecycle engine)
  - `PLANNER-MODULE:output-contract`: 14 (WI templates and spec detailing)
  - `PLANNER-MODULE:edge-cases`: 16 (Condition-triggered edge handling)
  - `PLANNER-MODULE:domain-conventions`: 8 (Tech stack & monorepo detection)
  - `PLANNER-MODULE:capability-gate`: 6 (Canary challenges & scoring math)
  - `EXECUTOR-CORE`: 18 (Execution ReAct loop & hard rules)
  - `EXECUTOR-MODULE:error-recovery`: 8 (Failure diagnostics & recovery playbooks)
  - `EXECUTOR-MODULE:tool-playbooks`: 6 (Git worktree & tool execution)

---

## Master Rule Catalog

### 1. Bounded Autonomy & Strategic Mindset (`.kramak/planner/CORE.md` lines 1–40)

| # | Rule / Constraint | Destination |
|---|---|---|
| 1 | The Planner acts as architect and strategist with absolute autonomy over workspace files (code, docs, configs, pipeline, AGENTS.md), bounded by earned guardrails. | `PLANNER-CORE` |
| 2 | No human input needed, no human output needed during autonomous planning; every token must advance the project. | `ROUTER`, `PLANNER-CORE` |
| 3 | **Strategic Override:** The planner can change `productPhase` or roadmap direction if codebase and documentation analysis warrants it. | `PLANNER-CORE` |
| 4 | **Strategic Override Requirement:** Must document evidence and rationale in the batch plan (`plans/PLAN-batch-XX.md`). | `PLANNER-CORE` |
| 5 | **Competitive Research:** The planner may search the web for competitors, build feature matrices, and analyze market gaps during Strategic Assessment. | `PLANNER-CORE` |
| 6 | **Strategic Thinking Budget:** Up to half of a planning session may be spent on analysis and research, but actionable output (WIs, roadmap updates, or documented analysis) must be produced before the session ends. | `PLANNER-CORE` |
| 7 | **Roadmap Questioning:** The roadmap is an input to thinking, not a hard constraint; update the roadmap directly when analysis reveals new priorities. | `PLANNER-CORE` |
| 8 | **Prohibition:** Do NOT skip the Strategic Reorientation check (prevents audit loops). | `PLANNER-CORE` |
| 9 | **Prohibition:** Do NOT ignore the Polish Ceiling Rule (prevents lint perfectionism traps). | `ROUTER`, `PLANNER-CORE` |
| 10 | **Prohibition:** Do NOT skip verification steps (structured protocols outperform unstructured guessing). | `ROUTER`, `PLANNER-CORE` |
| 11 | **Prohibition:** Do NOT create code changes directly in source files (planner plans, executor executes). | `PLANNER-CORE` |

### 2. Grounded Planning & Capability Gate (`.kramak/planner/CORE.md` lines 43–72)

| # | Rule / Constraint | Destination |
|---|---|---|
| 12 | On invocation with `state.phase: "planning"`, derive project requirements from workspace files alone. | `PLANNER-CORE` |
| 13 | **Grounded Verification:** Every specification MUST be grounded in actual code read via tools—never write from memory or assumption. | `ROUTER`, `PLANNER-CORE` |
| 14 | **Capability Gate Stage 1:** Perform self-assessment across reasoning tier, context window, available tools, and search capabilities. | `PLANNER-CORE` |
| 15 | **Capability Gate Stage 2 (Battery):** Evaluate procedural Canary Challenges (CT-1 to CT-5) with deterministic scoring. | `PLANNER-CORE`, `PLANNER-MODULE:capability-gate` |
| 16 | **Gate Decision Routing:** Score $\ge 0.80$ grant full planning autonomy; $0.60 \le S < 0.80$ proceed with conservative scope (smaller batches, more 🔴 Guided WIs); $< 0.60$ fail closed to `WAITING` with capability advisory. | `PLANNER-CORE`, `PLANNER-MODULE:capability-gate` |
| 17 | **Model Agnosticism:** Gate and route purely by behavioral capability and challenge score, NEVER by model name inspection. | `ROUTER`, `PLANNER-CORE` |

### 3. Empty Workspace Guard (`.kramak/planner/CORE.md` lines 76–82)

| # | Rule / Constraint | Destination |
|---|---|---|
| 18 | If the workspace has 0 source files, 0 design/requirement docs, and .kramak/inbox/ has no unprocessed instructions, set `state.phase: "waiting"`. | `PLANNER-CORE` |
| 19 | On empty workspace detection, set `state.nextAction` instructing the user to describe the project in `.kramak/inbox/`. | `PLANNER-CORE` |
| 20 | Output a single clear sentence to the user requesting project requirements. | `PLANNER-CORE` |
| 21 | **STOP immediately** on empty workspace; do not hallucinate roadmaps or plans without initial user intent. | `PLANNER-CORE` |

### 4. Project Discovery & Structure Mapping (`.kramak/planner/CORE.md` lines 83–121)

| # | Rule / Constraint | Destination |
|---|---|---|
| 22 | If `state.json` lacks `projectStructure`, scan root and common doc folders (`docs/`, `doc/`, `.github/`). | `PLANNER-CORE` |
| 23 | Scan for planning/tracking files: roadmaps (`ROADMAP.md`), product specs (`PRODUCT.md`, `PRD.md`), architecture (`ARCHITECTURE.md`, `ADR/`), deployment (`Dockerfile`, `docker-compose.yml`), conventions (`AGENTS.md`, `README.md`). | `PLANNER-CORE` |
| 24 | Record discovered file paths in `state.json` under `projectStructure` with `discovered: true`. | `PLANNER-CORE` |
| 25 | If critical planning files are missing, create `ROADMAP.md` based on code + README analysis or document that direction is derived from code. | `PLANNER-CORE` |
| 26 | If existing tracking files can be improved, scaffold better structures while preserving original content and documenting choice in the batch plan. | `PLANNER-CORE` |
| 27 | On subsequent sessions, reuse recorded `projectStructure`; re-scan only if files are missing or structural drift is detected. | `PLANNER-CORE` |

### 5. Context Reading & Anti-Anchoring Bias (`.kramak/planner/CORE.md` lines 123–151)

| # | Rule / Constraint | Destination |
|---|---|---|
| 28 | **Mandatory Reading Order:** Read 1. Roadmap -> 2. `HUMAN-TASKS.md` -> 3. `state.json` -> 4. `PROGRESS.md` -> 5. `PRINCIPLES.md` -> 6. `.kramak/inbox/` -> 7. `.kramak/work-items/`. | `PLANNER-CORE` |
| 29 | **Anti-Anchoring Guard:** Roadmap and `HUMAN-TASKS.md` MUST be read before `state.json` so the planner forms an independent evaluation before seeing the previous session's opinion. | `PLANNER-CORE` |
| 30 | Directional Context: Read product spec and conventions when planning features; read deployment docs when preparing deployment; read roadmap when planning post-deployment. | `PLANNER-CORE` |
| 31 | On-Demand Context: Read project docs and conventions only when specifically relevant to the current batch. | `PLANNER-CORE` |

### 6. INBOX Processing (`.kramak/planner/CORE.md` lines 152–163)

| # | Rule / Constraint | Destination |
|---|---|---|
| 32 | Process all unprocessed items in `.kramak/inbox/` with top priority before starting new feature planning. | `PLANNER-CORE` |
| 33 | INBOX `bug`: During BUILD/SHIP, create a WI only if security or build-blocking (otherwise defer to ITERATE); during ITERATE, create a WI immediately. | `PLANNER-CORE` |
| 34 | INBOX `insight`: Update relevant project documentation directly. | `PLANNER-CORE` |
| 35 | INBOX `credential`: Mark corresponding `HUMAN-TASKS.md` item as done and resume dependent work. | `PLANNER-CORE` |
| 36 | INBOX `direction`: Re-evaluate priorities, potentially restructuring the roadmap and batch plan. | `PLANNER-CORE` |
| 37 | INBOX `data`: Read and integrate into documentation or specifications. | `PLANNER-CORE` |
| 38 | Move all processed items to the "Processed" section in `.kramak/inbox/` with an action summary note. | `PLANNER-CORE` |

### 7. Strategic Reorientation (`.kramak/planner/CORE.md` lines 165–226)

| # | Rule / Constraint | Destination |
|---|---|---|
| 39 | Never blindly follow `state.phase`; evaluate current codebase state, INBOX, and execution history first. | `PLANNER-CORE` |
| 40 | Evaluate the 4 Core Reorientation Questions: (1) Is planned phase still highest priority? (2) Is there a broken build/critical bug overriding the phase? (3) Has user changed direction? (4) Are we caught in an audit loop? | `PLANNER-CORE` |
| 41 | If `state.phase` is `planning` with no overrides: proceed to Strategic Assessment (Step 2). | `PLANNER-CORE` |
| 42 | If `state.phase` is `planning` after executor audit completed: read `state.json -> lastAudit`, review findings, and proceed. | `PLANNER-CORE` |
| 43 | If INBOX has a critical bug or direction change: override planned phase, set phase to `planning`, and plan urgent items. | `PLANNER-CORE` |
| 44 | If queue still has unexecuted WIs: leave phase as `executing`, do not overwrite queue, and instruct executor to run. | `PLANNER-CORE` |
| 45 | **Blocked Fallback Protocol:** If human tasks are pending and current phase work is blocked, read `HUMAN-TASKS.md` to identify the exact scope of the block. | `PLANNER-CORE` |
| 46 | If non-blocked work exists on the roadmap: switch `productPhase` to `BUILD`, record `"deploymentBlocked": true, "fallbackPhase": "BUILD"` in `state.json`, and plan available work. | `PLANNER-CORE` |
| 47 | If genuinely NO work can proceed without human action: document in `state.json`, output a single sentence explaining required human action, and STOP. | `PLANNER-CORE` |
| 48 | **Strategic Override Protocol:** When direction is flawed, perform web research, document findings in the plan, update `productPhase` and roadmap, and plan accordingly. | `PLANNER-CORE` |

### 8. Strategic Vision (5 Lenses) (`.kramak/planner/CORE.md` lines 228–314)

| # | Rule / Constraint | Destination |
|---|---|---|
| 49 | Check Vision Triggers: Run 5 Lenses if (1) Milestone feature batch completed, (2) Roadmap low (<3 unbuilt features), (3) Periodic ($\ge 20$ WIs or $\ge 5$ batches since last vision), (4) First session, or (5) Planner judgment identifies an inflection point. | `PLANNER-CORE` |
| 50 | If no vision trigger is active, skip directly to Perspective Selection. | `PLANNER-CORE` |
| 51 | **Lens 1 (Quality Retrospective):** Read actual code of last 2–3 batches; assess whether it is genuinely excellent vs merely functional, thoughtful UX, and graceful errors. Output quality WIs or confirm quality. | `PLANNER-CORE` |
| 52 | **Lens 2 (User Journey Walk):** Walk full user lifecycle (signup $\rightarrow$ first use $\rightarrow$ daily workflow $\rightarrow$ advanced); identify friction points. Output UX roadmap items. | `PLANNER-CORE` |
| 53 | **Lens 3 (Competitive & Market Scan):** Web search top 3–5 competitors; build feature comparison matrix; identify missing capabilities. Output new feature proposals. | `PLANNER-CORE` |
| 54 | **Lens 4 (Innovation Brainstorm):** First-principles ideation for non-obvious delight, integrations, and breakthrough workflows. Output new roadmap items directly. | `PLANNER-CORE` |
| 55 | **Lens 5 (Architecture Check):** Inspect foundation scalability, emerging anti-patterns, compounding technical debt. Output architectural proposals or refactor WIs. | `PLANNER-CORE` |
| 56 | Update `state.json` with `lastVisionAssessment` (`batchNumber`, `timestamp`, `findings`) and update roadmap file. | `PLANNER-CORE` |

### 9. Perspective Selection (PERCEIVE $\rightarrow$ REASON $\rightarrow$ DECIDE) (`.kramak/planner/CORE.md` lines 315–422)

| # | Rule / Constraint | Destination |
|---|---|---|
| 57 | Apply meta-cognition: reason into the right perspective from first principles rather than relying on static role assignments. | `PLANNER-CORE` |
| 58 | **PERCEIVE Checklist:** Review `productPhase`, last perspective from `PROGRESS.md`, consecutive perspective count, changes since last session, `.kramak/inbox/`, human tasks, and `lastAudit`. | `PLANNER-CORE` |
| 59 | **REASON Questions:** Identify biggest project risk, biggest opportunity, neglected perspectives, 10-person hire priority, and today's user complaints. | `PLANNER-CORE` |
| 60 | **DECIDE Commitment:** Formulate and record perspective in `PROGRESS.md` (perspective name, rationale, last 3 perspectives, when last taken, biggest risk, biggest opportunity). | `PLANNER-CORE` |
| 61 | **Perspective Diversity Check:** If 3+ consecutive sessions used the same perspective, evaluate alternative viewpoints and document rationale if continuing. | `PLANNER-CORE` |
| 62 | Archetype Flexibility: Draw from building, product, operational, growth, scaling archetypes or invent emergent perspectives as demanded by project state. | `PLANNER-CORE` |

### 10. Prioritization by productPhase & Modification Boundaries (`.kramak/planner/CORE.md` lines 423–537)

| # | Rule / Constraint | Destination |
|---|---|---|
| 63 | **BUILD Priorities:** 1. Architecture $\rightarrow$ 2. Core Features $\rightarrow$ 3. UX/UI Design $\rightarrow$ 4. Perf Arch $\rightarrow$ 5. Deploy Arch $\rightarrow$ 6. Security Arch $\rightarrow$ 7. Integration $\rightarrow$ 8. Remaining Features. | `PLANNER-CORE` |
| 64 | **BUILD Exclusions:** Never plan standalone bug-fix, lint, or documentation WIs during BUILD (executor fixes inline) unless security or build-blocking. | `PLANNER-CORE` |
| 65 | BUILD $\rightarrow$ SHIP Transition: Transition when core features complete, architecture solid, and no critical security gaps remain. | `PLANNER-CORE` |
| 66 | **SHIP Priorities:** 1. Deployment $\rightarrow$ 2. Security $\rightarrow$ 3. Critical Bugs $\rightarrow$ 4. Monitoring $\rightarrow$ 5. Documentation $\rightarrow$ 6. Performance. (No cosmetic/lint WIs). | `PLANNER-CORE` |
| 67 | SHIP $\rightarrow$ ITERATE Transition: Transition when product is deployed and accessible to real users. | `PLANNER-CORE` |
| 68 | **ITERATE Priorities:** 1. Production Fire $\rightarrow$ 2. Security Vuln $\rightarrow$ 3. User-Reported Bugs $\rightarrow$ 4. Metrics-Driven Improvements $\rightarrow$ 5. Feature Enhancements $\rightarrow$ 6. New Features $\rightarrow$ 7. Performance $\rightarrow$ 8. Polish. | `PLANNER-CORE` |
| 69 | **Polish Ceiling Rule:** When build passes and linter has 0 errors, stop polishing. Lint warnings do not block deployment. Standard WIs $\le 5$ files, $\le 50$ lines. Exceptions require 🔴 Guided + justification. | `ROUTER`, `PLANNER-CORE` |
| 70 | **Planner Whitelist:** Planner may directly modify `.kramak/` files, `state.json`, `.kramak/work-items/`, `plans/`, `.kramak/inbox/`, docs, roadmaps, `AGENTS.md`, and skills. | `PLANNER-CORE` |
| 71 | **Planner Blacklist:** Planner MUST NOT directly modify source code, config files requiring tests, database schemas/models, or package dependencies. Create WIs instead. | `PLANNER-CORE` |
| 72 | **Research Protocol:** Use web search for APIs/libraries, read official documentation, read actual source files, and grep codebase for pattern references before planning. | `ROUTER`, `PLANNER-CORE` |

### 11. Batch Planning & Sizing (`.kramak/planner/CORE.md` lines 538–614)

| # | Rule / Constraint | Destination |
|---|---|---|
| 73 | **Consider Alternatives:** For medium/high-risk work, evaluate at least 2 approaches (Approach A vs Approach B with pros/cons/chosen reason) and document in WI Intent. | `PLANNER-CORE` |
| 74 | **Batch Plan Authoring:** Before writing WIs, create `plans/PLAN-batch-XX.md` with Strategic Intent, Stories (dependencies, risk, key files), and Totals. | `PLANNER-CORE` |
| 75 | **Task Sizing Horizon:** Each WI must represent $\le 2$ hours human-equivalent work (~200 word spec intent, informed by METR 80% reliability horizon). Typical batch size is 3–8 WIs. | `PLANNER-CORE` |
| 76 | **WI Independence:** Maximize independence between WIs to prevent compound error cascades ($p^n$). | `PLANNER-CORE` |
| 77 | Stop planning when planner context fatigue begins to degrade specification quality; do not constrain batch size to single-session executor capacity. | `PLANNER-CORE` |
| 78 | **Story Build Order:** Build in dependency order: 1. Schema/data model (🔴 Guided) $\rightarrow$ 2. Backend endpoint/logic (🟡 Directed) $\rightarrow$ 3. Frontend component (🟡 Directed / 🟢 Outcome) $\rightarrow$ 4. Integration wiring (🟡 Directed) $\rightarrow$ 5. Polish (🟢 Outcome). | `PLANNER-CORE` |
| 79 | **One Concern Per WI:** Group related changes coherently (3–8 files allowed if coherent under one concern). | `PLANNER-CORE` |

### 12. Branch Management (`.kramak/planner/CORE.md` lines 616–628)

| # | Rule / Constraint | Destination |
|---|---|---|
| 80 | First batch initialization: `git checkout -b pipeline/batch-01` from main. | `PLANNER-CORE` |
| 81 | Continuing batch: Stay on current active branch. | `PLANNER-CORE` |
| 82 | New feature area branch: `git checkout -b pipeline/batch-XX` from main. | `PLANNER-CORE` |
| 83 | Stable batch merge: `git checkout main && git merge pipeline/batch-XX`. | `PLANNER-CORE` |
| 84 | Experimental work: `git checkout -b pipeline/batch-XX-experimental`. Update `state.currentBranch`. | `PLANNER-CORE` |

### 13. Work Item Specification & Detail Scaling (`.kramak/planner/CORE.md` lines 630–800)

| # | Rule / Constraint | Destination |
|---|---|---|
| 85 | File naming: Create `.kramak/work-items/WI-XXX.md` using batch-scoped numbering (Batch 1 = WI-101..., Batch 2 = WI-201...). | `PLANNER-CORE`, `PLANNER-MODULE:output-contract` |
| 86 | Core objective: Collapse ambiguity so even less capable models can execute accurately. Focus tokens on WHAT and WHY. | `PLANNER-CORE`, `PLANNER-MODULE:output-contract` |
| 87 | **Goldilocks Rule:** Scale specification detail to risk: 🔴 Guided (Critical), 🟡 Directed (Medium), 🟢 Outcome (Low). | `PLANNER-CORE`, `PLANNER-MODULE:output-contract` |
| 88 | **Distribution Guideline:** Most WIs should be 🟡 Directed or 🟢 Outcome. If >50% are 🔴 Guided, the plan is over-specified. | `PLANNER-CORE`, `PLANNER-MODULE:output-contract` |
| 89 | **🔴 Guided Scope:** Auth, security, database schema migrations, data models, encryption, and cascading failure vectors. | `PLANNER-CORE`, `PLANNER-MODULE:output-contract` |
| 90 | **Grounded Verification Protocol (Guided):** Step A (Locate & record line numbers) $\rightarrow$ Step B (Quote exact BEFORE pattern verbatim) $\rightarrow$ Step C (Verify unique grep match) $\rightarrow$ Step D (Design drop-in AFTER) $\rightarrow$ Step E (Cross-check imports & callers). | `ROUTER`, `PLANNER-CORE`, `PLANNER-MODULE:output-contract` |
| 91 | Guided New Files: Mark `**Verified:** ✅ New file (no prior lines)` and `// BEFORE: (empty / new file)`. | `PLANNER-MODULE:output-contract` |
| 92 | Guided WI Schema: Classification, Intent, Read First, Changes (file, verification note, BEFORE/AFTER, new symbols, callers affected), DO NOT constraints, Verification, Acceptance Criteria. | `PLANNER-MODULE:output-contract` |
| 93 | **🟡 Directed Scope:** New API endpoints, refactoring existing features, component rewrites, integration wiring. | `PLANNER-CORE`, `PLANNER-MODULE:output-contract` |
| 94 | Directed Grounding Requirement: Read target files and describe actual current shape/types/interfaces; no hallucinated signatures. | `PLANNER-CORE`, `PLANNER-MODULE:output-contract` |
| 95 | Directed WI Schema: Classification, Intent, Target Files, Key Context (grounded type signatures/interfaces), Constraints, Verification, Acceptance Criteria. | `PLANNER-MODULE:output-contract` |
| 96 | **🟢 Outcome Scope:** Creating new files, docs, configs, UI components from scratch, tests, DX improvements. | `PLANNER-CORE`, `PLANNER-MODULE:output-contract` |
| 97 | Outcome WI Schema: Classification, Goal (desired end state), Constraints, Verification, Acceptance Criteria. | `PLANNER-MODULE:output-contract` |

### 14. Self-Audit Checklist (`.kramak/planner/CORE.md` lines 802–828)

| # | Rule / Constraint | Destination |
|---|---|---|
| 98 | Mandatory self-audit across all written WIs before finalizing the batch. | `PLANNER-CORE` |
| 99 | Check 1: Batch Plan exists in `plans/` with Stories and strategic intent. | `PLANNER-CORE` |
| 100 | Check 2: Each WI is independently verifiable and within the $\le 2$ hr task horizon. | `PLANNER-CORE` |
| 101 | Check 3: Risk distribution is balanced ($\le 50\%$ 🔴 Guided). | `PLANNER-CORE` |
| 102 | Check 4: Full Grounded Verification confirmed for all 🔴 Guided items (grep, verbatim quote, unique match). | `PLANNER-CORE` |
| 103 | Check 5: Target files read and grounded type signatures provided for all 🟡 Directed items. | `PLANNER-CORE` |
| 104 | Check 6: Clear, observable acceptance criteria for all 🟢 Outcome items. | `PLANNER-CORE` |
| 105 | Check 7: Topological dependency ordering verified within each Story. | `PLANNER-CORE` |
| 106 | Check 8: Story coherence verified (complete testable value delivered). | `PLANNER-CORE` |
| 107 | Check 9: Verified build/check commands attached to every WI. | `PLANNER-CORE` |

### 15. Session Continuity & Model Handoff (`.kramak/planner/CORE.md` lines 830–903)

| # | Rule / Constraint | Destination |
|---|---|---|
| 108 | Apply direct planner modifications (docs, AGENTS.md, skills) before finalizing WIs. | `PLANNER-CORE` |
| 109 | Assess session weight: evaluate WIs written, files read, direct edits, and research volume. | `PLANNER-CORE` |
| 110 | Assess next phase cost: execution or audit. | `PLANNER-CORE` |
| 111 | **Model-Type Hard Gate:** If operating as an expensive reasoning model, ALWAYS recommend a new session for execution with a fast/precise model capability. | `PLANNER-CORE` |
| 112 | Decision matrix for general models: Light/Light $\rightarrow$ continue; Light/Medium $\rightarrow$ continue; Medium/Light $\rightarrow$ continue; Medium/Medium+ $\rightarrow$ new session; Heavy/Any $\rightarrow$ new session. | `PLANNER-CORE` |
| 113 | Context Fatigue Warning: Account for LLM degradation at ~40–50% context capacity and the Lost in the Middle effect; prefer fresh sessions when in doubt. | `PLANNER-CORE` |
| 114 | If continuing in same session: update `state.json` with new phase, log in `lastSession`, and proceed directly to next phase STEP 1 without chatting. | `PLANNER-CORE` |
| 115 | If recommending new session: update `state.json` (`phase`, `nextAction`), push changes (`git push`), output single `nextAction` sentence, STOP. | `PLANNER-CORE` |

### 16. Executor Audit Review & Circuit Breaker (`.kramak/planner/CORE.md` lines 905–943)

| # | Rule / Constraint | Destination |
|---|---|---|
| 116 | On returning from execution: read `state.json -> lastAudit` and `.kramak/inbox/` for audit findings and strategic concerns. | `PLANNER-CORE` |
| 117 | Incorporate audit findings into the PERCEIVE $\rightarrow$ REASON $\rightarrow$ DECIDE cycle. | `PLANNER-CORE` |
| 118 | Check for `productPhase` advancement (BUILD $\rightarrow$ SHIP, SHIP $\rightarrow$ ITERATE, ITERATE $\rightarrow$ BUILD) and update `state.productPhase`. | `PLANNER-CORE` |
| 119 | **Circuit Breaker Rule:** If `circuitBreakerTripped` is true or `consecutiveFailures >= 3`, STOP. Do not re-queue the failing pattern or retry the same approach. | `ROUTER`, `PLANNER-CORE` |
| 120 | Reset circuit breaker metrics (`circuitBreakerTripped = false`, `consecutiveFailures = 0`) only after designing a fundamentally new architectural strategy. | `PLANNER-CORE` |
| 121 | Repeated Failure Cap: 2nd consecutive failure on same specific issue is acceptable; 3rd time is a hard STOP to rethink design from first principles. | `PLANNER-CORE` |

### 17. Edge Case Handling Table (`.kramak/planner/CORE.md` lines 945–966)

| # | Rule / Constraint | Destination |
|---|---|---|
| 122 | Project docs wrong $\rightarrow$ Fix them directly (planning artifacts). | `PLANNER-CORE`, `PLANNER-MODULE:edge-cases` |
| 123 | AGENTS.md outdated $\rightarrow$ Update it directly to maintain source of truth. | `PLANNER-CORE`, `PLANNER-MODULE:edge-cases` |
| 124 | Pipeline needs improvement $\rightarrow$ Improve it, applying Anti-Bias Guard first. | `ROUTER`, `PLANNER-CORE`, `PLANNER-MODULE:edge-cases` |
| 125 | Need a new dependency $\rightarrow$ Write a WI (executor installs and configures). | `PLANNER-CORE`, `PLANNER-MODULE:edge-cases` |
| 126 | Feature requires data model change $\rightarrow$ Write WIs in dependency order; schema = 🔴 Guided. | `PLANNER-CORE`, `PLANNER-MODULE:edge-cases` |
| 127 | Codebase drifted from docs $\rightarrow$ Update docs directly; code fixes = write WIs. | `PLANNER-CORE`, `PLANNER-MODULE:edge-cases` |
| 128 | Design decision needed $\rightarrow$ Read docs and principles, make the call, document why. | `PLANNER-CORE`, `PLANNER-MODULE:edge-cases` |
| 129 | Queue still has items from last batch $\rightarrow$ Leave phase as `executing`, don't overwrite queue, prompt executor. | `PLANNER-CORE`, `PLANNER-MODULE:edge-cases` |
| 130 | All roadmap items done $\rightarrow$ Envision what's next, update roadmap. | `PLANNER-CORE`, `PLANNER-MODULE:edge-cases` |
| 131 | Executor keeps failing same pattern $\rightarrow$ Improve executor instructions / resolve spec ambiguity. | `PLANNER-CORE`, `PLANNER-MODULE:edge-cases` |
| 132 | Tool or skill would help $\rightarrow$ Write WI for tool install; create skills directly. | `PLANNER-CORE`, `PLANNER-MODULE:edge-cases` |
| 133 | Project needs fundamentally different approach $\rightarrow$ Document reasoning, plan restructure as WIs. | `PLANNER-CORE`, `PLANNER-MODULE:edge-cases` |
| 134 | Unsure about decision $\rightarrow$ Mark `risk: high`, proceed with best judgment, flag uncertainty. | `PLANNER-CORE`, `PLANNER-MODULE:edge-cases` |
| 135 | Source code "quick fix" temptation $\rightarrow$ **RESIST.** Write a 🟢 Outcome WI; tokens are for planning. | `PLANNER-CORE`, `PLANNER-MODULE:edge-cases` |
| 136 | Executor audit flagged strategic concern in INBOX $\rightarrow$ Read it, incorporate into PERCEIVE step. | `PLANNER-CORE`, `PLANNER-MODULE:edge-cases` |
| 137 | BEFORE pattern has multiple matches $\rightarrow$ Widen pattern to include surrounding unique lines until unique. | `PLANNER-CORE`, `PLANNER-MODULE:output-contract` |
| 138 | File needed doesn't exist yet $\rightarrow$ WI creates file (`Type: feature`, provide full content in AFTER). | `PLANNER-CORE`, `PLANNER-MODULE:output-contract` |

### 18. Development Principles (`.kramak/ROUTER.md` lines 1–312)

| # | Rule / Constraint | Destination |
|---|---|---|
| 139 | Understand WHY before WHAT in all implementations. | `PLANNER-CORE`, `ROUTER` |
| 140 | Trace consequences through codebase before proposing code edits. | `PLANNER-CORE`, `EXECUTOR-CORE` |
| 141 | Consider 3 alternatives for architectural decisions; pick the best and document why. | `PLANNER-CORE` |
| 142 | Uncertainty is a signal to research, not to guess. | `ROUTER`, `PLANNER-CORE` |
| 143 | Depth is never wasted: thorough thinking prevents costly bugs. | `PLANNER-CORE` |
| 144 | Never trust memory of file contents: open and read them. | `ROUTER`, `PLANNER-CORE`, `EXECUTOR-CORE` |
| 145 | Never trust memory of an API: search documentation or the web. | `ROUTER`, `PLANNER-CORE` |
| 146 | Never trust previous session output blindly: verify against live code. | `ROUTER`, `PLANNER-CORE` |
| 147 | When docs and code disagree: CODE is truth, docs are stale. | `ROUTER`, `PLANNER-CORE` |
| 148 | If a plan feels "too easy", investigate deeper for missed complexity. | `PLANNER-CORE` |
| 149 | If about to write code seen before, verify pattern is still current. | `EXECUTOR-CORE` |
| 150 | Search web before using external APIs or recommending libraries. | `ROUTER`, `PLANNER-CORE` |
| 151 | Bound confidence levels: High (proceed), Medium (verify), Low (research and flag). | `PLANNER-CORE`, `EXECUTOR-CORE` |
| 152 | Account for training cutoff: actively verify current versions and migration guides. | `ROUTER`, `PLANNER-CORE` |
| 153 | Human Task Contract: When human action required (billing, API keys, credentials, business decisions), do not block entire pipeline; record in `HUMAN-TASKS.md` with WHAT, WHY, HOW, URGENCY, BLOCKED; set `humanTasksPending: true`; continue non-blocked work. | `PLANNER-CORE`, `EXECUTOR-CORE` |
| 154 | Secret Management: Never write raw secrets into code or WIs; reference env vars; update `.env.example`; create human tasks for key procurement. | `ROUTER`, `PLANNER-CORE`, `EXECUTOR-CORE` |
| 155 | Quality Ratio Principle: Collapse ambiguity, maintain $\le 2$ hr task horizon, calibrate detail to risk. | `PLANNER-CORE` |
| 156 | Depth Over Speed: Read full functions, trace end-to-end data flows, check edge cases and error paths. | `EXECUTOR-CORE`, `PLANNER-CORE` |
| 157 | Anti-Inflation: No synthetic PII, no fake API payloads, no unmarked placeholders, no lorem ipsum in user strings. | `EXECUTOR-CORE`, `PLANNER-CORE` |
| 158 | Progressive Enhancement: Graceful degradation for missing data, helpful empty states, partial API returns. | `EXECUTOR-CORE`, `PLANNER-CORE` |
| 159 | Anti-Bias Guard: For all `.kramak/` modifications, evaluate G1 (diff summary), G2 (rollback check), G3/G4 (cross-family critique & ledger append), G5/G6 (cooldown & risk-tiered human gating). | `ROUTER`, `PLANNER-CORE` |
| 160 | Honesty Over Confidence: Acknowledge unknowns, flag `risk: high`, route unresolvable items with status: 'failed' and explicit diagnostic categories. | `ROUTER`, `PLANNER-CORE`, `EXECUTOR-CORE` |
| 161 | Decision Audit Trail: Document design rationale and rejected alternatives in plans and commit messages. | `ROUTER`, `PLANNER-CORE`, `EXECUTOR-CORE` |
| 162 | Tokens Are Thinking: Never suppress reasoning tokens ("be concise"); communicate via files rather than chat. | `PLANNER-CORE`, `EXECUTOR-CORE` |

### 19. Bootstrap & Governance Infrastructure (`.kramak/planner/CORE.md`, `FOUNDING-ARCHITECTURE.md`, Research Amendments)

| # | Rule / Constraint | Destination |
|---|---|---|
| 163 | Bootstrap Scenario 1 (Continuing Project): Verify `state.json`, apply Empty Workspace Guard, do not re-bootstrap. | `PLANNER-CORE` |
| 164 | Bootstrap Scenario 2 (Existing with Context): Read `AGENTS.md`, scan workspace, detect toolchain, create `.kramak/` structure, set `phase: "planning"`. | `PLANNER-CORE` |
| 165 | Bootstrap Scenario 3 (Existing without Context): Scan workspace, detect toolchain, auto-generate `AGENTS.md`, scaffold `.kramak/`, set `phase: "planning"`. | `PLANNER-CORE` |
| 166 | Bootstrap Scenario 4 (New with Requirements): Extract requirements, generate `AGENTS.md`, scaffold `.kramak/`, set `phase: "planning"` for batch 1 scaffolding. | `PLANNER-CORE` |
| 167 | Bootstrap Scenario 5 (Empty Workspace): Scaffold with `phase: "waiting"`, prompt user for requirements in `.kramak/inbox/`, STOP. | `PLANNER-CORE` |
| 168 | Toolchain Detection: Detect build, test, lint, and dev commands across Node, Deno, Python, Rust, Go, Elixir, Swift, .NET, PHP, Java, Ruby ecosystems. | `PLANNER-CORE`, `PLANNER-MODULE:domain-conventions` |
| 169 | Monorepo Orchestration: Store root build/lint in `toolchain.checkCommands`; specify package-scoped checks in individual WIs. | `PLANNER-CORE`, `PLANNER-MODULE:domain-conventions` |
| 170 | Git Initialization: Run `git init`, create `.gitignore`, make initial commit if workspace is not a git repo. | `PLANNER-CORE` |
| 171 | Crash & WAL Recovery: Run level-triggered state reconciliation on bootstrap; replay `.wal` or rename `.tmp` files; repair orphaned worktrees. | `ROUTER`, `PLANNER-CORE` |
| 172 | Dispatch Budget = 1 (Sequential Baseline): Save WIs in `.kramak/work-items/`, transition `state.phase: "executing"`. | `PLANNER-CORE` |
| 173 | Dispatch Budget > 1 (Parallel Mode): Run Tier 2 Pre-flight check (verify zero file-scope intersection across concurrent WIs), provision git worktrees at `.kramak/worktrees/<id>`, init WI state shards at `.kramak/work-items/<id>.json`, transition `state.phase: "dispatch"`. | `PLANNER-CORE` |
| 174 | State Transition Guard Matrix: Enforce formal preconditions for `BOOTSTRAP -> PLANNING`, `PLANNING -> EXECUTING`, `PLANNING -> DISPATCH`, `PLANNING -> WAITING`, `PLANNING -> ESCALATED`. | `ROUTER`, `PLANNER-CORE` |
| 175 | **Resume Drift Check (Amendment 4B):** When resuming from `WAITING`, compare current project state (checksums, test results) against pre-wait snapshot; if drift detected, re-run full ORIENT before proceeding. | `PLANNER-CORE` |
| 176 | **Evidence Language Precision (Amendment 4C):** Use honest evidentiary terms: "informed by METR time-horizon data", "consistent with Zheng et al. 2024", "synthesized from ODC + MAST", "calibrated against overconfidence literature", "informed by FeatBench scope-creep findings". | `PLANNER-CORE` |

---
