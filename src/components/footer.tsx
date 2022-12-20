import Link from "next/link";

const THIS_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <div className="ui inverted vertical footer segment">
      <div className="ui center aligned container">
        <p>&copy; peterbe.com 2003 - {THIS_YEAR}</p>

        <div className="ui horizontal inverted small divided link list">
          <Link href="/" className="item">
            Home
          </Link>{" "}
          <Link href="/plog/" prefetch={false} className="item">
            Archive
          </Link>{" "}
          <Link href="/about" prefetch={false} className="item">
            About
          </Link>{" "}
          <Link href="/contact" prefetch={false} className="item">
            Contact
          </Link>{" "}
          <Link href="/search" prefetch={false} className="item">
            Search
          </Link>
        </div>
        <p>
          Check out my side project:{" "}
          <a href="https://thatsgroce.web.app" title="That's Groce!">
            That&apos;s Groce!
          </a>
        </p>
      </div>
    </div>
  );
}
