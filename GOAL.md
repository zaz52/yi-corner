## 2026-10-28 · 三维首页接入与 GitHub 发布

- 用户需求：继续完善，完成后更新到 GitHub。
- 接入 `world/` 中文三维世界，保留经典页面、作品数据和 Worker API；首页进入三维世界，提供经典首页返回入口。
- 39 个网站入口包含 AI 小店 `https://999.lsrai.shop/` 和苍柏影院。欢迎字块、个人标识、黑板提示、菜单、成就和目录完成中文适配。
- 新增固定版本素材清单与 SHA-256 校验；构建排除 WAV 母带，部署素材约 66.7 MB。
- 验证：TypeScript、ESLint、经典页面生产构建与三维生产构建通过；39 个网址的数据/搜索/分类检查通过；955 个发布素材和 Worker 三维路由/原作品 API 检查通过。
- 浏览器：最终发布包实际渲染出完整场景；中文欢迎字块顺序、手机 390px 目录布局及小店域名搜索通过，测试时无控制台运行错误。原场景联机排行榜和留言服务当前离线；触屏驾驶与所有小游戏关卡尚未逐项验证。
- 发布：已准备 main 分支提交，推送及自动部署结果以 GitHub 工作流为准。上游源码保留了原有空白风格。

# Goal: Personal Portfolio Rebuild And Deployment

## Task

Rebuild the personal portfolio at `https://weiyi666.netlify.app/` into a real personal brand website instead of a single long design-system display board.

## Success Criteria

- Home page is a polished personal brand site with no more than six major sections:
  - Hero
  - About
  - Projects
  - Services
  - Motion Preview
  - Contact
- Design system content is moved to `/design-system`.
- Visual direction combines retro computer, nature, youth, light technology, cream paper texture, deep green branding, soft motion, large whitespace, and premium cards.
- Desktop, tablet, and mobile layouts use the viewport well and do not collapse into a narrow centered strip.
- Smooth interactions are implemented with React, TypeScript, Tailwind CSS, Framer Motion, and Lenis.
- Project cards, buttons, section reveals, floating visual elements, and contact CTA have real interactive behavior rather than decorative placeholders.
- The external divination site `https://yulesuangua.pages.dev` is included as a real portfolio/project link.
- The site builds successfully and is pushed to GitHub.
- The live production site reflects the latest GitHub `main` build.

## Architecture

- `src/components/layout`: shared site shell such as header and footer.
- `src/components/sections`: homepage narrative sections.
- `src/components/design-system`: isolated design-system modules for `/design-system`.
- `src/components/ui`: reusable primitives such as button, card, reveal, and motion helpers.
- `src/data`: site, project, and design-system content.
- `src/pages`: route-level page composition.
- `src/styles/globals.css`: global tokens, texture, responsive behavior, and motion support.

## Progress

- Completed homepage reconstruction into a six-section personal brand site.
- Completed `/design-system` split so homepage no longer dumps all UI-system content.
- Added Framer Motion and Lenis smooth scrolling.
- Added responsive visual system and interactions for hero, projects, services, motion preview, and contact CTA.
- Added `public/resume.pdf`.
- Added Netlify Node configuration with Node 22.
- Pushed implementation to GitHub:
  - `7eaf0ce Rebuild homepage and split design system route`
  - `9775c46 Trigger Netlify redeploy`
  - `b3a384b Set Netlify Node version`
- Added configurable Vite `base` so Netlify can keep root-path deployment while GitHub Pages can serve the same app from the repository path.

## Validation

- `npm run lint`: passed.
- `npm run build`: passed.
- Local browser checks: passed for `/` and `/design-system` on desktop and mobile.
- Checked for horizontal overflow: none found locally.
- Checked links: no fake `href="#"` links and no unsafe `_blank` links.
- Checked local `/resume.pdf`: returns 200.
- Revalidated on 2026-07-06:
  - `npm run lint`: passed.
  - `npm run build`: passed, output generated in `dist/`.
  - Netlify API confirmed latest production deploy attempts are skipped because account credit usage is exceeded.

## Current Blocker

Production at `https://weiyi666.netlify.app/` is still serving the old build even though GitHub `main` contains the new code.

Netlify deploys for latest commits were skipped with the error:

`Skipped due to account credit usage exceeded`

This means the live site cannot update until the Netlify account usage or billing issue is resolved, or until the site is deployed through another account/provider with available build/deploy capacity.

Manual Netlify deployment of the local `dist/` build was also attempted and failed with:

`JSONHTTPError: Forbidden`

This confirms the blocker is at the Netlify account/deploy permission level, not the application build.

## Next Steps

- Resolve Netlify account credit/build usage issue in the Netlify dashboard.
- Retry the latest Netlify deploy, or push an empty commit after credits are restored.
- Re-check production title and assets after deployment.
- Final review pass once production serves the new build.
- As a temporary working deployment, publish the latest build through GitHub Pages.

