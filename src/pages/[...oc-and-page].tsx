import type { GetServerSideProps } from "next";

import { Homepage } from "../components/homepage";

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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const categories: string[] = [];
  const params = context.params!["oc-and-page"];

  const sp = new URLSearchParams();
  const paramPage = (params as string[]).find((param) => /p\d+/.test(param));
  if (paramPage) {
    sp.set("page", paramPage.slice(1));
  }
  const paramCategories = (params as string[])
    .filter((param) => /^oc-/.test(param))
    .map((param) => param.slice(3).replace(/\+/g, " "));
  categories.push(...paramCategories);

  for (const category of categories) {
    sp.append("oc", category);
  }
  const url = `${process.env.API_BASE}/api/v1/plog/homepage?${sp.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${res.status} on ${url}`);
  }
  const data: ServerData = await res.json();
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
