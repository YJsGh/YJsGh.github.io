/** readings 스키마의 medium enum을 화면에 보여줄 이름. */
export const mediumLabels = {
  film: '영화',
  game: '게임',
  animation: '애니메이션',
  comic: '만화',
  book: '책',
} as const;

export type Medium = keyof typeof mediumLabels;
