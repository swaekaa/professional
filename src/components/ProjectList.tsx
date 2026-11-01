import { useState } from 'react';
import { ExternalLink, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projects } from '../data/portfolio';

type Project = typeof projects[0];

export default function ProjectList() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-10 border-b border-[#141414] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 font-mono text-[11px]">
        <div className="text-[#777777] flex items-center gap-1.5">
          <span style={{ color: 'var(--accent)' }}>/</span>
          <span>projects</span>
        </div>
        <span className="text-[#444444] font-mono text-[10.5px]">06 selected</span>
      </div>

      {/* Editorial List of Projects */}
      <div className="space-y-4">
        {projects.map((p) => (
          <article
            key={p.id}
            className="group py-3.5 border-b border-[#141414] last:border-0 transition-colors cursor-pointer"
            onClick={() => setSelectedProject(p)}
          >
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <div className="flex items-center gap-2 font-mono text-[10px]">
                <span className="font-semibold" style={{ color: 'var(--accent)' }}>
                  {p.number}
                </span>
                <span className="text-[#333333]">·</span>
                <span className="text-[#555555] tracking-wider uppercase">{p.category}</span>
              </div>

              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-[#555555] hover:text-[#D0D0D0] transition-colors"
                    aria-label={`${p.name} on GitHub`}
                  >
                    <GithubIcon size={12} />
                  </a>
                )}
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-[#555555] hover:text-[#D0D0D0] transition-colors"
                    aria-label={`${p.name} demo`}
                  >
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

            {/* Title & Preview Image */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-semibold text-[#D0D0D0] group-hover:text-white transition-colors flex items-center gap-1.5">
                  <span>{p.name}</span>
                  <ArrowUpRight
                    size={13}
                    className="text-[#444444] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </h3>

                <p className="text-[13px] text-[#777777] leading-relaxed mt-1 line-clamp-2">
                  {p.shortDescription}
                </p>

                {/* Technical Badges */}
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {p.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[9px] tracking-wider text-[#666666] bg-transparent border border-[#1a1a1a] group-hover:border-[#282828] px-1.5 py-0.5 rounded transition-colors"
                    >
                      [{tech}]
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Image thumbnail */}
              {p.image && (
                <div className="w-20 h-14 sm:w-24 sm:h-16 rounded bg-[#0A0A0A] border border-[#1c1c1c] overflow-hidden shrink-0 mt-0.5 opacity-70 group-hover:opacity-100 transition-opacity">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Project Deep Dive Modal with smooth fade */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-[#080808] border border-[#1f1f1f] rounded-lg w-full max-w-xl max-h-[85vh] overflow-y-auto p-5 sm:p-7 shadow-2xl relative transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-[#555555] hover:text-[#D0D0D0] transition-colors p-1 cursor-pointer"
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div
              className="font-mono text-[10px] mb-1 font-medium"
              style={{ color: 'var(--accent)' }}
            >
              {selectedProject.number} · {selectedProject.category}
            </div>
            <h2 className="text-[19px] font-semibold text-[#E7E7E7] mb-3">
              {selectedProject.name}
            </h2>

            {/* Thumbnail */}
            {selectedProject.image && (
              <div className="mb-5 rounded overflow-hidden border border-[#1c1c1c] max-h-48 bg-black">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-4 text-[13px] leading-relaxed text-[#888888]">
              <div>
                <h4 className="font-mono text-[10px] text-[#555555] uppercase tracking-wider mb-1">
                  PROBLEM STATEMENT
                </h4>
                <p className="text-[#B0B0B0]">{selectedProject.problem}</p>
              </div>

              <div>
                <h4 className="font-mono text-[10px] text-[#555555] uppercase tracking-wider mb-1">
                  SYSTEM ARCHITECTURE
                </h4>
                <p className="text-[#B0B0B0]">{selectedProject.architecture}</p>
              </div>

              <div>
                <h4 className="font-mono text-[10px] text-[#555555] uppercase tracking-wider mb-1.5">
                  ENGINEERING HIGHLIGHTS
                </h4>
                <ul className="space-y-1">
                  {selectedProject.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#999999]">
                      <span
                        className="font-mono text-[10px] mt-0.5"
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
                <h4 className="font-mono text-[10px] text-[#555555] uppercase tracking-wider mb-1">
                  KEY CHALLENGE
                </h4>
                <p className="text-[#777777]">{selectedProject.challenges}</p>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-mono text-[10px] text-[#555555] uppercase tracking-wider mb-1.5">
                  TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-1">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[9px] text-[#777777] bg-transparent border border-[#1a1a1a] px-1.5 py-0.5 rounded"
                    >
                      [{t}]
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="pt-3 border-t border-[#141414] flex items-center gap-3">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-transparent hover:bg-[#111111] border border-[#202020] rounded text-[11px] font-mono text-[#D0D0D0] transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#202020')}
                  >
                    <GithubIcon size={11} />
                    <span>View Repository</span>
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-transparent hover:bg-[#111111] border border-[#202020] rounded text-[11px] font-mono text-[#D0D0D0] transition-colors"
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#202020')}
                  >
                    <ExternalLink size={11} />
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
