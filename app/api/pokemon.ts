const apiUrl = 'https://graphql-pokeapi.vercel.app/api/graphql';

export function pokemonTypes(name: string) {
  return `
    query {
      pokemon(name: "${name}") {
        id
        name
        types {
          type {
            name
          }
        }
      }
    }
  `
}

export function pokemonDetail(name: string) {
  return `
    query {
      pokemon(name: "${name}") {
        id
        name
        height
        weight
        species {
          name
        }
        abilities {
          ability {
            name
          }
        }
        stats {
          base_stat
          stat {
            name
          }
        }
        types {
          type {
            name
          }
        }
        abilities {
          ability {
            name
          }
        }
        moves {
          move {
            name
          }
        }
      }
    }
  `
}

export function allPokemon(limit: number, offset: number) {
 return `
  query {
    pokemons(limit: ${limit}, offset: ${offset}, ) {
      count
      results {
        id
        name
      }
    }
  }
 `
}

export async function fetchPokemonApi(query: string) {
  const response = await fetch(apiUrl, {
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query
    }),
    method: "POST"
  }).then(res => res.json());
  return response.data
}

export async function getPokemonByName(name: string) {
  const data =  await fetchPokemonApi(pokemonDetail(name))
  return {
    data: [
      {
        ...data.pokemon,
        types: data.pokemon.types.map((type: { type: { name: string; }; }) => type.type.name)
      }
    ]
  }
}

export async function getPokemons(limit: number, offset: number) {
  const allPokemons = await fetchPokemonApi(allPokemon(limit, offset));
  const pokemons = allPokemons.pokemons.results

  return Promise.all(pokemons.map((pokemon: { name: string; }) => fetchPokemonApi(pokemonTypes(pokemon.name))))
    .then((singlePokemon) => {
      return ({
        count: allPokemons.pokemons.count,
        data: pokemons.map((pokemon: { id: string; name: string; }) => ({
          name: pokemon.name,
          id: pokemon.id,
          types: singlePokemon.filter((val) => val.pokemon.name === pokemon.name)[0].pokemon.types.map((type: { type: { name: string; }; }) => type.type.name)
        })),
      });
    });
}
