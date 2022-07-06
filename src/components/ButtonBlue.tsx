import React from "react";
import { Button } from "../../types";

const ButtonBlue = ({
  onClick,
  className = "",
  type = "button",
  children,
}: Button) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} py-3 px-6 bg-blue-1 text-white text-sm font-bold rounded-lg hover:bg-blue-2 transition-colors`}
    >
      {children}
    </button>
  );
};

export default ButtonBlue;
