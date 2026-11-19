import { certifications, journey, skills, education } from '../data/portfolio';

export default function CommunityAndJourney() {
  return (
    <>
      {/* Technical Toolkit Section */}
      <section id="skills" className="py-10 border-b border-[#181818] animate-fade-in">
        <div className="flex items-center justify-between mb-5 font-mono text-[12px]">
          <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--accent)' }}>
            <span className="uppercase tracking-wider">toolkit</span>
          </div>
          <span className="text-[#888888] font-mono text-[11px]">core competencies</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(skills).map(([category, items]) => (
            <div
              key={category}
              className="p-3.5 bg-[#090909] border border-[#1A1A1A] hover:border-[#282828] rounded-xl flex flex-col justify-between transition-colors"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#CCCCCC] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                  <span>{category}</span>
                </div>
                <span className="font-mono text-[10px] text-[#666666]">
                  {items.length} {items.length === 1 ? 'skill' : 'skills'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <span
                    key={skill}
                    data-skill={skill}
                    className="font-mono text-[10.5px] text-[#DDDDDD] bg-[#111216] border border-[#20222A] hover:border-[#383E4E] px-2 py-0.5 rounded transition-colors cursor-default"
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#20222A')}
                  >
                    {skill}
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
          <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--accent)' }}>
            <span className="uppercase tracking-wider">certifications</span>
          </div>
          <span className="text-[#888888] font-mono text-[11px]">academic & technical</span>
        </div>

        <div className="space-y-3">
          {certifications.map((item, i) => (
            <div
              key={i}
              data-cert={item.title}
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
          <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--accent)' }}>
            <span className="uppercase tracking-wider">education</span>
          </div>
          <span className="text-[#888888] font-mono text-[11px]">academic trail</span>
        </div>

        <div className="space-y-3">
          {education.schools.map((item, idx) => (
            <div
              key={idx}
              data-edu={`${item.institution} (${item.degree})`}
              className="p-4 bg-[#090909] border border-[#1A1A1A] rounded-lg hover:border-[#282828] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-[16px] font-bold text-white tracking-tight">
                    {item.institution}
                  </h3>
                  <div className="font-mono text-[11px] text-[#888888] uppercase tracking-wider mt-0.5">
                    {item.type}
                  </div>
                  <p className="text-[14px] text-white font-medium mt-1.5">{item.degree}</p>
                  {item.details && (
                    <p className="font-mono text-[11.5px] text-[#999999] mt-1 leading-relaxed">{item.details}</p>
                  )}
                </div>

                <div className="text-left sm:text-right shrink-0 mt-1 sm:mt-0">
                  <span
                    className="font-mono text-[14px] font-bold block"
                    style={{ color: 'var(--accent)' }}
                  >
                    {item.score}
                  </span>
                  <span className="font-mono text-[11.5px] text-[#888888] block mt-0.5">
                    {item.period}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section id="journey" className="py-10 border-b border-[#181818] animate-fade-in">
        <div className="flex items-center justify-between mb-5 font-mono text-[12px]">
          <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--accent)' }}>
            <span className="uppercase tracking-wider">journey</span>
          </div>
          <span className="text-[#888888] font-mono text-[11px]">2022 to present</span>
        </div>

        <div className="relative pl-6 border-l border-[#222222] space-y-6">
          {journey.map((item, idx) => (
            <div key={idx} data-journey={`${item.year} · ${item.event}`} className="relative group">
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
