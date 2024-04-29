import { AuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/router";
import React, { useContext, useRef } from "react";

const Login = () => {
  const { login, loading } = useContext(AuthContext);
  const navigator = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleAddUser = () => {
    const name = inputRef?.current?.value;
    if (!name) {
      return;
    }
    login(name);
    navigator.push("/");

  };
  return (
    !loading && <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 py-6 flex flex-col">
        <h2 className="text-2xl mb-4">Enter your name</h2>
        <input
          ref={inputRef}
          type="text"
          className="border border-gray-300 rounded p-2 mb-4"
          placeholder="Name"
        />
        <button
          onClick={handleAddUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
