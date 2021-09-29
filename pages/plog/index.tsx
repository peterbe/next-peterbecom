import type { NextPage } from "next";
// import Head from "next/head";
import type { AppProps } from "next/app";
import {
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
  InferGetStaticPropsType,
} from "next";
import { Fragment } from "react";
import styles from "../../styles/Plog.module.css";

interface Post {
  oid: string;
  title: string;
  // id: string;
  categories: string[];
  comments: number;
}
interface Group {
  date: string;
  posts: Post[];
}
interface Data {
  groups: Group[];
}
// interface Groups {
//   [key: string]: Post[];
// }
// interface Props {
//   // children: ReactNode;
//   groups: Groups;
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("http://localhost:8000/api/v1/plog/");
  const data: Data = await res.json();
  const { groups } = data;
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      groups,
    },
  };
};

// const Plog: NextPage = (props: Props) => {
// function Plog({ data }: InferGetStaticPropsType<typeof getServerSideProps>) {
function Plog({ groups }: { groups: Group[] }) {
  return (
    <div className={styles.container}>
      <h1>Archive</h1>
      <dl>
        {groups.map(({ date, posts }) => {
          return (
            <Fragment key={date}>
              <dt>{date}</dt>
              {posts.map((post) => {
                return (
                  <dd key={post.oid}>
                    <a href={`/plog/${post.oid}`}>{post.title}</a>
                    {post.comments > 0 && (
                      <span className={styles.comments}>
                        {post.comments.toLocaleString()} comment
                        {post.comments === 1 ? "" : "s"}
                      </span>
                    )}
                    <span className={styles.categories}>
                      {post.categories.join(", ")}
                    </span>
                  </dd>
                );
              })}
            </Fragment>
          );
        })}
      </dl>
      {/* <Head>
        <title>About Peterbe.com</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
    </div>
  );
}

export default Plog;
