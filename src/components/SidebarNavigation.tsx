import { useState, useEffect } from 'react';
import { useTheme, ACCENT_COLORS } from '../context/ThemeContext';

const mainNavItems = [
  { id: 'about', label: 'about' },
  { id: 'github', label: 'github' },
  { id: 'leetcode', label: 'leetcode' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'research', label: 'research' },
  { id: 'writing', label: 'writing' },
  { id: 'community', label: 'community' },
  { id: 'certifications', label: 'certifications' },
];

const secondaryNavItems = [
  { id: 'journey', label: 'journey' },
];

export default function SidebarNavigation({
  onOpenNoteModal,
}: {
  onOpenNoteModal: () => void;
}) {
  const [activeSection, setActiveSection] = useState('about');
  const [activeLang, setActiveLang] = useState('EN');
  const { accent, setAccentColor } = useTheme();

  // Scroll spy to highlight active section as user scrolls
  useEffect(() => {
    const sectionIds = [
      'about',
      'github',
      'leetcode',
      'experience',
      'projects',
      'research',
      'writing',
      'community',
      'certifications',
      'journey',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      let current = 'about';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clickable Mascot State
  const [mascotBubble, setMascotBubble] = useState<string | null>(null);
  const [mascotJumping, setMascotJumping] = useState(false);
  const [mascotJumpOffset, setMascotJumpOffset] = useState(0);
  const [mascotParticles, setMascotParticles] = useState<{ id: number; char: string; x: number; y: number }[]>([]);

  const handleMascotClick = () => {
    if (mascotJumping) return;
    setMascotJumping(true);

    const quips = ['rawr! :D', 'let us build!', 'turbo mode!', '100% verified', 'feed me data!'];
    const chosen = quips[Math.floor(Math.random() * quips.length)];
    setMascotBubble(chosen);

    // Parabolic jump animation
    let frame = 0;
    const animateJump = () => {
      frame++;
      const t = frame / 16;
      if (t <= 1) {
        setMascotJumpOffset(-Math.sin(t * Math.PI) * 16);
        requestAnimationFrame(animateJump);
      } else {
        setMascotJumpOffset(0);
        setMascotJumping(false);
      }
    };
    requestAnimationFrame(animateJump);

    // Spawn sparkles
    const sparkles = ['★', '♥', '✦'].map((char, i) => ({
      id: Date.now() + i,
      char,
      x: (Math.random() - 0.5) * 24,
      y: -15 - Math.random() * 10,
    }));
    setMascotParticles(sparkles);

    setTimeout(() => {
      setMascotBubble(null);
      setMascotParticles([]);
    }, 2400);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation: Understated, floating in empty space */}
      <aside
        className="hidden md:flex flex-col justify-between w-[140px] lg:w-[160px] shrink-0 sticky top-12 h-[calc(100vh-6rem)] select-none"
        aria-label="Site navigation"
      >
        {/* Top: Minimal Branding & Nav Links */}
        <div>
          {/* Subtle branding */}
          <div className="mb-6">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('about');
              }}
              className="group block"
            >
              <span className="font-mono text-[10px] text-[#444444] tracking-widest uppercase block group-hover:text-[#777777] transition-colors">
                EK / EKAANSH
              </span>
            </a>
          </div>

          {/* Primary Nav List */}
          <nav className="space-y-0.5" aria-label="Primary sections">
            {mainNavItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`group flex items-center gap-1.5 text-[12px] font-mono tracking-normal py-0.5 text-left w-full transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#CCCCCC]'
                      : 'text-[#666666] hover:text-[#999999]'
                  }`}
                >
                  <span
                    className={`w-1 h-1 rounded-full shrink-0 transition-all duration-200 ${
                      isActive ? 'opacity-100 scale-125' : 'opacity-0 scale-75'
                    }`}
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Tiny separator */}
            <div className="py-2 pl-2.5">
              <div className="w-4 h-[1px] bg-[#1a1a1a]" />
            </div>

            {/* Secondary: journey */}
            {secondaryNavItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`group flex items-center gap-1.5 text-[12px] font-mono tracking-normal py-0.5 text-left w-full transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#CCCCCC]'
                      : 'text-[#666666] hover:text-[#999999]'
                  }`}
                >
                  <span
                    className={`w-1 h-1 rounded-full shrink-0 transition-all duration-200 ${
                      isActive ? 'opacity-100 scale-125' : 'opacity-0 scale-75'
                    }`}
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility, Clickable Mascot & Accent Color Picker */}
        <div className="space-y-3 pt-4 text-[11px] font-mono text-[#555555]">
          {/* Clickable Sidebar Mascot (Prominent, High-Visibility Avatar) */}
          <div className="relative pt-2 pb-1">
            {/* Mascot Speech Bubble */}
            {mascotBubble && (
              <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#121212] border border-[#333333] font-mono text-[10px] px-2.5 py-1 rounded shadow-xl animate-fade-in z-20 pointer-events-none"
                style={{ color: 'var(--accent)', boxShadow: '0 4px 12px rgba(0,0,0,0.9)' }}
              >
                <span>{mascotBubble}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#121212] border-b border-r border-[#333333] rotate-45" />
              </div>
            )}

            {/* Floating Sparkles */}
            {mascotParticles.map((p) => (
              <span
                key={p.id}
                className="absolute font-mono text-[13px] animate-fade-in pointer-events-none z-20"
                style={{
                  left: `${50 + p.x}px`,
                  top: `${p.y}px`,
                  color: 'var(--accent)',
                  filter: 'drop-shadow(0 0 4px var(--accent))',
                }}
              >
                {p.char}
              </span>
            ))}

            {/* Mascot Showcase Card */}
            <button
              onClick={handleMascotClick}
              className="group w-full block text-left cursor-pointer transition-all select-none p-2 rounded-lg bg-[#0c0c0c] border border-[#1f1f1f] hover:border-[#3a3a3a] transition-all"
              title="Click T-Rex mascot!"
              style={{ transform: `translateY(${mascotJumpOffset}px)` }}
            >
              <div className="flex flex-col items-center justify-center text-center">
                {/* Large high-visibility avatar frame */}
                <div className="w-20 h-20 rounded-md bg-[#131313] border border-[#282828] group-hover:border-[var(--accent)] flex items-center justify-center p-1 relative overflow-hidden transition-all shadow-inner">
                  {/* Subtle accent backdrop aura */}
                  <div
                    className="absolute inset-0 opacity-15 group-hover:opacity-30 transition-opacity pointer-events-none"
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                  <img
                    src={mascotJumping ? '/images/trex/jump.png' : '/images/trex/idle.png'}
                    alt="T-Rex mascot"
                    className="w-16 h-16 object-contain pixelated filter brightness-125 contrast-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] group-hover:scale-110 active:scale-90 transition-transform relative z-10"
                  />
                </div>

                <div className="mt-1.5 w-full">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="font-mono text-[11px] font-semibold text-[#E0E0E0] group-hover:text-white transition-colors">
                      rex
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <span className="font-mono text-[9px] text-[#666666] group-hover:text-[#999999] block mt-0.5 transition-colors">
                    click to play
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Accent Color Picker (directly below mascot) */}
          <div className="pt-1 border-t border-[#141414]">
            <div className="flex items-center gap-1.5 mb-1.5 text-[9.5px] text-[#444444] uppercase tracking-wider">
              <span>accent</span>
              <span className="text-[#333333]">·</span>
              <span style={{ color: 'var(--accent)' }}>{accent.name}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {ACCENT_COLORS.map((c) => {
                const isSelected = accent.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setAccentColor(c.id)}
                    title={c.name}
                    aria-label={`Select ${c.name} accent`}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'ring-1 ring-white/60 scale-125'
                        : 'opacity-60 hover:opacity-100 hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.primary }}
                  />
                );
              })}
            </div>
          </div>

          <div className="space-y-1 pt-1 border-t border-[#141414]">
            <button
              onClick={() => scrollTo('writing')}
              className="block text-left text-[#555555] hover:text-[#888888] transition-colors cursor-pointer"
            >
              process
            </button>
            <button
              onClick={onOpenNoteModal}
              className="block text-left text-[#555555] hover:text-white transition-colors cursor-pointer"
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#555555')}
            >
              anonymous note
            </button>
            <div className="flex items-center gap-1.5 pt-0.5 text-[9.5px] text-[#333333]">
              <span className="w-1 h-1 rounded-full bg-emerald-500/80" />
              <span>system: online</span>
            </div>
          </div>

          {/* Plain text language switcher */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#141414] text-[10px]">
            {['EN', '日本語', '中文', '한국어'].map((lang) => {
              const isSelected = activeLang === lang;
              return (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`transition-colors cursor-pointer ${
                    isSelected
                      ? 'font-medium'
                      : 'text-[#444444] hover:text-[#777777]'
                  }`}
                  style={{ color: isSelected ? 'var(--accent)' : undefined }}
                >
                  {lang}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Mobile Sticky Top Navigation */}
      <header className="md:hidden sticky top-0 left-0 right-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-[#141414] px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleMascotClick}
              className="w-8 h-8 rounded bg-[#111111] border border-[#282828] hover:border-[var(--accent)] flex items-center justify-center p-0.5 active:scale-90 transition-all cursor-pointer relative overflow-hidden"
              title="Tap T-Rex mascot!"
            >
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{ backgroundColor: 'var(--accent)' }}
              />
              <img
                src={mascotJumping ? '/images/trex/jump.png' : '/images/trex/idle.png'}
                alt="T-Rex mascot"
                className="w-6 h-6 object-contain pixelated filter brightness-125 relative z-10"
              />
            </button>
            <a
              href="#about"
              className="font-mono text-[11px] font-semibold text-[#888888] tracking-wider"
            >
              EK <span style={{ color: 'var(--accent)' }}>/</span> ekaansh
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Mobile Accent Dots */}
            <div className="flex items-center gap-1">
              {ACCENT_COLORS.slice(0, 4).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setAccentColor(c.id)}
                  className={`w-2 h-2 rounded-full transition-transform ${
                    accent.id === c.id ? 'scale-125 ring-1 ring-white/50' : 'opacity-50'
                  }`}
                  style={{ backgroundColor: c.primary }}
                />
              ))}
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono text-[#666666]">
              <button onClick={() => scrollTo('about')} className="hover:text-white">
                about
              </button>
              <button onClick={() => scrollTo('projects')} className="hover:text-white">
                projects
              </button>
              <button onClick={() => scrollTo('research')} className="hover:text-white">
                research
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
