import React, { useState } from "react";
import { Plus, Trash } from "@phosphor-icons/react";

export function SkillsSection({ data, onChange }) {
  const skills = data.skills || [];
  const [newInputs, setNewInputs] = useState({});

  const updateSkills = (newSkills) => {
    onChange({
      ...data,
      skills: newSkills
    });
  };

  const addCategory = () => {
    const newId = `skill-${Date.now()}`;
    const newEntry = {
      id: newId,
      categoryName: "New Category",
      items: ["Technology A", "Technology B"]
    };
    updateSkills([...skills, newEntry]);
  };

  const removeCategory = (id) => {
    updateSkills(skills.filter(s => s.id !== id));
  };

  const updateCategoryName = (id, name) => {
    const sanitized = name.replace(/[—–]/g, "-");
    updateSkills(
      skills.map(s => (s.id === id ? { ...s, categoryName: sanitized } : s))
    );
  };

  const addSkillItem = (categoryId) => {
    const val = (newInputs[categoryId] || "").trim().replace(/[—–]/g, "-");
    if (!val) return;
    updateSkills(
      skills.map(s => {
        if (s.id === categoryId) {
          if (!s.items.includes(val)) {
            return { ...s, items: [...s.items, val] };
          }
        }
        return s;
      })
    );
    setNewInputs({ ...newInputs, [categoryId]: "" });
  };

  const removeSkillItem = (categoryId, itemToRemove) => {
    updateSkills(
      skills.map(s => {
        if (s.id === categoryId) {
          return {
            ...s,
            items: s.items.filter(item => item !== itemToRemove)
          };
        }
        return s;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Technical Skills & Domains ({skills.length} categories)
          </h3>
          <p className="text-[11px] text-zinc-500">Group proficiencies into targeted categories for ATS parsing</p>
        </div>
        <button
          type="button"
          onClick={addCategory}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium tactile-btn shadow-sm"
        >
          <Plus size={14} weight="bold" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="space-y-3">
        {skills.map((cat) => (
          <div key={cat.id} className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-900/90 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <input
                type="text"
                value={cat.categoryName}
                onChange={e => updateCategoryName(cat.id, e.target.value)}
                placeholder="Category Name (e.g. Frontend Architecture)"
                className="font-semibold text-xs text-zinc-100 bg-transparent border-b border-zinc-700 pb-0.5 focus:outline-none focus:border-blue-500 uppercase tracking-wider flex-1"
              />
              <button
                type="button"
                onClick={() => removeCategory(cat.id)}
                className="p-1 text-zinc-400 hover:text-red-400 rounded hover:bg-zinc-800"
                title="Remove category"
              >
                <Trash size={14} />
              </button>
            </div>

            {/* Skill Pills */}
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map(item => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-mono"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeSkillItem(cat.id, item)}
                    className="text-zinc-500 hover:text-red-400 ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Add Skill Input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newInputs[cat.id] || ""}
                onChange={e => setNewInputs({ ...newInputs, [cat.id]: e.target.value })}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkillItem(cat.id);
                  }
                }}
                placeholder="Add skill (press Enter)..."
                className="flex-1 px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
              />
              <button
                type="button"
                onClick={() => addSkillItem(cat.id)}
                className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg border border-zinc-700 tactile-btn"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
