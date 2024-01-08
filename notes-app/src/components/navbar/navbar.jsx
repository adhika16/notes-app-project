import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { LoginButton } from "../login/login-button";
import { LogoutButton } from "../logout/logout-button";
import { SignupButton } from "../signup/signup-button";

function NavBar(args) {
  const { isAuthenticated } = useAuth0();

  return (
    <div>
      <Navbar {...args}>
        <NavbarBrand href="/">MyNotes</NavbarBrand>
        <Nav className="ms-auto">
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>

          {isAuthenticated && (
            <NavItem>
              <NavLink href="/note">Notes</NavLink>
            </NavItem>
          )}
        </Nav>
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
      </Navbar>
    </div>
  );
}

export default NavBar;