## Fallback Deployment

- Created `https://github.com/zaz52/zaz52.github.io` as a clean GitHub Pages user-site repository.
- Published the rebuilt portfolio to `https://zaz52.github.io/`.
- Switched GitHub Pages from legacy mode to workflow mode after legacy deploy returned `Deployment failed, try again later`.
- Verified `https://zaz52.github.io/` returns 200 with title:

`Weiyi | 复古科技青春自然个人网站`

- Browser smoke test using local Chrome passed:
  - title is `Weiyi | 复古科技青春自然个人网站`
  - Hero copy is present
  - Contact CTA copy is present
  - desktop viewport has no horizontal overflow

- Note: direct deep links such as `/design-system` on GitHub Pages are served through the SPA fallback and may return HTTP 404 while still rendering in the browser. This is a limitation of GitHub Pages static hosting. Netlify will support clean route fallback once the account deploy blocker is resolved.

## Cloudflare Pages Migration

- Netlify remains blocked because the account is unpaid/over quota.
- User approved moving deployment to another provider.
- Next target: Cloudflare Pages project for the rebuilt portfolio.
- Initial local check found no `CLOUDFLARE_API_TOKEN`, no `CLOUDFLARE_API_KEY`, no `CLOUDFLARE_ACCOUNT_ID`, and no installed `wrangler` command.
- Installed local project dev dependency `wrangler`.
- Revalidated `npm run lint` and `npm run build`: passed.
- `wrangler whoami` confirms Cloudflare account `504628394@qq.com` with Pages write permission.
- Target Cloudflare Pages project name: `weiyi666-portfolio`.
- Created Cloudflare Pages project `weiyi666-portfolio`.
- First production URL: `https://weiyi666-portfolio.pages.dev/`.
- Added `public/_redirects` with `/* /index.html 200` so SPA routes such as `/design-system` work as direct links.
- Revalidated:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - `https://weiyi666-portfolio.pages.dev/`: HTTP 200, title is `Weiyi | 复古科技青春自然个人网站`.
  - `https://weiyi666-portfolio.pages.dev/design-system`: HTTP 200 through Cloudflare redirect fallback.
  - Chrome browser smoke test on Cloudflare: title, Hero, Contact, and desktop width check passed.

## Project Cleanup

- Removed duplicated divination-related portfolio items:
  - `乾坤之道` / `https://yulesuangua.pages.dev/`
  - `算卦` / `https://suanguan.netlify.app/`
- The Projects section now promotes the first remaining item, `魔方简历`, as the main featured project.
- Revalidated cleanup:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Cloudflare production deploy succeeded.
  - HTTP check confirms no `yulesuangua` or `suanguan` references in the deployed page.
  - Chrome browser check confirms `魔方简历` is visible and `乾坤之道` / `算卦` are not visible.

## Project Addition

- Re-added `https://yulesuangua.pages.dev/` as a single project entry named `乾坤之道`.
- This is distinct from the removed duplicate `算卦` entry and uses the existing Projects card pattern.
- Added `public/covers/yulesuangua.svg` as a styled project cover because live screenshot capture timed out.
- Revalidated:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Cloudflare Pages fallback deployment succeeded.
  - Cloudflare Worker custom-domain deployment succeeded with version `346362c6-b9e0-436c-b45c-5dd1a8d7a20f`.
  - `https://weiyiai.top/covers/yulesuangua.svg`: HTTP 200.
  - Chrome browser check confirms `乾坤之道` is visible, links to `https://yulesuangua.pages.dev/`, cover loads, and old `算卦` card is not visible.

## Custom Domain

- User provided custom domain `weiyiai.top`, with DNS managed in Cloudflare.
- Added `wrangler.jsonc` for Cloudflare Workers Static Assets deployment:
  - Worker name: `weiyiai-portfolio`
  - Asset directory: `./dist`
  - SPA fallback: `not_found_handling: single-page-application`
  - Routes:
    - `weiyiai.top/*`
    - `www.weiyiai.top/*`
- Initial Workers custom-domain mode conflicted with existing DNS/domain records, so deployment was switched to Workers route mode.
- Deployed Worker version `e127c7d8-b1a4-44af-b445-8b4fca6607d2`.
- Verified:
  - `https://weiyiai.top/`: HTTP 200.
  - `https://www.weiyiai.top/`: HTTP 200.
  - `https://weiyiai.top/design-system`: HTTP 200.
  - Chrome browser check confirms title, Hero, Contact, and Design System route render correctly.

## Visual Assets Update

- Added visible avatar card to the homepage Hero using `public/avatar.jpg`.
- Added project cover image assets under `public/covers/`:
  - `magic-resume.png`: live screenshot cover.
  - `elder-health.png`: live screenshot cover.
  - `ppt-master.svg`: generated visual cover because the target site failed to load reliably during capture.
  - `resource-vault.svg`: generated visual cover for the resource entry.
