---
description: Bump the app version across Chef Next Door and update the changelog
---

# Sync Version

Update the version across all relevant files in Chef Next Door and add a changelog entry.

## What I Need

Provide:
1. The new version number (e.g., `1.0.2`)
2. A brief description of what changed (features, fixes, etc.)

## What I'll Do

1. Read the current version in `src/app/components/side-menu/BottomBranding.tsx`
2. Update the version string in `BottomBranding.tsx` (shown in the side menu)
3. Update the version string in `src/routes/version.lazy.tsx` (shown on the /version page)
4. Add a new changelog entry to the top of `src/routes/version.lazy.tsx` changelog array
5. Add the same entry to `CHANGELOG.md` with full technical detail (internal use only)
6. Run `pnpm check-types` to verify no type errors

## Rules for Changelog Entries

- `src/routes/version.lazy.tsx` is **public** — use only user-facing language, no internal service names (Supabase, SendGrid, etc.), no env var names, no infrastructure details
- `CHANGELOG.md` is **internal** — include full technical context, service names, root causes, file paths

## Files Updated

- `src/app/components/side-menu/BottomBranding.tsx` — version label in the side menu
- `src/routes/version.lazy.tsx` — public /version changelog page
- `CHANGELOG.md` — internal developer changelog
