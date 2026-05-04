export function SessionList({ sessions, onDelete }) {
  if (!sessions.length) {
    return (
      <div className="text-center py-12 text-zinc-600">
        <p className="text-4xl mb-3">📋</p>
        <p className="text-sm">Nenhuma sessão registrada ainda.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {sessions.map((s, i) => {
        const [y, m, d] = s.date.split("-");
        return (
          <div
            key={i}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 flex items-center justify-between hover:border-zinc-700 transition-colors"
          >
            <span className="font-mono text-xs text-zinc-500">
              {d}/{m}/{y}
            </span>
            <div className="flex items-center gap-3">
              <span className="bg-amber-400/10 text-amber-400 font-mono text-xs font-semibold px-3 py-1 rounded-full">
                {Number(s.hours).toFixed(1)}h
              </span>
              <span className="bg-blue-400/10 text-blue-400 font-mono text-xs font-semibold px-3 py-1 rounded-full">
                {s.questions} questões
              </span>
              <button
                onClick={() => onDelete(i)}
                className="text-zinc-600 hover:text-red-400 transition-colors text-sm px-1"
              >
                ✕
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
