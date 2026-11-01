import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { writing } from '../data/portfolio';

export default function WritingSection() {
  const [expandedId, setExpandedId] = useState<string | null>('w1');

  return (
    <section id="writing" className="py-10 border-b border-[#141414] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 font-mono text-[11px]">
        <div className="text-[#777777] flex items-center gap-1.5">
          <span style={{ color: 'var(--accent)' }}>/</span>
          <span>writing</span>
        </div>
        <span className="text-[#444444] font-mono text-[10.5px]">technical notes</span>
      </div>

      <div className="space-y-3">
        {writing.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="group border-b border-[#141414] last:border-0 pb-3 transition-colors"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full text-left flex items-start justify-between gap-3 cursor-pointer py-1"
                aria-expanded={isExpanded}
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[11px] text-[#444444] shrink-0 mt-0.5">
                    {item.date}
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[13.5px] font-semibold text-[#D0D0D0] group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <span
                        className="font-mono text-[8.5px] bg-transparent border px-1 py-0.2 rounded uppercase"
                        style={{ color: 'var(--accent)', borderColor: 'var(--accent-dim)' }}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[10.5px] text-[#555555] mt-0.5">
                      <span>[{item.tag}]</span>
                      <span className="text-[#333333]">·</span>
                      <span>{item.readingTime}</span>
                    </div>
                  </div>
                </div>

                <div className="text-[#555555] group-hover:text-[#999999] shrink-0 mt-1 transition-colors">
                  {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </div>
              </button>

              {isExpanded && (
                <div className="pt-2.5 pb-1 pl-10 text-[12.5px] text-[#888888] leading-relaxed animate-fade-in">
                  <p>{item.summary}</p>
                  <p className="text-[10px] font-mono text-[#444444] mt-2">
                    Full technical writeup currently being finalized for publication.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
