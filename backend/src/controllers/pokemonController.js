import * as pokemonService from '../services/pokemonService.js';

export const getPokemon = async (req, res) => {
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: "Pokémon name is required" });

    try {
        const data = await pokemonService.fetchPokemonCompleteData(name);
        return res.json(data);
    } catch (error) {
        if (error.message === 'Pokemon not found') {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
};