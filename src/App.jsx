import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { ResumeForm } from "./components/ResumeForm";
import { ResumePreview } from "./components/ResumePreview";
import { Footer } from "./components/Footer";
import { AboutModal } from "./components/AboutModal";
import { INITIAL_RESUME_DATA, SAMPLE_STUDENT_DATA, BLANK_RESUME_DATA } from "./constants/initialData";
import { Sliders, Eye } from "@phosphor-icons/react";

const STORAGE_KEY = "craft_resume_clean_v4";

export default function App() {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to load saved resume from localStorage:", e);
    }
    return INITIAL_RESUME_DATA;
  });

  const [mobileTab, setMobileTab] = useState("form"); // 'form' | 'preview'
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Auto-save changes to localStorage so student work is never lost
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    } catch (e) {
      console.error("Local storage error:", e);
    }
  }, [resumeData]);

  const handleDataChange = (updated) => {
    setResumeData(updated);
  };

  const handleUpdateCustomization = (customization) => {
    setResumeData({
      ...resumeData,
      customization
    });
  };

  const handleLoadSample = () => {
    if (window.confirm("Load sample 1st Year BSc.IT student profile? Your current text will be replaced.")) {
      setResumeData(SAMPLE_STUDENT_DATA);
    }
  };

  const handleClear = () => {
    if (window.confirm("Clear all resume fields to start from scratch?")) {
      setResumeData(BLANK_RESUME_DATA);
    }
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const safeName = (resumeData.personalInfo?.fullName || "student_resume").toLowerCase().replace(/[^a-z0-9]/g, "_");
    link.download = `${safeName}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (imported) => {
    if (!imported || typeof imported !== "object") {
      alert("Invalid JSON format.");
      return;
    }
    setResumeData({
      ...INITIAL_RESUME_DATA,
      ...imported,
      customization: {
        ...INITIAL_RESUME_DATA.customization,
        ...(imported.customization || {})
      }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-100 text-slate-800 font-sans">
      {/* Navigation Header */}
      <Navbar
        onLoadSample={handleLoadSample}
        onClear={handleClear}
        onExportJson={handleExportJson}
        onImportJson={handleImportJson}
        onPrint={handlePrint}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Mobile Tab Switcher (Visible on phones/tablets only) */}
      <div className="no-print lg:hidden p-2 bg-white border-b border-slate-200 flex gap-2">
        <button
          type="button"
          onClick={() => setMobileTab("form")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            mobileTab === "form"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <Sliders size={14} weight="bold" />
          <span>Edit Details</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("preview")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            mobileTab === "preview"
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          <Eye size={14} weight="bold" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Main Split Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 flex flex-col lg:flex-row gap-5 items-start print:p-0 print:m-0 print:max-w-none print:w-full print:block">
        {/* Left Side: Form Editor (never printed) */}
        <section
          className={`w-full lg:w-5/12 no-print print:hidden ${
            mobileTab === "form" ? "block" : "hidden lg:block"
          }`}
        >
          <div className="sticky top-18 max-h-[calc(100dvh-6rem)] overflow-y-auto pr-1">
            <ResumeForm
              data={resumeData}
              onChange={handleDataChange}
            />
          </div>
        </section>

        {/* Right Side: Live Resume Preview (always printed) */}
        <section
          className={`w-full lg:w-7/12 print:block print:w-full print:m-0 print:p-0 ${
            mobileTab === "preview" ? "block" : "hidden lg:block"
          }`}
        >
          <div className="sticky top-18 max-h-[calc(100dvh-6rem)] flex flex-col print:static print:max-h-none print:overflow-visible">
            <ResumePreview
              data={resumeData}
              onUpdateCustomization={handleUpdateCustomization}
              onPrint={handlePrint}
            />
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <Footer />

      {/* Project Info Modal */}
      {isAboutOpen && (
        <AboutModal onClose={() => setIsAboutOpen(false)} />
      )}
    </div>
  );
}
