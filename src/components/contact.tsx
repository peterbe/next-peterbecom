import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Content } from "./content";
// import styles from "../styles/About.module.css";

export function Contact() {
  const pageTitle = "Contact me";
  return (
    <Content pageTitle={pageTitle}>
      <Head>
        <title>{pageTitle} - Peterbe.com</title>
      </Head>

      <h3>Email</h3>
      <p>
        <a href="mailto:mail@peterbe.com">mail@peterbe.com</a>
      </p>

      <h3>Twitter</h3>
      <p>
        <a href="https://twitter.com/peterbe">@peterbe</a>
      </p>

      <h3>GitHub</h3>
      <p>
        <a href="https://github.com/peterbe">@peterbe</a>
      </p>

      <h3>Instagram</h3>
      <p>
        <a href="https://www.instagram.com/peppebe/">@peppebe</a>
      </p>

      <h3>Telegram</h3>
      <p>@peppebe</p>
    </Content>
  );
}
