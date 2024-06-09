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

  return (
    <div className="my-[40px]">
      <ul className="grid justify-items-center grid-cols-4 gap-y-8 xl:grid-cols-5">
        {isFetching && !isLoadingMore ? (
          <h1 className="text-black">Loading. . .</h1>
        ) : (
          pokemonList?.map((pokemon: any, index: number) => (
            <li
              className="w-[200px] flex justify-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md p-0"
              key={index}
            >
              <PokemonCard
                limit={limit}
                img={pokemon.artwork}
                name={pokemon.name}
              />
            </li>
          ))
        )}
      </ul>
      <div className="flex justify-center mt-[40px]">
        <Button onClick={handleLoadMore} disabled={isLoadingMore}>
          {isLoadingMore ? "Loading..." : "Load More"}
        </Button>
      </div>
    </div>
  );
}
