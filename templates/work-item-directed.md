# WI-XXX: [Title]

## Classification
- **Type:** feature | refactor | fix
- **Risk:** 🟡 Medium
- **Story:** [Story name from Batch Plan]
- **Dependencies:** [WI-YYY] or "none"

## Intent
[WHY this exists. What user value or technical capability it delivers.]

## Target Files
- `path/to/file1.ts` — [specific responsibility / change needed]
- `path/to/file2.ts` — [specific responsibility / change needed]
- `path/to/file3.ts` — [specific responsibility / change needed]

## Key Context
[Important type signatures, interfaces, or architectural patterns the executor needs to follow. Grounded in actual files read, not assumed.]

```typescript
// Example expected interface or schema shape:
export interface TargetInterface {
  id: string;
  name: string;
}
```

## Constraints
- Must follow project conventions in [relevant directory]
- Must handle edge cases: [e.g. empty states, null safety, error propagation]
- Must NOT modify files outside the listed target files

## Verification
1. `[project build/typecheck command]`
2. `[project lint/check command]`
3. `[test command if applicable]`

## Acceptance Criteria
1. [Observable behavior 1]
2. [Observable behavior 2]
