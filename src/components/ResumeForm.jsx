import React, { useState } from "react";
import { 
  User, Article, GraduationCap, Code, Wrench, 
  Briefcase, Certificate, Plus, Trash, CaretDown, CaretUp,
  Camera, X
} from "@phosphor-icons/react";

export function ResumeForm({ data, onChange }) {
  // Track which accordion section is currently open (default opens personal info)
  const [openSection, setOpenSection] = useState("personal");

  const updateField = (section, field, value) => {
    // Sanitize any accidental em-dashes
    const sanitized = typeof value === "string" ? value.replace(/[—–]/g, "-") : value;
    onChange({
      ...data,
      [section]: {
        ...data[section],
        [field]: sanitized
      }
    });
  };

  const toggleSection = (name) => {
    setOpenSection(openSection === name ? "" : name);
  };

  // Helper functions for dynamic array items (Education, Projects, Experience, Skills, Certifications)
  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      honors: "",
      coursework: ""
    };
    onChange({
      ...data,
      education: [...(data.education || []), newEdu]
    });
  };

  const removeEducation = (id) => {
    onChange({
      ...data,
      education: (data.education || []).filter(e => e.id !== id)
    });
  };

  const updateEducation = (id, field, value) => {
    const sanitized = value.replace(/[—–]/g, "-");
    onChange({
      ...data,
      education: (data.education || []).map(e => e.id === id ? { ...e, [field]: sanitized } : e)
    });
  };

  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      name: "",
      role: "",
      liveUrl: "",
      githubUrl: "",
      bullets: [""],
      technologies: []
    };
    onChange({
      ...data,
      projects: [...(data.projects || []), newProj]
    });
  };

  const removeProject = (id) => {
    onChange({
      ...data,
      projects: (data.projects || []).filter(p => p.id !== id)
    });
  };

  const updateProject = (id, field, value) => {
    const sanitized = typeof value === "string" ? value.replace(/[—–]/g, "-") : value;
    onChange({
      ...data,
      projects: (data.projects || []).map(p => p.id === id ? { ...p, [field]: sanitized } : p)
    });
  };

  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: "",
      role: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      bullets: [""],
      techStack: []
    };
    onChange({
      ...data,
      experience: [...(data.experience || []), newExp]
    });
  };

  const removeExperience = (id) => {
    onChange({
      ...data,
      experience: (data.experience || []).filter(e => e.id !== id)
    });
  };

  const updateExperience = (id, field, value) => {
    const sanitized = typeof value === "string" ? value.replace(/[—–]/g, "-") : value;
    onChange({
      ...data,
      experience: (data.experience || []).map(e => e.id === id ? { ...e, [field]: sanitized } : e)
    });
  };

  const addSkillCategory = () => {
    const newCat = {
      id: `skill-${Date.now()}`,
      categoryName: "",
      items: []
    };
    onChange({
      ...data,
      skills: [...(data.skills || []), newCat]
    });
  };

  const removeSkillCategory = (id) => {
    onChange({
      ...data,
      skills: (data.skills || []).filter(s => s.id !== id)
    });
  };

  const updateSkillCategory = (id, name) => {
    const sanitized = name.replace(/[—–]/g, "-");
    onChange({
      ...data,
      skills: (data.skills || []).map(s => s.id === id ? { ...s, categoryName: sanitized } : s)
    });
  };

  const updateSkillItems = (id, itemsString) => {
    const items = itemsString.split(",").map(i => i.trim().replace(/[—–]/g, "-")).filter(Boolean);
    onChange({
      ...data,
      skills: (data.skills || []).map(s => s.id === id ? { ...s, items } : s)
    });
  };

  const addCertification = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: "",
      issuer: "",
      issueDate: "",
      url: ""
    };
    onChange({
      ...data,
      certifications: [...(data.certifications || []), newCert]
    });
  };

  const removeCertification = (id) => {
    onChange({
      ...data,
      certifications: (data.certifications || []).filter(c => c.id !== id)
    });
  };

  const updateCertification = (id, field, value) => {
    const sanitized = value.replace(/[—–]/g, "-");
    onChange({
      ...data,
      certifications: (data.certifications || []).map(c => c.id === id ? { ...c, [field]: sanitized } : c)
    });
  };

  const personal = data.personalInfo || {};

  return (
    <div className="space-y-3">
      {/* 1. Personal Information */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection("personal")}
          className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
              <User size={14} weight="bold" />
            </span>
            <span className="font-semibold text-sm text-slate-800">1. Personal Details</span>
          </div>
          {openSection === "personal" ? <CaretUp size={14} /> : <CaretDown size={14} />}
        </button>

        {openSection === "personal" && (
          <div className="p-4 space-y-3 border-t border-slate-200">
            {/* Profile Photo Upload */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {personal.photoUrl ? (
                  <img
                    src={personal.photoUrl}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-2xs"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-400">
                    <User size={22} />
                  </div>
                )}
                <div>
                  <div className="text-xs font-semibold text-slate-800">Profile Photo</div>
                  <div className="text-[11px] text-slate-500">Optional · PNG, JPG up to 2MB</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors tactile-btn">
                  <Camera size={13} className="text-blue-600" />
                  <span>{personal.photoUrl ? "Change Photo" : "Upload Photo"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 2 * 1024 * 1024) {
                        alert("Please select an image smaller than 2MB.");
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        updateField("personalInfo", "photoUrl", event.target?.result);
                      };
                      reader.readAsDataURL(file);
                      e.target.value = "";
                    }}
                  />
                </label>

                {personal.photoUrl && (
                  <button
                    type="button"
                    onClick={() => updateField("personalInfo", "photoUrl", "")}
                    className="p-1 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                    title="Remove photo"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={personal.fullName || ""}
                  onChange={e => updateField("personalInfo", "fullName", e.target.value)}
                  placeholder="e.g. Aryan Sharma"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Job Title / Headline
                </label>
                <input
                  type="text"
                  value={personal.jobTitle || ""}
                  onChange={e => updateField("personalInfo", "jobTitle", e.target.value)}
                  placeholder="e.g. 1st Year BSc.IT Student & Web Developer"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={personal.email || ""}
                  onChange={e => updateField("personalInfo", "email", e.target.value)}
                  placeholder="student@gmail.com"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={personal.phone || ""}
                  onChange={e => updateField("personalInfo", "phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City, Country
                </label>
                <input
                  type="text"
                  value={personal.location || ""}
                  onChange={e => updateField("personalInfo", "location", e.target.value)}
                  placeholder="Mumbai, India"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  GitHub Profile
                </label>
                <input
                  type="text"
                  value={personal.github || ""}
                  onChange={e => updateField("personalInfo", "github", e.target.value)}
                  placeholder="github.com/username"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LinkedIn Profile
                </label>
                <input
                  type="text"
                  value={personal.linkedin || ""}
                  onChange={e => updateField("personalInfo", "linkedin", e.target.value)}
                  placeholder="linkedin.com/in/username"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Portfolio / Website
                </label>
                <input
                  type="text"
                  value={personal.website || ""}
                  onChange={e => updateField("personalInfo", "website", e.target.value)}
                  placeholder="https://myportfolio.dev"
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Career Objective / Summary */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection("summary")}
          className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
              <Article size={14} weight="bold" />
            </span>
            <span className="font-semibold text-sm text-slate-800">2. Career Objective / Summary</span>
          </div>
          {openSection === "summary" ? <CaretUp size={14} /> : <CaretDown size={14} />}
        </button>

        {openSection === "summary" && (
          <div className="p-4 space-y-2 border-t border-slate-200">
            <p className="text-[11px] text-slate-500">
              A short 2-3 sentence summary about what you are studying and what internships or projects you want to pursue.
            </p>
            <textarea
              rows={4}
              value={data.summary || ""}
              onChange={e => onChange({ ...data, summary: e.target.value.replace(/[—–]/g, "-") })}
              placeholder="e.g. Enthusiastic 1st Year BSc.IT student with foundations in C++, JavaScript, and MySQL. Seeking a web development internship..."
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] text-slate-400 self-center">Quick options:</span>
              <button
                type="button"
                onClick={() => onChange({ ...data, summary: "Enthusiastic 1st Year BSc.IT student with solid foundations in C++, JavaScript, React, and MySQL. Passionate about responsive web design and seeking an internship to learn and contribute to real-world projects." })}
                className="text-[11px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300"
              >
                BSc.IT Student
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...data, summary: "Aspiring Frontend Developer and BSc.IT student proficient in HTML5, CSS3, JavaScript (ES6+), and React. Eager to build clean web interfaces and contribute to developer teams." })}
                className="text-[11px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300"
              >
                Frontend Fresher
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Education */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection("education")}
          className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
              <GraduationCap size={14} weight="bold" />
            </span>
            <span className="font-semibold text-sm text-slate-800">
              3. Education ({data.education?.length || 0})
            </span>
          </div>
          {openSection === "education" ? <CaretUp size={14} /> : <CaretDown size={14} />}
        </button>

        {openSection === "education" && (
          <div className="p-4 space-y-3 border-t border-slate-200">
            {(data.education || []).map((edu, idx) => (
              <div key={edu.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-700">Education #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-slate-200"
                    title="Remove"
                  >
                    <Trash size={13} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={edu.institution || ""}
                    onChange={e => updateEducation(edu.id, "institution", e.target.value)}
                    placeholder="College or School Name"
                    className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800"
                  />
                  <input
                    type="text"
                    value={edu.degree || ""}
                    onChange={e => updateEducation(edu.id, "degree", e.target.value)}
                    placeholder="Degree (e.g. B.Sc. IT, HSC 12th)"
                    className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800"
                  />
                  <input
                    type="text"
                    value={edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : (edu.endDate || "")}
                    onChange={e => {
                      const parts = e.target.value.split("-");
                      if (parts.length === 2) {
                        updateEducation(edu.id, "startDate", parts[0].trim());
                        updateEducation(edu.id, "endDate", parts[1].trim());
                      } else {
                        updateEducation(edu.id, "endDate", e.target.value);
                      }
                    }}
                    placeholder="Years (e.g. 2024 - 2027)"
                    className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800"
                  />
                  <input
                    type="text"
                    value={edu.honors || ""}
                    onChange={e => updateEducation(edu.id, "honors", e.target.value)}
                    placeholder="Marks or SGPA (e.g. 8.9 / 10)"
                    className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800"
                  />
                </div>
                <input
                  type="text"
                  value={edu.coursework || ""}
                  onChange={e => updateEducation(edu.id, "coursework", e.target.value)}
                  placeholder="Key Subjects (e.g. C++, Web Tech, DBMS, Computer Networks)"
                  className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addEducation}
              className="w-full py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 flex items-center justify-center gap-1 transition-colors"
            >
              <Plus size={13} weight="bold" /> Add Another Education
            </button>
          </div>
        )}
      </div>

      {/* 4. Technical Skills */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection("skills")}
          className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
              <Wrench size={14} weight="bold" />
            </span>
            <span className="font-semibold text-sm text-slate-800">
              4. Technical Skills ({data.skills?.length || 0} categories)
            </span>
          </div>
          {openSection === "skills" ? <CaretUp size={14} /> : <CaretDown size={14} />}
        </button>

        {openSection === "skills" && (
          <div className="p-4 space-y-3 border-t border-slate-200">
            <p className="text-[11px] text-slate-500">
              List the tools and languages you know. Separate each skill with a comma (e.g. C++, Java, HTML).
            </p>

            {(data.skills || []).map(skill => (
              <div key={skill.id} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex justify-between items-center gap-2">
                  <input
                    type="text"
                    value={skill.categoryName || ""}
                    onChange={e => updateSkillCategory(skill.id, e.target.value)}
                    placeholder="Category (e.g. Programming Languages)"
                    className="font-semibold text-xs bg-transparent border-b border-slate-300 pb-0.5 text-slate-800 focus:outline-none focus:border-blue-500 flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeSkillCategory(skill.id)}
                    className="text-slate-400 hover:text-red-600 p-0.5"
                  >
                    <Trash size={12} />
                  </button>
                </div>
                <input
                  type="text"
                  value={(skill.items || []).join(", ")}
                  onChange={e => updateSkillItems(skill.id, e.target.value)}
                  placeholder="Skills separated by commas (e.g. C++, Python, JavaScript)"
                  className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addSkillCategory}
              className="w-full py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 flex items-center justify-center gap-1 transition-colors"
            >
              <Plus size={13} weight="bold" /> Add Skill Category
            </button>
          </div>
        )}
      </div>

      {/* 5. Projects */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection("projects")}
          className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
              <Code size={14} weight="bold" />
            </span>
            <span className="font-semibold text-sm text-slate-800">
              5. Academic & Personal Projects ({data.projects?.length || 0})
            </span>
          </div>
          {openSection === "projects" ? <CaretUp size={14} /> : <CaretDown size={14} />}
        </button>

        {openSection === "projects" && (
          <div className="p-4 space-y-3 border-t border-slate-200">
            <p className="text-[11px] text-slate-500">
              College mini-projects, assignments, or personal web apps are great proof of your skills!
            </p>

            {(data.projects || []).map((proj, idx) => (
              <div key={proj.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-700">Project #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeProject(proj.id)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-slate-200"
                    title="Remove"
                  >
                    <Trash size={13} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={proj.name || ""}
                    onChange={e => updateProject(proj.id, "name", e.target.value)}
                    placeholder="Project Name (e.g. Student Portal)"
                    className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded font-semibold text-slate-800"
                  />
                  <input
                    type="text"
                    value={proj.role || ""}
                    onChange={e => updateProject(proj.id, "role", e.target.value)}
                    placeholder="Role (e.g. Solo Developer, Team Leader)"
                    className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800"
                  />
                  <input
                    type="text"
                    value={proj.liveUrl || ""}
                    onChange={e => updateProject(proj.id, "liveUrl", e.target.value)}
                    placeholder="Live URL (e.g. https://myproject.vercel.app)"
                    className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded font-mono text-slate-800"
                  />
                  <input
                    type="text"
                    value={proj.githubUrl || ""}
                    onChange={e => updateProject(proj.id, "githubUrl", e.target.value)}
                    placeholder="GitHub Repo (e.g. github.com/user/project)"
                    className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded font-mono text-slate-800"
                  />
                </div>

                {/* Bullets */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-600">
                    What did this project do? (Bullet points)
                  </label>
                  {(proj.bullets || []).map((bullet, bIdx) => (
                    <input
                      key={bIdx}
                      type="text"
                      value={bullet}
                      onChange={e => {
                        const updated = [...(proj.bullets || [])];
                        updated[bIdx] = e.target.value.replace(/[—–]/g, "-");
                        updateProject(proj.id, "bullets", updated);
                      }}
                      placeholder="e.g. Built a responsive web app with 150+ student users..."
                      className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800 mb-1"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      updateProject(proj.id, "bullets", [...(proj.bullets || []), ""]);
                    }}
                    className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Plus size={11} /> Add point
                  </button>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600">
                    Technologies Used (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={(proj.technologies || []).join(", ")}
                    onChange={e => {
                      const tags = e.target.value.split(",").map(t => t.trim().replace(/[—–]/g, "-")).filter(Boolean);
                      updateProject(proj.id, "technologies", tags);
                    }}
                    placeholder="e.g. HTML5, CSS3, JavaScript, React"
                    className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addProject}
              className="w-full py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 flex items-center justify-center gap-1 transition-colors"
            >
              <Plus size={13} weight="bold" /> Add Another Project
            </button>
          </div>
        )}
      </div>

      {/* 6. Experience & Internships */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection("experience")}
          className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
              <Briefcase size={14} weight="bold" />
            </span>
            <span className="font-semibold text-sm text-slate-800">
              6. Experience & Internships ({data.experience?.length || 0})
            </span>
          </div>
          {openSection === "experience" ? <CaretUp size={14} /> : <CaretDown size={14} />}
        </button>

        {openSection === "experience" && (
          <div className="p-4 space-y-3 border-t border-slate-200">
            {(data.experience || []).map((exp, idx) => (
              <div key={exp.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-700">Role #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="p-1 text-slate-400 hover:text-red-600 rounded hover:bg-slate-200"
                    title="Remove"
                  >
                    <Trash size={13} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={exp.role || ""}
                    onChange={e => updateExperience(exp.id, "role", e.target.value)}
                    placeholder="Role (e.g. Web Dev Intern, IT Volunteer)"
                    className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded font-semibold text-slate-800"
                  />
                  <input
                    type="text"
                    value={exp.company || ""}
                    onChange={e => updateExperience(exp.id, "company", e.target.value)}
                    placeholder="Company or Committee Name"
                    className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800"
                  />
                  <input
                    type="text"
                    value={exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : (exp.startDate || "")}
                    onChange={e => {
                      const parts = e.target.value.split("-");
                      if (parts.length === 2) {
                        updateExperience(exp.id, "startDate", parts[0].trim());
                        updateExperience(exp.id, "endDate", parts[1].trim());
                      } else {
                        updateExperience(exp.id, "startDate", e.target.value);
                      }
                    }}
                    placeholder="Duration (e.g. June 2024 - Aug 2024)"
                    className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800"
                  />
                  <input
                    type="text"
                    value={exp.location || ""}
                    onChange={e => updateExperience(exp.id, "location", e.target.value)}
                    placeholder="City or Remote"
                    className="px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-600">
                    Responsibilities & Learning (Bullets)
                  </label>
                  {(exp.bullets || []).map((bullet, bIdx) => (
                    <input
                      key={bIdx}
                      type="text"
                      value={bullet}
                      onChange={e => {
                        const updated = [...(exp.bullets || [])];
                        updated[bIdx] = e.target.value.replace(/[—–]/g, "-");
                        updateExperience(exp.id, "bullets", updated);
                      }}
                      placeholder="e.g. Helped build responsive client pages using HTML and CSS..."
                      className="w-full px-2.5 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800 mb-1"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      updateExperience(exp.id, "bullets", [...(exp.bullets || []), ""]);
                    }}
                    className="text-[11px] text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Plus size={11} /> Add point
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addExperience}
              className="w-full py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 flex items-center justify-center gap-1 transition-colors"
            >
              <Plus size={13} weight="bold" /> Add Internship / Experience
            </button>
          </div>
        )}
      </div>

      {/* 7. Certifications */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <button
          type="button"
          onClick={() => toggleSection("certifications")}
          className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
              <Certificate size={14} weight="bold" />
            </span>
            <span className="font-semibold text-sm text-slate-800">
              7. Certifications & Courses ({data.certifications?.length || 0})
            </span>
          </div>
          {openSection === "certifications" ? <CaretUp size={14} /> : <CaretDown size={14} />}
        </button>

        {openSection === "certifications" && (
          <div className="p-4 space-y-3 border-t border-slate-200">
            {(data.certifications || []).map(cert => (
              <div key={cert.id} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/70 space-y-1.5">
                <div className="flex justify-between items-center gap-2">
                  <input
                    type="text"
                    value={cert.name || ""}
                    onChange={e => updateCertification(cert.id, "name", e.target.value)}
                    placeholder="Certificate Name (e.g. Responsive Web Design)"
                    className="font-semibold text-xs bg-white px-2 py-1 border border-slate-300 rounded text-slate-800 flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeCertification(cert.id)}
                    className="text-slate-400 hover:text-red-600 p-1"
                  >
                    <Trash size={12} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={cert.issuer || ""}
                    onChange={e => updateCertification(cert.id, "issuer", e.target.value)}
                    placeholder="Issuer (e.g. freeCodeCamp, IIT Spoken Tutorial)"
                    className="px-2 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800"
                  />
                  <input
                    type="text"
                    value={cert.issueDate || ""}
                    onChange={e => updateCertification(cert.id, "issueDate", e.target.value)}
                    placeholder="Year (e.g. 2024)"
                    className="px-2 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addCertification}
              className="w-full py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 flex items-center justify-center gap-1 transition-colors"
            >
              <Plus size={13} weight="bold" /> Add Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
