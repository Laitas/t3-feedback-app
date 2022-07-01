import type { NextPage } from "next";
import Dropdown from "../components/Dropdown";
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
      <Dropdown />
    </>
  );
};

export default Home;
