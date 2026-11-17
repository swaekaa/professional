import { useState } from 'react';
import { ExternalLink, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projects } from '../data/portfolio';

type Project = typeof projects[0];

export default function ProjectList() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-10 border-b border-[#181818] animate-fade-in">
      {/* Header with Accent Color */}
      <div className="flex items-center justify-between mb-6 font-mono text-[12px]">
        <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--accent)' }}>
          <span>/</span>
          <span className="uppercase tracking-wider">projects</span>
        </div>
        <span className="text-[#888888] font-mono text-[11px]">06 selected</span>
      </div>

      {/* Editorial Typographic List of Projects (Thumbnails Removed) */}
      <div className="space-y-4">
        {projects.map((p) => (
          <article
            key={p.id}
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

      {/* Project Deep Dive Modal with smooth fade (No Thumbnail) */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-[#0A0A0A] border border-[#262626] rounded-xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 text-[#888888] hover:text-white transition-colors p-1 cursor-pointer"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div
              className="font-mono text-[11px] mb-1 font-bold tracking-wider"
              style={{ color: 'var(--accent)' }}
            >
              {selectedProject.number} · {selectedProject.category}
            </div>
            <h2 className="text-[22px] font-bold text-white mb-1">
              {selectedProject.name}
            </h2>
            {selectedProject.subtitle && (
              <p className="text-[14px] text-[#A0A0A0] font-medium mb-5">
                {selectedProject.subtitle}
              </p>
            )}

            <div className="space-y-5 text-[15px] leading-relaxed text-white">
              <div>
                <h4 className="font-mono text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider mb-1.5">
                  PROBLEM STATEMENT
                </h4>
                <p className="text-white leading-relaxed">{selectedProject.problem}</p>
              </div>

              <div>
                <h4 className="font-mono text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider mb-1.5">
                  SYSTEM ARCHITECTURE
                </h4>
                <p className="text-white leading-relaxed">{selectedProject.architecture}</p>
              </div>

              <div>
                <h4 className="font-mono text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider mb-2">
                  ENGINEERING HIGHLIGHTS
                </h4>
                <ul className="space-y-1.5">
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
                <h4 className="font-mono text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider mb-1.5">
                  KEY CHALLENGE & SOLUTION
                </h4>
                <p className="text-white leading-relaxed">{selectedProject.challenges}</p>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-mono text-[11px] font-bold text-[#A0A0A0] uppercase tracking-wider mb-2">
                  TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] text-[#E0E0E0] bg-transparent border border-[#262626] px-2 py-0.5 rounded"
                    >
                      [{t}]
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="pt-4 border-t border-[#1C1C1C] flex items-center gap-3">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#121212] hover:bg-[#1A1A1A] border border-[#2A2A2A] rounded font-mono text-[12px] font-medium text-white transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2A2A2A')}
                  >
                    <GithubIcon size={13} />
                    <span>View Repository</span>
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#121212] hover:bg-[#1A1A1A] border border-[#2A2A2A] rounded font-mono text-[12px] font-medium text-white transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2A2A2A')}
                  >
                    <ExternalLink size={13} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
