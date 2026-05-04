export function MetricCard({ icon, label, value, sub, color }) {
  const colors = {
    amber: "border-t-amber-400 text-amber-400",
    green: "border-t-green-400 text-green-400",
    blue: "border-t-blue-400 text-blue-400",
    red: "border-t-red-400 text-red-400",
  };

  return (
    <div
      className={`bg-zinc-900 border border-zinc-800 
                border-t-2 ${colors[color]} rounded-2xl p-5`}
    >
        <div className="text-2xl mb-3">{icon}</div>
        <p className="text-xs text-zinc-500 uppercase tecking-widest mb-1">{label}</p>
        <p className={`font-mono text-3xl font-semibold ${colors[color]}`} >{value}</p>
        {sub && <p className="text-xs text-zinc-600 mt-1">{sub}</p>}
    </div>
  );
}


