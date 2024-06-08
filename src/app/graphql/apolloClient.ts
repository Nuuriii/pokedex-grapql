import { ApolloClient, InMemoryCache } from "@apollo/client";

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const client = new ApolloClient({
  uri: `${BASE_API_URL}`,
  cache: new InMemoryCache(),
});

export default client;
