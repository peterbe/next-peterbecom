import { GetServerSideProps } from "next";

import { cacheHeader } from "../../lib/cache";
import { get } from "../../lib/get-data";
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
  const fetchURL = "/api/v1/plog/";

  const response = await get<ServerData>(fetchURL, true);
  const data = response.body;

  const { groups } = data;

  cacheHeader(res, 60 * 60);

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
