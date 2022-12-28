import Link from "next/link";
import cx from "classnames";
import styles from "../styles/Footer.module.scss";

const THIS_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <div className="ui inverted vertical footer segment">
      <div className="ui center aligned container">
        <p>&copy; peterbe.com 2003 - {THIS_YEAR}</p>

        <div className={cx(styles.links, "ui horizontal small divided link")}>
          <Link href="/">Home</Link>{" "}
          <Link href="/plog/" prefetch={false}>
            Archive
          </Link>{" "}
          <Link href="/about" prefetch={false}>
            About
          </Link>{" "}
          <Link href="/contact" prefetch={false}>
            Contact
          </Link>{" "}
          <Link href="/search" prefetch={false}>
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
