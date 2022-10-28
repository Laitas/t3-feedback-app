import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { HiChevronUp } from "react-icons/hi";
import { trpc } from "../utils/trpc";

interface Types {
  active: boolean;
  upvotes: number;
  postId: string;
}

const UpvoteButton = ({ active = false, upvotes, postId }: Types) => {
  const [state, setState] = useState(active);
  const [count, setCount] = useState(upvotes);
  const { data: session } = useSession();
  const { mutate } = trpc.useMutation(["posts.upvote"], {
    onSuccess: (data) => {
      if (data === "upvoted") {
        setState(true);
        setCount((c) => c + 1);
      }
      if (data === "deleted") {
        setState(false);
        setCount((c) => c - 1);
      }
    },
  });

  useEffect(() => {
    setState(state);
  }, [state]);
  return (
    <button
      onClick={() =>
        session ? mutate({ postId, userId: session.user.id }) : null
      }
      className={`flex sm:flex-col items-center text-sm font-semibold rounded-lg py-1 px-4 hover:bg-[#CFD7FF] transition-all ${
        state ? "bg-blue-1 text-white" : "bg-gray-1 text-light-accent"
      }`}
    >
      <HiChevronUp className="mr-2 sm:mr-0" />
      {count}
    </button>
  );
};

export default UpvoteButton;
