export function SectionTitle({children}) {
    return (
        <div 
        className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                {children}
            </span>
            <div className="flex-1 h-px bg-zinc-800" />
        </div>
    )
}