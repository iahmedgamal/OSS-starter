---
description: Open a GitHub PR with the HomeEats PR template, comparing current branch to main
---

Compare the current branch against `main` using `git log main..HEAD --oneline` and `git diff main...HEAD --stat`, then read the actual diff with `git diff main...HEAD` to understand what changed.

Then open a GitHub PR using `gh pr create` with this exact template filled in based on the diff:

**Title**: short, lowercase, describes what was done (e.g. "add privacy policy page", "fix order card layout") — no ticket numbers, no emojis.

**Body**:

```
# 📖 Description

[2–3 sentences max. What was added/changed and why. Keep it human, casual tone, typos are fine.]

## 🔷 Issue

#[issue number if inferrable from branch name, else leave blank]

## 🔄 Change Type

- [ ] New feature (non-breaking change which adds functionality)
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] Refactor (no functional change)
- [ ] Breaking change

[check the one that applies]

## 📷 Screenshots

## 🧪 How Has This Been Tested?

I tested it locally as you can see in the video.

## 🚧 Affected Parts

[list the files or areas that changed, e.g. "the footer", "added a new page", "updated the routes constant"]
```

Rules:
- Keep description short and to the point, don't over-explain
- Write like a human, don't make it sound AI-generated
- Only check one Change Type box
- Affected Parts should reflect the actual files changed, not generic descriptions
- If the branch name contains a number (e.g. `192-privacy-policy`), use that as the issue number
