import { GetServerSideProps } from "next";

import { cacheHeader } from "../../../lib/cache";
import { Blogpost } from "../../../components/plog";
import { Lyricspost } from "../../../components/plog/lyricspost";
import type { Post, Comments } from "../../../types";
import { get } from "../../../lib/get-data";

interface ServerData {
  post: Post;
  comments: Comments;
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
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
  const fetchURL = `/api/v1/plog/${encodeURIComponent(oid)}?${sp.toString()}`;
  const response = await get<ServerData>(fetchURL);
  if (response.statusCode === 404 || response.statusCode === 400) {
    return {
      notFound: true,
    };
  }
  if (response.statusCode >= 400) {
    throw new Error(`${response.statusCode} on ${fetchURL}`);
  }
  const { post, comments } = response.body;

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
