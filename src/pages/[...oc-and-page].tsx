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
export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  const categories: string[] = [];
  const pathParams = params!["oc-and-page"];

  // Any garbage at this wild cast net should be rejected as a 404.
  // In production this would have been caught my the Express server.
  if (pathParams && Array.isArray(pathParams)) {
    for (const bit of pathParams) {
      if (!(/oc-\w+/.test(bit) || /p\d/.test(bit))) {
        return { notFound: true };
      }
    }
  }

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

  const fetchURL = `/api/v1/plog/homepage?${sp.toString()}`;
  console.time(`Fetch:${fetchURL}`);
  const response = await fetch(`${API_BASE}${fetchURL}`);
  console.timeEnd(`Fetch:${fetchURL}`);
  if (response.status === 400) {
    console.warn(
      `API said 400, but we'll call it a 404 for now (?${sp.toString()} => '${await response.text()}')`
    );
    return { notFound: true };
  }
  if (response.status === 404) {
    return { notFound: true };
  }
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
