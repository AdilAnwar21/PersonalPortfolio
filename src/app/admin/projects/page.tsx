import { getProjects, addProject, deleteProject } from "@/app/actions/project";
import { IProject } from "@/models/Project";

export default async function AdminProjects() {
  const projects: IProject[] = await getProjects();

  return (
    <div>
      <h1 className="text-3xl font-light mb-8">Projects</h1>
      
      <div className="mb-12 bg-card border border-border p-6 rounded-2xl">
        <h2 className="text-xl font-medium mb-6">Add New Project</h2>
        <form action={addProject} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="title" placeholder="Project Title" required className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 text-foreground" />
            <input name="slug" placeholder="Slug (e.g. my-project)" required className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 text-foreground" />
          </div>
          <textarea name="description" placeholder="Description" required rows={3} className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 text-foreground" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="category" className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 text-foreground">
              <option value="Freelance">Freelance</option>
              <option value="Personal">Personal</option>
            </select>
            <input name="tags" placeholder="Tags (comma separated)" className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 text-foreground" />
          </div>

          <div className="p-4 border border-border rounded-lg bg-background space-y-4">
            <div>
              <label className="block text-sm text-foreground/50 mb-2">Main Image Upload (Overrides URL)</label>
              <input type="file" name="mainImageFile" accept="image/*" className="w-full text-foreground/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-card file:text-foreground hover:file:bg-black/5 dark:hover:file:bg-white/5 cursor-pointer" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="mainImage" placeholder="Or enter Main Image URL" className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 text-foreground" />
              <input name="galleryImages" placeholder="Gallery Images URLs (comma separated)" className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 text-foreground" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="liveUrl" placeholder="Live URL (optional)" className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 text-foreground" />
            <input name="repoUrl" placeholder="Repo URL (optional)" className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 text-foreground" />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="featured" className="rounded bg-background border-border text-foreground" />
              <span className="text-foreground/50">Featured (stacking animation)</span>
            </label>
            <input name="order" type="number" placeholder="Order (0)" className="w-32 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/20 text-foreground" />
          </div>

          <button type="submit" className="px-6 py-2 bg-foreground text-background font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Save Project
          </button>
        </form>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-foreground/50 font-medium">Title</th>
              <th className="p-4 text-foreground/50 font-medium">Category</th>
              <th className="p-4 text-foreground/50 font-medium">Order</th>
              <th className="p-4 text-foreground/50 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const deleteAction = deleteProject.bind(null, String(project._id));
              return (
                <tr key={String(project._id)} className="border-b border-border hover:bg-black/5 dark:hover:bg-white/5">
                  <td className="p-4">{project.title}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${project.category === 'Freelance' ? 'bg-highlight-primary/10 text-highlight-primary' : 'bg-highlight-secondary/10 text-highlight-secondary'}`}>
                      {project.category}
                    </span>
                  </td>
                  <td className="p-4">{project.order}</td>
                  <td className="p-4">
                    <form action={deleteAction}>
                      <button type="submit" className="text-red-500 hover:text-red-400 text-sm">Delete</button>
                    </form>
                  </td>
                </tr>
              );
            })}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-foreground/50">No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
