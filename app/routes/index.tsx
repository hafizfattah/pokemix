import type { MetaFunction, LoaderFunction, LinksFunction } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import SearchAndFilterForm from "../components/SearchAndFilterForm";
import PokemonList from "../components/PokemonList";

import { getPokemons, getPokemonByName } from "~/api/pokemon";
import styles from '../styles/home.css';
import { useCallback, useEffect, useState } from "react";

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
  let isLoading = false;
  const response = useLoaderData();
  const count = response?.count;
  const initialPokemon = response.data;

  const [pokemons, setPokemons] = useState(initialPokemon);

  const [offset, setoffset] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [pokemonListHeight, setPokemonListHeight] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isFetching, setIsFetching] = useState(false);


  const loadMore = async () => {
    setoffset(offset + 20);
    setIsFetching(true);

    const {data} = await getPokemons(20, offset)
    setPokemons((prevPokemons: any) => [...prevPokemons, ...data]);

    setIsFetching(false);
    if(pokemons.length >= count) {
      setShouldFetch(false);
      return
    }
    setShouldFetch(true);
  }

  const divBottom = useCallback(
    (node) => {
      if (node !== null) {
        setPokemonListHeight(node.getBoundingClientRect().height);
      }
    },
    [pokemons.length]
  );

  useEffect(() => {
    const scrollListener = () => {
      setClientHeight(window.innerHeight);
      setScrollPosition(window.scrollY);
    };
    // Avoid running during SSR
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", scrollListener);
    }

    // Clean up
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", scrollListener);
      }
    };

  }, []);

  useEffect(() => {
    if (!shouldFetch || !pokemonListHeight) return;
    if (clientHeight + scrollPosition + 100 < pokemonListHeight) return;

    loadMore()
    setShouldFetch(false);

  }, [clientHeight, scrollPosition]);

  
  return (
    <div>
      <SearchAndFilterForm />
      <div ref={divBottom}>
        <PokemonList pokemons={pokemons}/>
      </div>
      <div className="flex justify-center">
        {isFetching ? 'Loading...' : 'No more pokemons'}
      </div> 
    </div>
  );
}
