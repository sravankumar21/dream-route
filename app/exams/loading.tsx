export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="mb-10">
          <div className="h-4 w-24 bg-zinc-100 rounded mb-4" />
          <div className="h-8 w-56 bg-zinc-100 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-zinc-100 rounded-2xl p-6 animate-pulse">
              <div className="h-4 w-20 bg-zinc-100 rounded mb-3" />
              <div className="h-5 w-3/4 bg-zinc-100 rounded mb-2" />
              <div className="h-3 w-full bg-zinc-50 rounded mb-4" />
              <div className="flex gap-4 pt-3 border-t border-zinc-50">
                <div className="h-3 w-24 bg-zinc-100 rounded" />
                <div className="h-3 w-20 bg-zinc-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
