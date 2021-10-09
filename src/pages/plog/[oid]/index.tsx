import { GetServerSideProps } from "next";

import { Blogpost } from "../../../components/plog";
import type { Post, Comments } from "../../../types";

interface ServerData {
  post: Post;
  comments: Comments;
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  if (process.env.NODE_ENV !== "development") {
    res.setHeader("Cache-Control", "public,max-age=86400");
  }
  const oid = params!.oid;
  const response = await fetch(`${process.env.API_BASE}/api/v1/plog/${oid}`);
  if (response.status === 404) {
    return {
      notFound: true,
    };
  }
  const data: ServerData = await response.json();
  const { post, comments } = data;
  const page = 1;
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
