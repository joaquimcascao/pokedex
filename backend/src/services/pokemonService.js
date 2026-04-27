import { parseEvolutionChain } from '../utils/evolutionParser.js';

export const fetchPokemonCompleteData = async (pokemonName) => {
    const name = pokemonName.toLowerCase();

    const [pokeRes, speciesRes] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
    ]);

    if (!pokeRes.ok || !speciesRes.ok) throw new Error('Pokemon not found');

    const pokemonData = await pokeRes.json();
    const speciesData = await speciesRes.json();

    const evolutionRes = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionRes.json();
    const evolutionNames = parseEvolutionChain(evolutionData);

    const evolutionChain = await Promise.all(
        evolutionNames.map(async (n) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
            return res.ok ? res.json() : null;
        })
    );

    const typeRelations = await Promise.all(
        pokemonData.types.map(async (t) => {
            const res = await fetch(t.type.url);
            return res.json();
        })
    );

    return {
        pokemon: pokemonData,
        species: speciesData,
        typeRelations,
        evolution: evolutionData,
        evolutionChain: evolutionChain.filter(Boolean),
    };
};