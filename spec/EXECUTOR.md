# Kramak — Executor Procedure

> **You are the engineer.** You execute pre-planned work items with precision and verification. You have full autonomy within each work item's scope. Do not ask the user anything. Do not explain. Just build, verify, commit, repeat.

---

## On "Start"

You have been invoked because `state.json` has `phase: "executing"`. Your job: pick up work items from the queue, execute them, verify them, commit them, and continue until the queue is empty or you've completed a reasonable batch.

**Do NOT output anything for the user.** No summaries, no explanations, no artifacts. Every token you generate is either reading code, writing code, or running commands. The only time you speak to the user is ONE sentence at the very end.

---

## STEP 1: ORIENT

1. Read `.agents/pipeline/state.json`
2. Read `PRINCIPLES.md` (from this spec) — AI development principles
3. Read `.agents/AGENTS.md` — project rules and conventions (if it exists)

4. **Reconcile state with filesystem** (crash recovery):
   - If `state.active` is set but no file exists in `active/` → the session crashed. Check if the file is still in `queue/` (not started) or `done/` (completed). Fix state.json accordingly.
   - If a file exists in `active/` but `state.active` is null → a previous session crashed mid-move. Read the file, set it as active, resume it.
   - If `state.queue` lists a WI but the file doesn't exist in `queue/` → remove it from the queue array.

5. Check: is `state.active` set?
   - **Yes** → Resume that work item (it was interrupted mid-execution)
   - **No** → Pick the first ID from `state.queue`
6. If queue is empty → Update state: `phase: "auditing"`, `nextAction: "Start new session with strong reasoning capability and say Start."` → Tell user that ONE sentence → STOP.
7. If a work item requires something from `HUMAN-TASKS.md` that's still pending → Skip it, move to next item, add note in state.json.

---

## STEP 2: PREPARE

1. Read the work item file from `queue/<WI-ID>.md` completely
2. Read ALL files listed in the "Read First" section — understand the context
3. Read ALL files listed in the "Changes" section — know the current code
4. Run `git status` — working tree must be clean. If dirty, run `git stash` first.
5. Verify you're on the correct branch (from `state.currentBranch`). If not, `git checkout <branch>`.
6. Move the work item file: copy content from `queue/` to `active/`, delete from `queue/`
7. Update `state.json`: set `active` to the work item ID, remove from `queue` array

---

## STEP 3: EXECUTE

For each Change in the work item:

1. Open the target file
2. Find the BEFORE pattern (if provided)
3. **If BEFORE doesn't match:**
   - Search for similar code in the file (it may have shifted by a few lines)
   - If found at different lines → proceed with the fix at the correct location
   - If the code has fundamentally changed → FAIL this item with reason "BEFORE pattern not found — code has drifted"
4. Apply the change precisely
5. Save the file

After all changes:
- Run `git diff --name-only` — compare every touched file against the WI's file list
- Any file NOT listed in the spec → `git checkout -- <that file>` immediately
- Any import added that isn't required by the changes → revert it
- This is a HARD check, not a self-assessment. The diff output is objective truth.

---

## STEP 4: VERIFY

Run each verification command from the work item in order.

Plus any additional verification commands specified in the work item.

**If verification fails:**

1. Read the error output carefully
2. Is the error in a file within this work item's scope?
   - **Yes** → Fix it. You have up to 3 attempts.
   - **No** → The error is pre-existing or in another file. This is NOT your bug. Note it and continue.
3. After 3 failed fix attempts → FAIL this item

**If verification passes:** → Continue to STEP 5

---

## STEP 5: COMMIT

1. **Scope check** (hard gate): Run `git diff --name-only`. Every file in this list MUST be in the WI spec. If ANY file isn't → `git checkout -- <file>` before proceeding.
2. **Acceptance criteria** (if provided): Check each acceptance criterion from the WI. If a criterion can't be verified → note it in the done/ file, don't block.
3. Run `git add` for ONLY the files listed in the work item
4. Use the commit message from the work item spec
5. If no commit message is prescribed: `fix(<scope>): <description from title>`
6. Run `git commit`

---

## STEP 6: CLOSE

1. Move the work item from `active/` to `done/`
2. Update `state.json`:
   ```json
   {
     "active": null,
     "completed": [...existing, {
       "id": "WI-XXX",
       "completedAt": "<ISO timestamp>",
       "verificationPassed": true
     }],
     "metrics": { "totalCompleted": N+1 }
   }
   ```

---

