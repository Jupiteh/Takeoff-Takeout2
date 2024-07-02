import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  background-color: #2b3e50;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-around;
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 10px;

  &:hover {
    opacity: 0.7;
  }
`;

const Navbar = () => {
  const user = useSelector((state) => state.user);

  return (
    <NavbarContainer>
      <NavItem to="/">Accueil</NavItem>
      <NavItem to="/restaurants">Restaurants</NavItem>
      {user.isLoggedIn ? (
        <>
          <NavItem to="/profile">Profile</NavItem>
          <NavItem to="/orders">Orders</NavItem>
        </>
      ) : (
        <NavItem to="/login">Login</NavItem>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
