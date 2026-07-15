---
description: Refactor component to match HomeEatsApp coding standards
---

# Refactor Component to Match HomeEatsApp Standards

Refactor the selected component or file to match the HomeEatsApp coding patterns defined in `CLAUDE.md`.

## Steps

1. **Read CLAUDE.md** first to understand the coding standards

2. **Read the target component** that needs refactoring

3. **Analyze and refactor** following these guidelines:

### Component Architecture

- Main export component at top, sub-components defined below
- Function components only (no class components)
- Composition pattern: main component composes smaller focused components
- **CRITICAL**: Never use `{/* Comment */}` to label JSX sections - extract to sub-components instead
- Define sub-components in the same file for simple, focused pieces
- No comments - code should be self-documenting
- Prefer named exports

### Color System

Use the Chef Next Door custom theme colors defined in globals.css:

- Primary accent: `text-primary` / `bg-primary` (#9E005D) - main brand color
- Light accents: `text-floral` / `bg-floral` (#fff9eb) - light backgrounds
- Neutral warm: `text-cream` / `bg-cream` (#f3edd7) - secondary background
- Dark text: `text-brown` (#2e190f) - primary text color
- Deep dark: `text-coffee` / `bg-coffee` (#1e0f07) - deep backgrounds
- Neutral: `text-silver` (#d9d9d9) - secondary text, borders
- Light/Dark: `text-white` / `text-black` - high contrast when needed
- Always include `dark:` variants for all color utilities
- --color-light-grey: #C0C0C0;
- Use opacity modifiers like `/30`, `/50` for subtle variants

### TypeScript

- Add proper interfaces for all props
- Remove any `any` types - use proper types from `app/types/`
- Ensure all state is properly typed
- Define types before component declaration

### Styling

- Tailwind CSS only (no custom CSS files)
- Convert any custom CSS to Tailwind utility classes
- Use standard transitions: `transition-all duration-300`
- Add hover states with proper color variants
- Ensure responsive design: `sm:`, `md:`, `lg:` breakpoints
- Always include `dark:` variants for dark mode support

### Structure

- Remove excessive comments - code should be self-explanatory
- Use clear, descriptive variable and function names
- Follow naming conventions:
  - Components: PascalCase (`CookCard`, `DishSelector`)
  - Functions/hooks: camelCase (`useDeliveryDate`, `handleSelect`)
  - Constants: UPPER_SNAKE_CASE (`TABLE_NAMES`, `MAX_ITEMS`)

### Supabase Integration

- Use custom hooks to encapsulate data fetching
- Return data, loading state, and refetch/mutation functions
- Proper error handling without exposing implementation details
- Use typed client/server utilities from utils/supabase/

### File Size

- **Maximum: 350 lines** per file
- Components between 200-350 lines are acceptable
- If approaching limit, extract sub-components to separate files
- Each file should have a single clear responsibility



## Pattern Reference

Look at these files for examples:
- Pages: `apps/web/app/cooks/page.tsx`
- Components: `apps/web/app/components/cuisine/CuisineCard.tsx`
- Custom Hooks: `app/hooks/useDeliveryDate.ts`
- Types: `app/types/cook.ts`, `app/types/dish.ts`

## Output

Provide the refactored component with:

1. **Summary**: Clear explanation of what was changed and why
2. **Improvements**: List of improvements made (TypeScript, structure, styling, accessibility, etc.)
3. **File Size**: Current line count and whether extraction is needed
4. **Recommendations**: Any suggestions for further improvements or component splitting
5. **Complete Code**: The fully refactored component

## Example Transformations

### Before (No Types)

```typescript
export function CookCard({ cook, onSelect }: any) {
  return (
    <div onClick={() => onSelect(cook.id)}>
      <img src={cook.photo} />
      {/* Cook info */}
      <div>{cook.name}</div>
      <div>{cook.rating}</div>
    </div>
  )
}
```

### After (With Types and Sub-Components)

```typescript
import type { Cook } from '@app/types/cook'

interface CookCardProps {
  cook: Cook
  onSelect: (cookId: string) => void
}

export function CookCard({ cook, onSelect }: CookCardProps) {
  return (
    <div
      onClick={() => onSelect(cook.id)}
      className="cursor-pointer rounded-lg border border-silver/30 dark:border-coffee p-4 hover:bg-floral dark:hover:bg-coffee/20 transition-all duration-300"
    >
      <CookPhoto url={cook.photo} name={cook.name} />
      <CookInfo name={cook.name} rating={cook.rating} />
    </div>
  )
}

interface CookPhotoProps {
  url: string
  name: string
}

function CookPhoto({ url, name }: CookPhotoProps) {
  return (
    <img
      src={url}
      alt={name}
      className="w-full h-40 object-cover rounded-md mb-3"
    />
  )
}

interface CookInfoProps {
  name: string
  rating: number
}

function CookInfo({ name, rating }: CookInfoProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-brown dark:text-floral">
        {name}
      </h3>
      <p className="text-sm text-silver dark:text-cream">★ {rating}</p>
    </div>
  )
}
```

### Before (No Dark Mode, Wrong Colors)

```typescript
<button className="bg-blue-500 text-white px-4 py-2">
  Select Cook
</button>
```

### After (With Dark Mode, HomeEats Colors)

```typescript
<button className="bg-primary hover:opacity-90 text-white dark:text-brown px-4 py-2 rounded-md transition-all duration-300">
  Select Cook
</button>
```

## Key Rules to Follow

✅ **DO**:

- Extract sub-components when main component exceeds 300 lines
- Use TypeScript interfaces for all props
- Include dark mode variants for all colors using HomeEats palette
- Use responsive utilities (sm:, md:, lg:)
- Keep files focused and single-responsibility
- Reference types from app/types/
- Use the custom theme colors: primary, brown, coffee, floral, cream, silver

❌ **DON'T**:

- Use `any` types
- Add JSX comment labels instead of sub-components
- Mix custom CSS with Tailwind
- Create components without TypeScript interfaces
- Skip dark mode support with dark: variants
- Add comments to explain code that should be self-documenting
- Use generic Tailwind colors like blue, red, gray - use HomeEats theme colors only