- Updated project data with `cover` fields and rendered covers in both featured and horizontal project cards.
- Revalidated:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Cloudflare Pages fallback deployment succeeded.
  - Cloudflare Worker custom-domain deployment succeeded with version `252e6f25-41e5-4dca-be31-3e11a389fa14`.
  - `https://weiyiai.top/avatar.jpg` and all `/covers/*` assets return HTTP 200.
  - Chrome browser check confirms the Hero avatar loads and all 4 project covers load after scrolling to Projects.
- Replaced `public/avatar.jpg` with the new user-provided WeChat image.
- Revalidated replacement:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Cloudflare Pages fallback deployment succeeded.
  - Cloudflare Worker custom-domain deployment succeeded with version `c26650ba-5633-41ee-81ea-3e2ce3388908`.
  - Remote `https://weiyiai.top/avatar.jpg` SHA256 matches local `public/avatar.jpg`.
  - Chrome browser check confirms the new 908x908 avatar loads in the Hero.

## Admin CMS

- Added `/admin` route for self-service project management.
- Added Cloudflare Worker API:
  - `GET /api/projects`: public project data read.
  - `GET /api/admin-check`: password verification.
  - `PUT /api/projects`: authenticated project save.
- Added Cloudflare KV namespace `PROJECTS_KV` with ID `fbf42b519d5b4baebe61c41b050bea02`.
- Added `ADMIN_PASSWORD` as a Cloudflare Worker secret. The password value is not committed to Git.
- Added `worker/default-projects.json` for UTF-8 safe seed data.
- Seeded KV with the current project list using Node fetch after PowerShell JSON encoding corrupted Chinese text during an initial seed attempt.
- Admin capabilities:
  - Add project.
  - Edit project title, type, URL, description, tags, icon, palette, and cover.
  - Upload cover image; browser compresses it to a JPEG data URL before saving.
  - Delete project.
  - Move project up/down.
  - Set featured project.
- Revalidated:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Cloudflare Worker custom-domain deployment succeeded with version `b58ebe02-9525-4891-913e-aea9b586f9ac`.
  - Added explicit `ASSETS` binding and manual SPA fallback in the Worker so `/admin` and `/design-system` return HTTP 200.
  - `GET /api/projects`: returns 5 projects with correct Chinese text.
  - Wrong admin password returns HTTP 401.
  - Correct admin password returns `{ ok: true }`.
  - Browser check confirms `/admin` login works, project inputs contain Chinese text, front page reads dynamic projects without `????` corruption, and the merged `/skills` page still renders.
  - Integrated remote `main` changes that added Skills pages and fixed the imported `Github` lint issue in `src/pages/Skills.tsx`.
- Admin password was rotated via Cloudflare Worker secret update. The previous password now returns HTTP 401 and the new password passes `/api/admin-check`. The password value is not committed to Git.

## Project Content Enrichment

- Audited current project links and page metadata with browser automation.
- Rewrote project records into a fuller portfolio presentation:
  - `乾坤之道`: main featured project, positioned as an Eastern divination + AI inquiry platform.
  - `魔方简历`: restored full product name and clarified privacy-first AI resume editing features.
  - `PPT Master`: clarified native editable PPTX generation from documents and URLs.
  - `银龄守护`: renamed from `老年健康` and clarified mobile senior-health workflows.
  - `虚拟资源库`: renamed from `虚拟资料库` and clarified cloud resource/material collection use.
- Updated both `src/data/projects.ts` and `worker/default-projects.json`.
- Wrote the enriched records to Cloudflare KV using Node fetch to preserve UTF-8 Chinese text.
- Revalidated:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Cloudflare Worker custom-domain deployment succeeded with version `06abd1bf-b493-4fd1-8e28-9b079c9e1c28`.
  - `GET /api/projects`: returns the enriched 5-project list with `乾坤之道` featured.
  - Chrome browser check confirms the front page and `/admin` both show the enriched content without `????` corruption.

## Obsidian Sync

Do not sync this work to Obsidian unless the user explicitly says to sync.

## Current Goal: Full Projects Index Page

User noticed that works are concentrated together and approved adding a complete projects page while keeping the homepage curated.

### Success Criteria

- Homepage remains clean with featured/selected projects.
- Add `/projects` as a complete portfolio index for all projects.
- `/projects` shows all 14 current projects.
- Provide category filters:
  - 全部
  - 主推
  - AI 工具
  - GitHub 项目
  - 网站 / UI
  - 自动化
- Provide search by name, type, description, and tags.
- Each card links to its detail page and external project link.
- Homepage Projects section includes a "查看全部作品" entry.
- `/projects` has route-aware SEO and appears in dynamic sitemap.

### Implementation

