import Link from "next/link";
import type { ReactNode } from "react";

import { Footer } from "./footer";

interface Props {
  children: ReactNode;
  pageTitle: string;
  extraHead?: ReactNode;
  footer?: ReactNode;
}
export function Content({ pageTitle, children, footer, extraHead }: Props) {
  return (
    <>
      <div className="ui main container">
        <h1 className="ui header">{pageTitle}</h1>
        {extraHead ? extraHead : <p>A blog and website by Peter Bengtsson</p>}
      </div>
      <div className="ui container content">
        {children}
        {footer ? footer : <Footer />}
      </div>
    </>
  );
}
