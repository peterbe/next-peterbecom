import Head from "next/head";
import Link from "next/link";

import { Content } from "./content";
import { formatDateBasic } from "./utils";
import styles from "../styles/Search.module.css";

interface Document {
  oid: string;
  title: string;
  date: string;
  comment_oid: string | null;
  summary: string;

  score: number;
  score_boosted?: number;
  popularity?: number;
  popularity_ranking?: number;
}

type SearchTerm = [number, string];

type SearchTermBoosts = {
  [key: string]: [number, number];
};

interface SearchResult {
  count_documents: number;
  count_documents_shown: number;
  documents: Document[];
  search_time: number;
  search_terms: SearchTerm[];
  search_term_boosts: SearchTermBoosts;
}

interface Props {
  q: string | null;
  results?: SearchResult;
  error?: string | null;
  debug: boolean;
}

export function Search({ q, results, error, debug }: Props) {
  const pageTitle = q ? `Searching for ${q}` : "Search";
  let extraHead = null;
  const baseURL = "https://www.peterbe.com";
  if (results) {
    const found = results.count_documents;
    const shown = results.count_documents_shown;
    if (found === 1) {
      extraHead = "1 thing found";
    } else if (found > 1) {
      if (shown < found) {
        extraHead = `${found} things found (${shown} shown)`;
      } else {
        extraHead = `${found} things found`;
      }
    } else {
      extraHead = "Nothing found";
    }
  }

  // This is to avoid the
  // `Warning: A title element received an array with more than 1 element as children.`
  // warning.
  const pageTitleString = `${pageTitle} - Peterbe.com`;

  return (
    <Content pageTitle={pageTitle} extraHead={<h2>{extraHead}</h2>}>
      <Head>
        <title>{pageTitleString}</title>
      </Head>

      {error && (
        <div className="ui negative message">
          <div className="header">Search error</div>
          <p>
            An error occurred with the server for that search:
            <br />
            <code>{error}</code>
          </p>
        </div>
      )}

      {!q && (
        <form className="ui form search">
          <div className="field">
            <div className="ui fluid action input">
              <input type="search" name="q" placeholder="Search..." />
              <button type="submit" className="ui button primary">
                Search
              </button>
            </div>
          </div>
        </form>
      )}

      {results && !error && (
        <SearchMetaDetails
          found={results.count_documents}
          seconds={results.search_time}
        />
      )}

      {results && (
        <div>
          {results.documents.map((result) => {
            let url = `/plog/${result.oid}`;
            if (result.comment_oid) {
              url += `#${result.comment_oid}`;
            }
            return (
              <div
                key={`${result.oid}${result.comment_oid}`}
                className={styles.result}
              >
                <h3 className={styles.result_h3}>
                  <Link
                    href={url}
                    dangerouslySetInnerHTML={{ __html: result.title }}
                  ></Link>{" "}
                  {debug && !result.comment_oid && (
                    <DebugResult document={result} />
                  )}
                  &nbsp;
                  <small style={{ float: "right" }}>
                    {formatDateBasic(result.date)}
                  </small>
                </h3>
                <Link href={url} className={styles.result_a_url}>
                  {baseURL}
                  {url}
                </Link>
                <br />
                <span dangerouslySetInnerHTML={{ __html: result.summary }} />
              </div>
            );
          })}
        </div>
      )}

      {debug && results && results.search_terms && (
        <SearchTermDebugging
          searchTerms={results.search_terms}
          boosts={results?.search_term_boosts}
        />
      )}
    </Content>
  );
}

function DebugResult({ document }: { document: Document }) {
  let color = null;
  if (document.score_boosted) {
    if (document.score_boosted > 0) {
      color = "green";
    } else if (document.score_boosted < 0) {
      color = "red";
    } else {
      color = "black";
    }
  }

  return (
    <small style={{ fontWeight: "normal" }}>
      <span
        className="ui tag tiny label"
        title="Score straight from Elasticsearch's mouth"
      >
        Score {document.score.toFixed(6)}
      </span>{" "}
      <span className="ui tag tiny label" title="Popularity of document">
        Popularity {(document.popularity || 0.0).toFixed(6)} (
        {document.popularity_ranking})
      </span>{" "}
      <b
        className="ui tag tiny label"
        title="Change thanks to popularity"
        style={color ? { color } : undefined}
      >
        {document.score_boosted}
      </b>
    </small>
  );
}

function SearchTermDebugging({
  searchTerms,
  boosts,
}: {
  searchTerms: SearchTerm[];
  boosts: SearchTermBoosts;
}) {
  return (
    <>
      <p>
        <small>Search Term Debugging</small>
      </p>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Search Term</th>
            <th>Search Term Score</th>
            <th>Title Boost</th>
            <th>Text Boost</th>
          </tr>
        </thead>
        <tbody>
          {searchTerms.map(([score, term]) => {
            return (
              <tr key={`${term}${score}`}>
                <td>
                  <code>{term}</code>
                </td>
                <td>{score.toFixed(1)}</td>
                <td>{term in boosts && boosts[term][0].toFixed(1)}</td>
                <td>{term in boosts && boosts[term][1].toFixed(1)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function SearchMetaDetails({
  found,
  seconds,
}: {
  found: number;
  seconds: number;
}) {
  return (
    <p>
      <small>
        {found.toLocaleString()} matches in {seconds.toFixed(2)} seconds
      </small>
    </p>
  );
}
