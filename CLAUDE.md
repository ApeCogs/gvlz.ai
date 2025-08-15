# CLAUDE.md - GVLZ.ai Astro Blog Project

## Project Overview
This is a personal blog website for Gabriel Velazquez Lopez at gvlz.ai, built with Astro and deployed to Vercel via GitHub. The design and functionality mirror Simon Willison's blog (simonwillison.net).

## Technology Stack
- **Framework**: Astro (static site generator)
- **Deployment**: Vercel
- **Version Control**: GitHub
- **Styling**: CSS (following Simon's minimalist approach)
- **Content**: Markdown-based blog posts

## Architecture Overview

### Content Types (Based on Simon's Blog)
Simon's blog has four main content types that we should implement:

1. **Entry** (Full blog posts)
   - Title, body, slug, created date, tags
   - Support for series (related posts)
   - Custom metadata and card images
   - Word count display for longer posts

2. **Blogmark** (Link posts with commentary)
   - External link with title
   - Commentary/description
   - Optional "via" link for attribution
   - Tags and timestamps

3. **Quotation** (Notable quotes)
   - Quote text
   - Source and optional source URL
   - Context information
   - Tags

4. **Note** (Short-form content)
   - Brief text content
   - Optional title
   - Markdown rendering
   - Tags

### Layout Structure

#### Homepage Components
1. **Header Section**
   - Site title: "Gabriel Velazquez Lopez's Blog"
   - Navigation menu (left of title):
     - About
     - TILs (Today I Learned)
   - RSS/Atom feed icon

2. **Sub-header Section**
   - Current tags display (top 5 most used tags)
   - Site search functionality
   - Purple divider line (visual separator)

3. **Content Area (Two Column Layout)**
   - **Primary Column (Left/Main)**:
     - "Recent" section header
     - Mixed content feed showing all content types
     - Full post display for shorter content
     - Truncated display with word count for longer posts
     - Date headers for grouping posts by day
   
   - **Secondary Column (Right/Sidebar)**:
     - "Highlights" section
     - Featured/pinned posts list
     - Sponsor/promotional content area

#### Post Display Features
- **Truncation Logic**: Shows full content for short posts, truncates longer ones with "[... X words]" link
- **Tags**: Displayed below each post with post counts
- **Timestamps**: Human-readable format (e.g., "11:30 pm")
- **Permalinks**: Date-based URLs (YYYY/Month/DD/slug/)

### File Structure
```
gvlz-website/
├── src/
│   ├── pages/
│   │   ├── index.astro          # Homepage
│   │   ├── about.astro          # About page
│   │   ├── tags/
│   │   │   └── [tag].astro      # Tag archive pages
│   │   ├── search.astro         # Search page
│   │   ├── [year]/
│   │   │   ├── index.astro      # Year archive page
│   │   │   └── [month]/
│   │   │       ├── index.astro  # Month archive page
│   │   │       └── [day]/
│   │   │           ├── index.astro    # Day archive page
│   │   │           └── [slug].astro   # Individual posts
│   │   └── atom/
│   │       └── everything.xml.js # RSS/Atom feed
│   ├── content/
│   │   ├── entries/              # Full blog posts
│   │   ├── blogmarks/            # Link posts
│   │   ├── quotations/           # Quotes
│   │   └── notes/                # Short notes
│   ├── components/
│   │   ├── Layout.astro          # Base layout
│   │   ├── Header.astro          # Site header
│   │   ├── PostList.astro        # Mixed content list
│   │   ├── Entry.astro           # Entry component
│   │   ├── Blogmark.astro        # Blogmark component
│   │   ├── Quotation.astro       # Quote component
│   │   ├── Note.astro            # Note component
│   │   └── TagCloud.astro        # Tag display
│   └── styles/
│       └── global.css            # Global styles
├── public/
│   └── favicon.ico
└── astro.config.mjs
```

## Implementation Guidelines

### Content Collections
Use Astro's Content Collections API to manage different content types:
```typescript
// src/content/config.ts
const entryCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    created: z.date(),
    tags: z.array(z.string()),
    isDraft: z.boolean().default(false),
    series: z.string().optional(),
    cardImage: z.string().optional(),
  })
});
```

### Styling Approach
- Minimalist design with purple accent color (#7c4dff)
- Clean typography with system fonts
- Responsive two-column layout
- Purple gradient divider/band element
- Subtle hover effects on links

### Search Implementation
- Client-side search using Pagefind or similar
- Search across all content types
- Highlight search terms in results

### Tag System
- Automatic tag extraction from content
- Tag pages showing all content with that tag
- Tag counts displayed inline
- Top tags shown in header

### URL Structure
- Blog posts: `/YYYY/MM/DD/slug/` (e.g., `/2024/01/15/my-post/`)
- Year archive: `/YYYY/` (e.g., `/2024/`)
- Month archive: `/YYYY/MM/` (e.g., `/2024/01/`)
- Day archive: `/YYYY/MM/DD/` (e.g., `/2024/01/15/`)
- Tags: `/tags/tagname/`
- Archive: `/archive/`
- Search: `/search/?q=query`
- RSS: `/atom/everything/`

## Development Workflow

### Content Creation
1. Create markdown files in appropriate content directory
2. Include required frontmatter (title, date, tags)
3. Astro automatically generates pages and updates feeds

### Local Development
```bash
npm run dev     # Start dev server
npm run build   # Build for production
npm run preview # Preview production build
```

### Deployment
- Push to GitHub main branch
- Vercel automatically deploys via GitHub integration
- Environment variables in Vercel dashboard

## Features to Implement

### Phase 1 - Core Blog
- [ ] Basic Astro setup with TypeScript
- [ ] Homepage with mixed content feed
- [ ] Individual post pages
- [ ] Tag system and tag pages
- [ ] RSS/Atom feed
- [ ] Basic styling matching Simon's design

### Phase 2 - Content Types
- [ ] Entry (blog post) support
- [ ] Blogmark (link post) support
- [ ] Quotation support
- [ ] Note support
- [ ] Content truncation logic

### Phase 3 - Enhanced Features
- [ ] Site search functionality
- [ ] Series support for related posts
- [x] Archive pages by date (COMPLETED: Year, Month, Day archives)
- [ ] "Highlights" sidebar section
- [ ] TIL (Today I Learned) section

### Phase 4 - Polish
- [ ] SEO optimization
- [ ] Open Graph tags
- [ ] Performance optimization
- [ ] Analytics integration
- [ ] Dark mode support (optional)

## Important Notes

### Content Management
- All content stored as Markdown files
- Frontmatter for metadata
- Tags are lowercase, alphanumeric only
- Dates in ISO 8601 format

### Performance Considerations
- Static generation for all pages
- Lazy loading for images
- Minimal JavaScript (search only)
- Optimized CSS delivery

### SEO & Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Meta descriptions
- Sitemap generation

## Common Tasks

### Adding a new blog post
1. Create a new `.md` file in `src/content/entries/`
2. Add frontmatter with title, date, and tags
3. Write content in Markdown
4. Commit and push to trigger deployment
5. The post will automatically appear in:
   - The homepage feed
   - The appropriate year archive (e.g., `/2024/`)
   - The appropriate month archive (e.g., `/2024/01/`)
   - The appropriate day archive (e.g., `/2024/01/15/`)
   - Any relevant tag pages

### Adding a new content type
1. Define schema in `src/content/config.ts`
2. Create component in `src/components/`
3. Update PostList component to handle new type
4. Add content directory and sample content

### Updating styles
1. Modify `src/styles/global.css`
2. Keep changes minimal and consistent with existing design
3. Test responsive layout on mobile and desktop

### Working with Archive Pages

#### Archive Page Structure
The site uses a hierarchical date-based archive system:
- **Year Archives** (`/[year]/index.astro`): Groups posts by month, shows all content from a year
- **Month Archives** (`/[year]/[month]/index.astro`): Groups posts by day, shows all content from a month
- **Day Archives** (`/[year]/[month]/[day]/index.astro`): Shows all posts from a specific day

#### Key Implementation Details

##### URL Format
- URLs use numeric format for months: `01`, `02`, etc. (not month names)
- Example: `/2024/01/15/` not `/2024/january/15/`
- This matches the format used in individual post URLs

##### Content Handling
- All archive pages fetch content from all collections (entries, blogmarks, notes, quotations)
- Draft content is filtered out using `!data.isDraft`
- Content is sorted in reverse chronological order (newest first)
- Each archive level shows appropriate grouping with post counts

##### Static Path Generation
- Archive pages use Astro's `getStaticPaths` to pre-generate all necessary pages
- Pages are only generated for dates that have actual content
- Empty archive pages are not created

##### Component Usage
- Archive pages reuse existing content components:
  - `EntryItem.astro` for blog entries
  - `BlogmarkItem.astro` for link posts
  - `NoteItem.astro` for notes
  - `QuotationItem.astro` for quotes
- This ensures consistent rendering across the site

#### Adding New Archive Features
When extending archive functionality:
1. Maintain the existing URL structure for backwards compatibility
2. Ensure all content types are included in archive pages
3. Keep the grouping logic consistent (year→month→day hierarchy)
4. Update navigation links in the sidebar appropriately
5. Test that static generation works for all date combinations

#### Troubleshooting Archive Pages
- If archive pages show wrong dates: Check the `adjustDateForPST` utility function
- If content is missing: Verify the `isDraft` field in frontmatter
- If pages aren't generating: Check that content files have valid date formats
- If navigation is broken: Ensure month numbers are zero-padded (01, not 1)

## References
- Simon Willison's blog: https://simonwillison.net
- Astro documentation: https://docs.astro.build
- Vercel deployment: https://vercel.com/docs