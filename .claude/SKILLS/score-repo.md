# score-repo

Score a GitHub repo against the user's profile: is it worth contributing to?

## Trigger

User says: "score this repo", "should I contribute to X", "is this repo worth it", "check this repo"

## Steps

### 1. Ask for the repo

If no repo URL provided, ask:
> "Which GitHub repo? (e.g. https://github.com/owner/repo)"

### 2. Load user profile

Read `src/data/profile.md` to extract:
- **Strong skills** — can contribute immediately
- **Solid skills** — minor ramp-up needed
- **Target ecosystems** — priority order
- **Repo match criteria** — user's own thresholds

### 3. Extract owner/repo from URL

### 4. Fetch in parallel

```
GET https://api.github.com/repos/{owner}/{repo}
→ stars, open_issues_count, pushed_at, archived, language, topics

GET https://api.github.com/repos/{owner}/{repo}/pulls?state=closed&sort=updated&direction=desc&per_page=20
→ filter merged_at != null, calc avg days (merged_at - created_at), find most recent merged_at

GET https://api.github.com/repos/{owner}/{repo}/pulls?state=open&sort=created&direction=asc&per_page=50
→ count PRs older than 90 days → stale ratio

GET https://api.github.com/repos/{owner}/{repo}/issues?state=open&per_page=20&sort=updated&direction=desc
→ scan titles/labels for skill keywords, check maintainer reply activity
```

### 5. Score repo health

| Signal | GREEN | YELLOW | RED |
|---|---|---|---|
| Last merged PR | < 60 days ago | 60–180 days | > 180 days |
| Avg merge time | < 7 days | 7–30 days | > 30 days |
| Stale PR ratio | < 20% | 20–50% | > 50% |
| Issues labeled | yes | some | none |
| Archived | no | — | yes |

### 6. Match repo against profile

Check repo language + topics + open issue titles against profile skills:

- **STRONG MATCH** — repo language/stack is in user's "Strong skills"
- **SOLID MATCH** — repo language/stack is in user's "Solid skills"
- **WEAK MATCH** — outside user's skill set
- **NO MATCH** — completely unrelated stack

Scan open issue titles for keywords matching user skills (e.g. "React", "TypeScript", "Node", "hooks", "async", "test", "Cypress"). List up to 3 specific issues the user could realistically fix.

### 7. Output verdict

Use stars (⭐) out of 5 and colored emoji (🟢 🟡 🔴) instead of text labels. Keep detail short.

```
Repo: owner/repo
Stars: X | Language: Y | Open issues: Z

REPO HEALTH
🟢 Last merge      ⭐⭐⭐⭐⭐   3 days ago
🟢 Avg merge time  ⭐⭐⭐⭐⭐   2.1 days (last 10 PRs)
🟢 Stale PRs       ⭐⭐⭐⭐⭐   0 open stale
🔴 Issue labels    ⭐⭐☆☆☆   None used
🟢 Archived        ⭐⭐⭐⭐⭐   No

SKILL MATCH
🟢 Stack           ⭐⭐⭐⭐⭐   React + TypeScript — your core
🟢 Issues found    ⭐⭐⭐⭐☆   4 issues you can fix today

  · #255 — "Function components cannot be given refs"
  · #248 — "Invalid date warning in StrictMode"
  · #231 — "onChange fires twice"

VERDICT: ✅ INVEST TIME
         or
VERDICT: ⚠️  RISKY
         or
VERDICT: ❌ SKIP
```

Rating scale:
- 🟢 ⭐⭐⭐⭐⭐ = GREEN (excellent)
- 🟡 ⭐⭐⭐☆☆ = YELLOW (caution)
- 🔴 ⭐⭐☆☆☆ = RED (bad)
- 🔴 ⭐☆☆☆☆ = DEAD

### 8. Verdict logic

Tally the health signals:

- 4–5 green → ✅ INVEST TIME
- 3 green + skill match strong → ✅ INVEST TIME
- 2–3 green OR last merge > 180 days as the only red → ⚠️ RISKY
- Last merge RED + avg merge RED → ❌ SKIP
- Archived or 0 merges ever → ❌ SKIP

Single yellow (e.g. merge gap) with everything else green + strong skill match = ✅ INVEST TIME, not RISKY.

### 9. Recommend next step

- ✅ INVEST TIME → pick the top matched issue, comment "I'd like to work on this", open PR within 3 hours
- ⚠️ RISKY → comment on the issue first, wait 3 days for maintainer reply before writing code
- ❌ SKIP → move on, don't waste your streak
