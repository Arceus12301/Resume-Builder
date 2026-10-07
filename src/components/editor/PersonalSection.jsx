import React from "react";
import { User, IdentificationCard, EnvelopeSimple, Phone, MapPin, Globe, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

export function PersonalSection({ data, onChange }) {
  const info = data.personalInfo || {};

  const updateField = (field, value) => {
    // Anti-slop: sanitize any accidental em-dashes
    const sanitized = value.replace(/[—–]/g, "-");
    onChange({
      ...data,
      personalInfo: {
        ...info,
        [field]: sanitized
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
            Full Name <span className="text-blue-400">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
              <User size={15} />
            </span>
            <input
              id="fullName"
              type="text"
              value={info.fullName || ""}
              onChange={e => updateField("fullName", e.target.value)}
              placeholder="e.g. Alex Mercer"
              className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="jobTitle" className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
            Target Job Title <span className="text-blue-400">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
              <IdentificationCard size={15} />
            </span>
            <input
              id="jobTitle"
              type="text"
              value={info.jobTitle || ""}
              onChange={e => updateField("jobTitle", e.target.value)}
              placeholder="e.g. Staff Frontend Architect"
              className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
            Email Address <span className="text-blue-400">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
              <EnvelopeSimple size={15} />
            </span>
            <input
              id="email"
              type="email"
              value={info.email || ""}
              onChange={e => updateField("email", e.target.value)}
              placeholder="alex@domain.com"
              className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
            Phone Number
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
              <Phone size={15} />
            </span>
            <input
              id="phone"
              type="tel"
              value={info.phone || ""}
              onChange={e => updateField("phone", e.target.value)}
              placeholder="+1 (415) 890-2341"
              className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono"
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
            Location (City, State / Remote)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
              <MapPin size={15} />
            </span>
            <input
              id="location"
              type="text"
              value={info.location || ""}
              onChange={e => updateField("location", e.target.value)}
              placeholder="San Francisco, CA"
              className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="website" className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
            Portfolio / Website
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
              <Globe size={15} />
            </span>
            <input
              id="website"
              type="url"
              value={info.website || ""}
              onChange={e => updateField("website", e.target.value)}
              placeholder="https://yourname.dev"
              className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-xs"
            />
          </div>
        </div>

        <div>
          <label htmlFor="github" className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
            GitHub
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
              <GithubLogo size={15} />
            </span>
            <input
              id="github"
              type="text"
              value={info.github || ""}
              onChange={e => updateField("github", e.target.value)}
              placeholder="github.com/username"
              className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-xs"
            />
          </div>
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
            LinkedIn
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
              <LinkedinLogo size={15} />
            </span>
            <input
              id="linkedin"
              type="text"
              value={info.linkedin || ""}
              onChange={e => updateField("linkedin", e.target.value)}
              placeholder="linkedin.com/in/username"
              className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
