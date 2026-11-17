import { ArrowUp } from 'lucide-react';
import { personal } from '../data/portfolio';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-8 pb-14 text-[12px] font-mono animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-5 border-t border-[#181818]">
        <div>
          <span className="text-white font-bold">© 2026 {personal.name}</span>
          <span className="mx-2 text-[#444444]">·</span>
          <span className="text-[#AAAAAA]">All systems & experiments verified</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-white hover:underline transition-colors cursor-pointer font-bold"
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
        >
          <span>back to top</span>
          <ArrowUp size={12} />
        </button>
      </div>
    </footer>
  );
}
