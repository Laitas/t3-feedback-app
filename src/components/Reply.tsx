import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import { trpc } from "../utils/trpc";
import ButtonPurple from "./ButtonPurple";
import TextArea from "./TextArea";

interface Types {
  commentId: string;
  replyingTo: string;
}
const Reply = ({ commentId, replyingTo }: Types) => {
  const newReply = trpc.useMutation(["comments.newReply"], {
    onSuccess: (data) => console.log(data),
    onError: (data) => console.log(data),
  });
  const { data: session } = useSession();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (session)
      newReply.mutate({
        authorId: session.user.id,
        reply: comment,
        commentId,
        replyingTo,
      });
  };
  const [comment, setComment] = useState("");
  return (
    <form className="flex flex-col sm:flex-row mb-4" onSubmit={handleSubmit}>
      <TextArea
        onChange={(e) => setComment(e.target.value)}
        value={comment}
        error={false}
        className="w-full"
        placeholder="Type your comment here"
      />
      <div className="sm:ml-4">
        <ButtonPurple type="submit" className="whitespace-nowrap w-full">
          Post Reply
        </ButtonPurple>
      </div>
    </form>
  );
};

export default Reply;
