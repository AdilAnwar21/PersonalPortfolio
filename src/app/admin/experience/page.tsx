import { getExperiences, addExperience, deleteExperience } from "@/app/actions/experience";
import { IExperience } from "@/models/Experience";

export default async function AdminExperience() {
  const experiences: IExperience[] = await getExperiences();

  return (
    <div>
      <h1 className="text-3xl font-light mb-8">Experience</h1>
      
      <div className="mb-12 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
        <h2 className="text-xl font-medium mb-6">Add New Role</h2>
        <form action={addExperience} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="role" placeholder="Role (e.g. Senior Developer)" required className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white" />
            <input name="company" placeholder="Company" required className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="location" placeholder="Location" className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white" />
            <input name="technologies" placeholder="Technologies (comma separated)" className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="startDate" type="date" required className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400" />
            <input name="endDate" type="date" className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400" />
            <label className="flex items-center space-x-2 h-full">
              <input type="checkbox" name="current" className="rounded bg-zinc-950 border-zinc-800" />
              <span className="text-zinc-400">I currently work here</span>
            </label>
          </div>

          <textarea name="description" placeholder="Description (One point per line)" required rows={4} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white" />
          
          <input name="order" type="number" placeholder="Order (0)" className="w-32 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white" />

          <button type="submit" className="px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors block">
            Save Experience
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => {
          const deleteAction = deleteExperience.bind(null, exp._id as string);
          return (
            <div key={exp._id as string} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl flex justify-between items-start">
              <div>
                <h3 className="text-xl font-medium">{exp.role}</h3>
                <p className="text-zinc-400">{exp.company} • {exp.location}</p>
                <p className="text-sm text-zinc-500 mt-1">
                  {new Date(exp.startDate).toLocaleDateString()} - {exp.current ? "Present" : exp.endDate && new Date(exp.endDate).toLocaleDateString()}
                </p>
              </div>
              <form action={deleteAction}>
                <button type="submit" className="text-red-400 hover:text-red-300 text-sm">Delete</button>
              </form>
            </div>
          );
        })}
        {experiences.length === 0 && (
          <div className="p-8 text-center text-zinc-500 bg-zinc-900 rounded-2xl border border-zinc-800">
            No experience records found.
          </div>
        )}
      </div>
    </div>
  );
}