- Added `src/hooks/useProjects.ts` to reuse dynamic project loading.
- Added `src/pages/ProjectsIndex.tsx`.
- Updated `src/App.tsx` to route `/projects` before `/projects/:id`.
- Updated homepage Projects section to use the shared hook and link to `/projects`.
- Added `/projects` SEO in frontend and Worker.
- Added `/projects` to dynamic sitemap.
- Added a `全部作品` nav item before `Skills`.

### Validation

- `npm run lint`: passed.
- `npm run build`: passed.
- Deployed Worker version `444d35f7-8f45-439e-a5ca-bfbaa3c98329`.
- Final deploy after adding nav entry: `9e86c1db-6e02-42aa-bbf3-99c8222eedf0`.
- Production checks:
  - `/`: HTTP 200.
  - `/projects`: HTTP 200.
  - `/projects/github-agent-reach`: HTTP 200.
  - `/sitemap.xml`: HTTP 200.
  - `/projects` title is `全部作品 | Weiyi`.
  - `/projects` canonical is `https://weiyiai.top/projects`.
  - Production JS contains `/projects` route references.

## Current Goal: Add GitHub Projects To Portfolio

User asked to add projects from the GitHub account to the personal website.

### Source

- GitHub user: `zaz52`.
- Public repositories were read from `https://api.github.com/users/zaz52/repos?per_page=100&sort=updated`.
- Existing portfolio items already covered:
  - `yulesuangua`
  - `magic-resume`

### Added Projects

- `github-portfolio-site`: 个人网站源码.
- `github-xianyu-auto-reply`: 闲鱼自动回复管理系统.
- `github-xianyu-super-butler`: 闲鱼超级管家.
- `github-novel-workbench`: 小说工作台.
- `github-style-advisor`: 个人形象顾问 Skill.
- `github-agent-reach`: Agent Reach.
- `github-genius-fkoai`: GeniusFKoai.
- `github-yulesuangua-deploy`: 乾坤之道部署脚本.
- `github-pages-archive`: GitHub Pages 作品集备份.

### Implementation

- Added 6 reusable GitHub-style cover assets under `public/covers/`.
- Updated live Cloudflare KV project data to contain 14 projects total, including 9 GitHub-derived projects.
- Updated fallback/default data in:
  - `src/data/projects.ts`
  - `worker/default-projects.json`
  - `worker/index.js`
- Used the UTF-8 local JSON file as the source of truth when writing KV to avoid PowerShell Chinese encoding corruption.
- Removed static `public/sitemap.xml` and `public/robots.txt` so the Worker dynamic handlers can return fresh project-aware data.
- Changed dynamic HTML and sitemap responses to `no-store` so project/admin edits are reflected immediately.

### Validation

- `npm run lint`: passed.
- `npm run build`: passed.
- Cloudflare deploy with new cover assets: `2e272383-6c50-400d-b220-8fd62de10b75`.
- Final deploy after dynamic sitemap fix: `bf915752-4c58-4fca-a002-ea37d53029f5`.
- Production `/api/projects` returns 14 projects, including 9 IDs starting with `github-`.
- Production detail pages return HTTP 200, including:
  - `/projects/github-portfolio-site`
  - `/projects/github-xianyu-auto-reply`
  - `/projects/github-style-advisor`
- New cover assets return HTTP 200.
- Dynamic `sitemap.xml` includes all 9 GitHub project detail URLs.
- `robots.txt` includes the sitemap location and disallows `/admin`.

## Current Goal: SEO And Share Cards

User approved the next step: improve SEO and social sharing for the personal website.

### Success Criteria

- Base HTML has clean Chinese title, description, canonical, Open Graph, and Twitter Card tags.
- Cloudflare Worker injects route-aware meta for `/`, `/design-system`, `/skills`, `/projects/:id`, and `/admin`.
- Project detail pages expose their own title, description, URL, and image for sharing.
- Admin page is marked `noindex`.
- `robots.txt` and `sitemap.xml` are available on production.
- Frontend updates browser title/meta after route render.
- `npm run lint`, `npm run build`, deployment, and production HTTP/meta checks pass.

### Progress

- Started on 2026-07-07.
- Replaced the base `index.html` SEO with clean Chinese title, description, canonical, Open Graph, and Twitter Card tags.
- Added `public/og-image.svg` as a 1200x630 share image.
- Added `public/robots.txt` and `public/sitemap.xml` fallbacks.
- Added `src/lib/seo.ts` and wired frontend route title/meta updates.
- Added Cloudflare Worker route-aware SEO injection for `/`, `/design-system`, `/skills`, `/projects/:id`, and `/admin`.
- Added dynamic Worker `robots.txt` and `sitemap.xml` handlers.
- Admin route is marked `noindex,nofollow`.
- Project detail routes use live project data for title, description, canonical URL, and share image.

### Validation

