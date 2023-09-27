import { getPokemonData } from "@/functions/api/pokemon"

export default async function PokeCard({params}) {
    const pokemon = await getPokemonData(`https://www.pokeapi.co/api/v2/pokemon/` + params.id)
    return (
        <main>
            <h2>Pokemon Details</h2>
            <p>{pokemon.name}</p>
        </main>
    )
}