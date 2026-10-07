import React from "react";
import { Plus, Trash } from "@phosphor-icons/react";

export function EducationSection({ data, onChange }) {
  const education = data.education || [];

  const updateEducation = (newEdu) => {
    onChange({
      ...data,
      education: newEdu
    });
  };

  const addEducation = () => {
    const newId = `edu-${Date.now()}`;
    const newEntry = {
      id: newId,
      institution: "University Name",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2018",
      endDate: "2022",
      honors: "Honors / GPA",
      coursework: "Algorithms, Distributed Systems"
    };
    updateEducation([...education, newEntry]);
  };

  const removeEducation = (id) => {
    updateEducation(education.filter(e => e.id !== id));
  };

  const updateItem = (id, field, value) => {
    const sanitized = typeof value === "string" ? value.replace(/[—–]/g, "-") : value;
    updateEducation(
      education.map(e => (e.id === id ? { ...e, [field]: sanitized } : e))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Education ({education.length})
          </h3>
          <p className="text-[11px] text-zinc-500">Degree, major, honors, and graduation date</p>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium tactile-btn shadow-sm"
        >
          <Plus size={14} weight="bold" />
          <span>Add Degree</span>
        </button>
      </div>

      <div className="space-y-3">
        {education.map((edu, idx) => (
          <div key={edu.id} className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/90 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-zinc-400">Entry #{idx + 1}</span>
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="p-1 text-zinc-400 hover:text-red-400 rounded hover:bg-zinc-800"
                title="Remove education"
              >
                <Trash size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                  Institution Name
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={e => updateItem(edu.id, "institution", e.target.value)}
                  placeholder="e.g. UC Berkeley"
                  className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                  Degree & Major
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={e => updateItem(edu.id, "degree", e.target.value)}
                    placeholder="B.S."
                    className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={e => updateItem(edu.id, "fieldOfStudy", e.target.value)}
                    placeholder="Computer Science"
                    className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                  Start Year
                </label>
                <input
                  type="text"
                  value={edu.startDate || ""}
                  onChange={e => updateItem(edu.id, "startDate", e.target.value)}
                  placeholder="2018"
                  className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                  Graduation Year
                </label>
                <input
                  type="text"
                  value={edu.endDate || ""}
                  onChange={e => updateItem(edu.id, "endDate", e.target.value)}
                  placeholder="2022"
                  className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                  Honors / Distinctions
                </label>
                <input
                  type="text"
                  value={edu.honors || ""}
                  onChange={e => updateItem(edu.id, "honors", e.target.value)}
                  placeholder="Magna Cum Laude"
                  className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
