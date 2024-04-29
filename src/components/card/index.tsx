import React from 'react';
import Image from 'next/image';

interface CardProps {
    image: string;
    name: string;
    types: string[];
}

const Card: React.FC<CardProps> = ({ image, name, types }) => {
    return (
        <div className="card">
            <Image src={image} alt={name} />
            <h2>{name}</h2>
            <ul>
                {types.map((type, index) => (
                    <li key={index}>{type}</li>
                ))}
            </ul>
        </div>
    );
};

export default Card;
