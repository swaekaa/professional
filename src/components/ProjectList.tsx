import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projects } from '../data/portfolio';

type Project = typeof projects[0];

export default function ProjectList() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lock body scroll and listen for Escape key when deep-dive modal is open
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-10 border-b border-[#181818] animate-fade-in">
      {/* Header with Accent Color */}
      <div className="flex items-center justify-between mb-6 font-mono text-[12px]">
        <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--accent)' }}>
          <span>/</span>
          <span className="uppercase tracking-wider">projects</span>
        </div>
        <span className="text-[#888888] font-mono text-[11px]">0{projects.length} selected</span>
      </div>

      {/* Editorial Typographic List of Projects (Thumbnails Removed) */}
      <div className="space-y-4">
        {projects.map((p) => (
          <article
            key={p.id}
            data-project={p.name}
            className="group py-4 px-4 -mx-4 rounded-lg border border-transparent hover:border-[#222222] hover:bg-[#090909]/60 transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedProject(p)}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="font-bold" style={{ color: 'var(--accent)' }}>
                  {p.number}
                </span>
                <span className="text-[#555555]">·</span>
                <span className="text-[#A0A0A0] font-medium tracking-wider uppercase">{p.category}</span>
              </div>

              <div className="flex items-center gap-2.5" onClick={(e) => e.stopPropagation()}>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-[#888888] hover:text-white transition-colors"
                    aria-label={`${p.name} on GitHub`}
                  >
                    <GithubIcon size={14} />
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-[#888888] hover:text-white transition-colors"
                    aria-label={`${p.name} live demo`}
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1.5">
              <h3 className="text-[17px] font-bold text-white group-hover:text-white transition-colors flex items-center gap-2">
                <span>{p.name}</span>
                {p.subtitle && (
                  <span className="text-[13px] font-normal text-[#999999] hidden sm:inline">
                    — {p.subtitle}
                  </span>
                )}
                <ArrowUpRight
                  size={15}
                  className="text-[#666666] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all ml-auto shrink-0"
                />
              </h3>

              <p className="text-[14.5px] text-white leading-relaxed font-normal">
                {p.shortDescription}
              </p>

              {/* Technical Badges */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {p.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] tracking-wider text-[#CCCCCC] bg-transparent border border-[#202020] group-hover:border-[#333333] px-2 py-0.5 rounded transition-colors"
                  >
                    [{tech}]
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Project Deep Dive Modal rendered via Portal to escape any transformed parent containers */}
      {selectedProject &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="bg-[#0C0C0C] border border-[#262626] rounded-2xl w-full max-w-2xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden relative text-white animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sticky Top Header (Never scrolls away) */}
              <div className="px-6 py-5 border-b border-[#1E1E1E] flex items-start justify-between gap-4 bg-[#0F0F0F] shrink-0">
                <div className="min-w-0 flex-1">
                  <div
                    className="font-mono text-[11px] mb-1 font-bold tracking-wider uppercase"
                    style={{ color: 'var(--accent)' }}
                  >
                    {selectedProject.number} · {selectedProject.category}
                  </div>
                  <h2 className="text-[20px] sm:text-[22px] font-bold text-white leading-tight">
                    {selectedProject.name}
                  </h2>
                  {selectedProject.subtitle && (
                    <p className="text-[13px] text-[#A0A0A0] font-normal mt-1 leading-snug">
                      {selectedProject.subtitle}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 -mr-1 -mt-1 rounded-lg text-[#888888] hover:text-white hover:bg-[#1E1E1E] transition-colors cursor-pointer shrink-0"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 text-[14.5px] leading-relaxed">
                <div>
                  <h4 className="font-mono text-[11px] font-bold text-[#888888] uppercase tracking-wider mb-2">
                    PROBLEM STATEMENT
                  </h4>
                  <p className="text-white leading-relaxed">{selectedProject.problem}</p>
                </div>

                <div>
                  <h4 className="font-mono text-[11px] font-bold text-[#888888] uppercase tracking-wider mb-2">
                    SYSTEM ARCHITECTURE
                  </h4>
                  <p className="text-white leading-relaxed">{selectedProject.architecture}</p>
                </div>

                {/* Picture Graphs & Visual Architecture Diagrams */}
                {selectedProject.id === 'rexplain' && (
                  <div className="bg-[#080808] border border-[#202020] rounded-xl p-4 font-mono text-[11px]">
                    <div className="text-[10px] uppercase tracking-wider mb-2.5 font-bold flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
                      <span>Pipeline Architecture</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-center">
                      <span className="px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-white font-medium">GitHub URL</span>
                      <span className="text-[#666666]">→</span>
                      <span className="px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-white font-medium">Tree API (Selective)</span>
                      <span className="text-[#666666]">→</span>
                      <span className="px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-white font-medium">AST & Graphviz</span>
                      <span className="text-[#666666]">→</span>
                      <span className="px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-white font-medium">MiniLM Embedding</span>
                      <span className="text-[#666666]">→</span>
                      <span className="px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-white font-medium">Groq RAG Chat</span>
                    </div>
                  </div>
                )}

                {selectedProject.id === 'nexora' && 'image' in selectedProject && selectedProject.image && (
                  <div className="rounded-xl border border-[#222222] bg-black p-3 overflow-hidden">
                    <div className="flex items-center justify-center bg-[#070707] rounded-lg p-2 overflow-hidden">
                      <img
                        src={selectedProject.image}
                        alt={`${selectedProject.name} Architecture`}
                        className="w-full h-auto max-h-[260px] object-contain filter contrast-110"
                      />
                    </div>
                    <p className="font-mono text-[10.5px] text-[#AAAAAA] text-center mt-2">
                      Fig 1. Deterministic Policy Engine validation floor & Razorpay settlement architecture
                    </p>
                  </div>
                )}

                {selectedProject.id === 'visionsat' && (
                  <div className="bg-[#080808] border border-[#202020] rounded-xl p-4 font-mono text-[11px]">
                    <div className="text-[10px] uppercase tracking-wider mb-2.5 font-bold flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
                      <span>Grad-CAM Spatial Interpretability Pipeline</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-center">
                      <span className="px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-white font-medium">EuroSAT Satellite Image</span>
                      <span className="text-[#666666]">→</span>
                      <span className="px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-white font-medium">ResNet-18 Conv5</span>
                      <span className="text-[#666666]">→</span>
                      <span className="px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-white font-medium">Gradient Pooling (ReLU)</span>
                      <span className="text-[#666666]">→</span>
                      <span className="px-2.5 py-1.5 bg-[#121212] border border-[#262626] rounded text-white font-medium">Spatial Heatmap</span>
                    </div>
                  </div>
                )}

                {selectedProject.id === 'klustor' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {'image' in selectedProject && selectedProject.image && (
                      <div className="rounded-xl border border-[#222222] bg-black p-3 overflow-hidden flex flex-col justify-between">
                        <div className="flex items-center justify-center bg-[#070707] rounded-lg p-2">
                          <img
                            src={selectedProject.image}
                            alt="Design Score Analysis"
                            className="w-full h-auto max-h-[180px] object-contain"
                          />
                        </div>
                        <p className="font-mono text-[10.5px] text-[#AAAAAA] text-center mt-2">
                          Fig 1. Algorithmic Design Scoring canvas analyzer
                        </p>
                      </div>
                    )}
                    {'image2' in selectedProject && selectedProject.image2 && (
                      <div className="rounded-xl border border-[#222222] bg-black p-3 overflow-hidden flex flex-col justify-between">
                        <div className="flex items-center justify-center bg-[#070707] rounded-lg p-2">
                          <img
                            src={selectedProject.image2}
                            alt="Multiplayer Lobby Sync"
                            className="w-full h-auto max-h-[180px] object-contain"
                          />
                        </div>
                        <p className="font-mono text-[10.5px] text-[#AAAAAA] text-center mt-2">
                          Fig 2. Socket.IO live multiplayer lobby sync
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <h4 className="font-mono text-[11px] font-bold text-[#888888] uppercase tracking-wider mb-2.5">
                    ENGINEERING HIGHLIGHTS
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-white leading-relaxed">
                        <span
                          className="font-mono text-[12px] mt-0.5 shrink-0 font-bold"
                          style={{ color: 'var(--accent)' }}
                        >
                          -&gt;
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-[11px] font-bold text-[#888888] uppercase tracking-wider mb-2">
                    KEY CHALLENGE & SOLUTION
                  </h4>
                  <p className="text-white leading-relaxed">{selectedProject.challenges}</p>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-mono text-[11px] font-bold text-[#888888] uppercase tracking-wider mb-2.5">
                    TECHNOLOGIES
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technologies.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] text-[#E0E0E0] bg-[#141414] border border-[#242424] px-2.5 py-1 rounded"
                      >
                        [{t}]
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sticky Bottom Actions Footer */}
              <div className="px-6 py-4 border-t border-[#1E1E1E] flex flex-wrap items-center justify-between gap-3 bg-[#0F0F0F] shrink-0">
                <div className="flex items-center gap-3">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cyber-pop inline-flex items-center gap-2 px-3.5 py-2 bg-[#161616] border border-[#2A2A2A] rounded-lg font-mono text-[12px] font-medium text-white cursor-pointer"
                    >
                      <GithubIcon size={14} />
                      <span>View Repository</span>
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-cyber-pop inline-flex items-center gap-2 px-3.5 py-2 bg-[#161616] border border-[#2A2A2A] rounded-lg font-mono text-[12px] font-medium text-white cursor-pointer"
                    >
                      <ExternalLink size={14} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="font-mono text-[12px] text-[#888888] hover:text-white px-2 py-1 transition-colors cursor-pointer"
                >
                  [close esc]
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
