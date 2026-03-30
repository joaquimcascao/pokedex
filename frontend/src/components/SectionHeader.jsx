export const SectionHeader = ({ title }) => {
    return (
        <div className="flex items-center gap-1.5 mt-2 mb-2">
			<span className="w-0.5 h-3 rounded-full bg-zinc-600" />
			<h2 className="text-zinc-400 font-semibold text-xs">{title}</h2>
		</div>
    )
}