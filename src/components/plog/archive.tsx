import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

import { Content } from "../content";
import styles from "../../styles/Archive.module.css";

interface Post {
  oid: string;
  title: string;
  categories: string[];
  comments: number;
}
interface Group {
  date: string;
  posts: Post[];
}

interface Props {
  groups: Group[];
}

export function Archive({ groups }: Props) {
  const pageTitle = "Blog archive";

  return (
    <Content pageTitle={pageTitle}>
      <Head>
        <title>{pageTitle} - Peterbe.com</title>
      </Head>
      <ListGroups groups={groups} />
    </Content>
  );
}

function ListGroups({ groups }: { groups: Group[] }) {
  return (
    <dl>
      {groups.map(({ date, posts }) => {
        return (
          <Fragment key={date}>
            <dt className={styles.date}>{formatDate(date)}</dt>
            {posts.map((post) => {
              return (
                <dd key={post.oid} className={styles.post}>
                  <Link href={`/plog/${post.oid}`}>
                    <a className={styles.post_link}>{post.title}</a>
                  </Link>{" "}
                  {post.comments > 0 && (
                    <span className={styles.comments}>
                      {post.comments.toLocaleString()} comment
                      {post.comments === 1 ? "" : "s"}
                    </span>
                  )}{" "}
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
  );
}

function formatDate(date: string) {
  const [year, month] = date.split(".");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[parseInt(month) - 1];
  return `${monthName}, ${year}`;
}
