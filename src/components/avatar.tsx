import { useState } from "react";
import Head from "next/head";

import { Content } from "./content";

export function Avatar() {
  const pageTitle = "Avatar image test page";
  const title = `${pageTitle} - Peterbe.com`;
  const [imageSrc, setImageSrc] = useState("/avatar.png");
  return (
    <Content pageTitle={pageTitle}>
      <Head>
        <title>{title}</title>
      </Head>

      <p id="figure">
        <img src={imageSrc} />
      </p>

      <button
        className="ui secondary button reload"
        onClick={() => {
          setImageSrc(`/avatar.png?seed=${Math.random()}`);
        }}
      >
        Reload image
      </button>
    </Content>
  );
}
