import { InferGetStaticPropsType } from "next";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { getPokemonTypes } from "@/services/pokemon";
import { TypeResponse } from "@/types";
import { Spinner, PokemonCard } from "@/components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

enum LoadPokemonArgsEnum {
  FAVORABLE = "favorable",
  UNFAVORABLE = "unfavorable",
}

const TypeSearch = ({
  types,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [data, setData] = useState<TypeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const endOfFavorableList = useRef<HTMLAnchorElement>(null);
  const endOfUnfavorableList = useRef<HTMLAnchorElement>(null);

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const text = event.target.value;
    setSearchText(text);
    setShowDropdown(true);
    if (!text) {
      setData(null);
    }
  };

  const handleOptionClick = (type: string) => {
    setSearchText(type);
    handleSearch(type);
    setShowDropdown(false);
  };

  const handleSearch = async (type: string) => {
    if (type) {
      setLoading(true);
      try {
        const response = await axios.get<TypeResponse>(
          `/api/type?type=${type}`
        );
        setData(response.data);
        setError("");
      } catch (error: any) {
        setError(error?.message || "An error occurred in finding matches");
        setData(null);
      }
      setLoading(false);
    }
  };

  const handleLoadMorePokemons = async (matches: LoadPokemonArgsEnum) => {
    try {
      setLoading(true);
      const response = await axios.get<TypeResponse>(
        `/api/type?type=${searchText}&page=${page + 1}&matches=${matches}`
      );
      setPage(page + 1);
      setData({
        favorableMatches: [
          ...(data?.favorableMatches || []),
          ...response.data.favorableMatches,
        ],
        unfavorableMatches: [
          ...(data?.unfavorableMatches || []),
          ...response.data.unfavorableMatches,
        ],
      });
    } catch (error: any) {
      setError(error?.message || "An error occurred in loading more Pokemons");
    }
    setLoading(false);
  };

  const filteredTypes = types.filter((type) =>
    new RegExp(searchText, "i").test(type)
  );

  useEffect(() => {
    endOfFavorableList.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.favorableMatches?.length]);

  useEffect(() => {
    endOfUnfavorableList.current?.scrollIntoView({ behavior: "smooth" });
  }, [data?.unfavorableMatches?.length]);

  return (
    <div>
      {error && (
        <div className="mb-4 p-2 bg-red-500 text-white rounded">{error}</div>
      )}
      <div className="flex flex-col items-center justify-center p-8 w-full max-w-md mx-auto">
        <h1 className="text-4xl mb-4">Search by Type</h1>
        <input
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {searchText &&
          showDropdown &&
          (filteredTypes.length > 0 ? (
            <ul className="w-full border border-gray-300 rounded divide-y divide-gray-300">
              {filteredTypes.map((type) => (
                <li
                  key={type}
                  onClick={() => handleOptionClick(type)}
                  className="cursor-pointer p-2 hover:bg-gray-200"
                >
                  {type}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-gray-500">No type was found</p>
          ))}
      </div>
      {loading && !data && <Spinner />}
      {data && (
        <div className="mt-4 w-full p-5">
          <div>
            <h2 className="text-xl mb-2">Favorable Matches</h2>
            <div className="flex">
              <div className="p-3 flex flex-row overflow-x-auto whitespace-nowrap gap-4 flex-1">
                {data.favorableMatches.map((match, index) => (
                  <PokemonCard
                    {...match}
                    key={match.id}
                    href={`/pokemon/${match.id}`}
                    ref={
                      index === data.favorableMatches.length - 1
                        ? endOfFavorableList
                        : undefined
                    }
                  />
                ))}
              </div>
              <div className="self-center">
                {loading ? (
                  <Spinner size="sm" />
                ) : (
                  <button
                    onClick={() =>
                      handleLoadMorePokemons(LoadPokemonArgsEnum.FAVORABLE)
                    }
                  >
                    <FontAwesomeIcon icon={faArrowRight} size="2xl" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl mb-2">Unfavorable Matches</h2>
            <div className="flex">
              <div className="p-3 flex flex-row overflow-x-auto whitespace-nowrap gap-4 flex-1">
                {data.unfavorableMatches.map((match, index) => (
                  <PokemonCard
                    {...match}
                    key={match.id}
                    href={`/pokemon/${match.id}`}
                    ref={
                      index === data.unfavorableMatches.length - 1
                        ? endOfUnfavorableList
                        : undefined
                    }
                  />
                ))}
              </div>
              <div className="self-center">
                {loading ? (
                  <Spinner size="sm" />
                ) : (
                  <button
                    onClick={() =>
                      handleLoadMorePokemons(LoadPokemonArgsEnum.UNFAVORABLE)
                    }
                  >
                    <FontAwesomeIcon icon={faArrowRight} size="2xl" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeSearch;

export const getStaticProps = async () => {
  const types = await getPokemonTypes();

  return {
    props: {
      types,
    },
  };
};
