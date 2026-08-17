# WI-XXX: [Title]

## Classification
- **Type:** fix | feature | security
- **Risk:** 🔴 Critical
- **Story:** [Story name from Batch Plan]
- **Dependencies:** [WI-YYY] or "none"

## Intent
[WHY this change is needed. What breaks if this is implemented incorrectly.]

## Read First
1. `path/to/file.ts` (lines X-Y) — understand current behavior and dependencies

## Changes
### Change 1: [Short description of change]
**File:** `path/to/file.ts`
**Verified:** ✅ grep confirmed unique match at lines X-Y

```
// BEFORE:
[exact current lines from codebase - confirmed unique via grep]

// AFTER:
[exact drop-in replacement lines]
```

**New symbols:** [list any new functions/types added]  
**Callers affected:** [list any call-sites in codebase affected]

## DO NOT
- [Hard constraint 1 — zero deviation allowed]
- [Hard constraint 2]

## Verification
1. `[project build command]` (e.g. `pnpm tsc --noEmit`)
2. `[project check/lint command]` (e.g. `pnpm biome check`)
3. `[test command if applicable]`

## Acceptance Criteria
1. [Observable proof criterion 1]
2. [Observable proof criterion 2]
