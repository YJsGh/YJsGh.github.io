# YJsGh.github.io

Astro로 만든 개인 블로그. `main`에 푸시하면 GitHub Actions가 빌드해서
GitHub Pages로 배포한다.

## 명령어

```sh
npm run dev      # 개발 서버
npm run build    # dist/ 로 정적 빌드
npm run preview  # 빌드 결과 미리보기
npm run check    # 타입 · 콘텐츠 스키마 검사
```

## 콘텐츠 컬렉션

스키마는 [`src/content.config.ts`](src/content.config.ts)에 있다.
폴더명(=slug)은 영문, 제목은 front matter에 한글로 쓴다.

| 컬렉션     | 위치                   | 성격                       | 고유 필드                              |
| ---------- | ---------------------- | -------------------------- | -------------------------------------- |
| `posts`    | `src/content/posts`    | 사유 글과 감상             | `work?` (title, creator, year, medium) |
| `devlog`   | `src/content/devlog`   | 프로젝트에 종속된 개발일지 | `project` — `projects` 참조            |
| `projects` | `src/content/projects` | devlog의 허브              | `startDate`                            |

### 글 하나 = 폴더 하나

`posts`와 `devlog`는 글마다 폴더를 만들고 본문을 `index.mdx`에 쓴다.
이미지는 같은 폴더의 `assets/`에 넣고 상대경로로 참조한다.

```text
src/content/posts/
└── perfect-days/
    ├── index.mdx
    └── assets/
        └── still.png     ![alt](./assets/still.png)
```

로더가 잡는 패턴은 `**/index.{md,mdx}`라서 `assets/` 안의 파일은
컬렉션 항목이 되지 않는다. slug은 폴더명에서 나온다
(`perfect-days/index.mdx` → `/posts/perfect-days/`).

상대경로 이미지는 Astro가 최적화해서 `/_astro/`로 내보낸다 —
webp 변환, 해시 파일명, `width`/`height` 자동 설정.

컴포넌트를 쓰지 않는 글은 `index.md`로 둬도 된다. `projects`는
허브 문서라 폴더 없이 `<slug>.md` 한 장을 유지한다.

공통 필드는 `title`, `pubDate`, 선택적 `description`.
`projects`만 `pubDate` 대신 `startDate`를 쓴다.

`posts`의 `work`는 optional이다. 외부 작품에 대한 글이면 채우고,
대상이 없는 사유 글이면 비운다. `work` 안에서도 `title`만 필수이고
`creator` · `year` · `medium`은 개별적으로 생략할 수 있다.

표시 형식은 [`src/lib/work.ts`](src/lib/work.ts)에 모여 있다.

| 화면      | 형식                          | 빈 필드                |
| --------- | ----------------------------- | ---------------------- |
| 글 상세   | `작품제목 · 창작자 · 연도 · 매체` | 구분자까지 함께 생략   |
| 글 목록   | `작품제목 (연도)`             | `year` 없으면 괄호 생략 |

`work`가 없는 글에서는 이 줄 자체가 렌더링되지 않는다.

`work.medium`은 `film` · `game` · `animation` · `comic` · `book` 중 하나.
화면에 보여줄 한글 이름은 [`src/lib/medium.ts`](src/lib/medium.ts)에 있다.

`devlog`의 `project` 값은 `src/content/projects/`의 파일명이다.
프로젝트 페이지는 자신을 참조하는 devlog 목록을 함께 보여준다.

## 라우트

| 경로                             | 파일                    |
| -------------------------------- | ----------------------- |
| `/`                              | `src/pages/index.astro` |
| `/posts/`, `/posts/:slug/`       | `src/pages/posts/`      |
| `/devlog/`, `/devlog/:slug/`     | `src/pages/devlog/`     |
| `/projects/`, `/projects/:slug/` | `src/pages/projects/`   |

## 배포

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)이
`withastro/action`으로 빌드하고 `actions/deploy-pages`로 배포한다.
저장소 설정에서 **Settings → Pages → Source**를 **GitHub Actions**로
한 번 바꿔줘야 한다.
