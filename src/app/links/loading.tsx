export default function LinksLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-blue-400" />
        <p className="text-xs font-medium tracking-wide text-white/40">Loading SARION…</p>
      </div>
    </div>
  );
}
