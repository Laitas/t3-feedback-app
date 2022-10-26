import React from "react";
import { Button } from "../../types";

const ButtonRed = ({
  onClick,
  className = "",
  type = "button",
  children,
}: Button) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} py-3 px-6 bg-red-1 text-white text-sm font-bold rounded-lg hover:bg-red-2 transition-colors`}
    >
      {children}
    </button>
  );
};

export default ButtonRed;
