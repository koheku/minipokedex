I like the resilience of tests written with [react-native-testing-library](https://github.com/callstack/react-native-testing-library) so I wrote a sample test that uses it.

If I had more time, I would have introduced a custom context provider to inject dependencies (example: a dependency that handles caching data) and would have tested the behaviour of the caching mechanism.

If I’d gone further and implemented my own custom way of fetching and caching data, maybe smaller unit tests would have been required.

> **"If this app were heading to production to be used by millions of users, what other tests would you write? How would you release the app ensuring that there were no bugs, while still enabling engineers to ship features quickly?"**

In that case, end-to-end tests might required, along with automated crash reports and monitoring tools to make sure that the APIs on which the app depends are running smoothly (in this case the app depends on PokeAPI so I might need to host my own backend to ensure reliability and performance).