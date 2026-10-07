import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.string().min(1),
    order: z.number(),
    image: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .default('study-interior'),
    tags: z.array(z.string()),
    role: z.string(),
    context: z.string(),
    challenge: z.string().optional(),
    contributions: z.array(z.string()),
    pipeline: z
      .array(
        z.object({
          label: z.string(),
          caption: z.string().optional(),
        }),
      )
      .default([]),
    featured: z.boolean().default(false),
    url: z.url().optional(),
  }),
});

const podcasts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/podcasts' }),
  schema: z.object({
    title: z.string(),
    persianTitle: z.string(),
    subtitle: z.string(),
    summary: z.string(),
    order: z.number(),
    image: z.string().regex(/^[a-z0-9-]+$/),
    topics: z.array(z.string()),
    listenUrl: z.url().optional(),
    episodes: z
      .array(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          audioSrc: z.string().optional(),
          url: z.url().optional(),
        }),
      )
      .default([]),
  }),
});

const experiments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lab' }),
  schema: z.object({ title: z.string(), order: z.number(), url: z.url().optional() }),
});
export const collections = { projects, podcasts, experiments };
