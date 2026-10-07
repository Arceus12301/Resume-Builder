import React from "react";
import { ArrowUpRight, EnvelopeSimple, Phone, MapPin, Globe, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

export function LinearTemplate({ data }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, customization } = data;
  const accent = customization?.accentColor || "#2563eb";
  const density = customization?.spacingDensity || "balanced";

  const spacingClasses = {
    compact: { sectionGap: "mb-3.5", itemGap: "space-y-2.5", textSm: "text-xs", textBase: "text-xs" },
    balanced: { sectionGap: "mb-5", itemGap: "space-y-3", textSm: "text-xs", textBase: "text-[13px]" },
    generous: { sectionGap: "mb-6", itemGap: "space-y-4", textSm: "text-sm", textBase: "text-[14px]" }
  }[density];

  return (
    <div className={`p-9 text-zinc-900 bg-white min-h-full leading-relaxed ${spacingClasses.textBase}`}>
      {/* Top Banner & Identity */}
      <header className="pb-4 mb-5 border-b border-zinc-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
          <div className="flex items-center gap-4">
            {personalInfo.photoUrl && (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName || "Profile"}
                className="w-16 h-16 rounded-xl object-cover border-2 shadow-2xs shrink-0"
                style={{ borderColor: accent }}
              />
            )}
            <div>
              {personalInfo.jobTitle && (
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10.5px] font-mono font-medium tracking-wide border uppercase mb-1.5"
                     style={{ borderColor: `${accent}40`, color: accent, backgroundColor: `${accent}0d` }}>
                  <span>{personalInfo.jobTitle}</span>
                </div>
              )}
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 font-sans">
                {personalInfo.fullName || ""}
              </h1>
              {personalInfo.jobTitle && (
                <p className="text-sm font-semibold text-zinc-600 mt-0.5 font-mono">
                  {personalInfo.jobTitle}
                </p>
              )}
            </div>
          </div>

          {/* Contact matrix */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs font-mono text-zinc-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <EnvelopeSimple size={12} className="text-zinc-400" />
                <span className="truncate">{personalInfo.email}</span>
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone size={12} className="text-zinc-400" />
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-zinc-400" />
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                <Globe size={12} className="text-zinc-400" />
                <span>{personalInfo.website.replace(/^https?:\/\//, "")}</span>
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1">
                <GithubLogo size={12} className="text-zinc-400" />
                <span>{personalInfo.github.replace(/^https?:\/\//, "")}</span>
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <LinkedinLogo size={12} className="text-zinc-400" />
                <span>{personalInfo.linkedin.replace(/^https?:\/\//, "")}</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Summary / Objective */}
      {summary && (
        <section className={spacingClasses.sectionGap}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-zinc-900">
              Profile Summary
            </h2>
          </div>
          <p className="text-zinc-700 leading-normal bg-zinc-50 border border-zinc-200/80 rounded-lg p-3 text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className={spacingClasses.sectionGap}>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-zinc-900">
              Education & Academics
            </h2>
          </div>
          <div className="space-y-2">
            {education.map(edu => (
              <div key={edu.id} className="p-2.5 rounded-lg border border-zinc-200 bg-zinc-50/50 text-xs">
                <div className="flex justify-between items-baseline font-bold text-zinc-950">
                  <span>{edu.institution}</span>
                  <span className="font-mono text-zinc-500 text-[11px] font-normal">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="text-zinc-700 font-medium">
                  {edu.degree} in {edu.fieldOfStudy} {edu.honors && <span className="text-zinc-500 font-normal">· {edu.honors}</span>}
                </div>
                {edu.coursework && (
                  <div className="text-[11px] font-mono text-zinc-500 mt-1">
                    Subjects: {edu.coursework}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Matrix */}
      {skills && skills.length > 0 && (
        <section className={spacingClasses.sectionGap}>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-zinc-900">
              Technical Skills
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {skills.map(skill => (
              <div key={skill.id} className="print-break-avoid p-2.5 rounded-lg border border-zinc-200 bg-zinc-50/50">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wide mb-1" style={{ color: accent }}>
                  {skill.categoryName}
                </div>
                <div className="flex flex-wrap gap-1">
                  {skill.items.map((item, idx) => (
                    <span key={idx} className="text-xs px-1.5 py-0.5 rounded bg-white border border-zinc-200 text-zinc-800 font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className={spacingClasses.sectionGap}>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-zinc-900">
              Key Projects
            </h2>
          </div>
          <div className={spacingClasses.itemGap}>
            {projects.map(proj => (
              <div key={proj.id} className="print-break-avoid border-l-2 pl-3 py-0.5" style={{ borderColor: `${accent}40` }}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-zinc-950 flex items-center gap-1.5">
                    {proj.name}
                    {proj.role && <span className="text-xs font-normal text-zinc-500 font-mono">({proj.role})</span>}
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
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-1 rounded bg-zinc-100 text-zinc-600">
                        {t}
                      </span>
                    ))}
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
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-zinc-900">
              Internships & Activities
            </h2>
          </div>

          <div className={spacingClasses.itemGap}>
            {experience.map(exp => (
              <div key={exp.id} className="print-break-avoid border-l-2 pl-3 py-0.5" style={{ borderColor: `${accent}40` }}>
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-950">{exp.role}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-800">
                      {exp.company}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">
                    {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate} {exp.location && `[${exp.location}]`}
                  </span>
                </div>

                {exp.bullets && exp.bullets.filter(b => typeof b === "string" && b.trim().length > 0).length > 0 && (
                  <ul className="mt-1.5 space-y-1 list-disc list-outside ml-4 text-zinc-700">
                    {exp.bullets.filter(b => typeof b === "string" && b.trim().length > 0).map((b, idx) => (
                      <li key={idx} className="leading-snug">{b}</li>
                    ))}
                  </ul>
                )}

                {exp.techStack && exp.techStack.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {exp.techStack.map((tech, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 text-[10.5px] font-mono rounded bg-zinc-100 text-zinc-700 border border-zinc-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications Row */}
      {certifications && certifications.length > 0 && (
        <section className="print-break-avoid">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
            <h2 className="text-xs font-bold uppercase tracking-wider font-mono text-zinc-900">
              Certificates & Courses
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {certifications.map(cert => (
              <div key={cert.id} className="p-2 rounded border border-zinc-200 bg-zinc-50/50">
                <span className="font-semibold text-zinc-900">{cert.name}</span>
                <span className="text-zinc-500 font-mono text-[11px] block mt-0.5">{cert.issuer} ({cert.issueDate})</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
