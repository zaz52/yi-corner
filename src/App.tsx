import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Clapperboard,
  FlaskConical,
  FolderKanban,
  Gamepad2,
  Github,
  Globe,
  Menu,
  Music,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import ClassicApp from './ClassicApp';
import { defaultProjects as projects } from './data/siteProjects';
import { defaultContacts as contacts } from './data/siteContacts';
import { toolbox } from './data/toolbox';

/* ================= 数据：全部是站长自己的内容 ================= */

const NAV = [
  { label: '站点', href: '#sites' },
  { label: '作品', href: '#works' },
  { label: '工具', href: '#toolbox' },
  { label: '游戏', href: '#games' },
  { label: '关于', href: '#about' },
];

const MARQUEE = [
  'React', 'TypeScript', 'AI 工具', 'UI 设计', '动效交互', 'Tailwind CSS',
  'Vite', '开源工具', '移动端体验', '提示词工程', '产品思维', '视觉系统',
];

interface MySite {
  tag: string;
  name: string;
  desc: string;
  href: string;
  cta: string;
  card: string;
}

const SITES: MySite[] = [
  {
    tag: '🏪 我的小店 · 🔥 主推',
    name: 'AI 代充小店',
    desc: '常用 AI 订阅代充，价格实惠，欢迎光顾。',
    href: 'https://999.lsrai.shop/',
    cta: '进店看看',
    card: 'bg-orange-500 text-white shadow-orange-200',
  },
  {
    tag: '🍎 共享账号',
    name: '苹果共享ID',
    desc: '共享 Apple ID 资源，拿来即用，下载应用更方便。',
    href: 'https://id.qianyuwing.com/',
    cta: '去看看',
    card: 'bg-zinc-900 text-white shadow-zinc-300',
  },
  {
    tag: '⚡ 我的创作台',
    name: 'X-Deck 实时创作台',
    desc: '聚合热点、收集灵感、打磨下一条推文。',
    href: 'https://x.weiyi.indevs.in/',
    cta: '打开创作台',
    card: 'bg-indigo-950 text-white shadow-indigo-200',
  },
  {
    tag: '🎬 视频导航',
    name: '唯影导航',
    desc: '全类型视频网站导航库，已收录 143 个平台。',
    href: 'https://nav.weiyi.indevs.in/',
    cta: '去逛逛',
    card: 'bg-sky-500 text-white shadow-sky-200',
  },
  {
    tag: '🎵 音乐下载',
    name: '无损音乐下载',
    desc: '免费无损音乐搜索下载，FLAC 音质收藏。',
    href: 'https://flac.music.hi.cn/',
    cta: '去下载',
    card: 'bg-violet-600 text-white shadow-purple-200',
  },
  {
    tag: '🔬 科学备课',
    name: '知微工作台',
    desc: '小学科学探究备课工作台，教案设计一键生成。',
    href: 'https://zhiwei.weiyi.indevs.in/',
    cta: '去备课',
    card: 'bg-[#A34D28] text-white shadow-orange-200',
  },
];

const SITE_ICONS = [ShoppingBag, Smartphone, Zap, Clapperboard, Music, FlaskConical];

const GAMES = [
  {
    name: '星尘躲避',
    desc: '开着小飞船躲星尘，解压休闲。',
    href: '?view=classic#games',
  },
  {
    name: '记忆翻牌',
    desc: '4x4 翻牌配对，比比谁步数少。',
    href: '?view=classic#games',
  },
];

const STATS = [
  { value: '10', label: '作品项目' },
  { value: '120+', label: '设计组件' },
  { value: '30+', label: '创意练习' },
  { value: '100%', label: '关注体验' },
];

/* ================= 动效：只用 transform 与 opacity ================= */

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

const TAGLINE_WORDS = ['好玩，', '才值得被记住。', '有用的东西，', '也该长得好看。'];

