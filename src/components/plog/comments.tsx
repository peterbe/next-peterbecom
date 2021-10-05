import React, { useState, Fragment, useEffect } from "react";
import Link from "next/link";

import type {
  Post,
  Comments,
  Comment,
  OwnComment,
  AddOwnComment,
} from "../../types";
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
  const [ownComments, setOwnComments] = useState<OwnComment[]>([]);

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
            ownComments={ownComments}
            addOwnComment={(
              hash: string,
              renderedComment: string,
              comment: string,
              name: string,
              email: string,
              parent: string | null
            ) => {
              setOwnComments((prevState) => {
                const newComments: OwnComment[] = [];
                let edited = false;
                for (const ownComment of prevState) {
                  if (ownComment.hash === hash) {
                    newComments.push({
                      hash,
                      renderedComment,
                      comment,
                      name,
                      email,
                      parent,
                    });
                    edited = true;
                  } else {
                    newComments.push(ownComment);
                  }
                }
                if (!edited) {
                  newComments.push({
                    hash,
                    renderedComment,
                    comment,
                    name,
                    email,
                    parent,
                  });
                }
                return newComments;
              });
            }}
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
          <Link href={makePaginationURL(oid, previousPage)}>
            <a>← Go to page {page - 1}</a>
          </Link>
          &nbsp;
        </>
      )}{" "}
      <span style={{ color: "#999" }}>Page {page}</span> &nbsp;
      {nextPage && (
        <>
          <Link href={makePaginationURL(oid, nextPage)}>
            <a>Go to page {nextPage} →</a>
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
  addOwnComment,
  ownComments,
}: {
  post: Post;
  comments: Comment[];
  disallowComments: boolean;
  setParent: (oid: string | null) => void;
  parent: string | null;
  root?: boolean;
  addOwnComment: AddOwnComment;
  ownComments: OwnComment[];
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
              parent={parent}
            >
              {parent && parent === comment.oid && !disallowComments && (
                <>
                  {ownComments
                    .filter((c) => c.parent === comment.oid)
                    .map((ownComment) => (
                      <DisplayOwnComment
                        key={ownComment.hash}
                        ownComment={ownComment}
                        post={post}
                        addOwnComment={addOwnComment}
                      />
                    ))}

                  <CommentForm
                    parent={parent}
                    post={post}
                    addOwnComment={addOwnComment}
                  />
                </>
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
                addOwnComment={addOwnComment}
                ownComments={ownComments}
              />
            )}
          </Fragment>
        );
      })}

      {!parent && root && !disallowComments && (
        <>
          {ownComments
            .filter((c) => c.parent === null)
            .map((ownComment) => (
              <DisplayOwnComment
                key={ownComment.hash}
                ownComment={ownComment}
                post={post}
                addOwnComment={addOwnComment}
              />
            ))}

          <CommentForm
            parent={parent}
            post={post}
            addOwnComment={addOwnComment}
          />
        </>
      )}
    </>
  );
}

function DisplayOwnComment({
  ownComment,
  post,
  addOwnComment,
}: {
  ownComment: OwnComment;
  addOwnComment: AddOwnComment;
  post: Post;
}) {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setEditMode(false);
  }, [ownComment]);

  if (editMode) {
    return (
      <CommentForm
        editHash={ownComment.hash}
        // addOwnComment={(...args) => {
        //   setEditMode(false);
        //   addOwnComment(...args);
        // }}
        addOwnComment={addOwnComment}
        post={post}
        parent={null}
        initialComment={ownComment.comment}
        initialName={ownComment.name}
        initialEmail={ownComment.email}
      />
    );
  }
  const comment: Comment = {
    id: 0,
    oid: `${Math.random()}`,
    comment: ownComment.renderedComment,
    add_date: new Date().toISOString(),
    not_approved: true,
    depth: 0,
    name: ownComment.name,
    replies: [],
  };

  return (
    <DisplayComment
      comment={comment}
      disallowComments={false}
      toggleEditMode={() => {
        setEditMode(!editMode);
      }}
      setParent={() => {}}
      notApproved={true}
      parent={null}
    >
      <p>
        <i>You can edit your own comment until you refresh this page.</i>
      </p>
    </DisplayComment>
  );
}
