export const SpritesLayout = ({ sprite, alt = "pokemon", variant = "primary", className = "" }) => {
	const variants = {
		primary: "w-28 h-28 bg-zinc-900 rounded-lg border-3 border-black",
		minimal: "w-16 h-16 bg-zinc-900 rounded-lg border-3 border-black"
	};
	return (
		<div className={`${variants[variant]} ${className}`}>
			<img src={sprite} alt={alt}
				className="w-full h-full object-contain" />
		</div>
	)
}