import type { NextPage, GetServerSideProps } from "next";
import { Search } from "../components/search";
import { cacheHeader } from "../lib/cache";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  cacheHeader(res);
  return { props: {} };
};

const Page: NextPage = () => {
  return <Search />;
};

export default Page;
