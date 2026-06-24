"use client";

import { useEffect, useState, useTransition } from "react";
import { getExperiences, addExperience, deleteExperience, updateExperience } from "@/app/actions/experience";
import { IExperience } from "@/models/Experience";

const inputCls = "w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight-primary/30 text-foreground text-sm";
const labelCls = "block text-xs text-foreground/50 mb-1 font-medium uppercase tracking-wide";

function formatDateForInput(date?: Date | string) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

function ExperienceForm({
  initial,
  onSubmit,
  submitLabel,
  isPending,
}: {
  initial?: Partial<IExperience>;
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
          <label className={labelCls}>Role *</label>
          <input name="role" defaultValue={initial?.role} placeholder="Senior Developer" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Company *</label>
          <input name="company" defaultValue={initial?.company} placeholder="Acme Corp" required className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Location</label>
          <input name="location" defaultValue={initial?.location} placeholder="Remote / City, Country" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Technologies (comma separated)</label>
          <input name="technologies" defaultValue={initial?.technologies?.join(", ")} placeholder="React, Node.js, AWS…" className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className={labelCls}>Start Date *</label>
          <input name="startDate" type="date" defaultValue={formatDateForInput(initial?.startDate)} required className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>End Date</label>
          <input name="endDate" type="date" defaultValue={formatDateForInput(initial?.endDate)} className={inputCls} />
        </div>
        <label className="flex items-center gap-2 text-sm text-foreground/70 pb-2">
          <input type="checkbox" name="current" defaultChecked={initial?.current} className="accent-highlight-primary" />
          Currently working here
        </label>
      </div>

      <div>
        <label className={labelCls}>Description (one bullet per line)</label>
        <textarea name="description" defaultValue={initial?.description?.join("\n")} placeholder="• Led a team of 5 engineers…&#10;• Increased performance by 40%…" required rows={5} className={inputCls} />
      </div>

      <div className="flex items-center gap-6">
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

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const load = () => {
    startTransition(async () => {
      const data = await getExperiences();
      setExperiences(data);
    });
  };

  useEffect(() => { load(); }, []);

  const handleAdd = (fd: FormData) => {
    startTransition(async () => {
      await addExperience(fd);
      load();
    });
  };

  const handleUpdate = (id: string, fd: FormData) => {
    startTransition(async () => {
      await updateExperience(id, fd);
      setEditingId(null);
      load();
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this experience entry?")) return;
    startTransition(async () => {
      await deleteExperience(id);
      load();
    });
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-light">Experience</h1>

      {/* Add new */}
      <div className="bg-card border border-border p-6 rounded-2xl">
        <h2 className="text-lg font-semibold mb-6 text-foreground/80">➕ Add New Role</h2>
        <ExperienceForm onSubmit={handleAdd} submitLabel="Add Experience" isPending={isPending} />
      </div>

      {/* Existing */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground/80">Existing Entries ({experiences.length})</h2>
        {experiences.length === 0 && (
          <div className="p-8 text-center text-foreground/40 bg-card rounded-2xl border border-border">No experience records yet.</div>
        )}
        {experiences.map((exp) => (
          <div key={String(exp._id)} className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Header row */}
            <div className="flex items-start justify-between px-6 py-4">
              <div>
                <p className="font-semibold text-foreground">{exp.role}</p>
                <p className="text-sm text-foreground/60 mt-0.5">
                  {exp.company}
                  {exp.location ? ` · ${exp.location}` : ""}
                </p>
                <p className="text-xs text-foreground/40 mt-1">
                  {new Date(exp.startDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                  {" → "}
                  {exp.current ? "Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "—"}
                </p>
                {exp.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {exp.technologies.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded text-xs bg-highlight-primary/10 text-highlight-primary">{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <button
                  onClick={() => setEditingId(editingId === String(exp._id) ? null : String(exp._id))}
                  className="px-4 py-1.5 text-sm border border-border rounded-lg hover:bg-card/60 transition-colors"
                >
                  {editingId === String(exp._id) ? "Cancel" : "Edit"}
                </button>
                <button
                  onClick={() => handleDelete(String(exp._id))}
                  className="px-4 py-1.5 text-sm text-red-400 border border-red-400/20 rounded-lg hover:bg-red-400/10 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Edit panel */}
            {editingId === String(exp._id) && (
              <div className="border-t border-border px-6 py-6 bg-background/50">
                <ExperienceForm
                  initial={exp}
                  onSubmit={(fd) => handleUpdate(String(exp._id), fd)}
                  submitLabel="Update Experience"
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
