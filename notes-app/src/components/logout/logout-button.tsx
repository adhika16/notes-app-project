import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "reactstrap";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button color="secondary" onClick={handleLogout}>
      Log Out
    </Button>
  );
};
