import { getTestimonials, updateTestimonialStatus, deleteTestimonial } from "@/app/actions/testimonial";
import { ITestimonial } from "@/models/Testimonial";

export default async function AdminTestimonials() {
  const testimonials: ITestimonial[] = await getTestimonials();

  return (
    <div>
      <h1 className="text-3xl font-light mb-8">Testimonials</h1>
      
      <div className="grid gap-4">
        {testimonials.map((test) => {
          const approveAction = updateTestimonialStatus.bind(null, test._id as string, "Approved");
          const rejectAction = updateTestimonialStatus.bind(null, test._id as string, "Rejected");
          const deleteAction = deleteTestimonial.bind(null, test._id as string);
          
          return (
            <div key={test._id as string} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col md:flex-row gap-4 justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-medium">{test.authorName}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    test.status === 'Approved' ? 'bg-green-500/10 text-green-400' :
                    test.status === 'Rejected' ? 'bg-red-500/10 text-red-400' :
                    'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {test.status}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm mb-4">{test.authorTitle} at {test.company}</p>
                <p className="text-zinc-300 italic">"{test.content}"</p>
              </div>
              
              <div className="flex gap-2 shrink-0 self-start">
                {test.status !== "Approved" && (
                  <form action={approveAction}>
                    <button className="px-3 py-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded text-sm transition">Approve</button>
                  </form>
                )}
                {test.status !== "Rejected" && (
                  <form action={rejectAction}>
                    <button className="px-3 py-1 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 rounded text-sm transition">Reject</button>
                  </form>
                )}
                <form action={deleteAction}>
                  <button className="px-3 py-1 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded text-sm transition">Delete</button>
                </form>
              </div>
            </div>
          );
        })}
        {testimonials.length === 0 && (
          <div className="p-8 text-center text-zinc-500 bg-zinc-900 rounded-2xl border border-zinc-800">
            No testimonials found.
          </div>
        )}
      </div>
    </div>
  );
}
