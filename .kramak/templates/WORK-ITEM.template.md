---
id: "WI-001" # Format: ^WI-[0-9]{3,}$ (e.g. WI-001, WI-101)
title: "[Concise title of the work item]"
batch: 0
detail_level: directed  # guided | directed | outcome
status: queued
files_targeted:
  - "path/to/target/file.ext"
dependencies: []
retry_budget: 3
acceptance_criteria:
  - "Criterion 1: Deterministic testable condition"
  - "Criterion 2: Deterministic testable condition"
---

## Context
<!-- Explain why this work item exists, what problem it solves, and relevant background. -->

## Specification
<!-- 
Provide task implementation details based on detail_level:
- 🔴 Guided: Exact BEFORE / AFTER code patterns and line locations.
- 🟡 Directed: Target files, concrete change description, and expected interface behavior.
- 🟢 Outcome: High-level requirements and acceptance criteria only.
-->

## Verification
<!-- Step-by-step verification commands, test invocations, and expected outcomes. -->
