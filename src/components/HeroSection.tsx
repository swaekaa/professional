import { Mail, FileText, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon, XIcon } from './Icons';
import { personal } from '../data/portfolio';

export default function HeroSection() {
  return (
    <section id="about" className="pt-2 pb-12 border-b border-[#181818] animate-fade-in">
      {/* Identity Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-[#2A2A2A] bg-black shadow-md">
            <img
              src={personal.avatar}
              alt={personal.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-[25px] sm:text-[27px] font-bold text-white tracking-tight">
              {personal.name}{' '}
              <span className="text-[#888888] font-normal text-[17px] sm:text-[18px]">
                ({personal.xHandle})
              </span>
            </h1>
            <p
              className="font-mono text-[12px] font-bold tracking-wide uppercase mt-1 transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              {personal.bioHeadline}
            </p>
          </div>
        </div>

        {/* Personal technical narrative with high contrast white text and bold highlights */}
        <div className="text-[15.5px] text-white leading-[1.8] space-y-3.5 font-normal">
          <p>
            I'm a Computer Science undergraduate at{' '}
            <strong className="text-white font-bold">Manipal University Jaipur</strong>,
            working at the intersection of applied AI, scalable backend architecture, and intelligent agent systems.
          </p>

          <p>
            Currently working as an{' '}
            <strong className="text-white font-bold">Associate Software Engineer Intern</strong> at{' '}
            <strong className="text-white font-bold">Accenture</strong> (Bangalore), where I architect
            an enterprise multi-agent RAG platform across 10,000+ documents with hybrid BM25 + dense
            retrieval, PageIndexer structure-aware partitioning, and cross-encoder reranking.
          </p>

          <p>
            I gravitate towards problems that are{' '}
            <span className="italic underline decoration-1" style={{ textDecorationColor: 'var(--accent)' }}>
              half research, half engineering
            </span>
            : the ones where the paper stops and the production pipeline has to start. Outside work, I build explainable satellite vision systems, investigate layer-wise sensitivity in quantized transformer inference, and experiment with reinforcement learning racing lines.
          </p>
        </div>

        {/* Action & Social Outlined Buttons */}
        <div className="pt-3 flex flex-wrap items-center gap-2.5">
          <a
            href={personal.x}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0C0C0C] hover:bg-[#161616] border border-[#262626] rounded-md text-[12px] font-mono font-medium text-white transition-all group cursor-pointer"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#262626')}
          >
            <XIcon size={12} className="text-[#AAAAAA] group-hover:text-white transition-colors" />
            <span>X / Twitter</span>
          </a>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0C0C0C] hover:bg-[#161616] border border-[#262626] rounded-md text-[12px] font-mono font-medium text-white transition-all group cursor-pointer"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#262626')}
          >
            <GithubIcon size={13} className="text-[#AAAAAA] group-hover:text-white transition-colors" />
            <span>GitHub</span>
          </a>

          <a
            href={personal.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0C0C0C] hover:bg-[#161616] border border-[#262626] rounded-md text-[12px] font-mono font-medium text-white transition-all group cursor-pointer"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#262626')}
          >
            <LeetcodeIcon size={13} className="text-[#AAAAAA] group-hover:text-white transition-colors" />
            <span>LeetCode</span>
          </a>

          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0C0C0C] hover:bg-[#161616] border border-[#262626] rounded-md text-[12px] font-mono font-medium text-white transition-all group cursor-pointer"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#262626')}
          >
            <Mail size={13} className="text-[#AAAAAA] group-hover:text-white transition-colors" />
            <span>Email</span>
          </a>

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0C0C0C] hover:bg-[#161616] border border-[#262626] rounded-md text-[12px] font-mono font-medium text-white transition-all group cursor-pointer"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#262626')}
          >
            <LinkedinIcon size={13} className="text-[#AAAAAA] group-hover:text-white transition-colors" />
            <span>LinkedIn</span>
          </a>

          <a
            href={personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0C0C0C] hover:bg-[#161616] border border-[#262626] rounded-md text-[12px] font-mono font-medium text-white transition-all group cursor-pointer"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#262626')}
          >
            <FileText size={13} className="text-[#AAAAAA] group-hover:text-white transition-colors" />
            <span>Resume</span>
            <ArrowUpRight size={11} className="text-[#777777] group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}
