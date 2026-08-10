const formatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

/** 목록/본문에 보여줄 한글 날짜. */
export function formatDate(date: Date): string {
  return formatter.format(date);
}

/** <time datetime="..."> 속성용 ISO 날짜. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
