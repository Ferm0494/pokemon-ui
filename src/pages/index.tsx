import { getPokemonList } from "@/services/pokemon";
import { sanitizeURLQueryPaginationParams } from "@/utils";
import { InferGetServerSidePropsType, NextPageContext } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return <main>
    <h1>Hello, World!</h1>
  </main>;
}
export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  try {
    const { data, limit, offset } = await getPokemonList(
      sanitizeURLQueryPaginationParams({
        limit: query.limit,
        offset: query.offset,
      })
    );
    return {
      props: {
        data: {
          results: data,
          limit,
          offset,
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
