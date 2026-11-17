import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { GithubIcon } from './Icons';
import { research } from '../data/portfolio';

export default function ResearchSection() {
  const [openId, setOpenId] = useState<string | null>('llm-quant-sense');

  return (
    <section id="research" className="py-10 border-b border-[#181818] animate-fade-in">
      {/* Header with Accent Color */}
      <div className="flex items-center justify-between mb-5 font-mono text-[12px]">
        <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--accent)' }}>
          <span>/</span>
          <span className="uppercase tracking-wider">research</span>
        </div>
        <span className="text-[#888888] font-mono text-[11px]">empirical notes</span>
      </div>

      <div className="space-y-4">
        {research.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              data-research={item.title}
              className="group border-b border-[#181818] last:border-0 pb-4 transition-colors"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full text-left flex items-start justify-between gap-4 cursor-pointer py-1.5"
                aria-expanded={isOpen}
              >
                <div>
                  <h3 className="text-[16px] font-bold text-white group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[13px] font-mono text-[#AAAAAA] mt-0.5 italic">
                    "{item.question}"
                  </p>
                </div>

                <div className="text-[#888888] group-hover:text-white shrink-0 mt-1 transition-colors">
                  {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </div>
              </button>

              {isOpen && (
                <div className="pt-3 pb-2 space-y-4 text-[14.5px] text-white animate-fade-in">
                  <div>
                    <h5 className="font-mono text-[10.5px] font-bold text-[#AAAAAA] uppercase tracking-wider mb-1.5">
                      EXPERIMENTAL APPROACH
                    </h5>
                    <p className="text-white leading-relaxed">{item.approach}</p>
                  </div>

                  {/* Empirical Picture Graphs & Plots */}
                  {'images' in item && Array.isArray(item.images) && item.images.length > 0 && (
                    <div className="space-y-2 py-1">
                      <div className={`grid grid-cols-1 ${item.images.length > 1 ? 'sm:grid-cols-2' : ''} gap-3`}>
                        {item.images.map((img: { src: string; caption: string }, idx: number) => (
                          <div
                            key={idx}
                            className="rounded-xl border border-[#222222] bg-black p-3 overflow-hidden flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-center min-h-[160px] bg-[#060606] rounded-lg p-1 overflow-hidden">
                              <img
                                src={img.src}
                                alt={img.caption}
                                className="w-full h-auto max-h-[220px] object-contain filter contrast-110"
                                loading="lazy"
                              />
                            </div>
                            <p className="font-mono text-[10.5px] text-[#AAAAAA] text-center mt-2 leading-tight">
                              {img.caption}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="bg-[#090909] border border-[#1E1E1E] rounded-lg p-3">
                      <h5 className="font-mono text-[10.5px] font-bold text-[#AAAAAA] uppercase tracking-wider mb-1.5">
                        MODELS EVALUATED
                      </h5>
                      <div className="space-y-1">
                        {item.models.map((m) => (
                          <div key={m} className="font-mono text-[12px] text-white">
                            &gt; {m}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#090909] border border-[#1E1E1E] rounded-lg p-3">
                      <h5 className="font-mono text-[10.5px] font-bold text-[#AAAAAA] uppercase tracking-wider mb-1.5">
                        DATA / TESTBED
                      </h5>
                      <div className="space-y-1">
                        {item.datasets.map((d) => (
                          <div key={d} className="font-mono text-[12px] text-white">
                            &gt; {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-mono text-[10.5px] font-bold text-[#AAAAAA] uppercase tracking-wider mb-1.5">
                      KEY OBSERVATIONS
                    </h5>
                    <p className="text-white leading-relaxed font-normal">{item.observations}</p>
                  </div>

                  {item.code && (
                    <div className="pt-2">
                      <a
                        href={item.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-cyber-pop inline-flex items-center gap-2 px-3 py-1.5 bg-[#121212] border border-[#262626] rounded font-mono text-[11.5px] font-medium text-white cursor-pointer"
                      >
                        <GithubIcon size={12} />
                        <span>View Experiment Code</span>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
