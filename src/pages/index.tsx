import type { NextPage } from "next";
import Dropdown from "../components/Dropdown";
import Hero from "../components/Hero";
import Input from "../components/Input";
import SortDropdown from "../components/SortDropdown";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <Hero />
    </>
  );
};

export default Home;
