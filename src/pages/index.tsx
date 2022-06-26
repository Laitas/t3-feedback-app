import type { NextPage } from "next";
import Head from "next/head";
import BackButtonDark from "../components/BackButtonDark";
import BackButtonTransparent from "../components/BackButtonTransparent";
import ButtonBlue from "../components/ButtonBlue";
import ButtonDark from "../components/ButtonDark";
import ButtonPurple from "../components/ButtonPurple";
import ButtonRed from "../components/ButtonRed";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <BackButtonTransparent onClick={() => console.log("fuck all")} />
      <BackButtonDark onClick={() => console.log("fuck all")} />
    </>
  );
};

export default Home;
