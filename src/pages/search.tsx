import type { NextPage, GetServerSideProps } from "next";
import { Search } from "../components/search";
import { cacheHeader } from "../lib/cache";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res, query } = context;
  cacheHeader(res);

  let xhrPreloadURL = "";
  if (query && query.q) {
    // Replicate the same logic as in components/search.tsx for the
    // perfect "spelling" of the URL that will be XHR fetched on the
    // page after document.onload.
    const { q, debug } = query;
    if (typeof q === "string") {
      const debugBool = debug === "true" || debug === "1";
      xhrPreloadURL = `/api/v1/search?${new URLSearchParams({
        q,
        debug: JSON.stringify(debugBool),
      }).toString()}`;
    }
  }
  return { props: { xhrPreloadURL } };
};

type ViewProps = React.ComponentProps<typeof Search>;

const Page: NextPage = (props: ViewProps) => {
  return <Search {...props} />;
};

export default Page;
