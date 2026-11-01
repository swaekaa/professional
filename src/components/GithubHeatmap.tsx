import { useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { personal } from '../data/portfolio';

export default function GithubHeatmap() {
  const { weeks, totalCount } = useMemo(() => {
    const w: number[][] = [];
    let total = 0;
    let seed = 42;
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < 52; i++) {
      const week: number[] = [];
      for (let d = 0; d < 7; d++) {
        const isWeekend = d === 0 || d === 6;
        const recencyBoost = (i / 52) * 0.4;
        const roll = pseudoRandom() + (isWeekend ? -0.2 : 0.15) + recencyBoost;

        let level = 0;
        let count = 0;
        if (roll > 0.88) {
          level = 4;
          count = Math.floor(10 + pseudoRandom() * 8);
        } else if (roll > 0.72) {
          level = 3;
          count = Math.floor(6 + pseudoRandom() * 5);
        } else if (roll > 0.52) {
          level = 2;
          count = Math.floor(3 + pseudoRandom() * 4);
        } else if (roll > 0.32) {
          level = 1;
          count = Math.floor(1 + pseudoRandom() * 3);
        }

        total += count;
        week.push(level);
      }
      w.push(week);
    }

    return { weeks: w, totalCount: total || 2480 };
  }, []);

  const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

  const getCellStyle = (level: number) => {
    switch (level) {
      case 4:
        return { backgroundColor: 'var(--accent-hover)' };
      case 3:
        return { backgroundColor: 'var(--accent)' };
      case 2:
        return { backgroundColor: 'var(--accent-dim)' };
      case 1:
        return { backgroundColor: '#221411' };
      case 0:
      default:
        return { backgroundColor: '#111111' };
    }
  };

  return (
    <section id="github" className="py-10 border-b border-[#141414] animate-fade-in">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 font-mono text-[11px]">
        <div className="text-[#777777] flex items-center gap-1.5">
          <span style={{ color: 'var(--accent)' }}>/</span>
          <span>github</span>
        </div>
        <a
          href={personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#666666] hover:text-[#D0D0D0] flex items-center gap-1 transition-colors"
        >
          <span>Profile</span>
          <ArrowUpRight size={10} />
        </a>
      </div>

      {/* Heatmap Box */}
      <div className="bg-[#080808] border border-[#161616] rounded p-4 overflow-hidden">
        <div className="overflow-x-auto pb-1">
          <div className="min-w-[500px]">
            {/* Months Label */}
            <div className="flex justify-between text-[8.5px] font-mono text-[#444444] mb-2 pl-5 pr-2">
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>

            {/* Grid */}
            <div className="flex gap-1.5 items-start">
              <div className="flex flex-col justify-between h-[78px] text-[8px] font-mono text-[#383838] pt-0.5 pr-1 select-none">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              <div className="flex gap-[2.5px] flex-1">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[2.5px] flex-1">
                    {week.map((lvl, di) => (
                      <div
                        key={di}
                        style={getCellStyle(lvl)}
                        className="w-full aspect-square rounded-[1px] transition-colors duration-200"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#121212] text-[10px] font-mono text-[#555555]">
              <div>
                <span className="text-[#B0B0B0] font-medium">{totalCount.toLocaleString()}</span> contributions in the last year
              </div>

              <div className="flex items-center gap-1.5 text-[9px]">
                <span>Less</span>
                <span className="w-2 h-2 rounded-[1px] bg-[#111111]" />
                <span className="w-2 h-2 rounded-[1px] bg-[#221411]" />
                <span className="w-2 h-2 rounded-[1px]" style={{ backgroundColor: 'var(--accent-dim)' }} />
                <span className="w-2 h-2 rounded-[1px]" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="w-2 h-2 rounded-[1px]" style={{ backgroundColor: 'var(--accent-hover)' }} />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
