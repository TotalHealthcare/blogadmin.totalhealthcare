import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../../context/authContext";

const NavbarWrapper = styled.div`
  width: 100%;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavbarContainer = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #1a1a1a;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #2563eb;
    color: white;
  }
`;

const PrimaryButton = styled(NavLink)`
  background-color: #2563eb;
  color: white !important;
  padding: 0.5rem 1.5rem;

  &:hover {
    background-color: #1d4ed8;
    transform: translateY(-2px);
  }
`;

const Navbar = () => {
  const { authToken, logout } = useAuth();
  const location = useLocation();

  return (
    <NavbarWrapper>
      <NavbarContainer>
        <NavLink to="/">THC BLOG</NavLink>
        <NavLinks>
          <NavLink to="/blog">Blogs</NavLink>

          {authToken && location.pathname !== "/blogs/create" && (
            <PrimaryButton to="/blogs/create">Create</PrimaryButton>
          )}

          {authToken && location.pathname === "/blogs/create" && (
            <PrimaryButton to="/blog">Back to Blogs</PrimaryButton>
          )}

          {authToken ? (
            <NavLink
              as="button"
              onClick={logout}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                font: "inherit",
                color: "inherit",
              }}
            >
              Logout
            </NavLink>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </NavLinks>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
