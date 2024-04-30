import axios from "axios";
import {
  Pagination,
  BaseResponse,
  DetailedPokemon,
  Pokemon,
  PokemonDetailsParams,
  PokemonList,
} from "@/types";
//  We can store this in a process.env but for sake of simplicity I'm going to put it here.
const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(pagination: Pagination): Promise<
  Pagination &
    Pick<BaseResponse, "count"> & {
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
    count: response.data.count,
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
  const response = await axios.get<DetailedPokemon>(
    url || `${BASE_URL}/pokemon/${id}`
  );
  const { sprites, ...data } = response.data;
  if (highlyDetailed) {
    return {
      ...data,
      sprites,
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
