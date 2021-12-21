import { GetServerSideProps } from "next";

import { cacheHeader } from "../../lib/cache";
import { Archive } from "../../components/plog/archive";
import { API_BASE } from "../../lib/_constants";

interface Post {
  oid: string;
  title: string;
  categories: string[];
  comments: number;
}
interface Group {
  date: string;
  posts: Post[];
}
interface ServerData {
  groups: Group[];
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const fetchURL = "/api/v1/plog/";
  console.time(`Fetch:${fetchURL}`);
  const response = await fetch(`${API_BASE}${fetchURL}`);
  console.timeEnd(`Fetch:${fetchURL}`);
  if (!response.ok) {
    throw new Error(`${response.status} on ${fetchURL}`);
  }
  const data: ServerData = await response.json();
  const { groups } = data;

  cacheHeader(res);

  return {
    props: {
      groups,
    },
  };
};

type ViewProps = React.ComponentProps<typeof Archive>;

const View = (props: ViewProps) => {
  return <Archive {...props} />;
};

export default View;
