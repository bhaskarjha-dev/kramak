# Contributing to Kramak (à¤•à¥à¤°à¤®à¤•)

Thank you for contributing to Kramak! 

Kramak is a pure specification and process control framework for autonomous coding agents. The project adheres to strict governance principles to ensure long-term stability, zero supply-chain risk, and resistance to prompt degradation.

---

## 1. Core Architectural Constraints

All contributions to the core `kramak` repository must respect the non-negotiable project invariants:
1. **Zero Mandatory Runtime Dependencies (Constraint C2):** The core repository contains exclusively Markdown specifications and JSON Schema (Draft 2020-12) files. No executable scripts, compilers, runtimes, package manifests (`package.json`, `Cargo.toml`), or lockfiles may be added to the core repository.
2. **Model-Agnostic Core (Constraint C3):** No model-name allowlists, vendor SDK bindings, or proprietary API assumptions are permitted within the core specifications.
3. **IDE-Agnostic Core (Constraint C4):** The core state machine and Work Item specifications remain IDE-neutral, translated to host environments via declarative adapters.

---

## 2. The Anti-Bias Guard (G1â€“G6 Governance)

Because autonomous agents can propose improvements to Kramak's own specifications during execution audits, all pull requests that modify files under `.kramak/` must clear the **Anti-Bias Guard (G1â€“G6)** framework:

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚                       THE ANTI-BIAS GUARD (G1â€“G6)                           â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ Step  â”‚ Gate Name                     â”‚ Verification Requirement            â”‚
â”œâ”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ G1    â”‚ History Diff Verification     â”‚ Document the exact failure mode.    â”‚
â”‚ G2    â”‚ Rollback Cross-Check          â”‚ Confirm reverting isn't cleaner.    â”‚
â”‚ G3    â”‚ Dual-Model Critique Pass      â”‚ Pass review across model families.  â”‚
â”‚ G4    â”‚ Immutable Ledger Logging      â”‚ Log entry to self-modifications.    â”‚
â”‚ G5    â”‚ Cooldown Verification Window  â”‚ Re-verify after reflection cycle.   â”‚
â”‚ G6    â”‚ Risk-Tiered Human Approval    â”‚ Mandatory human approval for Tier B.â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Pull Request Checklist for `.kramak/` Changes
When opening a PR modifying `.kramak/` specifications or schemas, include the following in your PR description:

```markdown
### Anti-Bias Guard Verification
1. **G1 (Failure Mode):** What specific, observable failure mode does this change prevent?
2. **G2 (Rollback Check):** Why is modifying the specification superior to reverting a recent change?
3. **G3 (Cross-Family Critique):** Has this change been critiqued by a model from a different family (or human reviewer)?
4. **G4 (Ledger Entry):** Has an entry been formatted for `.kramak/ledger/self-modifications.jsonl`?
5. **G5 (Cooldown):** Has the change been re-evaluated in a fresh session?
6. **G6 (Risk Tier):**
   - [ ] Tier A (Low Risk: Formatting, documentation, typo fix)
   - [ ] Tier B (High Risk: State machine, schemas, invariants, safety checks) â€” requires named maintainer sign-off.
```

---

## 3. Types of Contributions

### 3.1 Core Specifications (`.kramak/`)
- Improvements to `.kramak/planner/`, `.kramak/executor/`, `.kramak/schemas/`, or `.kramak/ROUTER.md`.
- Must satisfy the Anti-Bias Guard (G1â€“G6) and adhere to the progressive disclosure architecture defined in `.kramak/ROUTER.md`.

### 3.2 Documentation (`docs/`, `README.md`)
- Improvements to guides, comparative analyses, and architectural documentation.
- Documentation PRs do not require G1â€“G6 checklist enforcement, but must maintain the **Evidence Language Discipline** (use "informed by" / "aligned with" when referencing empirical research).

### 3.3 IDE Adapters (`adapters/`)
- Tier 1 (Claude Code, Cursor) and Tier 2/3 (Antigravity, Copilot, Devin, Cline, Aider) adapters are maintained in this repository.
- Adapters must generate standard `AGENTS.md` / `SKILL.md` bridges without mutating core schema definitions.
- For new or niche IDEs, please contribute to the [`kramak-community-adapters`](https://github.com/bhaskarjha-dev/kramak-community-adapters) repository.

### 3.4 Companion CLI (`kramak-cli`)
- The CLI utility (`@kramak/cli`) is developed independently in [`github.com/bhaskarjha-dev/kramak-cli`](https://github.com/bhaskarjha-dev/kramak-cli). Please submit CLI issues and PRs there.

---

## 4. Reporting Issues

### Bug Reports
Open a GitHub issue including:
1. Expected behavior vs. actual behavior.
2. The active state from `.kramak/state.json`.
3. The AI agent and model used.
4. Relevant snippets from `.kramak/work-items/` or audit logs.

### Feature Requests & Invariant Proposals
Open a discussion or issue describing:
1. The observable failure mode the proposed feature prevents.
2. How the feature applies universally across multiple programming languages and project types.
3. How the feature upholds the Zero Mandatory Runtime Dependencies constraint.

---

## 5. Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). We are committed to providing a friendly, safe, and welcoming environment for all contributors.
