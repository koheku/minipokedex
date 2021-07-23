import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview';
import FastImage from 'react-native-fast-image';
import { PokemonInfo } from './hooks/usePokemon';

const CELL_TYPE_FULL = 'CELL_TYPE_FULL';
const NUMBER_OF_ITEMS_PER_ROW = 2;

let { width } = Dimensions.get('window');

const createDataProvider = (data: Array<PokemonInfo>) =>
  new DataProvider((p1, p2) => p1.name !== p2.name).cloneWithRows(data);

const createLayoutProvider = () =>
  new LayoutProvider(
    () => CELL_TYPE_FULL,
    (type, dim) => {
      switch (type) {
        case CELL_TYPE_FULL:
          dim.width = width / NUMBER_OF_ITEMS_PER_ROW;
          dim.height = 200;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
      }
    },
  );

const rowRenderer = (type: string | number, data: PokemonInfo) => {
  switch (type) {
    case CELL_TYPE_FULL:
      return <PokemonItem item={data} />;
    default:
      return null;
  }
};

const PokemonItem = ({ item }: { item: PokemonInfo }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('POKEMON_DETAIL', { pokemonURL: item.url })
      }
      style={[styles.centerContainer, styles.padding]}>
      <Text style={styles.name}>{`#${item.id}`}</Text>
      <FastImage style={styles.image} source={{ uri: item.image }} />
      <Text accessibilityLabel="Pokémon name" style={styles.name}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export const PokeList = React.memo(({ data }: { data: Array<PokemonInfo> }) => {
  const dataProvider = useMemo(() => createDataProvider(data), [data]);
  const layoutProvider = useRef(createLayoutProvider()).current;

  return (
    <View testID="pokelist" style={styles.container}>
      <RecyclerListView
        layoutProvider={layoutProvider}
        dataProvider={dataProvider}
        rowRenderer={rowRenderer}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 96,
    height: 96,
  },
});
