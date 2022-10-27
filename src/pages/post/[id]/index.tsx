import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import AddComment from "../../../components/AddComment";
import BackButtonTransparent from "../../../components/BackButtonTransparent";
import { LinkBlue } from "../../../components/ButtonBlue";
import CommentsSection from "../../../components/CommentsSection";
import Post from "../../../components/Post";
import { trpc } from "../../../utils/trpc";

const PostPage = () => {
  const [comment, setComment] = useState("");
  const { query, push } = useRouter();
  const id = query.id as string;
  const [error, setError] = useState(false);
  const { data, refetch } = trpc.useQuery(["posts.byId", { id }], {
    enabled: id !== undefined,
  });
  const newComment = trpc.useMutation(["comments.new"], {
    onSuccess: () => {
      refetch();
      setComment("");
      error && setError(false);
    },
    onError: (error) => setError(true),
  });

  const addComment = (e: FormEvent, comment: string) => {
    e.preventDefault();
    if (data && session) {
      if (comment.length < 10) setError(true);
      else
        newComment.mutate({
          postId: data.id,
          authorId: session.user.id,
          comment,
        });
    }
  };
  const { data: session } = useSession();

  if (data)
    return (
      <div className="px-6 md:px-10 max-w-5xl mx-auto">
        <section className="flex justify-between items-center py-6 sm:pt-14">
          <BackButtonTransparent onClick={() => push("/")} />{" "}
          {data.userId === session?.user.id && (
            <Link href={id + "/edit"} passHref legacyBehavior>
              <LinkBlue>Edit Feedback</LinkBlue>
            </Link>
          )}
        </section>
        <main className="flex flex-col gap-6 mb-10">
          <Post {...data} />
          <CommentsSection
            count={data.commentsLength}
            comments={data.comments && data.comments}
          />
          {session && (
            <AddComment
              value={comment}
              setValue={setComment}
              error={error}
              addComment={addComment}
            />
          )}
        </main>
      </div>
    );
};

export default PostPage;
