import React, { Dispatch, SetStateAction } from "react";
import InteractiveElement from "./InteractiveElement";
import UpvoteButton from "./UpvoteButton";
import { FaComment } from "react-icons/fa";
import Link from "next/link";
import { Category } from "../../types";
import { useAtom } from "jotai";
import { cat } from "../constants";
import { useRouter } from "next/router";

interface Types {
  id: string;
  title: string;
  desc: string;
  category: string;
  _count: {
    upvotes: number;
  };
  commentsLength: number;
  byCat?: boolean;
  upvote: boolean;
}

const Post = ({
  id,
  title,
  desc,
  category,
  _count,
  commentsLength,
  byCat = false,
  upvote,
}: Types) => {
  const [, setActive] = useAtom(cat);
  const { pathname, push } = useRouter();
  return (
    <section className="p-6 rounded-lg flex bg-white mb-4 sm:mb-5">
      <div className="hidden sm:block mr-10">
        <UpvoteButton upvotes={_count.upvotes} postId={id} active={upvote} />
      </div>
      <section className="flex flex-col gap-4 flex-1">
        <Link
          href={`/post/${id}`}
          className="text-sm text-light-accent font-bold sm:text-lg hover:text-blue-1 transition-colors"
        >
          {title}
        </Link>
        <p className="text-sm text-dark-gray sm:text-base">{desc}</p>
        <InteractiveElement
          active={byCat}
          onClick={() => {
            byCat ? setActive("All") : setActive(category as Category);
            pathname === "/post/[id]" && push("/");
          }}
        >
          {category}
        </InteractiveElement>
        <div className="flex justify-between sm:hidden">
          <UpvoteButton upvotes={_count.upvotes} postId={id} active={upvote} />
          <div className="flex items-center">
            <FaComment className="text-[#CDD2EE]" />
            <span className="ml-2 text-light-accent font-bold">
              {commentsLength}
            </span>
          </div>
        </div>
      </section>{" "}
      <div className="hidden sm:flex items-center ml-6">
        <FaComment className="text-[#CDD2EE]" />
        <span className="ml-2 text-light-accent font-bold">
          {commentsLength}
        </span>
      </div>
    </section>
  );
};

export default Post;
