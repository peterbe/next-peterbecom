import Head from "next/head";

import { Content } from "./content";

export default function Custom400({ message }: { message?: string }) {
  return (
    <Content pageTitle="Peterbe.com">
      <Head>
        <title>400 Bad Request - Peterbe.com</title>
      </Head>
      <h1 style={{ margin: "75px 0", textAlign: "center" }}>Bad Request</h1>

      {message && (
        <p style={{ margin: "50px 0 200px 0" }}>
          <code>{message}</code>
        </p>
      )}
    </Content>
  );
}
