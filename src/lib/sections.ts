/**
 * 화면에 보이는 섹션 라벨을 한곳에서 관리한다.
 * URL과 컬렉션 식별자는 영문(posts/devlog/projects)으로 두고, 라벨만 한글.
 * 네비게이션과 각 페이지의 h1 · <title>이 모두 여기를 참조한다.
 */
export const sections = {
  posts: {
    href: '/posts/',
    label: '글',
    description: '사유와 감상. 작품에 대한 글이면 대상을 밝힌다.',
  },
  devlog: {
    href: '/devlog/',
    label: '개발일지',
    description: '프로젝트에 종속된 개발 기록.',
  },
  projects: {
    href: '/projects/',
    label: '프로젝트',
    description: '개발일지의 허브.',
  },
} as const;

export type SectionName = keyof typeof sections;

/** 네비게이션에 나가는 순서. */
export const navSections = Object.values(sections);
