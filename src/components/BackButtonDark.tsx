import React from "react";
import { Button } from "../../types";
import { HiChevronLeft } from "react-icons/hi";

const BackButtonDark = ({
  onClick,
  className,
  type = "button",
}: Omit<Button, "children">) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} bottom-border flex items-center py-3 px-6 bg-dark-accent text-white text-sm font-bold rounded-lg`}
    >
      <HiChevronLeft />
      <span className="ml-3">Go Back</span>
    </button>
  );
};

export default BackButtonDark;
