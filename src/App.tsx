import { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  FolderKanban,
  Send,
  Music,
  Globe,
  X,
  Search,
  SkipBack,
  SkipForward,
  Play,
  Pause,
  AtSign,
  Smile,
  MessageSquare,
  Gamepad2,
  RotateCcw,
  Trophy,
  Wrench,
  MoonStar,
  Clapperboard,
  Network,
} from 'lucide-react';
import { defaultProjects as projects } from './data/siteProjects';
import { defaultContacts as contacts } from './data/siteContacts';
import { cinemaPoster } from './data/cinemaPoster';
import { toolbox } from './data/toolbox';

/* ================= 数据 ================= */

const NAV = [
  { label: '作品', href: '#projects' },
  { label: '工具箱', href: '#toolbox' },
  { label: '关于', href: '#about' },
  { label: '联系', href: '#contact' },
];

const profile = {
  name: '苍柏',
  headline: ['复古科技，', '青春自然。'],
  sub: '用设计连接真实与未来。',
  intro:
    '我是苍柏，一个持续探索 AI 工具、个人品牌网站、移动端界面和视觉系统的创作者。喜欢把复古电脑、自然植物、奶油纸张和轻科技动效放进界面里，让作品既有功能，也有记忆点。',
};

const marqueeTags = [
  'React', 'TypeScript', 'AI 工具', 'UI 设计', '动效交互', 'Tailwind CSS',
  'Vite', '开源工具', '移动端体验', '提示词工程', '产品思维', '视觉系统',
];


const stats = [
  { value: '10', suffix: '', label: '作品项目' },
  { value: '120', suffix: '+', label: '设计组件' },
  { value: '30', suffix: '+', label: '创意练习' },
  { value: '100', suffix: '%', label: '关注体验' },
];

/* ============ AURA 玻璃拟态 ============ */

const glass =
  'bg-white/50 backdrop-blur-2xl border border-white/70 shadow-[0_8px_32px_rgba(31,38,135,0.08)]';
const glassSoft =
  'bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_4px_20px_rgba(31,38,135,0.06)]';

function SectionHead({ icon, zh, en, note }: { icon: React.ReactNode; zh: string; en: string; note: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="flex items-baseline gap-2.5 text-2xl font-extrabold tracking-tight text-slate-900">
        <span className="grid size-9 translate-y-1 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-200">{icon}</span>
        {zh}
        <span className="text-slate-400 font-bold text-sm tracking-widest">{en}</span>
      </h2>
      <span className={`hidden sm:inline-block rounded-full px-3 py-1 text-xs font-semibold text-slate-500 ${glassSoft}`}>{note}</span>
    </div>
  );
}

/* ================= 悬浮音乐播放器（歌单 + 搜索） ================= */
/* 音频放 public/music/，清单写 public/music.json：[{"title":"歌名","file":"/music/xxx.mp3"}] */

type Track = { title: string; file: string };

function MusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch('/music.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((list) => {
        if (Array.isArray(list)) setTracks(list.filter((t) => t && t.title && t.file));
      })
      .catch(() => {});
  }, []);

  const autoPlayed = useRef(false);
  const tracksRef = useRef(tracks);
  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);

  const playAt = async (i: number) => {
    const a = audioRef.current;
    if (!a || !tracks[i]) return;
    setCurrent(i);
    const url = new URL(tracks[i].file, window.location.href).href;
    if (a.src !== url) a.src = tracks[i].file;
    try {
      await a.play();
      setPlaying(true);
    } catch {
      /* 浏览器拦截未交互的播放，保持暂停 */
    }
  };

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      await playAt(current);
    }
  };

  const step = (d: number) => {
    if (!tracks.length) return;
    playAt((current + d + tracks.length) % tracks.length);
  };

  /* 播完自动下一首 */
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onEnded = () => step(1);
    a.addEventListener('ended', onEnded);
    return () => a.removeEventListener('ended', onEnded);
  });

  /* 首次交互（点任意位置/按键）自动开始播放，无需专门点音乐按钮；
     监听器挂载即加（不等歌单加载），歌单未就绪时的点击不消耗一次性触发 */
  useEffect(() => {
    const kick = () => {
      if (autoPlayed.current || tracksRef.current.length === 0) return;
      autoPlayed.current = true;
      const a = audioRef.current;
      const t = tracksRef.current[0];
      if (a && t) {
        if (!a.src) a.src = t.file;
        setCurrent(0);
        a.play()
          .then(() => setPlaying(true))
          .catch(() => {});
      }
      window.removeEventListener('pointerdown', kick);
      window.removeEventListener('keydown', kick);
    };
    window.addEventListener('pointerdown', kick);
    window.addEventListener('keydown', kick);
    return () => {
      window.removeEventListener('pointerdown', kick);
      window.removeEventListener('keydown', kick);
    };
  }, []);

  if (!tracks.length) return null;
  const q = query.trim().toLowerCase();
  const filtered = q ? tracks.filter((t) => t.title.toLowerCase().includes(q)) : tracks;

  return (
    <>
      <audio ref={audioRef} preload="none" />
      {open && (
        <div className="fixed bottom-20 right-6 z-50 flex max-h-[60vh] w-72 flex-col overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/60 shadow-xl shadow-indigo-100 backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-white/60 px-4 py-3">
            <Music size={16} className="text-indigo-500" />
            <span className="text-sm font-extrabold text-slate-800">音乐</span>
            <button onClick={() => setOpen(false)} className="ml-auto text-slate-400 transition-colors hover:text-slate-600" aria-label="关闭">
              <X size={16} />
            </button>
          </div>
          <div className="px-3 pt-3">
            <div className="flex items-center gap-2 rounded-full bg-white/70 px-3 py-2">
              <Search size={14} className="shrink-0 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索歌曲..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-2">
            {filtered.length === 0 && (
              <p className="px-3 py-6 text-center text-xs text-slate-400">没找到这首歌</p>
            )}
            {filtered.map((t) => {
              const idx = tracks.indexOf(t);
              const active = idx === current;
              return (
                <button
                  key={t.file}
                  onClick={() => playAt(idx)}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition-colors ${active ? 'bg-indigo-100/70 font-bold text-indigo-700' : 'text-slate-600 hover:bg-white/70'}`}
                >
                  {active && playing ? (
                    <span className="flex h-4 items-end gap-[2px]">
                      <span className="animate-eq-1 w-[2px] rounded-full bg-indigo-500" />
                      <span className="animate-eq-2 w-[2px] rounded-full bg-violet-500" />
                      <span className="animate-eq-3 w-[2px] rounded-full bg-indigo-500" />
                    </span>
                  ) : (
                    <Music size={14} className="shrink-0 opacity-50" />
                  )}
                  <span className="truncate">{t.title}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1 border-t border-white/60 px-4 py-3">
            <button onClick={() => step(-1)} className="grid size-9 place-items-center rounded-full text-slate-600 transition-colors hover:bg-white/70" aria-label="上一首">
              <SkipBack size={16} />
            </button>
            <button onClick={togglePlay} className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-200 transition-transform active:scale-95" aria-label={playing ? '暂停' : '播放'}>
              {playing ? <Pause size={16} /> : <Play size={16} className="translate-x-[1px]" />}
            </button>
            <button onClick={() => step(1)} className="grid size-9 place-items-center rounded-full text-slate-600 transition-colors hover:bg-white/70" aria-label="下一首">
              <SkipForward size={16} />
            </button>
            <span className="ml-1 truncate text-xs font-semibold text-slate-500">{tracks[current]?.title}</span>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label="音乐"
        className="fixed bottom-6 right-6 z-50 grid size-12 place-items-center rounded-full border border-white/70 bg-white/50 text-slate-700 shadow-lg shadow-indigo-100 backdrop-blur-xl transition-all hover:scale-105 active:scale-95"
      >
        {playing ? (
          <span className="flex h-5 items-end gap-[3px]">
            <span className="animate-eq-1 w-[3px] rounded-full bg-indigo-500" />
            <span className="animate-eq-2 w-[3px] rounded-full bg-violet-500" />
            <span className="animate-eq-3 w-[3px] rounded-full bg-indigo-500" />
            <span className="animate-eq-4 w-[3px] rounded-full bg-violet-500" />
          </span>
        ) : (
          <Music size={20} />
        )}
      </button>
    </>
  );
}


/* ================= 留言板 ================= */

type GBMsg = { name: string; message: string; at: number };

function Guestbook() {
  const [msgs, setMsgs] = useState<GBMsg[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [hint, setHint] = useState('');

  const fetchMsgs = async (): Promise<GBMsg[]> => {
    try {
      const r = await fetch('/api/guestbook');
      const d = await r.json();
      return Array.isArray(d.messages) ? d.messages : [];
    } catch {
      return [];
    }
  };

  useEffect(() => {
    let alive = true;
    fetchMsgs().then((list) => {
      if (alive) setMsgs(list);
    });
    return () => {
      alive = false;
    };
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || sending) return;
    setSending(true);
    setHint('');
    try {
      const r = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: text.trim() }),
      });
      const d = await r.json();
      if (r.ok) {
        setText('');
        setHint('留言成功，已上墙！');
        setMsgs(await fetchMsgs());
      } else {
        setHint(d.error || '发送失败，稍后再试');
      }
    } catch {
      setHint('网络开小差了，稍后再试');
    } finally {
      setSending(false);
    }
  };

  const fmt = (t: number) => {
    try {
      return new Date(t).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-5">
      <form onSubmit={submit} className={`${glass} rounded-[1.75rem] p-6 lg:col-span-2`}>
        <div className="text-sm font-extrabold text-slate-800">写点什么</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="你的昵称"
          maxLength={20}
          className="mt-4 w-full rounded-2xl border border-white/70 bg-white/70 px-4 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-300"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="想对我说的话..."
          maxLength={200}
          rows={4}
          className="mt-3 w-full resize-none rounded-2xl border border-white/70 bg-white/70 px-4 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-300"
        />
        <button
          type="submit"
          disabled={sending || !name.trim() || !text.trim()}
          className="mt-4 w-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-indigo-200 transition-all hover:shadow-xl active:scale-95 disabled:opacity-40"
        >
          {sending ? '发送中...' : '上墙'}
        </button>
        {hint && <p className="mt-3 text-center text-xs font-semibold text-slate-500">{hint}</p>}
      </form>
      <div className="space-y-3 lg:col-span-3">
        {msgs.length === 0 && (
          <div className={`${glassSoft} rounded-[1.75rem] p-8 text-center text-sm text-slate-400`}>
            还没有留言，来抢沙发吧
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={`${m.at}-${i}`} className={`${glassSoft} rounded-[1.5rem] px-5 py-4`}>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-extrabold text-slate-800">{m.name}</span>
              <span className="text-xs text-slate-400">{fmt(m.at)}</span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{m.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= 小游戏：星尘躲避（解压休闲） ================= */
function DodgeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try { return Number(localStorage.getItem('yi-dodge-best') || 0); } catch { return 0; }
  });
  const [status, setStatus] = useState<'idle' | 'playing' | 'over'>('idle');
  const W = 300, H = 340;
  const g = useRef({
    px: W / 2, py: H - 60, tx: W / 2, ty: H - 60,
    obstacles: [] as { x: number; y: number; w: number; h: number; vy: number }[],
    stars: [] as { x: number; y: number; vy: number; r: number }[],
    trail: [] as { x: number; y: number }[],
    score: 0, shown: -1, time: 0, last: 0, spawnT: 0, starT: 1,
  });
  const raf = useRef(0);

  const draw = () => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return;
    const st = g.current;
    ctx.clearRect(0, 0, W, H);
    // stars
    for (const s of st.stars) {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.r);
      ctx.fillStyle = '#fbbf24';
      ctx.font = '16px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦', 0, 0);
      ctx.restore();
    }
    // obstacles
    for (const o of st.obstacles) {
      ctx.fillStyle = 'rgba(244,63,94,0.75)';
      ctx.beginPath();
      if (typeof (ctx as unknown as { roundRect?: unknown }).roundRect === 'function') {
        (ctx as unknown as { roundRect: (x: number, y: number, w: number, h: number, r: number) => void })
          .roundRect(o.x, o.y, o.w, o.h, 7);
      } else {
        ctx.rect(o.x, o.y, o.w, o.h);
      }
      ctx.fill();
    }
    // trail
    st.trail.forEach((p, i) => {
      ctx.fillStyle = `rgba(129,140,248,${(i / st.trail.length) * 0.35})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4 + (i / st.trail.length) * 5, 0, Math.PI * 2);
      ctx.fill();
    });
    // player
    const grd = ctx.createRadialGradient(st.px, st.py, 2, st.px, st.py, 18);
    grd.addColorStop(0, '#c7d2fe');
    grd.addColorStop(1, '#4f46e5');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(st.px, st.py, 10, 0, Math.PI * 2);
    ctx.fill();
  };

  const gameOver = () => {
    cancelAnimationFrame(raf.current);
    setStatus('over');
    const s = Math.floor(g.current.score);
    setBest((b) => {
      const nb = Math.max(b, s);
      try { localStorage.setItem('yi-dodge-best', String(nb)); } catch { /* ignore */ }
      return nb;
    });
  };

  /* eslint-disable react-hooks/purity -- 游戏主循环天然是命令式的，不在渲染期执行 */
  const loop = (t: number) => {
    const st = g.current;
    const dt = Math.min(0.05, (t - (st.last || t)) / 1000);
    st.last = t;
    st.time += dt;
    // 跟随
    const k = Math.min(1, dt * 14);
    st.px += (st.tx - st.px) * k;
    st.py += (st.ty - st.py) * k;
    st.trail.push({ x: st.px, y: st.py });
    if (st.trail.length > 14) st.trail.shift();
    // 难度随时间提升
    const diff = Math.min(1, st.time / 75);
    // 障碍
    st.spawnT -= dt;
    if (st.spawnT <= 0) {
      st.spawnT = 0.85 - diff * 0.45 + Math.random() * 0.35;
      const w = 26 + Math.random() * 44;
      st.obstacles.push({
        x: Math.random() * (W - w), y: -30, w,
        h: 13 + Math.random() * 16,
        vy: (110 + diff * 170) * (0.8 + Math.random() * 0.4),
      });
    }
    // 星星
    st.starT -= dt;
    if (st.starT <= 0) {
      st.starT = 1.8 + Math.random() * 2.5;
      st.stars.push({ x: 24 + Math.random() * (W - 48), y: -20, vy: 95, r: 0 });
    }
    for (const o of st.obstacles) o.y += o.vy * dt;
    st.obstacles = st.obstacles.filter((o) => o.y < H + 40);
    for (const s of st.stars) { s.y += s.vy * dt; s.r += dt * 5; }
    // 碰撞
    const pr = 9;
    for (const o of st.obstacles) {
      const cx = Math.max(o.x, Math.min(st.px, o.x + o.w));
      const cy = Math.max(o.y, Math.min(st.py, o.y + o.h));
      if ((st.px - cx) ** 2 + (st.py - cy) ** 2 < pr * pr) { draw(); gameOver(); return; }
    }
    // 吃星
    st.stars = st.stars.filter((s) => {
      if ((st.px - s.x) ** 2 + (st.py - s.y) ** 2 < 22 * 22) { st.score += 5; return false; }
      return s.y < H + 30;
    });
    // 存活加分
    st.score += dt * 8;
    const is = Math.floor(st.score);
    if (is !== st.shown) { st.shown = is; setScore(is); }
    draw();
    raf.current = requestAnimationFrame(loop);
  };
  /* eslint-enable react-hooks/purity */

  const start = () => {
    cancelAnimationFrame(raf.current);
    g.current = {
      px: W / 2, py: H - 60, tx: W / 2, ty: H - 60,
      obstacles: [], stars: [], trail: [],
      score: 0, shown: -1, time: 0, last: 0, spawnT: 0.6, starT: 1,
    };
    setScore(0);
    setStatus('playing');
    raf.current = requestAnimationFrame(loop);
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const point = (e: React.PointerEvent) => {
    const cv = canvasRef.current;
    if (!cv) return;
    const r = cv.getBoundingClientRect();
    g.current.tx = Math.max(10, Math.min(W - 10, ((e.clientX - r.left) / r.width) * W));
    g.current.ty = Math.max(10, Math.min(H - 10, ((e.clientY - r.top) / r.height) * H));
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full items-center justify-between text-sm">
        <span className="font-bold text-slate-600">得分 <span className="text-indigo-600">{score}</span></span>
        <span className="inline-flex items-center gap-1 font-bold text-slate-400"><Trophy size={14} /> {best}</span>
      </div>
      <div className="relative">
        <canvas ref={canvasRef} width={W} height={H}
          onPointerMove={point} onPointerDown={point}
          className="rounded-2xl bg-gradient-to-b from-indigo-50/80 to-white/60 shadow-inner"
          style={{ touchAction: 'none' }} />
        {status !== 'playing' && (
          <button onClick={start}
            className="absolute inset-0 grid place-items-center rounded-2xl bg-slate-900/45 text-white backdrop-blur-[2px]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-extrabold text-indigo-600 shadow-lg">
              <RotateCcw size={15} /> {status === 'over' ? `再来一局（${score}分）` : '开始躲避'}
            </span>
          </button>
        )}
      </div>
      <p className="text-[11px] text-slate-400">鼠标 / 手指带着小球走，躲红块、吃星星 ✦</p>
    </div>
  );
}

/* ================= 小游戏：记忆翻牌 ================= */
function MemoryGame() {
  const ICONS = ['🎮', '🎲', '🎯', '🎨', '🚀', '🌙', '⚡', '🔥'];
  const shuffle = (a: string[]) => {
    const r = [...a];
    for (let i = r.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [r[i], r[j]] = [r[j], r[i]];
    }
    return r;
  };
  const [deck, setDeck] = useState<string[]>(() => shuffle([...ICONS, ...ICONS]));
  const [open, setOpen] = useState<number[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const lock = useRef(false);

  const flip = (i: number) => {
    if (lock.current || open.includes(i) || done.includes(i)) return;
    const no = [...open, i];
    setOpen(no);
    if (no.length === 2) {
      setMoves((m) => m + 1);
      if (deck[no[0]] === deck[no[1]]) {
        const nd = [...done, ...no];
        setDone(nd);
        setOpen([]);
        if (nd.length === 16) setWon(true);
      } else {
        lock.current = true;
        window.setTimeout(() => { setOpen([]); lock.current = false; }, 650);
      }
    }
  };

  const reset = () => {
    setDeck(shuffle([...ICONS, ...ICONS]));
    setOpen([]); setDone([]); setMoves(0); setWon(false);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full items-center justify-between text-sm">
        <span className="font-bold text-slate-600">步数 <span className="text-indigo-600">{moves}</span></span>
        <button onClick={reset} className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-slate-500 shadow-sm active:scale-95 transition-transform">
          <RotateCcw size={12} /> 重开
        </button>
      </div>
      <div className="grid w-full max-w-[300px] grid-cols-4 gap-2">
        {deck.map((icon, i) => {
          const face = open.includes(i) || done.includes(i);
          return (
            <button key={i} onClick={() => flip(i)}
              className={`aspect-square rounded-xl text-2xl shadow-sm transition-all duration-300 active:scale-95 ${
                face ? 'bg-white scale-100' : 'bg-gradient-to-br from-indigo-400 to-violet-500 hover:scale-105'
              } ${done.includes(i) ? 'opacity-60' : ''}`}>
              {face ? icon : ''}
            </button>
          );
        })}
      </div>
      {won && <p className="text-sm font-extrabold text-indigo-600">🎉 通关！用了 {moves} 步</p>}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen text-slate-900 font-sans pb-24 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden scroll-smooth">
      {/* 动效关键帧 */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 26s linear infinite;
        }
        .animate-marquee:hover { animation-play-state: paused; }
        @keyframes floaty {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-floaty { animation: floaty 6s ease-in-out infinite; }
        @keyframes equalizer {
          0%, 100% { height: 6px; }
          50% { height: 26px; }
        }
        .animate-eq-1 { animation: equalizer 1.1s ease-in-out infinite; }
        .animate-eq-2 { animation: equalizer 0.8s ease-in-out infinite 0.2s; }
        .animate-eq-3 { animation: equalizer 1.4s ease-in-out infinite 0.4s; }
        .animate-eq-4 { animation: equalizer 0.9s ease-in-out infinite 0.1s; }
        .animate-eq-5 { animation: equalizer 1.2s ease-in-out infinite 0.3s; }
        @keyframes border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .flow-border { position: relative; }
        .flow-border::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 26px;
          padding: 2px;
          background: linear-gradient(115deg, #4F46E5, #22d3ee, #a78bfa, #f472b6, #4F46E5);
          background-size: 280% 280%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.35s ease;
          animation: border-flow 3.5s linear infinite;
          pointer-events: none;
        }
        .flow-border:hover::before { opacity: 1; }
      `}</style>

      {/* 粉彩渐变网格背景 */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#F4F2FD]">
        <div className="absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-violet-300/50 blur-3xl animate-pulse" />
        <div className="absolute top-1/4 -right-40 h-[32rem] w-[32rem] rounded-full bg-pink-200/60 blur-3xl animate-pulse" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-[-10%] left-1/4 h-[30rem] w-[30rem] rounded-full bg-cyan-200/50 blur-3xl animate-pulse" style={{ animationDelay: '2.1s' }} />
        <div className="absolute top-[55%] left-[-8%] h-[26rem] w-[26rem] rounded-full bg-amber-100/70 blur-3xl" />
      </div>

      {/* 悬浮玻璃胶囊导航 */}
      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div className={`flex items-center gap-1 sm:gap-2 rounded-full pl-4 pr-2 py-2 ${glass}`}>
          <a href="#top" className="flex items-center gap-2.5 font-bold text-base tracking-tight mr-1 sm:mr-3">
            <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white text-sm shadow-md shadow-indigo-200">隅</span>
            <span className="hidden md:inline">壹隅 / YI CORNER</span>
            <span className="md:hidden">壹隅</span>
          </a>
          <nav className="flex items-center gap-0.5 sm:gap-1 text-sm font-semibold text-slate-600">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-full px-3 sm:px-4 py-2 transition-all hover:bg-white/70 hover:text-indigo-600 hover:shadow-sm"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="ml-1 hidden sm:inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            联系我
          </a>
        </div>
      </header>

      <main id="top" className="max-w-5xl mx-auto px-4 pt-32 space-y-12 relative z-10">
        {/* Hero：居中玻璃 */}
        <section className="text-center relative">
          {/* 悬浮小标签（桌面端） */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
            <span className={`absolute left-[4%] top-20 rounded-full px-4 py-2 text-xs font-bold text-indigo-700 animate-floaty ${glassSoft}`}>⚡ 60fps 微交互</span>
            <span className={`absolute right-[5%] top-36 rounded-full px-4 py-2 text-xs font-bold text-violet-700 animate-floaty ${glassSoft}`} style={{ animationDelay: '1.5s' }}>🎨 玻璃拟态</span>
            <span className={`absolute left-[7%] bottom-28 rounded-full px-4 py-2 text-xs font-bold text-fuchsia-700 animate-floaty ${glassSoft}`} style={{ animationDelay: '3s' }}>⚛️ React 驱动</span>
            <span className={`absolute right-[3%] bottom-48 rounded-full px-4 py-2 text-xs font-bold text-cyan-700 animate-floaty ${glassSoft}`} style={{ animationDelay: '4.2s' }}>✨ 纯 CSS 动效</span>
          </div>
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-full text-indigo-700 ${glassSoft}`}>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 animate-pulse"></span>
            你好，我是{profile.name} 👋
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
            {profile.headline[0]}<br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {profile.headline[1]}
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-xl font-semibold text-slate-500">{profile.sub}</p>
          <p className="mx-auto mt-5 text-base text-slate-600 leading-relaxed max-w-2xl">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              className="flow-border inline-flex items-center gap-2 px-7 py-3 font-bold text-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-xl hover:shadow-indigo-200 active:scale-95 text-white rounded-full shadow-lg shadow-indigo-200 transition-all duration-200"
            >
              <FolderKanban size={16} /> 浏览作品
            </a>
            <a
              href="#contact"
              className={`inline-flex items-center gap-2 px-7 py-3 font-bold text-sm text-slate-700 rounded-full transition-all hover:shadow-md active:scale-95 ${glass}`}
            >
              <Send size={16} /> 联系我
            </a>
          </div>
        </section>

        {/* 我的站点 */}
        <section>
          <SectionHead icon={<Globe size={18} />} zh="我的站点" en="SITES" note="自建与收藏" />
          <div className="mt-6 space-y-5">
            {/* 小店：单独一排通栏 */}
            <a
              href="https://999.lsrai.shop/"
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col md:flex-row md:items-center gap-4 overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-7 md:px-9 md:py-8 text-white shadow-xl shadow-orange-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-300"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/20 blur-2xl" />
              <div className="pointer-events-none absolute -left-10 -bottom-20 size-56 rounded-full bg-yellow-300/30 blur-2xl" />
              <div className="relative flex-1">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                  🏪 我的小店 · 🔥 主推
                </div>
                <h3 className="mt-3 text-2xl md:text-3xl font-extrabold tracking-tight">AI 代充小店</h3>
                <p className="mt-2 text-sm md:text-base leading-relaxed text-white/85">常用 AI 订阅代充，价格实惠，欢迎光顾。</p>
              </div>
              <span className="relative inline-flex shrink-0 items-center gap-2 self-start md:self-center rounded-full bg-white px-7 py-3.5 text-sm font-extrabold text-orange-600 shadow-lg transition-transform duration-300 group-hover:scale-105">
                进店看看 <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
            {/* 其他四张 */}
            <div className="grid gap-5 md:grid-cols-2">
            {/* 苹果共享ID */}
            <a
              href="https://id.qianyuwing.com/"
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-neutral-900 via-zinc-900 to-black p-7 text-white shadow-xl shadow-zinc-300 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-zinc-300"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-white/10 blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                  🍎 共享账号
                </div>
                <h3 className="mt-3 text-xl font-extrabold tracking-tight">苹果共享ID</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">共享 Apple ID 资源，拿来即用，下载应用更方便。</p>
              </div>
              <span className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-extrabold">
                去看看 <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
            {/* X-Deck 创作台 */}
            <a
              href="https://x.weiyi.indevs.in/"
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-7 text-white shadow-xl shadow-indigo-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-200"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-indigo-500/25 blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                  ⚡ 我的创作台
                </div>
                <h3 className="mt-3 text-xl font-extrabold tracking-tight">X-Deck 实时创作台</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">聚合热点、收集灵感、打磨下一条推文。</p>
              </div>
              <span className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-extrabold">
                打开创作台 <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
            {/* 唯影导航 */}
            <a
              href="https://nav.weiyi.indevs.in/"
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 p-7 text-white shadow-xl shadow-sky-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-sky-200"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-white/20 blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                  🎬 视频导航
                </div>
                <h3 className="mt-3 text-xl font-extrabold tracking-tight">唯影导航</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">全类型视频网站导航库，已收录 143 个平台。</p>
              </div>
              <span className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-extrabold">
                去逛逛 <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
            {/* 无损音乐下载 */}
            <a
              href="https://flac.music.hi.cn/"
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-7 text-white shadow-xl shadow-purple-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-200"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-white/20 blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                  🎵 音乐下载
                </div>
                <h3 className="mt-3 text-xl font-extrabold tracking-tight">无损音乐下载</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">免费无损音乐搜索下载，FLAC 音质收藏。</p>
              </div>
              <span className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-extrabold">
                去下载 <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
            {/* 知微工作台 */}
            <a
              href="https://zhiwei.weiyi.indevs.in/"
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#a34d28] via-[#bc5837] to-[#7e3b1e] p-7 text-white shadow-xl shadow-orange-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange-200"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-white/15 blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                  🔬 科学备课
                </div>
                <h3 className="mt-3 text-xl font-extrabold tracking-tight">知微工作台</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/85">小学科学探究备课工作台，教案设计一键生成。</p>
              </div>
              <span className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-extrabold">
                去备课 <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
            </div>
          </div>
        </section>

        {/* 跑马灯：玻璃条 */}
        <section className={`${glass} rounded-full py-3 px-2 overflow-hidden`}>
          <div className="animate-marquee gap-3">
            {[...marqueeTags, ...marqueeTags].map((tag, idx) => (
              <span
                key={idx}
                className="whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold bg-white/70 text-indigo-700 border border-white/80 shadow-sm cursor-default hover:scale-105 transition-transform"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* 苍柏影院 */}
        <section id="cinema" className="space-y-6 scroll-mt-28">
          <SectionHead icon={<Clapperboard size={18} />} zh="苍柏影院" en="CINEMA" note="海量影视，一点即看" />
          <a
            href="https://weiyi.indevs.in/"
            target="_blank"
            rel="noreferrer"
            className={`group relative block overflow-hidden rounded-[1.75rem] ${glass} transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(31,38,135,0.18)]`}
          >
            <div className="relative aspect-[21/9] w-full overflow-hidden">
              <img
                src={cinemaPoster}
                alt="苍柏影院"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
                <span className="grid size-16 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                  <Play size={26} className="ml-1" fill="currentColor" />
                </span>
                <div>
                  <div className="text-2xl font-extrabold tracking-tight text-white drop-shadow-lg">苍柏影院</div>
                  <div className="mt-1 text-sm text-white/70">点击进入 · 免费观影</div>
                </div>
              </div>
            </div>
          </a>
        </section>

        {/* 作品 */}
        <section id="projects" className="space-y-6 scroll-mt-28">
          <SectionHead icon={<FolderKanban size={18} />} zh="作品" en="PROJECTS" note="点击卡片访问线上地址 / 仓库" />
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {projects.map((p, i) => {
              const isWide = i === 0 || i === 3;
              const span = isWide ? 'md:col-span-4' : i >= 12 ? 'md:col-span-3' : 'md:col-span-2';
              return (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group ${glass} rounded-[1.75rem] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(31,38,135,0.14)] ${span} ${p.featured ? 'flow-border' : ''}`}
                >
                  <div className={isWide ? 'flex flex-col sm:flex-row gap-6' : ''}>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${p.featured ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200' : 'bg-white/70 text-slate-500 border border-white/80'}`}>
                          {p.featured ? '★ 精选' : p.type}
                        </span>
                        <ArrowUpRight size={16} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                      </div>
                      {p.featured && <div className="text-[11px] font-semibold text-slate-400 mb-1">{p.type}</div>}
                      <h3 className={`font-extrabold text-slate-900 group-hover:text-indigo-700 transition-colors ${isWide ? 'text-2xl' : 'text-lg'}`}>{p.name}</h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed mt-2 flex-1">{p.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {p.tags.map((t) => (
                          <span key={t} className="px-2.5 py-1 text-[10px] font-semibold bg-white/60 text-slate-500 border border-white/70 rounded-full">#{t}</span>
                        ))}
                      </div>
                    </div>
                    {isWide && (
                      <div className="hidden sm:grid place-items-center shrink-0 w-36 h-36 self-center rounded-[1.5rem] bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-xl shadow-indigo-200 rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-transform duration-300">
                        <span className="text-5xl font-extrabold text-white/95">{p.name[0]}</span>
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* 知图：站内直接使用 */}
        <section id="zhitu" className="space-y-6 scroll-mt-28">
          <SectionHead icon={<Network size={18} />} zh="知图" en="KNOWLEDGE ATLAS" note="交互式知识图谱，直接探索" />
          <div className={`${glass} overflow-hidden rounded-[1.75rem]`}>
            <iframe
              src="https://zhitu.weiyi.indevs.in/"
              title="知图"
              className="h-[80vh] min-h-[560px] w-full border-0"
              loading="lazy"
            />
          </div>
          <p className="text-center text-xs text-slate-400">
            加载不出来？<a href="https://zhitu.weiyi.indevs.in/" target="_blank" rel="noreferrer" className="font-bold text-indigo-600 hover:underline">在新窗口打开 →</a>
          </p>
        </section>

        {/* 工具箱 */}
        <section id="toolbox" className="space-y-6 scroll-mt-28">
          <SectionHead icon={<Wrench size={18} />} zh="工具箱" en="TOOLBOX" note="我常用的好东西 · 持续补充" />
          <div className="space-y-5">
            {toolbox.map((cat) => (
              <div key={cat.name} className={`${glass} rounded-[1.75rem] p-6`}>
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-xl">{cat.emoji}</span>
                  <h3 className="text-base font-extrabold tracking-tight text-slate-800">{cat.name}</h3>
                  <span className="rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-bold text-slate-400">{cat.tools.length} 款</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {cat.tools.map((t) => (
                    <a key={t.name} href={t.url} target="_blank" rel="noreferrer"
                      className="group rounded-2xl border border-white/60 bg-white/50 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-lg hover:shadow-indigo-100">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <div className="text-sm font-extrabold tracking-tight text-slate-800">{t.name}</div>
                          {t.mine && <span className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-1.5 py-px text-[10px] font-bold text-white">自制</span>}
                        </div>
                        <ExternalLink size={13} className="mt-0.5 shrink-0 text-slate-300 transition-colors group-hover:text-indigo-500" />
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{t.desc}</p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* 乾坤之道：站内直接使用 */}
        <section id="suangua" className="space-y-6 scroll-mt-28">
          <SectionHead icon={<MoonStar size={18} />} zh="乾坤之道" en="DIVINATION" note="不用跳转，直接开算" />
          <div className={`${glass} overflow-hidden rounded-[1.75rem]`}>
            <iframe
              src="https://suangua.weiyiai.top/"
              title="乾坤之道"
              className="h-[80vh] min-h-[560px] w-full border-0"
              loading="lazy"
            />
          </div>
          <p className="text-center text-xs text-slate-400">
            加载不出来？<a href="https://suangua.weiyiai.top/" target="_blank" rel="noreferrer" className="font-bold text-indigo-600 hover:underline">在新窗口打开 →</a>
          </p>
        </section>

        {/* 小游戏 */}
        <section id="games" className="space-y-6 scroll-mt-28">
          <SectionHead icon={<Gamepad2 size={18} />} zh="小游戏" en="GAMES" note="摸鱼专用 · 还会加" />
          <div className="grid gap-5 md:grid-cols-2">
            <div className={`${glass} rounded-[1.75rem] p-6`}>
              <div className="mb-4 text-xs font-bold text-slate-400">✦ 星尘躲避</div>
              <DodgeGame />
            </div>
            <div className={`${glass} rounded-[1.75rem] p-6`}>
              <div className="mb-4 text-xs font-bold text-slate-400">🃏 记忆翻牌</div>
              <MemoryGame />
            </div>
          </div>
        </section>

        {/* 关于 */}
        <section id="about" className="space-y-6 scroll-mt-28">
          <SectionHead icon={<Sparkles size={18} />} zh="关于" en="ABOUT" note="数字里的创作轨迹" />
          <div className={`${glass} rounded-[2rem] p-8 md:p-10 grid md:grid-cols-5 gap-8 items-center`}>
            <p className="text-sm text-slate-500 leading-relaxed md:col-span-2">
              <span className="block text-xl font-extrabold text-slate-900 mb-3">把想法快速做成能用的东西。</span>
              从 AI 工具、自动化脚本到移动端界面与视觉系统，我习惯把过程中沉淀的组件、动效和提示词整理成系统。这个站点既是作品集，也是实验场。
            </p>
            <div className="grid grid-cols-2 gap-6 text-center md:col-span-3">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    <span className="text-slate-900">{s.value}</span><span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">{s.suffix}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-2">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 自我介绍 */}
        <section id="intro" className="space-y-6 scroll-mt-28">
          <SectionHead icon={<Smile size={18} />} zh="自我介绍" en="HELLO" note="认识一下" />
          <div className={`${glass} rounded-[2rem] p-8 md:p-10`}>
            <div className="flex items-center gap-5">
              <div className="grid size-16 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-500 text-2xl font-extrabold text-white shadow-lg shadow-indigo-200">
                苍
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-slate-900">你好，我是苍柏</h3>
                <p className="mt-1 text-sm font-semibold text-slate-500">AI 工具玩家 · 独立开发者</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-slate-600">
              折腾 AI 工具、薅羊毛、搞钱，也做个人网站和小产品。习惯把想法快速做成能用的东西——这个站、小店、创作台、导航站都是这么长出来的。晚上在 X 上锐评中文互联网，欢迎来找我玩。
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['AI 工具', '薅羊毛', '搞钱', '独立开发', 'X 创作', '网站搭建'].map((t) => (
                <span key={t} className="rounded-full border border-white/80 bg-white/70 px-4 py-1.5 text-xs font-bold text-indigo-700 shadow-sm">#{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* X 导流 */}
        <section id="follow" className="space-y-6 scroll-mt-28">
          <SectionHead icon={<AtSign size={18} />} zh="来 X 找我" en="FOLLOW ME" note="@Cangbaic" />
          <a
            href="https://x.com/Cangbaic"
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden rounded-[2rem] bg-neutral-950 p-8 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:p-10"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
              <svg viewBox="0 0 24 24" className="size-12 shrink-0 fill-white" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <div className="flex-1">
                <div className="text-lg font-extrabold tracking-tight">苍柏 @Cangbaic</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  在 X 上分享 AI 工具、薅羊毛和搞钱信息，偶尔锐评。来互关，一起玩。
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-extrabold text-neutral-950 transition-all group-hover:scale-105">
                关注我 <ArrowUpRight size={16} />
              </span>
            </div>
          </a>
        </section>

        {/* 留言板 */}
        <section id="guestbook" className="space-y-6 scroll-mt-28">
          <SectionHead icon={<MessageSquare size={18} />} zh="留言板" en="GUESTBOOK" note="来都来了，说点什么" />
          <Guestbook />
        </section>

        {/* 联系 */}
        <section id="contact" className="space-y-6 scroll-mt-28">
          <SectionHead icon={<Send size={18} />} zh="联系" en="CONTACT" note="欢迎交流合作" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contacts.map((c) => {
              const Icon = c.icon;
              const inner = (
                <>
                  <div className="size-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-200">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-400">{c.label}</div>
                    <div className="text-sm font-bold text-slate-800 truncate">{c.value}</div>
                  </div>
                  {c.href && <ExternalLink size={15} className="ml-auto text-slate-300 shrink-0" />}
                </>
              );
              const cls = `flex items-center gap-4 ${glass} rounded-[1.75rem] p-5 transition-all hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(31,38,135,0.14)]`;
              return c.href ? (
                <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
              ) : (
                <div key={c.label} className={cls}>{inner}</div>
              );
            })}
          </div>
        </section>

        {/* 页脚 */}
        <footer className="pt-10 pb-4 text-center">
          <div className={`inline-flex flex-col items-center gap-1 rounded-full px-8 py-4 ${glassSoft}`}>
            <h3 className="text-sm font-bold text-slate-900">壹隅 YI CORNER</h3>
            <p className="text-xs text-slate-500">一隅之地 · Crafted with Motion & React</p>
          </div>
        </footer>
        <MusicPlayer />
      </main>
    </div>
  );
}
