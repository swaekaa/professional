import { ArrowUpRight, Award, Trophy, Zap, Code2 } from 'lucide-react';
import { personal, leetcodeStats } from '../data/portfolio';

export default function LeetCodeStats() {
  const { totalSolved, easy, medium, hard, acceptanceRate, ranking, contestRating, streak, languages, topTopics } = leetcodeStats;
  const total = easy + medium + hard;
  const easyPct = (easy / total) * 100;
  const medPct = (medium / total) * 100;
  const hardPct = (hard / total) * 100;

  return (
    <section id="leetcode" className="py-10 border-b border-[#181818] animate-fade-in">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5 font-mono text-[12px]">
        <div className="text-white flex items-center gap-1.5 font-bold">
          <span style={{ color: 'var(--accent)' }}>/</span>
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

      {/* Main LeetCode Card */}
      <div className="bg-[#080808] border border-[#1A1A1A] rounded-xl p-5 sm:p-6 space-y-5">
        {/* Top Summary Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-[26px] font-mono font-bold text-white tracking-tight">{totalSolved}</span>
              <span className="text-[13px] font-mono text-[#AAAAAA] uppercase tracking-wider font-semibold">Problems Solved</span>
            </div>
            <div className="flex items-center gap-3 text-[12px] font-mono text-white mt-1">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Trophy size={13} />
                {ranking}
              </span>
              <span className="text-[#444444]">·</span>
              <span className="text-white">
                Contest Rating: <strong className="text-white font-bold">{contestRating}</strong>
              </span>
              <span className="text-[#444444]">·</span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <Zap size={13} />
                {streak}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[12px] font-mono">
            <div className="bg-[#111111] border border-[#222222] rounded-lg px-3 py-1.5 text-center">
              <span className="text-[#888888] block text-[10px] uppercase font-bold tracking-wider">Acceptance</span>
              <span className="text-white font-bold text-[14px]">{acceptanceRate}</span>
            </div>
            <div className="bg-[#111111] border border-[#222222] rounded-lg px-3 py-1.5 text-center">
              <span className="text-[#888888] block text-[10px] uppercase font-bold tracking-wider">Languages</span>
              <span className="text-white font-bold text-[13px]">{languages.slice(0, 3).join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar Breakdown */}
        <div className="space-y-2.5 pt-2 border-t border-[#181818]">
          <div className="h-2 w-full bg-[#141414] rounded-full overflow-hidden flex">
            <div style={{ width: `${easyPct}%` }} className="bg-emerald-500" title={`Easy: ${easy}`} />
            <div style={{ width: `${medPct}%` }} className="bg-amber-500" title={`Medium: ${medium}`} />
            <div style={{ width: `${hardPct}%` }} className="bg-rose-500" title={`Hard: ${hard}`} />
          </div>

          <div className="grid grid-cols-3 gap-2 text-[12px] font-mono pt-1">
            <div className="bg-[#0C0C0C] border border-[#1A1A1A] rounded p-2 flex items-center justify-between">
              <span className="text-emerald-400 font-bold">Easy</span>
              <span className="text-white font-bold">{easy} <span className="text-[#777777] font-normal text-[10px]">({Math.round(easyPct)}%)</span></span>
            </div>
            <div className="bg-[#0C0C0C] border border-[#1A1A1A] rounded p-2 flex items-center justify-between">
              <span className="text-amber-400 font-bold">Medium</span>
              <span className="text-white font-bold">{medium} <span className="text-[#777777] font-normal text-[10px]">({Math.round(medPct)}%)</span></span>
            </div>
            <div className="bg-[#0C0C0C] border border-[#1A1A1A] rounded p-2 flex items-center justify-between">
              <span className="text-rose-400 font-bold">Hard</span>
              <span className="text-white font-bold">{hard} <span className="text-[#777777] font-normal text-[10px]">({Math.round(hardPct)}%)</span></span>
            </div>
          </div>
        </div>

        {/* Topic Mastery Grid */}
        <div className="pt-2 border-t border-[#181818] space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#AAAAAA]">
            <span className="text-white font-bold flex items-center gap-1.5 uppercase tracking-wider">
              <Code2 size={12} style={{ color: 'var(--accent)' }} />
              Algorithmic Topic Focus
            </span>
            <span className="text-[#777777]">Solved Count</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {topTopics.map((topic) => (
              <div
                key={topic.name}
                className="bg-[#0D0D0D] border border-[#1E1E1E] rounded-md px-2.5 py-1.5 flex items-center justify-between text-[11.5px] font-mono"
              >
                <span className="text-[#D0D0D0] truncate mr-1.5">{topic.name}</span>
                <span className="text-white font-bold shrink-0">{topic.solved}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Row */}
        <div className="pt-2 border-t border-[#181818] flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-white font-bold">
            <Award size={12} className="text-amber-400" />
            <span>Badges:</span>
          </div>
          <div className="flex items-center gap-2">
            {leetcodeStats.badges.map((b) => (
              <span
                key={b}
                className="bg-[#121212] border border-[#262626] text-white px-2 py-0.5 rounded text-[10.5px]"
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
