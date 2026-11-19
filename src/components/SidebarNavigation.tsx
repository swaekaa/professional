import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme, ACCENT_COLORS } from '../context/ThemeContext';

const navItems = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'research', label: 'research' },
  { id: 'github', label: 'github' },
  { id: 'leetcode', label: 'leetcode' },
  { id: 'certifications', label: 'certifications' },
  { id: 'journey', label: 'journey' },
  { id: 'public', label: 'x · public' },
  { id: 'contact', label: 'contact' },
];

export default function SidebarNavigation({
  onOpenNoteModal,
}: {
  onOpenNoteModal: () => void;
}) {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { accent, setAccentColor } = useTheme();

  // Scroll spy to accurately highlight active section as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const focalLine = 180;
      let current = navItems[0].id;

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalLine) {
          current = item.id;
        }
      }

      // If scrolled near bottom of page, activate contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        current = 'contact';
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
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

          {/* Primary Nav List in exact page order */}
          <nav className="space-y-1" aria-label="Primary sections">
            {navItems.map((item) => {
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

      {/* Mobile Sticky Top Navigation with Compact Full-Section Menu */}
      <header className="md:hidden sticky top-0 left-0 right-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-[#181818] px-4 py-2.5">
        <div className="flex items-center justify-between">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('about');
            }}
            className="font-mono text-[12px] font-bold text-white tracking-wider"
          >
            EK <span style={{ color: 'var(--accent)' }}>·</span> ekaansh
          </a>

          <div className="flex items-center gap-3">
            {/* Mobile Accent Dots */}
            <div className="flex items-center gap-1">
              {ACCENT_COLORS.slice(0, 4).map((c) => (
                <button
                  key={c.id}
                  onClick={() => setAccentColor(c.id)}
                  aria-label={`Select ${c.name} color`}
                  className={`w-2.5 h-2.5 rounded-full transition-transform ${
                    accent.id === c.id ? 'scale-125 ring-1 ring-white' : 'opacity-60'
                  }`}
                  style={{ backgroundColor: c.primary }}
                />
              ))}
            </div>

            {/* Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="btn-cyber-pop p-1.5 rounded-md bg-[#111111] border border-[#262626] text-white font-mono text-[11px] flex items-center gap-1 cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
              <span className="text-[10.5px] uppercase">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Full Dropdown Menu */}
        {mobileMenuOpen && (
          <nav
            className="mt-3 pt-3 border-t border-[#1C1C1C] space-y-1 animate-fade-in"
            aria-label="Mobile navigation links"
          >
            <div className="grid grid-cols-2 gap-1.5 pb-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded font-mono text-[12px] text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#141414] text-white font-bold'
                        : 'text-[#999999] hover:text-white hover:bg-[#0E0E0E]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isActive ? 'opacity-100' : 'opacity-30'
                      }`}
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#181818] flex items-center justify-between text-[11px] font-mono text-[#888888] px-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenNoteModal();
                }}
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                style={{ color: 'var(--accent)' }}
              >
                <span>[leave anonymous note]</span>
              </button>
              <span>swipe or select section</span>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
