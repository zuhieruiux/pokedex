export async function getPokemonData(pokemonData) {
      const res = await fetch(pokemonData)
    
      if (!res.ok) {
        throw new Error('Failed to fetch Pokemon data')
      }
    
      const data = await res.json()
      return data
}

// PokeList to dig into url of Pokemon to fetch more details
export async function getPokemonDetails(pokemonData) {
    const pokemonWithDetails = await Promise.all(
        pokemonData.map(async (pokemon) => {
            const details = await getPokemonData(pokemon.url)
            const front_default = details.sprites.front_default
            const animated_front_default = details.sprites.versions['generation-v']['black-white']['animated']['front_default']
            const types = details.types.map(allType => allType.type.name);
            return {
                name: pokemon.name,
                url: pokemon.url,
                front_default: front_default,
                animated_front_default: animated_front_default,
                types: types,
                id: details.id,
            };
        })
    );

    return pokemonWithDetails;
}

const typePriorities = {
    fire: 1,
    water: 1,
    grass: 1,
    steel: 1,
    electric: 1,
    ice: 1,
    rock: 1,
    ground: 2,
    poison: 2,
    flying: 2,
    fairy: 2,
    shadow: 2,
    normal: 3,
    fighting: 3,
    bug: 3,
    ghost: 3,
    unknown: 3,
    dragon: 3,
    dark: 3,
    psychic: 3,
}
// Define background gradients for each type
const typeColors = {
    fire: 'linear-gradient(to bottom, #ffffff, #ff9800)',
    water: 'linear-gradient(to bottom, #ffffff, #03a9f4)',
    grass: 'linear-gradient(to bottom, #ffffff, #8bc34a)',
    steel: 'linear-gradient(to bottom, #ffffff, #78909c)',
    electric: 'linear-gradient(to bottom, #ffffff, #ffeb3b)',
    ice: 'linear-gradient(to bottom, #ffffff, #00bcd4)',
    rock: 'linear-gradient(to bottom, #ffffff, #8d6e63)',
    ground: 'linear-gradient(to bottom, #ffffff, #9c786c)',
    poison: 'linear-gradient(to bottom, #ffffff, #e91e63)',
    flying: 'linear-gradient(to bottom, #ffffff, #00bcd4)',
    fairy: 'linear-gradient(to bottom, #ffffff, #f06292)',
    shadow: 'linear-gradient(to bottom, #ffffff, #424242)',
    normal: 'linear-gradient(to bottom, #ffffff, #bdbdbd)',
    fighting: 'linear-gradient(to bottom, #ffffff, #f44336)',
    bug: 'linear-gradient(to bottom, #ffffff, #cddc39)',
    ghost: 'linear-gradient(to bottom, #ffffff, #9c27b0)',
    unknown: 'linear-gradient(to bottom, #ffffff, #78909c)',
    dragon: 'linear-gradient(to bottom, #ffffff, #ff9800)',
    dark: 'linear-gradient(to bottom, #ffffff, #616161)',
    psychic: 'linear-gradient(to bottom, #ffffff, #ff5722)',
    // Add other types and gradients as needed
    default: 'linear-gradient(to bottom, #9e9e9e, #bdbdbd)'
}
  
// Function to determine the background color based on the type priority
export function getTypeBackgroundColor(types) {
    // Sort the types based on their priority
    const sortedTypes = types.sort((a, b) => typePriorities[a] - typePriorities[b])
  
    // Use the type with the highest priority for the background color
    const highestPriorityType = sortedTypes[0]
  
    // Return the corresponding background color
    return typeColors[highestPriorityType] || typeColors.default;
}