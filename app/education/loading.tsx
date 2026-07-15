export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="mb-10">
          <div className="h-4 w-28 bg-zinc-100 rounded mb-4" />
          <div className="h-8 w-64 bg-zinc-100 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white border border-zinc-100 rounded-2xl p-6 animate-pulse">
              <div className="h-5 w-48 bg-zinc-100 rounded mb-2" />
              <div className="h-3 w-32 bg-zinc-50 rounded mb-4" />
              <div className="space-y-2">
                <div className="h-16 bg-zinc-50 rounded-xl" />
                <div className="h-16 bg-zinc-50 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
