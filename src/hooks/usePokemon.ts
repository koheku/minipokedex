import { useQuery } from 'react-query';

const gqlQuery = `query Pokemons {
  pokemons(limit: 1200, offset: 0) {
    count
    next
    previous
    status
    message
    results {
      url
      name
      image
      id
    }
  }
}`;

export type PokemonInfo = {
  id: string;
  image: string;
  name: string;
  url: string;
};

const usePokemon = () => {
  // I should be fetching 'https://pokeapi.co/api/v2/pokemon?limit=1200'
  // Here we are using a 3rd party GraphQL adapter for pokeapi
  // This is the only way I've found to get a JSON with a list of pokémons that includes a picture
  // (without having a make an additional request for each pokémon)
  // See the 'usePokemonDetail' hook for a direct call to pokeapi

  const { isLoading, error, data } = useQuery<Array<PokemonInfo>>(
    'pokemon-list',
    () =>
      fetch('https://graphql-pokeapi.vercel.app/api/graphql', {
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: gqlQuery,
        }),
        method: 'POST',
      })
        .then(res => res.json())
        .then(res => {
          return res.data.pokemons.results;
        }),
  );

  return {
    pokemons: data,
    error,
    isLoading,
  };
};

export { usePokemon };
