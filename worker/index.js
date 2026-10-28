const PROJECTS_KEY = 'projects';
const ANALYTICS_KEY = 'analytics:v1';
const SITE_URL = 'https://weiyiai.top';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`;

const DEFAULT_PROJECTS = [
  {
    id: 'magic-resume',
    iconKey: 'fileText',
    name: '魔方简历',
    type: 'AI 简历编辑器',
    description: 'AI 驱动的在线简历编辑器，强调免费与隐私优先。',
    href: 'https://magic-resume-weiyi.netlify.app/',
    cover: '/covers/magic-resume.png',
    tags: ['AI', 'Resume', 'Productivity'],
    palette: 'blue',
    featured: true,
  },
  {
    id: 'ppt-master',
    iconKey: 'presentation',
    name: 'PPT Master',
    type: 'AI 文档工具',
    description: 'AI 一键生成可编辑 PPTX，关注原生动画与排版。',
    href: 'https://ppt-master-weiyi.netlify.app/',
    cover: '/covers/ppt-master.svg',
    tags: ['AI', 'PPTX', 'Presentation'],
    palette: 'orange',
  },
  {
    id: 'elder-health',
    iconKey: 'heartPulse',
    name: '老年健康',
    type: '健康资讯平台',
    description: '面向长辈健康关怀的信息平台，强调移动端可读性。',
    href: 'https://elder-health.netlify.app/#/pages/index/index',
    cover: '/covers/elder-health.png',
    tags: ['Health', 'Mobile', 'Content'],
    palette: 'mint',
  },
  {
    id: 'yulesuangua',
    iconKey: 'sparkles',
    name: '乾坤之道',
    type: 'AI + 周易工具',
    description: '把传统卦象与 AI 解读结合，提供更具仪式感的在线问事体验。',
    href: 'https://suangua.weiyiai.top/',
    cover: '/covers/yulesuangua.svg',
    tags: ['AI', 'Divination', 'Cloudflare'],
    palette: 'emerald',
  },
  {
    id: 'resource-vault',
    iconKey: 'cloud',
    name: '虚拟资料库',
    type: '资源整理入口',
    description: '学习资源、工具与素材的整理入口。',
    href: 'https://pan.quark.cn/s/bc839cf401af#/list/share',
    cover: '/covers/resource-vault.svg',
    tags: ['Resource', 'Collection'],
    palette: 'cyan',
  },
  {
    id: 'github-portfolio-site',
    iconKey: 'sparkles',
    name: '个人网站源码',
    type: 'React + Cloudflare 个人品牌网站',
    description: '当前个人网站的 GitHub 仓库，包含首页、作品详情、后台管理、访问统计、SEO 分享卡片和 Cloudflare Worker 部署配置。',
    href: 'https://github.com/zaz52/-',
    cover: '/covers/github-portfolio.svg',
    tags: ['React', 'Cloudflare', 'Portfolio'],
    palette: 'emerald',
  },
  {
    id: 'github-xianyu-auto-reply',
    iconKey: 'cloud',
    name: '闲鱼自动回复管理系统',
    type: 'Python + FastAPI 自动化客服',
    description: '面向闲鱼平台的自动化客服与虚拟商品流程系统，覆盖消息处理、自动回复、自动发货、评价和商品维护等场景。',
    href: 'https://github.com/zaz52/xianyu-auto-reply',
    cover: '/covers/github-xianyu.svg',
    tags: ['Python', 'FastAPI', 'Automation'],
    palette: 'cyan',
  },
  {
    id: 'github-xianyu-super-butler',
    iconKey: 'cloud',
    name: '闲鱼超级管家',
    type: '自动化工具二次开发',
    description: '基于闲鱼自动回复系统的二次开发版本，重点重构前端 UI 和使用体验，让自动化管理工具更现代、更清晰。',
    href: 'https://github.com/zaz52/xianyu-super-butler',
    cover: '/covers/github-xianyu.svg',
    tags: ['Automation', 'UI', 'Tooling'],
    palette: 'mint',
  },
  {
    id: 'github-novel-workbench',
    iconKey: 'fileText',
    name: '小说工作台',
    type: 'TypeScript 创作工具',
    description: '面向小说创作流程的工作台项目，用于沉淀写作、设定、素材和内容生产相关能力。',
    href: 'https://github.com/zaz52/wei-yi',
    cover: '/covers/github-novel.svg',
    tags: ['TypeScript', 'Writing', 'Workbench'],
    palette: 'orange',
  },
  {
    id: 'github-style-advisor',
    iconKey: 'sparkles',
    name: '个人形象顾问 Skill',
    type: 'Hermes Agent 形象升级提示词',
    description: '用于个人穿搭、眼镜、色彩诊断、发型和形象升级报告的 Agent skill 与提示词集合。',
    href: 'https://github.com/zaz52/personal-style-advisor',
    cover: '/covers/github-style.svg',
    tags: ['Agent Skill', 'Style', 'Prompt'],
    palette: 'violet',
  },
  {
    id: 'github-agent-reach',
    iconKey: 'sparkles',
    name: 'Agent Reach',
    type: 'AI Agent 网络信息读取工具',
    description: '为 AI Agent 提供跨平台读取和搜索能力，覆盖 Twitter、Reddit、YouTube、GitHub、Bilibili、小红书等公开信息源。',
    href: 'https://github.com/zaz52/Agent-Reach',
    cover: '/covers/github-agent.svg',
    tags: ['Agent', 'Search', 'CLI'],
    palette: 'blue',
  },
  {
    id: 'github-genius-fkoai',
    iconKey: 'fileText',
    name: 'GeniusFKoai',
    type: 'Python GitHub 项目',
    description: 'GitHub 上沉淀的 Python 项目，用于记录和整理 AI、自动化或实验性代码能力。',
    href: 'https://github.com/zaz52/GeniusFKoai',
    cover: '/covers/github-code.svg',
    tags: ['Python', 'AI', 'GitHub'],
    palette: 'cyan',
  },
  {
    id: 'github-yulesuangua-deploy',
    iconKey: 'sparkles',
    name: '乾坤之道部署脚本',
    type: 'Python 部署辅助项目',
    description: '围绕乾坤之道项目沉淀的部署与辅助脚本仓库，方便后续维护算卦相关站点和发布流程。',
    href: 'https://github.com/zaz52/yulesuangua-deploy',
    cover: '/covers/github-code.svg',
    tags: ['Python', 'Deploy', 'Divination'],
    palette: 'emerald',
  },
  {
    id: 'github-pages-archive',
    iconKey: 'sparkles',
    name: 'GitHub Pages 作品集备份',
    type: 'HTML 静态站点备份',
    description: '早期 GitHub Pages 个人网站仓库，作为个人网站迁移过程中的静态部署备份和历史版本。',
    href: 'https://github.com/zaz52/zaz52.github.io',
    cover: '/covers/github-portfolio.svg',
    tags: ['HTML', 'GitHub Pages', 'Archive'],
    palette: 'mint',
  },
];

const ICON_KEYS = new Set(['cloud', 'fileText', 'heartPulse', 'presentation', 'sparkles']);
const PALETTES = new Set(['blue', 'orange', 'mint', 'emerald', 'cyan', 'violet']);

const json = (data, init = {}) => new Response(JSON.stringify(data), {
  ...init,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    ...(init.headers || {}),
  },
});

const isAuthorized = (request, env) => {
  const password = env.ADMIN_PASSWORD;
  if (!password) return false;
  return request.headers.get('authorization') === `Bearer ${password}`;
};

const normalizeText = (value, maxLength) => String(value ?? '').trim().slice(0, maxLength);

const normalizePath = (value) => {
  const raw = normalizeText(value || '/', 180);
  if (!raw.startsWith('/')) return '/';
  return raw.split('#')[0].split('?')[0] || '/';
};

const DAY_MS = 86_400_000;
const CHINA_TIME_OFFSET_MS = 8 * 60 * 60 * 1000;

const getChinaDateKey = (date = new Date()) => new Date(date.getTime() + CHINA_TIME_OFFSET_MS).toISOString().slice(0, 10);

const getTodayKey = () => getChinaDateKey();

const detectDevice = (ua) => {
  const value = ua.toLowerCase();
  if (/ipad|tablet/.test(value)) return 'tablet';
  if (/mobile|iphone|ipod|android/.test(value)) return 'mobile';
  return 'desktop';
};

const detectBrowser = (ua) => {
  if (/edg\//i.test(ua)) return 'Edge';
  if (/firefox\//i.test(ua)) return 'Firefox';
  if (/chrome\//i.test(ua) || /crios\//i.test(ua)) return 'Chrome';
  if (/safari\//i.test(ua)) return 'Safari';
  return 'Other';
};

const getReferrerHost = (value) => {
  try {
    if (!value) return 'Direct';
    const host = new URL(value).hostname.replace(/^www\./, '');
    return host || 'Direct';
  } catch {
    return 'Direct';
  }
};

const increment = (record, group, key, amount = 1) => {
  record[group] = record[group] || {};
  record[group][key] = (Number(record[group][key]) || 0) + amount;
};

const emptyAnalytics = () => ({
  total: 0,
  byDay: {},
  byPath: {},
  byReferrer: {},
  byDevice: {},
  byBrowser: {},
  updatedAt: null,
});

const getAnalytics = async (env) => {
  const saved = await env.PROJECTS_KV?.get(ANALYTICS_KEY);
  if (!saved) return emptyAnalytics();

  try {
    return { ...emptyAnalytics(), ...JSON.parse(saved) };
  } catch {
    return emptyAnalytics();
  }
};

const toTopList = (items, limit = 8) => Object.entries(items || {})
  .map(([label, count]) => ({ label, count: Number(count) || 0 }))
  .sort((a, b) => b.count - a.count)
  .slice(0, limit);

const getAnalyticsSummary = async (env) => {
  const analytics = await getAnalytics(env);
  const today = getTodayKey();
  const recentDays = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(Date.now() - ((13 - index) * DAY_MS));
    const key = getChinaDateKey(date);
    return { date: key, views: Number(analytics.byDay?.[key]) || 0 };
  });

  return {
    total: Number(analytics.total) || 0,
    today: Number(analytics.byDay?.[today]) || 0,
    recentDays,
    topPages: toTopList(analytics.byPath),
    topReferrers: toTopList(analytics.byReferrer),
    devices: toTopList(analytics.byDevice, 4),
    browsers: toTopList(analytics.byBrowser, 6),
    updatedAt: analytics.updatedAt,
  };
};

const recordPageView = async (body, request, env) => {
  const ua = request.headers.get('user-agent') || '';
  const path = normalizePath(body.path);
  if (path.startsWith('/admin') || path.startsWith('/api')) return;

  const analytics = await getAnalytics(env);
  analytics.total = (Number(analytics.total) || 0) + 1;
  analytics.updatedAt = new Date().toISOString();

  increment(analytics, 'byDay', getTodayKey());
  increment(analytics, 'byPath', path);
  increment(analytics, 'byReferrer', getReferrerHost(body.referrer));
  increment(analytics, 'byDevice', detectDevice(ua));
  increment(analytics, 'byBrowser', detectBrowser(ua));

  await env.PROJECTS_KV.put(ANALYTICS_KEY, JSON.stringify(analytics));
};

const normalizeProjects = (input) => {
  if (!Array.isArray(input)) throw new Error('Projects must be an array');
  if (input.length > 50) throw new Error('Too many projects');

  const projects = input.map((item, index) => {
    const id = normalizeText(item.id || crypto.randomUUID(), 80).replace(/[^a-zA-Z0-9_-]/g, '-') || crypto.randomUUID();
    const iconKey = ICON_KEYS.has(item.iconKey) ? item.iconKey : 'sparkles';
    const palette = PALETTES.has(item.palette) ? item.palette : 'emerald';
    const tags = Array.isArray(item.tags) ? item.tags : String(item.tags ?? '').split(',');
    const cover = normalizeText(item.cover, 2_000_000);

    return {
      id,
      iconKey,
      name: normalizeText(item.name, 80) || `作品 ${index + 1}`,
      type: normalizeText(item.type, 80) || '项目',
      description: normalizeText(item.description, 260),
      href: normalizeText(item.href, 500),
      cover: cover || '/covers/resource-vault.svg',
      tags: tags.map((tag) => normalizeText(tag, 28)).filter(Boolean).slice(0, 8),
      palette,
      featured: Boolean(item.featured),
    };
  });

  const firstFeatured = projects.findIndex((project) => project.featured);
  projects.forEach((project, index) => {
    project.featured = firstFeatured >= 0 ? index === firstFeatured : index === 0;
  });

  return projects;
};

const getProjects = async (env) => {
  const saved = await env.PROJECTS_KV?.get(PROJECTS_KEY);
  if (!saved) return DEFAULT_PROJECTS;

  try {
    return normalizeProjects(JSON.parse(saved));
  } catch {
    return DEFAULT_PROJECTS;
  }
};

const escapeHtml = (value) => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const absoluteUrl = (value) => {
  const url = normalizeText(value, 2_000);
  if (!url || url.startsWith('data:')) return DEFAULT_OG_IMAGE;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
};

const baseSeo = {
  title: '唯一 | 复古科技青春自然个人网站',
  description: '唯一的个人作品集，展示 AI 工具、个人品牌网页、移动端界面、设计系统与复古科技自然风格项目。',
  url: `${SITE_URL}/`,
  image: DEFAULT_OG_IMAGE,
  robots: 'index,follow',
  type: 'website',
};

const getSeo = async (env, url) => {
  if (url.pathname === '/admin') {
    return {
      ...baseSeo,
      title: '后台管理 | 唯一',
      description: '唯一个人网站后台管理入口。',
      url: `${SITE_URL}/admin`,
      robots: 'noindex,nofollow',
    };
  }

  if (url.pathname === '/design-system') {
    return {
      ...baseSeo,
      title: '设计系统 | 唯一',
      description: '唯一的复古科技、青春自然风格设计系统，包含色彩、字体、按钮、卡片、表单和移动端组件。',
      url: `${SITE_URL}/design-system`,
    };
  }

  if (url.pathname === '/projects') {
    return {
      ...baseSeo,
      title: '全部作品 | 唯一',
      description: '查看唯一的全部作品，包括 AI 工具、GitHub 项目、个人品牌网站、移动端界面、自动化工具和设计系统项目。',
      url: `${SITE_URL}/projects`,
    };
  }

  if (url.pathname === '/skills' || url.pathname.startsWith('/skills/')) {
    return {
      ...baseSeo,
      title: 'AI 工作流与 Skills | 唯一',
      description: '唯一沉淀的 AI 工作流、Codex skills、自动化方法和可复用项目经验。',
      url: `${SITE_URL}${url.pathname}`,
    };
  }

  if (url.pathname.startsWith('/projects/')) {
    const projectId = decodeURIComponent(url.pathname.replace('/projects/', '').replace(/\/$/, ''));
    const project = (await getProjects(env)).find((item) => item.id === projectId);
    if (project) {
      return {
        ...baseSeo,
        title: `${project.name} | 唯一作品详情`,
        description: project.description || `${project.name} 的项目详情页。`,
        url: `${SITE_URL}/projects/${project.id}`,
        image: absoluteUrl(project.cover),
        type: 'article',
      };
    }

    return {
      ...baseSeo,
      title: '作品未找到 | 唯一',
      description: '这个项目可能已经在后台被删除或改名，可以回到作品区查看当前公开的项目列表。',
      url: `${SITE_URL}${url.pathname}`,
      robots: 'noindex,follow',
    };
  }

  return baseSeo;
};

const replaceOrInsert = (html, pattern, replacement) => (
  pattern.test(html) ? html.replace(pattern, replacement) : html.replace('<!-- SEO_META -->', `${replacement}\n    <!-- SEO_META -->`)
);

const injectSeo = (html, seo) => {
  const values = {
    title: escapeHtml(seo.title),
    description: escapeHtml(seo.description),
    url: escapeHtml(seo.url),
    image: escapeHtml(seo.image || DEFAULT_OG_IMAGE),
    robots: escapeHtml(seo.robots || 'index,follow'),
    type: escapeHtml(seo.type || 'website'),
  };

  let output = html
    .replace(/<title>.*?<\/title>/i, `<title>${values.title}</title>`)
    .replace('<!-- SEO_META -->', '');

  output = replaceOrInsert(output, /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${values.description}" />`);
  output = replaceOrInsert(output, /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i, `<meta name="robots" content="${values.robots}" />`);
  output = replaceOrInsert(output, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${values.url}" />`);
  output = replaceOrInsert(output, /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:type" content="${values.type}" />`);
  output = replaceOrInsert(output, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${values.title}" />`);
  output = replaceOrInsert(output, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${values.description}" />`);
  output = replaceOrInsert(output, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${values.url}" />`);
  output = replaceOrInsert(output, /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${values.image}" />`);
  output = replaceOrInsert(output, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${values.title}" />`);
  output = replaceOrInsert(output, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${values.description}" />`);
  output = replaceOrInsert(output, /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:image" content="${values.image}" />`);

  return output;
};

const renderIndex = async (request, env, url) => {
  const indexUrl = new URL(request.url);
  indexUrl.pathname = '/';
  const response = await env.ASSETS.fetch(new Request(indexUrl.toString(), { method: 'GET' }));
  const html = await response.text();
  const seo = await getSeo(env, url);

  return new Response(injectSeo(html, seo), {
    status: response.status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
};

const renderRobots = () => new Response([
  'User-agent: *',
  'Allow: /',
  'Disallow: /admin',
  '',
  `Sitemap: ${SITE_URL}/sitemap.xml`,
  '',
].join('\n'), {
  headers: {
    'content-type': 'text/plain; charset=utf-8',
    'cache-control': 'public, max-age=3600',
  },
});

const renderSitemap = async (env) => {
  const projects = await getProjects(env);
  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0' },
    { loc: `${SITE_URL}/projects`, priority: '0.9' },
    { loc: `${SITE_URL}/design-system`, priority: '0.6' },
    { loc: `${SITE_URL}/skills`, priority: '0.7' },
    ...projects.map((project) => ({ loc: `${SITE_URL}/projects/${project.id}`, priority: project.featured ? '0.9' : '0.8' })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((item) => `  <url><loc>${escapeHtml(item.loc)}</loc><priority>${item.priority}</priority></url>`).join('\n')}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
};

const handleApi = async (request, env, url, ctx) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204 });

  if (url.pathname === '/api/projects' && request.method === 'GET') {
    return json(await getProjects(env));
  }

  if (url.pathname === '/api/admin-check' && request.method === 'GET') {
    if (!isAuthorized(request, env)) return json({ ok: false }, { status: 401 });
    return json({ ok: true });
  }

  if (url.pathname === '/api/analytics/summary' && request.method === 'GET') {
    if (!isAuthorized(request, env)) return json({ error: 'Unauthorized' }, { status: 401 });
    return json(await getAnalyticsSummary(env));
  }

  if (url.pathname === '/api/analytics/pageview' && request.method === 'POST') {
    let body = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }
    const task = recordPageView(body, request, env);
    if (ctx?.waitUntil) ctx.waitUntil(task);
    else await task;
    return json({ ok: true }, { status: 202 });
  }

  if (url.pathname === '/api/projects' && request.method === 'PUT') {
    if (!isAuthorized(request, env)) return json({ error: 'Unauthorized' }, { status: 401 });
    const projects = normalizeProjects(await request.json());
    await env.PROJECTS_KV.put(PROJECTS_KEY, JSON.stringify(projects));
    return json(projects);
  }

  /* 留言板：存在 KV，无需登录 */
  if (url.pathname === '/api/guestbook' && request.method === 'GET') {
    let list = [];
    try {
      const raw = await env.PROJECTS_KV?.get('guestbook:v1');
      list = JSON.parse(raw || '[]');
    } catch {
      list = [];
    }
    return json({ messages: Array.isArray(list) ? list.slice(0, 50) : [] });
  }

  if (url.pathname === '/api/guestbook' && request.method === 'POST') {
    let body = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }
    const name = String(body.name || '').trim().slice(0, 20);
    const message = String(body.message || '').trim().slice(0, 200);
    if (!name || !message) return json({ error: '昵称和留言都不能为空' }, { status: 400 });
    /* 简单限流：同一 IP 60 秒只能留一次 */
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    if (await env.PROJECTS_KV?.get(`gb:rl:${ip}`)) {
      return json({ error: '发言太快了，喝口水再来' }, { status: 429 });
    }
    const esc = (s) =>
      s.replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));
    let list = [];
    try {
      list = JSON.parse((await env.PROJECTS_KV?.get('guestbook:v1')) || '[]');
    } catch {
      list = [];
    }
    if (!Array.isArray(list)) list = [];
    list.unshift({ name: esc(name), message: esc(message), at: Date.now() });
    await env.PROJECTS_KV?.put('guestbook:v1', JSON.stringify(list.slice(0, 100)));
    await env.PROJECTS_KV?.put(`gb:rl:${ip}`, '1', { expirationTtl: 60 });
    return json({ ok: true });
  }

  return json({ error: 'Not found' }, { status: 404 });
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/world/')) return env.ASSETS.fetch(request);
    if (url.pathname === '/world') return Response.redirect(new URL('/world/', url).toString(), 302);
    if (url.pathname === '/robots.txt') return renderRobots();
    if (url.pathname === '/sitemap.xml') return renderSitemap(env);
    if (url.pathname.startsWith('/api/')) return handleApi(request, env, url, ctx);

    if (!url.pathname.split('/').pop()?.includes('.')) {
      return renderIndex(request, env, url);
    }

    try {
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) return response;
    } catch {
      // Unknown SPA routes are handled by the index fallback below.
    }

    const indexUrl = new URL(request.url);
    indexUrl.pathname = '/';
    return env.ASSETS.fetch(new Request(indexUrl.toString(), { method: 'GET' }));
  },
};
