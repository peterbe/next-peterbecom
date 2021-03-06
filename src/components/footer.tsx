import Link from "next/link";

const THIS_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <div className="ui inverted vertical footer segment">
      <div className="ui center aligned container">
        <p>
          &copy; peterbe.com 2003 - {THIS_YEAR}
          {/* &sdot; Hosted on{" "}
          <a
            href="https://www.digitalocean.com/?refcode=9c9126b69f33"
            title="Yes, following this link and signing up will give me a small referal bonus :)"
          >
            Digital Ocean
          </a> */}
        </p>

        <div className="ui horizontal inverted small divided link list">
          <Link href="/">
            <a className="item">Home</a>
          </Link>{" "}
          <Link href="/plog/" prefetch={false}>
            <a className="item">Archive</a>
          </Link>{" "}
          <Link href="/about" prefetch={false}>
            <a className="item">About</a>
          </Link>{" "}
          <Link href="/contact" prefetch={false}>
            <a className="item">Contact</a>
          </Link>{" "}
          <Link href="/search" prefetch={false}>
            <a className="item">Search</a>
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
