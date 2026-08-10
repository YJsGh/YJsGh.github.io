# yj.github.io

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
파일명(=slug)은 영문, 제목은 front matter에 한글로 쓴다.

| 컬렉션     | 위치                    | 성격                        | 고유 필드                                    |
| ---------- | ----------------------- | --------------------------- | -------------------------------------------- |
| `essays`   | `src/content/essays`    | 대상이 없는 사유 글         | —                                            |
| `readings` | `src/content/readings`  | 외부 작품에 대한 글         | `work` (title, creator, year, medium)        |
| `devlog`   | `src/content/devlog`    | 프로젝트에 종속된 개발일지  | `project` — `projects` 참조                  |
| `projects` | `src/content/projects`  | devlog의 허브               | `startDate`                                  |

공통 필드는 `title`, `pubDate`, 선택적 `description`.
`projects`만 `pubDate` 대신 `startDate`를 쓴다.

`work.medium`은 `film` · `game` · `animation` · `comic` · `book` 중 하나.
화면에 보여줄 한글 이름은 [`src/lib/medium.ts`](src/lib/medium.ts)에 있다.

`devlog`의 `project` 값은 `src/content/projects/`의 파일명이다.
프로젝트 페이지는 자신을 참조하는 devlog 목록을 함께 보여준다.

## 라우트

| 경로                  | 파일                                |
| --------------------- | ----------------------------------- |
| `/`                   | `src/pages/index.astro`             |
| `/essays/`, `/essays/:slug/`     | `src/pages/essays/`      |
| `/readings/`, `/readings/:slug/` | `src/pages/readings/`    |
| `/devlog/`, `/devlog/:slug/`     | `src/pages/devlog/`      |
| `/projects/`, `/projects/:slug/` | `src/pages/projects/`    |

## 배포

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)이
`withastro/action`으로 빌드하고 `actions/deploy-pages`로 배포한다.
저장소 설정에서 **Settings → Pages → Source**를 **GitHub Actions**로
한 번 바꿔줘야 한다.
