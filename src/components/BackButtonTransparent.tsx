import React from "react";
import { Button } from "../../types";
import { HiChevronLeft } from "react-icons/hi";

const BackButtonTransparent = ({
  onClick,
  className,
  type = "button",
}: Omit<Button, "children">) => {
  return (
    <button
      onClick={onClick}
      className={`${className} bottom-border flex items-center bg-transparent text-blue-1 text-sm font-bold rounded-lg`}
    >
      <HiChevronLeft />
      <span className="text-dark-gray ml-3">Go Back</span>
    </button>
  );
};

export default BackButtonTransparent;
