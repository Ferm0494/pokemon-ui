export interface BaseResponse {
  count: number;
  next: string | null;
  previous: string | null;
}

export type PokemonDetailsParams = {
  id?: string | number;
  url?: string;
};

export interface MetaData {
  name: string;
  url: string;
}

export interface PokemonList extends BaseResponse {
  results: MetaData[];
}

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  image: string;
}

export interface DetailedPokemon {
  id: number;
  name: string;
  types: {
    slot: number;
    type: MetaData;
  }[];
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
  stats: {
    base_stat: number;
    effort: number;
    stat: MetaData;
  }[];
  abilities: {
    ability: MetaData;
    is_hidden: boolean;
    slot: number;
  }[];
  weight: number;
  height: number;
}
