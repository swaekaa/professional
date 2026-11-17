import { ArrowUpRight, Award, Trophy, Zap, Code2 } from 'lucide-react';
import { personal, leetcodeStats } from '../data/portfolio';

export default function LeetCodeStats() {
  const { totalSolved, easy, medium, hard, totalSubmissions, acceptanceRate, ranking, contestRating, streak, activeDays, languages, topTopics, badges } = leetcodeStats;
  const total = easy + medium + hard;
  const easyPct = (easy / total) * 100;
  const medPct = (medium / total) * 100;
  const hardPct = (hard / total) * 100;

  return (
    <section id="leetcode" className="py-10 border-b border-[#181818] animate-fade-in">
      {/* Section Header with Accent Color */}
      <div className="flex items-center justify-between mb-5 font-mono text-[12px]">
        <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--accent)' }}>
          <span>/</span>
          <span className="uppercase tracking-wider">leetcode</span>
          <span className="text-[#888888] font-normal text-[11px]">· @{personal.leetcodeUsername}</span>
        </div>
        <a
          href={personal.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#AAAAAA] hover:text-white flex items-center gap-1.5 transition-colors font-medium"
        >
          <span>leetcode.com/u/{personal.leetcodeUsername}</span>
          <ArrowUpRight size={13} />
        </a>
      </div>

      {/* Main LeetCode Container */}
      <div className="bg-[#080808] border border-[#1A1A1A] rounded-xl p-5 sm:p-6 space-y-5">
        {/* Balanced Top Metrics Grid — 3 Spacious Cards matching GitHub */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="bg-[#0C0C0C] border border-[#1E1E1E] hover:border-[#2A2A2A] rounded-xl p-4 flex flex-col justify-between h-[96px] transition-all duration-200">
            <span className="text-[#888888] text-[11px] font-mono uppercase tracking-wider font-semibold">
              Solved
            </span>
            <div className="text-[26px] font-mono font-bold text-white leading-none tracking-tight">
              {totalSolved}
            </div>
            <span className="text-[11px] font-mono text-[#666666]">{totalSubmissions} submissions</span>
          </div>

          <div className="bg-[#0C0C0C] border border-[#1E1E1E] hover:border-[#2A2A2A] rounded-xl p-4 flex flex-col justify-between h-[96px] transition-all duration-200">
            <span className="text-[#888888] text-[11px] font-mono uppercase tracking-wider font-semibold">
              Acceptance
            </span>
            <div className="text-[26px] font-mono font-bold text-white leading-none tracking-tight">
              {acceptanceRate}
            </div>
            <span className="text-[11px] font-mono text-[#666666]">solution accuracy</span>
          </div>

          <div className="bg-[#0C0C0C] border border-[#1E1E1E] hover:border-[#2A2A2A] rounded-xl p-4 flex flex-col justify-between h-[96px] transition-all duration-200">
            <span className="text-[#888888] text-[11px] font-mono uppercase tracking-wider font-semibold">
              Contest Rating
            </span>
            <div className="text-[26px] font-mono font-bold text-white leading-none tracking-tight">
              {contestRating}
            </div>
            <span className="text-[11px] font-mono text-amber-400 font-medium flex items-center gap-1.5">
              <Trophy size={11} /> {ranking}
            </span>
          </div>
        </div>

        {/* Difficulty Distribution Bar & Aligned 3-Column Breakdown */}
        <div className="space-y-2.5 pt-2 border-t border-[#161616]">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-white font-bold uppercase tracking-wider">Difficulty Distribution</span>
            <span className="text-[#888888] flex items-center gap-1.5 whitespace-nowrap">
              <Zap size={11} className="text-amber-400 shrink-0" />
              <span className="text-amber-400 font-semibold">{streak}</span>
              <span>· {activeDays} active days · Primary: <strong className="text-white">{languages[0]}</strong></span>
            </span>
          </div>

          <div className="h-2.5 w-full bg-[#141414] rounded-full overflow-hidden flex">
            <div style={{ width: `${easyPct}%` }} className="bg-emerald-500" title={`Easy: ${easy}`} />
            <div style={{ width: `${medPct}%` }} className="bg-amber-500" title={`Medium: ${medium}`} />
            <div style={{ width: `${hardPct}%` }} className="bg-rose-500" title={`Hard: ${hard}`} />
          </div>

          {/* Equal-height Difficulty Cards */}
          <div className="grid grid-cols-3 gap-2.5 text-[11.5px] font-mono pt-1">
            <div className="bg-[#0A0A0A] border border-[#1C1C1C] rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-emerald-400 font-bold">Easy</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-white font-bold text-[14px]">{easy}</span>
                <span className="text-[#666666] text-[10px]">({Math.round(easyPct)}%)</span>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-[#1C1C1C] rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span className="text-amber-400 font-bold">Medium</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-white font-bold text-[14px]">{medium}</span>
                <span className="text-[#666666] text-[10px]">({Math.round(medPct)}%)</span>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-[#1C1C1C] rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                <span className="text-rose-400 font-bold">Hard</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-white font-bold text-[14px]">{hard}</span>
                <span className="text-[#666666] text-[10px]">({Math.round(hardPct)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Algorithmic Topic Mastery — Clean 2-Column Grid with NO Truncation */}
        <div className="pt-2 border-t border-[#161616] space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#AAAAAA]">
            <span className="text-white font-bold flex items-center gap-1.5 uppercase tracking-wider">
              <Code2 size={13} style={{ color: 'var(--accent)' }} />
              Algorithmic Topic Focus
            </span>
            <span className="text-[#777777]">Solved Problems</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {topTopics.map((topic) => (
              <div
                key={topic.name}
                className="bg-[#0B0B0B] border border-[#1C1C1C] hover:border-[#282828] rounded-lg px-3 py-2 flex items-center justify-between text-[12px] font-mono transition-colors"
              >
                <span className="text-[#D0D0D0] font-medium">{topic.name}</span>
                <span
                  className="font-bold text-white bg-[#141414] px-2 py-0.5 rounded text-[11px]"
                  style={{ color: 'var(--accent)' }}
                >
                  {topic.solved}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Real Official Badges */}
        <div className="pt-2.5 border-t border-[#161616] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-white font-bold">
            <Award size={13} className="text-amber-400 shrink-0" />
            <span>Official Badges:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {badges.map((b) => (
              <span
                key={b}
                className="bg-[#111111] border border-[#242424] text-white px-2.5 py-1 rounded-md text-[11px] font-medium"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
