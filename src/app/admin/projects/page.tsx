"use client";

import { useEffect, useState, useTransition } from "react";
import { getProjects, addProject, deleteProject, updateProject } from "@/app/actions/project";
import { IProject } from "@/models/Project";

const inputCls = "w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/30 text-foreground text-sm";
const labelCls = "block text-xs text-foreground/50 mb-1 font-medium uppercase tracking-wide";

function ProjectForm({
  initial,
  onSubmit,
  submitLabel,
  isPending,
}: {
  initial?: Partial<IProject>;
  onSubmit: (fd: FormData) => void;
  submitLabel: string;
  isPending: boolean;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(new FormData(e.currentTarget));
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Title *</label>
          <input name="title" defaultValue={initial?.title} placeholder="Project Title" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Slug *</label>
          <input name="slug" defaultValue={initial?.slug} placeholder="my-project" required className={inputCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Description *</label>
        <textarea name="description" defaultValue={initial?.description} placeholder="Short description…" required rows={3} className={inputCls} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Category</label>
          <select name="category" defaultValue={initial?.category || "Personal"} className={inputCls}>
            <option value="Freelance">Freelance</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Tags (comma separated)</label>
          <input name="tags" defaultValue={initial?.tags?.join(", ")} placeholder="React, Node.js…" className={inputCls} />
        </div>
      </div>

      {/* Image */}
      <div className="p-4 border border-border rounded-xl bg-background/50 space-y-3">
        <div>
          <label className={labelCls}>Main Image — upload file (up to 10 MB)</label>
          <input type="file" name="mainImageFile" accept="image/*" className="w-full text-sm text-foreground/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-card file:text-foreground hover:file:opacity-80 cursor-pointer" />
        </div>
        <div>
          <label className={labelCls}>Or enter image URL</label>
          <input name="mainImage" defaultValue={initial?.mainImage} placeholder="https://…" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Gallery URLs (comma separated)</label>
          <input name="galleryImages" defaultValue={initial?.galleryImages?.join(", ")} placeholder="https://…, https://…" className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Live URL</label>
          <input name="liveUrl" defaultValue={initial?.liveUrl} placeholder="https://…" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Repo URL</label>
          <input name="repoUrl" defaultValue={initial?.repoUrl} placeholder="https://github.com/…" className={inputCls} />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-foreground/70">
          <input type="checkbox" name="featured" defaultChecked={initial?.featured} className="accent-highlight-primary" />
          Featured project
        </label>
        <div>
          <label className={labelCls}>Order</label>
          <input name="order" type="number" defaultValue={initial?.order ?? 0} className="w-28 px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground" />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-2.5 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
      >
        {isPending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const load = () => {
    startTransition(async () => {
      const data = await getProjects();
      setProjects(data);
    });
  };

  useEffect(() => { load(); }, []);

  const handleAdd = (fd: FormData) => {
    startTransition(async () => {
      await addProject(fd);
      load();
    });
  };

  const handleUpdate = (id: string, fd: FormData) => {
    startTransition(async () => {
      await updateProject(id, fd);
      setEditingId(null);
      load();
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this project?")) return;
    startTransition(async () => {
      await deleteProject(id);
      load();
    });
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-light">Projects</h1>

      {/* Add new */}
      <div className="bg-card border border-border p-6 rounded-2xl">
        <h2 className="text-lg font-semibold mb-6 text-foreground/80">➕ Add New Project</h2>
        <ProjectForm onSubmit={handleAdd} submitLabel="Create Project" isPending={isPending} />
      </div>

      {/* Existing projects */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground/80">Existing Projects ({projects.length})</h2>
        {projects.length === 0 && (
          <div className="p-8 text-center text-foreground/40 bg-card rounded-2xl border border-border">No projects yet.</div>
        )}
        {projects.map((project) => (
          <div key={String(project._id)} className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Header row */}
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4 min-w-0">
                {project.mainImage && (
                  <img src={project.mainImage} alt={project.title} className="w-12 h-12 rounded-lg object-cover shrink-0 border border-border" />
                )}
                <div className="min-w-0">
                  <p className="font-semibold truncate">{project.title}</p>
                  <p className="text-xs text-foreground/50 mt-0.5">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs mr-2 ${project.category === "Freelance" ? "bg-highlight-primary/10 text-highlight-primary" : "bg-highlight-secondary/10 text-highlight-secondary"}`}>
                      {project.category}
                    </span>
                    Order: {project.order} {project.featured && "· ⭐ Featured"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setEditingId(editingId === String(project._id) ? null : String(project._id))}
                  className="px-4 py-1.5 text-sm border border-border rounded-lg hover:bg-card transition-colors"
                >
                  {editingId === String(project._id) ? "Cancel" : "Edit"}
                </button>
                <button
                  onClick={() => handleDelete(String(project._id))}
                  className="px-4 py-1.5 text-sm text-red-400 border border-red-400/20 rounded-lg hover:bg-red-400/10 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Edit panel */}
            {editingId === String(project._id) && (
              <div className="border-t border-border px-6 py-6 bg-background/50">
                <ProjectForm
                  initial={project}
                  onSubmit={(fd) => handleUpdate(String(project._id), fd)}
                  submitLabel="Update Project"
                  isPending={isPending}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
