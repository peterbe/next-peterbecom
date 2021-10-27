import { GetServerSideProps } from "next";

import { cacheHeader } from "../../../lib/cache";
import { Blogpost } from "../../../components/plog";
import { Lyricspost } from "../../../components/plog/lyricspost";
import { API_BASE } from "../../../lib/_constants";
import type { Post, Comments } from "../../../types";

interface ServerData {
  post: Post;
  comments: Comments;
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  cacheHeader(res);

  const oid = params!.oid;
  const response = await fetch(`${API_BASE}/api/v1/plog/${oid}`);
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
  if (props.post.oid === "blogitem-040601-1") {
    return <Lyricspost {...props} />;
  }
  return <Blogpost {...props} />;
};

export default View;
