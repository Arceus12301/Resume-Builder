import React, { useState } from "react";
import { calculateAtsScore, matchJobKeywords } from "../../utils/atsScorer";
import { CheckCircle, Warning, XCircle, ShieldCheck, Target, X } from "@phosphor-icons/react";

export function AtsAuditModal({ data, onClose }) {
  const [jobDescription, setJobDescription] = useState("");
  const atsResult = calculateAtsScore(data);
  const matchResult = matchJobKeywords(data, jobDescription);

  const getScoreColor = (score) => {
    if (score >= 85) return "text-emerald-400 border-emerald-500/50 bg-emerald-950/40";
    if (score >= 70) return "text-amber-400 border-amber-500/50 bg-amber-950/40";
    return "text-red-400 border-red-500/50 bg-red-950/40";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto no-print">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-6 md:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <ShieldCheck size={24} weight="bold" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                Resume Review & ATS Checker
              </h2>
              <p className="text-xs text-zinc-400">
                Checks your resume for essential details, project metrics, action verbs, and clean formatting
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-100 rounded-xl hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Score Card Hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-2xl border flex flex-col items-center justify-center text-center ${getScoreColor(atsResult.score)}`}>
            <div className="text-4xl font-extrabold font-mono tracking-tight">
              {atsResult.score}
              <span className="text-xl font-normal opacity-70">/100</span>
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider mt-1">
              Resume Readiness Score
            </div>
            <div className="text-[11px] opacity-80 mt-0.5">
              {atsResult.score >= 80 ? "Ready for Internship & Job Applications" : "A Few Improvements Recommended"}
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Quantified Points</span>
              <div className="text-2xl font-bold font-mono text-zinc-100 mt-1">
                {atsResult.metricCount} <span className="text-xs font-normal text-zinc-500">/ {atsResult.totalBullets} bullets</span>
              </div>
            </div>
            <div className="text-[11px] text-zinc-400">
              {atsResult.totalBullets > 0 ? Math.round((atsResult.metricCount / atsResult.totalBullets) * 100) : 0}% of project and work points mention hard numbers (users, records, or marks)
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Clean Typography</span>
              <div className="text-2xl font-bold font-mono text-zinc-100 mt-1 flex items-center gap-1.5">
                {atsResult.emDashCount === 0 ? (
                  <span className="text-emerald-400 flex items-center gap-1 text-lg">
                    <CheckCircle size={20} weight="bold" /> Zero Formatting Issues
                  </span>
                ) : (
                  <span className="text-red-400 flex items-center gap-1 text-lg">
                    <XCircle size={20} weight="bold" /> {atsResult.emDashCount} Em-Dashes Found
                  </span>
                )}
              </div>
            </div>
            <div className="text-[11px] text-zinc-400">
              Uses clean hyphens and standard punctuation safe for company scanners
            </div>
          </div>
        </div>

        {/* Audit Details Checklist */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
            Heuristic Audit Findings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {atsResult.audits.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-200">{item.title}</span>
                  {item.status === "pass" && (
                    <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                      <CheckCircle size={13} weight="bold" /> Pass
                    </span>
                  )}
                  {item.status === "warning" && (
                    <span className="text-[11px] font-medium text-amber-400 flex items-center gap-1">
                      <Warning size={13} weight="bold" /> Tune
                    </span>
                  )}
                  {item.status === "fail" && (
                    <span className="text-[11px] font-medium text-red-400 flex items-center gap-1">
                      <XCircle size={13} weight="bold" /> Attention
                    </span>
                  )}
                </div>
                <p className="text-[11.5px] text-zinc-400 leading-normal">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Job Description Keyword Matcher */}
        <div className="border-t border-zinc-800 pt-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-blue-400" />
              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                Target Job Description Keyword Scanner
              </h3>
            </div>
            {jobDescription && (
              <span className="text-xs font-mono font-bold text-blue-400">
                Match Rate: {matchResult.score}%
              </span>
            )}
          </div>
          <p className="text-[11px] text-zinc-500">
            Paste the job requirements from your target company below to scan for keyword density and missing ATS signals
          </p>

          <textarea
            rows={3}
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            placeholder="Paste internship or job requirements here (e.g. 'Looking for an enthusiastic student or junior developer with React, JavaScript, MySQL, Git, and problem solving skills...')"
            className="w-full p-3 text-xs bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
          />

          {jobDescription.trim().length > 20 && (
            <div className="space-y-2 pt-1">
              {matchResult.matched.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-emerald-400 mb-1">
                    Matching Keywords Detected in Your Resume ({matchResult.matched.length})
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {matchResult.matched.map(kw => (
                      <span key={kw} className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 font-mono">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {matchResult.missing.length > 0 && (
                <div className="pt-1">
                  <div className="text-[11px] font-semibold text-amber-400 mb-1">
                    Target Keywords Missing From Your Resume ({matchResult.missing.length})
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {matchResult.missing.slice(0, 15).map(kw => (
                      <span key={kw} className="text-[11px] px-2 py-0.5 rounded bg-amber-950/40 border border-amber-800/60 text-amber-300 font-mono">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Close */}
        <div className="flex justify-end pt-2 border-t border-zinc-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-semibold tactile-btn"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
}
