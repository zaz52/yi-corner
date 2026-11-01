import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import {
  ArrowUpRight,
  Clapperboard,
  FlaskConical,
  Gamepad2,
  Github,
  Music,
  ShoppingBag,
  Smartphone,
  X,
  Zap,
} from 'lucide-react';
import ClassicApp from './ClassicApp';
import { defaultProjects as projects } from './data/siteProjects';
import { defaultContacts as contacts } from './data/siteContacts';
import { toolbox } from './data/toolbox';

/* ================= 数据：全部是站长自己的内容 ================= */

const MENU_LINKS = [
  { label: '站点', href: '#sites' },
  { label: '作品', href: '#works' },
  { label: '工具', href: '#toolbox' },
  { label: '游戏', href: '#games' },
  { label: '关于', href: '#about' },
];

interface MySite {
  tag: string;
  name: string;
  desc: string;
  href: string;
  cta: string;
  visual: string;
}

const SITES: MySite[] = [
  {
    tag: '🏪 我的小店 · 🔥 主推',
    name: 'AI 代充小店',
    desc: '常用 AI 订阅代充，价格实惠，欢迎光顾。',
    href: 'https://999.lsrai.shop/',
    cta: '进店看看',
    visual: 'bg-orange-500',
  },
  {
    tag: '🍎 共享账号',
    name: '苹果共享ID',
    desc: '共享 Apple ID 资源，拿来即用，下载应用更方便。',
    href: 'https://id.qianyuwing.com/',
    cta: '去看看',
    visual: 'bg-zinc-900',
  },
  {
    tag: '⚡ 我的创作台',
    name: 'X-Deck 实时创作台',
    desc: '聚合热点、收集灵感、打磨下一条推文。',
    href: 'https://x.weiyi.indevs.in/',
    cta: '打开创作台',
    visual: 'bg-indigo-950',
  },
  {
    tag: '🎬 视频导航',
    name: '唯影导航',
    desc: '全类型视频网站导航库，已收录 143 个平台。',
    href: 'https://nav.weiyi.indevs.in/',
    cta: '去逛逛',
    visual: 'bg-sky-500',
  },
  {
    tag: '🎵 音乐下载',
    name: '无损音乐下载',
    desc: '免费无损音乐搜索下载，FLAC 音质收藏。',
    href: 'https://flac.music.hi.cn/',
    cta: '去下载',
    visual: 'bg-violet-600',
  },
  {
    tag: '🔬 科学备课',
    name: '知微工作台',
    desc: '小学科学探究备课工作台，教案设计一键生成。',
    href: 'https://zhiwei.weiyi.indevs.in/',
    cta: '去备课',
    visual: 'bg-[#A34D28]',
  },
];

const SITE_ICONS = [ShoppingBag, Smartphone, Zap, Clapperboard, Music, FlaskConical];

const WORK_VISUALS = [
  'bg-[#FF4D8D]',
  'bg-[#7C5CFF]',
  'bg-[#00C48C]',
  'bg-[#FF8A00]',
  'bg-[#2434FF]',
  'bg-[#00B8D9]',
];