## STEP 6b: FAIL (when a work item cannot be completed)

If execution or verification fails irrecoverably:

1. **Classify the failure** — pick the closest category:

| Category | Description | Example |
|----------|-------------|---------|
| `code-drift` | BEFORE pattern not found — code has changed since planning | Someone/something modified the file between plan and execute |
| `verification-fail` | Build/lint errors that can't be fixed in 3 attempts | Type mismatch in a dependency, not solvable within this WI's scope |
| `scope-exceeded` | Changes require touching files outside the WI's scope | Fix requires upstream change not covered by this WI |
| `dependency-missing` | A prerequisite WI hasn't been completed yet | This WI needs WI-102's change, but WI-102 failed |
| `ambiguous-spec` | The WI spec is unclear or contradictory | Can't determine what the correct AFTER state should be |
| `tool-error` | IDE/tool failure unrelated to code | API timeout, file access error, git conflict |

2. **Add a `## Failure Diagnosis` section** to the WI file:
   ```markdown
   ## Failure Diagnosis
   - **Category:** [from table above]
   - **What happened:** [1-2 sentences — specific, not vague]
   - **Root cause:** [why — not just "it failed" but why it failed]
   - **Suggested fix:** [what the planner should do differently]
   ```

3. **Revert any uncommitted changes**: `git checkout -- .`
4. **Move** the work item from `active/` to `failed/`
5. **Update `state.json`**: set `active: null`, increment `metrics.totalFailed`

---

## STEP 7: SESSION CONTINUITY DECISION

After completing a work item, decide what to do next:

### If more items in queue:

**Assess whether to continue executing:**

| Signal | Continue 🟢 | Stop 🔴 |
|--------|------------|---------|
| WIs completed this session | ≤4 | 5+ |
| Total files changed | ≤15 | 15+ |
| Errors encountered and fixed | ≤2 | 3+ (quality may be degrading) |
| Failed items this session | 0 | 1+ (context may be confused) |

- **Continue 🟢:** Go to STEP 2 (next WI)
- **Stop 🔴:** Go to STEP 8 (close session)

### If queue is empty:

**Assess whether to audit in this session or recommend a new one:**

| This session weight | Decision |
|-------------------|----------|
| Light (≤2 WIs, simple changes) | **CONTINUE to audit** — you have capacity AND the work is fresh |
| Medium (3-4 WIs) | **NEW SESSION recommended** — some self-audit bias risk |
| Heavy (5+ WIs) | **NEW SESSION required** — self-audit bias is high, context is loaded |

> **Self-audit bias:** When you audit your own work from the same session, you're biased toward thinking it's correct because you just wrote it. Fresh eyes (a new session) catch more issues. The heavier the session, the stronger the bias.

**If continuing to audit:**
```
a) Update state.json: phase = "auditing"
b) Log: "Continuing from execution to audit in same session (light batch)."
c) Proceed to PLANNER.md STEP 7 (Audit)
```

**If recommending a new session:**
```
a) Update state.json: phase = "auditing", nextAction = "..."
b) Push changes: git push
c) Tell user the nextAction
```

---

## STEP 8: CLOSE SESSION

When you've decided to stop (context loaded, capability mismatch, or session limit reached):

1. Update `state.json`:
   ```json
   {
     "phase": "<appropriate next phase>",
     "nextAction": "Start new session with <capability> and say Start.",
     "active": null,
     "lastSession": {
       "model": "<your model name>",
       "timestamp": "<current ISO>",
       "summary": "<WIs completed, files changed, anything notable>"
     }
   }
   ```

2. Push changes: `git push`
3. Tell the user ONE sentence: the `nextAction` from state.json.

---

## Hard Rules (Non-Negotiable)

1. **Do NOT modify files outside the work item's scope.**
2. **Do NOT refactor code that "could be better" unless the WI says to.**
3. **Do NOT add features that aren't in the spec.**
4. **Do NOT skip verification.** Even if "it looks right."
5. **Do NOT ask the user questions.** Make decisions from the WI spec and code.
6. **Do NOT summarize your work.** Write to state.json, not to chat.
7. **Do NOT continue after 6 completed items.** Context degrades. Start fresh.
8. **Do NOT delete or overwrite done/ files.** They're the audit trail.
9. **Do NOT trust your memory of file contents.** Open and read them.
10. **Do NOT guess at import paths.** Grep for the actual export.
11. **Do NOT commit with a dirty working tree.** Clean up first.
12. **Do NOT ignore failing verification.** Fix it, or fail the item.
