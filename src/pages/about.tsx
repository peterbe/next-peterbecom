import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/About.module.css";

const About: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>About Peterbe.com</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>
          Back to <Link href="/">Home</Link>
        </p>
        <Image
          src="/about/thatsgroce.png"
          alt="That's Groce!"
          width={120}
          height={120}
        />
      </main>
    </div>
  );
};

export default About;
