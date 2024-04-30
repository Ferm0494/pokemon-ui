import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useState } from "react";
import { getPokemonTypes } from "@/services/pokemon";

const TypeSearch = ({
  types,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [searchText, setSearchText] = useState("");
  const [validOption, setValidOption] = useState("");
  const [showDropdown, setShowDropdown] = useState(true);

  const handleSearchTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const text = event.target.value;
    setSearchText(text);
    setShowDropdown(true);
  };

  const handleOptionClick = (type: string) => {
    setSearchText(type);
    setValidOption(type);
    handleSearch(type);
    setShowDropdown(false);
  };

  const handleSearch = (type: string) => {
    if (type) {
        console.log(type);
    }
  };

  const filteredTypes = types.filter(type => new RegExp(searchText, "i").test(type));

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Search by Type</h1>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchTextChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      {searchText && showDropdown && (
        filteredTypes.length > 0 ? (
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
        )
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