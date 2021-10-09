import type { NextPage, GetServerSideProps } from "next";
import { About } from "../components/about";
import { cacheHeader } from "../lib/cache";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  cacheHeader(res);
  return { props: {} };
};

const Page: NextPage = () => {
  return <About />;
};

export default Page;
