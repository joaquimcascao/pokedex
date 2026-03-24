export const AuthButton = ({ children, onClick, variant = "primary", className = "" }) => {
	const base = "cursor-pointer transition-colors";

	const variants = {
		primary: "bg-red-600 text-zinc-50 hover:bg-red-700 p-2 rounded-md",
		minimal: "bg-transparent text-zinc-400 hover:text-zinc-100 px-3"
	};

	return (
		<button
			onClick={onClick}
			className={`${base} ${variants[variant]} ${className}`}
		>
			{children}
		</button>
	);
};