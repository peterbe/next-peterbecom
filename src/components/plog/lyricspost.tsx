import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "../../styles/Lyricspost.module.css";

import { Content } from "../content";
import { CarbonAd } from "../carbonad";
import { CommentsSection } from "./comments";
import type { Post, Comments } from "../../types";

export function Lyricspost({
  post,
  comments,
  page,
}: {
  post: Post;
  comments: Comments;
  page: number;
}) {
  let pageTitle = "Find song by lyrics";

  // The contents of the `<title>` has to be a string
  const title = `${pageTitle} ${
    page > 1 ? ` (Page ${page})` : " Looking for songs by the lyrics"
  }`;

  return (
    <Content
      pageTitle={
        <>
          {pageTitle}{" "}
          {page > 1 && <span className="sub header">(Page {page})</span>}
        </>
      }
      hideMainMenu={true}
      extraHead={<SongLyricsSubheader page={page} />}
      footer={null}
    >
      <Head>
        <title>{title}</title>

        <meta
          property="og:url"
          content={`https://www.peterbe.com/plog/${post.oid}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content="Songsear.ch is a search engine for song lyrics. You can find the song if you only know parts of the song&#39;s lyrics."
        />
        <meta
          name="description"
          content="Find songs by lyrics. Use Songsear.ch when you can't remember the name of the song."
        />
      </Head>

      <LyricsBody />

      <CarbonAd />

      <CommentsSection
        disallowComments={post.disallow_comments}
        hideComments={post.hide_comments}
        comments={comments}
        page={page}
        post={post}
      />

      <LyricsFooter />
    </Content>
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

const fallbackForm = (
  <form
    // Use `style=` here because then it's easier to duplicate
    // this in to `<SongSearchAutocomplete/>` component.
    style={{ margin: "40px 0" }}
    action="https://songsear.ch/q/"
    onSubmit={(event) => {
      event.preventDefault();
      const element = document.querySelector<HTMLInputElement>(
        'input[type="search"]'
      );
      if (element && element.value) {
        document.location.href = `https://songsear.ch/q/${encodeURIComponent(
          element.value
        )}`;
      }
    }}
  >
    <div className="ui action fluid input">
      <input
        type="search"
        name="term"
        className="form-control x-large"
        placeholder="Type your lyrics search here..."
        maxLength={150}
        aria-label="Lyrics search"
      />
      <button className="ui button">Search</button>
    </div>
  </form>
);
const SongSearchAutocompleteLazy = dynamic(
  () => import("./songsearch-autocomplete"),
  {
    loading: () => fallbackForm,
  }
);

function LyricsBody() {
  return (
    <>
      <SongSearchAutocompleteLazy />

      {/* Commented out Jan 5, 2022 to give more room for the ad. */}
      {/* <p className={styles.songsearch_link}>
        Go to{" "}
        <a href="https://songsear.ch/" title="Search for song by lyrics">
          <b>Songsear.ch</b>
        </a>{" "}
        to search for songs from lyrics.
      </p> */}
    </>
  );
}

function LyricsFooter() {
  return (
    <div className={styles.lyrics_footer}>
      <p>
        &copy; <Link href="/">peterbe.com</Link> 2003 -{" "}
        {new Date().getFullYear()}
      </p>
    </div>
  );
}
