"use client";

import { useEffect, useState, useTransition } from "react";
import { getAllCommentsAdmin, approveComment, deleteComment } from "@/app/actions/comment";

export default function AdminComments() {
  const [comments, setComments] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();

  const load = () => {
    startTransition(async () => {
      const data = await getAllCommentsAdmin();
      setComments(data);
    });
  };

  useEffect(() => { load(); }, []);

  const handleApprove = (id: string, blogSlug: string) => {
    startTransition(async () => {
      await approveComment(id, `/blog/${blogSlug}`);
      load();
    });
  };

  const handleDelete = (id: string, blogSlug?: string) => {
    if (!confirm("Delete this comment?")) return;
    startTransition(async () => {
      await deleteComment(id, blogSlug ? `/blog/${blogSlug}` : undefined);
      load();
    });
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-light">Comments</h1>

      <div className="space-y-4">
        {comments.length === 0 && (
          <div className="p-8 text-center text-foreground/40 bg-card rounded-2xl border border-border">No comments yet.</div>
        )}
        {comments.map((comment) => (
          <div key={String(comment._id)} className="bg-card border border-border rounded-2xl p-6">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="font-semibold text-foreground">{comment.authorName}</p>
                <p className="text-xs text-foreground/50 mb-3">
                  On blog: {comment.blogId?.title || "Unknown Blog"}
                </p>
                <p className="text-sm text-foreground/80 bg-background/50 p-4 rounded-lg border border-border/50">
                  {comment.content}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs ${comment.isApproved ? "bg-green-500/10 text-green-500" : "bg-highlight-secondary/10 text-highlight-secondary"}`}>
                    {comment.isApproved ? "Approved" : "Pending Review"}
                  </span>
                  <span className="text-xs text-foreground/40">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 shrink-0">
                {!comment.isApproved && (
                  <button
                    onClick={() => handleApprove(String(comment._id), comment.blogId?.slug)}
                    disabled={isPending}
                    className="px-4 py-1.5 text-sm border border-green-500/30 text-green-500 rounded-lg hover:bg-green-500/10 transition-colors disabled:opacity-50"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(String(comment._id), comment.blogId?.slug)}
                  disabled={isPending}
                  className="px-4 py-1.5 text-sm text-red-400 border border-red-400/20 rounded-lg hover:bg-red-400/10 transition-colors disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
