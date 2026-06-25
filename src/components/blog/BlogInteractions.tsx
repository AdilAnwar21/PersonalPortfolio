"use client";

import { useState, useTransition } from "react";
import { likeBlog } from "@/app/actions/blog";
import { addComment } from "@/app/actions/comment";
import { Heart, Send } from "lucide-react";

export function BlogInteractions({
  blogId,
  initialLikes,
  comments,
}: {
  blogId: string;
  initialLikes: number;
  comments: any[];
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [commentStatus, setCommentStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleLike = async () => {
    if (liked) return;
    setLiked(true);
    setLikes((l) => l + 1); // Optimistic UI
    try {
      await likeBlog(blogId);
    } catch (e) {
      setLiked(false);
      setLikes((l) => l - 1);
    }
  };

  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCommentStatus("submitting");
    const fd = new FormData(e.currentTarget);
    const authorName = fd.get("authorName") as string;
    const content = fd.get("content") as string;

    startTransition(async () => {
      await addComment(blogId, authorName, content);
      setCommentStatus("success");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setCommentStatus("idle"), 5000);
    });
  };

  return (
    <div className="mt-16 pt-10 border-t border-border">
      <div className="flex items-center justify-between mb-16">
        <h3 className="text-xl font-semibold text-foreground">Did you enjoy this article?</h3>
        <button
          onClick={handleLike}
          disabled={liked}
          className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
            liked
              ? "bg-red-500/10 border-red-500/30 text-red-500"
              : "bg-card border-border hover:border-red-400/50 hover:bg-red-400/5 text-foreground/70 hover:text-red-400"
          }`}
        >
          <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
          <span className="font-medium">{likes} Likes</span>
        </button>
      </div>

      <div className="space-y-10">
        <h3 className="text-2xl font-semibold text-foreground">Comments ({comments.length})</h3>

        {/* Comment List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-foreground/40 italic">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            comments.map((c) => (
              <div key={c._id} className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground">{c.authorName}</span>
                  <span className="text-xs text-foreground/40">{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-foreground/70 text-sm leading-relaxed">{c.content}</p>
              </div>
            ))
          )}
        </div>

        {/* Add Comment */}
        <div className="p-8 rounded-3xl bg-card/40 border border-border/60 mt-10">
          <h4 className="text-lg font-medium text-foreground mb-6">Leave a comment</h4>
          {commentStatus === "success" ? (
            <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-green-500 font-medium">Thank you! Your comment is awaiting moderation.</p>
            </div>
          ) : (
            <form onSubmit={handleComment} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wide">Name *</label>
                <input
                  name="authorName"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-highlight-primary/50 text-sm text-foreground"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground/50 mb-2 uppercase tracking-wide">Comment *</label>
                <textarea
                  name="content"
                  required
                  rows={4}
                  placeholder="Share your thoughts..."
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-highlight-primary/50 text-sm text-foreground resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={commentStatus === "submitting" || isPending}
                className="flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
              >
                {commentStatus === "submitting" || isPending ? "Submitting..." : "Post Comment"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
