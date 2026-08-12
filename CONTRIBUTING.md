# Contributing to Kramak

Thank you for contributing! This project uses its own methodology — the pipeline improves itself, governed by the **Anti-Bias Guard**.

## How to contribute

### Bug reports
Open a GitHub issue with:
- What you expected
- What happened
- Which IDE/model you were using
- The relevant section of `state.json` and the failing work item

### Feature requests
Open a GitHub issue. Describe:
- What failure mode does this prevent?
- Is it useful for ALL types of work? (not just your current project type)

### Pull requests

1. Fork the repo
2. Create a branch: `git checkout -b improve/description`
3. Make your changes
4. **Apply the Anti-Bias Guard** (mandatory for spec/ changes):

```
Before modifying ANY file in spec/:

1. WHAT failure mode does this change prevent?
   → If you can't name a specific failure, it's not an improvement.

2. IS this useful for ALL types of work?
   → If it only helps ONE type (e.g., only frontend), it's a convenience, not a spec change.

3. SCENARIO TEST — Would this change help in these 3 different scenarios?
   a) A backend data model migration batch
   b) A frontend component feature batch
   c) A security hardening batch
   → If it only helps 1 of 3, don't add it to the spec.

4. COULD this change HURT a different type of work?

5. COOLDOWN — Does this still feel like a good idea after sleeping on it?
```

5. Submit the PR with your Anti-Bias Guard answers in the PR description

### Adapter contributions
Want to add an adapter for a new IDE or AI tool? These are welcome without the Anti-Bias Guard — adapters are integrations, not process changes. See `adapters/generic/README.md` for the pattern.

### Documentation improvements
PRs for docs/ and adapters/ are welcome without the Anti-Bias Guard — these are informational, not procedural.

## Code of conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
