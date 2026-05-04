import { useRef, useState } from 'react'
import { parseCSV } from '../utils/parseCSV'

export function ImportCSV({ onImport, subjects = [] }) {
  const inputRef = useRef()
  const [result, setResult] = useState(null)

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const { sessions, errors } = parseCSV(ev.target.result, subjects)
        if (sessions.length) onImport(sessions)
        setResult({ count: sessions.length, errors })
      } catch (err) {
        setResult({ count: 0, errors: [err.message] })
      }
      e.target.value = ''
    }
    reader.readAsText(file)
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-medium text-zinc-300">Importar CSV</p>
          <p className="text-xs text-zinc-500 mt-0.5">Colunas: <span className="font-mono">data, horas, minutos, questoes, materia</span></p>
        </div>
        <button
          onClick={() => inputRef.current.click()}
          className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm font-medium px-4 py-2 rounded-lg hover:border-amber-400 hover:text-amber-400 transition-colors"
        >
          Escolher arquivo
        </button>
        <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />
      </div>

      {result && (
        <div className="mt-3 space-y-1">
          {result.count > 0 && (
            <p className="text-xs text-green-400">{result.count} sessão(ões) importada(s) com sucesso.</p>
          )}
          {result.errors.map((err, i) => (
            <p key={i} className="text-xs text-red-400">{err}</p>
          ))}
        </div>
      )}
    </div>
  )
}
