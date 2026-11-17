import { useState, useEffect } from 'react';
import { ArrowUpRight, GitCommit, GitBranch, Terminal, Flame } from 'lucide-react';
import { ActivityHeatmap, type HeatDay } from '@/components/ui/activity-heatmap';
import { useTheme } from '../context/ThemeContext';
import { personal, githubStats } from '../data/portfolio';
import initialContributions from '../data/github-contributions.json';

export default function GithubHeatmap() {
  const { accent } = useTheme();
  const [data, setData] = useState<HeatDay[]>(initialContributions.contributions);

  // Live update in background from GitHub contributions API for account @swaekaa
  useEffect(() => {
    let cancelled = false;
    const fetchContributions = async () => {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${personal.githubUsername}?y=last`);
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled && Array.isArray(json.contributions) && json.contributions.length > 0) {
          const mapped: HeatDay[] = json.contributions.map((c: { date: string; count: number }) => ({
            date: c.date,
            value: c.count,
          }));
          setData(mapped);
        }
      } catch {
        // Silently use bundled backup contributions
      }
    };

    fetchContributions();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className="py-10 border-b border-[#181818] animate-fade-in">
      {/* Section Header with Accent Color */}
      <div className="flex items-center justify-between mb-5 font-mono text-[12px]">
        <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--accent)' }}>
          <span>/</span>
          <span className="uppercase tracking-wider">github</span>
          <span className="text-[#888888] font-normal text-[11px]">· @{personal.githubUsername}</span>
        </div>
        <a
          href={personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#AAAAAA] hover:text-white flex items-center gap-1.5 transition-colors font-medium"
        >
          <span>github.com/{personal.githubUsername}</span>
          <ArrowUpRight size={13} />
        </a>
      </div>

      {/* GitHub Real Metrics Grid — 3 Clean Balanced Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
        <div className="bg-[#090909] border border-[#1A1A1A] hover:border-[#282828] rounded-xl p-4 flex flex-col justify-between h-[100px] transition-all duration-200">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#888888] uppercase tracking-wider font-semibold">
            <GitCommit size={14} style={{ color: 'var(--accent)' }} />
            <span>Contributions</span>
          </div>
          <div className="text-[26px] font-mono font-bold text-white leading-none tracking-tight">
            {githubStats.totalContributions}
          </div>
          <span className="text-[11px] font-mono text-[#666666]">past 12 months</span>
        </div>

        <div className="bg-[#090909] border border-[#1A1A1A] hover:border-[#282828] rounded-xl p-4 flex flex-col justify-between h-[100px] transition-all duration-200">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#888888] uppercase tracking-wider font-semibold">
            <GitBranch size={14} style={{ color: 'var(--accent)' }} />
            <span>Public Repos</span>
          </div>
          <div className="text-[26px] font-mono font-bold text-white leading-none tracking-tight">
            {githubStats.publicRepos}
          </div>
          <span className="text-[11px] font-mono text-[#666666]">authored & active</span>
        </div>

        <div className="bg-[#090909] border border-[#1A1A1A] hover:border-[#282828] rounded-xl p-4 flex flex-col justify-between h-[100px] transition-all duration-200">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#888888] uppercase tracking-wider font-semibold">
            <Flame size={14} className="text-amber-500" />
            <span>Active Streak</span>
          </div>
          <div className="text-[26px] font-mono font-bold text-white leading-none tracking-tight">
            {githubStats.currentStreak}
          </div>
          <span className="text-[11px] font-mono text-[#666666]">continuous cadence</span>
        </div>
      </div>

      {/* Heatmap Box */}
      <div className="bg-[#080808] border border-[#1A1A1A] rounded-lg p-4 sm:p-5 overflow-hidden mb-3.5">
        <div className="flex items-center justify-between mb-3 text-[11.5px] font-mono">
          <span className="text-white font-bold flex items-center gap-1.5">
            <Terminal size={12} style={{ color: 'var(--accent)' }} />
            Commit Activity Stream
          </span>
          <span className="text-[#888888]">53 weeks · {githubStats.totalContributions} commits</span>
        </div>
        <ActivityHeatmap
          data={data}
          weekStart={1}
          unit="contributions"
          color={accent.primary}
          weeks={53}
          minCell={8}
          className="w-full text-white"
        />
      </div>

      {/* Language Breakdown Bar */}
      <div className="bg-[#090909] border border-[#1A1A1A] rounded-lg p-4 space-y-2.5">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#AAAAAA]">
          <span className="text-white font-bold uppercase tracking-wider">Top Codebase Languages</span>
          <span className="text-[#777777]">Across 40 Repositories</span>
        </div>

        {/* Stacked Percentage Bar */}
        <div className="h-2.5 w-full bg-[#141414] rounded-full overflow-hidden flex">
          {githubStats.languages.map((l) => (
            <div
              key={l.name}
              style={{ width: `${l.pct}%`, backgroundColor: l.color }}
              title={`${l.name}: ${l.pct}%`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-[11.5px] font-mono">
          {githubStats.languages.map((l) => (
            <div key={l.name} className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: l.color }}
              />
              <span className="text-white font-medium">{l.name}</span>
              <span className="text-[#888888]">{l.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
