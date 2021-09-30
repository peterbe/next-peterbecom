import { GetServerSideProps } from "next";

import { Blogpost } from "../../../components/plog";
import type { Post, Comments } from "../../../types";

interface ServerData {
  post: Post;
  comments: Comments;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const oid = context.params!.oid;
  const res = await fetch(`${process.env.API_BASE}/api/v1/plog/${oid}`);
  if (res.status === 404) {
    return {
      notFound: true,
    };
  }
  const data: ServerData = await res.json();
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
