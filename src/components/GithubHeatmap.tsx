import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ActivityHeatmap, type HeatDay } from '@/components/ui/activity-heatmap';
import { useTheme } from '../context/ThemeContext';
import { personal } from '../data/portfolio';
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
    <section id="github" className="py-10 border-b border-[#141414] animate-fade-in">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 font-mono text-[11px]">
        <div className="text-[#777777] flex items-center gap-1.5">
          <span style={{ color: 'var(--accent)' }}>/</span>
          <span>github</span>
          <span className="text-[#444444] text-[10px]">· @{personal.githubUsername}</span>
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
      <div className="bg-[#080808] border border-[#161616] rounded-lg p-4 overflow-hidden">
        <ActivityHeatmap
          data={data}
          weekStart={1}
          unit="contributions"
          color={accent.primary}
          weeks={53}
          minCell={8}
          className="w-full text-neutral-300"
        />
      </div>
    </section>
  );
}
