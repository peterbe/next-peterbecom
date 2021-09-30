import { useEffect, useState } from "react";
import type { Post } from "../../types";
import { DisplayComment } from "./comment";

interface PrepareData {
  csrfmiddlewaretoken: string;
}
interface PreviewData {
  comment: string;
}
interface SubmitData {
  hash: string;
  hash_expiration_seconds: number;
  comment: string;
}

const LOCALESTORAGE_NAME_KEY = "commenting";

type RememberedName = {
  name: string;
  email: string;
};
function getRememberedName(): RememberedName {
  const res: RememberedName = {
    name: "",
    email: "",
  };
  try {
    const serialized = localStorage.getItem(LOCALESTORAGE_NAME_KEY);
    if (serialized) {
      const remembered = JSON.parse(serialized);
      if (remembered.name) {
        res.name = remembered.name;
      }
      if (remembered.email) {
        res.email = remembered.email;
      }
    }
  } catch (error) {
    console.warn("Unable to read from localStorage");
  }
  return res;
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
  useEffect(() => {
    const { name, email } = getRememberedName();
    if (name) {
      setName(name);
    }
    if (email) {
      setName(email);
    }
  }, []);

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
    const response = await fetch("/api/v1/plog/comments/preview", {
      method: "POST",
      body,
      headers: {
        "X-CSRFToken": csrfmiddlewaretoken,
      },
    });
    if (!response.ok) {
      setPreviewError(new Error(`${response.status}`));
    } else {
      const data: PreviewData = await response.json();
      setRenderedComment(data.comment);
      setPreviewError(null);
    }
  }

  async function submit() {
    const body = new FormData();
    body.append("oid", post.oid);
    body.append("comment", comment.trim());
    body.append("name", name.trim());
    body.append("email", email.trim());
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
      throw new Error(`${response.status}`);
    } else {
      const data: SubmitData = await response.json();
      setSubmittedHash(data.hash);
      setRenderedComment(data.comment);
      setSubmitError(null);
    }
  }

  function rememberName() {
    if (name.trim() || email.trim()) {
      try {
        localStorage.setItem(
          LOCALESTORAGE_NAME_KEY,
          JSON.stringify({ name, email })
        );
      } catch (error) {
        console.warn("Unable to save in localStorage");
      }
    } else {
      try {
        localStorage.removeItem(LOCALESTORAGE_NAME_KEY);
      } catch (error) {
        console.warn("Unable to save in localStorage");
      }
    }
  }

  return (
    <>
      {renderedComment && (
        <DisplayComment
          comment={{
            id: 0,
            oid: "mock",
            comment: renderedComment,
            add_date: new Date().toString(),
            depth: 0,
            name,
          }}
          setParent={() => {}}
          notApproved={false}
          disallowComments={true}
        >
          hi there
        </DisplayComment>
      )}

      {submitError && (
        <div className="ui negative message">
          <i className="close icon" onClick={() => setSubmitError(null)}></i>
          <div className="header">
            Sorry. The comment couldn&apos;t be posted.
          </div>
          <p>An error occurred trying to send this to the server.</p>
          <p>
            <code>{submitError.toString()}</code>
          </p>
        </div>
      )}

      {previewError && (
        <div className="ui negative message">
          <i className="close icon" onClick={() => setPreviewError(null)}></i>
          <div className="header">
            Sorry. The comment couldn&apos;t be previewed.
          </div>
          <p>An error occurred trying to send this to the server.</p>
          <p>
            <code>{previewError.toString()}</code>
          </p>
        </div>
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
            setComment("");
          } catch (error) {
            if (error instanceof Error) {
              setSubmitError(error);
            } else {
              throw error;
            }
          } finally {
            setSubmitting(false);
          }
        }}
        className="ui form"
      >
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
                onBlur={rememberName}
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
                onBlur={rememberName}
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
