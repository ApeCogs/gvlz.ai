# GVLZ.ai Personal Blog

A personal blog website built with Astro, deployed to Vercel, and inspired by Simon Willison's blog design.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Content Types Guide

This blog supports four different content types, each designed for different kinds of publishing needs:

### 1. Entry (Full Blog Posts)

**Use for:** Long-form articles, tutorials, deep dives, announcements, or any substantial content.

**Create file:** `src/content/entries/YYYY-MM-DD-slug.md`

**Example:**
```markdown
---
title: "Building a Real-time Data Pipeline with Apache Kafka"
created: 2024-01-15
tags: ["kafka", "data-engineering", "python", "streaming"]
series: "real-time-data-series"
cardImage: "/images/kafka-pipeline.png"
isDraft: false
---

Your full article content here...
```

**When to use:**
- Technical tutorials
- Project announcements  
- Thought pieces
- Conference recaps
- Detailed explanations

### 2. Blogmark (Link Posts with Commentary)

**Use for:** Sharing interesting links with your own commentary or reaction.

**Create file:** `src/content/blogmarks/YYYY-MM-DD-slug.md`

**Example:**
```markdown
---
linkUrl: "https://example.com/cool-ai-tool"
linkTitle: "CoolAI - A New Open Source LLM Framework"
viaUrl: "https://news.ycombinator.com/item?id=123456"
viaTitle: "Hacker News"
created: 2024-01-15
tags: ["ai", "open-source", "llm"]
isDraft: false
---

This looks like a promising alternative to LangChain. The async-first 
design and built-in observability features address two major pain points 
I've had. Particularly interested in their approach to prompt versioning.
```

**When to use:**
- Sharing interesting articles/tools
- Quick reactions to news
- Bookmarking with public notes
- Crediting discoveries from other sources

### 3. Quotation (Notable Quotes)

**Use for:** Capturing memorable quotes from books, talks, articles, or conversations.

**Create file:** `src/content/quotations/YYYY-MM-DD-source.md`

**Example:**
```markdown
---
source: "Bret Victor"
sourceUrl: "http://worrydream.com/#!/TheFutureOfProgramming"
context: "The Future of Programming, 2013"
created: 2024-01-15
tags: ["programming", "history", "innovation"]
isDraft: false
---

The most dangerous thought you can have as a creative person is to 
think you know what you're doing. Because once you think you know 
what you're doing, you stop looking around for other ways of doing 
things.
```

**When to use:**
- Memorable lines from books/articles
- Conference talk highlights
- Wisdom worth preserving
- Historical programming quotes
- Interview excerpts

### 4. Note (Short-form Content)

**Use for:** Quick thoughts, observations, tips, or micro-blog posts.

**Create file:** `src/content/notes/YYYY-MM-DD-slug.md`

**Example:**
```markdown
---
title: "Git tip: interactive rebase" # optional
created: 2024-01-15
tags: ["git", "tips"]
isDraft: false
---

Just discovered you can use `git rebase -i HEAD~3` to interactively 
edit your last 3 commits. Great for cleaning up commit messages before 
pushing to a PR. Use 'r' to reword, 's' to squash, and 'd' to drop commits.
```

**When to use:**
- Quick tips and tricks
- Brief observations
- Status updates
- TIL (Today I Learned) moments
- Micro-blogging
- Quick code snippets

## Choosing the Right Content Type

```
Is it your original content?
├─ YES → Is it substantial (>300 words)?
│        ├─ YES → Use Entry
│        └─ NO → Use Note
└─ NO → Is it primarily someone else's words?
         ├─ YES → Use Quotation
         └─ NO → Use Blogmark (link + commentary)
```

## Publishing Workflow

### 1. Create your content file

Choose the appropriate directory based on content type:
- `src/content/entries/` - Full blog posts
- `src/content/blogmarks/` - Link posts
- `src/content/quotations/` - Quotes
- `src/content/notes/` - Short notes

### 2. Add frontmatter and content

Each content type has specific frontmatter requirements (see examples above).

### 3. Preview locally

```bash
npm run dev
# Open http://localhost:3000
```

### 4. Publish to production

```bash
git add .
git commit -m "Add new [entry/blogmark/quote/note]: [title]"
git push origin main
```

Vercel will automatically deploy your changes.

## File Naming Convention

Use this format for all content files:
```
YYYY-MM-DD-descriptive-slug.md
```

Examples:
- `2024-01-15-kafka-pipeline-tutorial.md`
- `2024-01-15-cool-ai-tool.md`
- `2024-01-15-bret-victor-quote.md`
- `2024-01-15-git-rebase-tip.md`

## Frontmatter Reference

### Common fields (all content types)
- `created`: Date (YYYY-MM-DD format)
- `tags`: Array of lowercase strings
- `isDraft`: Boolean (set to true to hide from production)

### Entry-specific
- `title`: String (required)
- `series`: String (optional, groups related posts)
- `cardImage`: String (optional, preview image path)

### Blogmark-specific
- `linkUrl`: URL (required)
- `linkTitle`: String (required)
- `viaUrl`: URL (optional)
- `viaTitle`: String (optional)

### Quotation-specific
- `source`: String (required)
- `sourceUrl`: URL (optional)
- `context`: String (optional, where/when it was said)

### Note-specific
- `title`: String (optional)

## Tags

Tags should be:
- Lowercase only
- Alphanumeric (no special characters)
- Separated by hyphens for multi-word tags
- Consistent across content types

Good: `["javascript", "web-dev", "react", "tutorial"]`  
Bad: `["JavaScript", "Web Dev", "React.js", "Tutorial!"]`

## Draft Mode

Set `isDraft: true` in frontmatter to:
- Hide content from production site
- Still view it in development mode
- Useful for work-in-progress content

## Project Structure

```
gvlz-website/
├── src/
│   ├── content/           # All content lives here
│   │   ├── entries/       # Full blog posts
│   │   ├── blogmarks/     # Link posts
│   │   ├── quotations/    # Quotes
│   │   └── notes/         # Short notes
│   ├── pages/             # Astro pages
│   ├── components/        # Reusable components
│   └── styles/            # CSS files
├── public/                # Static assets
├── astro.config.mjs       # Astro configuration
└── package.json
```

## Deployment

This site automatically deploys to Vercel when you push to the main branch on GitHub.

- **Production:** https://gvlz.ai
- **GitHub:** [your-github-repo]
- **Vercel Dashboard:** [your-vercel-project]

## Development Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run astro      # Run Astro CLI commands
```

## Support

For questions or issues, please open an issue on GitHub.

## License

© 2024 Gabriel Velazquez Lopez. All rights reserved.