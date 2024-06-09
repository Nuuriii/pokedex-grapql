import { NextResponse, NextRequest } from "next/server";
import client from "@/app/graphql/apolloClient";
import { GET_POKEMON_LIST, GET_POKEMON_DETAIL } from "@/app/graphql/query";

const getDetail = async (name: string) => {
  try {
    const { data: detail } = await client.query({
      query: GET_POKEMON_DETAIL,
      variables: { name: name },
    });
    return detail;
  } catch (error) {
    console.log(error);
  }
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get("limit");
  const name = searchParams.get("name");

  try {
    const { data } = await client.query({
      query: GET_POKEMON_LIST,
      variables: { limit: Number(limit === "0" ? 20 : limit) },
    });

    if (name !== "") {
      const detail = await getDetail(`${name}`);

      return NextResponse.json({
        message: "success",
        data: data.pokemons.results,
        detail: detail.pokemon,
      });
    }

    return NextResponse.json({
      message: "success",
      data: data.pokemons.results,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "error" });
  }
}
