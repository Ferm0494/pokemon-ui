import { getPokemonList } from "@/services/pokemon";
import { sanitizeURLQueryPaginationParams } from "@/utils";
import { Card } from "@/components";
import { InferGetServerSidePropsType, NextPageContext } from "next";

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-4">
        Pokemon-UI
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Shows a list of pokemons
      </p>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {props.data?.results.map((pokemon) => (
            <Card
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  try {
    const { data, ...metaData } = await getPokemonList(
      sanitizeURLQueryPaginationParams({
        limit: query.limit,
        offset: query.offset,
      })
    );
    return {
      props: {
        data: {
          results: data,
          ...metaData
        },
        error: null,
      },
    };
  } catch (error: any) {
    return {
      props: {
        data: null,
        error: error?.message || "An error occurred. Please try again later.",
      },
    };
  }
}
