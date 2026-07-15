---
description: Draft a GitHub issue with description and acceptance criteria, then create it with gh
---

Ask the user what the issue is about if `$ARGUMENTS` is empty. Otherwise use `$ARGUMENTS` as the topic.

Then create a GitHub issue using `gh issue create` with:

**Title**: short, lowercase, action-oriented (e.g. "add cuisine filter to cooks page", "fix dish image upload on mobile") — no ticket numbers, no emojis.

**Body**:

```
### Description

[1–2 sentences. What problem does this solve or what needs to be built.]

### Acceptance Criteria

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]
```

Rules:
- Acceptance criteria must be specific and testable — not vague like "it works"
- Each criterion is one clear action or outcome
- 3–6 criteria is the sweet spot; don't pad or over-engineer
- Description is plain English, no jargon unless it's already in the codebase
- Don't add labels, assignees, or milestones unless the user asks
