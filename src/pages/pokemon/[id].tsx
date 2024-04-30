import { PokemonDetail } from "@/components";
import { getPokemonDetails } from "@/services/pokemon";
import { GetStaticPaths, InferGetStaticPropsType } from "next";


const PokemonPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
   <main>
        <PokemonDetail {...props} />
   </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Up to 100 build time Pokemons ready to be served.
  const pokemonIds = Array.from({ length: 100 }, (_, i) => i + 1);
  // Generate the paths for each Pokemon ID
  const paths = pokemonIds.map((id) => ({
    params: { id: id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
}) => {
  const { id } = params as { id: string };
  try {
    const pokemonData = await getPokemonDetails({
      id,
      highlyDetailed: true,
    });
    return {
      props: {
        ...pokemonData
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default PokemonPage;
