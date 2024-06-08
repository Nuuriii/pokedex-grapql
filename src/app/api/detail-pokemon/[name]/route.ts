import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { NextResponse, NextRequest } from "next/server";
import client from "@/app/graphql/apolloClient";

export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } },
) {
  try {
    const pokemonName = params.name;
    const { data } = await client.query({
      query: gql`
        query pokemon($name:) {
          pokemon(name: pokemonName) {
            id
            name
            sprites {
              front_default
            }
            moves {
              move {
                name
              }
            }
            types {
              type {
                name
              }
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
