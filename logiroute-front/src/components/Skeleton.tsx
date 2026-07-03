export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-graphite-700 bg-graphite-800 p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="animate-pulse-soft h-4 w-2/3 rounded bg-graphite-700" />
          <div className="animate-pulse-soft h-3 w-1/2 rounded bg-graphite-700" />
        </div>
        <div className="animate-pulse-soft h-5 w-20 rounded-full bg-graphite-700" />
      </div>
      <div className="waybill-edge my-4 h-px" />
      <div className="flex justify-between">
        <div className="animate-pulse-soft h-3 w-16 rounded bg-graphite-700" />
        <div className="animate-pulse-soft h-3 w-16 rounded bg-graphite-700" />
      </div>
      <div className="animate-pulse-soft mt-4 h-9 w-full rounded-md bg-graphite-700" />
    </div>
  );
}

export function SkeletonLinha() {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-graphite-700 bg-graphite-800 px-4 py-3.5">
      <div className="animate-pulse-soft size-9 shrink-0 rounded-md bg-graphite-700" />
      <div className="flex-1 space-y-2">
        <div className="animate-pulse-soft h-3.5 w-1/3 rounded bg-graphite-700" />
        <div className="animate-pulse-soft h-3 w-1/2 rounded bg-graphite-700" />
      </div>
      <div className="animate-pulse-soft h-5 w-16 rounded-full bg-graphite-700" />
    </div>
  );
}

export function SkeletonModal() {
  return (
    <div className="space-y-4 p-6">
      <div className="animate-pulse-soft h-4 w-1/3 rounded bg-graphite-700" />
      <div className="animate-pulse-soft h-8 w-2/3 rounded bg-graphite-700" />
      <div className="grid grid-cols-3 gap-3">
        <div className="animate-pulse-soft h-16 rounded bg-graphite-700" />
        <div className="animate-pulse-soft h-16 rounded bg-graphite-700" />
        <div className="animate-pulse-soft h-16 rounded bg-graphite-700" />
      </div>
    </div>
  );
}
