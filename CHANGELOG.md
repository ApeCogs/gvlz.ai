# Changelog

All notable changes to the GVLZ.ai website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added - 2025-08-12

#### Archive Pages Implementation
Implemented comprehensive date-based archive pages to match Simon Willison's blog structure. This allows users to browse posts by year, month, or specific day.

##### Files Created:
1. **`src/pages/[year]/index.astro`** - Year archive page
   - Displays all posts from a specific year
   - Groups posts by month with post counts
   - Shows month sections with links to month archives
   - Includes sidebar navigation with links to each month

2. **`src/pages/[year]/[month]/index.astro`** - Month archive page
   - Displays all posts from a specific month
   - Groups posts by day with post counts
   - Shows day sections with full date formatting
   - Includes sidebar navigation with links to each day and year archive

##### Files Modified:
- **`src/pages/[year]/[month]/[day]/index.astro`** - Day archive page (already existed)
  - No modifications needed, already properly implemented

##### URL Structure:
- `/2024/` - Shows all posts from 2024
- `/2024/01/` - Shows all posts from January 2024
- `/2024/01/15/` - Shows all posts from January 15, 2024

##### Technical Implementation Details:

###### Year Archive (`[year]/index.astro`):
- Uses `getStaticPaths` to generate pages for each year that has content
- Fetches all content collections (entries, blogmarks, notes, quotations)
- Groups content by year using Map data structure
- Secondary grouping by month for display organization
- Sorts content in reverse chronological order
- Displays content using existing component items (EntryItem, BlogmarkItem, etc.)
- Styled month headers with purple accent border
- Post count badges for each grouping

###### Month Archive (`[year]/[month]/index.astro`):
- Similar structure to year archive but groups by month then day
- Uses numeric month format (01, 02, etc.) for URLs
- Displays full month names in UI (January, February, etc.)
- Day headers show full date with weekday
- Lighter styling with single-line borders for day sections
- Navigation includes link back to year archive

###### Shared Features:
- All archive pages filter out draft content (`!data.isDraft`)
- Consistent navigation structure in sidebar
- Responsive layout matching the main site design
- Support for all content types (entries, blogmarks, notes, quotations)
- Proper sorting and date handling
- Empty state messages when no content exists

##### Benefits:
1. **Improved Navigation**: Users can now browse content chronologically at different granularities
2. **Better Content Discovery**: Easy to find all posts from a specific time period
3. **SEO Enhancement**: More entry points for search engines to index content
4. **User Experience**: Matches expected blog navigation patterns from sites like Simon Willison's

##### Testing Performed:
- Verified year archive displays correctly at `/2024/`
- Confirmed month archive works at `/2024/01/`
- Tested day archive continues to function at `/2024/01/15/`
- Checked that all content types render properly
- Validated navigation links between archive levels
- Ensured post counts are accurate
- Confirmed empty states work when no content exists

### Next Steps:
- Consider adding pagination if archive pages become too long
- Add previous/next year navigation
- Consider adding a calendar view for month archives
- Add breadcrumb navigation for better UX