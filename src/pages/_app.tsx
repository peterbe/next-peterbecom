import Head from "next/head";
// import '../styles/globals.css'
import "../styles/css/semantic/reset.min.css";
import "../styles/css/semantic/site.min.css";
// import "../styles/css/semantic/button.css",
import "../styles/css/slim-semantic-button.css"; // My own!
import "../styles/css/semantic/container.min.css";
// import "../styles/css/semantic/divider.css",
import "../styles/css/semantic/header.min.css";
import "../styles/css/semantic/input.css"; // has custom hacks
// import "../styles/css/semantic/label.css",
import "../styles/css/semantic/list.min.css";
import "../styles/css/semantic/loader.min.css";
import "../styles/css/semantic/segment.min.css";
import "../styles/css/semantic/form.min.css";
// import "../styles/css/semantic/grid.css"
import "../styles/css/slim-semantic-grid.css";
import "../styles/css/semantic/menu.min.css";
import "../styles/css/semantic/message.min.css";
import "../styles/css/semantic/table.min.css";
import "../styles/css/semantic/item.min.css";
import "../styles/css/semantic/comment.min.css";
import "../styles/css/semantic/dimmer.min.css";
import "../styles/css/semantic/dropdown.min.css";
import "../styles/css/semantic/search.css";
import "../styles/css/highlight.css";
import "../styles/css/peterbe.css";
import "../styles/css/search.css";
// import "../styles/css/plog-awspa.css";
import "../styles/css/carbon-ads.css";
// import "../styles/css/carbon-campaign.css",
// "autocompeter/autocompeter.min.css",

import type { AppProps } from "next/app";

import { USE_GOOGLE_ANALYTICS } from "../lib/_constants";
import { useGA, GAScripts } from "../lib/_ga";

function MyApp({ Component, pageProps }: AppProps) {
  useGA();

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/rss.xml"
        />

        {/* <GAScripts/> can't return null because it gets used inside a <Head> */}
        {USE_GOOGLE_ANALYTICS && <GAScripts />}

        <link rel="icon" href="/images/favicon-48.png" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
