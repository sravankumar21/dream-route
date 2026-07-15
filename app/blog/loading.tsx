export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
        <div className="mb-10">
          <div className="h-3 w-16 bg-zinc-200 rounded mb-3" />
          <div className="h-8 w-64 bg-zinc-200 rounded mb-3" />
          <div className="h-4 w-80 bg-zinc-100 rounded" />
        </div>
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-20 bg-zinc-200 rounded-lg" />
          ))}
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-6">
              <div className="flex gap-2 mb-3">
                <div className="h-5 w-14 bg-zinc-100 rounded-full" />
                <div className="h-5 w-16 bg-zinc-100 rounded-full" />
                <div className="h-4 w-12 bg-zinc-100 rounded" />
              </div>
              <div className="h-5 w-3/4 bg-zinc-200 rounded mb-2" />
              <div className="h-4 w-1/2 bg-zinc-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
