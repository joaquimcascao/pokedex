export const parseEvolutionChain = (evolutionData) => {
    const chain = [];
    let currentStep = evolutionData.chain;

    while (currentStep) {
        chain.push(currentStep.species.name);
        // Pega apenas a primeira evolução da lista (comum na PokéAPI)
        currentStep = currentStep.evolves_to[0];
    }
    return chain;
};