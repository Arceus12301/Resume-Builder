import React, { useRef, useState } from "react";
import { SwissTemplate } from "../templates/SwissTemplate";
import { LinearTemplate } from "../templates/LinearTemplate";
import { ExecutiveTemplate } from "../templates/ExecutiveTemplate";
import { StudioTemplate } from "../templates/StudioTemplate";
import { MagnifyingGlassPlus, MagnifyingGlassMinus, Printer, Check } from "@phosphor-icons/react";

export function ResumePreview({ data }) {
  const [zoom, setZoom] = useState(85);
  const containerRef = useRef(null);

  const templateMap = {
    swiss: SwissTemplate,
    linear: LinearTemplate,
    executive: ExecutiveTemplate,
    studio: StudioTemplate
  };

  const SelectedTemplateComponent = templateMap[data.customization?.template] || SwissTemplate;

  const fontClass = {
    geist: "font-sans",
    jakarta: "font-['Plus_Jakarta_Sans',sans-serif]",
    outfit: "font-['Outfit',sans-serif]",
    cormorant: "font-['Cormorant_Garamond',serif]"
  }[data.customization?.fontFamily || "geist"];

  const paperSizeClass = data.customization?.paperSize === "letter"
    ? "w-[8.5in] min-h-[11in]"
    : "w-[210mm] min-h-[297mm]";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950/60 rounded-3xl border border-zinc-800/80 overflow-hidden select-none">
      {/* Top Preview Controls Bar (no-print) */}
      <div className="no-print p-3 border-b border-zinc-800/80 bg-zinc-900/60 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-zinc-300">Live Preview</span>
          <span className="text-zinc-600 font-mono hidden sm:inline">·</span>
          <span className="text-zinc-500 font-mono capitalize hidden sm:inline">
            {data.customization?.template || "swiss"} Template ({data.customization?.paperSize?.toUpperCase() || "A4"})
          </span>
        </div>

        {/* Zoom Controls & Print Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-0.5 font-mono text-[11px]">
            <button
              type="button"
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="p-1 hover:text-white text-zinc-400 rounded-lg hover:bg-zinc-800"
              title="Zoom out"
            >
              <MagnifyingGlassMinus size={14} />
            </button>
            <span className="px-2 text-zinc-300 font-medium">{zoom}%</span>
            <button
              type="button"
              onClick={() => setZoom(Math.min(130, zoom + 10))}
              className="p-1 hover:text-white text-zinc-400 rounded-lg hover:bg-zinc-800"
              title="Zoom in"
            >
              <MagnifyingGlassPlus size={14} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setZoom(85)}
            className="px-2.5 py-1 text-[11px] font-medium text-zinc-400 hover:text-zinc-100 bg-zinc-800/60 hover:bg-zinc-800 rounded-xl border border-zinc-700/80 tactile-btn"
          >
            Fit
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-xs tactile-btn shadow-sm"
          >
            <Printer size={14} weight="bold" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-4 md:p-8 flex justify-center items-start bg-zinc-950/90"
      >
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
            transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
          className="transition-transform"
        >
          {/* Printable Page Container */}
          <div
            id="resume-print-area"
            className={`${paperSizeClass} ${fontClass} bg-white shadow-2xl rounded-sm print:shadow-none print:rounded-none relative text-zinc-900 border border-zinc-200/50 print:border-none`}
          >
            <SelectedTemplateComponent data={data} />
          </div>
        </div>
      </div>

      {/* Footer Status Bar (no-print) */}
      <div className="no-print px-4 py-2 bg-zinc-900/60 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
        <div className="flex items-center gap-2">
          <Check size={12} className="text-emerald-400" />
          <span>Ready for high-resolution vector PDF export via Chrome/Edge print engine</span>
        </div>
        <div className="hidden md:inline">
          Dimensions: {data.customization?.paperSize === "letter" ? "8.5 x 11 in" : "210 x 297 mm"}
        </div>
      </div>
    </div>
  );
}
