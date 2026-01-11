// src/AdminPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { SiteConfig } from "./siteConfig";
import { loadConfig, saveConfig } from "./siteConfig";
import { useAuth } from "./AuthContext";

const AdminPage: React.FC = () => {
  const [form, setForm] = useState<SiteConfig>(loadConfig);
  const [saved, setSaved] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin-login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setForm(loadConfig());
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  const updateField =
    (field: keyof SiteConfig) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        setSaved(false);
      };

  const toggleBoolField =
    (field: keyof SiteConfig) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.checked }));
        setSaved(false);
      };

  const handleSave = () => {
    saveConfig(form);
    setSaved(true);
  };

  const skills = form.skillsCsv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-6xl w-full p-6 md:p-8">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-light">Admin - Profile &amp; Content</h1>
          <button
            onClick={handleLogout}
            className="text-xs uppercase tracking-widest text-zinc-500 hover:text-red-500 transition-colors"
            title="End authorized session"
          >
            End Session (Logout)
          </button>
        </div>
        <p className="text-gray-500 text-xs mb-6">
          Left: live preview. Right: edit fields. Save to update localStorage. Then you can go back
          to the portfolio.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* LEFT: LIVE PREVIEW */}
          <div className="border border-zinc-800 rounded-xl p-5 bg-gradient-to-b from-zinc-950 to-black">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-3">
              Live Preview
            </p>

            {/* Hero preview */}
            <section className="mb-10">
              <p className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-3">
                {form.heroRole || "Role / Title"}
              </p>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-tight mb-3">
                {form.heroName || "Your Name"}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {form.heroTagline || "Your hero tagline will appear here."}
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs text-gray-400">
                {form.linkedInUrl && <span className="opacity-80">LinkedIn</span>}
                {form.email && <span className="opacity-80">Email</span>}
                {form.githubUrl && <span className="opacity-80">GitHub</span>}
              </div>
            </section>

            {/* About preview */}
            <section className="mb-8">
              <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase mb-3">About</p>
              <h3 className="text-xl font-light mb-3 leading-snug">
                {form.aboutHeading || "About heading will be shown here"}
              </h3>
              <p className="text-[11px] text-gray-500 uppercase tracking-[0.2em] mb-2">
                Location · Experience
              </p>
              <p className="text-xs text-gray-400 mb-4">
                {form.aboutLocation || "Your location and experience line."}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed mb-3">
                {form.aboutP1 || "First about paragraph preview."}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                {form.aboutP2 || "Second about paragraph preview."}
              </p>
            </section>

            {/* Skills preview */}
            <section>
              <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase mb-3">
                Core Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 border border-gray-800 text-[11px] rounded-sm text-gray-300"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-gray-500">
                    Add comma-separated skills on the right to see them here.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT: FORM */}
          <div className="space-y-8">
            {/* Hero Section */}
            <section className="border border-zinc-800 rounded-lg p-4 space-y-4">
              <h2 className="text-lg font-light mb-2">Hero Section</h2>

              <label className="block text-gray-400 text-sm">
                Role / Title (small text above name)
                <input
                  className="mt-1 w-full bg-black border border-zinc-700 px-3 py-2 text-sm"
                  value={form.heroRole}
                  onChange={updateField("heroRole")}
                />
              </label>

              <label className="block text-gray-400 text-sm">
                Name (big heading)
                <input
                  className="mt-1 w-full bg-black border border-zinc-700 px-3 py-2 text-sm"
                  value={form.heroName}
                  onChange={updateField("heroName")}
                />
              </label>

              <label className="block text-gray-400 text-sm">
                Tagline
                <textarea
                  className="mt-1 w-full bg-black border border-zinc-700 px-3 py-2 text-sm min-h-[80px]"
                  value={form.heroTagline}
                  onChange={updateField("heroTagline")}
                />
              </label>

              <div className="grid md:grid-cols-3 gap-3">
                <label className="block text-gray-400 text-xs">
                  LinkedIn URL
                  <input
                    className="mt-1 w-full bg-black border border-zinc-700 px-3 py-2 text-sm"
                    value={form.linkedInUrl}
                    onChange={updateField("linkedInUrl")}
                  />
                </label>
                <label className="block text-gray-400 text-xs">
                  Email
                  <input
                    className="mt-1 w-full bg-black border border-zinc-700 px-3 py-2 text-sm"
                    value={form.email}
                    onChange={updateField("email")}
                  />
                </label>
                <label className="block text-gray-400 text-xs">
                  GitHub URL
                  <input
                    className="mt-1 w-full bg-black border border-zinc-700 px-3 py-2 text-sm"
                    value={form.githubUrl}
                    onChange={updateField("githubUrl")}
                  />
                </label>
              </div>
            </section>

            {/* About Section */}
            <section className="border border-zinc-800 rounded-lg p-4 space-y-4">
              <h2 className="text-lg font-light mb-2">About Section</h2>

              <label className="block text-gray-400 text-sm">
                Heading
                <input
                  className="mt-1 w-full bg-black border border-zinc-700 px-3 py-2 text-sm"
                  value={form.aboutHeading}
                  onChange={updateField("aboutHeading")}
                />
              </label>

              <label className="block text-gray-400 text-sm">
                Location / Experience line
                <input
                  className="mt-1 w-full bg-black border border-zinc-700 px-3 py-2 text-sm"
                  value={form.aboutLocation}
                  onChange={updateField("aboutLocation")}
                />
              </label>

              <label className="block text-gray-400 text-sm">
                Paragraph 1
                <textarea
                  className="mt-1 w-full bg-black border border-zinc-700 px-3 py-2 text-sm min-h-[80px]"
                  value={form.aboutP1}
                  onChange={updateField("aboutP1")}
                />
              </label>

              <label className="block text-gray-400 text-sm">
                Paragraph 2
                <textarea
                  className="mt-1 w-full bg-black border border-zinc-700 px-3 py-2 text-sm min-h-[80px]"
                  value={form.aboutP2}
                  onChange={updateField("aboutP2")}
                />
              </label>
            </section>

            {/* Skills */}
            <section className="border border-zinc-800 rounded-lg p-4 space-y-4">
              <h2 className="text-lg font-light mb-2">Skills (Hero / About)</h2>
              <label className="block text-gray-400 text-sm">
                Skills (comma-separated)
                <textarea
                  className="mt-1 w-full bg-black border border-zinc-700 px-3 py-2 text-sm min-h-[70px]"
                  value={form.skillsCsv}
                  onChange={updateField("skillsCsv")}
                />
              </label>
              <p className="text-xs text-gray-500">
                Example: Manual &amp; Regression Testing, Playwright + Cucumber, Cypress &amp; API
                Testing, Mobile App &amp; SDK Testing
              </p>
            </section>

            {/* Navigation visibility */}
            <section className="border border-zinc-800 rounded-lg p-4 space-y-3">
              <h2 className="text-lg font-light mb-1">Navigation Sections</h2>
              <p className="text-xs text-gray-500 mb-2">
                Control which sections should appear in your navbar / site (config is saved here;
                wiring in the main page can be done next).
              </p>

              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  className="accent-white"
                  checked={form.navShowExperience}
                  onChange={toggleBoolField("navShowExperience")}
                />
                Show Experience
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  className="accent-white"
                  checked={form.navShowProjects}
                  onChange={toggleBoolField("navShowProjects")}
                />
                Show Projects
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  className="accent-white"
                  checked={form.navShowCertificates}
                  onChange={toggleBoolField("navShowCertificates")}
                />
                Show Certificates
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  className="accent-white"
                  checked={form.navShowWork}
                  onChange={toggleBoolField("navShowWork")}
                />
                Show Work / Case Studies
              </label>
            </section>

            {/* Save + Go to portfolio */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleSave}
                className="px-6 py-2 border border-white hover:bg-white hover:text-black transition-all duration-300 text-sm"
              >
                Save Changes
              </button>

              <button
                type="button"
                disabled={!saved}
                onClick={() => navigate("/")}
                className={`px-6 py-2 text-sm transition-all duration-300 border ${saved
                    ? "border-emerald-400 text-emerald-300 hover:bg-emerald-400 hover:text-black"
                    : "border-zinc-700 text-zinc-600 cursor-not-allowed"
                  }`}
              >
                Go to Portfolio
              </button>

              {saved ? (
                <span className="text-xs text-emerald-400">
                  Saved. &quot;Go to Portfolio&quot; is now enabled.
                </span>
              ) : (
                <span className="text-xs text-gray-500">
                  Save first to enable &quot;Go to Portfolio&quot;.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
