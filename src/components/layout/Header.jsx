import React, { useRef } from "react";
import { 
  FileText, DownloadSimple, UploadSimple, ArrowClockwise, 
  Printer, ShieldCheck, Sparkle, CaretDown 
} from "@phosphor-icons/react";
import { ROLE_PRESETS } from "../../constants/initialData";

export function Header({ 
  resumeData, 
  onLoadPreset, 
  onReset, 
  onExportJson, 
  onImportJson, 
  atsScore, 
  onOpenAtsModal 
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        onImportJson(parsed);
      } catch {
        alert("Invalid JSON resume file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <header className="no-print bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80 sticky top-0 z-40 px-4 lg:px-6 py-3">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <FileText size={18} weight="bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-sm text-zinc-100 font-sans">
                CraftResume
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800/80">
                BSc.IT Edition
              </span>
              <span className="text-zinc-500 font-mono text-[11px] hidden xl:inline">
                · {resumeData?.personalInfo?.fullName || "Student Draft"}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Simple, clean resume maker for students and freshers · Built with React & Tailwind
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Sample Profiles Dropdown */}
          <div className="relative group">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl tactile-btn"
            >
              <Sparkle size={13} className="text-amber-400" />
              <span>Sample Profiles</span>
              <CaretDown size={12} className="text-zinc-500" />
            </button>
            <div className="absolute left-0 mt-1.5 w-64 bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl p-1.5 hidden group-hover:block z-50">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider px-2 py-1">
                Student & Fresher Presets
              </div>
              {ROLE_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onLoadPreset(preset.data)}
                  className="w-full text-left px-2.5 py-2 rounded-xl text-xs hover:bg-zinc-800 text-zinc-200 transition-colors"
                >
                  <div className="font-semibold text-zinc-100">{preset.title}</div>
                  <div className="text-[10.5px] text-zinc-400 line-clamp-1">{preset.summary}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Import / Export JSON */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl tactile-btn"
            title="Import saved resume JSON"
          >
            <UploadSimple size={13} />
            <span className="hidden sm:inline">Import</span>
          </button>

          <button
            type="button"
            onClick={onExportJson}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl tactile-btn"
            title="Download resume data as JSON"
          >
            <DownloadSimple size={13} />
            <span className="hidden sm:inline">Save JSON</span>
          </button>

          <button
            type="button"
            onClick={onReset}
            className="p-1.5 text-zinc-400 hover:text-red-400 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl tactile-btn"
            title="Reset to blank template"
          >
            <ArrowClockwise size={14} />
          </button>

          <div className="h-4 w-[1px] bg-zinc-800 mx-1 hidden md:block" />

          {/* ATS Resume Score Badge */}
          <button
            type="button"
            onClick={onOpenAtsModal}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl text-zinc-100 tactile-btn"
            title="Check resume quality tips"
          >
            <ShieldCheck size={16} className={atsScore >= 80 ? "text-emerald-400" : "text-amber-400"} weight="bold" />
            <span>Resume Score:</span>
            <span className={`font-mono px-1.5 py-0.2 rounded text-[11px] ${
              atsScore >= 80 ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-amber-950 text-amber-300 border border-amber-800"
            }`}>
              {atsScore} / 100
            </span>
          </button>

          {/* Primary Action: Print / PDF */}
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl tactile-btn shadow-md shadow-blue-600/20"
          >
            <Printer size={15} weight="bold" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}
