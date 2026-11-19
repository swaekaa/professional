import { useState, useEffect } from 'react';
import { useTheme, ACCENT_COLORS } from '../context/ThemeContext';

const mainNavItems = [
  { id: 'about', label: 'about' },
  { id: 'github', label: 'github' },
  { id: 'leetcode', label: 'leetcode' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'research', label: 'research' },
  { id: 'public', label: 'x · public' },
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
      'public',
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
              <span className="font-mono text-[11px] font-bold text-white tracking-widest uppercase block transition-colors">
                EK · EKAANSH
              </span>
            </a>
          </div>

          {/* Primary Nav List */}
          <nav className="space-y-1" aria-label="Primary sections">
            {mainNavItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  data-nav={item.label}
                  onClick={() => scrollTo(item.id)}
                  className={`group flex items-center gap-2 text-[13px] font-mono tracking-normal py-0.5 text-left w-full transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-[#888888] hover:text-white'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 ${
                      isActive ? 'opacity-100 scale-125' : 'opacity-0 scale-75'
                    }`}
                    style={{ backgroundColor: 'var(--accent)' }}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Tiny separator */}
            <div className="py-2.5 pl-2.5">
              <div className="w-5 h-[1px] bg-[#222222]" />
            </div>

            {/* Secondary: journey */}
            {secondaryNavItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  data-nav={item.label}
                  onClick={() => scrollTo(item.id)}
                  className={`group flex items-center gap-2 text-[13px] font-mono tracking-normal py-0.5 text-left w-full transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-[#888888] hover:text-white'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 ${
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

        {/* Bottom Utility & Accent Color Picker */}
        <div className="space-y-3 pt-4 text-[11.5px] font-mono text-[#888888]">
          {/* Accent Color Picker */}
          <div className="pt-2 border-t border-[#181818]">
            <div className="flex items-center gap-1.5 mb-1.5 text-[10px] text-[#AAAAAA] uppercase tracking-wider font-bold">
              <span>accent</span>
              <span className="text-[#444444]">·</span>
              <span style={{ color: 'var(--accent)' }}>{accent.name}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {ACCENT_COLORS.map((c) => {
                const isSelected = accent.id === c.id;
                return (
                  <button
                    key={c.id}
                    data-color-btn={c.name}
                    onClick={() => setAccentColor(c.id)}
                    title={c.name}
                    aria-label={`Select ${c.name} accent`}
                    className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'ring-1 ring-white scale-125'
                        : 'opacity-70 hover:opacity-100 hover:scale-110'
                    }`}
                    style={{ backgroundColor: c.primary }}
                  />
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5 pt-1.5 border-t border-[#181818]">
            <button
              onClick={() => scrollTo('public')}
              className="block text-left text-[#AAAAAA] hover:text-white transition-colors cursor-pointer"
            >
              x thoughts
            </button>
            <button
              onClick={onOpenNoteModal}
              className="block text-left text-[#AAAAAA] hover:text-white transition-colors cursor-pointer"
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#AAAAAA')}
            >
              anonymous note
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sticky Top Navigation */}
      <header className="md:hidden sticky top-0 left-0 right-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-[#181818] px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a
              href="#about"
              className="font-mono text-[12px] font-bold text-white tracking-wider"
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
                  className={`w-2.5 h-2.5 rounded-full transition-transform ${
                    accent.id === c.id ? 'scale-125 ring-1 ring-white' : 'opacity-60'
                  }`}
                  style={{ backgroundColor: c.primary }}
                />
              ))}
            </div>

            <div className="flex items-center gap-3 text-[12px] font-mono text-[#AAAAAA]">
              <button onClick={() => scrollTo('about')} className="hover:text-white font-medium">
                about
              </button>
              <button onClick={() => scrollTo('projects')} className="hover:text-white font-medium">
                projects
              </button>
              <button onClick={() => scrollTo('public')} className="hover:text-white font-medium">
                x
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
