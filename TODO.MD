# TODO: GVLZ.ai Blog - Date/Timezone Bug Fix and Project Setup

## Critical Issue: Date Timezone Inconsistencies

### Problem Statement
Posts are displaying incorrect dates across different parts of the site due to conflicting date adjustment mechanisms. A post dated 2024-01-18 appears as:
- ✅ Correct (01/18) on homepage entry component  
- ❌ Wrong (January 17) in post sidebar
- ❌ Wrong archive placement (/2024/01/17/ instead of /2024/01/18/)

### Root Cause Analysis

#### Dual Date Adjustment System Conflict
The codebase has two competing date adjustment mechanisms:

1. **Content Config (`/src/content/config.ts`)**
   - Automatically converts simple dates (YYYY-MM-DD) to noon PST
   - Applies transformation: `2024-01-18` → `2024-01-18T12:00:00-08:00`
   - This runs at content collection parsing time

2. **`adjustDateForPST` Utility (`/src/utils/dateUtils.ts`)**
   - Attempts to "fix" dates that appear to be at midnight UTC
   - Converts them to noon PST
   - Only used in SOME components, creating inconsistency

#### Inconsistent Usage Pattern

| Location | File | Uses adjustDateForPST | Result |
|----------|------|----------------------|---------|
| Homepage Entry | `/src/components/EntryItem.astro` | ✅ Yes | Correct date |
| Homepage List | `/src/pages/index.astro` | ❌ No | Wrong date |
| Post Sidebar | `/src/pages/[year]/[month]/[day]/[slug].astro` (line 183-184) | ❌ No | Wrong date |
| Post URL Gen | `/src/pages/[year]/[month]/[day]/[slug].astro` (line 28) | ✅ Yes | Correct URL |
| Archive Pages | `/src/pages/[year]/[month]/[day]/index.astro` | ❌ No | Wrong grouping |

### Files Affected

#### Files Using `adjustDateForPST` (need updating):
- `/src/components/EntryItem.astro` (line 16)
- `/src/pages/[year]/[month]/[day]/[slug].astro` (lines 5, 28, 64, 65)

#### Files NOT Using Adjustment (already correct):
- `/src/pages/index.astro`
- `/src/pages/[year]/index.astro`
- `/src/pages/[year]/[month]/index.astro` 
- `/src/pages/[year]/[month]/[day]/index.astro`
- `/src/components/BlogmarkItem.astro`
- `/src/components/NoteItem.astro`
- `/src/components/QuotationItem.astro`

## Solution Plan

### Approach: Remove Redundant Date Adjustment
Since the content config already handles PST conversion properly, we should:
1. Delete the `adjustDateForPST` utility entirely
2. Use `item.data.created` directly everywhere
3. This creates a single source of truth for date handling

### Implementation Steps

#### Step 1: Setup Version Control
- [x] Document current state in TODO.MD
- [ ] Create .gitignore file
- [ ] Initialize git repository
- [ ] Create GitHub repository
- [ ] Push initial commit
- [ ] Setup Vercel deployment

#### Step 2: Fix Date Handling
- [ ] Create feature branch: `fix/date-timezone-issues`
- [ ] Delete `/src/utils/dateUtils.ts`
- [ ] Update `/src/components/EntryItem.astro`:
  - Remove line 3: `import { adjustDateForPST } from '../utils/dateUtils';`
  - Change line 16: `const date = adjustDateForPST(entry.data.created);` → `const date = entry.data.created;`
- [ ] Update `/src/pages/[year]/[month]/[day]/[slug].astro`:
  - Remove line 5: `import { adjustDateForPST } from '../../../../utils/dateUtils';`
  - Change line 28: `const date = adjustDateForPST(item.data.created);` → `const date = item.data.created;`
  - Change line 64: `const nextDate = nextEntry ? adjustDateForPST(nextEntry.data.created) : null;` → `const nextDate = nextEntry ? nextEntry.data.created : null;`
  - Change line 65: `const prevDate = prevEntry ? adjustDateForPST(prevEntry.data.created) : null;` → `const prevDate = prevEntry ? prevEntry.data.created : null;`

#### Step 3: Testing Checklist
- [ ] Create test post with date 2024-01-18
- [ ] Verify homepage shows correct date (01/18)
- [ ] Verify post URL is `/2024/01/18/[slug]/`
- [ ] Verify sidebar shows "Friday, January 18, 2024"
- [ ] Verify post appears in `/2024/01/18/` archive
- [ ] Test edge cases:
  - [ ] Post at 11:59 PM PST
  - [ ] Post at 12:01 AM PST
  - [ ] Posts from previous year
  - [ ] Posts from different months

#### Step 4: Deployment
- [ ] Commit changes with descriptive message
- [ ] Create pull request
- [ ] Review changes
- [ ] Merge to main
- [ ] Verify Vercel deployment
- [ ] Test production site

## Future Improvements

### Enhanced Date Handling
1. **Add timezone display option**: Show times in user's local timezone
2. **Relative time display**: "2 hours ago", "yesterday", etc.
3. **Date formatting consistency**: Centralize all date formatting logic
4. **Timezone configuration**: Allow site-wide timezone setting in config

### Content Management
1. **Obsidian integration**: Better workflow for creating posts from Obsidian
2. **Draft preview**: Separate preview environment for draft posts
3. **Scheduled publishing**: Support future-dated posts
4. **Content validation**: Ensure all dates are valid before build

### Testing Infrastructure
1. **Unit tests**: Test date parsing and formatting functions
2. **Integration tests**: Test archive page generation
3. **E2E tests**: Verify dates display correctly across site
4. **CI/CD pipeline**: Automated testing before deployment

## Technical Notes

### Why Dates Were Wrong
JavaScript's `Date` constructor interprets date-only strings (like "2024-01-18") as UTC midnight. When displayed in PST (UTC-8), this becomes the previous day at 4:00 PM. The content config fixes this by explicitly setting noon PST, ensuring the date stays on the intended day regardless of timezone.

### Content Config Date Parser
```typescript
// From /src/content/config.ts
const pstDate = z.union([z.string(), z.date()]).transform((val) => {
  if (val instanceof Date) return val;
  
  // For simple dates, add noon PST to avoid timezone issues
  if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
    return new Date(`${val}T12:00:00-08:00`);
  }
  
  return new Date(val);
});
```

This elegant solution handles the timezone issue at the data layer, making additional adjustments unnecessary.

## Project Setup Requirements

### GitHub Repository Settings
- Repository name: `gvlz-website`
- Description: "Personal blog at gvlz.ai - Built with Astro"
- Public repository
- Initialize with README: No (we'll push existing code)
- Add .gitignore: No (we'll create custom one)
- Choose license: MIT or your preference

### Vercel Configuration
- Import from GitHub
- Framework Preset: Astro
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Development Command: `npm run dev`

### Environment Variables (if needed)
None currently required, but reserve for future:
- `SITE_URL`: https://gvlz.ai
- `TIMEZONE`: America/Los_Angeles

## References
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [JavaScript Date Timezone Issues](https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off)
- [Vercel Astro Deployment](https://vercel.com/docs/frameworks/astro)

---

*Last Updated: 2025-01-12*
*Issue Discovered: Post dated 2024-01-18 displaying as January 17 in sidebar*
*Root Cause: Dual date adjustment system causing double conversion*
*Solution: Remove redundant adjustDateForPST utility*