export function PrivacyBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-30" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </span>
      100% Private — runs in your browser
    </div>
  );
}
