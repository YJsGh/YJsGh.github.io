// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// 루트 도메인 저장소(YJsGh.github.io)이므로 base 설정은 불필요.
// https://astro.build/config
export default defineConfig({
  site: 'https://yjsgh.github.io',
  integrations: [mdx()],
});