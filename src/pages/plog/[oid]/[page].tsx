import { GetServerSideProps } from "next";

import { Blogpost } from "../../../components/plog";
import type { Post, Comments } from "../../../types";

interface ServerData {
  post: Post;
  comments: Comments;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const pageRaw = params!.page as string;
  if (!/^p\d+/.test(pageRaw)) {
    return {
      notFound: true,
    };
  }
  const page = parseInt(pageRaw.slice(1), 10);
  const oid = params!.oid as string;
  const sp = new URLSearchParams();
  sp.set("page", `${page}`);
  const res = await fetch(
    `${process.env.API_BASE}/api/v1/plog/${oid}?${sp.toString()}`
  );
  if (res.status === 404) {
    return {
      notFound: true,
    };
  }
  const data: ServerData = await res.json();
  const { post, comments } = data;

  return {
    props: {
      post,
      comments,
      page,
    },
  };
};

type ViewProps = React.ComponentProps<typeof Blogpost>;

const View = (props: ViewProps) => {
  return <Blogpost {...props} />;
};

export default View;
