import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

import { Content } from "../content";

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
    // Remember, not using CSS modules on this page because it's so huge.
    <dl id="archive">
      {groups.map(({ date, posts }) => {
        return (
          <Fragment key={date}>
            <dt>{formatDate(date)}</dt>
            {posts.map((post) => {
              return (
                <dd key={post.oid}>
                  <Link href={`/plog/${post.oid}`}>
                    <a>{post.title}</a>
                  </Link>{" "}
                  {post.comments > 0 && (
                    <span className="comments">
                      {post.comments.toLocaleString()} comment
                      {post.comments === 1 ? "" : "s"}
                    </span>
                  )}{" "}
                  <span className="categories">
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
