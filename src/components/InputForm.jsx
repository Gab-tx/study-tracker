import { useState } from "react";

export function InputForm({ onAdd }) {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({ date: today, hours: "", questions: "" });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.hours && !form.questions) return;
    onAdd({
      date: form.date,
      hours: Number(form.hours) || 0,
      questions: Number(form.questions) || 0,
    });
    setForm({ date: today, hours: "", questions: "" });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500 uppercase tracking-widest">
            Data
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm font-mono text-zinc-200 focus:outline-none focus:border-amber-400"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500 uppercase tracking-widest">
            Horas
          </label>
          <input
            type="number"
            placeholder="ex: 2.5"
            value={form.hours}
            min="0"
            max="24"
            step="0.25"
            onChange={(e) => setForm((p) => ({ ...p, hours: e.target.value }))}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm font-mono text-zinc-200 focus:outline-none focus:border-amber-400"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500 uppercase tracking-widest">
            Questões
          </label>
          <input
            type="number"
            placeholder="ex: 30"
            value={form.questions}
            min="0"
            onChange={(e) =>
              setForm((p) => ({ ...p, questions: e.target.value }))
            }
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm font-mono text-zinc-200 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-amber-400 text-zinc-900 font-semibold text-sm px-6 py-2 rounded-lg hover:bg-amber-300 transition-colors"
      >
        + Adicionar Sessão
      </button>
    </form>
  );
}
