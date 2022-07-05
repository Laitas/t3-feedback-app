import { useRouter } from "next/router";
import React from "react";
import Post from "../../components/Post";
import { trpc } from "../../utils/trpc";

const PostPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data } = trpc.useQuery(["posts.byId", { id }]);
  console.log(data);
  if (data)
    return (
      <div>
        <Post {...data} />
      </div>
    );
};

export default PostPage;
