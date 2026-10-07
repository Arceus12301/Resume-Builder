import React from "react";
import { X, CheckCircle, GraduationCap } from "@phosphor-icons/react";

export function AboutModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs no-print">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200 p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <GraduationCap size={20} weight="bold" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                About ResumeCraft
              </h2>
              <p className="text-xs text-slate-500">
                1st Year BSc.IT Web Development Project
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Description */}
        <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
          <p>
            Welcome! This is a simple, lightweight <strong>Online Resume Builder</strong> built by a <strong>1st Year BSc.IT Student</strong> using <strong>React</strong> and <strong>Tailwind CSS</strong>.
          </p>
          <p>
            It is designed to help students, freshers, and job seekers create clean, professional resumes quickly without complicated signups or watermarks.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5">
            <span className="font-semibold text-slate-800 block text-xs">Project Highlights:</span>
            <div className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle size={14} className="text-emerald-500" weight="bold" />
              <span>Real-time Live Preview that updates instantly as you type</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle size={14} className="text-emerald-500" weight="bold" />
              <span>Automatic local saving via browser LocalStorage API</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle size={14} className="text-emerald-500" weight="bold" />
              <span>One-click PDF download via browser print stylesheet</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <CheckCircle size={14} className="text-emerald-500" weight="bold" />
              <span>JSON Export & Import to backup or restore resumes anytime</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 font-mono">
            Technologies: React 19 · Vite · Tailwind CSS · Phosphor Icons · LocalStorage
          </p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold tactile-btn shadow-2xs"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
}
