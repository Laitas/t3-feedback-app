import Image from "next/image";
import React from "react";
import { Comments } from "../../types";

interface Types extends Comments {
  className: string;
}

const Comment = ({
  comment,
  author: { email, id, image, name },
  className,
}: Types) => {
  return (
    <section className={`${className} flex`}>
      <div>
        <Image width={40} height={40} src={image} className="rounded-full" />
      </div>
      <section className="flex flex-col flex-1 pl-8">
        <section className="flex justify-between">
          <div className="">
            <p className="text-light-accent font-bold text-sm">{name}</p>
            <p className="text-sm text-dark-gray">@{email}</p>
          </div>
          <button className="text-sm font-semibold text-blue-1 hover:text-blue-2 hover:underline transition-all">
            Reply
          </button>
        </section>
        <div className="text-dark-gray my-4">{comment}</div>
      </section>
    </section>
  );
};

export default Comment;
