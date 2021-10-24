import Script from "next/script";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

declare global {
  interface Window {
    Autocompeter?: Function;
  }
}
export function MainMenu({ pageTitle }: { pageTitle?: string }) {
  const router = useRouter();
  let q = router.query.q || "";
  if (Array.isArray(q)) {
    q = q[0];
  }

  const [whatStartedLoading, setWhatStartedLoading] = useState<
    "mouseover" | "focus" | ""
  >("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [menuState, setMenuState] = useState<"closed" | "opened">("closed");

  const [ready, setReady] = useState(false);

  function getReady() {
    if (!ready) {
      setReady(true);
    }
  }

  return (
    <div className="ui borderless main menu">
      <div className="ui container">
        <div className="header item">
          <Link href="/">
            <a title="Go back the home page">
              <img
                className="logo"
                alt="My face"
                src="/images/favicon-32.png"
                width={32}
                height={32}
              />
            </a>
          </Link>{" "}
          <Link href="/">
            <a title="Go back the home page">Peterbe.com</a>
          </Link>
          {pageTitle && <a className="page-title-repeated">{pageTitle}</a>}
        </div>

        <div className="right menu">
          <Link href="/">
            <a className="ui item">Home</a>
          </Link>
          <Link href="/plog">
            <a className="ui item">Archive</a>
          </Link>
          <Link href="/about">
            <a href="{{ url('about') }}" className="ui item">
              About
            </a>
          </Link>
          <Link href="/contact">
            <a href="{{ url('contact') }}" className="ui item">
              Contact
            </a>
          </Link>
          <form
            action="/search"
            className="navbar-form navbar-right"
            role="search"
          >
            <div className="item ui input">
              {ready && (
                <Script
                  // src="https://cdn.jsdelivr.net/autocompeter/1/autocompeter.min.js"
                  src="/autocompeter/autocompeter.min.js"
                  onLoad={() => {
                    if (window.Autocompeter && inputRef.current) {
                      window.Autocompeter(inputRef.current, {
                        url: "/api/v1/autocompete",
                        domain: document.location.host,
                        ping: false,
                      });
                      if (whatStartedLoading === "focus") {
                        const wrappedInput =
                          document.querySelector<HTMLInputElement>(
                            'input[name="q"]'
                          );
                        if (wrappedInput) {
                          wrappedInput.focus();
                        }
                      }
                    }
                  }}
                />
              )}
              <input
                type="text"
                name="q"
                maxLength={90}
                defaultValue={q}
                placeholder="Search"
                ref={inputRef}
                onFocus={() => {
                  setWhatStartedLoading("focus");
                  getReady();
                }}
                onMouseOver={() => {
                  setWhatStartedLoading("mouseover");
                  getReady();
                }}
              />
            </div>
          </form>
        </div>

        <div
          className={`ui right floated dropdown item ${
            menuState === "opened" ? "active visible" : ""
          }`}
          onClick={(event) => {
            console.log("HI!");

            if (menuState === "closed") {
              setMenuState("opened");
            } else {
              setMenuState("closed");
            }
          }}
        >
          Menu{" "}
          {/* <i className="dropdown">{menuState === "opened" ? "▼" : "▶︎▸"}</i> */}
          <div
            className={`menu  ${menuState === "opened" ? "visible" : "hidden"}`}
            style={
              menuState === "opened"
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <Link href="/">
              <a className="item">Home</a>
            </Link>
            <Link href="/plog">
              <a className="item">Archive</a>
            </Link>
            <Link href="/about">
              <a className="item">About</a>
            </Link>
            <Link href="/contact">
              <a className="item">Contact</a>
            </Link>
            <Link href="/search">
              <a className="item">Search</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
