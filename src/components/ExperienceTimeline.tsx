import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { experience } from '../data/portfolio';

export default function ExperienceTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>('accenture');

  return (
    <section id="experience" className="py-10 border-b border-[#181818] animate-fade-in">
      {/* Section Header with Accent Color */}
      <div className="flex items-center justify-between mb-5 font-mono text-[12px]">
        <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--accent)' }}>
          <span>/</span>
          <span className="uppercase tracking-wider">experience</span>
        </div>
        <span className="text-[#888888] font-mono text-[11px]">employment log</span>
      </div>

      <div className="space-y-4">
        {experience.map((job) => {
          const isExpanded = expandedId === job.id;
          return (
            <div
              key={job.id}
              data-experience={`${job.company} · ${job.role}`}
              className="group border-b border-[#181818] last:border-0 pb-4 transition-colors"
            >
              {/* Header Row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : job.id)}
                className="w-full text-left flex items-start justify-between gap-4 cursor-pointer py-1.5"
                aria-expanded={isExpanded}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[16px] font-bold text-white group-hover:text-white transition-colors">
                      {job.company}
                    </h3>
                    <span className="text-[#666666]">·</span>
                    <span className="text-[14.5px] font-semibold text-white">{job.role}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[12px] font-mono text-[#AAAAAA] mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} style={{ color: 'var(--accent)' }} />
                      {job.location}
                    </span>
                    <span className="text-[#444444]">·</span>
                    <span className="text-white font-medium">
                      {'tagline' in job && job.tagline ? job.tagline : 'Multi Agent Enterprise RAG'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-right">
                  <span className="font-mono text-[12px] text-[#AAAAAA] font-medium">
                    {job.period}
                  </span>
                  <div className="text-[#888888] group-hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </div>
                </div>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div className="pt-3 pb-2 space-y-3.5 text-[14.5px] animate-fade-in text-white">
                  {/* Uniform narrative paragraphs */}
                  {'narrative' in job && Array.isArray(job.narrative) ? (
                    job.narrative.map((para: string, i: number) => (
                      <p key={i} className="text-white leading-[1.8] font-normal">
                        {para}
                      </p>
                    ))
                  ) : (
                    <p className="text-white leading-[1.8] font-normal">
                      {job.summary}
                    </p>
                  )}

                  {/* Technical Badges */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {job.technologies.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] tracking-wider text-[#CCCCCC] bg-transparent border border-[#222222] hover:text-white px-2 py-0.5 rounded transition-colors cursor-default"
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#222222')}
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
