import React, { useState } from "react";
import { HiChevronDown, HiCheck } from "react-icons/hi";

const Dropdown = () => {
  const [sort, setSort] = useState("Feature");
  const [active, setActive] = useState(false);
  return (
    <>
      <button
        onClick={() => setActive(!active)}
        className="relative group flex items-center justify-between text-sm text-dark-accent bg-gray-1 rounded-md py-6 px-3 min-w-[16rem]"
      >
        {sort}
        <HiChevronDown
          className={`ml-1 ${
            active ? "rotate-180" : "group-hover:rotate-180"
          } transition-all duration-500`}
        />
      </button>
      {active && (
        <ul className="rounded-lg overflow-hidden shadow-lg flex flex-col absolute my-4 w-64">
          {["Feature", "UI", "UX", "Enhancement", "Bug"].map((i, idx) => (
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

export default Dropdown;
