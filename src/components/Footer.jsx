import { GraduationCap } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="no-print bg-white border-t border-slate-200 py-3 px-4 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 font-medium text-slate-600">
          <GraduationCap size={16} className="text-blue-600" weight="bold" />
          <span>ResumeCraft · 1st Year BSc.IT Web Tech Project</span>
        </div>
        <div className="text-[11px] text-slate-400">
          100% Free · No Sign-in Required · Runs completely in your browser
        </div>
      </div>
    </footer>
  );
}
