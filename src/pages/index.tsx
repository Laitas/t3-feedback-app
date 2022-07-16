import type { NextPage } from "next";
import { useState } from "react";
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

const Home: NextPage = () => {
  const [active] = useAtom(cat);
  const category = trpc.useQuery(
    ["posts.byCategory", { category: active as Category }],
    {
      enabled: active !== "All",
    }
  );
  const all = trpc.useQuery(["posts.all"], {
    enabled: active === "All",
  });

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
