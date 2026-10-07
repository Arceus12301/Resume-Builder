import React, { useState } from "react";
import { Plus, Trash } from "@phosphor-icons/react";

export function ProjectsSection({ data, onChange }) {
  const projects = data.projects || [];
  const [techInputs, setTechInputs] = useState({});

  const updateProjects = (newProjects) => {
    onChange({
      ...data,
      projects: newProjects
    });
  };

  const addProject = () => {
    const newId = `proj-${Date.now()}`;
    const newEntry = {
      id: newId,
      name: "New Open Source Project",
      role: "Creator",
      liveUrl: "https://project.dev",
      githubUrl: "github.com/username/project",
      bullets: [
        "Architected core system resulting in 40% performance improvement and 5,000+ monthly active users."
      ],
      technologies: ["TypeScript", "React", "Node.js"]
    };
    updateProjects([...projects, newEntry]);
  };

  const removeProject = (id) => {
    updateProjects(projects.filter(p => p.id !== id));
  };

  const updateItem = (id, field, value) => {
    const sanitized = typeof value === "string" ? value.replace(/[—–]/g, "-") : value;
    updateProjects(
      projects.map(p => (p.id === id ? { ...p, [field]: sanitized } : p))
    );
  };

  const addBullet = (projId) => {
    updateProjects(
      projects.map(p => {
        if (p.id === projId) {
          return {
            ...p,
            bullets: [...(p.bullets || []), "Engineered key feature processing high volume user events."]
          };
        }
        return p;
      })
    );
  };

  const updateBullet = (projId, bIdx, text) => {
    const sanitized = text.replace(/[—–]/g, "-");
    updateProjects(
      projects.map(p => {
        if (p.id === projId) {
          const updated = [...(p.bullets || [])];
          updated[bIdx] = sanitized;
          return { ...p, bullets: updated };
        }
        return p;
      })
    );
  };

  const removeBullet = (projId, bIdx) => {
    updateProjects(
      projects.map(p => {
        if (p.id === projId) {
          return {
            ...p,
            bullets: (p.bullets || []).filter((_, idx) => idx !== bIdx)
          };
        }
        return p;
      })
    );
  };

  const addTechTag = (projId) => {
    const tag = (techInputs[projId] || "").trim().replace(/[—–]/g, "-");
    if (!tag) return;
    updateProjects(
      projects.map(p => {
        if (p.id === projId) {
          const current = p.technologies || [];
          if (!current.includes(tag)) {
            return { ...p, technologies: [...current, tag] };
          }
        }
        return p;
      })
    );
    setTechInputs({ ...techInputs, [projId]: "" });
  };

  const removeTechTag = (projId, tagToRemove) => {
    updateProjects(
      projects.map(p => {
        if (p.id === projId) {
          return {
            ...p,
            technologies: (p.technologies || []).filter(t => t !== tagToRemove)
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Featured Projects ({projects.length})
          </h3>
          <p className="text-[11px] text-zinc-500">Highlight open source, system builds, or flagship products</p>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium tactile-btn shadow-sm"
        >
          <Plus size={14} weight="bold" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((proj, pIdx) => (
          <div key={proj.id} className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/90 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-zinc-400">Project #{pIdx + 1}</span>
              <button
                type="button"
                onClick={() => removeProject(proj.id)}
                className="p-1 text-zinc-400 hover:text-red-400 rounded hover:bg-zinc-800"
                title="Remove project"
              >
                <Trash size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                  Project Title
                </label>
                <input
                  type="text"
                  value={proj.name}
                  onChange={e => updateItem(proj.id, "name", e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                  Role / Contribution
                </label>
                <input
                  type="text"
                  value={proj.role || ""}
                  onChange={e => updateItem(proj.id, "role", e.target.value)}
                  placeholder="e.g. Lead Architect, Creator"
                  className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                  Live URL
                </label>
                <input
                  type="text"
                  value={proj.liveUrl || ""}
                  onChange={e => updateItem(proj.id, "liveUrl", e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                  Repository URL
                </label>
                <input
                  type="text"
                  value={proj.githubUrl || ""}
                  onChange={e => updateItem(proj.id, "githubUrl", e.target.value)}
                  placeholder="github.com/..."
                  className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>

            {/* Bullets */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                  Impact Bullets
                </span>
                <button
                  type="button"
                  onClick={() => addBullet(proj.id)}
                  className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                >
                  <Plus size={12} weight="bold" /> Add Bullet
                </button>
              </div>

              {(proj.bullets || []).map((b, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2">
                  <textarea
                    rows={2}
                    value={b}
                    onChange={e => updateBullet(proj.id, bIdx, e.target.value)}
                    className="flex-1 p-2 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
                  />
                  <button
                    type="button"
                    onClick={() => removeBullet(proj.id, bIdx)}
                    className="p-1.5 text-zinc-500 hover:text-red-400 rounded hover:bg-zinc-800 mt-1"
                  >
                    <Trash size={13} />
                  </button>
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div className="pt-1">
              <label className="block text-[11px] font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                Tech Stack
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {(proj.technologies || []).map(tech => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700 font-mono"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechTag(proj.id, tech)}
                      className="text-zinc-500 hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={techInputs[proj.id] || ""}
                  onChange={e => setTechInputs({ ...techInputs, [proj.id]: e.target.value })}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTechTag(proj.id);
                    }
                  }}
                  placeholder="Add technology (press Enter)..."
                  className="flex-1 px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => addTechTag(proj.id)}
                  className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg border border-zinc-700 tactile-btn"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
