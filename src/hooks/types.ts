// Ideally we would generate these types from a Swagger/OpenAPI schema
// Or we could write GraphQL queries and use the GraphQL schema to generate the types

export type Pokemon = {
  id: string;
  name: string;
  sprites: {
    front_default: string;
  };
};
