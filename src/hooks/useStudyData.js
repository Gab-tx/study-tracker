import { useState, useEffect } from 'react'

const INITIAL_STATE = {
    sessions: [],
    goals: { hours: 100, days: 30, questions: 1000 },
    subjects: []
}

export function useStudyData() {
    const [data, setData] = useState(()=>{
        try {
            const saved = localStorage.getItem('studytracker')
            if (!saved) return INITIAL_STATE
            const parsed = JSON.parse(saved)
            return { ...INITIAL_STATE, ...parsed }
        } catch {
            return INITIAL_STATE
        }
    })

    useEffect(()=>{
        localStorage.setItem('studytracker', JSON.stringify(data))   
    }, [data])

    function addSubject(name) {
        const trimmed = name.trim()
        if (!trimmed) return
        setData(prev => {
            if (prev.subjects.includes(trimmed)) return prev
            return { ...prev, subjects: [...prev.subjects, trimmed].sort() }
        })
    }

    function removeSubject(name) {
        setData(prev => ({ ...prev, subjects: prev.subjects.filter(s => s !== name) }))
    }

    function addSession(session) {
        setData(prev => ({
            ...prev, sessions:[...prev.sessions, session].sort((a,b)=>
            b.date.localeCompare(a.date)
            )
        }))
    }

    function addSessions(newSessions) {
        setData(prev => ({
            ...prev,
            sessions: [...prev.sessions, ...newSessions].sort((a, b) =>
                b.date.localeCompare(a.date)
            )
        }))
    }

    function deleteSession(index) {
        setData(prev => ({
            ...prev,
            sessions: prev.sessions.filter((_, i) => i !== index),
        }))
    }

    function updateGoals(goals) {
        setData(prev => ({...prev, goals }))
    }

    return {
        sessions: data.sessions,
        goals: data.goals,
        subjects: data.subjects,
        addSession,
        addSessions,
        deleteSession,
        updateGoals,
        addSubject,
        removeSubject,
    }
}

