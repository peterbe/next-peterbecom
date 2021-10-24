import Head from "next/head";
import Link from "next/link";

import { Content } from "../components/content";

export default function Custom500() {
  return (
    <Content pageTitle="Server error" hideMainMenu={true}>
      <Head>
        <title>Server error - Peterbe.com</title>
      </Head>

      <div className="ui negative message" style={{ margin: "50px 0" }}>
        <div className="header">Server error</div>
        <p>
          One of the hard-working squirrels that operates this site has had a
          freakout.
        </p>
        <p>
          So sorry. Try <b>reloading the page</b> or <b>try again later</b>.
        </p>
      </div>

      <p style={{ margin: "50px 0" }}>
        <b>Try...</b>
        <ul>
          <li>
            <Link href="/">Go to the Home page</Link>
          </li>
          <li>
            <Link href="/plog">Go to the Archive page</Link>
          </li>
          <li>
            <Link href="/contact">Go to the Contact page</Link>
          </li>
        </ul>
      </p>
    </Content>
  );
}
