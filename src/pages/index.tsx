import type { NextPage } from "next";
import { useEffect } from "react";
import { Category } from "../../types";
import Header from "../components/Header";
import Hero from "../components/Hero";
import InteractiveSection from "../components/InteractiveSection";
import NoFeedback from "../components/NoFeedback";
import Post from "../components/Post";
import PostSkeleton from "../components/PostSkeleton";
import Roadmap from "../components/Roadmap";
import { trpc } from "../utils/trpc";
import { useAtom } from "jotai";
import { cat } from "../constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { query } = useRouter();
  const sortQuery = query.sortBy as sortQuery;
  const categoryQuery = query.category as Category;
  const [active, setActive] = useAtom(cat);
  const { data: session } = useSession();
  const category = trpc.useQuery(
    [
      "posts.byCategory",
      {
        category: active as Category,
        sortBy: (sortQuery?.toUpperCase() as sortQuery) ?? "NEW",
      },
    ],
    {
      enabled: active !== "All",
    }
  );
  const all = trpc.useQuery(
    [
      "posts.all",
      {
        userId: session?.user.id,
        sortBy: (sortQuery?.toUpperCase() as sortQuery) ?? "NEW",
      },
    ],
    {
      enabled: active === "All",
    }
  );

  useEffect(() => {
    if (categoryQuery && active !== categoryQuery) {
      setActive(categoryQuery);
    }
  }, [active, categoryQuery, setActive]);

  return (
    <div className="flex flex-col lg:flex-row">
      <section className="hidden sm:grid grid-cols-3 gap-4 mt-14 mb-10 mx-10 lg:flex flex-col lg:max-w-[16rem] lg:mt-8 lg:mr-0">
        <Hero />
        <InteractiveSection />
        <Roadmap />
      </section>
      <Hero className="sm:hidden" />
      <Header className="sm:mx-10 lg:hidden" />
      <main className="mx-6 my-8 sm:mx-10 lg:w-full">
        <Header className="hidden lg:flex mb-6" />
        {active === "All" &&
          all.data?.map((post) => <Post key={post.id} {...post} />)}
        {active !== "All" &&
          category.data?.map((post) => <Post key={post.id} {...post} byCat />)}
        {(all.isLoading || category.isLoading) &&
          [...Array(10)].map((i, idx) => <PostSkeleton key={idx} />)}
        {(all.data?.length === 0 || category.data?.length === 0) && (
          <NoFeedback />
        )}
      </main>
    </div>
  );
};

export default Home;

type sortQuery =
  | "MOST_UPVOTES"
  | "LEAST_UPVOTES"
  | "MOST_COMMENTS"
  | "LEAST_COMMENTS";
