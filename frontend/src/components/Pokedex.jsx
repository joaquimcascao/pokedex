import { Search } from "lucide-react";
import { AuthButton } from "./AuthButton";

export const PokedexHomepage = () => {
	return (
		<div className="relative flex justify-center items-center min-h-screen bg-zinc-900 font-sans">

			<div className="absolute top-6 right-8 flex gap-4 items-center text-zinc-400 font-medium">
				<a href="/login" className="hover:text-zinc-100 transition-colors">Login</a>
				<span className="text-zinc-700">|</span>
				<a href="/signup" className="hover:text-zinc-100 transition-colors">Signup</a>
			</div>

			<div className="flex items-center justify-center flex-col gap-2">

				<h1 className="text-zinc-100 text-7xl font-bold tracking-tight flex items-center">
					Pokédex
				</h1>

				<div className="group flex bg-zinc-800/50 border border-zinc-700/50 rounded-full items-center pl-4 pr-1 py-1 focus-within:border-zinc-500 transition-all duration-300">
					<Search className="text-zinc-500 size-5" />
					<input
						type="text"
						placeholder="Type a pokemon's name"
						className="bg-transparent text-zinc-100 py-2 px-3 w-72 outline-0 placeholder:text-zinc-500"
					/>
					<AuthButton variant="minimal">
						Search
					</AuthButton>
				</div>
			</div>
		</div>
	)
}