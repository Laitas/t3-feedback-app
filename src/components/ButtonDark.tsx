import React from "react";
import { Button } from "../../types";

const ButtonDark = ({
  onClick,
  className = "",
  type = "button",
  children,
}: Button) => {
  return (
    <button
      onClick={onClick}
      className={`${className} py-3 px-6 bg-dark-accent text-white text-sm font-bold rounded-lg hover:bg-dark-accent-hover transition-colors`}
    >
      {children}
    </button>
  );
};

export default ButtonDark;
