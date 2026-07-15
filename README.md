# OSS Starter
AI-powered OSS contribution habit builder. Inspired by CodeTriage, rebuilt for the AI era.

## The Idea
3 hours → 3 contributions. Do that consistently for 2-3 years → you become great at exactly what you built.

Most devs never contribute to OSS because the barrier feels high. CodeTriage proved that small, frequent actions compound. This takes that idea further: AI matches you to issues you can actually solve, estimates effort so you know if it fits your schedule, and tracks your streak so the habit sticks.

## MVP features
- [x] Show good first issues in one place
- [x] Show total count of available issues
- [ ] Pagination / load more
- [ ] Search GitHub repositories
- [ ] Filter by language
- [ ] Filter by difficulty
- [ ] Repo detail page (open issues count, last activity, language, stars)
- [ ] Show last activity
- [ ] Check if they are merging PRs
- [ ] Check if they are active

### AI features (next)
- [ ] Smart issue matching — ranked by your skills and past contributions
- [ ] Effort estimation — "this looks like a 1-hour fix" before you click in
- [ ] Contribution streak tracker — your habit, visualized
- [ ] AI-generated first comment suggestions to unblock you on unfamiliar issues
- [ ] Weekly digest: 3 issues, matched to your schedule

---

## Main tech stack 
- Vue 
- TypeScript

## Example page

Repo: vuejs/core
Language: TypeScript
Beginner score: 7/10
Good first issues: 12

## Project Setup

```sh
npm install
```

```sh
npm run dev
```

## E2E Testing 
This project uses Cypress for e2e testing, you just need to install nodejs if it's not installed, 