import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { GithubIcon } from './Icons';
import { research } from '../data/portfolio';

export default function ResearchSection() {
  const [openId, setOpenId] = useState<string | null>('transformer-quant');

  return (
    <section id="research" className="py-10 border-b border-[#141414] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 font-mono text-[11px]">
        <div className="text-[#777777] flex items-center gap-1.5">
          <span style={{ color: 'var(--accent)' }}>/</span>
          <span>research</span>
        </div>
        <span className="text-[#444444] font-mono text-[10.5px]">empirical notes</span>
      </div>

      <div className="space-y-4">
        {research.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="group border-b border-[#141414] last:border-0 pb-4 transition-colors"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full text-left flex items-start justify-between gap-4 cursor-pointer py-1"
                aria-expanded={isOpen}
              >
                <div>
                  <h3 className="text-[14px] font-semibold text-[#D0D0D0] group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[12px] font-mono text-[#666666] mt-0.5 italic">
                    "{item.question}"
                  </p>
                </div>

                <div className="text-[#555555] group-hover:text-[#999999] shrink-0 mt-1 transition-colors">
                  {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </div>
              </button>

              {isOpen && (
                <div className="pt-3 pb-2 space-y-3.5 text-[12.5px] text-[#777777] animate-fade-in">
                  <div>
                    <h5 className="font-mono text-[9.5px] text-[#555555] uppercase tracking-wider mb-1">
                      EXPERIMENTAL APPROACH
                    </h5>
                    <p className="text-[#999999] leading-relaxed">{item.approach}</p>
                  </div>

                  {/* Research plots */}
                  {item.id === 'transformer-quant' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1">
                      <div className="rounded border border-[#1a1a1a] bg-black p-2 overflow-hidden">
                        <img
                          src="/images/projects/llm_quant_fp16.png"
                          alt="FP16 Layer Sensitivity Benchmark"
                          className="w-full h-auto object-contain filter contrast-125"
                        />
                        <p className="font-mono text-[8.5px] text-[#555555] text-center mt-1">
                          Fig 1. Layer-wise noise sensitivity in DistilBERT
                        </p>
                      </div>
                      <div className="rounded border border-[#1a1a1a] bg-black p-2 overflow-hidden">
                        <img
                          src="/images/projects/llm_quant_rank.png"
                          alt="Layer Sensitivity Ranking"
                          className="w-full h-auto object-contain filter contrast-125"
                        />
                        <p className="font-mono text-[8.5px] text-[#555555] text-center mt-1">
                          Fig 2. Sensitivity score distribution ranking
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <h5 className="font-mono text-[9.5px] text-[#555555] uppercase tracking-wider mb-1">
                        MODELS EVALUATED
                      </h5>
                      <div className="space-y-0.5">
                        {item.models.map((m) => (
                          <div key={m} className="font-mono text-[10.5px] text-[#777777]">
                            &gt; {m}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-mono text-[9.5px] text-[#555555] uppercase tracking-wider mb-1">
                        DATA / TESTBED
                      </h5>
                      <div className="space-y-0.5">
                        {item.datasets.map((d) => (
                          <div key={d} className="font-mono text-[10.5px] text-[#777777]">
                            &gt; {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-mono text-[9.5px] text-[#555555] uppercase tracking-wider mb-1">
                      KEY OBSERVATIONS
                    </h5>
                    <p className="text-[#A5A5A5] leading-relaxed font-normal">{item.observations}</p>
                  </div>

                  {item.code && (
                    <div className="pt-1">
                      <a
                        href={item.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-transparent hover:bg-[#111111] border border-[#1c1c1c] rounded font-mono text-[10.5px] text-[#C0C0C0] transition-colors"
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1c1c1c')}
                      >
                        <GithubIcon size={10} />
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