const GAMES = [
  {
    name: '星尘躲避',
    desc: '开着小飞船躲星尘，解压休闲。',
    href: '?view=classic#games',
    visual: 'bg-[#7C5CFF]',
  },
  {
    name: '记忆翻牌',
    desc: '4x4 翻牌配对，比比谁步数少。',
    href: '?view=classic#games',
    visual: 'bg-[#00C48C]',
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

function BigPhrase({ words, className = '' }: { words: string[]; className?: string }) {
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
    <p ref={ref} className={`max-w-5xl font-medium text-balance ${className}`}>
      {words.map((word, i) => (
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

/* 首屏黑色视觉块里的光泽插接件：纯 CSS 画，不用 WebGL */
function Cross({
  bar,
  style,
  floatClass = 'cross-float-a',
}: {
  bar: string;
  style?: CSSProperties;
  floatClass?: string;
}) {
  return (
    <div aria-hidden className="absolute" style={style}>
      <div className={`${floatClass} size-full`}>
        <div className="relative size-full">
          <div className={`absolute left-1/2 top-1/2 h-[20%] w-full -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg ${bar}`} />
          <div className={`absolute left-1/2 top-1/2 h-full w-[20%] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg ${bar}`} />
        </div>
      </div>
    </div>
  );
}

function Ribbon() {
  return (
    <svg
      aria-hidden
      className="ribbon-float pointer-events-none absolute left-[-10%] top-1/2 h-40 w-[120%] -translate-y-1/2 opacity-90 md:h-56"
      viewBox="0 0 1440 220"
      fill="none"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2434FF" />
          <stop offset="100%" stopColor="#35E0E6" />
        </linearGradient>
      </defs>
      <path
        d="M-40 110 C 240 20, 480 200, 720 110 S 1200 20, 1480 110"
        stroke="url(#ribbonGrad)"
        strokeWidth="36"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ================= 新首页：按 Lusion 真实视觉 ================= */

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#EDF0F3] text-[#0A0A0C] antialiased">
      <a
        href="#sites"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-[#0A0A0C] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        跳到内容
      </a>

      {/* 悬浮透明顶栏 */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
        <nav aria-label="主导航" className="flex items-center justify-between">
          <a href="#" className="text-lg font-bold tracking-wide">
            壹隅 <span className="text-xs font-bold">YI CORNER</span>
          </a>
          <div className="flex items-center gap-2">
            <a
              href="?view=classic"
              className="rounded-full bg-[#0A0A0C] px-4 py-2 text-sm font-bold text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 active:scale-[0.98]"
            >
              进入经典版 •
            </a>
            <button
              type="button"
              aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full bg-black/5 px-4 py-2 text-sm font-bold transition-colors duration-300 hover:bg-black/10"
            >
              MENU {menuOpen ? <X size={16} /> : <span aria-hidden>••</span>}
            </button>
          </div>
        </nav>
      </header>

      {/* 移动端全屏菜单 */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center bg-[#EDF0F3]/95 px-8 backdrop-blur-md">
          <div className="space-y-2">
            {MENU_LINKS.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="menu-link block py-2 text-4xl font-medium"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="?view=classic"
              className="menu-link block py-2 text-4xl font-medium text-[#2434FF]"
              style={{ transitionDelay: `${MENU_LINKS.length * 60}ms` }}
            >
              进入经典版
            </a>
          </div>
        </div>
      )}

      <main>
        {/* 首屏：标题偏右起，黑色 3D 视觉块 */}
        <section className="px-4 pt-28 md:px-[5%] md:pt-36">
          <div className="md:ml-[16%]">
            <h1 className="max-w-3xl text-[2rem] leading-[1.2] font-medium text-balance md:text-[2.75rem]">
              别人的网站是拿来看的，
              <br />
              我的网站，是拿来玩的。
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-black/60 md:text-xl">
              壹隅收着我的 AI 工具、作品、游戏和导航。随便逛，看到喜欢的就点进去玩。
            </p>
          </div>
          <Reveal className="mt-10">
            <div className="work-visual relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#0A0A0C] md:aspect-[16/8]">
              <Cross
                bar="bg-[linear-gradient(180deg,#5a68ff,#1e2bff)]"
                style={{ top: '18%', left: '56%', width: 150, height: 150, transform: 'rotate(18deg)' }}
                floatClass="cross-float-a"
              />
              <Cross
                bar="bg-[linear-gradient(180deg,#ffffff,#c9c9d1)]"
                style={{ top: '42%', left: '30%', width: 120, height: 120, transform: 'rotate(-14deg)' }}
                floatClass="cross-float-b"
              />
              <Cross
                bar="bg-[linear-gradient(180deg,#3a3a42,#0a0a0c)]"
                style={{ top: '8%', left: '18%', width: 100, height: 100, transform: 'rotate(32deg)' }}
                floatClass="cross-float-c"
              />
              <Cross
                bar="bg-[linear-gradient(180deg,#5a68ff,#1e2bff)]"
                style={{ top: '58%', left: '72%', width: 110, height: 110, transform: 'rotate(-24deg)' }}
                floatClass="cross-float-b"
              />
              <Cross
                bar="bg-[linear-gradient(180deg,#ffffff,#c9c9d1)]"
                style={{ top: '30%', left: '80%', width: 84, height: 84, transform: 'rotate(40deg)' }}
                floatClass="cross-float-a"
              />
              <span aria-hidden className="absolute top-4 left-6 text-lg text-white/40">+</span>
              <span aria-hidden className="absolute right-6 bottom-4 text-lg text-white/40">+</span>
            </div>
          </Reveal>
          <div className="flex items-center justify-center gap-6 py-6 text-xs font-bold tracking-[0.2em] text-black/50 uppercase">
            <span aria-hidden>+</span>
            <span>Scroll to explore</span>
            <span aria-hidden>+</span>
          </div>
        </section>

        {/* 理念大字 */}
        <section className="px-4 py-20 md:px-[5%] md:py-28">
          <Reveal>
            <BigPhrase
              words={['好玩，', '才值得被记住。']}
              className="text-[clamp(3rem,9vw,8.5rem)] leading-[1.05]"
            />
          </Reveal>
        </section>

        {/* 我的站点：通栏主推＋图片主导网格 */}
        <section id="sites" className="scroll-mt-28 px-4 pb-24 md:px-[5%]">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] text-black/50 uppercase">My sites •</p>
            <h2 className="mt-2 text-4xl font-medium md:text-6xl">我的站点</h2>
          </Reveal>
          <div className="mt-10">
            <Reveal>
              <a
                href={SITES[0].href}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-[20px]"
              >
                <div className={`work-visual flex aspect-[16/10] flex-col justify-end p-6 md:aspect-[21/9] md:p-10 ${SITES[0].visual}`}>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
                    {SITES[0].tag}
                  </span>
                  <h3 className="mt-4 text-4xl font-medium text-white md:text-6xl">{SITES[0].name}</h3>
                  <p className="mt-2 max-w-xl text-base text-white/85 md:text-xl">{SITES[0].desc}</p>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-xs font-bold tracking-[0.2em] text-black/50 uppercase">Shop • Featured</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0C] px-5 py-2.5 text-sm font-bold text-white transition-transform duration-500 group-hover:scale-105">
                    {SITES[0].cta} <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>
            </Reveal>
            <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
              {SITES.slice(1).map((site, i) => {
                const Icon = SITE_ICONS[i + 1];
                return (
                  <Reveal key={site.href}>
                    <a href={site.href} target="_blank" rel="noreferrer" className="group block">
                      <div className={`work-visual relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[20px] ${site.visual}`}>
                        <Icon size={96} strokeWidth={1.2} className="text-white/90 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
                        <span aria-hidden className="absolute top-4 left-5 text-lg text-white/50">+</span>
                        <span aria-hidden className="absolute right-5 bottom-4 text-lg text-white/50">+</span>
                      </div>
                      <p className="pt-4 text-xs font-bold tracking-[0.2em] text-black/50 uppercase">{site.tag}</p>
                      <h3 className="mt-2 flex items-center gap-2 text-3xl font-medium md:text-5xl">
                        {site.name}
                        <ArrowUpRight size={28} className="shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </h3>
                      <p className="mt-2 max-w-md text-base leading-relaxed text-black/60 md:text-lg">{site.desc}</p>
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* 精选作品：图片主导，无边框无阴影 */}
        <section id="works" className="scroll-mt-28 px-4 pb-24 md:px-[5%]">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] text-black/50 uppercase">Featured work •</p>
            <h2 className="mt-2 text-4xl font-medium md:text-6xl">精选作品</h2>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal key={project.href}>
                <article className="group">
                  <a href={project.href} target="_blank" rel="noreferrer" className="block">
                    <div className={`work-visual relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[20px] ${WORK_VISUALS[i % WORK_VISUALS.length]}`}>
                      <span aria-hidden className="text-[7rem] leading-none font-bold text-white/90 md:text-[9rem]">
                        {project.name.charAt(0)}
                      </span>
                      <span aria-hidden className="absolute top-4 left-5 text-lg text-white/50">+</span>
                      <span aria-hidden className="absolute right-5 bottom-4 text-lg text-white/50">+</span>
                    </div>
                    <p className="pt-4 text-xs font-bold tracking-[0.2em] text-black/50 uppercase">
                      {[project.type, ...project.tags].join(' • ')}
                    </p>
                    <h3 className="mt-2 flex items-center gap-2 text-3xl font-medium md:text-5xl">
                      {project.featured ? '→ ' : ''}{project.name}
                      <ArrowUpRight size={28} className="shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </h3>
                    <p className="mt-2 max-w-md text-base leading-relaxed text-black/60 md:text-lg">{project.desc}</p>
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-black/60"
                    >
                      <Github size={16} /> 代码
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 宝蓝到青色的波浪带 */}
        <div aria-hidden className="relative h-40 overflow-visible md:h-56">
          <Ribbon />
        </div>

        {/* 理念大字二 */}
        <section className="px-4 py-20 md:px-[5%] md:py-28">
          <Reveal>
            <BigPhrase
              words={['有用的东西，', '也该长得好看。']}
              className="text-[clamp(3rem,9vw,8.5rem)] leading-[1.05]"
            />
          </Reveal>
        </section>

        {/* 工具箱：干净行列，无卡片铬 */}
        <section id="toolbox" className="scroll-mt-28 px-4 pb-24 md:px-[5%]">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] text-black/50 uppercase">Toolbox •</p>
            <h2 className="mt-2 text-4xl font-medium md:text-6xl">工具箱</h2>
          </Reveal>
          <div className="mt-10 space-y-12">
            {toolbox.map((category) => (
              <div key={category.name}>
                <h3 className="border-t border-black/10 pt-4 text-lg font-bold">
                  {category.emoji} {category.name}
                  <span className="ml-2 text-sm font-bold text-black/50">{category.tools.length} 个</span>
                </h3>
                <div className="mt-4 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.tools.map((tool) => (
                    <a key={tool.url} href={tool.url} target="_blank" rel="noreferrer" className="group block">
                      <p className="flex items-center gap-2 text-base font-bold">
                        {tool.name}
                        {tool.mine && (
                          <span className="rounded-full bg-[#2434FF] px-2 py-0.5 text-xs font-bold text-white">
                            自制
                          </span>
                        )}
                        <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-black/60">{tool.desc}</p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 小游戏 */}
        <section id="games" className="scroll-mt-28 px-4 pb-24 md:px-[5%]">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] text-black/50 uppercase">Games •</p>
            <h2 className="mt-2 text-4xl font-medium md:text-6xl">小游戏</h2>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {GAMES.map((game) => (
              <Reveal key={game.name}>
                <a href={game.href} className="group block">
                  <div className={`work-visual relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[20px] ${game.visual}`}>
                    <Gamepad2 size={96} strokeWidth={1.2} className="text-white/90 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
                    <span aria-hidden className="absolute top-4 left-5 text-lg text-white/50">+</span>
                    <span aria-hidden className="absolute right-5 bottom-4 text-lg text-white/50">+</span>
                  </div>
                  <h3 className="mt-4 flex items-center gap-2 text-3xl font-medium md:text-5xl">
                    {game.name}
                    <ArrowUpRight size={28} className="shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </h3>
                  <p className="mt-2 text-base text-black/60 md:text-lg">{game.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm font-bold text-black/50">
            游戏本体在经典版里，点卡片直接跳过去玩。
          </p>
        </section>

        {/* 关于 */}
        <section id="about" className="scroll-mt-28 px-4 pb-24 md:px-[5%]">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] text-black/50 uppercase">About •</p>
            <h2 className="mt-2 text-4xl font-medium md:text-6xl">关于苍柏</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/70 md:text-xl">
              我是苍柏，一个持续探索 AI 工具、个人品牌网站、移动端界面和视觉系统的创作者。喜欢把复古电脑、自然植物、奶油纸张和轻科技动效放进界面里，让作品既有功能，也有记忆点。
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-medium md:text-5xl">{stat.value}</p>
                  <p className="mt-2 text-sm font-bold tracking-[0.2em] text-black/50 uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
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
                    className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0C] px-4 py-2 text-sm text-white transition-transform duration-500 hover:scale-105"
                  >
                    {inner}
                  </a>
                ) : (
                  <span
                    key={contact.label}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0A0A0C] px-4 py-2 text-sm text-white"
                  >
                    {inner}
                  </span>
                );
              })}
            </div>
          </Reveal>
        </section>
      </main>

      {/* 黑色结尾 */}
      <footer className="bg-[#0A0A0C] px-4 py-24 text-white md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <p className="text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.05] font-medium text-balance">
              来玩一圈，
              <br />
              看看你最想逛哪。
            </p>
            <a
              href="?view=classic"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-base font-bold text-black transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 active:scale-[0.98]"
            >
              进入经典版 •
            </a>
            <div className="mt-16 flex flex-col items-center justify-between gap-4 text-sm font-bold text-white/50 md:flex-row">
              <p>壹隅 YI CORNER · 苍柏</p>
              <p>用 React 和 Tailwind 手工搭建，手机打开也不卡。</p>
              <a href="?view=classic" className="hover:text-white">经典版</a>
            </div>
          </Reveal>
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
