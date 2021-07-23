# Mini Pokédex 🐸

Welcome to this (very light) Pokédex app !

I’ve focused mostly on performance. The app features a smooth grid of Pokémon optimised with [recyclerlistview](https://github.com/Flipkart/recyclerlistview) and [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image). It uses [a performant cache](https://github.com/mrousavy/react-native-mmkv) and [react-query](https://github.com/tannerlinsley/react-query) which enabled me to cache data very easily. However, using third party code can prove costly in terms of maintenance and flexibility: in a real life setting, I might design a more custom solution for fetching and caching data to keep full technical ownership of that part of the code.
The Pokémon detail screen is almost empty and should show a clear overview of the Pokémon (type, species, abilities, stats, strengths and weaknesses, evolutions…). Unfortunately, I ran out of time for that.

## Running the app 🐸

Install dependencies
```
yarn install
```

Install pods

```
cd ios
pod install
```

Open `ios/PokedexApp.xcworkspace` in Xcode and run the app with the `PokedexApp-Release` scheme.

## Running tests 🏗

```
yarn test
```

## Performance 🚀
- Uses Hermes
- Uses recyclerlistview rather than FlatList
- Uses react-native-mmkv (performant cache that uses JSI)

Further marginal improvements could be gained by using native navigation and `react-native-bundle-splitter`.


## Missing
- The unit tests aren’t complete (I’ve sketched out a few essential ones in `HomeScreen.test.tsx`)
- The PokemonDetail screen is basically empty (didn’t have time)

## Potential improvements

- Adding a proper splashscreen (github react-native-bootsplash can help)
- Replacing MMKV with WatermelonDB might be a good choice, especially if the cached data grows more complex
- Benchmarking the app with `react-native-performance`
- Generating API types either through GraphQL or OpenAPI
- Better error states and “retry” buttons
- Adding an app icon