import { useState, useEffect, useRef, useCallback } from 'react';

type TrexState =
  | 'idle'
  | 'blink'
  | 'walk1'
  | 'walk2'
  | 'run1'
  | 'run2'
  | 'jump'
  | 'sleep1'
  | 'sleep2'
  | 'dizzy';

function detectHoverItem(target: HTMLElement | null): string | null {
  if (!target || target === document.body || target.tagName === 'HTML' || target.id === 'root') {
    return null;
  }

  // Guard against broad generic wrappers / containers / padding
  if (
    target.tagName === 'MAIN' ||
    target.classList.contains('min-h-screen') ||
    target.classList.contains('max-w-3xl') ||
    target.classList.contains('space-y-4') ||
    target.classList.contains('space-y-3') ||
    target.classList.contains('container')
  ) {
    return null;
  }

  // 1. Explicit data attributes (fastest & most accurate)
  const skill = target.closest('[data-skill]')?.getAttribute('data-skill');
  if (skill) return `skill: ${skill}`;

  const proj = target.closest('[data-project]')?.getAttribute('data-project');
  if (proj) {
    if (target.closest('a[aria-label*="GitHub"]') || target.closest('a[href*="github.com"]')) {
      return `github · ${proj}`;
    }
    if (target.closest('a[aria-label*="demo"]') || target.closest('a[href*="vercel.app"]')) {
      return `live demo · ${proj}`;
    }
    return `project: ${proj}`;
  }

  const res = target.closest('[data-research]')?.getAttribute('data-research');
  if (res) {
    if (target.tagName === 'IMG' || target.closest('figure')) {
      return 'empirical plot';
    }
    return `research: ${res}`;
  }

  const edu = target.closest('[data-edu]')?.getAttribute('data-edu');
  if (edu) return `education: ${edu}`;

  const cert = target.closest('[data-cert]')?.getAttribute('data-cert');
  if (cert) return `cert: ${cert}`;

  const journey = target.closest('[data-journey]')?.getAttribute('data-journey');
  if (journey) return `milestone: ${journey}`;

  const nav = target.closest('[data-nav]')?.getAttribute('data-nav');
  if (nav) return `jump to ${nav}`;

  const color = target.closest('[data-color-btn]')?.getAttribute('data-color-btn');
  if (color) return `accent: ${color}`;

  const exp = target.closest('[data-experience]')?.getAttribute('data-experience');
  if (exp) {
    if (target.closest('span[class*="rounded"]')) {
      const tagText = target.innerText?.trim();
      if (tagText && tagText.length < 20) return `tech: ${tagText.replace(/[\[\]]/g, '')}`;
    }
    return `experience: ${exp}`;
  }

  const ghStat = target.closest('[data-gh-stat]')?.getAttribute('data-gh-stat');
  if (ghStat) {
    if (ghStat === 'contributions') return 'github: 848 contributions';
    if (ghStat === 'repos') return 'github: 40 public repos';
    if (ghStat === 'streak') return 'github: 23-day streak';
  }

  const lcStat = target.closest('[data-lc-stat]')?.getAttribute('data-lc-stat');
  if (lcStat) {
    if (lcStat === 'solved') return 'leetcode: 307 solved';
    if (lcStat === 'acceptance') return 'leetcode: 60.4% acceptance';
    if (lcStat === 'rating') return 'contest rating: 1527';
  }

  const lcTopic = target.closest('[data-lc-topic]')?.getAttribute('data-lc-topic');
  if (lcTopic) return `topic: ${lcTopic}`;

  // 2. Links & social buttons
  const link = target.closest('a');
  if (link) {
    const href = link.getAttribute('href') || '';
    if (href.includes('github.com/swaekaa')) return 'github · @swaekaa';
    if (href.includes('leetcode.com')) return 'leetcode · @meanturtle';
    if (href.includes('linkedin.com')) return 'linkedin · sawaria-ekaansh';
    if (href.includes('x.com/swaaeka') || href.includes('twitter.com')) return 'x / twitter · @swaaeka';
    if (href.startsWith('mailto:')) return 'email · sawariaekaansh@gmail.com';
    if (href.includes('resume')) return 'resume · download PDF';
    const linkText = link.innerText?.trim();
    if (linkText && linkText.length < 24) return `link: ${linkText}`;
  }

  // 3. LeetCode difficulty & badges
  const lcSection = target.closest('#leetcode');
  if (lcSection) {
    const text = target.innerText?.trim() || '';
    if (text.includes('Easy')) return '112 easy solved';
    if (text.includes('Medium')) return '180 medium solved';
    if (text.includes('Hard')) return '15 hard solved';
    if (text.includes('Badge')) return `badge: ${text}`;
  }

  // 4. Public X posts
  const xPost = target.closest('#public .p-4') || target.closest('#public article');
  if (xPost) return 'x post by @swaaeka';

  // 5. Interactive buttons / inputs
  if (target.closest('input, textarea')) return 'listening...';
  const btn = target.closest('button');
  if (btn) {
    const btnText = btn.innerText?.trim();
    if (btnText && btnText.length < 25) return `button: ${btnText.toLowerCase()}`;
  }

  // 6. Avatar
  if (target.tagName === 'IMG' && target.getAttribute('src')?.includes('profile-x')) {
    return 'Ekaansh Sawaria (@swaaeka)';
  }

  return null;
}

