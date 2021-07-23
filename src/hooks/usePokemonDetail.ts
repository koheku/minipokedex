import { useQuery } from 'react-query';
import { Pokemon } from './types';

const usePokemonDetail = (pokemonURL: string) => {
  const { isLoading, error, data } = useQuery<Pokemon>(pokemonURL, () =>
    fetch(pokemonURL).then(res => res.json()),
  );

  return {
    pokemon: data,
    error,
    isLoading,
  };
};

export { usePokemonDetail };
