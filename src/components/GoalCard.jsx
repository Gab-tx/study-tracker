import { ProgressBar } from "./ProgressBar";

export function GoalCard({label, value, max, unit, color, displayValue}) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-sm font-medium text-zinc-300 mb-4">{label}</p>
            <ProgressBar value={value} max={max} unit={unit} color={color} displayValue={displayValue} />
        </div>
    )
}