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
		const data = await response.json()
		console.log(data)
		return data
	} catch (e) {
		console.log(`Error:`, e)
	}
}