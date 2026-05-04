import { MetricCard } from './MetricCard'
import { GoalCard }   from './GoalCard'
import { WeekChart }  from './WeekChart'
import { SectionTitle } from './SectionTitle'
import { SubjectStats } from './SubjectStats'
import {
  getTotalHours, getTotalQuestions, getStudyDays,
  getAverageHours, getAverageQuestions, getStreak,
  getAproveitamento, getWeeklyHours, getMonthlyHours, getBestDay, fmtHours
} from '../utils/calculations'

export function Dashboard({ sessions, goals }) {
  const totalH  = getTotalHours(sessions)
  const totalQ  = getTotalQuestions(sessions)
  const totalD  = getStudyDays(sessions)
  const streak  = getStreak(sessions)
  const avgH    = getAverageHours(sessions)
  const avgQ    = getAverageQuestions(sessions)
  const best    = getBestDay(sessions)

  return (
    <div>
      <SectionTitle>métricas principais</SectionTitle>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard icon="⏱️" label="Horas Estudadas" value={fmtHours(totalH)} sub={`média: ${fmtHours(avgH)}/dia`} color="amber" />
        <MetricCard icon="📅" label="Dias Estudados"  value={totalD} sub={`aproveitamento: ${getAproveitamento(sessions)}%`} color="green" />
        <MetricCard icon="🧠" label="Questões"        value={totalQ} sub={`média: ${avgQ.toFixed(0)}/dia`} color="blue" />
        <MetricCard icon="🔥" label="Streak"          value={streak} sub="dias consecutivos" color="red" />
      </div>

      <SectionTitle>metas</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <GoalCard label="Horas Totais"     value={totalH.toFixed(2)} max={goals.hours}     unit="h"    color="#f5a623" displayValue={fmtHours(totalH)} />
        <GoalCard label="Dias Estudados"   value={totalD}            max={goals.days}      unit=" dias" color="#4ade80" />
        <GoalCard label="Questões"         value={totalQ}            max={goals.questions}  unit=""     color="#60a5fa" />
      </div>

      <SectionTitle>últimos 7 dias</SectionTitle>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6">
        <WeekChart sessions={sessions} />
      </div>

      <SectionTitle>destaques</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-xs text-zinc-500 mb-1">Esta semana</p>
          <p className="font-mono text-lg font-semibold text-zinc-200">{fmtHours(getWeeklyHours(sessions))}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-xs text-zinc-500 mb-1">Este mês</p>
          <p className="font-mono text-lg font-semibold text-zinc-200">{fmtHours(getMonthlyHours(sessions))}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-xs text-zinc-500 mb-1">Melhor dia</p>
          <p className="font-mono text-lg font-semibold text-zinc-200">
            {best ? fmtHours(best[1]) : '—'}
          </p>
        </div>
      </div>
      <SectionTitle>por matéria</SectionTitle>
      <SubjectStats sessions={sessions} />
    </div>
  )
}