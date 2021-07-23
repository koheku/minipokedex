import { graphql, rest } from 'msw';
import pokemons from './pokemons.json';

export const handlers = [
  rest.post(
    'https://graphql-pokeapi.vercel.app/api/graphql',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: pokemons,
        }),
      );
    },
  ),
  // graphql.query('Pokemons', (req, res, ctx) => {
  //   console.log('HELLO');
  //   return res(
  //     ctx.data({
  //       pokemons,
  //     }),
  //   );
  // }),
];
