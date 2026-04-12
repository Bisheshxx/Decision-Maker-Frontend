export default function Loading() {
  return (
    <div className="container mx-auto w-full px-2 pt-2 md:px-1">
      <div className="animate-pulse space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="h-7 w-56 rounded-md bg-muted" />
            <div className="h-4 w-80 rounded-md bg-muted" />
          </div>
          <div className="flex gap-2">
            <div className="h-9 w-28 rounded-md bg-muted" />
            <div className="h-9 w-10 rounded-md bg-muted" />
          </div>
        </div>

        <div className="flex gap-2">
          <div className="h-6 w-32 rounded-full bg-muted" />
          <div className="h-6 w-32 rounded-full bg-muted" />
        </div>

        <div className="grid grid-cols-1 gap-3 pt-2 md:grid-cols-2 lg:grid-cols-4">
          <div className="h-36 rounded-xl bg-muted" />
          <div className="h-36 rounded-xl bg-muted" />
          <div className="h-36 rounded-xl bg-muted" />
          <div className="h-36 rounded-xl bg-muted" />
        </div>
      </div>
    </div>
  );
}
