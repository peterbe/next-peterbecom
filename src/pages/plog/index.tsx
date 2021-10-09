import { GetServerSideProps } from "next";

import { cacheHeader } from "../../lib/cache";
import { Archive } from "../../components/plog/archive";

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
  cacheHeader(res);

  const url = `${process.env.API_BASE}/api/v1/plog/`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} on ${url}`);
  }
  const data: ServerData = await response.json();
  const { groups } = data;

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
