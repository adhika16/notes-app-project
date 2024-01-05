import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { PageLayout } from "../components/page-layout";

const PublicPage = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <PageLayout>
      <div className="content-layout">
        {!isAuthenticated && <div className="content__body">Hi, welcome to Notes app! Please login to continue.</div>}
        {isAuthenticated && <div className="content__body">Hi, welcome to Notes app!</div>}
      </div>
    </PageLayout>
  );
};

export default PublicPage;
