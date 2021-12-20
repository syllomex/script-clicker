import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import nookies from "nookies";

import Main from "../components/main";

import { GameProvider } from "../context/game";

const Home: NextPage = () => {
  return (
    <div className="root">
      <Head>
        <title>Script Clicker</title>
        <meta name="description" content="Click to code!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Main />
      </main>
    </div>
  );
};

const Wrapper: React.FC<{ data?: string }> = ({ data }) => {
  return (
    <GameProvider encrypted={data}>
      <Home />
    </GameProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = nookies.get(ctx)["data"];

  return {
    props: {
      data: data || null,
    },
  };
};

export default Wrapper;
