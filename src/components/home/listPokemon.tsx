"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

export default function ListPokemon() {
  const { isFetching, data, error } = useQuery({
    queryKey: [],
    queryFn: async () => {
      try {
        const { data: get } = await axios.get("/api/graphql");
        return get.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div>
      <ul>
        {isFetching ? (
          <h1 className="text-black">Loading. . .</h1>
        ) : (
          data?.map((pokemon: any) => (
            <li key={pokemon.id}>
              <Image
                height={0}
                width={0}
                sizes="100vw"
                className="h-[80px] w-auto"
                src={pokemon.artwork}
                alt=""
              />
              {pokemon.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
