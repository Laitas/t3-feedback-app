import Image from "next/image";
import React, { useState } from "react";
import { Comments } from "../../types";
import Reply from "./Reply";

interface Types extends Comments {
  className: string;
}

const Comment = ({
  comment,
  author: { email, id, image, name },
  className,
}: Types) => {
  const [reply, setReply] = useState(false);
  return (
    <section className={`${className} sm:flex`}>
      <div className="hidden sm:block">
        <Image width={40} height={40} src={image} className="rounded-full" />
      </div>
      <section className="flex flex-col flex-1 sm:pl-8">
        <section className="flex justify-between">
          <div className="flex">
            <div className="flex sm:hidden min-w-[40px]">
              <Image
                width={40}
                height={40}
                src={image}
                className="rounded-full"
              />
            </div>
            <div className="ml-4 sm:ml-0">
              <p className="text-light-accent font-bold text-sm">{name}</p>
              <p className="text-sm text-dark-gray">@{email}</p>
            </div>
          </div>
          <button
            onClick={() => setReply(!reply)}
            className="text-sm font-semibold text-blue-1 hover:text-blue-2 hover:underline transition-all"
          >
            Reply
          </button>
        </section>
        <div className="text-dark-gray my-4">{comment}</div>
        {reply && <Reply />}
      </section>
    </section>
  );
};

export default Comment;
