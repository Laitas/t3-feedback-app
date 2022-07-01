import type { NextPage } from "next";
import Input from "../components/Input";
import SortDropdown from "../components/SortDropdown";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <SortDropdown />
      <Input error />
      <Input error={false} />
    </>
  );
};

export default Home;
