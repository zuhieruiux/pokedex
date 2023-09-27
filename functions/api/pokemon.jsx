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
            return {
                name: pokemon.name,
                url: pokemon.url,
                front_default: front_default,
                id: details.id,
            };
        })
    );

    return pokemonWithDetails;
}
