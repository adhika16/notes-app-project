import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { LoginButton } from "../../login/login-button";
import { LogoutButton } from "../../logout/logout-button";
import { SignupButton } from "../../signup/signup-button";

export const NavBarButtons = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="nav-bar__buttons">
      {!isAuthenticated && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {isAuthenticated && (
        <>
          <LogoutButton />
        </>
      )}
    </div>
  );
};
