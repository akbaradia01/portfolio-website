export function Loading({ label = 'Memuat data…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-16 text-slate-400" role="status">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      {label}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="card mx-auto max-w-md p-6 text-center">
      <p className="text-sm text-rose-300">{message}</p>
      <p className="mt-1 text-xs text-slate-500">Pastikan backend dan database sudah berjalan.</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-ghost mt-4">
          Coba lagi
        </button>
      )}
    </div>
  );
}

export function Empty({ label }: { label: string }) {
  return <p className="py-16 text-center text-sm text-slate-500">{label}</p>;
}
