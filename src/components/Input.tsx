import React from "react";

interface Types {
  placeholder?: string;
  type?: "text" | "password" | "email";
  error: boolean;
}

const Input = ({ type = "text", placeholder, error }: Types) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`bg-[#F7F8FD] text-dark-accent py-3 px-6 rounded-md active:outline-blue-1 outline-blue-1 ${
          error && "border border-red-1"
        }`}
      />
      {error && <p className="text-sm text-red-1 mt-1">Can&apos;t be empty</p>}
    </>
  );
};

export default Input;
