import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { NextResponse } from "next/server";

const BASE_API_URL = process.env.BASE_API_URL;

const client = new ApolloClient({
  uri: BASE_API_URL,
  cache: new InMemoryCache(),
});

export async function GET() {
  try {
    const { data } = await client.query({
      query: gql`
        query GetPokemons {
          pokemons(limit: 10) {
            results {
              id
              name
              artwork
            }
          }
        }
      `,
    });

    return NextResponse.json({
      message: "success",
      data: data.pokemons.results,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "error" });
  }
}
