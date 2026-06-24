import { getEnquiries, markEnquiryRead, deleteEnquiry } from "@/app/actions/enquiry";
import { IEnquiry } from "@/models/Enquiry";

export default async function AdminEnquiries() {
  const enquiries: IEnquiry[] = await getEnquiries();

  return (
    <div>
      <h1 className="text-3xl font-light mb-8">Enquiries</h1>
      
      <div className="grid gap-4">
        {enquiries.map((enquiry) => {
          const markReadAction = markEnquiryRead.bind(null, enquiry._id as string);
          const deleteAction = deleteEnquiry.bind(null, enquiry._id as string);
          
          return (
            <div key={enquiry._id as string} className={`p-6 border rounded-2xl flex flex-col md:flex-row gap-4 justify-between transition-colors ${enquiry.read ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-800/50 border-zinc-700'}`}>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-medium">{enquiry.name}</h3>
                  {!enquiry.read && (
                    <span className="px-2 py-0.5 rounded text-xs bg-blue-500/10 text-blue-400">
                      New
                    </span>
                  )}
                </div>
                <p className="text-zinc-400 text-sm mb-4">
                  <a href={`mailto:${enquiry.email}`} className="hover:text-white transition-colors">
                    {enquiry.email}
                  </a>
                  {" • "}
                  {new Date(enquiry.createdAt).toLocaleDateString()}
                </p>
                <p className="text-zinc-300 bg-zinc-950 p-4 rounded-lg">
                  {enquiry.message}
                </p>
              </div>
              
              <div className="flex gap-2 shrink-0 self-start mt-4 md:mt-0">
                {!enquiry.read && (
                  <form action={markReadAction}>
                    <button className="px-3 py-1 bg-zinc-700 text-zinc-300 hover:bg-zinc-600 rounded text-sm transition">Mark Read</button>
                  </form>
                )}
                <form action={deleteAction}>
                  <button className="px-3 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded text-sm transition">Delete</button>
                </form>
              </div>
            </div>
          );
        })}
        {enquiries.length === 0 && (
          <div className="p-8 text-center text-zinc-500 bg-zinc-900 rounded-2xl border border-zinc-800">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  );
}
