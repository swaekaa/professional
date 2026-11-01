import { ArrowUpRight } from 'lucide-react';
import { personal, leetcodeStats } from '../data/portfolio';

export default function LeetCodeStats() {
  const { totalSolved, easy, medium, hard, acceptanceRate, ranking, streak, languages } = leetcodeStats;
  const total = easy + medium + hard;
  const easyPct = (easy / total) * 100;
  const medPct = (medium / total) * 100;
  const hardPct = (hard / total) * 100;

  return (
    <section id="leetcode" className="py-10 border-b border-[#141414] animate-fade-in">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 font-mono text-[11px]">
        <div className="text-[#777777] flex items-center gap-1.5">
          <span style={{ color: 'var(--accent)' }}>/</span>
          <span>leetcode</span>
        </div>
        <a
          href={personal.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#666666] hover:text-[#D0D0D0] flex items-center gap-1 transition-colors"
        >
          <span>Profile</span>
          <ArrowUpRight size={10} />
        </a>
      </div>

      {/* LeetCode Card */}
      <div className="bg-[#080808] border border-[#161616] rounded p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[20px] font-mono font-bold text-[#E7E7E7]">{totalSolved}</span>
              <span className="text-[11.5px] font-mono text-[#666666]">problems solved</span>
            </div>
            <p className="text-[11px] font-mono text-[#444444] mt-0.5">
              Rank: <span className="text-[#888888]">{ranking}</span> · Streak: <span className="text-[#888888]">{streak}</span>
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <div>
              <span className="text-[#555555] block text-[9.5px]">ACCEPTANCE</span>
              <span className="text-[#B0B0B0] font-medium">{acceptanceRate}</span>
            </div>
            <div className="border-l border-[#1a1a1a] pl-4">
              <span className="text-[#555555] block text-[9.5px]">LANGUAGES</span>
              <span className="text-[#B0B0B0]">{languages.slice(0, 3).join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar Breakdown */}
        <div className="space-y-2 pt-1 border-t border-[#121212]">
          <div className="h-1.5 w-full bg-[#141414] rounded-full overflow-hidden flex">
            <div style={{ width: `${easyPct}%` }} className="bg-emerald-500/80" title={`Easy: ${easy}`} />
            <div style={{ width: `${medPct}%` }} className="bg-amber-500/80" title={`Medium: ${medium}`} />
            <div style={{ width: `${hardPct}%` }} className="bg-rose-500/80" title={`Hard: ${hard}`} />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono pt-1 text-[#666666]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Easy: <strong className="text-[#A0A0A0]">{easy}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Med: <strong className="text-[#A0A0A0]">{medium}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Hard: <strong className="text-[#A0A0A0]">{hard}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

