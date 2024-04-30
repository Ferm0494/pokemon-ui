import { getPokemonList } from "@/services/pokemon";
import { sanitizeURLQueryPaginationParams } from "@/utils";
import { PokemonCard } from "@/components";
import { InferGetServerSidePropsType, NextPageContext } from "next";
import Link from "next/link";

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { offset = 0, count = 0, limit = 20 } = props.data || {};
  const totalPages = count ? Math.ceil(count / limit) : 0;
  const currentPage = count ? offset / limit + 1 : 1;

  return (
    <main className="p-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-4">
        Pokemon-UI
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Shows a list of pokemons
      </p>
      <Link href="/type" className="text-blue-500 hover:text-blue-700">
        Search by Type
      </Link>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {props.data?.results.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
              href={`/pokemon/${pokemon.id}`}
            />
          ))}
        </ul>
      </div>
      <div className="flex justify-start space-x-2 overflow-x-auto max-w-screen-md mx-auto">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={`/?limit=${limit}&offset=${(page - 1) * limit}`}
            className={`px-4 py-2 border rounded ${
              currentPage === page ? "bg-blue-500 text-white" : "text-blue-500"
            }`}
          >
            {page}
          </Link>
        ))}
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
          ...metaData,
        },
        error: null,
      },
    };
  } catch (error: any) {
    return {
      props: {
        data: null,
        error,
      },
    };
  }
}