- `npm run lint`: passed.
- `npm run build`: passed.
- Deployed Worker version `42c6f6c1-227a-43c1-9cbf-221f4dc8c598`.
- Final deploy after removing the leftover SEO marker from static home HTML: `bc3f0cc4-1398-4d32-baee-af3e20133511`.
- Production HTML checks passed for:
  - `/`
  - `/projects/yulesuangua`
  - `/design-system`
  - `/admin`
- Each checked route has title, description, robots, canonical, `og:title`, `og:image`, and Twitter Card tags.
- `/admin` title is `后台管理 | Weiyi` and is noindex.
- `/projects/yulesuangua` title is `乾坤之道 | Weiyi 作品详情`.
- `/og-image.svg`, `/robots.txt`, and `/sitemap.xml`: all return HTTP 200.
- `robots.txt` includes the sitemap location and mentions `/admin`.
- `sitemap.xml` includes home and project detail pages, and does not include `/admin`.

## Current Goal: Update Divination Project Link

User asked to change the divination project link to `https://suangua.weiyiai.top/`.

### Progress

- Updated default project data in:
  - `src/data/projects.ts`
  - `worker/index.js`
  - `worker/default-projects.json`
- Updated live Cloudflare KV project data for `yulesuangua`.
- Restored Chinese project data using a UTF-8 safe Node request after a PowerShell JSON request corrupted Chinese text.

### Validation

- `npm run lint`: passed.
- `npm run build`: passed.
- Deployed Worker version `39dc0f48-1d51-4be4-bba2-de3592c14605`.
- `GET /api/projects` confirms:
  - `yulesuangua.href` is `https://suangua.weiyiai.top/`.
  - the old `https://yulesuangua.pages.dev/` link is no longer present in live project data.
- `/`, `/projects/yulesuangua`, and `/admin`: all return HTTP 200.

## Current Goal: Project Detail Pages

User approved the next step: improve the portfolio by adding real project detail pages.

### Success Criteria

- Project cards on the homepage open internal detail pages instead of immediately jumping away.
- Every project has a stable route at `/projects/:id`.
- Detail pages read the same dynamic `/api/projects` data used by the homepage/admin so future admin edits remain reflected.
- Each detail page includes cover, title, type, description, tags, project link, narrative sections, and clear back navigation.
- Unknown project IDs show a useful not-found state.
- Desktop and mobile layouts remain readable.
- `npm run lint`, `npm run build`, production deploy, route checks, and GitHub push complete.

### Architecture

- Add `src/pages/ProjectDetail.tsx`.
- Update the SPA router in `src/App.tsx` to handle `/projects/:id`.
- Update homepage project cards in `src/components/sections/Projects.tsx` to link to internal detail pages and keep external project launch as a clear button.
- Reuse `hydrateProjects` and `/api/projects` for consistent project data.

### Progress

- Started on 2026-07-07.
- Added `src/pages/ProjectDetail.tsx`.
- Added `/projects/:id` SPA routing in `src/App.tsx`.
- Updated homepage project cards to open internal detail pages.
- Local validation:
  - `npm run lint`: passed.
  - `npm run build`: passed.

## Goal: Improve Mobile Admin Experience

### Task

Optimize `/admin` for phone usage so the user can manage projects from mobile without fighting a long desktop-style form page.

### Success Criteria

- On mobile, project cards default to collapsed after project data loads.
- Search/filter tools are easier to reach on small screens.
- Primary actions such as save and add are available in a fixed mobile bottom bar.
- Admin content has enough bottom padding so the fixed bar does not cover fields.
- Touch targets remain large and readable.
- Build, lint, deploy, production checks, commit, and push complete.

### Architecture

- Keep changes scoped to `src/pages/Admin.tsx` and `src/styles/globals.css`.
- Use responsive CSS and a small mobile initialization check; no backend changes.

### Progress

- Started on 2026-07-07 after user approved mobile version optimization.
- Added mobile-only default collapse behavior after project data loads.
- Added mobile fixed bottom action bar with Save, New, and Collapse actions.
- Added bottom padding to the admin page so the fixed action bar does not cover content.
- Made the admin search/filter block sticky on small screens.
- Added mobile CSS for horizontal category filters and compact two-column action buttons.
- Local validation:
  - `git diff --check`: passed.
  - `npm run lint`: passed.
  - `npm run build`: passed.
- Deployed to Cloudflare Worker:
  - Version `5e53c83c-ab9d-40fa-a934-349226746d83`.
- Production validation:
  - `/`: HTTP 200.
  - `/admin`: HTTP 200.
  - `/projects`: HTTP 200.
  - Production JS bundle `/assets/index-BDu42Hqj.js` contains mobile width handling, collapsed-card logic, and mobile bottom actions.
  - Production CSS bundle `/assets/index-WN08O4md.css` contains `admin-mobile-tools`, `admin-filter-strip`, and `admin-action-strip`.

### Review Notes

