import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { usePokemon } from './hooks/usePokemon';
import { PokeList } from './PokeList';

const Home = () => {
  const { pokemons, error, isLoading } = usePokemon();

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.centerContainer}>
          <Text accessibilityLabel="alert">{(error as any).message}</Text>
        </View>
      ) : isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator accessibilityLabel="loader" />
        </View>
      ) : pokemons ? (
        <PokeList data={pokemons} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { Home };
