import type { MetaFunction, LoaderFunction, LinksFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import SearchAndFilterForm from "../components/SearchAndFilterForm";
import PokemonList from "../components/PokemonList";

import { getPokemons, getPokemonByName } from "~/api/pokemon";
import styles from '../styles/home.css';
import { useState } from "react";

// SERVER SIDE
export const loader: LoaderFunction = async ({request}) => {
  const url = new URL(request.url);
  const name = url.searchParams.get("name");
  if(name) {
    return getPokemonByName(name.toLowerCase());
  }
  return getPokemons(20, 0)

}

export const links: LinksFunction = () => {
  return [{rel: 'stylesheet', href: styles}];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Pokemix | All Pokemon in the world", 
  viewport: "width=device-width,initial-scale=1",
});

//CLIENT SIDE
export default function Index() {
  let offset = 0;
  let isLoading = false;
  const response = useLoaderData();
  const initialPokemon = response.data;

  const [pokemons, setPokemons] = useState(initialPokemon);

  const loadMore = async () => {
    offset = offset + 20;
    const {data} = await getPokemons(20, offset)
    setPokemons((prevPokemons: any) => [...prevPokemons, ...data]);
  }
  
  return (
    <div>
      <SearchAndFilterForm />
      <PokemonList pokemons={pokemons}/>

      <div className="flex justify-center">
        <button className="bubbly-button" onClick={loadMore}>{isLoading ? 'Loading' : 'Load More'}</button>
      </div> 
    </div>
  );
}