- The mobile bottom bar is hidden on desktop with `md:hidden`.
- The fixed bottom bar is paired with extra page bottom padding so it does not cover the final project fields.
- Browser screenshot automation was not installed because Playwright browser binaries would write under C drive, which the user asked to avoid.
- Deployed to Cloudflare Worker:
  - Version `1874e3c1-78fe-419b-89f4-d5771c6acdd8`.
- Production validation:
  - `/`: HTTP 200.
  - `/admin`: HTTP 200.
  - `/projects`: HTTP 200.
  - Production admin JS bundle `/assets/index-D3zAuaW_.js` contains the new admin controls:
    - 导出备份
    - 导入恢复
    - 全部折叠
    - 封面正常
    - 搜索名称、类型、标签、介绍或链接
    - 退出

### Review Notes

- No admin password or secret was committed.
- Import/export stays client-side and requires an explicit save before imported data affects production.
- The existing `/api/projects` endpoint remains unchanged, reducing backend risk.
- Deployed to Cloudflare Worker:
  - First cover deploy: `c2a50597-b06e-41be-aa08-0af1e31e8c2b`.
  - Final redeploy after CSS review: `0f931257-43f7-4624-8da9-eabc57ad9e89`.
- Production validation:
  - `/`: HTTP 200.
  - `/projects`: HTTP 200.
  - `/projects/github-xianyu-super-butler`: HTTP 200.
  - `/projects/github-genius-fkoai`: HTTP 200.
  - Production `/api/projects`: 14 projects, 0 missing covers, 14 unique cover URLs.
  - New cover assets `/covers/github-butler.svg`, `/covers/github-genius.svg`, `/covers/github-deploy.svg`, and `/covers/github-pages.svg`: all HTTP 200.
- Browser automation note:
  - Playwright package is available, but browser binaries are not installed.
  - Installing them would write to `C:\Users\Administrator\AppData\Local\ms-playwright`, so this was intentionally skipped to respect the user's "不要碰 C 盘" constraint.
  - Validation was completed with production route checks, asset checks, build checks, and production bundle checks instead.

### Review Notes

- The current production data now has one cover per project, with no duplicate cover URLs across the 14 projects.
- Future admin-created projects are protected by `ProjectCover` fallback UI if a cover URL is missing or fails to load.
- No secrets were committed; the admin API was used only to update existing project cover URLs in KV.

## Goal: Switch Public Brand Name To Chinese

### Task

Use the Chinese personal brand name "唯一" across the public website while preserving Weiyi where it is part of real accounts, URLs, repository names, or compatibility metadata.

### Success Criteria

- Header, footer, hero/about copy, SEO titles, descriptions, Open Graph metadata, and share card use "唯一".
- The site still keeps the domain `weiyiai.top` and real external accounts unchanged.
- Build, lint, deploy, production checks, commit, and push complete.

### Architecture

- Update shared profile data first, then static SEO sources and Worker HTML injection metadata.
- Keep the change copy-only; no data model or route behavior changes.

### Progress

- Started on 2026-07-07 after user asked to use a Chinese name: "唯一".
- Updated public brand display from "Weiyi" to "唯一" in shared profile data, header, footer, About copy, SEO metadata, Worker route metadata, `index.html`, README, Open Graph image, and the portfolio project cover SVG.
- Kept real URLs, deployment names, and external account handles unchanged.
- Local validation:
  - `npm run lint`: passed.
  - `npm run build`: passed.
- Deployed to Cloudflare Worker:
  - Version `5d4bac23-0833-4bb5-a627-c3d1217a1e40`.
- Production validation:
  - `/`: HTTP 200, title `唯一 | 复古科技青春自然个人网站`.
  - `/projects`: HTTP 200, title `全部作品 | 唯一`.
  - `/design-system`: HTTP 200, title `设计系统 | 唯一`.
  - `/admin`: HTTP 200, title `后台管理 | 唯一`.
  - `/og-image.svg`: contains `唯一` and no visible `Weiyi` text.

## Goal: Upgrade Admin Project Management

### Task

Make `/admin` easier for a non-technical user to manage many portfolio projects.

### Success Criteria

- Admin can search projects by name, type, description, tag, or link.
- Admin can filter projects by all, featured, GitHub, AI, web/UI, automation, and missing cover.
- Project cards can be collapsed and expanded so the page is not overwhelmingly long.
- Each project has "preview detail page" and "open external link" actions.
- Admin can export current projects as a JSON backup and import a JSON backup to restore/edit.
- Admin can log out cleanly.
- Cover preview shows whether the image loaded successfully, failed, or is missing.
- Build, lint, deploy, production checks, commit, and push complete.

### Architecture

- Keep management state local to `src/pages/Admin.tsx`.
- Use existing `/api/projects` save endpoint; do not change Worker API unless necessary.
- Export/import is client-side JSON only, avoiding secret or backend changes.

### Progress

