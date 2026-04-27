export const parseEvolutionChain = (evolutionData) => {
    const chain = []
    let currentStep = evolutionData.chain

    while (currentStep) {
        chain.push(currentStep.species.name)
        currentStep = currentStep.evolves_to[0]
    }
    return chain
}