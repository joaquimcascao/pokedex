const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const searchPokemon = async (query) => {
	if (!query) return

	try {
		const response = await fetch("http://localhost:3001/api/pokemon", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: query
			})
		})
		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.error || "Could not find pokémon");
		}
		const data = await response.json()
		return data
	} catch (e) {
		console.log(`Error:`, e)
	}
}