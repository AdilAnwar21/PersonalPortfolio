import {
  getTestimonials,
  updateTestimonialStatus,
  deleteTestimonial,
} from "@/app/actions/testimonial";
import { ITestimonial } from "@/models/Testimonial";

const statusConfig = {
  Approved: { color: "bg-green-500/10 text-green-400 border-green-500/20", dot: "bg-green-400" },
  Rejected: { color: "bg-red-500/10 text-red-400 border-red-500/20", dot: "bg-red-400" },
  Pending:  { color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", dot: "bg-yellow-400" },
};

export default async function AdminTestimonials() {
  const testimonials: ITestimonial[] = await getTestimonials();

  const pending = testimonials.filter((t) => t.status === "Pending").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-highlight-primary font-semibold mb-1">Reviews</p>
          <p className="text-foreground/80 text-sm">
            {testimonials.length} total · {pending} awaiting review
          </p>
        </div>
        {pending > 0 && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            {pending} pending
          </span>
        )}
      </div>

      {/* List */}
      <div className="space-y-3">
        {testimonials.length === 0 && (
          <div className="py-20 text-center rounded-2xl border border-dashed border-border/60 bg-card/20">
            <div className="text-4xl mb-3">💬</div>
            <p className="text-foreground/70">No testimonials found.</p>
          </div>
        )}

        {testimonials.map((test) => {
          const approveAction = updateTestimonialStatus.bind(null, String(test._id), "Approved");
          const rejectAction  = updateTestimonialStatus.bind(null, String(test._id), "Rejected");
          const deleteAction  = deleteTestimonial.bind(null, String(test._id));

          const cfg = statusConfig[test.status] ?? statusConfig.Pending;

          return (
            <div
              key={String(test._id)}
              className="p-5 rounded-2xl border border-border bg-card/30 hover:border-highlight-primary/20 transition-all duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-highlight-primary/40 to-highlight-secondary/40 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {test.authorName?.[0]?.toUpperCase() ?? "?"}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-foreground text-sm">{test.authorName}</span>
                    {test.authorTitle && (
                      <span className="text-xs text-foreground/80">
                        {test.authorTitle}{test.company ? ` @ ${test.company}` : ""}
                      </span>
                    )}
                    {/* Status badge */}
                    <span className={`ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {test.status}
                    </span>
                  </div>

                  {/* Star rating display */}
                  {test.rating && (
                    <div className="flex gap-0.5 mb-2">
                      {[1,2,3,4,5].map((s) => (
                        <span key={s} className={`text-xs ${s <= test.rating! ? "text-yellow-400" : "text-foreground/15"}`}>★</span>
                      ))}
                    </div>
                  )}

                  <blockquote className="text-sm text-foreground leading-relaxed italic bg-background/50 rounded-xl px-4 py-3 border border-border/50">
                    &ldquo;{test.content}&rdquo;
                  </blockquote>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-start flex-wrap">
                  {test.status !== "Approved" && (
                    <form action={approveAction}>
                      <button
                        type="submit"
                        className="px-3 py-1.5 text-xs font-medium bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 rounded-lg transition-all"
                      >
                        Approve
                      </button>
                    </form>
                  )}
                  {test.status !== "Rejected" && (
                    <form action={rejectAction}>
                      <button
                        type="submit"
                        className="px-3 py-1.5 text-xs font-medium bg-card border border-border text-foreground/90 hover:text-foreground hover:border-foreground/30 rounded-lg transition-all"
                      >
                        Reject
                      </button>
                    </form>
                  )}
                  <form action={deleteAction}>
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
