import Head from "next/head";
import Link from "next/link";

import { Content } from "../components/content";

export default function Custom404() {
  return (
    <Content pageTitle="Peterbe.com">
      <Head>
        <title>404 Page not found - Peterbe.com</title>
      </Head>
      <h1 style={{ margin: "75px 0", textAlign: "center" }}>Page not found</h1>

      <p style={{ margin: "50px 0 200px 0" }}>
        It&apos;s awful but it appears this URL does not match anything.
        <br />
        <br />
        <b>Try...</b>
        <ul>
          <li>
            <Link href="/">Go to the Home page</Link>
          </li>
          <li>
            <Link href="/plog">Go to the Archive page</Link>
          </li>
        </ul>
      </p>
    </Content>
  );
}
