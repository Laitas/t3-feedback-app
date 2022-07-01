import type { NextPage } from "next";
import SortDropdown from "../components/SortDropdown";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <SortDropdown />
    </>
  );
};

export default Home;
