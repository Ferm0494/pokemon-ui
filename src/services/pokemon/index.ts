import axios from "axios";
import { Pagination } from "@/types";
//  We can store this in a process.env but for sake of simplicity I'm going to put it here.
const BASE_URL = "https://pokeapi.co/api/v2";

interface BaseResponse {
  count: number;
  next: string | null;
  previous: string | null;
}

type PokemonDetailsParams = {
  id?: string | number;
  url?: string;
};

interface MetaData {
  name: string;
  url: string;
}

interface PokemonList extends BaseResponse {
  results: MetaData[];
}

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
}

interface DetailedPokemon extends Omit<Pokemon, "types"> {
  types: MetaData[];
}

interface RawPokemon {
  id: number;
  name: string;
  types: {
    slot: number,
    type: MetaData
  }[],
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
      home: {
        front_default: string;
      };
    };
  };
}

export async function getPokemonList(
  pagination: Pagination = {
    limit: 10,
    offset: 0,
  }
): Promise<
  Pagination & {
    data: Pokemon[];
  }
> {
  const response = await axios.get<PokemonList>(
    `${BASE_URL}/pokemon?limit=${pagination.limit}&offset=${pagination.offset}`
  );

  const pokemonList = await Promise.all(
    response.data.results.map((pokemon) =>
      getPokemonDetails({ url: pokemon.url })
    )
  );
  //   console.log("Fer", pokemonList)
  return {
    data: pokemonList,
    limit: pagination.limit,
    offset: pagination.offset,
  };
}

export async function getPokemonDetails(
  params: PokemonDetailsParams
): Promise<Pokemon>;
export async function getPokemonDetails(
  params: PokemonDetailsParams & { highlyDetailed: true }
): Promise<DetailedPokemon>;
export async function getPokemonDetails({
  id,
  url,
  highlyDetailed,
}: PokemonDetailsParams & { highlyDetailed?: boolean }): Promise<
  Pokemon | DetailedPokemon
> {
  if (!id && !url)
    throw new Error(
      "You must provide either an id or a url to fetch a pokemon"
    );
  const response = await axios.get<RawPokemon>(
    url || `${BASE_URL}/pokemon/${id}`
  );
  const { sprites, ...data } = response.data;
  if (highlyDetailed) {
    return {
      ...data,
      image:
        sprites.other["official-artwork"].front_default ||
        sprites.other["home"].front_default ||
        sprites.front_default,
    };
  }

  return {
    name: data.name,
    id: data.id,
    types: data.types.map(({ type }) => type.name),
    image:
      sprites.other["official-artwork"].front_default ||
      sprites.other["home"].front_default ||
      sprites.front_default,
  };
}
