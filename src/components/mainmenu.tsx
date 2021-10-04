import Link from "next/link";
import { useRouter } from "next/router";

export function MainMenu({ pageTitle }: { pageTitle?: string }) {
  const router = useRouter();
  let q = router.query.q || "";
  if (Array.isArray(q)) {
    q = q[0];
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
              <input
                type="text"
                name="q"
                maxLength={90}
                defaultValue={q}
                placeholder="Search"
              />
            </div>
          </form>
        </div>

        <div className="ui right floated dropdown item">
          Menu <i className="dropdown">▼</i>
          <div className="menu">
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
