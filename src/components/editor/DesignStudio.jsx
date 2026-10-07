import React from "react";
import { ACCENT_PRESETS, FONT_PRESETS } from "../../constants/initialData";
import { CheckCircle, Palette, TextAa, ArrowsVertical, Article } from "@phosphor-icons/react";

export function DesignStudio({ data, onChange }) {
  const custom = data.customization || {};

  const updateCustom = (field, value) => {
    onChange({
      ...data,
      customization: {
        ...custom,
        [field]: value
      }
    });
  };

  const templates = [
    {
      id: "swiss",
      name: "Swiss Minimalist",
      desc: "Josef Müller-Brockmann inspired. Pure typographic hierarchy, hairline dividers, zero fluff.",
      badge: "Designer Favorite"
    },
    {
      id: "linear",
      name: "Modern Tech",
      desc: "Linear/Apple devtool aesthetic. Monospace metadata tags, pill badges, and compact metrics.",
      badge: "Engineer Standard"
    },
    {
      id: "executive",
      name: "Executive Harvard ATS",
      desc: "Traditional single-column layout with classical typographic rules. 100% ATS parser compliant.",
      badge: "100% ATS Match"
    },
    {
      id: "studio",
      name: "Studio Grid",
      desc: "Asymmetric 2-column sidebar architecture. Balances technical breadth with deep project impact.",
      badge: "Balanced Grid"
    }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Template Archetype */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Article size={16} className="text-blue-400" />
          <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
            Template Architecture
          </h3>
        </div>
        <p className="text-[11px] text-zinc-500 mb-3">Choose a high-craft design archetype calibrated for your target role</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {templates.map(tpl => {
            const isSelected = (custom.template || "swiss") === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => updateCustom("template", tpl.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all select-none tactile-btn ${
                  isSelected
                    ? "bg-blue-950/30 border-blue-500 ring-1 ring-blue-500/50"
                    : "bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50"
                }`}
              >
                <div className="flex justify-between items-start mb-1.5">
                  <span className="font-bold text-xs text-zinc-100 flex items-center gap-1.5">
                    {tpl.name}
                    {isSelected && <CheckCircle size={14} weight="bold" className="text-blue-400" />}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                    {tpl.badge}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {tpl.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Color Consistency Lock */}
      <div className="border-t border-zinc-800/80 pt-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Palette size={16} className="text-blue-400" />
            <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
              Single Accent Color
            </h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
            Anti-Slop Color Lock
          </span>
        </div>
        <p className="text-[11px] text-zinc-500 mb-3">Locked to a single refined accent across headings, highlights, and borders</p>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {ACCENT_PRESETS.map(accent => {
            const isSelected = (custom.accentColor || "#2563eb") === accent.value;
            return (
              <button
                key={accent.value}
                type="button"
                onClick={() => updateCustom("accentColor", accent.value)}
                className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all tactile-btn ${
                  isSelected
                    ? "bg-zinc-800 border-zinc-600 ring-2 ring-blue-500/50"
                    : "bg-zinc-900/80 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full border border-black/20 shadow-sm"
                  style={{ backgroundColor: accent.value }}
                />
                <span className="text-[10px] font-medium text-zinc-300 text-center truncate w-full">
                  {accent.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Typography Font Pairing */}
      <div className="border-t border-zinc-800/80 pt-5">
        <div className="flex items-center gap-2 mb-2">
          <TextAa size={16} className="text-blue-400" />
          <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
            Typographic Scale & Family
          </h3>
        </div>
        <p className="text-[11px] text-zinc-500 mb-3">Premium web fonts with optical sizing and proportional tabular numerals</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {FONT_PRESETS.map(font => {
            const isSelected = (custom.fontFamily || "geist") === font.id;
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => updateCustom("fontFamily", font.id)}
                className={`p-3 rounded-xl border text-left flex justify-between items-center transition-all tactile-btn ${
                  isSelected
                    ? "bg-blue-950/30 border-blue-500 ring-1 ring-blue-500/50"
                    : "bg-zinc-900/80 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-zinc-200">
                    {font.name}
                  </div>
                  <div className="text-[10.5px] text-zinc-400 font-mono">
                    {font.subtitle}
                  </div>
                </div>
                {isSelected && <CheckCircle size={14} weight="bold" className="text-blue-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Density & Paper Format */}
      <div className="border-t border-zinc-800/80 pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <ArrowsVertical size={16} className="text-blue-400" />
            <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
              Spacing Density Dial
            </h3>
          </div>
          <p className="text-[11px] text-zinc-500 mb-2.5">Tweak to guarantee your resume fits cleanly onto one page</p>

          <div className="grid grid-cols-3 gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            {["compact", "balanced", "generous"].map(density => {
              const isSelected = (custom.spacingDensity || "balanced") === density;
              return (
                <button
                  key={density}
                  type="button"
                  onClick={() => updateCustom("spacingDensity", density)}
                  className={`py-1.5 text-xs font-medium rounded-lg capitalize transition-all select-none ${
                    isSelected
                      ? "bg-zinc-800 text-blue-400 shadow-sm border border-zinc-700"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {density}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Article size={16} className="text-blue-400" />
            <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
              Paper Specification
            </h3>
          </div>
          <p className="text-[11px] text-zinc-500 mb-2.5">Calibrate export geometry for global or North American print standards</p>

          <div className="grid grid-cols-2 gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            {[
              { id: "a4", label: "A4 (Global standard)" },
              { id: "letter", label: "US Letter (8.5 × 11)" }
            ].map(paper => {
              const isSelected = (custom.paperSize || "a4") === paper.id;
              return (
                <button
                  key={paper.id}
                  type="button"
                  onClick={() => updateCustom("paperSize", paper.id)}
                  className={`py-1.5 text-xs font-medium rounded-lg transition-all select-none ${
                    isSelected
                      ? "bg-zinc-800 text-blue-400 shadow-sm border border-zinc-700"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {paper.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
