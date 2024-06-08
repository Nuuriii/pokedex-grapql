import { NextResponse, NextRequest } from "next/server";
import client from "@/app/graphql/apolloClient";
import { GET_POKEMON_LIST } from "@/app/graphql/query";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get("limit");
  try {
    const { data } = await client.query({
      query: GET_POKEMON_LIST,
      variables: { limit: Number(limit === "0" ? 20 : limit) },
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
