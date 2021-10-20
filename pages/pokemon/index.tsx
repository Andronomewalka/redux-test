import type { NextPage } from "next";
import React from "react";
import Image from "next/image";
import { useGetPokemonByNameQuery } from "state/pokemon";

const PokemonPage: NextPage = () => {
  const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");

  return (
    <>
      {isLoading && "requesting..."}
      {error && `error - ${error?.error}`}
      {data && (
        <div>
          <h3>{data.species.name}</h3>
          <Image
            src={data.sprites.front_shiny}
            alt={data.species.name}
            width="200"
            height="200"
          />
        </div>
      )}
    </>
  );
};

export default PokemonPage;
