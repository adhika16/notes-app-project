import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "reactstrap";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  };

  return (
    <Button color="primary" onClick={handleLogin}>
      Log In
    </Button>
  );
};
