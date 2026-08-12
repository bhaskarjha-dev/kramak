# Changelog

All notable changes to the Kramak specification are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [1.0.0] — 2026-08-12

### The Public Release

Kramak (formerly "Kramak") — the missing SDLC for AI agents. This is the first public release of the complete methodology specification.

### Core Specification
- **PLANNER.md** — Complete planning procedure with perspective-based assessment (PERCEIVE → REASON → DECIDE), strategic vision lenses, spec detail scaling (🔴/🟡/🟢), and bounded autonomy
- **EXECUTOR.md** — Execution procedure with risk-based autonomy, neighborhood cleanup, failure taxonomy (6 categories), session continuity intelligence, and executor-driven auditing
- **PRINCIPLES.md** — Development constitution covering thinking, safety, human-in-the-loop, quality, and meta-principles including the Anti-Bias Guard
- **BOOTSTRAP.md** — Auto-detection of project type, toolchain, and 5-scenario bootstrapping

### Key Features
- Grounded Verification Protocol (grep-confirmed specs)
- Anti-Bias Guard (5-point checklist for pipeline self-improvement)
- Spec Detail Scaling (Guided / Directed / Outcome based on risk)
- Circuit Breaker (prevents infinite audit-fix loops)
- Hard Diff Scope Check (deterministic scope enforcement via git)
- State Reconciliation (crash recovery)
- Capability Gate Check (model self-assessment)
- INBOX system (structured mid-project user input)
- Human Task Protocol (pipeline doesn't block on what it can't do)

### IDE Adapters
- Antigravity IDE (SKILL.md)
- Cursor (.mdc rule)
- Claude Code (CLAUDE.md section)
- Generic (any AI tool with file access)

### Design Evolution (Pre-Release)
The methodology evolved through 24 iterations during development:
- Research-grounded corrections replacing assumptions with evidence
- Anti-bias self-audit of planning redesign
- Hierarchical planning with spec detail scaling
- Capability gate check for model self-assessment
- Session continuity intelligence (adaptive phase transitions)
- Phase-aware priorities with neighborhood cleanup
- Polish ceiling rule (stop lint perfectionism)
- Strategic reorientation (planner never follows state blindly)
- Bounded autonomy (anti-sycophancy correction)
- Model-type hard gate (expensive models don't do execution)
- Blocked fallback (productive use of blocked time)
- Strategic vision + project discovery
- Dynamic governance (anti-orphan, trajectory retries, scoped breaker)
- Planner-executor separation of concerns
- Objective degradation metrics (replacing subjective self-assessment)
- Intent-based perspective architecture (replacing role cycling)
- Executor-driven auditing (replacing planner audit)
