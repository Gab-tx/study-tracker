export function fmtHours(decimal) {
  const h = Math.floor(decimal);
  const m = Math.round((decimal - h) * 60);
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h${String(m).padStart(2, '0')}min`;
}

export function getTotalHours(sessions) {
  return sessions.reduce((acc, s) => acc + Number(s.hours), 0);
}

export function getTotalQuestions(sessions) {
  return sessions.reduce((acc, s) => acc + Number(s.questions), 0);
}

export function getStudyDays(sessions) {
  return new Set(sessions.map((s) => s.date)).size;
}

export function getAverageHours(sessions) {
  const days = getStudyDays(sessions);
  return days === 0 ? 0 : getTotalHours(sessions) / days;
}

export function getAverageQuestions(sessions) {
  const days = getStudyDays(sessions);
  return days === 0 ? 0 : getTotalQuestions(sessions) / days;
}

export function getStreak(sessions) {
  if (!sessions.length) return 0;

  const dates = [...new Set(sessions.map((s) => s.date))].sort().reverse();
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (dates[0] != today && dates[0] != yesterday) return 0;
  let streak = 1;
  for (let i = 0; i < dates.length - 1; i++) {
    const diff = new Date(dates[i] - new Date(dates[i + 1]));
    if (diff < 86400000) streak++;
    else break;
  }
  return streak;
}

export function getAproveitamento(sessions) {
  if (!sessions.length) return 0;
  const dates = [...new Set(sessions.map((s) => s.date))].sort().reverse();
  const first = new Date(dates[0]);
  const today = new Date();
  const totalDays = Math.max(1, Math.round((today - first) / 86400000) + 1);

  return Math.min(100, Math.round((dates.length / totalDays) * 100));
}

export function getWeeklyHours(sessions) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7);
  return sessions
    .filter((s) => new Date(s.date) >= cutoff)
    .reduce((acc, s) => acc + Number(s.hours), 0);
}

export function getMonthlyHours(sessions) {
    const now = new Date()
    return sessions
    .filter(s => {
        const d = new Date(s.date)
        return d.getMonth( ) === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
    })
    .reduce((acc, s) => acc + Number(s.hours), 0);
}

export function getBestDay(sessions) {
    if (!sessions.length) return null
    const byDate = {}
    sessions.forEach(s => {
        byDate[s.date] = (byDate[s.date] || 0) + Number(s.hours)
    })
    return Object.entries(byDate).sort((a, b) => b[1] - a[1])[0]
}

export function getLast7DaysData(sessions) {
    const days = []
    for (let i = 6; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const date = d.toISOString().slice(0,10)
        const label = d.toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'})
        const hours = sessions
        .filter(s => s.date === date)
        .reduce((acc, s)=> acc+Number(s.hours), 0)
        days.push({ date, label, hours })
    }
    return days
}