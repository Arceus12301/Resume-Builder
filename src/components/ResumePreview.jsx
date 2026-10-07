import React, { useState } from "react";
import { SwissTemplate } from "./templates/SwissTemplate";
import { LinearTemplate } from "./templates/LinearTemplate";
import { ExecutiveTemplate } from "./templates/ExecutiveTemplate";
import { StudioTemplate } from "./templates/StudioTemplate";
import { ACCENT_PRESETS } from "../constants/initialData";
import { 
  Printer, MagnifyingGlassPlus, MagnifyingGlassMinus, 
  Palette, Article 
} from "@phosphor-icons/react";

export function ResumePreview({ data, onUpdateCustomization, onPrint }) {
  const [zoom, setZoom] = useState(85);

  const templateMap = {
    swiss: SwissTemplate,
    linear: LinearTemplate,
    executive: ExecutiveTemplate,
    studio: StudioTemplate
  };

  const currentTemplate = data.customization?.template || "swiss";
  const SelectedTemplateComponent = templateMap[currentTemplate] || SwissTemplate;

  const currentAccent = data.customization?.accentColor || "#2563eb";

  const changeTemplate = (tpl) => {
    onUpdateCustomization({
      ...data.customization,
      template: tpl
    });
  };

  const changeAccent = (color) => {
    onUpdateCustomization({
      ...data.customization,
      accentColor: color
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-200/70 rounded-2xl border border-slate-300/80 overflow-hidden shadow-2xs">
      {/* Top Preview Controls Bar (no-print) */}
      <div className="no-print bg-white border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
        {/* Template Style Selector */}
        <div className="flex items-center gap-2">
          <Article size={15} className="text-blue-600" />
          <span className="font-semibold text-slate-700 hidden sm:inline">Template:</span>
          <select
            value={currentTemplate}
            onChange={e => changeTemplate(e.target.value)}
            className="px-2 py-1 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <option value="swiss">Modern Clean (Recommended)</option>
            <option value="linear">Tech Linear (Developer)</option>
            <option value="executive">Classic Academic (Traditional)</option>
            <option value="studio">Two-Column (Sidebar)</option>
          </select>
        </div>

        {/* Color Theme Selector */}
        <div className="flex items-center gap-1.5">
          <Palette size={15} className="text-slate-500 hidden sm:inline" />
          <span className="font-semibold text-slate-700 text-xs hidden md:inline">Color:</span>
          <div className="flex items-center gap-1">
            {ACCENT_PRESETS.map(preset => (
              <button
                key={preset.value}
                type="button"
                onClick={() => changeAccent(preset.value)}
                className={`w-4.5 h-4.5 rounded-full border transition-all ${
                  currentAccent === preset.value
                    ? "ring-2 ring-blue-500 scale-110 border-white"
                    : "border-black/20 hover:scale-105"
                }`}
                style={{ backgroundColor: preset.value }}
                title={preset.name}
              />
            ))}
          </div>
        </div>

        {/* Zoom & Print */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 border border-slate-300 rounded-lg p-0.5 text-[11px] font-mono">
            <button
              type="button"
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="p-1 hover:text-slate-900 text-slate-500 rounded hover:bg-slate-200"
              title="Zoom out"
            >
              <MagnifyingGlassMinus size={13} />
            </button>
            <span className="px-1.5 text-slate-700 font-medium">{zoom}%</span>
            <button
              type="button"
              onClick={() => setZoom(Math.min(120, zoom + 10))}
              className="p-1 hover:text-slate-900 text-slate-500 rounded hover:bg-slate-200"
              title="Zoom in"
            >
              <MagnifyingGlassPlus size={13} />
            </button>
          </div>

          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-xs shadow-2xs transition-colors tactile-btn"
          >
            <Printer size={13} weight="bold" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Live Document Canvas */}
      <div className="flex-1 overflow-auto p-4 md:p-6 flex justify-center items-start bg-slate-200/60 print:p-0 print:m-0 print:bg-white print:overflow-visible">
        <div
          className="print-zoom-reset"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top center",
            transition: "transform 0.15s ease-out"
          }}
        >
          {/* Printable A4 Paper */}
          <div
            id="resume-print-area"
            className="w-[210mm] min-h-[297mm] bg-white shadow-md rounded-sm border border-slate-300/80 text-slate-900 print:shadow-none print:border-none print:m-0 print:p-0"
          >
            <SelectedTemplateComponent data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
