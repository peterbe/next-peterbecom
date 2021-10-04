import { GetServerSideProps } from "next";

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

export const getServerSideProps: GetServerSideProps = async () => {
  const url = `${process.env.API_BASE}/api/v1/plog/`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${res.status} on ${url}`);
  }
  const data: ServerData = await res.json();
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
