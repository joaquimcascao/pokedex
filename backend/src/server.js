import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.post('/api/pokemon', async (req, res) => {
    const POKEMON_NAME = req.body.name?.toLowerCase()

    if (!POKEMON_NAME) return res.status(400).json({ error: "Pokémon name is required" });

    try {
        const POKEMON_RESPONSE = await fetch(`https://pokeapi.co/api/v2/pokemon/${POKEMON_NAME}`)
        const SPECIES_RESPONSE = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${POKEMON_NAME}`)

        if(!POKEMON_RESPONSE.ok || !SPECIES_RESPONSE.ok) {
            return res.status(404).json({ error: `Pokemon not found`})
        }

        const pokemonData = await POKEMON_RESPONSE.json()
        const speciesData = await SPECIES_RESPONSE.json()

        const pokemonTypes = pokemonData.types.map(t => t.type.name)

        const typeRelations = []


        for (const type of pokemonTypes) {
            const request = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
            const data = await request.json()
            typeRelations.push(data)
        }

        return res.json({
            pokemon: pokemonData,
            species: speciesData,
            typeRelations: typeRelations,
        })

    } catch (e) {
        console.error("Server error:", e);
        return res.status(500).json({ e: "Error fetching data from the PokéAPI" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});