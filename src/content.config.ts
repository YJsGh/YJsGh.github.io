import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const post = z.object({
  title: z.string(),
  description: z.string().optional(),
  pubDate: z.coerce.date(),
});

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: post,
});

const readings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/readings' }),
  schema: post.extend({
    work: z.object({
      title: z.string(),
      creator: z.string(),
      year: z.number(),
      medium: z.enum(['film', 'game', 'animation', 'comic', 'book']),
    }),
  }),
});

const devlog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/devlog' }),
  schema: post.extend({
    project: reference('projects'),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    startDate: z.coerce.date(),
  }),
});

export const collections = { essays, readings, devlog, projects };
