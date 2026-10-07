import React from "react";

export function ExecutiveTemplate({ data }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, customization } = data;
  const accent = customization?.accentColor || "#1e293b";
  const density = customization?.spacingDensity || "balanced";

  const spacingClasses = {
    compact: { sectionGap: "mb-3.5", itemGap: "space-y-2", textBase: "text-xs" },
    balanced: { sectionGap: "mb-5", itemGap: "space-y-3", textBase: "text-[13px]" },
    generous: { sectionGap: "mb-6", itemGap: "space-y-4", textBase: "text-sm" }
  }[density];

  const contactItems = [
    personalInfo.location,
    personalInfo.phone,
    personalInfo.email,
    personalInfo.website ? personalInfo.website.replace(/^https?:\/\//, "") : null,
    personalInfo.linkedin ? personalInfo.linkedin.replace(/^https?:\/\//, "") : null,
    personalInfo.github ? personalInfo.github.replace(/^https?:\/\//, "") : null,
  ].filter(Boolean);

  return (
    <div className={`p-10 text-zinc-900 bg-white min-h-full leading-relaxed ${spacingClasses.textBase}`}>
      {/* Centered Classic Header */}
      <header className="text-center pb-4 mb-4 border-b border-zinc-900">
        {personalInfo.photoUrl && (
          <div className="flex justify-center mb-2.5">
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName || "Profile"}
              className="w-16 h-16 rounded-full object-cover border-2 border-zinc-800 shadow-2xs"
            />
          </div>
        )}
        <h1 className="text-2xl md:text-3xl font-bold tracking-normal uppercase text-zinc-950 font-serif">
          {personalInfo.fullName || ""}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-xs font-semibold tracking-wider uppercase text-zinc-700 mt-1" style={{ color: accent }}>
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="text-xs text-zinc-600 mt-2 flex flex-wrap justify-center gap-x-2 gap-y-1">
          {contactItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <span>{item}</span>
              {idx < contactItems.length - 1 && <span className="text-zinc-400">·</span>}
            </React.Fragment>
          ))}
        </div>
      </header>

      {/* Summary / Objective */}
      {summary && (
        <section className={spacingClasses.sectionGap}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-800 pb-0.5 mb-2 font-serif">
            Career Objective
          </h2>
          <p className="text-zinc-800 leading-normal text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Education - Top priority for college students */}
      {education && education.length > 0 && (
        <section className={spacingClasses.sectionGap}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-800 pb-0.5 mb-2 font-serif">
            Education & Academic Credentials
          </h2>
          <div className="space-y-2">
            {education.map(edu => (
              <div key={edu.id} className="print-break-avoid">
                <div className="flex justify-between items-baseline font-bold text-zinc-950">
                  <span>{edu.institution}</span>
                  <span className="text-xs font-normal text-zinc-600">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="text-xs text-zinc-800">
                  <span>{edu.degree} in {edu.fieldOfStudy}</span>
                  {edu.honors && <span className="text-zinc-600 italic"> · {edu.honors}</span>}
                </div>
                {edu.coursework && (
                  <div className="text-[11px] text-zinc-600 mt-0.5">
                    Relevant Coursework: {edu.coursework}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className={spacingClasses.sectionGap}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-800 pb-0.5 mb-2 font-serif">
            Technical Skills & Tools
          </h2>
          <div className="space-y-1.5 text-xs text-zinc-800">
            {skills.map(skill => (
              <div key={skill.id} className="print-break-avoid flex items-baseline gap-2">
                <span className="font-bold text-zinc-950 whitespace-nowrap">{skill.categoryName}:</span>
                <span>{skill.items.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className={spacingClasses.sectionGap}>
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-800 pb-0.5 mb-2 font-serif">
            Academic & Independent Projects
          </h2>
          <div className={spacingClasses.itemGap}>
            {projects.map(proj => (
              <div key={proj.id} className="print-break-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-zinc-950">
                    {proj.name} {proj.role && <span className="text-xs font-normal italic">({proj.role})</span>}
                  </span>
                  {proj.liveUrl && (
                    <span className="text-xs text-zinc-600 font-mono">
                      {proj.liveUrl.replace(/^https?:\/\//, "")}
                    </span>
                  )}
                </div>
                {proj.bullets && proj.bullets.filter(b => typeof b === "string" && b.trim().length > 0).length > 0 && (
                  <ul className="mt-1 space-y-1 list-disc list-outside ml-4 text-zinc-800">
                    {proj.bullets.filter(b => typeof b === "string" && b.trim().length > 0).map((b, idx) => (
                      <li key={idx} className="leading-snug">{b}</li>
                    ))}
                  </ul>
                )}
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="text-[11px] text-zinc-600 mt-0.5 ml-4">
                    Key Tools: {proj.technologies.join(", ")}
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-800 pb-0.5 mb-2.5 font-serif">
            Internships & Work Experience
          </h2>
          <div className={spacingClasses.itemGap}>
            {experience.map(exp => (
              <div key={exp.id} className="print-break-avoid">
                <div className="flex justify-between items-baseline font-bold text-zinc-950">
                  <span>{exp.company}</span>
                  <span className="text-xs font-normal text-zinc-700">{exp.location}</span>
                </div>
                <div className="flex justify-between items-baseline text-xs italic text-zinc-800 mt-0.5">
                  <span className="font-medium">{exp.role}</span>
                  <span className="not-italic font-normal text-zinc-600">
                    {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                  </span>
                </div>

                {exp.bullets && exp.bullets.filter(b => typeof b === "string" && b.trim().length > 0).length > 0 && (
                  <ul className="mt-1.5 space-y-1 list-disc list-outside ml-4 text-zinc-800">
                    {exp.bullets.filter(b => typeof b === "string" && b.trim().length > 0).map((b, idx) => (
                      <li key={idx} className="leading-snug">{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="print-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 border-b border-zinc-800 pb-0.5 mb-2 font-serif">
            Certifications & Extra-Curriculars
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-800">
            {certifications.map(cert => (
              <span key={cert.id}>
                <strong>{cert.name}</strong> ({cert.issuer}, {cert.issueDate})
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
