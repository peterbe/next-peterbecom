import type { ReactNode } from "react";
import { formatDateBasic } from "../utils";
import type { Comment } from "../../types";

export function DisplayComment({
  comment,
  children,
  disallowComments,
  notApproved,
  setParent,
}: {
  comment: Comment;
  children: ReactNode;
  disallowComments: boolean;
  notApproved: boolean;
  setParent: (oid: string | null) => void;
}) {
  let className = "comment";
  if (comment.depth) {
    className += ` nested d-${comment.depth}`;
  }
  return (
    <div id={comment.oid} className={className}>
      <b>{comment.name ? comment.name : <i>Anonymous</i>}</b>{" "}
      <a className="metadata" href={`#${comment.oid}`} rel="nofollow">
        {formatDateBasic(comment.add_date)}
      </a>{" "}
      {!disallowComments && (
        <a
          className="metadata reply"
          href={`#${comment.oid}`}
          data-oid={comment.oid}
          rel="nofollow"
          onClick={(event) => {
            event.preventDefault();
            setParent(comment.oid);
          }}
        >
          Reply
        </a>
      )}{" "}
      {notApproved && (
        <span className="not-approved">
          <b>Note:</b> All comments have to be approved first
        </span>
      )}
      <p dangerouslySetInnerHTML={{ __html: comment.comment }} />
      {children}
    </div>
  );
}
