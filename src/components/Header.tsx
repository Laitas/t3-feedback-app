import Link from "next/link";
import React from "react";
import { LinkPurple } from "./ButtonPurple";
import SortDropdown from "./SortDropdown";

const Header = ({ className = "" }) => {
  return (
    <header
      className={`bg-dark-accent sm:rounded-lg flex justify-between py-2 px-6 ${className}`}
    >
      <SortDropdown />
      <Link href="/add-feedback" passHref>
        <LinkPurple className="flex items-center">+ Add Feedback</LinkPurple>
      </Link>
    </header>
  );
};

export default Header;
