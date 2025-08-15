import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // Get all content
  const entries = await getCollection('entries', ({ data }) => !data.isDraft);
  const blogmarks = await getCollection('blogmarks', ({ data }) => !data.isDraft);
  const quotations = await getCollection('quotations', ({ data }) => !data.isDraft);
  const notes = await getCollection('notes', ({ data }) => !data.isDraft);

  // Combine all content
  const allContent = [
    ...entries.map(e => ({
      title: e.data.title,
      pubDate: e.data.created,
      link: `/${e.data.created.getFullYear()}/${(e.data.created.getMonth() + 1).toString().padStart(2, '0')}/${e.data.created.getDate().toString().padStart(2, '0')}/${e.slug}/`,
      description: e.body.substring(0, 200) + '...',
    })),
    ...blogmarks.map(b => ({
      title: `Link: ${b.data.linkTitle}`,
      pubDate: b.data.created,
      link: `/${b.data.created.getFullYear()}/${(b.data.created.getMonth() + 1).toString().padStart(2, '0')}/${b.data.created.getDate().toString().padStart(2, '0')}/${b.slug}/`,
      description: b.body.substring(0, 200) + '...',
    })),
    ...quotations.map(q => ({
      title: `Quote from ${q.data.source}`,
      pubDate: q.data.created,
      link: `/${q.data.created.getFullYear()}/${(q.data.created.getMonth() + 1).toString().padStart(2, '0')}/${q.data.created.getDate().toString().padStart(2, '0')}/${q.slug}/`,
      description: q.body.substring(0, 200) + '...',
    })),
    ...notes.map(n => ({
      title: n.data.title || 'Note',
      pubDate: n.data.created,
      link: `/${n.data.created.getFullYear()}/${(n.data.created.getMonth() + 1).toString().padStart(2, '0')}/${n.data.created.getDate().toString().padStart(2, '0')}/${n.slug}/`,
      description: n.body.substring(0, 200) + '...',
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: "Gabriel Velazquez Lopez's Blog",
    description: 'Personal blog about technology, programming, and thoughts',
    site: context.site || 'https://gvlz.ai',
    items: allContent,
    customData: `<language>en-us</language>`,
  });
}