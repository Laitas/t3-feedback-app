import Link from "next/link";
import React from "react";
import ButtonPurple, { LinkPurple } from "./ButtonPurple";
import SortDropdown from "./SortDropdown";

const Header = () => {
  return (
    <header className="bg-dark-accent flex justify-between py-2 px-6">
      <SortDropdown />
      <Link href="/add-feedback" passHref>
        <LinkPurple className="flex items-center">+ Add Feedback</LinkPurple>
      </Link>
    </header>
  );
};

export default Header;
