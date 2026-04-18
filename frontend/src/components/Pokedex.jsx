import { Search } from "lucide-react";
import { AuthButton } from "./AuthButton";
import { useState } from "react";
import { AtributteLayout } from "./AtributteLayout";
import { searchPokemon } from "../services/pokemonService";
import { SectionHeader } from "./SectionHeader";
import { SpritesLayout } from "./SpritesLayout";

export const PokedexHomepage = () => {

	const [query, setQuery] = useState("")
	const [banner, setBanner] = useState(null)
	const [notFound, setNotFound] = useState(false)

	const handleSearch = async (e) => {
		e.preventDefault();

		const data = await searchPokemon(query)
		setBanner(data ?? null)
		console.log(data)
		setNotFound(!data)
	}

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
					<form onSubmit={handleSearch}>
						<input
							id="search"
							type="text"
							autoComplete="off"
							placeholder="Type a pokemon's name"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="bg-transparent text-zinc-100 py-2 px-3 w-72 outline-0 placeholder:text-zinc-500"
						/>
						<AuthButton type="submit" variant="minimal">
							Search
						</AuthButton>
					</form>
				</div>
				{notFound &&
					<div className="flex-col items-center justify-center">
						<h1 className="text-zinc-100 font-bold">Pokémon not found!</h1>
					</div>
				}
				{banner && (
					<div className="flex gap-5 p-5 border-2 rounded-lg bg-zinc-800/50 outline-0">
						<SpritesLayout sprite={banner?.pokemon.sprites?.front_default} />
						<div className="flex-col">
							<div className="flex gap-2">
								<h1 className="text-zinc-100 font-bold text-2xl">
									{banner?.pokemon?.name?.toUpperCase()}
								</h1>
								<h2 className="text-zinc-400 font-bold text-2xl">#{banner?.pokemon?.id}</h2>
							</div>
							<div className="flex-col -mt-1 mb-3">
								<h1
									className="text-zinc-400 font-bold text-xs">
									{banner?.species?.generation?.name.split("-").join(" ").toUpperCase()}
								</h1>
							</div>
							<SectionHeader
								title={"Type"}
								type={banner?.pokemon.types[0].type.name}
							/>
							<AtributteLayout
								attribute={banner?.pokemon.types.map(t => t.type.name)}
							/>
							<SectionHeader
								title={"Weakness:"}
								type={banner?.typeRelations[0].damage_relations.double_damage_from[0].name}
							/>
							<AtributteLayout
								attribute={banner?.typeRelations[0].damage_relations.double_damage_from.map(t => t.name)}
							/>
							{banner?.evolutionChain && banner.evolutionChain.length > 1 && (
								<div className="mt-3 mb-2">
									<SectionHeader
										title={"Evolution Chain"}
										type={banner.evolutionChain[0]?.types?.[0]?.type?.name}
									/>
									<div className="flex gap-3">
										{banner.evolutionChain.map((evolution, index) => (
											<SpritesLayout 
												key={evolution.id || index}
												variant="minimal" 
												sprite={evolution?.sprites?.front_default}
												name={evolution?.name}
											/>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}