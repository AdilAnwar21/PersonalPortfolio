"use client";


import { useEffect, useState, useTransition } from "react";
import { getAllBlogsAdmin, createBlog, updateBlog, deleteBlog } from "@/app/actions/blog";
import { IBlog } from "@/models/Blog";

const inputCls = "w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/30 text-foreground text-sm";
const labelCls = "block text-xs text-foreground/80 mb-1 font-medium uppercase tracking-wide";

function BlogForm({
  initial,
  onSubmit,
  submitLabel,
  isPending,
}: {
  initial?: Partial<IBlog>;
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
          <input name="title" defaultValue={initial?.title} placeholder="Blog Title" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Slug *</label>
          <input name="slug" defaultValue={initial?.slug} placeholder="my-blog-post" required className={inputCls} />
        </div>
      </div>

      <div>
        <label className={labelCls}>Summary *</label>
        <textarea name="summary" defaultValue={initial?.summary} placeholder="Short summary…" required rows={2} className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>Content (Markdown) *</label>
        <textarea name="content" defaultValue={initial?.content} placeholder="# Heading\n\nWrite your blog here..." required rows={10} className={`${inputCls} font-mono`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Cover Image URL</label>
          <input name="coverImage" defaultValue={initial?.coverImage} placeholder="https://…" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Tags (comma separated)</label>
          <input name="tags" defaultValue={initial?.tags?.join(", ")} placeholder="React, Node.js…" className={inputCls} />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" name="published" defaultChecked={initial?.published} className="accent-highlight-primary" />
          Published
        </label>
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

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const load = () => {
    startTransition(async () => {
      const data = await getAllBlogsAdmin();
      setBlogs(data);
    });
  };

  useEffect(() => { load(); }, []);

  const handleAdd = (fd: FormData) => {
    startTransition(async () => {
      const tags = fd.get("tags")?.toString().split(",").map(s => s.trim()).filter(Boolean) || [];
      const data = {
        title: fd.get("title"),
        slug: fd.get("slug"),
        summary: fd.get("summary"),
        content: fd.get("content"),
        coverImage: fd.get("coverImage"),
        published: fd.get("published") === "on",
        tags,
      };
      await createBlog(data);
      load();
    });
  };

  const handleUpdate = (id: string, fd: FormData) => {
    startTransition(async () => {
      const tags = fd.get("tags")?.toString().split(",").map(s => s.trim()).filter(Boolean) || [];
      const data = {
        title: fd.get("title"),
        slug: fd.get("slug"),
        summary: fd.get("summary"),
        content: fd.get("content"),
        coverImage: fd.get("coverImage"),
        published: fd.get("published") === "on",
        tags,
      };
      await updateBlog(id, data);
      setEditingId(null);
      load();
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    startTransition(async () => {
      await deleteBlog(id);
      load();
    });
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-light">Blogs</h1>

      {/* Add new */}
      <div className="bg-card border border-border p-6 rounded-2xl">
        <h2 className="text-lg font-semibold mb-6 text-foreground">➕ Write New Blog</h2>
        <BlogForm onSubmit={handleAdd} submitLabel="Create Blog Post" isPending={isPending} />
      </div>

      {/* Existing blogs */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Existing Blogs ({blogs.length})</h2>
        {blogs.length === 0 && (
          <div className="p-8 text-center text-foreground/70 bg-card rounded-2xl border border-border">No blog posts yet.</div>
        )}
        {blogs.map((blog) => (
          <div key={String(blog._id)} className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Header row */}
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4 min-w-0">
                {blog.coverImage && (
                  <img src={blog.coverImage} alt={blog.title} className="w-12 h-12 rounded-lg object-cover shrink-0 border border-border" />
                )}
                <div className="min-w-0">
                  <p className="font-semibold truncate">{blog.title}</p>
                  <p className="text-xs text-foreground/80 mt-0.5">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs mr-2 ${blog.published ? "bg-green-500/10 text-green-500" : "bg-highlight-secondary/10 text-highlight-secondary"}`}>
                      {blog.published ? "Published" : "Draft"}
                    </span>
                    Likes: {blog.likes || 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setEditingId(editingId === String(blog._id) ? null : String(blog._id))}
                  className="px-4 py-1.5 text-sm border border-border rounded-lg hover:bg-card transition-colors"
                >
                  {editingId === String(blog._id) ? "Cancel" : "Edit"}
                </button>
                <button
                  onClick={() => handleDelete(String(blog._id))}
                  className="px-4 py-1.5 text-sm text-red-400 border border-red-400/20 rounded-lg hover:bg-red-400/10 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Edit panel */}
            {editingId === String(blog._id) && (
              <div className="border-t border-border px-6 py-6 bg-background/50">
                <BlogForm
                  initial={blog}
                  onSubmit={(fd) => handleUpdate(String(blog._id), fd)}
                  submitLabel="Update Blog"
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
