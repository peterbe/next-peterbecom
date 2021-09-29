import type { NextPage } from "next";
import Head from "next/head";
import type { AppProps } from "next/app";
import {
  // GetStaticProps,
  // GetStaticPaths,
  GetServerSideProps,
  // InferGetStaticPropsType,
  // InferGetServerSidePropsType,
} from "next";
import { Fragment } from "react";
import styles from "../../styles/Post.module.css";

import { Footer } from "../../components/footer";
import { CarbonAd } from "../../components/carbonad";
import { CommentsSection } from "../../components/plog/comments";
import { formatDateBasic } from "../../components/utils";
import type { Post, Comments } from "../../types";

interface Data {
  post: Post;
  comments: Comments;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.params;
  const oid = params!.oid;

  const API_BASE = process.env.API_BASE;
  if (!API_BASE) {
    throw new Error("can't not be set");
  }

  const res = await fetch(`${API_BASE}/api/v1/plog/${oid}`);
  if (res.status === 404) {
    return {
      notFound: true,
    };
  }
  const data: Data = await res.json();
  const { post, comments } = data;

  if (post.archived) {
    return {
      notFound: true,
    };
  }
  const page = 1;

  return {
    props: {
      post,
      comments,
      page,
    },
  };
};

const THIS_YEAR = new Date().getFullYear();

// const Plog: NextPage = (props: Props) => {
// function Plog({ data }: InferGetStaticPropsType<typeof getServerSideProps>) {
function Blogpost({
  post,
  comments,
  page,
}: {
  post: Post;
  comments: Comments;
  page: number;
}) {
  const isLyricsPage = post.oid === "blogitem-040601-1";
  let pageTitle = "";
  if (isLyricsPage) {
    if (page > 1) {
      pageTitle = `Find song by lyrics (Page ${page})`;
    } else {
      pageTitle = "Find song by lyrics - Looking for songs by the lyrics";
    }
  } else {
    pageTitle = post.title;
    if (page > 1) {
      pageTitle += ` (page ${page})`;
    }
    pageTitle += " - Peterbe.com";
  }
  return (
    <div>
      <Head>
        <title>{post.title} - Peterbe.com</title>

        <meta
          property="og:url"
          content={`https://www.peterbe.com/plog/${post.oid}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        {post.summary && (
          <meta property="og:description" content={post.summary} />
        )}

        {!isLyricsPage && (
          <>
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
          </>
        )}
      </Head>
      <div className="ui main container">
        <h1 className="ui header">
          {pageTitle}{" "}
          {page > 1 && <span className="sub header">(Page {page})</span>}
        </h1>

        {!isLyricsPage && (
          <p>
            {formatDateBasic(post.pub_date)} &nbsp;{" "}
            <span className={styles.comment_count}>
              {comments.count.toLocaleString()} comment
              {comments.count !== 0 && "s"}
            </span>{" "}
            &nbsp;{" "}
            {post.categories.map((name, i) => {
              return (
                <Fragment key={name}>
                  <a
                    href={categoryURL(name)}
                    rel="nofollow"
                    title={`Filter by the '${name}' category'`}
                  >
                    {name}
                  </a>
                  {i !== post.categories.length - 1 && ", "}
                </Fragment>
              );
            })}
          </p>
        )}

        {isLyricsPage && <SongLyricsSubheader page={page} />}
        {!isLyricsPage && post.url && (
          <h4>
            <a href={post.url}>{post.url}</a>
          </h4>
        )}
      </div>

      <div className="ui container content">
        {!isLyricsPage && isOld(post.pub_date) && (
          <OldPostWarning date={post.pub_date} />
        )}
        {isNotPublished(post.pub_date) && (
          <NotPublishedWarning date={post.pub_date} />
        )}

        {/* When it's the lyrics page, show the Carbon Ad AFTER the post text */}
        {!isLyricsPage && <CarbonAd />}

        <div dangerouslySetInnerHTML={{ __html: post.body }} />

        {isLyricsPage && <CarbonAd />}

        {!isLyricsPage && (
          <p>
            <a
              href="https://twitter.com/peterbe"
              className="ui tiny twitter button"
              target="_blank"
              rel="noopener"
            >
              Follow <b>@peterbe</b> on Twitter
            </a>
          </p>
        )}

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

        {isLyricsPage && (
          <p className={styles.lyrics_footer}>
            &copy; <a href="/">peterbe.com</a> 2003 - {THIS_YEAR}
          </p>
        )}
      </div>

      {!isLyricsPage && <Footer />}
    </div>
  );
}
export default Blogpost;

function isNotPublished(date: string) {
  const actualDate = new Date(date);
  return actualDate > new Date();
}

function NotPublishedWarning({ date }: { date: string }) {
  return (
    <div className="ui negative message" style={{ marginBottom: 40 }}>
      <div className="header">Not Published Yet!</div>
      <p>
        This blog post is not published yet. It publishes on <b>{{ date }}</b>
        (in {simpleTimeDelta(date)}).
      </p>
    </div>
  );
}

function simpleTimeDelta(date: string): string {
  const actualDate = new Date(date);
  const seconds = (new Date().getTime() - actualDate.getTime()) / 1000;
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
        This blog post is
        <b>{{ years }} years old!</b> Most likely, its content is outdated.
        Especially if it's technical.
      </p>
    </div>
  );
}

function SongLyricsSubheader({ page }: { page: number }) {
  const titles: {
    [key: number]: string;
  } = {
    1: "I'm looking for a song that goes like this lyrics.",
    2: "I'm looking for this song by these lyrics.",
    3: "I'm looking for a song I don't know the name of.",
    4: "Looking for a song you heard, but don't know the name?",
    5: "Looking for a song you heard, but don't know the name?",
    6: "Trying to find a song but only know a few words.",
    7: "Anyone know this song by these lyrics?",
    8: "I'm looking for this song by these lyrics.",
    9: "Trying to find the name of the song.",
    10: "Looking for the name of the song by the lyrics.",
    11: "Help me find the name of the song by lyrics.",
    12: "I'm looking for a song that goes...",
    13: "I don't know the song, but I know some lyrics.",
  };
  const title = titles[page] || "Look for a song by its lyrics.";
  return <h3 className="ui header">{title}</h3>;
}

function categoryURL(name: string) {
  return `/oc-${name.replace(" ", "+")}`;
}

function absoluteURL(uri: string) {
  if (!uri.includes("://")) {
    return `https://www.peterbe.com${uri}`;
  }
  return uri;
}
