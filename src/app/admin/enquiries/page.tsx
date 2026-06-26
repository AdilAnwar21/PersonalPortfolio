import { getEnquiries, markEnquiryRead, deleteEnquiry } from "@/app/actions/enquiry";
import { IEnquiry } from "@/models/Enquiry";

export default async function AdminEnquiries() {
  const enquiries: IEnquiry[] = await getEnquiries();

  const unread = enquiries.filter((e) => !e.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-highlight-primary font-semibold mb-1">Inbox</p>
          <p className="text-foreground/80 text-sm">{enquiries.length} total · {unread} unread</p>
        </div>
        {unread > 0 && (
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-highlight-primary/10 border border-highlight-primary/20 text-highlight-primary text-xs font-semibold rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-highlight-primary animate-pulse" />
            {unread} new
          </span>
        )}
      </div>

      {/* List */}
      <div className="space-y-3">
        {enquiries.length === 0 && (
          <div className="py-20 text-center rounded-2xl border border-dashed border-border/60 bg-card/20">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-foreground/70">No messages yet.</p>
          </div>
        )}

        {enquiries.map((enquiry) => {
          const markReadAction = markEnquiryRead.bind(null, String(enquiry._id));
          const deleteAction = deleteEnquiry.bind(null, String(enquiry._id));

          return (
            <div
              key={String(enquiry._id)}
              className={`group p-5 rounded-2xl border transition-all duration-200 ${
                enquiry.read
                  ? "bg-card/30 border-border"
                  : "bg-highlight-primary/5 border-highlight-primary/20 shadow-sm shadow-highlight-primary/5"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-highlight-primary/40 to-highlight-secondary/40 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {enquiry.name?.[0]?.toUpperCase() ?? "?"}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-foreground text-sm">{enquiry.name}</span>
                    {!enquiry.read && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-highlight-primary/15 text-highlight-primary font-medium">
                        New
                      </span>
                    )}
                    <span className="text-foreground/60 text-xs ml-auto">
                      {new Date(enquiry.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </span>
                  </div>
                  <a
                    href={`mailto:${enquiry.email}`}
                    className="text-xs text-highlight-primary hover:underline mb-3 block"
                  >
                    {enquiry.email}
                  </a>
                  <p className="text-sm text-foreground leading-relaxed bg-background/60 rounded-xl px-4 py-3 border border-border/50">
                    {enquiry.message}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-start">
                  {!enquiry.read && (
                    <form action={markReadAction}>
                      <button
                        type="submit"
                        className="btn-admin"
                      >
                        Mark Read
                      </button>
                    </form>
                  )}
                  <form action={deleteAction}>
                    <button
                      type="submit"
                      className="btn-admin-danger"
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
