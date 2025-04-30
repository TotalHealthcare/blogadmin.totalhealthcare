import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarWrapper = styled.div`
  width: 100%;
  background-color: #1a1a1a;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
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
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 4px;

  &:hover {
    background-color: #333;
  }
`;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <NavbarContainer>
        <NavLink to="/">Home</NavLink>
        <NavLinks>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/blogs">Blog</NavLink>
        </NavLinks>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
