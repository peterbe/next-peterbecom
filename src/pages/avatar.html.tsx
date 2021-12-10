import type { NextPage, GetServerSideProps } from "next";
import { Avatar } from "../components/avatar";
import { cacheHeader } from "../lib/cache";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  cacheHeader(res);
  return { props: {} };
};

const Page: NextPage = () => {
  return <Avatar />;
};

export default Page;
