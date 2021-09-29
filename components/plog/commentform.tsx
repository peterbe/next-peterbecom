import { useState, useEffect } from "react";
// import useSWR, { mutate } from 'swr';
import type { Post } from "../../types";
import { DisplayComment } from "./comment";

// const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

interface PrepareData {
  csrfmiddlewaretoken: string;
}
interface PreviewData {
  comment: string;
}
interface SubmitData {
  hash: string;
}

export function CommentForm({
  parent,
  post,
}: {
  parent: string | null;
  post: Post;
}) {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [csrfmiddlewaretoken, setCsrfmiddlewaretoken] = useState("");
  const [csrfmiddlewaretokenTimestamp, setCsrfmiddlewaretokenTimestamp] =
    useState<Date | null>(null);

  const [previewing, setPreviewing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [renderedComment, setRenderedComment] = useState("");
  const [previewError, setPreviewError] = useState<Error | null>(null);
  const [prepareError, setPrepareError] = useState<Error | null>(null);
  const [submitError, setSubmitError] = useState<Error | null>(null);
  const [submittedHash, setSubmittedHash] = useState("");

  async function prepare() {
    if (csrfmiddlewaretoken && csrfmiddlewaretokenTimestamp) {
      const ageSeconds =
        (new Date().getTime() - csrfmiddlewaretokenTimestamp.getTime()) / 1000;
      if (ageSeconds < 60) {
        return;
      }
    }
    const response = await fetch("/api/v1/plog/comments/prepare");
    if (!response.ok) {
      setPrepareError(new Error(`${response.status}`));
    } else {
      const data: PrepareData = await response.json();
      setCsrfmiddlewaretoken(data.csrfmiddlewaretoken);
      setCsrfmiddlewaretokenTimestamp(new Date());
    }
  }

  async function preview() {
    const body = new FormData();
    body.append("comment", comment);
    body.append("csrfmiddlewaretoken", csrfmiddlewaretoken);
    const response = await fetch("/api/v1/plog/comments/preview", {
      method: "POST",
      body,
      // headers: {
      //   "X-CSRFToken": csrfmiddlewaretoken,
      // },
    });
    if (!response.ok) {
      setPreviewError(new Error(`${response.status}`));
    } else {
      const data: PreviewData = await response.json();
      setRenderedComment(data.comment);
    }
  }

  async function submit() {
    const body = new FormData();
    body.append("oid", post.oid);
    body.append("comment", comment);
    if (parent) {
      body.append("parent", parent);
    }
    const response = await fetch("/api/v1/plog/comments/submit", {
      method: "POST",
      body,
      headers: {
        "X-CSRFToken": csrfmiddlewaretoken,
      },
    });
    if (!response.ok) {
      setSubmitError(new Error(`${response.status}`));
    } else {
      const data: SubmitData = await response.json();
      setSubmittedHash(data.hash);
    }
  }

  return (
    <>
      {renderedComment && (
        <DisplayComment
          comment={{
            id: 0,
            oid: "xxx",
            comment: renderedComment,
            add_date: new Date().toString(),
            depth: 0,
            name,
          }}
          setParent={() => {}}
          notApproved={false}
          disallowComments={true}
          children={null}
        ></DisplayComment>
      )}
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (!comment.trim()) return;
          setSubmitting(true);
          try {
            await prepare();
            await submit();
            console.warn("Work harder!");
          } finally {
            setSubmitting(false);
          }
        }}
        className="ui form"
      >
        <code>{csrfmiddlewaretoken}</code>
        <div className="field">
          <label>What do you think?</label>
          <textarea
            name="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            onFocus={() => {
              prepare();
            }}
            rows={5}
            aria-label="Your comment"
          ></textarea>
        </div>

        <div className="field">
          <div className="two fields">
            <div className="field">
              <input
                name="name"
                aria-label="Your full name"
                placeholder="Your full name"
                title="Your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="field">
              <input
                type="email"
                name="email"
                aria-label="Your email"
                placeholder="Your email (never shown, never shared)"
                title="Your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <button
            type="button"
            className="ui button primary preview"
            disabled={previewing || !comment.trim()}
            onClick={async (event) => {
              event.preventDefault();
              if (!comment.trim()) return;
              setPreviewing(true);
              try {
                await preview();
              } finally {
                setPreviewing(false);
              }
            }}
          >
            Preview first
          </button>
          <button
            type="submit"
            className="ui button post"
            disabled={submitting || !comment.trim()}
          >
            Post comment
          </button>

          <p className="note-about-email">
            Your email will never ever be published.
          </p>
        </div>
      </form>
    </>
  );
}
