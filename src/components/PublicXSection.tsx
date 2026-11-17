import { ArrowUpRight } from 'lucide-react';
import { XIcon } from './Icons';
import { personal, xPosts } from '../data/portfolio';

export default function PublicXSection() {
  return (
    <section id="public" className="py-10 border-b border-[#181818] animate-fade-in">
      {/* Header with Accent Color */}
      <div className="flex items-center justify-between mb-5 font-mono text-[12px]">
        <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--accent)' }}>
          <span>/</span>
          <span className="uppercase tracking-wider">public</span>
          <span className="text-[#888888] font-normal text-[11px]">· {personal.xHandle}</span>
        </div>
        <a
          href={personal.x}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#AAAAAA] hover:text-white flex items-center gap-1.5 transition-colors font-medium"
        >
          <span>x.com/{personal.xHandle.replace('@', '')}</span>
          <ArrowUpRight size={13} />
        </a>
      </div>

      {/* Author Profile Banner Card with Authentic Profile Picture from X */}
      <div className="bg-[#090909] border border-[#1A1A1A] rounded-xl p-4 sm:p-5 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#2A2A2A] bg-black">
            <img
              src={personal.avatar}
              alt={personal.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] font-bold text-white leading-tight">
                {personal.name}
              </h3>
              <span className="text-[12px] font-mono text-[#888888]">
                {personal.xHandle}
              </span>
            </div>
            <p className="text-[13px] text-white font-normal mt-0.5 leading-snug">
              {personal.xBio || "very avg comp science student… also likes grapes. Ex-ASE @accenture"}
            </p>
          </div>
        </div>

        <a
          href={personal.x}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-black hover:bg-[#E5E5E5] rounded-full font-mono text-[12px] font-bold transition-all shrink-0 cursor-pointer shadow-xs"
        >
          <XIcon size={12} />
          <span>Follow {personal.xHandle}</span>
        </a>
      </div>

      {/* Curated Feed of Most Recent 3 Posts (No Metrics) */}
      <div className="space-y-4">
        {xPosts.slice(0, 3).map((post) => (
          <article
            key={post.id}
            className="bg-[#080808] border border-[#1A1A1A] hover:border-[#282828] rounded-xl p-4 sm:p-5 transition-all duration-200"
          >
            {/* Post Header */}
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-[#222222] bg-black">
                  <img
                    src={post.avatar || personal.avatar}
                    alt={post.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-bold text-white">
                      {post.author}
                    </span>
                    <span className="text-[12px] font-mono text-[#777777]">
                      {post.handle}
                    </span>
                    <span className="text-[#444444] text-[11px]">·</span>
                    <span className="text-[12px] font-mono text-[#888888]">
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>

              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-white transition-colors p-1"
                aria-label="View on X"
              >
                <XIcon size={14} />
              </a>
            </div>

            {/* Post Text */}
            <div className="text-[15px] text-white leading-relaxed whitespace-pre-line font-normal pl-0 sm:pl-10">
              {post.text}
            </div>

            {/* Footer with Single Clean "View on X" Link (Zero Metrics / No counts) */}
            <div className="flex items-center justify-end pt-3 mt-3 border-t border-[#141414] pl-0 sm:pl-10">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#AAAAAA] hover:text-white flex items-center gap-1 text-[11.5px] font-mono transition-colors"
              >
                <span>View on X</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
