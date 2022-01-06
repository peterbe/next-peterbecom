import type { ReactNode } from "react";

import { Footer } from "./footer";
import { MainMenu } from "./mainmenu";

interface Props {
  children: ReactNode;
  pageTitle: string | ReactNode;
  extraHead?: ReactNode;
  footer?: ReactNode;
  hideMainMenu?: boolean;
}
export function Content({
  pageTitle,
  children,
  footer,
  extraHead,
  hideMainMenu,
}: Props) {
  return (
    <>
      <div className="ui main container">
        <h1 className="ui header">{pageTitle}</h1>
        {extraHead && extraHead}
      </div>
      {!hideMainMenu && <MainMenu />}
      <div className="ui container content">{children}</div>

      {/* By checking for undefined, it becomes possible to pass `footer={null}`
      as a prop to disable the footer and the default fallback.
      Useful for the lyrics post page. */}
      {footer !== undefined ? footer : <Footer />}
    </>
  );
}
