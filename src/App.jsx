import { useState } from 'react'
import { useStudyData } from './hooks/useStudyData'
import { Dashboard }    from './components/Dashboard'
import { InputForm }    from './components/InputForm'
import { ImportCSV }    from './components/ImportCSV'
import { SessionList }  from './components/SessionList'
import { SectionTitle } from './components/SectionTitle'
import './App.css'

const TABS = ['Dashboard', 'Registrar', 'Histórico', 'Matérias', 'Metas']

export default function App() {
  const [tab, setTab] = useState('Dashboard')
  const { sessions, goals, subjects, addSession, addSessions, deleteSession, updateGoals, addSubject, removeSubject } = useStudyData()

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
            <InputForm onAdd={addSession} subjects={subjects} />
            <div className="mt-6">
              <SectionTitle>importar planilha</SectionTitle>
              <ImportCSV onImport={addSessions} onAddSubject={addSubject} subjects={subjects} />
            </div>
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

        {tab === 'Matérias' && (
          <SubjectsEditor subjects={subjects} onAdd={addSubject} onRemove={removeSubject} sessions={sessions} />
        )}

        {tab === 'Metas' && (
          <GoalsEditor goals={goals} onSave={updateGoals} />
        )}

      </div>
    </div>
  )
}

function SubjectsEditor({ subjects, onAdd, onRemove, sessions }) {
  const [input, setInput] = useState('')

  function handleAdd(e) {
    e.preventDefault()
    onAdd(input)
    setInput('')
  }

  return (
    <div>
      <SectionTitle>cadastrar matéria</SectionTitle>
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Nome da matéria"
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-400"
        />
        <button
          type="submit"
          className="bg-amber-400 text-zinc-900 font-semibold text-sm px-5 py-2 rounded-lg hover:bg-amber-300 transition-colors"
        >
          + Adicionar
        </button>
      </form>

      <SectionTitle>matérias cadastradas ({subjects.length})</SectionTitle>
      {subjects.length === 0 ? (
        <p className="text-sm text-zinc-600 text-center py-8">Nenhuma matéria cadastrada.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {subjects.map(s => {
            const count = sessions.filter(ss => ss.subject === s).length
            return (
              <div key={s} className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="text-sm text-zinc-200">{s}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-500 font-mono">{count} sessões</span>
                  <button
                    onClick={() => onRemove(s)}
                    className="text-zinc-600 hover:text-red-400 transition-colors text-sm px-1"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
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
