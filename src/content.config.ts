import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const post = z.object({
  title: z.string(),
  description: z.string().optional(),
  pubDate: z.coerce.date(),
});

// 글 하나가 폴더 하나. `<slug>/index.mdx`가 본문이고, 같은 폴더의
// assets/ 안 이미지를 상대경로로 참조한다. index만 잡아야 assets가
// 컬렉션 항목으로 딸려 들어오지 않는다.
const entryPattern = '**/index.{md,mdx}';

const posts = defineCollection({
  loader: glob({ pattern: entryPattern, base: './src/content/posts' }),
  schema: post.extend({
    // 외부 작품에 대한 글일 때만 채운다. 없으면 대상이 없는 사유 글.
    // title 외에는 개별적으로 생략 가능 — 화면에서 구분자와 함께 빠진다.
    work: z
      .object({
        title: z.string(),
        creator: z.string().optional(),
        year: z.number().optional(),
        medium: z.enum(['film', 'game', 'animation', 'comic', 'book']).optional(),
      })
      .optional(),
  }),
});

const devlog = defineCollection({
  loader: glob({ pattern: entryPattern, base: './src/content/devlog' }),
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

export const collections = { posts, devlog, projects };