function Tagline() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setOn(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <p ref={ref} className="max-w-3xl text-4xl leading-tight font-bold text-balance md:text-6xl">
      {TAGLINE_WORDS.map((word, i) => (
        <span
          key={word}
          className={`tag-word ${on ? 'on' : ''}`}
          style={{ transitionDelay: `${i * 120}ms` }}
        >
          {word}{' '}
        </span>
      ))}
    </p>
  );
}

/* ================= 新首页 ================= */

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF6E9] text-[#2B123D] antialiased">
      <a
        href="#sites"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-[#2B123D] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        跳到内容
      </a>

      {/* 悬浮导航 */}
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label="主导航"
          className="flex w-full max-w-3xl items-center justify-between gap-4 rounded-full border border-[#2B123D]/10 bg-white/80 py-2 pr-2 pl-5 shadow-lg shadow-orange-100 backdrop-blur-md"
        >
          <a href="#" className="text-base font-bold tracking-tight">
            壹隅 <span className="text-xs font-bold text-[#E86A33]">YI CORNER</span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-bold transition-colors duration-300 hover:bg-[#FFF1DC]"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href="?view=classic"
              className="hidden rounded-full bg-[#2B123D] px-4 py-2 text-sm font-bold text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 active:scale-[0.98] sm:block"
            >
              进入经典版
            </a>
            <button
              type="button"
              aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-full p-2 transition-colors duration-300 hover:bg-[#FFF1DC] md:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* 移动端全屏菜单 */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center bg-[#FFF6E9]/95 px-8 backdrop-blur-md md:hidden">
          <div className="space-y-2">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="menu-link block py-2 text-4xl font-bold"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="?view=classic"
              className="menu-link block py-2 text-4xl font-bold text-[#E86A33]"
              style={{ transitionDelay: `${NAV.length * 60}ms` }}
            >
              进入经典版
            </a>
          </div>
        </div>
      )}

      <main>
        {/* 主视觉 */}
        <section className="relative overflow-hidden px-4 pt-32 pb-16 md:pt-40 md:pb-24">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="blob blob-a absolute -top-10 right-[8%] size-56 rounded-full bg-amber-300/70 blur-3xl md:size-80" />
            <div className="blob blob-b absolute top-64 left-[4%] size-48 rounded-full bg-rose-300/60 blur-3xl md:size-72" />
            <div className="blob blob-c absolute right-[16%] bottom-0 size-40 rounded-full bg-sky-300/60 blur-3xl md:size-64" />
          </div>
          <div className="relative mx-auto max-w-5xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#2B123D]/10 bg-white/80 px-4 py-2 text-sm font-bold">
              <Sparkles size={16} className="text-[#E86A33]" />
              苍柏的个人小世界
            </p>
            <h1 className="mx-auto mt-8 max-w-3xl text-5xl leading-[1.1] font-bold text-balance md:text-7xl">
              别人的网站是拿来看的，
              <br />
              我的网站，是拿来玩的。
            </h1>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-[#2B123D]/70 md:text-lg">
              壹隅收着我的 AI 工具、作品、游戏和导航。随便逛，看到喜欢的就点进去玩。
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#works"
                className="inline-flex items-center gap-2 rounded-full bg-[#2B123D] px-7 py-3 text-base font-bold text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 active:scale-[0.98]"
              >
                逛逛作品 <ArrowDown size={18} />
              </a>
              <a
                href="?view=classic"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#2B123D] px-7 py-3 text-base font-bold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 active:scale-[0.98]"
              >
                进入经典版 <ArrowUpRight size={18} />
              </a>
            </div>
            <p className="mt-10 text-sm font-bold text-[#2B123D]/50">
              小店 · 影院 · 创作台 · 导航 · 工具 · 游戏，全在这里
            </p>
          </div>
        </section>

        {/* 跑马灯 */}
        <div aria-hidden className="overflow-hidden border-y border-[#2B123D]/10 bg-white/70 py-4">
          <div className="marquee-track flex w-max items-center gap-8">
            {[...MARQUEE, ...MARQUEE].map((tag, i) => (
              <span key={`${tag}-${i}`} className="text-base font-bold whitespace-nowrap">
                {tag} <span className="ml-8 text-[#E86A33]">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* 大字金句 */}
        <section className="px-4 py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <Tagline />
            </Reveal>
          </div>
        </section>

        {/* 我的站点 */}
        <section id="sites" className="scroll-mt-28 px-4 pb-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-sm font-bold text-[#E86A33]">
                    <Globe size={16} /> SITES
                  </p>
                  <h2 className="mt-2 text-3xl font-bold md:text-5xl">我的站点</h2>
                </div>
                <p className="hidden text-sm font-bold text-[#2B123D]/50 md:block">自建与收藏</p>
              </div>
            </Reveal>
            <div className="mt-8 space-y-5">
              <Reveal>
                <a
                  href={SITES[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group flex flex-col gap-4 rounded-[1.75rem] p-7 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-2xl md:flex-row md:items-center md:px-9 md:py-8 ${SITES[0].card}`}
                >
                  <div className="flex-1">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 text-xs font-bold">
                      {SITES[0].tag}
                    </span>
                    <h3 className="mt-3 text-2xl font-bold md:text-3xl">{SITES[0].name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/85 md:text-base">{SITES[0].desc}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-7 py-3 text-sm font-bold text-orange-600 shadow-lg transition-transform duration-500 group-hover:scale-105 md:self-center">
                    {SITES[0].cta} <ArrowUpRight size={16} />
                  </span>
                </a>
              </Reveal>
              <div className="grid gap-5 md:grid-cols-2">
                {SITES.slice(1).map((site, i) => {
                  const Icon = SITE_ICONS[i + 1];
                  return (
                    <Reveal key={site.href}>
                      <a
                        href={site.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`group flex h-full flex-col rounded-[1.75rem] p-7 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-2xl ${site.card}`}
                      >
                        <div>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                            <Icon size={14} /> {site.tag}
                          </span>
                          <h3 className="mt-3 text-xl font-bold">{site.name}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-white/85">{site.desc}</p>
                        </div>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-bold">
                          {site.cta} <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </a>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 精选作品 */}
        <section id="works" className="scroll-mt-28 px-4 pb-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-sm font-bold text-[#E86A33]">
                    <FolderKanban size={16} /> FEATURED WORK
                  </p>
                  <h2 className="mt-2 text-3xl font-bold md:text-5xl">精选作品</h2>
                </div>
                <p className="hidden text-sm font-bold text-[#2B123D]/50 md:block">做出来的东西</p>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {projects.map((project) => (
                <Reveal key={project.href}>
                  <article className="flex h-full flex-col rounded-3xl border border-[#2B123D]/10 bg-white p-6 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-bold text-[#2B123D]/50">{project.type}</p>
                      {project.featured && (
                        <span className="rounded-full bg-[#FFF1DC] px-3 py-1 text-xs font-bold text-[#E86A33]">
                          精选
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 text-xl font-bold">{project.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#2B123D]/70">{project.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-[#FFF6E9] px-3 py-1 text-xs font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center gap-4 pt-6">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E86A33]"
                      >
                        打开 <ArrowUpRight size={16} />
                      </a>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.name} 的 GitHub 仓库`}
                          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2B123D]/60"
                        >
                          <Github size={16} /> 代码
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 工具箱 */}
        <section id="toolbox" className="scroll-mt-28 px-4 pb-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-sm font-bold text-[#E86A33]">
                    <Wrench size={16} /> TOOLBOX
                  </p>
                  <h2 className="mt-2 text-3xl font-bold md:text-5xl">工具箱</h2>
                </div>
                <p className="hidden text-sm font-bold text-[#2B123D]/50 md:block">顺手收着的好东西</p>
              </div>
            </Reveal>
            <div className="mt-8 space-y-10">
              {toolbox.map((category) => (
                <div key={category.name}>
                  <h3 className="text-lg font-bold">
                    {category.emoji} {category.name}
                    <span className="ml-2 text-sm font-bold text-[#2B123D]/50">{category.tools.length} 个</span>
                  </h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {category.tools.map((tool) => (
                      <a
                        key={tool.url}
                        href={tool.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group rounded-3xl border border-[#2B123D]/10 bg-white p-5 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-xl"
                      >
                        <p className="flex items-center gap-2 text-sm font-bold">
                          {tool.name}
                          {tool.mine && (
                            <span className="rounded-full bg-[#FFF1DC] px-2 py-0.5 text-xs font-bold text-[#E86A33]">
                              自制
                            </span>
                          )}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[#2B123D]/70">{tool.desc}</p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#E86A33]">
                          打开
                          <ArrowUpRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 小游戏 */}
        <section id="games" className="scroll-mt-28 px-4 pb-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-sm font-bold text-[#E86A33]">
                    <Gamepad2 size={16} /> GAMES
                  </p>
                  <h2 className="mt-2 text-3xl font-bold md:text-5xl">小游戏</h2>
                </div>
                <p className="hidden text-sm font-bold text-[#2B123D]/50 md:block">点开就能玩</p>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {GAMES.map((game) => (
                <Reveal key={game.name}>
                  <a
                    href={game.href}
                    className="group flex items-center gap-4 rounded-3xl bg-[#2B123D] p-6 text-white shadow-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                      <Gamepad2 size={24} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-lg font-bold">{game.name}</span>
                      <span className="mt-1 block text-sm text-white/70">{game.desc}</span>
                    </span>
                    <ArrowUpRight size={20} className="shrink-0 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Reveal>
              ))}
            </div>
            <p className="mt-4 text-sm font-bold text-[#2B123D]/50">
              游戏本体在经典版里，点卡片直接跳过去玩。
            </p>
          </div>
        </section>

        {/* 关于与联系 */}
        <section id="about" className="scroll-mt-28 px-4 pb-24">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <div className="rounded-[2rem] bg-[#2B123D] p-8 text-white md:p-12">
                <p className="text-sm font-bold text-[#FFB98A]">ABOUT</p>
                <h2 className="mt-2 text-3xl font-bold md:text-5xl">关于苍柏</h2>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80">
                  我是苍柏，一个持续探索 AI 工具、个人品牌网站、移动端界面和视觉系统的创作者。喜欢把复古电脑、自然植物、奶油纸张和轻科技动效放进界面里，让作品既有功能，也有记忆点。
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="rounded-3xl bg-white/10 p-4">
                      <p className="text-2xl font-bold md:text-3xl">{stat.value}</p>
                      <p className="mt-1 text-sm text-white/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div id="contact" className="mt-10 flex flex-wrap gap-3">
                  {contacts.map((contact) => {
                    const Icon = contact.icon;
                    const inner = (
                      <>
                        <Icon size={16} />
                        <span className="font-bold">{contact.label}</span>
                        <span className="text-white/70">{contact.value}</span>
                      </>
                    );
                    return contact.href ? (
                      <a
                        key={contact.label}
                        href={contact.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm transition-colors duration-300 hover:bg-white/20"
                      >
                        {inner}
                      </a>
                    ) : (
                      <span
                        key={contact.label}
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm"
                      >
                        {inner}
                      </span>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#2B123D]/10 px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm font-bold text-[#2B123D]/60 md:flex-row">
          <p>壹隅 YI CORNER · 苍柏</p>
          <p>用 React 和 Tailwind 手工搭建，手机打开也不卡。</p>
          <div className="flex gap-4">
            <a href="?view=classic" className="hover:text-[#2B123D]">经典版</a>
            <a href="https://github.com/zaz52" target="_blank" rel="noreferrer" className="hover:text-[#2B123D]">GitHub</a>
            <a href="https://x.com/Cangbaic" target="_blank" rel="noreferrer" className="hover:text-[#2B123D]">X</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const classic = new URLSearchParams(window.location.search).get('view') === 'classic';
  if (classic) return <ClassicApp />;
  return <Home />;
}
