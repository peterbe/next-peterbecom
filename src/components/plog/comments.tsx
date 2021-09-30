import React, { useState, Fragment } from "react";
import type { Post, Comments, Comment } from "../../types";
import Link from "next/link";
import { CommentForm } from "./commentform";
import { DisplayComment } from "./comment";

export function CommentsSection({
  disallowComments,
  hideComments,
  comments,
  page,
  post,
}: {
  disallowComments: boolean;
  hideComments: boolean;
  comments: Comments;
  page: number;
  post: Post;
}) {
  const [parent, setParent] = useState<string | null>(null);

  const pagination = (
    <CommentsPagination
      oid={post.oid}
      page={page}
      nextPage={comments.next_page}
      previousPage={comments.previous_page}
    />
  );

  return (
    <>
      <h2 className="ui dividing header" id="comments">
        {comments.truncated ? "Recent comments" : "Comments"}
      </h2>

      <div className="pagination sub header">{pagination}</div>

      {hideComments && comments.count && (
        <p>
          <em>Comments hidden. Sorry.</em>
        </p>
      )}
      {!hideComments && (
        <div id="comments-outer" className="ui comments">
          <ShowCommentTree
            post={post}
            comments={comments.tree}
            disallowComments={disallowComments}
            setParent={(oid: string | null) => {
              setParent(oid);
            }}
            parent={parent}
          />
        </div>
      )}

      <div className="pagination pagination-footer">{pagination}</div>

      {disallowComments && (
        <p>
          <em>Comments closed</em>
        </p>
      )}
    </>
  );
}

function CommentsPagination({
  oid,
  page,
  nextPage,
  previousPage,
}: {
  oid: string;
  page: number;
  nextPage: number | null;
  previousPage: number | null;
}) {
  if (!nextPage && !previousPage) {
    return null;
  }

  return (
    <>
      {previousPage && (
        <>
          Go to{" "}
          <Link href={makePaginationURL(oid, previousPage)}>
            <a>← Page {page - 1}</a>
          </Link>
          &nbsp;
        </>
      )}{" "}
      <span style={{ color: "#999" }}>Page {page}</span> &nbsp;
      {nextPage && (
        <>
          Go to{" "}
          <Link href={makePaginationURL(oid, nextPage)}>
            <a>Page {nextPage} →</a>
          </Link>
          &nbsp;
        </>
      )}
    </>
  );
}

function makePaginationURL(oid: string, page: number) {
  let url = `/plog/${oid}`;
  if (page !== 1) {
    url += `/p${page}`;
  }
  url += "#comments";
  return url;
}

function ShowCommentTree({
  post,
  comments,
  disallowComments,
  setParent,
  parent,
  root = true,
}: {
  post: Post;
  comments: Comment[];
  disallowComments: boolean;
  setParent: (oid: string | null) => void;
  parent: string | null;
  root?: boolean;
}) {
  return (
    <>
      {comments.map((comment) => {
        let className = "comment";
        if (comment.depth) {
          className += ` nested d-${comment.depth}`;
        }
        return (
          <Fragment key={comment.id}>
            <DisplayComment
              comment={comment}
              disallowComments={disallowComments}
              setParent={setParent}
              notApproved={false}
            >
              {parent && parent === comment.oid && !disallowComments && (
                <CommentForm parent={parent} post={post} />
              )}
            </DisplayComment>

            {comment.replies && (
              <ShowCommentTree
                post={post}
                comments={comment.replies}
                disallowComments={disallowComments}
                setParent={setParent}
                parent={parent}
                root={false}
              />
            )}
          </Fragment>
        );
      })}
      {!parent && root && !disallowComments && (
        <CommentForm parent={parent} post={post} />
      )}
    </>
  );
}
