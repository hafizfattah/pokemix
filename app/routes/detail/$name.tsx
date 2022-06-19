import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Key } from "react";
import { getPokemonByName } from "~/api/pokemon";

// SERVER SIDE
export const loader: LoaderFunction = async ({params}) => {
  const name = params.name
  const pokemon = await getPokemonByName(name);
  return pokemon.data[0]
}

export default function DetailId() {
  let pokemon = useLoaderData(); 
  console.log(pokemon)

  const formatWeightHeight = (val: number) => {
    return val / 10;
  }
  return (
    <div className="bg-white md:p-12 p-4 rounded-3xl relative overflow-hidden box-shadowed">
      <div className={`overlay ${pokemon.types[0]}`}></div>
      <div className="relative">
        <div className="flex flex-row justify-between items-center text-2xl md:text-6xl">
          <h1 className="capitalize font-bold">{pokemon.name} </h1>
          <h3 className="font-bold" >#{pokemon.id}</h3>
        </div>
       

        <div className="flex flex-col items-center justify-center">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} />
          <div className="flex flex-row items-center">
            {pokemon.types.map((type: string, index: Key) => 
              <div key={index} className={`mx-2 capitalize types-label types-label--bigger ${type}-darker`}>{type}</div>
            )}
          </div>
          <div className="flex flex-row mt-6 justify-between md:w-auto w-full">
            
            <div className="text-left">
              <h3 className="md:text-2xl text-base font-bold">Height</h3>
              <span>{formatWeightHeight(pokemon.height)} M</span> 
            </div>
            <div className="md:mx-8 mx-0 h-auto w-[2px] bg-black"></div>
            <div className="text-center">
              <h3 className="md:text-2xl text-base font-bold">Species</h3>
              <span className="capitalize">{pokemon.species.name}</span>
            </div>
            <div className="md:mx-8 mx-0 h-auto w-[2px] bg-black"></div>
            <div className="text-right">
              <h3 className="md:text-2xl text-base font-bold">Weight</h3>
              <span>{formatWeightHeight(pokemon.weight)} Kg</span>
            </div>
            
          </div>

          <div className="skills-table w-full mt-8">
            <div className="skill">
              <div className="skill-name uppercase">Abilities</div>
              <div className="grid-col-2 bg-white">
                {pokemon.abilities.map((item: { ability: { name : string }},  index: Key) => 
                  <div key={index} className={`capitalize inline-block mr-3 py-1 px-2   ${pokemon.types[0]}`}>{item.ability.name}</div>
                )}
              </div>

            </div>
            {pokemon.stats.map((stat: any, index: Key) => 
              <div  key={index} className="skill">
                <div className="skill-name uppercase">{stat.stat.name}</div>
                <div className="skill-bar">
                  <div className={`skill-track ${pokemon.types[0]}`} style={{width: `${stat.base_stat}%`}}>{stat.base_stat}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
