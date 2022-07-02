import React from "react";
import InteractiveElement from "./InteractiveElement";
import UpvoteButton from "./UpvoteButton";
import { FaComment } from "react-icons/fa";
import Link from "next/link";

interface Types {
  title: string;
  desc: string;
  type: string;
  upvotes: number;
  comments: [];
}

const Post = ({ title, desc, type, upvotes, comments }: Types) => {
  return (
    <section className="p-6 rounded-lg flex bg-white mb-4 sm:mb-5">
      <div className="hidden sm:block mr-10">
        <UpvoteButton upvotes={upvotes} />
      </div>
      <section className="flex flex-col gap-4 flex-1">
        <Link href={"/"}>
          <a className="text-sm text-light-accent font-bold sm:text-lg hover:text-blue-1 transition-colors">
            {title}
          </a>
        </Link>
        <p className="text-sm text-dark-gray sm:text-base">{desc}</p>
        <InteractiveElement onClick={() => null}>{type}</InteractiveElement>
        <div className="flex justify-between sm:hidden">
          <UpvoteButton upvotes={upvotes} />
          <div className="flex items-center">
            <FaComment className="text-[#CDD2EE]" />
            <span className="ml-2 text-light-accent font-bold">
              {comments.length}
            </span>
          </div>
        </div>
      </section>{" "}
      <div className="hidden sm:flex items-center ml-6">
        <FaComment className="text-[#CDD2EE]" />
        <span className="ml-2 text-light-accent font-bold">
          {comments.length}
        </span>
      </div>
    </section>
  );
};

export default Post;
