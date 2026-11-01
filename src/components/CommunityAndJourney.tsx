import { community, certifications, journey, skills, education } from '../data/portfolio';

export default function CommunityAndJourney() {
  return (
    <>
      {/* Technical Toolkit Section */}
      <section id="skills" className="py-10 border-b border-[#141414] animate-fade-in">
        <div className="flex items-center justify-between mb-5 font-mono text-[11px]">
          <div className="text-[#777777] flex items-center gap-1.5">
            <span style={{ color: 'var(--accent)' }}>/</span>
            <span>toolkit</span>
          </div>
          <span className="text-[#444444] font-mono text-[10.5px]">core competencies</span>
        </div>

        <div className="space-y-4">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-mono text-[9.5px] text-[#555555] tracking-widest uppercase mb-1.5">
                {category}
              </h4>
              <div className="flex flex-wrap gap-1">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[9.5px] text-[#777777] bg-transparent border border-[#1a1a1a] hover:text-[#D0D0D0] px-2 py-0.5 rounded transition-colors cursor-default"
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1a1a1a')}
                  >
                    [{skill}]
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-10 border-b border-[#141414] animate-fade-in">
        <div className="flex items-center justify-between mb-5 font-mono text-[11px]">
          <div className="text-[#777777] flex items-center gap-1.5">
            <span style={{ color: 'var(--accent)' }}>/</span>
            <span>community</span>
          </div>
          <span className="text-[#444444] font-mono text-[10.5px]">involvement</span>
        </div>

        <div className="space-y-3">
          {community.map((c, i) => (
            <div
              key={i}
              className="py-2.5 border-b border-[#141414] last:border-0 flex items-start gap-4"
            >
              <span className="font-mono text-[10.5px] text-[#444444] shrink-0 mt-0.5">
                {c.year}
              </span>
              <div>
                <h4 className="text-[13px] font-semibold text-[#D0D0D0]">{c.title}</h4>
                <p
                  className="text-[11px] font-mono mt-0.5"
                  style={{ color: 'var(--accent)' }}
                >
                  {c.role}
                </p>
                <p className="text-[12px] text-[#777777] mt-1 leading-relaxed">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-10 border-b border-[#141414] animate-fade-in">
        <div className="flex items-center justify-between mb-5 font-mono text-[11px]">
          <div className="text-[#777777] flex items-center gap-1.5">
            <span style={{ color: 'var(--accent)' }}>/</span>
            <span>certifications</span>
          </div>
          <span className="text-[#444444] font-mono text-[10.5px]">academic & technical</span>
        </div>

        <div className="space-y-2.5">
          {certifications.map((item, i) => (
            <div
              key={i}
              className="py-2 border-b border-[#141414] last:border-0 flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-[10.5px] text-[#444444] shrink-0 mt-0.5">
                  {item.year}
                </span>
                <div>
                  <h4 className="text-[13px] font-semibold text-[#D0D0D0]">{item.title}</h4>
                  <p className="text-[11.5px] text-[#777777] mt-0.5">{item.issuer}</p>
                </div>
              </div>
              <span className="font-mono text-[9.5px] text-[#888888] bg-transparent border border-[#1a1a1a] px-1.5 py-0.5 rounded shrink-0">
                {item.credential}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Education Block */}
      <section id="education" className="py-10 border-b border-[#141414] animate-fade-in">
        <div className="flex items-center justify-between mb-5 font-mono text-[11px]">
          <div className="text-[#777777] flex items-center gap-1.5">
            <span style={{ color: 'var(--accent)' }}>/</span>
            <span>education</span>
          </div>
          <span className="text-[#444444] font-mono text-[10.5px]">manipal university</span>
        </div>

        <div className="py-2">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <h3 className="text-[14.5px] font-semibold text-[#D0D0D0]">
                {education.institution}
              </h3>
              <p className="text-[12.5px] text-[#777777] mt-0.5">{education.degree}</p>
              <p className="font-mono text-[10.5px] text-[#555555] mt-1">{education.period}</p>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="font-mono text-[8.5px] text-[#555555] block uppercase">Cumulative GPA</span>
              <span
                className="font-mono text-[14px] font-bold"
                style={{ color: 'var(--accent)' }}
              >
                {education.cgpa}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section id="journey" className="py-10 border-b border-[#141414] animate-fade-in">
        <div className="flex items-center justify-between mb-5 font-mono text-[11px]">
          <div className="text-[#777777] flex items-center gap-1.5">
            <span style={{ color: 'var(--accent)' }}>/</span>
            <span>journey</span>
          </div>
          <span className="text-[#444444] font-mono text-[10.5px]">2023 — present</span>
        </div>

        <div className="relative pl-5 border-l border-[#1a1a1a] space-y-5">
          {journey.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker */}
              <div
                className="absolute -left-[25px] top-1 w-2 h-2 rounded-full bg-[#050505] border border-[#333333] transition-colors"
                style={{ borderColor: 'var(--accent-dim)' }}
              />

              <div>
                <span
                  className="font-mono text-[10.5px] font-semibold"
                  style={{ color: 'var(--accent)' }}
                >
                  {item.year}
                </span>
                <h4 className="text-[13px] font-semibold text-[#D0D0D0] mt-0.5">
                  {item.event}
                </h4>
                <p className="text-[12px] text-[#777777] mt-1 leading-relaxed">
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
