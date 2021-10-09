import type { GetServerSideProps } from "next";

import { Homepage } from "../components/homepage";
import { cacheHeader } from "../lib/cache";

interface Post {
  title: string;
  oid: string;
  comments: number;
  categories: string[];
}

interface ServerData {
  posts: Post[];
  next_page: number | null;
  previous_page: number | null;
}
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  cacheHeader(res);

  const API_BASE = process.env.API_BASE;
  if (!API_BASE) {
    throw new Error("can't not be set");
  }
  const categories: string[] = [];
  const response = await fetch(`${API_BASE}/api/v1/plog/homepage`);
  const data: ServerData = await response.json();
  const { posts } = data;
  const nextPage = data.next_page;
  const previousPage = data.previous_page;

  return {
    props: {
      posts,
      nextPage,
      previousPage,
      categories,
    },
  };
};

type ViewProps = React.ComponentProps<typeof Homepage>;

const Home = (props: ViewProps) => {
  return <Homepage {...props} />;
};

export default Home;
