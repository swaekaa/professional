import { certifications, journey, skills, education } from '../data/portfolio';

export default function CommunityAndJourney() {
  return (
    <>
      {/* Technical Toolkit Section */}
      <section id="skills" className="py-10 border-b border-[#181818] animate-fade-in">
        <div className="flex items-center justify-between mb-5 font-mono text-[12px]">
          <div className="text-white flex items-center gap-1.5 font-bold">
            <span style={{ color: 'var(--accent)' }}>/</span>
            <span className="uppercase tracking-wider">toolkit</span>
          </div>
          <span className="text-[#888888] font-mono text-[11px]">core competencies</span>
        </div>

        <div className="space-y-4">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-mono text-[10.5px] font-bold text-[#AAAAAA] tracking-widest uppercase mb-2">
                {category}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[10.5px] text-white bg-transparent border border-[#222222] hover:border-[#383838] px-2.5 py-1 rounded transition-colors cursor-default"
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#222222')}
                  >
                    [{skill}]
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-10 border-b border-[#181818] animate-fade-in">
        <div className="flex items-center justify-between mb-5 font-mono text-[12px]">
          <div className="text-white flex items-center gap-1.5 font-bold">
            <span style={{ color: 'var(--accent)' }}>/</span>
            <span className="uppercase tracking-wider">certifications</span>
          </div>
          <span className="text-[#888888] font-mono text-[11px]">academic & technical</span>
        </div>

        <div className="space-y-3">
          {certifications.map((item, i) => (
            <div
              key={i}
              className="py-2.5 border-b border-[#181818] last:border-0 flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <span className="font-mono text-[11.5px] text-[#888888] shrink-0 mt-0.5">
                  {item.year}
                </span>
                <div>
                  <h4 className="text-[15px] font-bold text-white">{item.title}</h4>
                  <p className="text-[13px] text-white mt-0.5 font-normal">{item.issuer}</p>
                </div>
              </div>
              <span className="font-mono text-[10.5px] text-white bg-transparent border border-[#252525] px-2 py-0.5 rounded shrink-0">
                {item.credential}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Education Block with Comprehensive Academic History */}
      <section id="education" className="py-10 border-b border-[#181818] animate-fade-in">
        <div className="flex items-center justify-between mb-5 font-mono text-[12px]">
          <div className="text-white flex items-center gap-1.5 font-bold">
            <span style={{ color: 'var(--accent)' }}>/</span>
            <span className="uppercase tracking-wider">education</span>
          </div>
          <span className="text-[#888888] font-mono text-[11px]">academic trail</span>
        </div>

        <div className="space-y-4">
          {/* Undergraduate Degree */}
          <div className="p-4 bg-[#090909] border border-[#1A1A1A] rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <h3 className="text-[16px] font-bold text-white">
                  {education.institution}
                </h3>
                <p className="text-[14px] text-white font-medium mt-0.5">{education.degree}</p>
                <p className="font-mono text-[11.5px] text-[#888888] mt-1">
                  {education.location} · {education.period}
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="font-mono text-[10px] text-[#888888] block uppercase tracking-wider">Cumulative GPA</span>
                <span
                  className="font-mono text-[16px] font-bold"
                  style={{ color: 'var(--accent)' }}
                >
                  {education.cgpa}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[#141414] space-y-1">
              {education.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[13px] text-white leading-relaxed">
                  <span className="font-mono text-[11px] mt-0.5 shrink-0" style={{ color: 'var(--accent)' }}>&gt;</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section id="journey" className="py-10 border-b border-[#181818] animate-fade-in">
        <div className="flex items-center justify-between mb-5 font-mono text-[12px]">
          <div className="text-white flex items-center gap-1.5 font-bold">
            <span style={{ color: 'var(--accent)' }}>/</span>
            <span className="uppercase tracking-wider">journey</span>
          </div>
          <span className="text-[#888888] font-mono text-[11px]">2022 — present</span>
        </div>

        <div className="relative pl-6 border-l border-[#222222] space-y-6">
          {journey.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker */}
              <div
                className="absolute -left-[30px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#050505] border-2 transition-colors"
                style={{ borderColor: 'var(--accent)' }}
              />

              <div>
                <span
                  className="font-mono text-[11.5px] font-bold"
                  style={{ color: 'var(--accent)' }}
                >
                  {item.year}
                </span>
                <h4 className="text-[15px] font-bold text-white mt-0.5">
                  {item.event}
                </h4>
                <p className="text-[14px] text-white mt-1 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
