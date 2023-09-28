import Image from 'next/image';
import Link from 'next/link';
import { getPokeID, transformPokemonName } from '@/functions/global';
import { getPokemonData, getPokemonDetails } from '@/functions/api/pokemon';

export default async function PokeList() {
  const pokemonData = await getPokemonData('https://pokeapi.co/api/v2/pokemon?limit=809&offset=0');
  const pokemonWithDetails = await getPokemonDetails(pokemonData.results);
  return (
    <div className="pokemon-wrapper grid grid-cols-12 gap-4">
      {pokemonWithDetails.map((pokemon) => {
        const pokemonName = transformPokemonName(pokemon.name);
        return (
          <div className="pokemon text-center" key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.name}`}>
              <p className="id-number">#{getPokeID(pokemon.id)}</p>
              {pokemon.front_default && (
                <Image src={pokemon.front_default} alt={pokemon.name} width={100} height={100} priority={true} className='mx-auto'/>
              )}
              <h1 className='capitalize'>{pokemonName}</h1>
            </Link>
          </div>
        );
      })}
    </div>
  );
}