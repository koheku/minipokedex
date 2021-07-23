import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './src/navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MMKV } from 'react-native-mmkv';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createAsyncStoragePersistor } from 'react-query/createAsyncStoragePersistor-experimental';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
    },
  },
});

const asyncStoragePersistor = createAsyncStoragePersistor({
  storage: {
    getItem: (key: string) => {
      const result = MMKV.getString(key);
      return Promise.resolve(result ? result : null);
    },
    setItem: (key: string, value: string) => {
      MMKV.set(key, value);
      return Promise.resolve();
    },
    removeItem: (key: string) => {
      MMKV.delete(key);
      return Promise.resolve();
    },
  },
});

persistQueryClient({
  queryClient,
  persistor: asyncStoragePersistor,
});

import { Home } from './src/Home';
import { PokemonDetail } from './src/PokemonDetail';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HOME"
            component={Home}
            options={{ title: 'Pokédex' }}
          />
          <Stack.Screen
            name="POKEMON_DETAIL"
            component={PokemonDetail}
            options={{ title: 'Pokémon' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
