export function parseCSV(text) {
  const [header, ...rows] = text.trim().split('\n')
  const cols = header.split(',').map(c => c.trim().toLowerCase())

  const required = ['data', 'horas', 'minutos', 'questoes', 'materia']
  if (!required.every(c => cols.includes(c)))
    throw new Error(`Colunas esperadas: ${required.join(', ')}`)

  const sessions = []
  const newSubjects = new Set()
  const errors = []

  rows.forEach((row, i) => {
    if (!row.trim()) return
    const values = row.split(',').map(v => v.trim())
    const obj = Object.fromEntries(cols.map((c, j) => [c, values[j]]))

    const date = obj.data
    const hours = (Number(obj.horas) || 0) + (Number(obj.minutos) || 0) / 60
    const questions = Number(obj.questoes) || 0
    const subject = obj.materia

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      errors.push(`Linha ${i + 2}: data inválida "${date}" (use AAAA-MM-DD)`)
      return
    }

    if (subject) newSubjects.add(subject)
    sessions.push({ date, hours, questions, subject })
  })

  return { sessions, newSubjects: [...newSubjects], errors }
}
