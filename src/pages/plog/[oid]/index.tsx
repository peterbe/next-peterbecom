import { GetServerSideProps } from "next";

import { cacheHeader } from "../../../lib/cache";
import { Blogpost } from "../../../components/plog";
import { Lyricspost } from "../../../components/plog/lyricspost";
import { get } from "../../../lib/get-data";
import type { Post, Comments } from "../../../types";

interface ServerData {
  post: Post;
  comments: Comments;
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  const oid = params!.oid as string;
  const fetchURL = `/api/v1/plog/${encodeURIComponent(oid)}`;
  const response = await get<ServerData>(fetchURL);
  if (response.statusCode === 404) {
    return {
      notFound: true,
    };
  }
  if (response.statusCode !== 200) {
    throw new Error(`${response.statusCode} on ${fetchURL}`);
  }
  const { post, comments } = response.body;
  const page = 1;

  cacheHeader(res);

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
