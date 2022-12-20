import type { NextPage, GetServerSideProps } from "next";
import { Search } from "../components/search";
import { cacheHeader } from "../lib/cache";

// import type { GetServerSideProps } from "next";

// import { Search } from "../components/search";
// import { cacheHeader } from "../lib/cache";
// import { get } from "../lib/get-data";
// import { BadRequestError } from "../lib/errors";

// interface Document {
//   oid: string;
//   title: string;
//   date: string;
//   comment_oid: string | null;
//   summary: string;

//   score: number;
//   score_boosted: number;
//   popularity: number;
// }
// interface SearchResult {
//   count_documents: number;
//   count_documents_shown: number;
//   documents: Document[];
// }

// interface ServerData {
//   results: SearchResult;
// }
// interface ServerError {
//   [key: string]: {
//     message: string;
//   }[];
// }

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  cacheHeader(res);
  return { props: {} };
};

// export const getServerSideProps: GetServerSideProps = async ({
//   query,
//   res,
// }) => {
//   let q = query.q || "";
//   if (Array.isArray(q)) {
//     q = q[0];
//   }
//   q = q.trim();

//   let results = null;
//   let error = null;

//   const debug = "debug-search" in query;

//   if (q) {
//     const sp = new URLSearchParams();
//     sp.set("q", q);
//     if (debug) {
//       sp.set("debug", debug.toString());
//     }
//     const fetchURL = `/api/v1/search/?${sp.toString()}`;
//     const response = await get<ServerData | ServerError>(fetchURL);
//     if (response.statusCode === 400) {
//       const serverError = response.body as ServerError;

//       let error = `${response.body}`;
//       for (const [key, messages] of Object.entries(serverError)) {
//         for (const message of messages) {
//           error = `${key}: ${message.message}`;
//         }
//       }
//       return {
//         props: {
//           debug,
//           q,
//           error: `${response.body}`,
//         },
//       };
//     } else if (response.statusCode !== 200) {
//       throw new Error(`${response.statusCode} on ${fetchURL}`);
//     } else {
//       results = response.body.results;
//     }
//   }

//   if (!error) {
//     cacheHeader(res);
//   }

//   return {
//     props: {
//       debug,
//       q,
//       results,
//       error,
//     },
//   };
// };

// type ViewProps = React.ComponentProps<typeof Search>;

const Page: NextPage = () => {
  return <Search />;
};

export default Page;
