import React, { SetStateAction } from "react";

interface Types {
  active?: boolean;
  children: string;
  onClick: () => void;
}

const InteractiveElement = ({ active = false, children, onClick }: Types) => {
  return (
    <button
      onClick={onClick}
      className={`w-fit text-sm font-semibold rounded-lg py-1 px-4 hover:bg-[#CFD7FF] transition-all ${
        active ? "bg-blue-1 text-white" : "text-blue-1 bg-gray-1"
      }`}
    >
      {children}
    </button>
  );
};

export default InteractiveElement;
