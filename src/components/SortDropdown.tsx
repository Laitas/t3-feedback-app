import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { HiChevronDown, HiCheck } from "react-icons/hi";

const SortDropdown = () => {
  const { query, push } = useRouter();
  const sortQuery = query.sortBy as string;
  const [sort, setSort] = useState(
    sortQuery ? sortQuery.replace("_", " ").toLowerCase() : null
  );
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (sortQuery && sort !== sortQuery.replace("_", " ").toLowerCase()) {
      setSort(sortQuery.replace("_", " ").toLowerCase());
    }
  }, [sort, sortQuery]);

  return (
    <>
      <button
        onClick={() => setActive(!active)}
        className="relative group hover:text-gray-1 flex items-center text-sm text-white bg-dark-accent rounded-lg sm:py-6 sm:px-4"
      >
        Sort by :<span className="font-semibold ml-1 capitalize">{sort}</span>{" "}
        <HiChevronDown
          className={`ml-1 ${
            active ? "rotate-180" : "group-hover:rotate-180"
          } transition-all duration-500`}
        />
      </button>
      {active && (
        <ul className="rounded-lg bg-white z-10 overflow-hidden shadow-lg flex flex-col absolute my-20 w-64">
          {[
            "most upvotes",
            "least upvotes",
            "most comments",
            "least comments",
          ].map((i, idx) => (
            <li
              className="border-b cursor-pointer flex items-center justify-between py-3 px-6 hover:text-purple-1 capitalize"
              key={idx}
              onClick={() => {
                setSort(i);
                push(`/?sortBy=${i.replace(" ", "_")}`);
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
