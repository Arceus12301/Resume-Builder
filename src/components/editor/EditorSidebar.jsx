import React, { useState } from "react";
import { PersonalSection } from "./PersonalSection";
import { SummarySection } from "./SummarySection";
import { ExperienceSection } from "./ExperienceSection";
import { SkillsSection } from "./SkillsSection";
import { ProjectsSection } from "./ProjectsSection";
import { EducationSection } from "./EducationSection";
import { CertificationsSection } from "./CertificationsSection";
import { DesignStudio } from "./DesignStudio";
import { 
  User, Article, Briefcase, GraduationCap, Wrench, Code, 
  Certificate, ShieldCheck 
} from "@phosphor-icons/react";

export function EditorSidebar({ data, onChange, onOpenAtsModal, atsScore }) {
  const [mainTab, setMainTab] = useState("content"); // 'content' | 'design'
  const [contentSection, setContentSection] = useState("personal");

  const navItems = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "education", label: "Education", icon: GraduationCap, count: data.education?.length },
    { id: "projects", label: "Projects", icon: Code, count: data.projects?.length },
    { id: "skills", label: "Skills", icon: Wrench, count: data.skills?.length },
    { id: "experience", label: "Experience & Internships", icon: Briefcase, count: data.experience?.length },
    { id: "certifications", label: "Certifications", icon: Certificate, count: data.certifications?.length },
    { id: "summary", label: "About Me", icon: Article },
  ];

  return (
    <div className="flex flex-col h-full bg-zinc-950/60 rounded-3xl border border-zinc-800/80 overflow-hidden">
      {/* Top Level Segmented Navigation */}
      <div className="p-3 border-b border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between gap-2">
        <div className="flex p-1 bg-zinc-950 border border-zinc-800/80 rounded-2xl w-full max-w-sm">
          <button
            type="button"
            onClick={() => setMainTab("content")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all tactile-btn ${
              mainTab === "content"
                ? "bg-zinc-800 text-blue-400 shadow-sm border border-zinc-700/80"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Resume Details
          </button>
          <button
            type="button"
            onClick={() => setMainTab("design")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-xl transition-all tactile-btn ${
              mainTab === "design"
                ? "bg-zinc-800 text-blue-400 shadow-sm border border-zinc-700/80"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Design & Fonts
          </button>
        </div>

        <button
          type="button"
          onClick={onOpenAtsModal}
          className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs font-medium text-zinc-300 flex items-center gap-1.5 tactile-btn"
          title="Open ATS Analysis"
        >
          <ShieldCheck size={14} className={atsScore >= 85 ? "text-emerald-400" : "text-amber-400"} weight="bold" />
          <span className="font-mono text-[11px]">{atsScore}</span>
        </button>
      </div>

      {mainTab === "content" ? (
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Section Sub-Navigation Pills */}
          <div className="px-3 py-2 border-b border-zinc-800/60 bg-zinc-950/40 overflow-x-auto flex gap-1.5 no-scrollbar">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = contentSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setContentSection(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap flex items-center gap-1.5 transition-all tactile-btn ${
                    isActive
                      ? "bg-blue-600/15 border border-blue-500/40 text-blue-300"
                      : "bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 border border-transparent"
                  }`}
                >
                  <Icon size={13} weight={isActive ? "bold" : "regular"} />
                  <span>{item.label}</span>
                  {item.count !== undefined && (
                    <span className="text-[10px] font-mono opacity-60">({item.count})</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Section Form View */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {contentSection === "personal" && <PersonalSection data={data} onChange={onChange} />}
            {contentSection === "summary" && <SummarySection data={data} onChange={onChange} />}
            {contentSection === "experience" && <ExperienceSection data={data} onChange={onChange} />}
            {contentSection === "skills" && <SkillsSection data={data} onChange={onChange} />}
            {contentSection === "projects" && <ProjectsSection data={data} onChange={onChange} />}
            {contentSection === "education" && <EducationSection data={data} onChange={onChange} />}
            {contentSection === "certifications" && <CertificationsSection data={data} onChange={onChange} />}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <DesignStudio data={data} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
