import { useRouter } from "next/router";
import React, { SetStateAction } from "react";

interface Types {
  active?: boolean;
  children: string;
  onClick: () => void;
}

const InteractiveElement = ({ active = false, children, onClick }: Types) => {
  const router = useRouter();

  const pushQuery = () => {
    if (router.query.category) {
      router.push(
        router.asPath.replace(router.query.category as string, children)
      );
      return;
    }
    if (Object.keys(router.query).length > 0) {
      router.push(`${router.asPath}&category=${children}`);
    } else {
      router.push(`/?category=${children}`);
    }
  };

  return (
    <button
      onClick={() => {
        onClick();
        pushQuery();
      }}
      className={`w-fit text-sm font-semibold rounded-lg py-1 px-4 hover:bg-[#CFD7FF] transition-all ${
        active ? "bg-blue-1 text-white" : "text-blue-1 bg-gray-1"
      }`}
    >
      {children}
    </button>
  );
};

export default InteractiveElement;
