import Head from "next/head";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import styles from "../../styles/Post.module.css";

import { Content } from "../content";
import { CarbonAd } from "../carbonad";
import { CommentsSection } from "./comments";
import { formatDateBasic } from "../utils";
import type { Post, Comments } from "../../types";

export function Blogpost({
  post,
  comments,
  page,
}: {
  post: Post;
  comments: Comments;
  page: number;
}) {
  let pageTitle = "";

  pageTitle = post.title;

  if (page > 1) {
    pageTitle += ` (page ${page})`;
  }
  pageTitle += " - Peterbe.com";

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if (!mounted) return;

      const url = document.location.href.split("#")[0] + "/ping";
      const pathname = document.location.pathname.split("/");
      const oid = pathname[pathname.length - 1];
      let pinged: string[] = [];
      try {
        pinged.push(
          ...(window.sessionStorage.getItem("pinged") || "").split("/")
        );
      } catch (err) {
        console.warn("sessionStorage.getItem() not working", err);
      }
      fetch(url, {
        method: "PUT",
      }).then((r) => {
        pinged.unshift(oid);
        try {
          window.sessionStorage.setItem("pinged", pinged.join("/"));
        } catch (err) {
          console.warn("sessionStorage.setItem() not working", err);
        }
      });
    }, 800);
    return () => {
      mounted = false;
    };
  }, []);

  // So that what we put into `<title>` is just a string.
  // Otherwise Next will complain about:
  //
  //    Warning: A title element received an array with more than 1 element
  //    as children. In browsers title Elements can only have Text Nodes as
  //    children. If the children being rendered output more than a single
  //    text node in aggregate the browser will display markup and
  //    comments as text in the title and hydration will likely fail and
  //    fall back to client rendering
  const title = `${post.title} ${
    page > 1 ? `(Page ${page})` : ""
  } - Peterbe.com`;

  return (
    <Content
      pageTitle={
        <>
          {post.title}{" "}
          {page > 1 && <span className="sub header">(Page {page})</span>}
        </>
      }
      hideMainMenu={false}
      extraHead={
        <p>
          {formatDateBasic(post.pub_date)} &nbsp;{" "}
          <span className={styles.comment_count}>
            {comments.count.toLocaleString()} comment
            {comments.count !== 1 && "s"}
          </span>{" "}
          &nbsp;{" "}
          {post.categories.map((name, i) => {
            return (
              <span key={name}>
                <Link
                  href={categoryURL(name)}
                  rel="nofollow"
                  title={`Filter by the '${name}' category'`}
                >
                  {name}
                </Link>
                {i !== post.categories.length - 1 && ", "}
              </span>
            );
          })}
        </p>
      }
    >
      <Head>
        <title>{title}</title>

        <meta
          property="og:url"
          content={`https://www.peterbe.com/plog/${post.oid}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        {post.summary && (
          <meta property="og:description" content={post.summary} />
        )}

        <meta name="twitter:creator" content="@peterbe" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        {post.summary && <meta name="description" content={post.summary} />}
        {post.summary && (
          <meta name="twitter:description" content={post.summary} />
        )}

        {post.open_graph_image && (
          <>
            <meta
              name="twitter:image"
              content={absoluteURL(post.open_graph_image)}
            />
            <meta
              property="og:image"
              content={absoluteURL(post.open_graph_image)}
            />
          </>
        )}
      </Head>

      {isOld(post.pub_date) && <OldPostWarning date={post.pub_date} />}

      {post.url && (
        <h4>
          <a href={post.url} rel="noopener noreferrer">
            {post.url}
          </a>
        </h4>
      )}

      {isNotPublished(post.pub_date) && (
        <NotPublishedWarning date={post.pub_date} />
      )}

      <CarbonAd />

      <div dangerouslySetInnerHTML={{ __html: post.body }} />

      <p className={styles.twitter_button}>
        <a
          href="https://twitter.com/peterbe"
          className="ui tiny twitter button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow <b>@peterbe</b> on Twitter
        </a>
      </p>

      {post.hide_comments && post.disallow_comments ? (
        <p>
          <em>Comments closed for this page</em>
        </p>
      ) : (
        <CommentsSection
          disallowComments={post.disallow_comments}
          hideComments={post.hide_comments}
          comments={comments}
          page={page}
          post={post}
        />
      )}

      <RelatedPosts post={post} />
    </Content>
  );
}

function isNotPublished(date: string) {
  const actualDate = new Date(date);
  return actualDate > new Date();
}

function NotPublishedWarning({ date }: { date: string }) {
  return (
    <div className="ui negative message" style={{ marginBottom: 40 }}>
      <div className="header">Not Published Yet!</div>
      <p>
        This blog post is not published yet. It publishes in{" "}
        <b>{simpleTimeDelta(date)}</b> ({new Date(date).toLocaleString()}).
      </p>
    </div>
  );
}

function simpleTimeDelta(date: string): string {
  const actualDate = new Date(date);
  const seconds = (actualDate.getTime() - new Date().getTime()) / 1000;
  const minutes = seconds / 60;
  if (minutes > 120) {
    const hours = minutes / 60;
    return `${hours.toFixed(0)} hours`;
  }
  return `${minutes.toFixed(0)} minutes`;
}

function isOld(date: string) {
  const actualDate = new Date(date);
  const years =
    (new Date().getTime() - actualDate.getTime()) / 1000 / 60 / 60 / 24 / 365;
  return years > 3;
}

function OldPostWarning({ date }: { date: string }) {
  const actualDate = new Date(date);
  const years =
    (new Date().getTime() - actualDate.getTime()) / 1000 / 60 / 60 / 24 / 365;
  let className = "ui";
  if (years > 6) {
    className += " warning";
  } else {
    className += " info";
  }
  className += " message";
  return (
    <div className={className} style={{ marginBottom: 40 }}>
      <div className="header">Mind that age!</div>
      <p>
        This blog post is <b>{Math.floor(years)} years old!</b> Most likely, its
        content is outdated. Especially if it&apos;s technical.
      </p>
    </div>
  );
}

function categoryURL(name: string) {
  return `/oc-${name.replace(" ", "+")}`;
}

function postURL(oid: string) {
  return `/plog/${oid}`;
}

function absoluteURL(uri: string) {
  if (!uri.includes("://")) {
    return `https://www.peterbe.com${uri}`;
  }
  return uri;
}

