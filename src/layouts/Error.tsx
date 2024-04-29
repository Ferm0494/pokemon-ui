import React, { useState } from 'react';

interface ErrorProps {
    message?: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    const [expanded, setExpanded] = useState(false);

    const handleDetailClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="bg-red-100 p-5 w-full sm:w-1/2 mx-auto mt-10 rounded-md shadow-md">
            <h1 className="text-xl font-bold text-red-700">Oops! Something went wrong on our end.</h1>
            {message && (
                <div className="mt-4">
                    <h2 
                        onClick={handleDetailClick} 
                        className="text-lg text-red-500 cursor-pointer hover:underline"
                    >
                        Click to expand details
                    </h2>
                    {expanded && <p className="mt-2 text-red-600">{message}</p>}
                </div>
            )}
        </div>
    );
};

export default Error;