import { GetServerSideProps } from "next";

import { cacheHeader } from "../../../lib/cache";
import { Blogpost } from "../../../components/plog";
import { Lyricspost } from "../../../components/plog/lyricspost";
import type { Post, Comments } from "../../../types";
import { API_BASE } from "../../../lib/_constants";

interface ServerData {
  post: Post;
  comments: Comments;
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  cacheHeader(res);

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
  const response = await fetch(
    `${API_BASE}/api/v1/plog/${encodeURIComponent(oid)}?${sp.toString()}`
  );
  if (response.status === 404 || response.status === 400) {
    return {
      notFound: true,
    };
  }
  const data: ServerData = await response.json();
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
  if (props.post.oid === "blogitem-040601-1") {
    return <Lyricspost {...props} />;
  }
  return <Blogpost {...props} />;
};

export default View;