function RelatedPosts({ post }: { post: Post }) {
  const previousPost = post.previous_post;
  const nextPost = post.next_post;
  const relatedByCategory = post.related_by_category || [];
  const relatedByKeyword = post.related_by_keyword || [];

  return (
    <>
      <h2 className="ui dividing header">Related posts</h2>

      <dl className="related-posts">
        {previousPost && (
          <>
            <dt>Previous:</dt>
            <dd>
              <Link href={postURL(previousPost.oid)}>{previousPost.title}</Link>{" "}
              <small>{formatDateBasic(previousPost.pub_date)}</small>
            </dd>
          </>
        )}

        {nextPost && (
          <>
            <dt>Next:</dt>
            <dd>
              <Link href={postURL(nextPost.oid)}>{nextPost.title}</Link>{" "}
              <small>{formatDateBasic(nextPost.pub_date)}</small>
            </dd>
          </>
        )}
      </dl>

      {relatedByCategory.length > 0 && (
        <>
          <dl className="related-posts">
            <dt>Related by category:</dt>
            {relatedByCategory.map((related) => (
              <dd key={related.oid}>
                <Link href={postURL(related.oid)}>{related.title}</Link>{" "}
                <small>{formatDateBasic(related.pub_date)}</small>{" "}
                <SubCategories categories={related.categories || []} />
              </dd>
            ))}
          </dl>
        </>
      )}

      {relatedByKeyword.length > 0 && (
        <>
          <dl className="related-posts">
            <dt>Related by keyword:</dt>
            {relatedByKeyword.map((related) => (
              <dd key={related.oid}>
                <Link href={postURL(related.oid)}>{related.title}</Link>{" "}
                <small>{formatDateBasic(related.pub_date)}</small>
              </dd>
            ))}
          </dl>
        </>
      )}
    </>
  );
}

function SubCategories({ categories }: { categories: string[] }) {
  return (
    <>
      {categories.map((category, i) => (
        <Fragment key={category}>
          <Link
            href={categoryURL(category)}
            title={`Filter by the '${category}' category`}
          >
            <small>{category}</small>
          </Link>
          {i < categories.length - 1 && <small>, </small>}
        </Fragment>
      ))}
    </>
  );
}
