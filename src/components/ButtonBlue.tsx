import React from "react";
import { Button, Link } from "../../types";

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
export const LinkBlue = React.forwardRef<HTMLAnchorElement, Link>(
  ({ className = "", href, children }, ref) => {
    return (
      <a
        href={href}
        ref={ref}
        className={`${className} cursor-pointer py-2 px-4 sm:py-3 sm:px-6 bg-blue-1 text-white text-sm font-bold rounded-lg hover:bg-purple-2 transition-colors`}
      >
        {children}
      </a>
    );
  }
);
LinkBlue.displayName = "BlueLink";
export default ButtonBlue;
