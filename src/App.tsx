import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import Lenis from 'lenis';
import {
  ArrowUpRight,
  Github,
  X,
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

/* 卡片配图：纯 SVG 插画，不放文字 */
function CardArt({ variant, bg, wide = false }: { variant: number; bg: string; wide?: boolean }) {
  return (
    <div
      className={`work-visual relative overflow-hidden rounded-[20px] ${wide ? 'aspect-[16/10] md:aspect-[21/9]' : 'aspect-[16/10]'} ${bg}`}
    >
      <svg
        aria-hidden
        className="absolute inset-0 size-full"
        viewBox="0 0 400 250"
        preserveAspectRatio="xMidYMid slice"
      >
        {variant === 0 && (
          <>
            <circle cx="200" cy="125" r="55" fill="#ffffff" opacity="0.95" />
            <ellipse cx="200" cy="125" rx="115" ry="34" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" transform="rotate(-20 200 125)" />
            <ellipse cx="200" cy="125" rx="135" ry="26" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" transform="rotate(14 200 125)" />
            <circle cx="305" cy="88" r="8" fill="#ffffff" />
            <circle cx="92" cy="168" r="6" fill="#ffffff" opacity="0.8" />
            <circle cx="200" cy="125" r="22" fill="#000000" opacity="0.12" />
          </>
        )}
        {variant === 1 && (
          <>
            <path d="M0 150 C 70 100, 130 200, 200 150 S 330 100, 400 150 L 400 250 L 0 250 Z" fill="#ffffff" opacity="0.25" />
            <path d="M0 180 C 70 130, 130 230, 200 180 S 330 130, 400 180 L 400 250 L 0 250 Z" fill="#ffffff" opacity="0.45" />
            <path d="M0 210 C 70 165, 130 250, 200 210 S 330 165, 400 210 L 400 250 L 0 250 Z" fill="#ffffff" opacity="0.7" />
            <circle cx="330" cy="60" r="18" fill="#ffffff" opacity="0.9" />
          </>
        )}
        {variant === 2 && (
          <>
            {Array.from({ length: 12 }).map((_, i) => {
              const x = 60 + (i % 4) * 75;
              const y = 35 + Math.floor(i / 4) * 65;
              const filled = (i * 7) % 3 === 0;
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width="52"
                  height="44"
                  rx="12"
                  fill={filled ? '#ffffff' : 'none'}
                  fillOpacity={filled ? 0.9 : 0}
                  stroke="#ffffff"
                  strokeOpacity={filled ? 0 : 0.6}
                  strokeWidth="2"
                />
              );
            })}
          </>
        )}
        {variant === 3 && (
          <>
            <rect x="60" y="40" width="280" height="170" rx="16" fill="#ffffff" opacity="0.12" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="2" />
            <line x1="60" y1="70" x2="340" y2="70" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2" />
            <circle cx="82" cy="55" r="5" fill="#ffffff" opacity="0.9" />
            <circle cx="100" cy="55" r="5" fill="#ffffff" opacity="0.6" />
            <circle cx="118" cy="55" r="5" fill="#ffffff" opacity="0.4" />
            <rect x="84" y="96" width="150" height="12" rx="6" fill="#ffffff" opacity="0.85" />
            <rect x="84" y="120" width="110" height="10" rx="5" fill="#ffffff" opacity="0.5" />
            <polyline points="84,190 130,160 170,178 220,130 270,150 316,110" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
        {variant === 4 && (
          <>
            <rect x="150" y="25" width="100" height="200" rx="20" fill="none" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="3" />
            <rect x="164" y="48" width="72" height="130" rx="10" fill="#ffffff" opacity="0.2" />
            <rect x="178" y="66" width="44" height="10" rx="5" fill="#ffffff" opacity="0.85" />
            <rect x="178" y="86" width="44" height="8" rx="4" fill="#ffffff" opacity="0.5" />
            <rect x="178" y="102" width="30" height="8" rx="4" fill="#ffffff" opacity="0.5" />
            <circle cx="200" cy="200" r="8" fill="#ffffff" opacity="0.85" />
          </>
        )}
        {variant === 5 && (
          <>
            <rect x="150" y="55" width="100" height="100" rx="18" fill="#ffffff" opacity="0.25" transform="rotate(45 200 105)" />
            <rect x="170" y="75" width="60" height="60" rx="14" fill="#ffffff" opacity="0.55" transform="rotate(45 200 105)" />
            <rect x="188" y="93" width="24" height="24" rx="8" fill="#ffffff" opacity="0.95" transform="rotate(45 200 105)" />
            <circle cx="105" cy="70" r="6" fill="#ffffff" opacity="0.9" />
            <circle cx="300" cy="180" r="5" fill="#ffffff" opacity="0.7" />
            <path d="M 92 190 l 4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 Z" fill="#ffffff" opacity="0.8" />
          </>
        )}
      </svg>
    </div>
  );
}

/* 结尾太空人：原创 SVG 造型，漂浮＋随滚动转动 */
function Astronaut() {
  return (
    <div aria-hidden className="relative mx-auto w-56 md:w-72">
      <div className="absolute inset-0 scale-150 rounded-full bg-[radial-gradient(circle,rgba(36,52,255,0.35),rgba(53,224,230,0.18),transparent_70%)] blur-2xl" />
      <div className="astro-float relative">
        <svg viewBox="0 0 200 240" className="w-full drop-shadow-2xl">
          <rect x="52" y="92" width="96" height="82" rx="20" fill="#E4E4EA" />
          <rect x="70" y="100" width="60" height="70" rx="24" fill="#F4F4F7" />
          <rect x="88" y="112" width="24" height="16" rx="5" fill="#2434FF" />
          <circle cx="96" cy="142" r="3.5" fill="#35E0E6" />
          <circle cx="110" cy="142" r="3.5" fill="#FF4D8D" />
          <circle cx="100" cy="24" r="36" fill="#F4F4F7" />
          <ellipse cx="100" cy="66" rx="27" ry="21" fill="#0A0A0C" />
          <path d="M 84 56 Q 96 48, 108 54" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="4" fill="none" strokeLinecap="round" />
          <line x1="100" y1="24" x2="100" y2="10" stroke="#F4F4F7" strokeWidth="4" strokeLinecap="round" />
          <circle cx="100" cy="7" r="4" fill="#35E0E6" />
          <rect x="42" y="104" width="18" height="52" rx="9" fill="#F4F4F7" transform="rotate(-18 51 130)" />
          <rect x="140" y="104" width="18" height="52" rx="9" fill="#F4F4F7" transform="rotate(18 149 130)" />
          <rect x="74" y="168" width="17" height="42" rx="8" fill="#F4F4F7" />
          <rect x="109" y="168" width="17" height="42" rx="8" fill="#F4F4F7" />
        </svg>
      </div>
      <span className="twinkle absolute top-2 left-4 text-lg text-white/70" style={{ animationDelay: '0s' }}>+</span>
      <span className="twinkle absolute top-16 right-2 text-sm text-white/60" style={{ animationDelay: '1.2s' }}>+</span>
      <span className="twinkle absolute bottom-10 left-0 text-sm text-white/50" style={{ animationDelay: '2s' }}>+</span>
      <span className="twinkle absolute right-6 bottom-24 text-base text-white/60" style={{ animationDelay: '0.6s' }}>✦</span>
    </div>
  );
}

/* ================= 新首页：按 Lusion 真实视觉 ================= */

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  /* 顺滑滚动：Lenis 惯性滚动，锚点走 lenis.scrollTo */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -112, duration: 1.2 });
    };
    document.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      document.removeEventListener('click', onClick);
    };
  }, []);

  /* 预加载：黑底＋进度条＋左下角计数，约 1 秒后上滑离场 */
  const [count, setCount] = useState(0);
  const [preDone, setPreDone] = useState(false);
  const [preGone, setPreGone] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPreGone(true);
      return;
    }
    const t = setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(t);
          return 100;
        }
        return Math.min(100, c + 2);
      });
    }, 20);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (count < 100) return;
    const t1 = setTimeout(() => setPreDone(true), 250);
    const t2 = setTimeout(() => setPreGone(true), 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [count]);
  useEffect(() => {
    if (preGone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [preGone]);
  /* 滚动联动：元素随滚动视差移动，只写 transform */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const factor = parseFloat(el.dataset.parallax || '0');
        const rot = parseFloat(el.dataset.parallaxRotate || '0');
        const rect = el.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - vh / 2;
        const y = offset * factor;
        const r = rot ? Math.max(-8, Math.min(8, offset * rot)) : 0;
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)${r ? ` rotate(${r.toFixed(2)}deg)` : ''}`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#EDF0F3] text-[#0A0A0C] antialiased">
      {!preGone && (
        <div
          aria-hidden
          className={`fixed inset-0 z-[100] bg-[#0A0A0C] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${preDone ? '-translate-y-full' : ''}`}
        >
          <div className="absolute top-1/2 right-6 left-6 h-1 overflow-hidden rounded-full bg-white/20 md:right-10 md:left-10">
            <div className="h-full bg-white transition-[width] duration-150" style={{ width: `${count}%` }} />
          </div>
          <p className="absolute bottom-6 left-6 text-7xl font-medium text-white md:bottom-10 md:left-10 md:text-8xl">
            {count}
          </p>
        </div>
      )}
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
            <div data-parallax="0.12">
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
            <div data-parallax="0.06">
            <BigPhrase
              words={['好玩，', '才值得被记住。']}
              className="text-[clamp(3rem,9vw,8.5rem)] leading-[1.05]"
            />
            </div>
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
                className="group block"
              >
                <CardArt variant={0} bg={SITES[0].visual} wide />
                <div className="flex items-start justify-between gap-4 pt-4">
                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] text-black/50 uppercase">{SITES[0].tag}</p>
                    <h3 className="mt-2 flex items-center gap-2 text-2xl font-medium md:text-3xl">
                      {SITES[0].name}
                      <ArrowUpRight size={22} className="shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </h3>
                    <p className="mt-2 max-w-xl text-base leading-relaxed text-black/60 md:text-lg">{SITES[0].desc}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0A0A0C] px-5 py-2.5 text-sm font-bold text-white transition-transform duration-500 group-hover:scale-105">
                    {SITES[0].cta} <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>
            </Reveal>
            <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {SITES.slice(1).map((site, i) => (
                <Reveal key={site.href}>
                  <a href={site.href} target="_blank" rel="noreferrer" className="group block">
                    <CardArt variant={(i + 2) % 6} bg={site.visual} />
                    <p className="pt-4 text-xs font-bold tracking-[0.2em] text-black/50 uppercase">{site.tag}</p>
                    <h3 className="mt-2 flex items-center gap-2 text-2xl font-medium md:text-3xl">
                      {site.name}
                      <ArrowUpRight size={22} className="shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </h3>
                    <p className="mt-2 max-w-md text-base leading-relaxed text-black/60 md:text-lg">{site.desc}</p>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 精选作品：图片主导，无边框无阴影 */}
        <section id="works" className="scroll-mt-28 px-4 pb-24 md:px-[5%]">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.2em] text-black/50 uppercase">Featured work •</p>
            <h2 className="mt-2 text-4xl font-medium md:text-6xl">精选作品</h2>
          </Reveal>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal key={project.href}>
                <article className="group">
                  <a href={project.href} target="_blank" rel="noreferrer" className="block">
                    <CardArt variant={i % 6} bg={WORK_VISUALS[i % WORK_VISUALS.length]} />
                    <p className="pt-4 text-xs font-bold tracking-[0.2em] text-black/50 uppercase">
                      {[project.type, ...project.tags].join(' • ')}
                    </p>
                    <h3 className="mt-2 flex items-center gap-2 text-2xl font-medium md:text-3xl">
                      {project.featured ? '→ ' : ''}{project.name}
                      <ArrowUpRight size={22} className="shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
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
        <div aria-hidden data-parallax="-0.08" data-parallax-rotate="0.008" className="relative h-40 overflow-visible md:h-56">
          <Ribbon />
        </div>

        {/* 理念大字二 */}
        <section className="px-4 py-20 md:px-[5%] md:py-28">
          <Reveal>
            <div data-parallax="0.06">
            <BigPhrase
              words={['有用的东西，', '也该长得好看。']}
              className="text-[clamp(3rem,9vw,8.5rem)] leading-[1.05]"
            />
            </div>
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
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {GAMES.map((game, i) => (
              <Reveal key={game.name}>
                <a href={game.href} className="group block">
                  <CardArt variant={(i + 4) % 6} bg={game.visual} />
                  <h3 className="mt-4 flex items-center gap-2 text-2xl font-medium md:text-3xl">
                    {game.name}
                    <ArrowUpRight size={22} className="shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
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

      {/* 黑色结尾：太空人动画 */}
      <footer className="relative overflow-hidden bg-[#0A0A0C] px-4 py-24 text-white md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <div data-parallax="-0.06" data-parallax-rotate="0.01">
              <Astronaut />
            </div>
            <p className="mt-12 text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.05] font-medium text-balance">
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
