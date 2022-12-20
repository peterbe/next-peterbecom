import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

import { Content } from "./content";

import styles from "../styles/Home.module.css";
import { formatDateBasic, postURL, categoryURL } from "./utils";

interface Post {
  title: string;
  oid: string;
  comments: number;
  pub_date: string;
  categories: string[];
  url: string;
  html: string;
  disallow_comments: boolean;
}

interface Props {
  posts: Post[];
  nextPage: number | null;
  previousPage: number | null;
  categories: string[];
}

export function Homepage({ posts, categories, nextPage, previousPage }: Props) {
  return (
    <Content
      pageTitle="Peterbe.com"
      extraHead={<p>A blog and website by Peter Bengtsson</p>}
    >
      <Head>
        <title>Peterbe.com - Stuff in Peter&apos;s head</title>
      </Head>

      {categories.length > 0 && <CategoryFiltering categories={categories} />}

      {posts.map((post) => {
        return (
          <div key={post.oid} className={styles.post}>
            <h2>
              <Link href={postURL(post.oid)}>{post.title}</Link>
            </h2>
            <p>
              <span className={styles.post_metadata_date}>
                {formatDateBasic(post.pub_date)}
              </span>
              <span className={styles.post_metadata_comments}>
                {post.comments} comment{post.comments !== 1 && "s"}{" "}
              </span>
              {post.categories.map((name, i) => (
                <Fragment key={name}>
                  <Link
                    href={categoryURL(name)}
                    rel="nofollow"
                    title={`Filter by the '${name}' category`}
                  >
                    {name}
                  </Link>
                  {i < post.categories.length - 1 && ", "}
                </Fragment>
              ))}
            </p>

            {post.url && (
              <h4>
                <a href={post.url}>{post.url}</a>
              </h4>
            )}

            <div dangerouslySetInnerHTML={{ __html: post.html }} />

            {!post.disallow_comments && (
              <p className={styles.comment_banner}>
                <Link href={postURL(post.oid) + "#commentsform"}>
                  Please post a comment if you have thoughts or questions.
                </Link>
              </p>
            )}
          </div>
        );
      })}

      <HomepagePagination
        categories={categories}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </Content>
  );
}

function CategoryFiltering({ categories }: { categories: string[] }) {
  return (
    <div className="ui warning message">
      <div className="header">Filtered home page!</div>
      Currently only showing blog entries under the
      {categories.length === 1 ? "category" : "categories"}:{" "}
      {categories.map((category, i) => {
        return (
          <Fragment key={category}>
            <Link href={categoryURL(category)}>
              <a rel="nofollow">
                <b>{category}</b>
              </a>
            </Link>
            {i === categories.length - 1 ? "." : ", "}
          </Fragment>
        );
      })}{" "}
      <Link href="/">Clear filter</Link>
    </div>
  );
}

function HomepagePagination({
  categories,
  nextPage,
  previousPage,
}: {
  categories: string[];
  nextPage: number | null;
  previousPage: number | null;
}) {
  return (
    <div className="ui two column centered grid" style={{ marginTop: 100 }}>
      <div className="ui pagination menu">
        {nextPage ? (
          <Link href={makeURL(nextPage, categories)} className="item">
            &larr; Older
          </Link>
        ) : (
          <a className="item disabled">Older</a>
        )}{" "}
        {previousPage !== null ? (
          <Link href={makeURL(previousPage, categories)} className="item">
            Newer &rarr;
          </Link>
        ) : (
          <a className="item disabled">Newer</a>
        )}
      </div>
    </div>
  );
}

function makeURL(page: number, categories: string[]) {
  let url = "";
  for (const category of categories) {
    url += `/oc-${category.replace(/\s/g, "+")}`;
  }
  if (page && page !== 1) {
    url += `/p${page}`;
  }
  return url || "/";
}
