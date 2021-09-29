const THIS_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <div className="ui inverted vertical footer segment">
      <div className="ui center aligned container">
        <p>
          &copy; peterbe.com 2003 - {THIS_YEAR} &sdot; Hosted on{" "}
          <a
            href="https://www.digitalocean.com/?refcode=9c9126b69f33"
            title="Yes, following this link and signing up will give me a small referal bonus :)"
          >
            Digital Ocean
          </a>
        </p>

        <div className="ui horizontal inverted small divided link list">
          <a className="item" href="/">
            Home
          </a>{" "}
          <a className="item" href="/plog/">
            Archive
          </a>{" "}
          <a className="item" href="/about">
            About
          </a>{" "}
          <a className="item" href="/contact">
            Contact
          </a>{" "}
          <a className="item" href="/search">
            Search
          </a>
        </div>
        <p>
          Check out my side project:{" "}
          <a href="https://thatsgroce.web.app" title="That's Groce!">
            That's Groce!
          </a>
        </p>
      </div>
    </div>
  );
}
