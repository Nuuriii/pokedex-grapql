"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function FetchData() {
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [list, setList] = useState([]);

  const getData = async () => {
    try {
      const { data: get } = await axios.get("/api/graphql");
      setList(get.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Pokemons</h1>
      <ul>
        {list.map((pokemon: any) => (
          <li key={pokemon.id}>
            <p>{pokemon.name}</p>
            <Image
              className="h-[100px] w-auto"
              src={pokemon.artwork}
              alt={pokemon.name}
              width={0}
              height={0}
              sizes="100vw"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
