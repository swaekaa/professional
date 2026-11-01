import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { experience } from '../data/portfolio';

export default function ExperienceTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>('accenture');

  return (
    <section id="experience" className="py-10 border-b border-[#141414] animate-fade-in">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5 font-mono text-[11px]">
        <div className="text-[#777777] flex items-center gap-1.5">
          <span style={{ color: 'var(--accent)' }}>/</span>
          <span>experience</span>
        </div>
        <span className="text-[#444444] font-mono text-[10.5px]">timeline</span>
      </div>

      <div className="space-y-4">
        {experience.map((job) => {
          const isExpanded = expandedId === job.id;
          return (
            <div
              key={job.id}
              className="group border-b border-[#141414] last:border-0 pb-4 transition-colors"
            >
              {/* Header Row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : job.id)}
                className="w-full text-left flex items-start justify-between gap-4 cursor-pointer py-1"
                aria-expanded={isExpanded}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[14px] font-semibold text-[#D0D0D0] group-hover:text-white transition-colors">
                      {job.company}
                    </h3>
                    <span className="text-[11.5px] text-[#666666]">·</span>
                    <span className="text-[13px] text-[#858585]">{job.role}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#555555] mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={9} />
                      {job.location}
                    </span>
                    <span className="text-[#333333]">·</span>
                    <span>Multi-Agent RAG</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 text-right">
                  <span className="font-mono text-[11px] text-[#555555]">
                    2026 — now
                  </span>
                  <div className="text-[#555555] group-hover:text-[#999999] transition-colors">
                    {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </div>
                </div>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div className="pt-3 pb-2 space-y-3 text-[13px] animate-fade-in">
                  <p className="text-[#888888] leading-relaxed">
                    {job.summary}
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {job.contributions.map((bullet, i) => (
                      <div key={i} className="flex items-start gap-2 text-[#777777] leading-relaxed">
                        <span
                          className="font-mono text-[10px] mt-0.5 shrink-0"
                          style={{ color: 'var(--accent)' }}
                        >
                          -&gt;
                        </span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technical Badges */}
                  <div className="pt-2 flex flex-wrap gap-1">
                    {job.technologies.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] tracking-wider text-[#666666] bg-transparent border border-[#1a1a1a] hover:text-[#D0D0D0] px-1.5 py-0.5 rounded transition-colors cursor-default"
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1a1a1a')}
                      >
                        [{t}]
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
