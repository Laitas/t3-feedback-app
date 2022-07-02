import type { NextPage } from "next";
import Header from "../components/Header";
import Hero from "../components/Hero";
import InteractiveSection from "../components/InteractiveSection";
import Post from "../components/Post";
import Roadmap from "../components/Roadmap";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const feature = trpc.useQuery(["posts.byType", { type: "Feature" }]);
  const { data } = trpc.useQuery(["posts.all"]);

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
        {data?.map((post: any) => (
          <Post {...post} />
        ))}
      </main>
    </div>
  );
};

export default Home;
