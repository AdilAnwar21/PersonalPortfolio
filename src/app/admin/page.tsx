export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-light mb-8">Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <h3 className="text-zinc-400 text-sm font-medium mb-2">Total Projects</h3>
          <p className="text-3xl font-semibold">0</p>
        </div>
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
          <h3 className="text-zinc-400 text-sm font-medium mb-2">Pending Testimonials</h3>
          <p className="text-3xl font-semibold">0</p>
        </div>
      </div>
    </div>
  );
}
