import React from "react";
import { Plus, Trash } from "@phosphor-icons/react";

export function CertificationsSection({ data, onChange }) {
  const certs = data.certifications || [];

  const updateCerts = (newCerts) => {
    onChange({
      ...data,
      certifications: newCerts
    });
  };

  const addCert = () => {
    const newId = `cert-${Date.now()}`;
    const newEntry = {
      id: newId,
      name: "Certification Name",
      issuer: "Issuing Organization",
      issueDate: "2023",
      url: ""
    };
    updateCerts([...certs, newEntry]);
  };

  const removeCert = (id) => {
    updateCerts(certs.filter(c => c.id !== id));
  };

  const updateItem = (id, field, value) => {
    const sanitized = typeof value === "string" ? value.replace(/[—–]/g, "-") : value;
    updateCerts(
      certs.map(c => (c.id === id ? { ...c, [field]: sanitized } : c))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Certifications & Honors ({certs.length})
          </h3>
          <p className="text-[11px] text-zinc-500">Industry credentials, cloud certifications, and technical licenses</p>
        </div>
        <button
          type="button"
          onClick={addCert}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium tactile-btn shadow-sm"
        >
          <Plus size={14} weight="bold" />
          <span>Add Credential</span>
        </button>
      </div>

      <div className="space-y-3">
        {certs.map((cert, idx) => (
          <div key={cert.id} className="p-3.5 rounded-2xl border border-zinc-800 bg-zinc-900/90 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-zinc-400">Credential #{idx + 1}</span>
              <button
                type="button"
                onClick={() => removeCert(cert.id)}
                className="p-1 text-zinc-400 hover:text-red-400 rounded hover:bg-zinc-800"
                title="Remove certification"
              >
                <Trash size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                  Credential Name
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={e => updateItem(cert.id, "name", e.target.value)}
                  placeholder="AWS Solutions Architect"
                  className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                  Issuer
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={e => updateItem(cert.id, "issuer", e.target.value)}
                  placeholder="Amazon Web Services"
                  className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1 uppercase tracking-wider">
                  Year
                </label>
                <input
                  type="text"
                  value={cert.issueDate || ""}
                  onChange={e => updateItem(cert.id, "issueDate", e.target.value)}
                  placeholder="2023"
                  className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-700/80 rounded-lg text-zinc-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
