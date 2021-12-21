import type { GetServerSideProps } from "next";

import { Homepage } from "../components/homepage";
import { cacheHeader } from "../lib/cache";
import { get } from "../lib/get-data";

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
  const response = await get<ServerData>(fetchURL, true);
  const {
    posts,
    next_page: nextPage,
    previous_page: previousPage,
  } = response.body;

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
