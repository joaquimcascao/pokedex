import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001 || 5173

app.use(cors({
  origin: [
    'https://pokedex-joaquim.vercel.app',
    'http://localhost:5173'
  ]
}))
app.use(express.json())

app.post('/api/pokemon', async (req, res) => {
    const POKEMON_NAME = req.body.name?.toLowerCase()

    if (!POKEMON_NAME) return res.status(400).json({ error: "Pokémon name is required" });

    try {
        const [POKEMON_RESPONSE, SPECIES_RESPONSE] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${POKEMON_NAME}`),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${POKEMON_NAME}`)
        ])

        if (!POKEMON_RESPONSE.ok || !SPECIES_RESPONSE.ok) {
            return res.status(404).json({ error: `Pokemon not found` })
        }

        const pokemonData = await POKEMON_RESPONSE.json()
        const speciesData = await SPECIES_RESPONSE.json()
        
        const evolutionChainUrl = speciesData.evolution_chain.url
        const EVOLUTION_RESPONSE = await fetch(evolutionChainUrl)
    
        if (!EVOLUTION_RESPONSE.ok) {
            return res.status(404).json({ error: `Evolution data not found` })
        }
        
        const evolutionData = await EVOLUTION_RESPONSE.json()

        const evolutionChain = []
        
        const firstEvolution = evolutionData.chain.species.name
        evolutionChain.push(firstEvolution)
        
        if (evolutionData.chain.evolves_to && evolutionData.chain.evolves_to.length > 0) {
            const secondEvolution = evolutionData.chain.evolves_to[0].species.name
            evolutionChain.push(secondEvolution)
            
            if (evolutionData.chain.evolves_to[0].evolves_to && evolutionData.chain.evolves_to[0].evolves_to.length > 0) {
                const thirdEvolution = evolutionData.chain.evolves_to[0].evolves_to[0].species.name
                evolutionChain.push(thirdEvolution)
            }
        }

        const evolutionPokemonData = await Promise.all(
            evolutionChain.map(async (name) => {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                    if (response.ok) {
                        return await response.json()
                    }
                    return null
                } catch (error) {
                    console.error(`Error fetching ${name}:`, error)
                    return null
                }
            })
        )

        const validEvolutions = evolutionPokemonData.filter(evo => evo !== null)

        const pokemonTypes = pokemonData.types.map(t => t.type.name)

        const typeRelations = await Promise.all(
            pokemonTypes.map(async (type) => {
                const request = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
                return request.json()
            })
        )
            
        return res.json({
            pokemon: pokemonData,
            species: speciesData,
            typeRelations: typeRelations,
            evolution: evolutionData,
            evolutionChain: validEvolutions, 
        })

    } catch (e) {
        console.error("Server error:", e);
        return res.status(500).json({ error: "Error fetching data from the PokéAPI" });
    }
});

app.all('/keepalive', (req, res) => {
  res.status(200).send('OK')
})

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});