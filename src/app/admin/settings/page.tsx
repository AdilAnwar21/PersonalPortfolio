import { getSettings, updateSettings } from "@/app/actions/settings";
import { ISettings } from "@/models/Settings";

const inputCls = "w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-highlight-primary/30 text-foreground text-sm placeholder:text-foreground/60 transition-all";
const labelCls = "block text-xs font-semibold text-foreground/80 mb-1.5 uppercase tracking-wide";

export default async function AdminSettings() {
  const settings: ISettings = await getSettings();

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <p className="text-xs uppercase tracking-widest text-highlight-primary font-semibold mb-1">Configuration</p>
        <p className="text-foreground/80 text-sm">Control how your portfolio looks and what information it shows.</p>
      </div>

      <form action={updateSettings} className="space-y-6">

        {/* ── Identity ── */}
        <section className="p-6 bg-card border border-border rounded-2xl space-y-5">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-highlight-primary/10 flex items-center justify-center text-highlight-primary text-xs">👤</span>
            Hero Identity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Hero Title (your name)</label>
              <input name="heroTitle" defaultValue={settings?.heroTitle} required placeholder="Your Name" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Hero Subtitle / Role</label>
              <input name="heroSubtitle" defaultValue={settings?.heroSubtitle} placeholder="Full Stack Developer" className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>About Text</label>
            <textarea name="aboutText" defaultValue={settings?.aboutText} required rows={4} placeholder="Tell your story…" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Contact Email</label>
            <input name="contactEmail" defaultValue={settings?.contactEmail} type="email" required placeholder="hello@example.com" className={inputCls} />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <input 
              type="checkbox" 
              name="availableForWork" 
              defaultChecked={settings?.availableForWork ?? true}
              id="availableForWork"
              value="true"
              className="w-5 h-5 accent-highlight-primary bg-background border-border rounded" 
            />
            <label htmlFor="availableForWork" className="text-sm font-semibold text-foreground/90 cursor-pointer select-none">
              Available for work (Shows pulsing badge on landing page)
            </label>
          </div>
        </section>

        {/* ── Profile Photo ── */}
        <section className="p-6 bg-card border border-border rounded-2xl space-y-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-highlight-primary/10 flex items-center justify-center text-highlight-primary text-xs">📸</span>
            Profile Photo
          </h2>
          {settings?.profilePhotoUrl && (
            <div className="flex items-center gap-4 p-3 bg-background rounded-xl border border-border">
              <img src={settings.profilePhotoUrl} alt="Current profile" className="w-16 h-16 rounded-xl object-cover border border-border" />
              <div>
                <p className="text-xs font-medium text-foreground">Current photo</p>
                <p className="text-xs text-foreground/70 truncate max-w-xs">{settings.profilePhotoUrl}</p>
              </div>
            </div>
          )}
          <div>
            <label className={labelCls}>Upload new photo (up to 10 MB)</label>
            <input type="file" name="profilePhoto" accept="image/*" className="w-full text-sm text-foreground/80 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-highlight-primary/10 file:text-highlight-primary hover:file:bg-highlight-primary/20 cursor-pointer transition-all" />
          </div>
          <div>
            <label className={labelCls}>Or enter URL</label>
            <input name="profilePhotoUrl" defaultValue={settings?.profilePhotoUrl} placeholder="https://…" className={inputCls} />
          </div>
        </section>

        {/* ── Resume ── */}
        <section className="p-6 bg-card border border-border rounded-2xl space-y-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-highlight-primary/10 flex items-center justify-center text-highlight-primary text-xs">📄</span>
            Resume / CV
          </h2>
          {settings?.resumePdfUrl && (
            <div className="flex items-center justify-between p-3 bg-background rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 text-sm">PDF</div>
                <div>
                  <p className="text-xs font-medium text-foreground">Resume uploaded</p>
                  <p className="text-xs text-foreground/70 truncate max-w-xs">{settings.resumePdfUrl}</p>
                </div>
              </div>
              <a href={settings.resumePdfUrl} target="_blank" className="text-xs text-highlight-primary hover:underline">View →</a>
            </div>
          )}
          <div>
            <label className={labelCls}>Upload PDF (up to 10 MB)</label>
            <input type="file" name="resumeFile" accept="application/pdf" className="w-full text-sm text-foreground/80 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-highlight-primary/10 file:text-highlight-primary hover:file:bg-highlight-primary/20 cursor-pointer transition-all" />
          </div>
          <div>
            <label className={labelCls}>Or enter PDF URL</label>
            <input name="resumePdfUrl" defaultValue={settings?.resumePdfUrl} placeholder="https://…" className={inputCls} />
          </div>
        </section>

        {/* ── Skills ── */}
        <section className="p-6 bg-card border border-border rounded-2xl space-y-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-highlight-primary/10 flex items-center justify-center text-highlight-primary text-xs">⚡</span>
            Skills
          </h2>
          <div>
            <label className={labelCls}>Skills (comma separated)</label>
            <textarea
              name="skills"
              defaultValue={settings?.skills?.join(", ")}
              rows={3}
              placeholder="React, Next.js, TypeScript, Node.js, MongoDB, Figma…"
              className={inputCls}
            />
            <p className="text-xs text-foreground/70 mt-1.5">These appear in the About section skill tags.</p>
          </div>
        </section>

        {/* ── Social Links ── */}
        <section className="p-6 bg-card border border-border rounded-2xl space-y-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-highlight-primary/10 flex items-center justify-center text-highlight-primary text-xs">🔗</span>
            Social Links
          </h2>
          <div>
            <label className={labelCls}>Social Links (JSON)</label>
            <textarea
              name="socialLinks"
              defaultValue={JSON.stringify(settings?.socialLinks || [], null, 2)}
              rows={6}
              className={`${inputCls} font-mono`}
            />
            <div className="mt-2 p-3 bg-background/50 rounded-lg border border-border/50">
              <p className="text-xs font-medium text-foreground/80 mb-1">Format example:</p>
              <pre className="text-xs text-foreground/70 font-mono leading-relaxed">{`[
  { "platform": "github", "url": "https://github.com/username" },
  { "platform": "linkedin", "url": "https://linkedin.com/in/username" },
  { "platform": "instagram", "url": "https://instagram.com/username" }
]`}</pre>
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-full py-4 bg-transparent border border-foreground text-foreground font-semibold rounded-xl hover:bg-foreground hover:text-background transition-colors duration-300 text-sm"
        >
          Save All Settings
        </button>
      </form>
    </div>
  );
}
