import { Mail, FileText, ArrowUpRight, MapPin, Calendar } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon, XIcon } from './Icons';
import { personal } from '../data/portfolio';

export default function HeroSection() {
  return (
    <section id="about" className="pt-2 pb-12 border-b border-[#181818] animate-fade-in scroll-mt-16">
      {/* Identity Header */}
      <div className="space-y-4">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border border-[#2A2A2A] bg-black shadow-md mt-0.5 sm:mt-0">
            <img
              src={personal.avatar}
              alt={personal.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1 min-w-0">
            <h1 className="text-[25px] sm:text-[27px] font-bold text-white tracking-tight leading-tight">
              {personal.name}
            </h1>
            <p
              className="font-mono text-[12px] sm:text-[12.5px] font-bold tracking-wide transition-colors leading-snug"
              style={{ color: 'var(--accent)' }}
            >
              {personal.bioHeadline}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-[#A0A0A0] pt-0.5">
              <span className="flex items-center gap-1">
                <MapPin size={11} style={{ color: 'var(--accent)' }} />
                <span>{personal.location}</span>
              </span>
              <span className="text-[#444444] hidden sm:inline">·</span>
              <span className="flex items-center gap-1 text-[#CCCCCC]">
                <Calendar size={11} style={{ color: 'var(--accent)' }} />
                <span>Internships & Full-Time · Jan 2027</span>
              </span>
            </div>
          </div>
        </div>

        {/* Lead Narrative */}
        <div className="text-[15px] sm:text-[15.5px] text-white leading-[1.8] space-y-3.5 font-normal pt-1">
          <p>
            Final-year Computer Science undergraduate at <strong className="text-white font-bold">Manipal University Jaipur</strong>, specializing in multi-agent orchestration, deterministic retrieval architectures, and scalable backend engineering.
          </p>

          <p>
            At <strong className="text-white font-bold">Accenture</strong>, I worked as an Associate Software Engineering Intern architecting an enterprise multi-agent RAG platform, coordinating autonomous tool-using agents via LangGraph state machines and engineering hybrid BM25 and dense retrieval with cross-encoder reranking.
          </p>

          <p className="text-[#D4D4D4]">
            Actively seeking Software Engineering internships and full-time roles starting <strong className="text-white font-bold">January 2027</strong> in Jaipur, Bangalore, or remote.
          </p>
        </div>

        {/* Primary Action Buttons (Resume & Email first) */}
        <div className="pt-2 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber-pop btn-cyber-pop-white inline-flex items-center gap-2 px-4 py-2 font-mono text-[12.5px] font-bold rounded-md cursor-pointer shadow-sm group"
            >
              <FileText size={14} className="text-current transition-colors" />
              <span>Resume</span>
              <ArrowUpRight size={13} className="arrow-pop transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-current" />
            </a>

            <a
              href={`mailto:${personal.email}`}
              className="btn-cyber-pop inline-flex items-center gap-2 px-4 py-2 bg-[#121212] border border-[#333333] hover:border-white text-white font-mono text-[12.5px] font-bold rounded-md transition-colors cursor-pointer group"
            >
              <Mail size={14} style={{ color: 'var(--accent)' }} />
              <span>Email</span>
            </a>
          </div>

          {/* Secondary Row: Clearly Labeled Social Profiles & Handles */}
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11.5px]">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber-pop inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#090909] border border-[#222222] rounded-md text-[#CCCCCC] hover:text-white hover:border-[#383838] transition-colors cursor-pointer"
            >
              <GithubIcon size={12} className="text-[#888888]" />
              <span>GitHub</span>
              <span className="text-[#666666]">@{personal.githubUsername}</span>
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber-pop inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#090909] border border-[#222222] rounded-md text-[#CCCCCC] hover:text-white hover:border-[#383838] transition-colors cursor-pointer"
            >
              <LinkedinIcon size={12} className="text-[#888888]" />
              <span>LinkedIn</span>
            </a>

            <a
              href={personal.x}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber-pop inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#090909] border border-[#222222] rounded-md text-[#CCCCCC] hover:text-white hover:border-[#383838] transition-colors cursor-pointer"
            >
              <XIcon size={11} className="text-[#888888]" />
              <span>X</span>
              <span className="text-[#666666]">{personal.xHandle}</span>
            </a>

            <a
              href={personal.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber-pop inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#090909] border border-[#222222] rounded-md text-[#CCCCCC] hover:text-white hover:border-[#383838] transition-colors cursor-pointer"
            >
              <LeetcodeIcon size={12} className="text-[#888888]" />
              <span>LeetCode</span>
              <span className="text-[#666666]">@{personal.leetcodeUsername}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
