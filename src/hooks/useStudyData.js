import { useState, useEffect } from 'react'

const INITIAL_STATE = {
    sessions: [],
    goals: { hours: 100, days: 30, questions: 1000}
}

export function useStudyData() {
    const [data, setData] = useState(()=>{
        try {
            const saved = localStorage.getItem('studytracker')
            return saved ? JSON.parse(saved) : INITIAL_STATE
        } catch {
            return INITIAL_STATE
        }
    })

    useEffect(()=>{
        localStorage.setItem('studytracker', JSON.stringify(data))   
    }, [data])

    function addSession(session) {
        setData(prev => ({
            ...prev, sessions:[...prev.sessions, session].sort((a,b)=>
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
        addSession,
        deleteSession,
        updateGoals,
    }
}

