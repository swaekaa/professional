import { Mail, FileText, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';
import { personal } from '../data/portfolio';

export default function HeroSection() {
  return (
    <section id="about" className="pt-2 pb-12 border-b border-[#141414] animate-fade-in">
      {/* Identity Header - Clean, purely typography-led (top image removed) */}
      <div className="space-y-4">
        <div>
          <h1 className="text-[21px] sm:text-[23px] font-semibold text-[#E7E7E7] tracking-tight">
            {personal.name}{' '}
            <span className="text-[#555555] font-normal text-[15px] sm:text-[16px]">
              ({personal.handle})
            </span>
          </h1>
          <p
            className="font-mono text-[11.5px] tracking-wide uppercase mt-1 transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            {personal.bioHeadline}
          </p>
        </div>

        {/* Personal technical narrative with inline links */}
        <div className="text-[13.5px] text-[#858585] leading-[1.8] space-y-3 font-normal">
          <p>
            I'm a Computer Science undergraduate at{' '}
            <span className="text-[#D0D0D0] font-medium">Manipal University Jaipur</span>,
            focused on backend engineering, applied AI, and scalable distributed architectures.
          </p>

          <p>
            Currently working as an{' '}
            <span className="text-[#D0D0D0] font-medium">Associate Software Engineer Intern</span> at{' '}
            <span className="text-[#D0D0D0] font-medium">Accenture</span>, where I lead a team
            architecting a multi-agent RAG platform across 10,000+ documents with hybrid BM25 + dense
            retrieval, QuadRank, and cross-encoder reranking.
          </p>

          <p>
            Outside enterprise systems, I explore{' '}
            <a
              href="#projects"
              className="text-[#D0D0D0] underline decoration-[#2c2c2c] transition-colors"
              style={{ textDecorationColor: 'var(--accent-dim)' }}
            >
              deep reinforcement learning
            </a>{' '}
            for autonomous racing lines,{' '}
            <a
              href="#research"
              className="text-[#D0D0D0] underline decoration-[#2c2c2c] transition-colors"
              style={{ textDecorationColor: 'var(--accent-dim)' }}
            >
              multimodal sensor transformers
            </a>{' '}
            under measurement noise, and layer sensitivity in quantized transformer inference.
          </p>
        </div>

        {/* Outlined Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-transparent hover:bg-[#0c0c0c] border border-[#202020] rounded text-[11.5px] font-mono text-[#D0D0D0] transition-all group"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#202020')}
          >
            <Mail size={11} className="text-[#777777] group-hover:text-white transition-colors" />
            <span>Email</span>
          </a>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-transparent hover:bg-[#0c0c0c] border border-[#202020] rounded text-[11.5px] font-mono text-[#D0D0D0] transition-all group"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#202020')}
          >
            <GithubIcon size={11} className="text-[#777777] group-hover:text-white transition-colors" />
            <span>GitHub</span>
          </a>

          <a
            href={personal.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-transparent hover:bg-[#0c0c0c] border border-[#202020] rounded text-[11.5px] font-mono text-[#D0D0D0] transition-all group"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#202020')}
          >
            <LeetcodeIcon size={11} className="text-[#777777] group-hover:text-white transition-colors" />
            <span>LeetCode</span>
          </a>

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-transparent hover:bg-[#0c0c0c] border border-[#202020] rounded text-[11.5px] font-mono text-[#D0D0D0] transition-all group"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#202020')}
          >
            <LinkedinIcon size={11} className="text-[#777777] group-hover:text-white transition-colors" />
            <span>LinkedIn</span>
          </a>

          <a
            href={personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-transparent hover:bg-[#0c0c0c] border border-[#202020] rounded text-[11.5px] font-mono text-[#D0D0D0] transition-all group"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#202020')}
          >
            <FileText size={11} className="text-[#777777] group-hover:text-white transition-colors" />
            <span>Resume</span>
            <ArrowUpRight size={10} className="text-[#555555] group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}
