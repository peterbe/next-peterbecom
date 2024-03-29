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
  if (response.statusCode === 404 || response.statusCode === 400) {
    return {
      notFound: true,
    };
  }
  if (response.statusCode !== 200) {
    throw new Error(`${response.statusCode} on ${fetchURL}`);
  }
  const { post, comments } = response.body;
  const page = 1;

  if (post.pub_date && isNotPublished(post.pub_date)) {
    cacheHeader(res, 0);
  } else {
    cacheHeader(res);
  }

  return {
    props: {
      post,
      comments,
      page,
    },
  };
};

function isNotPublished(date: string) {
  const actualDate = new Date(date);
  return actualDate > new Date();
}

type ViewProps = React.ComponentProps<typeof Blogpost>;

const View = (props: ViewProps) => {
  if (props.post.oid === "blogitem-040601-1") {
    return <Lyricspost {...props} />;
  }
  return <Blogpost {...props} />;
};

export default View;