export default function PixelTrex() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [facingLeft, setFacingLeft] = useState(false);
  const [state, setState] = useState<TrexState>('idle');
  const [bubble, setBubble] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [jumpOffset, setJumpOffset] = useState(0);
  const [isDizzy, setIsDizzy] = useState(false);

  // Position and animation refs
  const mouseRef = useRef({ x: -100, y: -100 });
  const lastMousePosRef = useRef({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });
  const lastPosRef = useRef({ x: -100, y: -100 });
  const idleTimerRef = useRef<number | null>(null);
  const bubbleTimerRef = useRef<number | null>(null);
  const animFrameRef = useRef<number>(0);
  const stepCountRef = useRef(0);
  const isJumpingRef = useRef(false);
  const lastTargetRef = useRef<string>('');
  const lastScrollYRef = useRef(0);

  // Annoyed & Dizzy state refs
  const isDizzyRef = useRef(false);
  const dizzyTimerRef = useRef<number | null>(null);
  const dizzyCooldownRef = useRef<number>(0);
  const mouseVelocityHistoryRef = useRef<{ dist: number; time: number }[]>([]);

  const clearBubble = useCallback((delay = 200) => {
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = window.setTimeout(() => {
      setBubble(null);
      lastTargetRef.current = '';
    }, delay);
  }, []);

  const showBubble = useCallback((text: string, duration = 3000) => {
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    setBubble(text);
    bubbleTimerRef.current = window.setTimeout(() => {
      setBubble(null);
      lastTargetRef.current = '';
    }, duration);
  }, []);

  const triggerDizzy = useCallback(() => {
    isDizzyRef.current = true;
    setIsDizzy(true);
    setState('dizzy');
    mouseVelocityHistoryRef.current = [];

    const annoyedQuips = [
      'woooah @_@',
      'too fast, slow down!',
      'my head is spinning...',
      'stoppp shaking me!',
      'so dizzy @~@',
      'i am gonna puke...',
      'motion sickness!!',
    ];
    const chosen = annoyedQuips[Math.floor(Math.random() * annoyedQuips.length)];
    showBubble(chosen, 3500);

    if (dizzyTimerRef.current) clearTimeout(dizzyTimerRef.current);
    dizzyTimerRef.current = window.setTimeout(() => {
      isDizzyRef.current = false;
      setIsDizzy(false);
      setState('idle');
      showBubble('whew... x_x', 1600);
      dizzyCooldownRef.current = performance.now() + 2500;
    }, 3500);
  }, [showBubble]);

  const triggerHop = useCallback((height = 16) => {
    if (isDizzyRef.current) return;
    isJumpingRef.current = true;
    setState('jump');
    let frame = 0;
    const jumpAnim = () => {
      frame++;
      const t = frame / 14;
      if (t <= 1) {
        setJumpOffset(-Math.sin(t * Math.PI) * height);
        requestAnimationFrame(jumpAnim);
      } else {
        setJumpOffset(0);
        isJumpingRef.current = false;
        if (!isDizzyRef.current) setState('idle');
      }
    };
    requestAnimationFrame(jumpAnim);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
      setIsMobile(isTouch);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const initialX = window.innerWidth - 60;
    const initialY = 240;
    mouseRef.current = { x: initialX, y: initialY };
    lastMousePosRef.current = { x: initialX, y: initialY };
    posRef.current = { x: initialX, y: initialY };
    setPos({ x: initialX, y: initialY });

    // Contextual Hover Detection: T-Rex reacts to whatever the cursor hovers over!
    const handleHover = (target: HTMLElement | null) => {
      // Don't interrupt dizzy state with ordinary hover comments
      if (isDizzyRef.current) return;

      const comment = detectHoverItem(target);

      if (comment) {
        if (comment !== lastTargetRef.current) {
          lastTargetRef.current = comment;
          showBubble(comment, 3500);
          if (target?.closest('a, button')) {
            if (!isJumpingRef.current) triggerHop(14);
          }
        }
      } else {
        // Idle place / background / whitespace: clear bubble smoothly
        if (lastTargetRef.current !== '') {
          lastTargetRef.current = '';
          clearBubble(200);
        }
      }
    };

    // Track mouse position & detect rapid erratic cursor movements
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const last = lastMousePosRef.current;
      const dist = Math.hypot(e.clientX - last.x, e.clientY - last.y);
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      mouseRef.current = { x: e.clientX, y: e.clientY };

      handleHover(e.target as HTMLElement | null);

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = window.setTimeout(() => {
        if (!isDizzyRef.current) setState('sleep1');
      }, 12000);

      // Rapid cursor movement detection: only detect intentional back-and-forth shaking (ignore single large teleports > 400px)
      if (dist < 400 && !isDizzyRef.current && now > dizzyCooldownRef.current) {
        mouseVelocityHistoryRef.current = mouseVelocityHistoryRef.current.filter(
          (m) => now - m.time < 1200
        );
        mouseVelocityHistoryRef.current.push({ dist, time: now });

        const totalDist = mouseVelocityHistoryRef.current.reduce((sum, m) => sum + m.dist, 0);

        if (totalDist > 2400 && mouseVelocityHistoryRef.current.length >= 8) {
          triggerDizzy();
        }
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      handleHover(e.target as HTMLElement | null);
    };

    // Section scroll awareness & fast scroll sprint
    const handleScroll = () => {
      if (isDizzyRef.current) return;
      const currentScrollY = window.scrollY;
      const scrollSpeed = Math.abs(currentScrollY - lastScrollYRef.current);
      lastScrollYRef.current = currentScrollY;

      if (scrollSpeed > 25 && !isJumpingRef.current) {
        setState('run1');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('scroll', handleScroll);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
      if (dizzyTimerRef.current) clearTimeout(dizzyTimerRef.current);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [showBubble, triggerDizzy, triggerHop]);

  // Main animation / physics loop
  useEffect(() => {
    if (isMobile) return;

    let tick = 0;
    const updateLoop = () => {
      tick++;

      // Follow cursor positioned comfortably to the bottom-right so it stays clearly visible and never obscures text or cards
      const targetX = Math.min(window.innerWidth - 44, mouseRef.current.x + 85);
      const targetY = Math.min(window.innerHeight - 44, mouseRef.current.y + 75);

      const dx = targetX - posRef.current.x;
      const dy = targetY - posRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // When dizzy, speed factor slows down drastically (disoriented stumble)
      const speedFactor = isDizzyRef.current ? 0.035 : 0.085;
      posRef.current.x += dx * speedFactor;
      posRef.current.y += dy * speedFactor;

      if (!isDizzyRef.current) {
        if (dx < -3) {
          setFacingLeft(true);
        } else if (dx > 3) {
          setFacingLeft(false);
        }
      }

      const frameDist = Math.hypot(
        posRef.current.x - lastPosRef.current.x,
        posRef.current.y - lastPosRef.current.y
      );
      lastPosRef.current = { ...posRef.current };

      if (!isJumpingRef.current && !isDizzyRef.current) {
        if (dist > 7) {
          stepCountRef.current++;
          if (frameDist > 8) {
            const isRun1 = Math.floor(stepCountRef.current / 3.5) % 2 === 0;
            setState(isRun1 ? 'run1' : 'run2');
          } else {
            const isWalk1 = Math.floor(stepCountRef.current / 5) % 2 === 0;
            setState(isWalk1 ? 'walk1' : 'walk2');
          }
        } else {
          if (state !== 'sleep1' && state !== 'sleep2') {
            if (tick % 220 > 210) {
              setState('blink');
            } else {
              setState('idle');
            }
          } else {
            setState(Math.floor(tick / 28) % 2 === 0 ? 'sleep1' : 'sleep2');
          }
        }
      }

      setPos({ x: posRef.current.x, y: posRef.current.y });
      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isMobile, state]);

  const getSpriteSrc = (s: TrexState) => {
    switch (s) {
      case 'dizzy':
      case 'blink':
        return '/images/trex/blink.png';
      case 'walk1':
        return '/images/trex/walk1.png';
      case 'walk2':
        return '/images/trex/walk2.png';
      case 'run1':
        return '/images/trex/run1.png';
      case 'run2':
        return '/images/trex/run2.png';
      case 'jump':
        return '/images/trex/jump.png';
      case 'sleep1':
        return '/images/trex/sleep1.png';
      case 'sleep2':
        return '/images/trex/sleep2.png';
      case 'idle':
      default:
        return '/images/trex/idle.png';
    }
  };

  if (isMobile) {
    return null;
  }

  return (
    <div
      className="fixed z-50 transition-transform duration-75 ease-out select-none pointer-events-none"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y + jumpOffset}px`,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    >
      {/* Speech / Thought bubble reflecting cursor hover area or dizzy complaints */}
      {bubble && (
        <div
          className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#0C0C0C]/98 border border-[#2a2a2a] font-mono text-[9.5px] px-2.5 py-1 rounded shadow-xl tracking-wide animate-fade-in pointer-events-none"
          style={{
            color: 'var(--accent)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.95)',
          }}
        >
          <span>{bubble}</span>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0C0C0C] border-b border-r border-[#2a2a2a] rotate-45" />
        </div>
      )}

      {/* Sleep zZz floating particles */}
      {(state === 'sleep1' || state === 'sleep2') && !isDizzy && (
        <div className="absolute -top-5 right-1 text-[#888888] font-mono text-[10px] animate-pulse pointer-events-none">
          z Z
        </div>
      )}

      {/* Orbiting Dizzy Stars & Swirls */}
      {isDizzy && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-6 pointer-events-none z-30">
          <div className="dizzy-star star-1">💫</div>
          <div className="dizzy-star star-2">⭐</div>
          <div className="dizzy-star star-3">🌀</div>
        </div>
      )}

      {/* T-Rex Sprite Container (with wobble animation when dizzy) */}
      <div
        style={{
          transform: `scaleX(${facingLeft ? -1 : 1})`,
          transition: 'transform 0.15s ease-out',
        }}
        className={`w-16 h-16 flex items-center justify-center pointer-events-none ${
          isDizzy ? 'animate-trex-wobble' : ''
        }`}
      >
        <img
          src={getSpriteSrc(state)}
          alt="T-Rex companion"
          className="w-14 h-14 object-contain pixelated filter brightness-125 contrast-110 drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)] pointer-events-none"
          draggable={false}
        />
      </div>
    </div>
  );
}
