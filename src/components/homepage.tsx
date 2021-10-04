import { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";

import { Content } from "./content";

// import styles from "../styles/Home.module.css";
interface Post {
  title: string;
  oid: string;
  comments: number;
  categories: string[];
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

      <div>
        {posts.map((post) => {
          return (
            <div key={post.oid}>
              <h3>
                <Link href={`/plog/${post.oid}`}>{post.title}</Link>
              </h3>
            </div>
          );
        })}
      </div>

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

function categoryURL(name: string) {
  return `/oc-${name.replace(" ", "+")}`;
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
          <Link href={makeURL(nextPage, categories)}>
            <a className="item">&larr; Older</a>
          </Link>
        ) : (
          <a className="item disabled">Older</a>
        )}{" "}
        {previousPage !== null ? (
          <Link href={makeURL(previousPage, categories)}>
            <a className="item">Newer &rarr;</a>
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
