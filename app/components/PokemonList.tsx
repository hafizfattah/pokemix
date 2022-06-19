import { Link } from "@remix-run/react";
import type { Key } from "react";

type PokemonListProps = {
    pokemons: Pokemon[];
}

export default function PokemonList({ pokemons }: PokemonListProps) {
  return (
    <div className="pokemon-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {pokemons.map((pokemon: { types:[]; id: Key; name: string; }, index: Key) => 
        <Link key={index} className={`pokemon-card p-2 flex items-end justify-between ${pokemon.types[0]}`} to={`detail/${pokemon.name}`} prefetch="intent">
          <div>
            <h3 className="poke-id text-4xl font-bold absolute top-3 left-3">#{pokemon.id}</h3>
            <div className="poke-name capitalize font-bold">{pokemon.name}</div>
            <div className="types">
              {pokemon.types.map((type: string) => 
                <span  key={type} className={` types-label mr-1 mt-1 inline-block ${type}-darker`}>{type}</span>
              )}
            </div>
          </div>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt={pokemon.name} width="200" height="200" className="poke-image relative" />
        </Link>
      )}
    </div>
  )
}
