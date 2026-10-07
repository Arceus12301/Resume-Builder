import React from "react";
import { ArrowUpRight, EnvelopeSimple, Phone, MapPin, Globe, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

export function SwissTemplate({ data }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, customization } = data;
  const accent = customization?.accentColor || "#2563eb";
  const density = customization?.spacingDensity || "balanced";

  const spacingClasses = {
    compact: { sectionGap: "mb-3.5", itemGap: "space-y-2", py: "py-1", textSm: "text-xs", textBase: "text-xs" },
    balanced: { sectionGap: "mb-5", itemGap: "space-y-3", py: "py-2", textSm: "text-xs", textBase: "text-[13px]" },
    generous: { sectionGap: "mb-7", itemGap: "space-y-4", py: "py-2.5", textSm: "text-sm", textBase: "text-[14px]" }
  }[density];

  return (
    <div className={`p-9 text-zinc-900 bg-white min-h-full leading-relaxed ${spacingClasses.textBase}`}>
      {/* Header */}
      <header className="border-b-2 border-zinc-900 pb-4 mb-5">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <div className="flex items-center gap-4">
            {personalInfo.photoUrl && (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName || "Profile"}
                className="w-16 h-16 rounded-full object-cover border-2 border-zinc-900 shadow-2xs shrink-0"
              />
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-950 uppercase font-sans">
                {personalInfo.fullName || ""}
              </h1>
              {personalInfo.jobTitle && (
                <p className="text-sm font-semibold tracking-wide mt-1 uppercase" style={{ color: accent }}>
                  {personalInfo.jobTitle}
                </p>
              )}
            </div>
          </div>

          <div className="text-xs text-zinc-600 flex flex-wrap gap-x-3 gap-y-1 md:text-right max-w-sm">
            {personalInfo.email && (
              <span className="inline-flex items-center gap-1 font-mono">
                <EnvelopeSimple size={12} /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="inline-flex items-center gap-1 font-mono">
                <Phone size={12} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin size={12} /> {personalInfo.location}
              </span>
            )}
            {personalInfo.website && (
              <span className="inline-flex items-center gap-1">
                <Globe size={12} /> {personalInfo.website.replace(/^https?:\/\//, "")}
              </span>
            )}
            {personalInfo.github && (
              <span className="inline-flex items-center gap-1 font-mono">
                <GithubLogo size={12} /> {personalInfo.github.replace(/^https?:\/\//, "")}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="inline-flex items-center gap-1">
                <LinkedinLogo size={12} /> {personalInfo.linkedin.replace(/^https?:\/\//, "")}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Summary / Objective */}
      {summary && (
        <section className={spacingClasses.sectionGap}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
            Objective / Summary
          </h2>
          <p className="text-zinc-700 leading-normal text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Education - Prominent for students */}
      {education && education.length > 0 && (
        <section className={spacingClasses.sectionGap}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-950 border-b border-zinc-200 pb-1 mb-2.5">
            Education
          </h2>
          <div className="space-y-2.5">
            {education.map(edu => (
              <div key={edu.id} className="print-break-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-zinc-950">{edu.institution}</span>
                  <span className="text-xs font-mono text-zinc-600 whitespace-nowrap">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="text-xs text-zinc-700">
                  <span className="font-medium">{edu.degree}</span> in {edu.fieldOfStudy}
                  {edu.honors && <span className="text-zinc-600"> · {edu.honors}</span>}
                </div>
                {edu.coursework && (
                  <div className="text-[11px] text-zinc-500 mt-0.5">
                    <span className="font-medium text-zinc-600">Coursework:</span> {edu.coursework}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {skills && skills.length > 0 && (
        <section className={spacingClasses.sectionGap}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-950 border-b border-zinc-200 pb-1 mb-2.5">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {skills.map(skill => (
              <div key={skill.id} className="print-break-avoid flex items-baseline gap-2">
                <span className="font-semibold text-xs text-zinc-950 whitespace-nowrap uppercase tracking-wider">
                  {skill.categoryName}:
                </span>
                <span className="text-zinc-700 text-xs">
                  {skill.items.join(" · ")}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className={spacingClasses.sectionGap}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-950 border-b border-zinc-200 pb-1 mb-2.5">
            Academic & Personal Projects
          </h2>
          <div className={spacingClasses.itemGap}>
            {projects.map(proj => (
              <div key={proj.id} className="print-break-avoid">
                <div className="flex justify-between items-baseline">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-950">{proj.name}</span>
                    {proj.role && (
                      <span className="text-xs text-zinc-500 font-mono">({proj.role})</span>
                    )}
                  </div>
                  {proj.liveUrl && (
                    <span className="text-xs font-mono inline-flex items-center gap-0.5 hover:underline" style={{ color: accent }}>
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
                    <span className="font-medium text-zinc-400">Technologies:</span>
                    {proj.technologies.join(" · ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience & Internships */}
      {experience && experience.length > 0 && (
        <section className={spacingClasses.sectionGap}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-950 border-b border-zinc-200 pb-1 mb-2.5">
            Internships & Experience
          </h2>
          <div className={spacingClasses.itemGap}>
            {experience.map(exp => (
              <div key={exp.id} className="print-break-avoid">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-zinc-950">{exp.role}</span>
                    <span className="text-zinc-400 mx-1.5">/</span>
                    <span className="font-semibold" style={{ color: accent }}>{exp.company}</span>
                  </div>
                  <div className="text-xs font-mono text-zinc-600 whitespace-nowrap">
                    {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate} {exp.location && `· ${exp.location}`}
                  </div>
                </div>

                {exp.bullets && exp.bullets.filter(b => typeof b === "string" && b.trim().length > 0).length > 0 && (
                  <ul className="mt-1.5 space-y-1 list-disc list-outside ml-4 text-zinc-700">
                    {exp.bullets.filter(b => typeof b === "string" && b.trim().length > 0).map((b, idx) => (
                      <li key={idx} className="leading-snug">{b}</li>
                    ))}
                  </ul>
                )}

                {exp.techStack && exp.techStack.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1 text-[11px] font-mono text-zinc-500">
                    <span className="font-medium text-zinc-400">Tools:</span>
                    {exp.techStack.join(" · ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Achievements */}
      {certifications && certifications.length > 0 && (
        <section className="print-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-950 border-b border-zinc-200 pb-1 mb-2">
            Certifications & Extra-Curriculars
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs">
            {certifications.map(cert => (
              <div key={cert.id} className="flex items-center gap-1.5">
                <span className="font-semibold text-zinc-900">{cert.name}</span>
                <span className="text-zinc-500 font-mono">({cert.issuer}, {cert.issueDate})</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
