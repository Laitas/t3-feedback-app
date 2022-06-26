import React from "react";
import { Button } from "../../types";

const ButtonPurple = ({
  onClick,
  className = "",
  type = "button",
  children,
}: Button) => {
  return (
    <button
      onClick={onClick}
      className={`${className} py-3 px-6 bg-purple-1 text-white text-sm font-bold rounded-lg hover:bg-purple-2 transition-colors`}
    >
      {children}
    </button>
  );
};

export default ButtonPurple;
