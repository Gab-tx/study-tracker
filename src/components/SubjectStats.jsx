import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { getSubjectStats, fmtHours } from '../utils/calculations'

const COLORS = ['#f5a623', '#4ade80', '#60a5fa', '#f472b6', '#a78bfa', '#34d399', '#fb923c', '#e879f9']

export function SubjectStats({ sessions }) {
  const stats = getSubjectStats(sessions)
  if (!stats.length) return (
    <div className="text-center py-10 text-zinc-600 text-sm">Nenhuma sessão com matéria registrada.</div>
  )

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">Horas por matéria</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={stats} barSize={28} layout="vertical">
            <XAxis type="number" tick={{ fill: '#52525b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#a1a1aa', fontSize: 12 }} axisLine={false} tickLine={false} width={100} />
            <Tooltip
              contentStyle={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: 8 }}
              labelStyle={{ color: '#a1a1aa', fontSize: 11 }}
              formatter={v => [fmtHours(v), 'Horas']}
            />
            <Bar dataKey="hours" radius={[0, 6, 6, 0]}>
              {stats.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-2">
        {stats.map((s, i) => {
          const [y, m, d] = (s.lastDate || '').split('-')
          return (
            <div key={s.name} className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-sm font-medium text-zinc-200 flex-1">{s.name}</span>
              <span className="font-mono text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full">{fmtHours(s.hours)}</span>
              <span className="font-mono text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">{s.questions} questões</span>
              <span className="font-mono text-xs text-zinc-500">{s.sessions} sessões</span>
              <span className="font-mono text-xs text-zinc-600 hidden sm:block">
                {s.lastDate ? `${d}/${m}/${y}` : '—'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
