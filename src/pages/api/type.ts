import type { NextApiRequest, NextApiResponse } from "next";
import { getPokemonsByType } from "@/services/pokemon";
import { MetaData, PokemonByType } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const PAGE_SIZE = 3;
  const { type, page = "1", matches } = req.query;
  if (!type) {
    return res.status(400).json({ name: "Type is required" });
  }

  const pageNumber = parseFloat(page as string);
  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    return res.status(400).json({ name: "Invalid page number" });
  }

  if (matches && matches !== "favorable" && matches !== "unfavorable") {
    return res.status(400).json({ name: "Invalid matches parameter" });
  }

  const pokemons = await getPokemonsByType(type as string);
  const sortedPokemons = pokemons.pokemon.sort((a, b) => a.slot - b.slot);

  const start = (pageNumber - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  let favorableMatches: MetaData[] = [];
  let unfavorableMatches: MetaData[] = [];

  if (matches === "favorable") {
    favorableMatches = sortedPokemons
      .filter((pokemon) => pokemon.slot === 1)
      .slice(start, end).map((pokemon) => pokemon.pokemon);
  } else if (matches === "unfavorable") {
    unfavorableMatches = sortedPokemons
      .filter((pokemon) => pokemon.slot !== 1)
      .slice(start, end).map((pokemon) => pokemon.pokemon);
  } else {
    favorableMatches = sortedPokemons
      .filter((pokemon) => pokemon.slot === 1)
      .slice(start, end).map((pokemon) => pokemon.pokemon);
    unfavorableMatches = sortedPokemons
      .filter((pokemon) => pokemon.slot !== 1)
      .slice(start, end).map((pokemon) => pokemon.pokemon);
  }

  res.status(200).json({
    favorableMatches,
    unfavorableMatches,
  });
}
