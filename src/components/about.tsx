import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Content } from "./content";
import styles from "../styles/About.module.css";

export function About() {
  const pageTitle = "About this site";
  const title = `${pageTitle} - Peterbe.com`;
  return (
    <Content pageTitle={pageTitle}>
      <Head>
        <title>{title}</title>
      </Head>

      <p>
        My name is <strong>Peter Bengtsson</strong> and I&apos;m a web
        developer. This is by personal blog.
      </p>
      <p>
        I work at <a href="https://github.com">GitHub</a> as a full-stack
        developer on the{" "}
        <a href="https://github.com/github/docs-engineering">
          Docs engineering team
        </a>
        .
      </p>

      <p>
        Virtually all of my work is Open Source and available on{" "}
        <a href="https://github.com/peterbe">my GitHub account</a> including{" "}
        <a href="https://github.com/peterbe/django-peterbecom">
          this site itself
        </a>
        .
      </p>

      <div className={styles.projects}>
        <h2>Side projects</h2>

        <div className={styles.project} id="docsql">
          <div className={styles.screenshot}>
            <a href="https://github.com/peterbe/docsql" title="docsQL">
              <Image
                src="/about/docsql.png"
                alt="docsQL"
                width={110}
                height={110}
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              docsQL
              <a
                href="#docsql"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="https://github.com/peterbe/docsql">
                https://github.com/peterbe/docsql
              </a>
            </h4>
            <p>
              A web app where you bring your own data. Where the data is a
              repository of Markdown files. Then, you can query all of this
              Markdown data with SQL queries.{" "}
              <a href="https://github.com/peterbe/docsql#screenshots-as-of-mar-2022">
                Screenhots in the README
              </a>
              .
              <br />
              <Link href="/plog/introducing-docsql">
                Blog post about it here
              </Link>
              .
            </p>
          </div>
        </div>

        <div className={styles.project} id="thatsgroce">
          <div className={styles.screenshot}>
            <a href="https://thatsgroce.web.app/about" title="That's Groce!">
              <Image
                src="/about/thatsgroce.png"
                alt="That's Groce!"
                width={120}
                height={120}
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              That&apos;s Groce!
              <a
                href="#thatsgroce"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="https://thatsgroce.web.app/">
                https://thatsgroce.web.app/
              </a>
            </h4>
            <p>
              A grocery shopping and meal planning app. Built in{" "}
              <a href="https://github.com/preactjs/preact-cli">Preact</a> on the{" "}
              <a href="https://firebase.google.com/">Firebase platform</a>.
              <br />
              It&apos;s built specifically as <b>mobile web app</b> with service
              workers and server-side rendered pages for{" "}
              <a href="https://twitter.com/peterbe/status/1300881801611706370">
                optimal web performance
              </a>
              .<br />
              <Link href="/plog/thats-groce-app">Blog post about it here</Link>.
            </p>
          </div>
        </div>

        <div className={styles.project} id="sockshootout">
          <div className={styles.screenshot}>
            <a
              href="https://sockshootout.app"
              title="WebSockets vs. XHR (2019)"
            >
              <Image
                src="/about/sockshootout-scr.png"
                alt="That's Groce!"
                width={120}
                height={93}
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              WebSockets vs. XHR (2019)
              <a
                href="#sockshootout"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="https://sockshootout.app">https://sockshootout.app</a>
            </h4>
            <p>
              WebSockets are promising because the connection is kept open so
              that sending new data has lower overheads than a regular XHR
              request. This app is a demo/playground to really test this in a
              production-grade setting. You can run your own test from{" "}
              <i>your</i> location and it will effectively give you an insight
              into the latency vs. overheads balance.
              <br />
              This is{" "}
              <Link href="/plog/websockets-vs-xhr-2019">
                the full blog post about the experiment
              </Link>
              . The code{" "}
              <a href="https://github.com/peterbe/sockshootout2019">
                github.com/peterbe/sockshootout2019
              </a>{" "}
              is a mix of React, Tornado, and Django.
            </p>
          </div>
        </div>

        <div className={styles.project} id="minimalcssapp">
          <div className={styles.screenshot}>
            <a href="https://minimalcss.app" title="minimalcss web app">
              <Image
                src="/about/minimalcss-scr.png"
                alt="Screenshot"
                width={120}
                height={110}
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              <code>minimalcss</code> web app
              <a
                href="#minimalcssapp"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="https://minimalcss.app">https://minimalcss.app</a>
            </h4>
            <p>
              <a href="https://www.npmjs.com/package/minimalcss">
                <code>minimalcss</code>
              </a>{" "}
              is Node app that can analyze a URL and extract the minimal CSS
              needed for a first render (with JavaScript executed) and this is a
              web app that allows you to test it in a browser by simply typing
              in a URL. The front-end is a single-page React app that sends the
              URL into a{" "}
              <a href="https://www.npmjs.com/package/minimalcss-server">
                <code>minimalcss-server</code>
              </a>{" "}
              and then displays the results with some graphs.
            </p>
          </div>
        </div>

        <div className={styles.project} id="workon">
          <div className={styles.screenshot}>
            <a href="https://workon.app" title="Things To Work On">
              <Image
                src="/about/workonapp-scr.png"
                alt="Screenshot"
                width={120}
                height={110}
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              Things To Work On
              <a
                href="#workon"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="https://workon.app">https://workon.app</a>
            </h4>
            <p>
              Everybody has to make a todo list app. This is my take. I wanted
              to build something exactly like I want/need it.
              <br />
              The data is stored in <code>IndexedDB</code> using{" "}
              <a href="https://kintojs.readthedocs.io/en/latest/">kinto.js</a>{" "}
              and for remote storage I run a{" "}
              <a href="http://kinto.readthedocs.io">Kinto server</a> on my
              personal server. The authentication is done with{" "}
              <a href="https://auth0.com/docs/libraries/auth0js">auth0js</a> and
              the front end is React and MobX.
            </p>
          </div>
        </div>

        <div className={styles.project} id="howsmywifi">
          <div className={styles.screenshot}>
            <a
              href="https://www.npmjs.com/package/howsmywifi#what-does-it-look-like"
              title="How's my WiFi?"
            >
              <Image
                src="/about/howsmywifi-scr.png"
                alt="Screenshot"
                width={110}
                height={94}
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              How&apos;s My WiFi
              <a
                href="#howsmywifi"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="https://www.npmjs.com/package/howsmywifi">
                https://www.npmjs.com/package/howsmywifi
              </a>
            </h4>
            <p>
              A fun little <b>Node</b> script that uses{" "}
              <a href="https://github.com/GoogleChrome/puppeteer">puppeteer</a>{" "}
              to open <a href="https://fast.com">https://fast.com</a> in a
              headless browser, extracts your current broadband speed and then
              draws an ASCII graph of the measurements plus a rolling average.
              <br />
              This is a real project, solving a real problem, but the code is a
              hack built in a day (plus some paperwork to clean it up and put it
              on npmjs.com)
            </p>
          </div>
        </div>

        <div className={styles.project} id="podcasttime">
          <div className={styles.screenshot}>
            <a href="https://podcasttime.io" title="Podcasttime">
              <Image
                src="/about/podcasttime-scr.png"
                alt="Screenshot"
                width={100}
                height={178}
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              Podcast Time
              <a
                href="#podcasttime"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="https://podcasttime.io" rel="nofollow">
                podcasttime.io
              </a>
            </h4>
            <p>
              This started as me trying to figure out how much content
              <i>my</i> preferred podcasts require me to listen to to keep up
              and not fall behind. Later I structured it with a real database
              and a web app to display it. Then in early 2017 I re-wrote the
              front-end entirely in React and added Elasticsearch on the
              back-end for better search.
              <br />
              The{" "}
              <a href="https://github.com/peterbe/podcasttime2">
                front-end code is here
              </a>{" "}
              and the{" "}
              <a href="https://github.com/peterbe/django-peterbecom/tree/master/peterbecom/podcasttime">
                back-end code is here
              </a>
              .{" "}
              <a href="https://www.peterbe.com/plog/podcasttime.io">
                Blogged about how it was built too
              </a>
              .
            </p>
          </div>
        </div>

        <div className={styles.project} id="battleshits">
          <div className={styles.screenshot}>
            <a href="https://btlsh.it/" title="Battleshits">
              <Image
                src="/about/battleshits-scr.png"
                alt="Screenshot"
                width={100}
                height={170}
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              Battleshits
              <a
                href="#battleshits"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="https://btlsh.it/">btlsh.it</a>
            </h4>
            <p>
              A mobile web game app where you play battleships against friends.
              With the silly name, iconography and sounds. The first prototype
              of this is simply a website but styled specifically for mobile use
              using <a href="https://bulma.io/">Bulma</a>.<br />
              You can either play against the computer, against a friend
              asynchronously or against a friend in real-time. <br />
              The front-end is written in <b>ReactJS</b> and the real-time
              traffic is handled partly in <b>Django</b> with{" "}
              <a href="https://fanout.io">Fanout.io</a> to handle the{" "}
              <b>WebSockets</b>.<br />
              Next step is to try to submit this to the Apple App Store and see
              if they appreciate the name of the app.
            </p>
          </div>
        </div>

        <div className={styles.project} id="headsupper">
          <div className={styles.screenshot}>
            <a href="https://headsupper.io/" title="Headsupper">
              <Image
                src="/about/headsupper-scr.png"
                alt="Screenshot"
                width={110}
                height={87}
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              Heads&apos;upper
              <a
                href="#headsupper"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="https://headsupper.io/">headsupper.io</a>
            </h4>
            <p>
              A GitHub Webhook receiver app that sends an email to certain
              people when a git commit comes in that contains the trigger word{" "}
              <code>headsup:</code>. More{" "}
              <Link href="/plog/headsupper.io">extended blog post</Link> here
              and{" "}
              <a href="https://github.com/peterbe/headsupper">code on GitHub</a>
              .<br />
              The back end is written in <b>Django</b>, the front-end written in{" "}
              <b>React</b> and it uses <b>GitHub as an OAuth</b> provider.
            </p>
          </div>
        </div>

        <div className={styles.project} id="whatsdeployed">
          <div className={styles.screenshot}>
            <a href="https://whatsdeployed.io/">
              <Image
                src="/about/whatsdeployed-scr.png"
                alt="Screenshot"
                width={110}
                height={82}
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              Whatsdeployed
              <a
                href="#whatsdeployed"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="https://whatsdeployed.io/">whatsdeployed.io</a>
            </h4>
            <p>
              You enter the GitHub URL to a project and for each deployment
              target (e.g. &quot;dev&quot;, &quot;stage&quot;,
              &quot;production&quot;) you enter a URL that points to a file that
              contains the git sha that is deployed there. Then you get an
              overview of what git commits been and not been deployed across
              those deployments.{" "}
              <a href="https://whatsdeployed.io/?owner=mozilla&repo=socorro&name[]=Stage&amp;url[]=https://crash-stats.allizom.org/status/revision/&amp;name[]=Prod&amp;url[]=https://crash-stats.mozilla.com/status/revision/">
                For
              </a>{" "}
              <a href="https://whatsdeployed.io/?owner=mozilla&repo=airmozilla&name[]=Dev&amp;url[]=https%3A%2F%2Fair-dev.allizom.org%2Fmedia%2Frevision&amp;name[]=Stage&amp;url[]=https%3A%2F%2Fair.allizom.org%2Fmedia%2Frevision&amp;name[]=Prod&amp;url[]=https%3A%2F%2Fair.mozilla.org%2Fmedia%2Frevision">
                example
              </a>
              . Written in <b>Flask</b>.
            </p>
          </div>
        </div>

        <div className={styles.project} id="premailer.io">
          <div className={styles.screenshot}>
            <a href="https://premailer.io/">
              <Image
                src="/about/premailer-scr.png"
                alt="Screenshot"
                width={110}
                height={73}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              Premailer.io
              <a
                href="#premailer.io"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="https://premailer.io/">premailer.io</a>
            </h4>
            <p>
              A webapp that makes it possible to test the popular{" "}
              <a href="https://github.com/peterbe/premailer">
                premailer python library
              </a>
              which you use to prepare HTML for being sent as HTML emails. This
              site uses <a href="http://falconframework.org/">Falcon</a> for the
              server and AngularJS for the front-end. The client-side build
              system uses <a href="http://linemanjs.com/">Lineman.js</a>.
            </p>
          </div>
        </div>

        <div className={styles.project} id="autocompeter">
          <div className={styles.screenshot}>
            <a href="https://autocompeter.com/">
              <Image
                src="/about/autocompeter-scr.png"
                alt="Screenshot"
                width={110}
                height={88}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              Autocompeter
              <a
                href="#autocompeter"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="https://autocompeter.com/">autocompeter.com</a>
            </h4>
            <p>
              An autocomplete widget where you put some CSS and JS on your site
              and let autcompeter.com host the data. The server is written in{" "}
              <a href="http://golang.org/">
                <b>Go</b>
              </a>{" "}
              and the Javascript is pure without any dependency on a framework.{" "}
              <a href="https://github.com/peterbe/autocompeter">
                Code on GitHub
              </a>
              .
            </p>
          </div>
        </div>

        <div className={styles.project} id="htmltree">
          <div className={styles.screenshot}>
            <a href="https://htmltree.herokuapp.com/">
              <Image
                src="/about/htmltree-scr.png"
                alt="Screenshot"
                width={110}
                height={87}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              HTML Tree
              <a
                href="#htmltree"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="https://htmltree.herokuapp.com/">
                htmltree.herokuapp.com
              </a>
            </h4>
            <p>
              It started when I was optimizing a website whose HTML files were
              massive. Clearly the HTML contained too many DOM nodes. But where
              are these big clusters of nodes?! HTML Tree takes a URL, converts
              it to a tree in JSON which when combined with a{" "}
              <a href="http://d3js.org/">
                <b>D3</b>
              </a>{" "}
              collapsible tree becomes easier to navigate.{" "}
              <a href="https://github.com/peterbe/htmltree">Code on GitHub</a>.
            </p>
          </div>
        </div>

        <div className={styles.project} id="nodomains">
          <div className={styles.screenshot}>
            <a href="https://www.peterbe.com/nodomains/">
              <Image
                src="/about/nodomains-scr.png"
                alt="Screenshot"
                width={110}
                height={103}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              Number of Domains
              <a
                href="#nodomains"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="https://www.peterbe.com/nodomains/">
                www.peterbe.com/nodomains
              </a>
            </h4>
            <p>
              Using your network panel in your browser Web Console you can track
              how incredibly many requests many sites depend on. But, to find
              out how many different domains that spans you have to manually
              count each unique domain. Or use this tool. <br />
              What this proves is that DNS is still incredibly important for web
              performance.{" "}
              <Link href="/plog/number-of-domains">
                Blogged about it here
              </Link>{" "}
              and the relevant{" "}
              <a href="https://github.com/peterbe/django-peterbecom/blob/master/peterbecom/nodomains/count.js">
                <b>Node</b> code is here
              </a>
              .
            </p>
          </div>
        </div>

        <div className={styles.project} id="github-pr-triage">
          <div className={styles.screenshot}>
            <a href="http://prs.mozilla.io">
              <Image
                src="/about/github-pr-triage-scr.png"
                alt="Screenshot"
                width={120}
                height={84}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              GitHub Pull Request Triage
              <a
                href="#github-pr-triage"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="http://prs.mozilla.io/" rel="nofollow">
                prs.mozilla.io
              </a>
            </h4>
            <p>
              This is a mashup using the{" "}
              <a href="https://developer.github.com/v3/">GitHub API</a> to make
              a dashboard over all open Pull Requests on a GitHub project.
              It&apos;s a Flask backend for doing proxy caching of requests and
              an AngularJS front end. I{" "}
              <Link href="/plog/github-pr-triage">blogged about it</Link> in
              more detail and the code is{" "}
              <a href="https://github.com/peterbe/github-pr-triage">
                available on GitHub
              </a>
              .
            </p>
          </div>
        </div>

        <div className={styles.project} id="buggy">
          <div className={styles.screenshot}>
            <a href="http://buggy.peterbe.com/">
              <Image
                src="/about/buggy-scr.png"
                alt="Buggy screenshot"
                width={110}
                height={75}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              Buggy
              <a
                href="#buggy"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="http://buggy.peterbe.com/">buggy.peterbe.com</a>
            </h4>
            <p>
              Buggy is a singe-page webapp that relies entirely on the{" "}
              <a href="https://bugzilla.mozilla.org">Bugzilla</a> native REST
              API. The app is entirely client side and written in AngularJS and
              is entirely served from a CDN. I have{" "}
              <Link href="/plog/buggy">blogged about it</Link> in more detail on
              my blog and the code is{" "}
              <a href="https://github.com/peterbe/buggy">available on GitHub</a>
              .
            </p>
          </div>
        </div>

        <div className={styles.project} id="wishlistgranted">
          <div className={styles.screenshot}>
            <a href="http://wishlistgranted.com/">
              <Image
                src="/about/wishlistgranted-scr.png"
                alt="Wish List Granted screenshot"
                width={110}
                height={88}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              Wish List Granted
              <a
                href="#wishlistgranted"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="http://wishlistgranted.com/">wishlistgranted.com</a>
            </h4>
            <p>
              Makes it possible for you to &quot;crowdfund&quot; your presents.
              Integrates with Amazon.com&trade;&apos;s{" "}
              <a
                href="https://www.amazon.com/gp/registry/wishlist/"
                rel="nofollow"
              >
                Wish List
              </a>{" "}
              functionality mashed with{" "}
              <a href="https://www.balancedpayments.com/" rel="nofollow">
                Balanced Payments
              </a>
              . My first side-project with a full and real payment solution.
              Code written in Django with PostgreSQL.
            </p>
          </div>
        </div>

        <div className={styles.project} id="hugepic">
          <div className={styles.screenshot}>
            <a href="http://hugepic.io/" rel="nofollow">
              <Image
                src="/about/hugepic-scr.png"
                alt="HUGEpic screenshot"
                width={100}
                height={91}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              HUGEpic
              <a
                href="#hugepic"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="http://hugepic.io/" rel="nofollow">
                hugepic.io
              </a>
            </h4>
            <p>
              This app combined <a href="https://leafletjs.com/">Leaflet</a>{" "}
              with <a href="https://www.filepicker.io/">Filepicker.io</a> with{" "}
              <a href="http://aws.amazon.com/s3/">Amazon S3</a> to let you
              upload massive pictures and draw annotations on them to be able to
              zoom in, pan and share specific regions without having to download
              the whole image. And it works great on mobile too!
            </p>
            <p>
              All the code is open source and{" "}
              <a href="https://github.com/peterbe/tiler">available here</a> and
              it&apos;s a Tornado app that relies very heavily on{" "}
              <a href="http://python-rq.org/">RQ</a>.
            </p>
          </div>
        </div>

        <div className={styles.project} id="aroundtheworld">
          <div className={styles.screenshot}>
            <a href="http://aroundtheworldgame.com/" rel="nofollow">
              <Image
                src="/about/aroundtheworld-scr.png"
                alt="Around The World screenshot"
                width={100}
                height={81}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              Around The World
              <a
                href="#aroundtheworld"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="http://aroundtheworldgame.com/">
                aroundtheworldgame.com
              </a>
            </h4>
            <p>
              If you haven&apos;t already done so, check out my new game:{" "}
              <a href="http://aroundtheworldgame.com/" rel="nofollow">
                Around The World
              </a>{" "}
              which is my spare time project. You can read more{" "}
              <a href="http://aroundtheworldgame.com/about">about it here</a>{" "}
              but the best thing is to just start playing and see if you like
              it.
            </p>
          </div>
        </div>

        <div className={styles.project} id="uslicensespotter">
          <div className={styles.screenshot}>
            <a href="http://uslicensespotter.com/">
              <Image
                src="/about/licensespotter-scr.png"
                alt="US License Spotter screenshot"
                width={90}
                height={135}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              US License Plate spotter
              <a
                href="#uslicensespotter"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="http://uslicensespotter.com/">uslicensespotter.com</a>
            </h4>
            <p>
              It&apos;s for spotting out-of-state license plates in the US and
              tick them off on your smartphone.
              <br />
              This is a work in progress project. I have blogged out it{" "}
              <Link href="/plog/us-license-plate-spotter-part-1">
                first here
              </Link>{" "}
              and{" "}
              <Link href="/plog/us-license-plate-spotter-part-2">
                then here
              </Link>{" "}
              about the update. It&apos;s an ongoing project to try to build
              real mobile native apps from HTML and Javascript. <br />
              This is also my first ever project that actually uses
              Facebook&apos;s API to facilitate wall posts from the app.
              <br />
              The{" "}
              <a href="https://github.com/peterbe/uslicenseplates/">
                source code is here
              </a>{" "}
              and it&apos;s a bit of a mess because it&apos;s after all just an
              ongoing experiment.
            </p>
          </div>
        </div>

        <div className={styles.project} id="toocoolforme">
          <div className={styles.screenshot}>
            <a href="http://toocoolfor.me">
              <Image
                src="/about/toocoolforme-screenshot.png"
                alt="TooCoolForMe screenshot"
                width={127}
                height={101}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              Too Cool For Me?
              <a
                href="#toocoolforme"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="http://toocoolfor.me">toocoolfor.me</a>
            </h4>
            <p>
              It started as a Bookmarklet so that when you&apos;re visiting
              twitter.com it appends, for each user you follow, whether they
              also follow you. Later, the most useful feature was the{" "}
              <Link href="/plog/too-cool-for-me-everyone">/everybody</Link> page
              where everyone you follow is split half between those who follow
              you and those that are too cool for you. <br />
              <Link href="/plog/too-cool-for-me">
                blogged about it here
              </Link>{" "}
              and{" "}
              <a href="https://github.com/peterbe/toocool">
                source code is here
              </a>
              .
            </p>
          </div>
        </div>

        <div className={styles.project} id="peterbecom">
          <div className={styles.screenshot}>
            <Link href="/" passHref>
              <Image
                src="/about/peterbecom-screenshot.png"
                alt="Peterbe.com screenshot"
                width={100}
                height={93}
                loading="lazy"
              />
            </Link>
          </div>
          <div className="rest">
            <h3>
              Peterbe.com
              <a
                href="#peterbecom"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <Link href="/" passHref>
                peterbe.com
              </Link>
            </h4>
            <p>
              In 2012 I re-wrote this site from scratch. Being very fast was
              important to me and I&apos;ve blogged about how I made the{" "}
              <Link href="/plog/secs-sell-frickin-fast-server-side">
                server-side
              </Link>{" "}
              and
              <Link href="/plog/secs-sell-frickin-fast-client-side">
                client-side
              </Link>{" "}
              fast.
              <br />
              The code to this site is open source and the{" "}
              <a href="https://github.com/peterbe/django-peterbecom">
                source code is here
              </a>
              .
            </p>
          </div>
        </div>

        <div className={styles.project} id="donecal">
          <div className={styles.screenshot}>
            <a href="http://donecal.com/" rel="nofollow">
              <Image
                src="/about/donecal-screenshot.png"
                alt="DoneCal screenshot"
                width={127}
                height={63}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              DoneCal
              <a
                href="#donecal"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="http://donecal.com/">donecal.com</a>
            </h4>
            <p>
              This is a full HTML5 calendar. It&apos;s fast and simple and has a
              practical <a href="http://donecal.com/help/API">API</a>.<br />
              I&apos;ve{" "}
              <Link href="/plog/donecal.com">
                blogged about it here
              </Link> and{" "}
              <a href="https://github.com/peterbe/worklog">
                source code is here
              </a>
              .
            </p>
          </div>
        </div>

        <div className={styles.project} id="tornadogists">
          <div className={styles.screenshot}>
            <a href="http://tornadogists.org/" rel="nofollow">
              <Image
                src="/about/tornadogists-scr.png"
                alt="Tornado Gists"
                width={100}
                height={93}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              Tornado Gists
              <a
                href="#tornadogists"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="http://tornadogists.org/" rel="nofollow">
                tornadogists.org
              </a>
            </h4>
            <p>
              This is a supporting site for the{" "}
              <a href="https://www.tornadoweb.org/">Tornado Web Server</a>{" "}
              project. It uses the GitHub API for authentication and for pulling
              down{" "}
              <a href="https://gist.github.com/" title="A GitHub service">
                gists
              </a>{" "}
              automatically.
              <br />
              The hosting of this project is actually done by a fellow Tornado
              contributor called <a href="http://feilong.me/">Felinx Lee</a>.
              <br />
              <Link href="/plog/tornadogists.org">
                Blogged about it here
              </Link>{" "}
              and{" "}
              <a href="https://github.com/peterbe/tornado_gists">
                source code is here
              </a>
              .
            </p>
          </div>
        </div>

        <div className={styles.project} id="kwissle">
          <div className={styles.screenshot}>
            <a href="http://kwissle.com/" rel="nofollow">
              <Image
                src="/about/kwissle-screenshot.png"
                alt="Kwissle"
                width={110}
                height={81}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              Kwissle
              <a
                href="#kwissle"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="http://kwissle.com/" rel="nofollow">
                kwissle.com
              </a>
            </h4>
            <p>
              My first real-time web game. The game is that you get paired up
              with another random player and you have to answer quiz questions
              as fast and accurate as possible. My first web app that let&apos;s
              Facebook, Twitter, Google, Persona all take care of the
              authentication.
              <br />I first{" "}
              <Link href="/plog/launching-kwissle">
                blogged about it here
              </Link>{" "}
              when it was launched and here are{" "}
              <Link href="/plog/slides-about-kwissle-lpdojo/slides.html">
                the slides
              </Link>{" "}
              which I later{" "}
              <Link href="/plog/slides-about-kwissle-lpdojo">
                presented at PyCon UK 2011
              </Link>
              .
            </p>
          </div>
        </div>

        <div className={styles.project} id="crosstips">
          <div className={styles.screenshot}>
            <a href="http://crosstips.org/" rel="nofollow">
              <Image
                src="/about/crosstips-screenshot.png"
                alt="Crosstips"
                width={105}
                height={85}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              Crosstips
              <a
                href="#crosstips"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="http://crosstips.org/" rel="nofollow">
                crosstips.org
              </a>
            </h4>
            <p>
              Crosstips first started as an experiment to do localization in
              Django. This was also my first ever non-English project.
              <br />
              Not long after, I prepared the English (American and British)
              version and a friend helped me translate the French version too.
              <br />
              <a href="https://github.com/peterbe/kl">
                Source code available here
              </a>{" "}
              and I&apos;ve{" "}
              <Link href="/search?q=keywords%3Acrosstips">
                blogged about various aspects of it here
              </Link>
              .
            </p>
          </div>
        </div>

        <div className={styles.project} id="tflcameras">
          <div className={styles.screenshot}>
            <a href="http://tflcameras.peterbe.com/" rel="nofollow">
              <Image
                src="/about/tflcameras-screenshot.png"
                alt="TFL Cameras"
                width={105}
                height={79}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              TFL Cameras
              <a
                href="#tflcameras"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="http://tflcameras.peterbe.com/" rel="nofollow">
                tflcameras.peterbe.com
              </a>
            </h4>
            <p>
              Using the recently published{" "}
              <a href="http://data.london.gov.uk/datastore/package/tfl-live-traffic-cameras">
                API from Transport from London
              </a>{" "}
              I put together a Google Maps mashup that plots all the central
              London traffic cameras so you can easily see if your particular
              road is congested. This was my first project using client-side
              Geolocation.
              <br />
              <Link href="/plog/tflcameras">Blogged about it here</Link> and the{" "}
              <a href="https://github.com/peterbe/tflcameras">
                source code is here
              </a>
              .
            </p>
          </div>
        </div>

        <div className={styles.project} id="mfwc">
          <div className={styles.screenshot}>
            <a href="http://m.fwckungfu.com/" rel="nofollow">
              <Image
                src="/about/mfwc-screenshot.png"
                alt="FWC Kungfu Mobile"
                width={85}
                height={128}
                loading="lazy"
              />
            </a>
          </div>
          <div className="rest">
            <h3>
              FWC Kungfu Mobile
              <a
                href="#mfwc"
                title="Link to this section"
                className={styles.perm}
              >
                #
              </a>
            </h3>
            <h4>
              <a href="http://m.fwckungfu.com/" rel="nofollow">
                m.fwckungfu.com
              </a>
            </h4>
            <p>
              This was my first pure mobile web site. It&apos;s for my{" "}
              <a href="http://www.fwckungfu.com/">
                Fujian White Crane Kung Fu Club
              </a>{" "}
              that I trained with when I lived in London. This site uses a
              remote database connection and is heavily cached. It&apos;s built
              taylor made for mobile as it goes straight to the basic details
              you need.
              <br />
              I originally built it because I kept forgetting when various
              classes started and looking it up on a slow 3G connection was a
              pain.
              <br />
              The{" "}
              <a href="https://github.com/peterbe/fwc_mobile">
                code is here
              </a>{" "}
              and I blogged about when this was my first site to get{" "}
              <Link href="/plog/first-yslow-grade-a">100 points on YSlow!</Link>
              .
            </p>
          </div>
        </div>

        <p style={{ marginTop: 30 }}>
          <strong>Note:</strong> This list does not include any of the fun
          projects I&apos;m working on at work.{" "}
          <strong>These are all side-projects</strong>.<br />
          Also, many of these projects I&apos;m{" "}
          <strong>not actively working on</strong> but they&apos;re all projects
          that are <strong>alive and hosted somewhere</strong>.
        </p>
      </div>
    </Content>
  );
}
