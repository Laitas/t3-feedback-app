import React from "react";
import { Button, Link } from "../../types";

const ButtonPurple = ({
  onClick,
  className = "",
  type = "button",
  children,
}: Button) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} py-2 px-4 sm:py-3 sm:px-6 bg-purple-1 text-white text-sm font-bold rounded-lg hover:bg-purple-2 transition-colors`}
    >
      {children}
    </button>
  );
};

export const LinkPurple = React.forwardRef<HTMLAnchorElement, Link>(
  ({ className = "", href, children }, ref) => {
    return (
      <a
        href={href}
        ref={ref}
        className={`${className} cursor-pointer py-2 px-4 sm:py-3 sm:px-6 bg-purple-1 text-white text-sm font-bold rounded-lg hover:bg-purple-2 transition-colors`}
      >
        {children}
      </a>
    );
  }
);
LinkPurple.displayName = "PurpleLink";
export default ButtonPurple;
