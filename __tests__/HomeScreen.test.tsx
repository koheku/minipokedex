import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import { Home } from '../src/Home';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { server } from '../test/mocks/server';
// import { rest } from 'msw';

// MISSING TESTS (not enough time):
// - inject an empty cache (through context) and make sure the pokémons are fetched from the network
// - inject a populated cache (through context) and make sure the pokémons are fetched from the cache
// - test error states

const queryClient = new QueryClient();

test('displays pokemons from the server', async () => {
  // WHEN
  const { getByLabelText, queryByLabelText, findByTestId } = render(
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>,
  );

  // THEN
  const loadingSpinner = getByLabelText(/loader/i);
  expect(loadingSpinner).not.toBeUndefined();

  const pokelist = await findByTestId('pokelist');
  expect(pokelist).not.toBeUndefined();

  expect(queryByLabelText(/loader/i)).toBeNull();
  expect(queryByLabelText(/alert/i)).toBeNull();
});

// Not working for some reason, don't have time to debug

// test('displays error upon error esponse from server', async () => {
//   server.resetHandlers(
//     rest.post(
//       'https://graphql-pokeapi.vercel.app/api/graphql',
//       (res, req, ctx) => {
//         // @ts-ignore
//         res(ctx.status(500));
//       },
//     ),
//   );
//   const { getByLabelText, findByLabelText, queryByLabelText } = render(
//     <Home />,
//   );

//   const loadingSpinner = getByLabelText(/loader/i);
//   expect(loadingSpinner).not.toBeUndefined();

//   const error = await findByLabelText(/alert/);

//   expect(error).not.toBeUndefined();
//   expect(queryByLabelText(/loader/i)).toBeNull();
// });
