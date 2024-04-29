import React from "react";
import Image from "next/image";

interface CardProps {
  image: string;
  name: string;
  types: string[];
}

const Card: React.FC<CardProps> = ({ image, name, types }) => {
  return (
    <div className="card w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 flex flex-col">
      <h2 className="uppercase tracking-wide text-md text-indigo-500 font-semibold p-8">
        {name}
      </h2>
      <div className="md:flex-shrink-0">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="object-cover md:w-64 md:h-full md:object-cover"
        />
      </div>
      <div className="p-8">
        <p className="mt-2 text-gray-500">Types</p>
        <ul className="mt-2 text-gray-500">
          {types.map((type, index) => (
            <li
              key={index}
              className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >
              {type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;
