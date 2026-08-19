# Planner Edge Cases & Guardrails

> **Module Role:** On-demand operational playbook loaded when `planner/CORE.md` detects edge conditions, workspace structural anomalies, session fatigue, or execution deadlocks.
>
> **Universal Alignment:** Enforces invariants established in [.kramak/ROUTER.md](file:///d:/dev/pro/kramak/.kramak/ROUTER.md) and architectural decisions in [research/DECISIONS.md](file:///d:/dev/pro/kramak/research/DECISIONS.md) (D-001, D-010, D-011).

---

## 1. Empty Workspace Guard

### 1.1 Concrete Trigger Condition
Evaluate workspace files. If the project root has **0 files matching any of the following code extensions:**
`*.py`, `*.js`, `*.ts`, `*.tsx`, `*.jsx`, `*.go`, `*.rs`, `*.java`, `*.rb`, `*.cpp`, `*.c`, `*.cs`, `*.php`, `*.swift`, `*.kt`, `*.scala`, `*.ex`, `*.exs`
**AND** `.kramak/inbox/` (or `INBOX.md`) contains 0 unprocessed user requirements or instructions.

### 1.2 Deterministic Actions
1. Set `state.phase: "waiting"`.
2. Set `state.nextAction: "Empty workspace detected. Describe what to build in INBOX.md, then say Start."`.
3. Inform the user in **one clear sentence** requesting project requirements.
4. **STOP immediately.** Do NOT hallucinate architectures, directories, or roadmaps without initial user intent.

---

## 2. Monorepo Detection & Scoping

### 2.1 Concrete Trigger Condition
The repository contains **more than 1 project manifest** at different directory levels:
- Multiple `package.json` files (e.g., `apps/web/package.json`, `packages/ui/package.json`, `packages/core/package.json`)
- Multiple `go.mod` files across subdirectories
- Multiple `Cargo.toml` files or a root `Cargo.toml` with `[workspace]`
- Multiple Gradle/Maven modules (`settings.gradle`, subproject `pom.xml`)

### 2.2 Operational Scoping Rules
1. **Module Boundary Mapping:** Map the workspace root and all package boundaries. Record paths in `state.projectStructure.modules`.
2. **Single-Package Work Item Scope:** Every Work Item MUST be scoped to **exactly ONE sub-package/module**. Never mix multi-package source changes in a single standard Work Item.
3. **Workspace-Aware Commands:** Attach package-scoped build and check commands to each WI (e.g. `pnpm --filter @acme/core test`, `cargo test -p acme-auth`, `go test ./packages/storage/...`).
4. **Inter-Package Dependency Ordering:** When changes span multiple packages, enforce strict topological WI dependencies (e.g., build shared core library in `WI-101` before dependent web service in `WI-102`).

---

## 3. Polyglot Project Handling

### 3.1 Concrete Trigger Condition
The repository uses **2 or more distinct programming language runtimes** (e.g., Python FastAPI backend + TypeScript Next.js frontend; Rust core engine + Python bindings; Go microservice + React client).

### 3.2 Operational Rules
1. **Identify Language Boundaries:** Establish clear directory and runtime boundaries (e.g., `backend/` $\rightarrow$ Python, `frontend/` $\rightarrow$ Node.js/TypeScript).
2. **Single-Runtime Scoping:** Each Work Item must target files within **one single language runtime**.
3. **Cross-Language Tier Elevation:** Any Work Item that bridges language boundaries (e.g., updating shared Protobuf schemas, OpenAPI specs + generated client stubs, FFI bindings) MUST be classified as 🔴 **Guided** with explicit BEFORE/AFTER blocks in both languages.

---

## 4. Polish Ceiling Rule

*Informed by FeatBench empirical scope-creep findings and overconfidence calibration literature:*

### 4.1 Quantitative Limits
- **Standard Work Item Scope:** $\le 5$ files AND $\le 50$ lines changed per Work Item.
- **Stopping Invariant:** When the build passes and linter errors reach **0**, **STOP POLISHING**.
- **Lint Warnings:** Do NOT block deployment or generate standalone Work Items during `BUILD` or `SHIP` phases when higher-priority features or security fixes exist.

### 4.2 Explicit Exceptions
1. 🔴 **Guided WIs:** May exceed 5 files / 50 lines only if the extensive scope is explicitly justified with architectural rationale in `plans/PLAN-batch-XX.md`.
2. **Mechanical Refactoring WIs:** Pure mechanical transforms (e.g., codebase-wide import renames, formatting migrations, codemods) may exceed file/line caps provided they contain zero architectural logic changes.

---

## 5. Strategic Override Protocol

The Planner possesses full authority to question and reorient the `productPhase` or roadmap direction when evidence from the live codebase contradicts prior planning assumptions.

### 5.1 Protocol Requirements
1. **Document Concrete Evidence:** Cite specific files, test failures, or market requirements uncovered during `PERCEIVE` (e.g., "Inspecting `src/db/` revealed migration collisions; core API is not deployable").
2. **Record in Batch Plan:** Document the override in `plans/PLAN-batch-XX.md` under the section `## Strategic Reorientation`.
3. **Update State:** If changing `productPhase` (e.g., `SHIP` $\rightarrow$ `BUILD` or `BUILD` $\rightarrow$ `ITERATE`), update `state.productPhase` in `.kramak/state.json` alongside the recorded rationale.

---

## 6. METR 2-Hour Work Item Cap

*Calibrated against METR empirical capability horizon data (80% reliability threshold ≈ 30–45 minutes autonomous agent execution ≈ 2 hours human-equivalent engineering effort).*

### 6.1 Sizing Principles
- Every Work Item must represent $\le 2$ hours of focused human engineering work.
- The complete intent and constraints of the Work Item should be clearly expressible in ~200 words.
- If a feature or task is larger than 2 hours human-equivalent effort: **decompose into multiple dependent Work Items** structured as a cohesive Story.

---

## 7. Session Continuity Decision Table

*Calibrated against LLM context degradation literature: performance decays noticeably beyond 40–50% context utilization due to attention dispersion and the "Lost in the Middle" effect.*

Before completing the planning turn, determine whether to execute immediately in the current session or recommend a clean session handoff.

### 7.1 Direct Planner Work Precedence
If you identify documentation errors, outdated `AGENTS.md` conventions, or skill updates — apply those edits **directly now** before finalizing work items. Do not delegate planning tasks to executor Work Items.

### 7.2 Session Weight Assessment

| Metric | Light 🟢 | Medium 🟡 | Heavy 🔴 |
|---|---|---|---|
| Work Items written this session | $\le 2$ | 3–4 | $\ge 5$ |
| Files inspected / read | $\le 10$ | 11–20 | $> 20$ |
| Direct documentation edits made | 0–1 | 2–3 | $\ge 4$ |
| Complex research / web queries | None | Moderate | Extensive |

### 7.3 Next Phase Cost Assessment

| Next Phase | Computational Context Cost |
|---|---|
| Execution (small batch written, context warm) | Light–Medium 🟢🟡 |
| Execution (large batch or extensive research history) | Heavy 🔴 |
| Audit of recently executed batch | Light–Medium 🟢🟡 |

### 7.4 Model-Type Hard Gate (Check First)

> **Are you operating as an advanced reasoning model?**  
> *(e.g., Claude 3.7 Sonnet thinking / Opus, OpenAI o1/o3-mini, Gemini Pro with thinking)*

| Model Capability Tier | Next Phase | Mandatory Operational Decision |
|---|---|---|
| **Advanced Reasoning Tier** | **Execution** | **ALWAYS NEW SESSION.** Instruct user: *"Start executor with a fast/precise model capability and say Start."* |
| **Fast / Precise Tier** | Any | Consult Decision Matrix in §7.5. |

*Rationale:* Reasoning models excel at architectural abstraction and constraint resolution. Using expensive reasoning tokens for mechanical, spec-following code execution wastes token budget with zero quality gain.

### 7.5 Context Decision Matrix

| Current Session Weight | Next Phase Cost | Mandatory Action |
|---|---|---|
| Light 🟢 | Light 🟢 | **CONTINUE** in current session |
| Light 🟢 | Medium 🟡 | **CONTINUE** (sufficient capacity) |
| Medium 🟡 | Light 🟢 | **CONTINUE** (manageable context) |
| Medium 🟡 | Medium+ 🔴 | **NEW SESSION** (context approaching saturation) |
| Heavy 🔴 | Any | **NEW SESSION** (context saturated; avoid degradation) |

### 7.6 State Updates for Continuation vs Handoff
- **If Continuing in Current Session:**
  1. Update `state.json` (`phase: "executing"`, `active: "WI-XXX"`).
  2. Log in `state.json -> lastSession`: `"Continuing from planning to execution in same session."`.
  3. Proceed immediately to Executor STEP 1 without emitting conversational filler.
- **If Recommending a New Session:**
  1. Update `state.json` (`phase: "executing"`, `nextAction: "Start new session with <fast/precise capability> and say Start."`).
  2. Run `git add .kramak/ plans/ && git commit -m "plan(batch-XX): [Theme Summary]"`.
  3. Emit **one single sentence** stating `state.nextAction`. STOP.

---

## 8. Complete Battle-Tested Edge Case Decision Table

*This lookup table resolves all operational edge cases encountered during planning:*

| Situation / Encountered Condition | Deterministic Operational Decision |
|---|---|
| **Project documentation is inaccurate or outdated** | **Fix it directly.** Documentation, specs, and roadmaps are planner artifacts. |
| **`AGENTS.md` / conventions file is outdated** | **Update it directly** to maintain the canonical source of truth for the codebase. |
| **Pipeline specification itself needs improvement** | **Improve it directly**, evaluating the Anti-Bias Guard (G1–G6) in `ROUTER.md` first. |
| **Project requires a new third-party dependency** | **Write a Work Item.** The executor will install, configure, and verify lockfiles. |
| **Feature requires database schema / data model change** | Write WIs in strict dependency order. The schema migration WI MUST be 🔴 **Guided**. |
| **Codebase implementation has drifted from docs** | Update documentation directly to reflect reality; write WIs for necessary code fixes. |
| **Unresolved architectural or design decision needed** | Read project docs and principles. Make the design decision, document rationale in the plan. |
| **Queue still contains unexecuted WIs from last batch** | Leave phase as `executing`—do not overwrite queue. Instruct user to run executor. |
| **All roadmap items are completed** | Envision what comes next using the 5 Strategic Lenses, update roadmap, advance `productPhase`. |
| **Executor repeatedly fails on the same pattern** | Inspect failure diagnostic in `failed/`; upgrade WI spec to 🔴 **Guided** and add explicit guardrails. |
| **A new tool or skill would improve pipeline execution** | Write a WI for tool installation; author `.kramak/` skill specifications directly. |
| **Project requires a fundamentally different architecture** | Document architectural justification in plan; structure migration as phased, dependent WIs. |
| **Uncertain about an architectural decision** | Flag WI with `Risk: High`, document trade-offs in Intent, and specify a safe fallback. |
| **Source code presents a "quick fix" temptation** | **RESIST.** Write a 🟢 **Outcome** WI. Your tokens are strictly reserved for planning. |
| **Executor audit flagged a strategic concern in INBOX** | Read the concern, evaluate in `PERCEIVE`, and prioritize resolution in the current batch. |
| **A `BEFORE` pattern matches multiple locations in file** | Widen the `BEFORE` pattern with surrounding unique lines until exactly **ONE** match is confirmed. |
| **A target file does not exist yet** | Write WI with `Type: feature`, mark `**Verified:** ✅ New file (no prior lines)`, provide full content in `AFTER`. |
| **External blocker active in `HUMAN-TASKS.md`** | If non-blocked work exists on roadmap, switch `productPhase: "BUILD"` and proceed. If fully blocked, set `phase: "waiting"`, notify user, and STOP. |
| **Resume from `WAITING` phase detected** | Run Resume Drift Check: compare checksums and `git status`. If drift detected, re-run full `ORIENT`. |
