import type { NextPage } from "next";
import Head from "next/head";
import ButtonBlue from "../components/ButtonBlue";
import ButtonDark from "../components/ButtonDark";
import ButtonPurple from "../components/ButtonPurple";
import ButtonRed from "../components/ButtonRed";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <ButtonBlue onClick={() => console.log("fuck all")}>Blue</ButtonBlue>
      <ButtonPurple onClick={() => console.log("fuck all")}>Ayo</ButtonPurple>
      <ButtonDark onClick={() => console.log("fuck all")}>Ayo</ButtonDark>
      <ButtonRed onClick={() => console.log("fuck all")}>Ayo</ButtonRed>
    </>
  );
};

export default Home;
