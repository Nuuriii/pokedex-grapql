"use client";
import axios from "axios";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { PokemonCard } from "./pokemonCard";
import { useState, useEffect } from "react";
import { Button } from "../common";

export default function ListPokemon() {
  const [limit, setLimit] = useState<number>(10);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [pokemonList, setPokemonList] = useState<any[]>([]);

  const { isFetching, data, error } = useQuery({
    queryKey: [limit],

    queryFn: async () => {
      try {
        const { data: get } = await axios.get(
          `/api/list-pokemon?limit=${limit}`,
        );
        setPokemonList(get.data);
        setIsLoadingMore(false);

        return get.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setLimit((prevLimit) => prevLimit + 10);
  };
  console.log(pokemonList);

  return (
    <div className="">
      <ul className="grid justify-items-center grid-cols-4 gap-3">
        {isFetching && !isLoadingMore ? (
          <h1 className="text-black">Loading. . .</h1>
        ) : (
          pokemonList?.map((pokemon: any) => (
            <li key={pokemon.id}>
              <PokemonCard
                loadMoreLoading={isLoadingMore}
                img={pokemon.artwork}
                name={pokemon.name}
              />
            </li>
          ))
        )}
      </ul>
      <Button onClick={handleLoadMore} disabled={isLoadingMore}>
        {isLoadingMore ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
}
