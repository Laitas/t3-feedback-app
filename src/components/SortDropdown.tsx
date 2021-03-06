import React, { useState } from "react";
import { HiChevronDown, HiCheck } from "react-icons/hi";

const SortDropdown = () => {
  const [sort, setSort] = useState("Most Upvotes");
  const [active, setActive] = useState(false);
  return (
    <>
      <button
        onClick={() => setActive(!active)}
        className="relative group hover:text-gray-1 flex items-center text-sm text-white bg-dark-accent rounded-lg sm:py-6 sm:px-4"
      >
        Sort by :<span className="font-semibold ml-1">{sort}</span>{" "}
        <HiChevronDown
          className={`ml-1 ${
            active ? "rotate-180" : "group-hover:rotate-180"
          } transition-all duration-500`}
        />
      </button>
      {active && (
        <ul className="rounded-lg bg-white z-10 overflow-hidden shadow-lg flex flex-col absolute my-20 w-64">
          {[
            "Most Upvotes",
            "Least Upvotes",
            "Most Comments",
            "Least Comments",
          ].map((i, idx) => (
            <li
              className="border-b cursor-pointer flex items-center justify-between py-3 px-6 hover:text-purple-1"
              key={idx}
              onClick={() => {
                setSort(i);
                setActive(false);
              }}
            >
              {i} {sort === i && <HiCheck className="text-purple-1" />}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SortDropdown;
