import { useState } from "react";

export function InputForm({ onAdd, subjects = [] }) {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({ date: today, hours: "", minutes: "", questions: "", subject: "" });

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.hours && !form.minutes && !form.questions) return;
    onAdd({
      date: form.date,
      hours: (Number(form.hours) || 0) + (Number(form.minutes) || 0) / 60,
      questions: Number(form.questions) || 0,
      subject: form.subject || null,
    });
    setForm({ date: today, hours: "", minutes: "", questions: "", subject: form.subject });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-zinc-500 uppercase tracking-widest">Matéria</label>
          <select
            value={form.subject}
            onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-400"
          >
            <option value="">— nenhuma —</option>
            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
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
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="h"
              value={form.hours}
              min="0"
              max="24"
              onChange={(e) => setForm((p) => ({ ...p, hours: e.target.value }))}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm font-mono text-zinc-200 focus:outline-none focus:border-amber-400 w-full"
            />
            <input
              type="number"
              placeholder="min"
              value={form.minutes}
              min="0"
              max="59"
              onChange={(e) => setForm((p) => ({ ...p, minutes: e.target.value }))}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm font-mono text-zinc-200 focus:outline-none focus:border-amber-400 w-full"
            />
          </div>
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
