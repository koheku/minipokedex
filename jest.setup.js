import { server } from './test/mocks/server';
import fetch from 'node-fetch';

global.fetch = fetch;

beforeAll(() => server.listen());

beforeEach(() => {
  // global.fetch = jest.fn((...args) => {
  //   console.warn('global.fetch needs to be mocked in tests', ...args);
  //   throw new Error('global.fetch needs to be mocked in tests');
  // });
});

//clean up after the tests are finished
afterAll(() => server.close());

afterEach(() => {
  // global.fetch.mockRestore();
  //reset any requests handlers that we may add during the tests,
  //so they don't affect other tests.
  server.resetHandlers();
});
