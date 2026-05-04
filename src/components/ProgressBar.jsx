export function ProgressBar({ value, max, unit = '', color = "#f5a623" }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div>
      <div className="flex justify-between text-xs text-zinc-500 font-mono mb-1">
        <span>{value}{unit}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
        </div>
        <p className="text-xs text-zinc-600 mt-1 text-right">meta: {max}{unit}</p>
    </div>
  );
}


