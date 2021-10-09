import type { NextPage, GetServerSideProps } from "next";
import { Contact } from "../components/contact";

import { cacheHeader } from "../lib/cache";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  cacheHeader(res);
  return { props: {} };
};

const Page: NextPage = () => {
  return <Contact />;
};

export default Page;
