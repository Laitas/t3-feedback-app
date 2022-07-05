import { useRouter } from "next/router";
import React from "react";
import BackButtonTransparent from "../../components/BackButtonTransparent";
import ButtonBlue from "../../components/ButtonBlue";
import CommentsSection from "../../components/CommentsSection";
import Post from "../../components/Post";
import { trpc } from "../../utils/trpc";

const PostPage = () => {
  const { query, back } = useRouter();
  const id = query.id as string;
  const { data } = trpc.useQuery(["posts.byId", { id }]);
  console.log(data);
  if (data)
    return (
      <div className="px-6 md:px-10 max-w-5xl mx-auto">
        <section className="flex justify-between items-center py-6 sm:pt-14">
          <BackButtonTransparent onClick={back} />{" "}
          <ButtonBlue>Edit Feedback</ButtonBlue>
        </section>
        <main className="flex flex-col gap-6">
          <Post {...data} />
          <CommentsSection
            count={data._count.comments}
            comments={data.comments}
          />
        </main>
      </div>
    );
};

export default PostPage;
