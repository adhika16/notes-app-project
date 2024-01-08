import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { PageLoader } from "../components/page-loader";

interface AuthenticationGuardProps {
  component: React.ComponentType<any>; // Define the expected type for 'component'
}

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div>
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};
