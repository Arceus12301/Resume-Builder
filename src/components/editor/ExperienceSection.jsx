import React, { useState } from "react";
import { Plus, Trash, ArrowUp, ArrowDown, CaretDown, CaretUp, CheckCircle, Warning } from "@phosphor-icons/react";
import { POWER_VERBS } from "../../constants/initialData";

export function ExperienceSection({ data, onChange }) {
  const experiences = data.experience || [];
  const [expandedId, setExpandedId] = useState(experiences[0]?.id || null);
  const [techInputs, setTechInputs] = useState({});

  const updateExperiences = (newExps) => {
    onChange({
      ...data,
      experience: newExps
    });
  };

  const addExperience = () => {
    const newId = `exp-${Date.now()}`;
    const newEntry = {
      id: newId,
      company: "Company Name",
      role: "Senior Engineer",
      location: "San Francisco, CA",
      startDate: "2023",
      endDate: "Present",
      isCurrent: true,
      bullets: [
        "Architected core system improving processing latency by 35% across 500,000 requests per day."
      ],
      techStack: ["React", "TypeScript", "Tailwind CSS"]
    };
    updateExperiences([newEntry, ...experiences]);
    setExpandedId(newId);
  };

  const removeExperience = (id) => {
    updateExperiences(experiences.filter(exp => exp.id !== id));
  };

  const moveExperience = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= experiences.length) return;
    const copy = [...experiences];
    const [moved] = copy.splice(index, 1);
    copy.splice(target, 0, moved);
    updateExperiences(copy);
  };

  const updateItem = (id, field, value) => {
    const sanitized = typeof value === "string" ? value.replace(/[—–]/g, "-") : value;
    updateExperiences(
      experiences.map(exp => (exp.id === id ? { ...exp, [field]: sanitized } : exp))
    );
  };

  const addBullet = (expId) => {
    updateExperiences(
      experiences.map(exp => {
        if (exp.id === expId) {
          return {
            ...exp,
            bullets: [...(exp.bullets || []), "Spearheaded technical initiative reducing error rates by 28%."]
          };
        }
        return exp;
      })
    );
  };

  const updateBullet = (expId, bulletIndex, text) => {
    const sanitized = text.replace(/[—–]/g, "-");
    updateExperiences(
      experiences.map(exp => {
        if (exp.id === expId) {
          const updated = [...(exp.bullets || [])];
          updated[bulletIndex] = sanitized;
          return { ...exp, bullets: updated };
        }
        return exp;
      })
    );
  };

  const removeBullet = (expId, bulletIndex) => {
    updateExperiences(
      experiences.map(exp => {
        if (exp.id === expId) {
          const updated = (exp.bullets || []).filter((_, idx) => idx !== bulletIndex);
          return { ...exp, bullets: updated };
        }
        return exp;
      })
    );
  };

  const prependVerb = (expId, bulletIndex, verb) => {
    const exp = experiences.find(e => e.id === expId);
    if (!exp) return;
    const current = exp.bullets[bulletIndex] || "";
    // If it starts with a word, replace or prepend
    const words = current.split(/\s+/);
    words[0] = verb;
    updateBullet(expId, bulletIndex, words.join(" "));
  };

  const addTechTag = (expId) => {
    const tag = (techInputs[expId] || "").trim().replace(/[—–]/g, "-");
    if (!tag) return;
    updateExperiences(
      experiences.map(exp => {
        if (exp.id === expId) {
          const current = exp.techStack || [];
          if (!current.includes(tag)) {
            return { ...exp, techStack: [...current, tag] };
          }
        }
        return exp;
      })
    );
    setTechInputs({ ...techInputs, [expId]: "" });
  };

  const removeTechTag = (expId, tagToRemove) => {
    updateExperiences(
      experiences.map(exp => {
        if (exp.id === expId) {
          return {
            ...exp,
            techStack: (exp.techStack || []).filter(t => t !== tagToRemove)
          };
        }
        return exp;
      })
    );
  };

  const metricRegex = /(\d+(\.\d+)?%|\$\d+|\d+x|\d+\s*(ms|s|FPS|users|engineers|days|weeks|months|years|rows|GB|MB|KB))/;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Work Experience ({experiences.length})
          </h3>
          <p className="text-[11px] text-zinc-500">Document roles, quantifiable impact, and tech stacks</p>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium tactile-btn shadow-sm"
        >
          <Plus size={14} weight="bold" />
          <span>Add Position</span>
        </button>
      </div>

      <div className="space-y-3">
        {experiences.map((exp, expIdx) => {
          const isExpanded = expandedId === exp.id;
          return (
            <div key={exp.id} className="rounded-2xl border border-zinc-800 bg-zinc-900/90 overflow-hidden transition-all">
              {/* Accordion Header */}
              <div
                className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-zinc-800/40 select-none"
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-mono text-zinc-400">
                    {expIdx + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-sm text-zinc-100">{exp.role || "Untitled Role"}</span>
                    <span className="text-zinc-500 mx-1.5">·</span>
                    <span className="text-xs text-blue-400 font-medium">{exp.company || "Company"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                  <button
                    type="button"
                    disabled={expIdx === 0}
                    onClick={() => moveExperience(expIdx, -1)}
                    className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 rounded hover:bg-zinc-800"
                    title="Move up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    disabled={expIdx === experiences.length - 1}
                    onClick={() => moveExperience(expIdx, 1)}
                    className="p-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 rounded hover:bg-zinc-800"
                    title="Move down"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeExperience(exp.id)}
                    className="p-1 text-zinc-400 hover:text-red-400 rounded hover:bg-zinc-800"
                    title="Delete position"
                  >
                    <Trash size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                    className="p-1 text-zinc-400 hover:text-zinc-200 rounded hover:bg-zinc-800 ml-1"
                  >
                    {isExpanded ? <CaretUp size={14} /> : <CaretDown size={14} />}
                  </button>
                </div>
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="p-4 pt-1 border-t border-zinc-800/80 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                        Role Title
                      </label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={e => updateItem(exp.id, "role", e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={e => updateItem(exp.id, "company", e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                        Location
                      </label>
                      <input
                        type="text"
                        value={exp.location || ""}
                        onChange={e => updateItem(exp.id, "location", e.target.value)}
                        placeholder="San Francisco, CA"
                        className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                        Start Year / Date
                      </label>
                      <input
                        type="text"
                        value={exp.startDate || ""}
                        onChange={e => updateItem(exp.id, "startDate", e.target.value)}
                        placeholder="2022"
                        className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                          End Date
                        </label>
                        <label className="inline-flex items-center gap-1 text-[11px] text-zinc-400 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={exp.isCurrent || false}
                            onChange={e => updateItem(exp.id, "isCurrent", e.target.checked)}
                            className="rounded bg-zinc-800 border-zinc-700 text-blue-600 focus:ring-0"
                          />
                          <span>Current</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        disabled={exp.isCurrent}
                        value={exp.isCurrent ? "Present" : (exp.endDate || "")}
                        onChange={e => updateItem(exp.id, "endDate", e.target.value)}
                        placeholder="Present"
                        className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Bullet Points */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                        <span>Quantified Bullet Points</span>
                        <span className="text-[10px] text-zinc-500 font-normal">(Start with action verb + include metric)</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => addBullet(exp.id)}
                        className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
                      >
                        <Plus size={12} weight="bold" /> Add Bullet
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(exp.bullets || []).map((bullet, bIdx) => {
                        const hasMetric = metricRegex.test(bullet);
                        return (
                          <div key={bIdx} className="space-y-1 bg-zinc-950/60 p-2 rounded-xl border border-zinc-800/70">
                            <div className="flex items-start gap-2">
                              <span className="text-xs font-mono text-zinc-500 mt-1 select-none">
                                {bIdx + 1}.
                              </span>
                              <textarea
                                rows={2}
                                value={bullet}
                                onChange={e => updateBullet(exp.id, bIdx, e.target.value)}
                                className="flex-1 p-2 text-xs bg-zinc-900 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
                              />
                              <button
                                type="button"
                                onClick={() => removeBullet(exp.id, bIdx)}
                                className="p-1.5 text-zinc-500 hover:text-red-400 rounded hover:bg-zinc-800"
                                title="Remove bullet"
                              >
                                <Trash size={13} />
                              </button>
                            </div>

                            {/* Bullet feedback & power verb injectors */}
                            <div className="flex flex-wrap items-center justify-between text-[10px] pl-5 gap-1">
                              <div className="flex items-center gap-1">
                                {hasMetric ? (
                                  <span className="text-emerald-400 flex items-center gap-0.5">
                                    <CheckCircle size={11} weight="bold" /> Metric quantified
                                  </span>
                                ) : (
                                  <span className="text-amber-400 flex items-center gap-0.5">
                                    <Warning size={11} /> Missing hard metric (%, $, numbers)
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1">
                                <span className="text-zinc-500">Inject Power Verb:</span>
                                {POWER_VERBS.slice(0, 4).map(v => (
                                  <button
                                    key={v}
                                    type="button"
                                    onClick={() => prependVerb(exp.id, bIdx, v)}
                                    className="px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700"
                                  >
                                    {v}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-2">
                    <label className="block text-[11px] font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">
                      Technologies & Tools Used
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {(exp.techStack || []).map(tech => (
                        <span
                          key={tech}
                          className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700 font-mono"
                        >
                          <span>{tech}</span>
                          <button
                            type="button"
                            onClick={() => removeTechTag(exp.id, tech)}
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
                        value={techInputs[exp.id] || ""}
                        onChange={e => setTechInputs({ ...techInputs, [exp.id]: e.target.value })}
                        onKeyDown={e => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTechTag(exp.id);
                          }
                        }}
                        placeholder="Type technology and press Enter (e.g. Next.js)..."
                        className="flex-1 px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => addTechTag(exp.id)}
                        className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg border border-zinc-700 tactile-btn"
                      >
                        Add Tag
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
