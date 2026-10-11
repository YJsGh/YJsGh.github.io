import type { CollectionEntry } from 'astro:content';
import { mediumLabels } from './medium';

export type Work = NonNullable<CollectionEntry<'posts'>['data']['work']>;

function join(parts: Array<string | number | undefined>): string {
  return parts.filter((part) => part !== undefined && part !== '').join(' · ');
}

/** 글 상세용 한 줄: `작품제목 · 창작자 · 연도 · 매체`. 없는 필드는 구분자까지 빠진다. */
export function workLine(work: Work): string {
  return join([
    work.title,
    work.creator,
    work.year,
    work.medium ? mediumLabels[work.medium] : undefined,
  ]);
}

/** 목록용 축약형: `작품제목 (연도)`. year가 없으면 괄호까지 뺀다. */
export function workBrief(work: Work): string {
  return work.year === undefined ? work.title : `${work.title} (${work.year})`;
}
