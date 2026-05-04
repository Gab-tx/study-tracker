import { useState } from 'react'
import { useStudyData } from './hooks/useStudyData'
import { Dashboard }    from './components/Dashboard'
import { InputForm }    from './components/InputForm'
import { SessionList }  from './components/SessionList'
import { SectionTitle } from './components/SectionTitle'
import './App.css'

const TABS = ['Dashboard', 'Registrar',
  'Histórico', 'Metas'
]

export default function App() {
  const [tab, setTab] = useState('Dashboard')
  const { sessions, goals, addSession, deleteSession, updateGoals } = useStudyData()

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-linear-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-lg">📚</div>
            <h1 className="text-xl font-semibold tracking-tight">
              Study<span className="text-amber-400">Tracker</span>
            </h1>
          </div>
          <span className="text-xs text-zinc-500 font-mono bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}
          </span>
        </header>

        {/* Tabs */}
        <nav className="flex gap-1 bg-zinc-900 p-1 rounded-lg w-fit mb-8">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                tab === t
                  ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        {/* Content */}
        {tab === 'Dashboard' && <Dashboard sessions={sessions} goals={goals} />}

        {tab === 'Registrar' && (
          <div>
            <SectionTitle>nova sessão</SectionTitle>
            <InputForm onAdd={addSession} />
            <div className="mt-6">
              <SectionTitle>últimas sessões</SectionTitle>
              <SessionList sessions={sessions.slice(0, 5)} onDelete={deleteSession} />
            </div>
          </div>
        )}

        {tab === 'Histórico' && (
          <div>
            <SectionTitle>todas as sessões ({sessions.length})</SectionTitle>
            <SessionList sessions={sessions} onDelete={deleteSession} />
          </div>
        )}

        {tab === 'Metas' && (
          <GoalsEditor goals={goals} onSave={updateGoals} />
        )}

      </div>
    </div>
  )
}

function GoalsEditor({ goals, onSave }) {
  const [form, setForm] = useState({ ...goals })

  return (
    <div>
      <SectionTitle>configurar metas</SectionTitle>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          {[
            { key: 'hours',     label: 'Meta de Horas' },
            { key: 'days',      label: 'Meta de Dias' },
            { key: 'questions', label: 'Meta de Questões' },
          ].map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-1">
              <label className="text-xs text-zinc-500 uppercase tracking-widest">{label}</label>
              <input
                type="number"
                value={form[key]}
                min="1"
                onChange={e => setForm(p => ({ ...p, [key]: Number(e.target.value) }))}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm font-mono text-zinc-200 focus:outline-none focus:border-amber-400"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => onSave(form)}
          className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm font-medium px-5 py-2 rounded-lg hover:border-amber-400 hover:text-amber-400 transition-colors"
        >
          Salvar Metas
        </button>
      </div>
    </div>
  )
}
