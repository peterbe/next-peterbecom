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
export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  cacheHeader(res);

  const categories: string[] = [];
  const pathParams = params!["oc-and-page"];

  const sp = new URLSearchParams();
  const paramPage = (pathParams as string[]).find((param) =>
    /p\d+/.test(param)
  );
  if (paramPage) {
    sp.set("page", paramPage.slice(1));
  }
  const paramCategories = (pathParams as string[])
    .filter((param) => /^oc-/.test(param))
    .map((param) => param.slice(3).replace(/\+/g, " "));
  categories.push(...paramCategories);

  for (const category of categories) {
    sp.append("oc", category);
  }
  const url = `${process.env.API_BASE}/api/v1/plog/homepage?${sp.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} on ${url}`);
  }
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
