import React from "react";
import { Sparkle, CheckCircle, WarningCircle } from "@phosphor-icons/react";

export function SummarySection({ data, onChange }) {
  const summary = data.summary || "";
  const words = summary.trim().split(/\s+/).filter(Boolean).length;
  const isOptimal = words >= 30 && words <= 85;

  const handleChange = (e) => {
    const text = e.target.value.replace(/[—–]/g, "-");
    onChange({
      ...data,
      summary: text
    });
  };

  const applySnippet = (snippet) => {
    onChange({
      ...data,
      summary: snippet
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label htmlFor="summary" className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Executive Summary <span className="text-zinc-500 font-normal">· Concise Value Proposition</span>
        </label>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className={`px-2 py-0.5 rounded-full flex items-center gap-1 ${
            isOptimal ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : "bg-zinc-800 text-zinc-400 border border-zinc-700"
          }`}>
            {isOptimal ? <CheckCircle size={12} weight="bold" /> : <WarningCircle size={12} />}
            <span>{words} words</span>
            <span className="text-zinc-500 font-sans">(Target: 30-80)</span>
          </span>
        </div>
      </div>

      <textarea
        id="summary"
        rows={5}
        value={summary}
        onChange={handleChange}
        placeholder="Brief summary introducing yourself, your college degree (BSc.IT), skills like C++ or React, and what you are eager to build or learn..."
        className="w-full p-3 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all leading-relaxed"
      />

      {/* Suggested Student Starters */}
      <div className="pt-2">
        <div className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1 mb-1.5 uppercase tracking-wider">
          <Sparkle size={13} className="text-amber-400" />
          <span>Quick Student Starters (1-Click)</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => applySnippet("Enthusiastic 1st Year BSc.IT student with solid foundations in C++, JavaScript, React, and MySQL. Passionate about responsive web design, problem solving, and building practical software tools. Seeking a frontend or software development internship to apply academic learnings and contribute to real-world projects.")}
            className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/90 text-zinc-300 border border-zinc-700 transition-colors text-left tactile-btn"
          >
            1st Year BSc.IT Student
          </button>
          <button
            type="button"
            onClick={() => applySnippet("Aspiring Frontend Developer and BSc.IT student proficient in HTML5, CSS3, JavaScript (ES6+), and React. Quick learner who enjoys building user-friendly web interfaces, exploring modern UI frameworks, and working in collaborative teams.")}
            className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/90 text-zinc-300 border border-zinc-700 transition-colors text-left tactile-btn"
          >
            Frontend / Web Fresher
          </button>
          <button
            type="button"
            onClick={() => applySnippet("First Year Information Technology student with keen interest in Database Management Systems (SQL), object-oriented programming in C++, and computer networking. Looking for hands-on IT support and developer trainee opportunities.")}
            className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700/90 text-zinc-300 border border-zinc-700 transition-colors text-left tactile-btn"
          >
            IT & Database Trainee
          </button>
        </div>
      </div>
    </div>
  );
}
