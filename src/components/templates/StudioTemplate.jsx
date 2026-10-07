import React from "react";
import { ArrowUpRight, EnvelopeSimple, Phone, MapPin, Globe, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

export function StudioTemplate({ data }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, customization } = data;
  const accent = customization?.accentColor || "#2563eb";
  const density = customization?.spacingDensity || "balanced";

  const spacingClasses = {
    compact: { sectionGap: "mb-3.5", itemGap: "space-y-2.5", textBase: "text-xs" },
    balanced: { sectionGap: "mb-5", itemGap: "space-y-3.5", textBase: "text-[13px]" },
    generous: { sectionGap: "mb-6", itemGap: "space-y-4", textBase: "text-sm" }
  }[density];

  return (
    <div className={`p-8 text-zinc-900 bg-white min-h-full leading-relaxed ${spacingClasses.textBase}`}>
      {/* Top Banner */}
      <header className="border-b-2 pb-4 mb-5" style={{ borderColor: accent }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
          <div className="flex items-center gap-4">
            {personalInfo.photoUrl && (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName || "Profile"}
                className="w-16 h-16 rounded-2xl object-cover border-2 shadow-2xs shrink-0"
                style={{ borderColor: accent }}
              />
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 font-sans">
                {personalInfo.fullName || ""}
              </h1>
              {personalInfo.jobTitle && (
                <p className="text-sm font-semibold tracking-wide uppercase mt-1" style={{ color: accent }}>
                  {personalInfo.jobTitle}
                </p>
              )}
            </div>
          </div>
          <div className="text-xs text-zinc-600 flex flex-wrap gap-x-3 gap-y-1 md:text-right">
            {personalInfo.email && (
              <span className="font-mono inline-flex items-center gap-1">
                <EnvelopeSimple size={12} /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="inline-flex items-center gap-1">
                <Phone size={12} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin size={12} /> {personalInfo.location}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column (4 cols) */}
        <aside className="md:col-span-4 space-y-5 border-r border-zinc-200/80 pr-5">
          {/* Links */}
          <div className="space-y-1.5 text-xs">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 mb-2 border-b border-zinc-200 pb-1">
              Links
            </h2>
            {personalInfo.website && (
              <div className="flex items-center gap-1.5 text-zinc-700">
                <Globe size={13} className="text-zinc-400" />
                <span className="truncate">{personalInfo.website.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-1.5 text-zinc-700 font-mono">
                <GithubLogo size={13} className="text-zinc-400" />
                <span className="truncate">{personalInfo.github.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-1.5 text-zinc-700">
                <LinkedinLogo size={13} className="text-zinc-400" />
                <span className="truncate">{personalInfo.linkedin.replace(/^https?:\/\//, "")}</span>
              </div>
            )}
          </div>

          {/* Education */}
          {education && education.length > 0 && (
            <div className="space-y-2">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1">
                Education
              </h2>
              {education.map(edu => (
                <div key={edu.id} className="text-xs print-break-avoid">
                  <div className="font-bold text-zinc-950">{edu.institution}</div>
                  <div className="text-zinc-700">{edu.degree} in {edu.fieldOfStudy}</div>
                  <div className="text-[11px] font-mono text-zinc-500 mt-0.5">
                    {edu.startDate} - {edu.endDate} {edu.honors && `· ${edu.honors}`}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1">
                Skills
              </h2>
              {skills.map(skill => (
                <div key={skill.id} className="print-break-avoid">
                  <div className="text-[11px] font-semibold text-zinc-900 mb-1">
                    {skill.categoryName}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {skill.items.map((item, idx) => (
                      <span key={idx} className="text-[11px] px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div className="space-y-1.5">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1">
                Certifications
              </h2>
              {certifications.map(cert => (
                <div key={cert.id} className="text-xs print-break-avoid">
                  <div className="font-semibold text-zinc-900">{cert.name}</div>
                  <div className="text-[11px] text-zinc-500 font-mono">{cert.issuer} ({cert.issueDate})</div>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Right Column (8 cols) */}
        <main className="md:col-span-8 space-y-5">
          {/* Summary */}
          {summary && (
            <section className="print-break-avoid">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
                Objective
              </h2>
              <p className="text-zinc-700 leading-normal text-justify">
                {summary}
              </p>
            </section>
          )}

          {/* Key Projects - Displayed first on right column for students */}
          {projects && projects.length > 0 && (
            <section className={spacingClasses.sectionGap}>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-2.5">
                Key Projects
              </h2>
              <div className={spacingClasses.itemGap}>
                {projects.map(proj => (
                  <div key={proj.id} className="print-break-avoid">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-zinc-950">
                        {proj.name} {proj.role && <span className="text-xs text-zinc-500 font-normal">({proj.role})</span>}
                      </span>
                      {proj.liveUrl && (
                        <span className="text-xs font-mono inline-flex items-center gap-0.5" style={{ color: accent }}>
                          {proj.liveUrl.replace(/^https?:\/\//, "")} <ArrowUpRight size={10} />
                        </span>
                      )}
                    </div>
                    {proj.bullets && proj.bullets.filter(b => typeof b === "string" && b.trim().length > 0).length > 0 && (
                      <ul className="mt-1 space-y-1 list-disc list-outside ml-4 text-zinc-700">
                        {proj.bullets.filter(b => typeof b === "string" && b.trim().length > 0).map((b, idx) => (
                          <li key={idx} className="leading-snug">{b}</li>
                        ))}
                      </ul>
                    )}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1 text-[11px] font-mono text-zinc-500">
                        {proj.technologies.join(" · ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience / Internships */}
          {experience && experience.length > 0 && (
            <section className={spacingClasses.sectionGap}>
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-200 pb-1 mb-3">
                Experience & Internships
              </h2>
              <div className={spacingClasses.itemGap}>
                {experience.map(exp => (
                  <div key={exp.id} className="print-break-avoid">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-zinc-950">{exp.role}</span>
                      <span className="text-xs font-mono text-zinc-500">
                        {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <div className="text-xs font-semibold" style={{ color: accent }}>
                      {exp.company} {exp.location && <span className="text-zinc-400 font-normal">· {exp.location}</span>}
                    </div>

                    {exp.bullets && exp.bullets.filter(b => typeof b === "string" && b.trim().length > 0).length > 0 && (
                      <ul className="mt-1.5 space-y-1 list-disc list-outside ml-4 text-zinc-700">
                        {exp.bullets.filter(b => typeof b === "string" && b.trim().length > 0).map((b, idx) => (
                          <li key={idx} className="leading-snug">{b}</li>
                        ))}
                      </ul>
                    )}

                    {exp.techStack && exp.techStack.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1 text-[11px] font-mono text-zinc-500">
                        {exp.techStack.join(" · ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
