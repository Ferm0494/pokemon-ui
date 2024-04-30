import Image from "next/image";
import { DetailedPokemon } from "@/types";

const PokemonDetail: React.FC<DetailedPokemon> = (props) => {
  const image =
    props.sprites.other["official-artwork"].front_default ||
    props.sprites.other["home"].front_default ||
    props.sprites.front_default;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image
            className="object-cover md:w-48"
            src={image}
            alt={props.name}
            layout="responsive"
            width={200}
            height={200}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {props.name}
          </div>
          <p className="mt-2 text-gray-500">
            Height: {props.height} | Weight: {props.weight}
          </p>
          <p className="mt-2 text-gray-500">Types</p>
          <ul className="mt-2 text-gray-500">
            {props.types.map((type, index) => (
              <li
                key={index}
                className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
              >
                {type.type.name}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-gray-500">Abilities</p>
          <ul className="mt-2 text-gray-500">
            {props.abilities.map((ability, index) => (
              <li
                key={index}
                className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
              >
                {ability.ability.name} {ability.is_hidden ? "(Hidden)" : ""}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-gray-500">Stats</p>
          <ul className="mt-2 text-gray-500">
            {props.stats.map((stat, index) => (
              <li
                key={index}
                className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
              >
                {stat.stat.name}: {stat.base_stat} (Effort: {stat.effort})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
