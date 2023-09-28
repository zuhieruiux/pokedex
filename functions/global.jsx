export const getPokeID = (id) => {
    if (id >= 10 && id < 100) return `0${id}`
    if (id >= 100) return `${id}`
    return `00${id}`
}

export function transformPokemonName(name) {
    // Replace -f with ♀️ (female symbol) and -m with ♂️ (male symbol)
    return name.replace(/-f\b/g, '♀️').replace(/-m\b/g, '♂️').replace(/-(?=\S)/g, ' ')
}