import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { getLast7DaysData } from '../utils/calculations'

export function WeekChart({ sessions }) {
  const data = getLast7DaysData(sessions)

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} barSize={28}>
        <XAxis
          dataKey="label"
          tick={{ fill: '#52525b', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#52525b', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={24}
        />
        <Tooltip
          contentStyle={{ background: '#18181b', border: '1px solid #3f3f46', borderRadius: 8 }}
          labelStyle={{ color: '#a1a1aa', fontSize: 13 }}
          formatter={v => [`${v.toFixed(1)}h`, 'Horas']}
        />
        <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.hours > 0 ? '#f5a623' : '#27272a'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}