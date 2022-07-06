import Image from "next/image";
import React, { useState } from "react";
import { Comments } from "../../types";
import Reply from "./Reply";
import ReplyComment from "./ReplyComment";

interface Types extends Comments {
  className: string;
  commentId: string;
}

const Comment = ({
  commentId,
  comment,
  author: { username, id, image, name },
  className,
  replies,
}: Types) => {
  const [reply, setReply] = useState(false);
  if (username && image && name)
    return (
      <section className={`${className} sm:flex`}>
        <div className="hidden relative sm:block overflow-hidden">
          {replies && replies.length >= 1 && (
            <div className="absolute top-[3.75rem] bottom-5 bg-gray-1 w-[2px] left-1/2" />
          )}
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
                <p className="text-sm text-dark-gray">@{username}</p>
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
          {replies && (
            <section className="pl-6 border-l-2 sm:border-none sm:-ml-10">
              {replies.map((r) => (
                <ReplyComment key={r.id} {...r} />
              ))}
            </section>
          )}
          {reply && <Reply replyingTo={username} commentId={commentId} />}
        </section>
      </section>
    );
  return <h1>Loading...</h1>;
};

export default Comment;
