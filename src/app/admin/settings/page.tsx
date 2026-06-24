import { getSettings, updateSettings } from "@/app/actions/settings";
import { ISettings } from "@/models/Settings";

export default async function AdminSettings() {
  const settings: ISettings = await getSettings();

  return (
    <div>
      <h1 className="text-3xl font-light mb-8">Global Settings</h1>
      
      <div className="bg-card border border-border p-6 rounded-2xl max-w-2xl">
        <form action={updateSettings} className="space-y-6">
          <div>
            <label className="block text-sm text-foreground/50 mb-2">Hero Title</label>
            <input name="heroTitle" defaultValue={settings?.heroTitle} required className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground" />
          </div>
          
          <div>
            <label className="block text-sm text-foreground/50 mb-2">Hero Subtitle</label>
            <input name="heroSubtitle" defaultValue={settings?.heroSubtitle} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground" />
          </div>

          <div>
            <label className="block text-sm text-foreground/50 mb-2">About Text</label>
            <textarea name="aboutText" defaultValue={settings?.aboutText} required rows={5} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground" />
          </div>

          <div>
            <label className="block text-sm text-foreground/50 mb-2">Contact Email</label>
            <input name="contactEmail" defaultValue={settings?.contactEmail} type="email" required className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground" />
          </div>

          <div className="p-4 border border-border rounded-lg bg-background">
            <label className="block text-sm text-foreground/50 mb-2">Profile Photo Upload</label>
            <input type="file" name="profilePhoto" accept="image/*" className="w-full text-foreground/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-card file:text-foreground hover:file:bg-black/5 dark:hover:file:bg-white/5 cursor-pointer" />
            <p className="text-xs text-foreground/50 mt-2">Current URL: {settings?.profilePhotoUrl || "None"}</p>
            
            <div className="mt-4">
              <label className="block text-sm text-foreground/50 mb-2">Or enter Profile Photo URL manually</label>
              <input name="profilePhotoUrl" defaultValue={settings?.profilePhotoUrl} className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground" />
            </div>
          </div>

          <div className="p-4 border border-border rounded-lg bg-background">
            <label className="block text-sm text-foreground/50 mb-2">Resume PDF Upload (Overrides URL)</label>
            <input type="file" name="resumeFile" accept="application/pdf" className="w-full text-foreground/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-card file:text-foreground hover:file:bg-black/5 dark:hover:file:bg-white/5 cursor-pointer" />
            <p className="text-xs text-foreground/50 mt-2">Current URL: {settings?.resumePdfUrl || "None"}</p>
            
            <div className="mt-4">
              <label className="block text-sm text-foreground/50 mb-2">Or enter Resume PDF URL manually</label>
              <input name="resumePdfUrl" defaultValue={settings?.resumePdfUrl} className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-foreground/50 mb-2">Skills (Comma separated)</label>
            <textarea name="skills" defaultValue={settings?.skills?.join(", ")} rows={3} placeholder="React, Next.js, Tailwind..." className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground" />
          </div>

          <div>
            <label className="block text-sm text-foreground/50 mb-2">Social Links (JSON Format)</label>
            <textarea name="socialLinks" defaultValue={JSON.stringify(settings?.socialLinks || [], null, 2)} rows={4} className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground font-mono text-sm" />
          </div>

          <button type="submit" className="px-6 py-2 bg-foreground text-background font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