- Started on 2026-07-07 after user said "继续做" for admin management upgrade.
- Added local admin management state for search, category filter, collapsed cards, cover status, JSON import, and JSON export.
- Added top admin toolbar:
  - search by project text
  - category filters
  - add project
  - export JSON backup
  - import JSON backup
  - collapse all / expand all
- Added login session logout button.
- Added per-project actions:
  - collapse / expand
  - preview detail page
  - open external link
  - set featured
  - move up/down
  - delete
- Added cover status badges for loaded, failed, and missing covers.
- Local validation:
  - `npm run lint`: passed.
  - `npm run build`: passed.

## Goal: Strengthen Personal Introduction

### Task

Rewrite the personal introduction so the website feels like a real personal brand site, not only a project wall or UI showcase.

### Success Criteria

- Homepage About section clearly explains who Weiyi is, what kind of work he does, and what direction the site represents.
- The introduction keeps the existing "retro + tech + youth + nature" style but becomes more personal and concrete.
- Contact CTA reinforces collaboration intent instead of generic placeholder copy.
- Build, lint, deploy, production checks, commit, and push complete.

### Architecture

- Keep the change scoped to copy and presentation in `src/components/sections/About.tsx`, `src/components/sections/Contact.tsx`, and shared profile copy in `src/data/site.ts`.
- Do not add new CMS/database behavior for this small copy pass.

### Progress

- Started on 2026-07-07 after user asked: "个人介绍不做了吗".
- Updated shared hero intro in `src/data/site.ts` to describe Weiyi as a creator exploring AI tools, personal brand websites, mobile UI, and visual systems.
- Rewrote homepage About section to explain:
  - who Weiyi is
  - what kind of projects he is building
  - why the current visual direction exists
  - what visitors can understand from the portfolio
- Updated Contact CTA to reinforce that the site is a living project archive and personal brand entry.
- Local validation:
  - `npm run lint`: passed.
  - `npm run build`: passed.
- Deployed to Cloudflare Worker:
  - Version `2c752d29-300d-46d1-859a-0873fca17a59`.
- Production validation:
  - `/`: HTTP 200.
  - Production HTML references the new JS bundle `/assets/index-Bo0senmt.js`.
  - Built bundle contains the new About and Contact copy.
- Deployed to Cloudflare Worker version `78ddc0dc-8c86-4faf-a6d8-12f795498dbb`.
- Final deploy after removing the public admin CTA from detail pages: `7105991a-82c0-4c7d-9208-80ab7d3636a9`.
- Production validation:
  - `/`: HTTP 200.
  - `/projects/yulesuangua`: HTTP 200.
  - `/projects/magic-resume`: HTTP 200.
  - `/projects/not-exist`: HTTP 200 with SPA fallback for the not-found state.
  - `/admin`: HTTP 200.
  - Production JS asset `/assets/index-BDZn5UFU.js` contains the `/projects/` route.
  - Public detail page bundle no longer contains the "后台管理作品" CTA.

### Review Notes

- Detail pages intentionally derive narrative sections from the current project record, so projects created in `/admin` get a useful detail page without adding a separate CMS schema.
- The external project URL remains available through the "打开线上项目" CTA inside each detail page.
- Future enhancement: add optional admin fields for richer case studies, such as problem, role, stack, screenshots, and process notes.

## Current Goal: Built-In Visit Analytics

User selected the third improvement: add visit analytics for the live personal website.

### Success Criteria

- The production site records page views without requiring the user to manually edit Cloudflare Dashboard settings.
- Analytics data is stored in the existing Cloudflare KV namespace and does not expose the admin password or other secrets in Git.
- Tracking is privacy-light: count visits by day, path, referrer host, device class, and browser class only; do not store raw IP addresses.
- `/admin` shows a usable analytics summary after login:
  - total views
  - today views
  - recent 14-day trend
  - top pages
  - top referrers
  - device/browser split
- Build, lint, Worker deploy, API checks, and browser checks pass before final handoff.

### Architecture

- Frontend sends a single best-effort page view event on page load through `/api/analytics/pageview`.
- Cloudflare Worker validates and aggregates events into KV key `analytics:v1`.
- Admin-only endpoint `/api/analytics/summary` returns the aggregated dashboard payload.
- Admin UI reads the summary only after password verification.

### Progress

- Started implementation on 2026-07-07.
- Cloudflare Web Analytics API access was checked first, but the current Wrangler OAuth token returned 403 for RUM/Web Analytics endpoints. Decision: implement first-party KV analytics so the user can proceed without manual Cloudflare token setup.
- Added first-party analytics aggregation to the Cloudflare Worker:
  - `POST /api/analytics/pageview`
  - `GET /api/analytics/summary`
- Added frontend page-view tracking through `src/lib/analytics.ts`.
- Added the logged-in `/admin` analytics dashboard.
- Local validation:
  - `npm run lint`: passed.
  - `npm run build`: passed.
