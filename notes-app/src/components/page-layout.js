import React from "react";
import { NavBar } from "./navbar/desktop/nav-bar";
import { MobileNavBar } from "./navbar/mobile/mobile-nav-bar";
// import { PageFooter } from "./page-footer";

export const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <NavBar />
      <MobileNavBar />
      <div className="page-layout__content">{children}</div>
      {/* <PageFooter /> */}
    </div>
  );
};
