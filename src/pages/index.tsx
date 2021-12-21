import type { GetServerSideProps } from "next";

import { Homepage } from "../components/homepage";
import { cacheHeader } from "../lib/cache";
import { API_BASE } from "../lib/_constants";

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
  const categories: string[] = [];
  const fetchURL = "/api/v1/plog/homepage";
  console.time(`Fetch:${fetchURL}`);
  const response = await fetch(`${API_BASE}${fetchURL}`);
  console.timeEnd(`Fetch:${fetchURL}`);
  if (!response.ok) {
    throw new Error(`${response.status} on ${fetchURL}`);
  }
  const data: ServerData = await response.json();
  const { posts } = data;
  const nextPage = data.next_page;
  const previousPage = data.previous_page;

  cacheHeader(res);

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
