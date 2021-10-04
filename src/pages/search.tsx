import { GetServerSideProps } from "next";

import { Search } from "../components/search";
// import type { Post, Comments } from "../../../types";

interface Document {
  oid: string;
  title: string;
  date: string;
  comment_oid: string | null;
  summary: string;

  score: number;
  score_boosted: number;
  popularity: number;
}
interface SearchResult {
  count_documents: number;
  count_documents_shown: number;
  documents: Document[];
}

interface ServerData {
  //   post: Post;
  //   comments: Comments;
  results: SearchResult;
}
interface ServerError {
  [key: string]: {
    message: string;
  }[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let q = context.query.q || "";
  if (Array.isArray(q)) {
    q = q[0];
  }
  q = q.trim();

  let results = null;
  let error = null;

  const debug = "debug-search" in context.query;

  if (q) {
    const sp = new URLSearchParams();
    sp.set("q", q);
    if (debug) {
      sp.set("debug", debug.toString());
    }
    const url = `${process.env.API_BASE}/api/v1/search/?${sp.toString()}`;
    const res = await fetch(url);
    if (res.status === 400) {
      const serverError: ServerError = await res.json();
      console.log(JSON.stringify(serverError, null, 2));

      for (const [key, messages] of Object.entries(serverError)) {
        for (const message of messages) {
          error = `${key}: ${message.message}`;
          break;
        }
        break;
      }
    } else if (!res.ok) {
      throw new Error(`${res.status} on ${url}`);
    } else {
      const data: ServerData = await res.json();
      console.log(data);
      results = data.results;
    }
  }

  //   const oid = context.params!.oid;
  //   const res = await fetch(`${process.env.API_BASE}/api/v1/plog/${oid}`);
  //   if (res.status === 404) {
  //     return {
  //       notFound: true,
  //     };
  //   }
  //   const data: ServerData = await res.json();
  //   const { post, comments } = data;
  const page = 1;
  return {
    props: {
      //   post,
      //   comments,
      debug,
      q,
      results,
      error,
      // page,
    },
  };
};

type ViewProps = React.ComponentProps<typeof Search>;

const View = (props: ViewProps) => {
  return <Search {...props} />;
};

export default View;
