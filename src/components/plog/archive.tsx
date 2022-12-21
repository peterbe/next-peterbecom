import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

import { Content } from "../content";
import styles from "../../styles/Archive.module.scss";

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

  const title = `${pageTitle} - Peterbe.com`;
  return (
    <Content pageTitle={pageTitle}>
      <Head>
        <title>{title}</title>
      </Head>
      <ListGroups groups={groups} />
    </Content>
  );
}

function ListGroups({ groups }: { groups: Group[] }) {
  return (
    <dl className={styles.archive}>
      {groups.map(({ date, posts }) => {
        return (
          <Fragment key={date}>
            <dt>{formatDate(date)}</dt>
            {posts.map((post) => {
              const count = `${post.comments.toLocaleString()} comment${
                post.comments === 1 ? "" : "s"
              }`;
              return (
                <dd key={post.oid}>
                  <Link href={`/plog/${post.oid}`}>{post.title}</Link>{" "}
                  {post.comments > 0 && <span>{count}</span>}{" "}
                  {/* Using <b> here because of SCSS in Archive.module.scss
                  I can't seen to use something like <span className="categories">
                   */}
                  <b>{post.categories.join(", ")}</b>
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
