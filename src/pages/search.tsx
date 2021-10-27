import type { GetServerSideProps } from "next";

import { Search } from "../components/search";
import { cacheHeader } from "../lib/cache";
import { API_BASE } from "../lib/_constants";

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
  results: SearchResult;
}
interface ServerError {
  [key: string]: {
    message: string;
  }[];
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  let q = query.q || "";
  if (Array.isArray(q)) {
    q = q[0];
  }
  q = q.trim();

  let results = null;
  let error = null;

  const debug = "debug-search" in query;

  if (q) {
    const sp = new URLSearchParams();
    sp.set("q", q);
    if (debug) {
      sp.set("debug", debug.toString());
    }
    const url = `${API_BASE}/api/v1/search/?${sp.toString()}`;
    const response = await fetch(url);
    if (response.status === 400) {
      const serverError: ServerError = await response.json();

      for (const [key, messages] of Object.entries(serverError)) {
        for (const message of messages) {
          error = `${key}: ${message.message}`;
          break;
        }
        break;
      }
    } else if (!response.ok) {
      throw new Error(`${response.status} on ${url}`);
    } else {
      const data: ServerData = await response.json();
      results = data.results;
    }
  }

  if (!error) {
    cacheHeader(res);
  }

  return {
    props: {
      debug,
      q,
      results,
      error,
    },
  };
};

type ViewProps = React.ComponentProps<typeof Search>;

const View = (props: ViewProps) => {
  return <Search {...props} />;
};

export default View;