- Deployed to Cloudflare Worker:
  - First analytics deploy: `57bb45c5-1590-42b8-9898-c1cb47a24d56`.
  - Final timezone/body parsing fix deploy: `0a4c518a-bfcd-4e28-8952-4571bb939358`.
- Production validation:
  - `POST /api/analytics/pageview`: returns `{ ok: true }`.
  - Wrong admin password on `/api/analytics/summary`: returns HTTP 401.
  - Correct admin password on `/api/analytics/summary`: returns totals, recent days, top pages, referrers, devices, and browsers.
  - Main routes `/`, `/admin`, `/design-system`, and `/skills`: all return HTTP 200.
  - Production JS contains `/api/analytics/pageview` and `/api/analytics/summary`.
  - Verified Beijing-date aggregation: recent last date is `2026-07-07`, and `/design-system` is tracked as a separate top page.

### Review Notes

- The analytics implementation is intentionally first-party and privacy-light; it does not store raw IP addresses or individual visitor IDs.
- Data aggregation uses KV read-modify-write, which is appropriate for a low-traffic personal website. If traffic becomes high, this should move to Durable Objects or Analytics Engine to avoid write contention.
- The Playwright skill installed in this environment only contains documentation and no `run.js` executor, and the project does not include Playwright. Browser validation was therefore replaced with production HTTP/API checks rather than adding a test dependency to the production project.

### Follow-Up Fix

- User reported that the analytics panel was not visible in `/admin`.
- Root cause: the password field could be restored from `sessionStorage`, but the admin `unlocked` state was not restored after refresh. In that state, the saved password was visible as dots but the analytics panel stayed hidden until the user clicked login again.
- Fix:
  - `/admin` now automatically validates the saved session password on load.
  - If valid, it restores the unlocked admin state and loads analytics immediately.
  - Login and refresh-stat handlers no longer receive mouse events as implicit password arguments.
- Validation:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Deployed Worker version `077ccef6-bd7e-4906-8617-189a73926136`.
  - Production `/admin` JS contains `adminPassword`, `/api/admin-check`, `/api/analytics/summary`, and `Analytics`.
  - Main routes `/`, `/admin`, `/design-system`, and `/skills`: all return HTTP 200.

### Second Follow-Up Fix

- User still did not see the analytics panel.
- Root cause: browser password autofill can display dots inside the input without updating React state, and the analytics block was still hidden behind `unlocked`.
- Fix:
  - Added a password input ref so login reads the real DOM input value, including browser autofill.
  - Removed the conditional wrapper around the analytics section so the panel is always visible above the project list.
  - Kept refresh-stat disabled until admin login succeeds.
- Validation:
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Deployed Worker version `937b992e-0760-4603-940c-379eff21fb94`.
  - Production `/admin` JS asset is `/assets/index-Bi27NAJ_.js` and contains `useRef`, `adminPassword`, and `Analytics`.
  - Main routes `/`, `/admin`, `/design-system`, and `/skills`: all return HTTP 200.

## Goal: Give Every Project A Clear Cover Image

### Task

Ensure every portfolio project has a visible, distinctive cover image on the homepage, `/projects`, and `/projects/:id`. Existing projects must not look like text-only placeholders or repeated generic cards.

### Success Criteria

- Every project returned by production `/api/projects` has a valid `cover`.
- Projects that previously shared generic GitHub covers get more specific local SVG covers where appropriate.
- Project cards gracefully fall back to a styled generated cover if a future admin-created project has no image.
- Homepage, all-projects page, and detail pages continue to render project covers consistently.
- `npm run lint`, `npm run build`, production HTTP checks, and deploy all pass.
- Changes are committed and pushed to GitHub.

### Architecture

- Keep static cover assets under `public/covers` so Cloudflare Static Assets can serve them without extra storage.
- Keep project cover assignment in `src/data/projects.ts` and `worker/default-projects.json`.
- Add a reusable project-cover fallback component instead of duplicating fragile `<img>` behavior across pages.

### Progress

- Started on 2026-07-07 after user requested: "每个作品配上图片啊".
- Verified production `/api/projects` currently returns 14 projects and all have non-empty `cover` fields.
- Decision: improve cover quality and uniqueness, because several GitHub-derived projects share the same generic cover and can look like placeholders.
- Added reusable `ProjectCover` UI component with a styled fallback state for missing or broken future covers.
- Updated homepage project section, `/projects`, and `/projects/:id` to use the shared cover component.
- Added new local SVG covers:
  - `/covers/github-butler.svg`
  - `/covers/github-genius.svg`
  - `/covers/github-deploy.svg`
  - `/covers/github-pages.svg`
- Updated default project data in `src/data/projects.ts` and `worker/default-projects.json` so GitHub-derived projects use more distinctive covers.
- Updated production `/api/projects` through the admin API so the current KV records point at the new covers without changing project text, order, or featured state.
- Local validation:
  - `npm run lint`: passed.
  - `npm run build`: passed.
