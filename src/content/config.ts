import { defineCollection, z } from 'astro:content';

// Custom date parser that treats date strings as PST/PDT
const pstDate = z.union([
  z.string(),
  z.date()
]).transform((val) => {
  // If it's already a Date, return it
  if (val instanceof Date) {
    return val;
  }
  
  // If it's a string
  const str = val;
  
  // If it's just a date (YYYY-MM-DD), append noon PST to avoid timezone issues
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    // Add T12:00:00-08:00 (noon PST)
    // This ensures the date stays on the intended day
    return new Date(`${str}T12:00:00-08:00`);
  }
  
  // If it already has a time, parse it as-is
  return new Date(str);
});

const entries = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    created: pstDate,
    tags: z.array(z.string()).default([]),
    isDraft: z.boolean().default(false),
    series: z.string().optional(),
    cardImage: z.string().optional(),
  })
});

const blogmarks = defineCollection({
  type: 'content',
  schema: z.object({
    linkUrl: z.string().url(),
    linkTitle: z.string(),
    viaUrl: z.string().url().optional(),
    viaTitle: z.string().optional(),
    created: pstDate,
    tags: z.array(z.string()).default([]),
    isDraft: z.boolean().default(false),
  })
});

const quotations = defineCollection({
  type: 'content',
  schema: z.object({
    source: z.string(),
    sourceUrl: z.string().url().optional(),
    context: z.string().optional(),
    created: pstDate,
    tags: z.array(z.string()).default([]),
    isDraft: z.boolean().default(false),
  })
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    created: pstDate,
    tags: z.array(z.string()).default([]),
    isDraft: z.boolean().default(false),
  })
});

export const collections = {
  entries,
  blogmarks,
  quotations,
  notes,
};