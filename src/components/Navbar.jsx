import React, { useRef } from "react";
import { 
  FileText, Printer, ArrowClockwise, Sparkle, 
  DownloadSimple, UploadSimple, Info 
} from "@phosphor-icons/react";

export function Navbar({ 
  onLoadSample, 
  onClear, 
  onExportJson, 
  onImportJson, 
  onPrint, 
  onOpenAbout 
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
    <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand & Student Project Tag */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
            <FileText size={20} weight="bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-slate-900 tracking-tight">
                ResumeCraft
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                BSc.IT Web Project
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Free Online Resume Builder · Made with React & Tailwind CSS
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Load Sample Button */}
          <button
            type="button"
            onClick={onLoadSample}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 rounded-lg transition-colors tactile-btn"
            title="Load sample student profile"
          >
            <Sparkle size={14} className="text-amber-500" weight="fill" />
            <span>Load Sample</span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 border border-slate-300/80 rounded-lg transition-colors tactile-btn"
            title="Clear form"
          >
            <ArrowClockwise size={13} />
            <span className="hidden sm:inline">Clear</span>
          </button>

          {/* Import / Export File Actions */}
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
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 rounded-lg transition-colors tactile-btn"
            title="Import saved resume JSON"
          >
            <UploadSimple size={13} />
            <span className="hidden sm:inline">Import</span>
          </button>

          <button
            type="button"
            onClick={onExportJson}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 rounded-lg transition-colors tactile-btn"
            title="Download resume as JSON"
          >
            <DownloadSimple size={13} />
            <span className="hidden sm:inline">Save JSON</span>
          </button>

          {/* About Project Info */}
          <button
            type="button"
            onClick={onOpenAbout}
            className="p-1.5 text-slate-500 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 border border-slate-300/80 rounded-lg transition-colors tactile-btn"
            title="About this BSc.IT project"
          >
            <Info size={15} />
          </button>

          {/* Primary Action: Print PDF */}
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors tactile-btn ml-1"
          >
            <Printer size={15} weight="bold" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}
