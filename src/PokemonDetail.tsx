import React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from './navigation';
import { usePokemonDetail } from './hooks/usePokemonDetail';
import FastImage from 'react-native-fast-image';

type Props = StackScreenProps<RootStackParamList, 'POKEMON_DETAIL'>;

const PokemonDetail = ({
  route: {
    params: { pokemonURL },
  },
}: Props) => {
  const { pokemon, error, isLoading } = usePokemonDetail(pokemonURL);
  return (
    <ScrollView style={styles.container}>
      {error ? (
        <Text>{(error as any).description}</Text>
      ) : isLoading ? (
        <ActivityIndicator />
      ) : pokemon ? (
        <View style={styles.centerContainer}>
          <FastImage
            style={styles.image}
            source={{ uri: pokemon.sprites.front_default }}
          />
          <Text style={styles.name}>{pokemon.name}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  padding: {
    padding: 15,
  },
  image: {
    margin: 5,
    width: 192,
    height: 192,
  },
});

export { PokemonDetail };
