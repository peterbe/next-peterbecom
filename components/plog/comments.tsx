import React, { useState, Fragment } from "react";
import type { Post, Comments, Comment } from "../../types";
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
  return (
    <>
      <h2 className="ui dividing header" id="comments">
        {comments.truncated ? "Recent comments" : "Comments"}
      </h2>

      {(comments.paginate_uri_next || comments.paginate_uri_previous) && (
        <span className="pagination sub header">
          {comments.paginate_uri_previous && (
            <>
              Go to{" "}
              <a href={`${comments.paginate_uri_previous}#comments`}>
                ← Page {page - 1}
              </a>
              &nbsp;
            </>
          )}{" "}
          <span style={{ color: "#999" }}>Page {page}</span> &nbsp;
          {comments.paginate_uri_next && (
            <>
              Go to{" "}
              <a href={`${comments.paginate_uri_next}#comments`}>
                Page {page + 1} →
              </a>
              &nbsp;
            </>
          )}
        </span>
      )}

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

      {disallowComments && (
        <p>
          <em>Comments closed</em>
        </p>
      )}
    </>
  );
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
