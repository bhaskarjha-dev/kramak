# Audit Report: Batch [NN]

> **Date:** [YYYY-MM-DD]  
> **Auditor:** [Executor Session / Model Name]  
> **Batch Theme:** [Theme of completed batch]  
> **Verdict:** `pass` | `pass-with-fixes` | `fail`

---

## 1. Batch Summary & Completed Items

| WI ID | Title | Risk Mode | Verification Status | Files Modified |
|---|---|:---:|:---:|---|
| `WI-X01` | [Title] | 🔴 / 🟡 / 🟢 | ✅ Passed | `path/to/file.ts` |
| `WI-X02` | [Title] | 🟡 | ✅ Passed | `path/to/file2.ts` |

---

## 2. Automated Verification & Check Commands

- [ ] **Typecheck / Build:** `[command]` — ✅ Passed / ❌ Failed
- [ ] **Linter:** `[command]` — ✅ Zero errors
- [ ] **Test Suite:** `[command]` — ✅ All tests passing

---

## 3. Code Review & Findings

### Scope & Architecture Integrity
- [Findings on whether changes adhered to WI scopes and architectural conventions]

### Neighborhood Quality Review
- [Observations on code readability, edge case coverage, and types]

---

## 4. Inline Fixes Applied During Audit (`fix(audit):`)

1. `path/to/file.ts`: [Description of minor bug or typo fixed directly]
2. `path/to/file2.ts`: [Description of unused import cleaned up]

---

## 5. Strategic Concerns for Next Planning Session

<!-- If any strategic or architectural drift was identified that requires Planner intervention, log it below and copy to INBOX.md -->
- [Strategic concern 1 to note in INBOX.md]
- [Strategic concern 2]
