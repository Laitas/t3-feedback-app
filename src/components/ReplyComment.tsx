import Image from "next/image";
import { useState } from "react";
import { Comments } from "../../types";
import Reply from "./Reply";

interface Types {
  author: Comments["author"];
  className?: string;
  reply: string;
  replyingTo: string;
  commentId: Comments["id"];
}
const ReplyComment = ({
  className,
  author: { image, id, name, username },
  reply,
  replyingTo,
  commentId,
}: Types) => {
  const [replyState, setReply] = useState(false);
  if (username && image && name)
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
          <div className="text-dark-gray my-4">
            <span className="font-semibold text-purple-1">@{replyingTo} </span>
            {reply}
          </div>
          {replyState && <Reply replyingTo={username} commentId={commentId} />}
        </section>
      </section>
    );
  return <h1>Loading...</h1>;
};

export default ReplyComment;
