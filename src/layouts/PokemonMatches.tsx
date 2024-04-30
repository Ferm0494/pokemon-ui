import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { PokemonCard, Spinner } from "@/components";
import { Pokemon } from "@/types";

interface PokemonMatchesProps {
  data: Pokemon[];
  handleLoadMorePokemons: () => void;
  title: string;
  loading?: boolean;
}

const PokemonMatches = forwardRef<HTMLAnchorElement, PokemonMatchesProps>(
  ({ data, loading, handleLoadMorePokemons, title }, ref) => {
    return (
      <div>
        <h2 className="text-xl mb-2">{title}</h2>
        <div className="flex">
          <div className="p-3 flex flex-row overflow-x-auto whitespace-nowrap gap-4 flex-1">
            {data.map((match, index) => (
              <PokemonCard
                {...match}
                key={match.id}
                href={`/pokemon/${match.id}`}
                ref={index === data.length - 1 ? ref : undefined}
              />
            ))}
          </div>
          <div className="self-center">
            {loading ? (
              <Spinner size="sm" />
            ) : (
              <button onClick={handleLoadMorePokemons}>
                <FontAwesomeIcon icon={faArrowRight} size="2xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

PokemonMatches.displayName = "PokemonMatches";
export default PokemonMatches;
