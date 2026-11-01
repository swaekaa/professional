import { ArrowUp } from 'lucide-react';
import { personal } from '../data/portfolio';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-8 pb-14 text-[11px] font-mono text-[#444444] animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-5 border-t border-[#141414]">
        <div>
          <span className="text-[#666666]">© 2026 {personal.name}</span>
          <span className="mx-2 text-[#333333]">·</span>
          <span className="text-[#444444]">All experiments verified</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1 text-[#555555] hover:text-[#D0D0D0] transition-colors cursor-pointer"
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#555555')}
        >
          <span>back to top</span>
          <ArrowUp size={11} />
        </button>
      </div>
    </footer>
  );
}
