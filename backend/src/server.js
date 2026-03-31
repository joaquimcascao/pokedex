import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'https://pokedex-joaquim.vercel.app'
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