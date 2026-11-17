import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { GithubIcon } from './Icons';
import { research } from '../data/portfolio';

export default function ResearchSection() {
  const [openId, setOpenId] = useState<string | null>('transformer-quant');

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

                  {/* Research plots */}
                  {item.id === 'transformer-quant' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
                      <div className="rounded-lg border border-[#222222] bg-black p-2.5 overflow-hidden">
                        <img
                          src="/images/projects/llm_quant_fp16.png"
                          alt="FP16 Layer Sensitivity Benchmark"
                          className="w-full h-auto object-contain filter contrast-125"
                        />
                        <p className="font-mono text-[10px] text-[#888888] text-center mt-1.5">
                          Fig 1. Layer-wise noise sensitivity in DistilBERT
                        </p>
                      </div>
                      <div className="rounded-lg border border-[#222222] bg-black p-2.5 overflow-hidden">
                        <img
                          src="/images/projects/llm_quant_rank.png"
                          alt="Layer Sensitivity Ranking"
                          className="w-full h-auto object-contain filter contrast-125"
                        />
                        <p className="font-mono text-[10px] text-[#888888] text-center mt-1.5">
                          Fig 2. Sensitivity score distribution ranking
                        </p>
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
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#121212] hover:bg-[#1A1A1A] border border-[#262626] rounded font-mono text-[11.5px] font-medium text-white transition-colors"
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#262626')}
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
