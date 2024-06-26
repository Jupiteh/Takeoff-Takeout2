import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faListAlt, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import logo from '../../logo.png'; // Assurez-vous que le chemin est correct

const SidebarContainer = styled.div`
  width: 80px;
  background-color: #2b3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

const LogoContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const Logo = styled.img`
  height: 40px;
  margin-bottom: 20px;
`;

const NavItem = styled(Link)`
  margin: 10px 0;
  color: white;
  font-size: 24px;
  text-decoration: none;

  &:hover {
    opacity: 0.7;
  }
`;

const Sidebar = () => {
  const user = useSelector((state) => state.user);

  if (!user.isLoggedIn) {
    return null; // Hide Sidebar if not logged in
  }

  return (
    <SidebarContainer>
      <LogoContainer>
        <Logo src={logo} alt="Logo" />
      </LogoContainer>
      <NavItem to="/">
        <FontAwesomeIcon icon={faHome} />
      </NavItem>
      <NavItem to="/profile">
        <FontAwesomeIcon icon={faUser} />
      </NavItem>
      <NavItem to="/orders">
        <FontAwesomeIcon icon={faListAlt} />
      </NavItem>
      <NavItem to="/order">
        <FontAwesomeIcon icon={faShoppingCart} />
      </NavItem>
      <NavItem to="/search">
        <FontAwesomeIcon icon={faSearch} />
      </NavItem>
    </SidebarContainer>
  );
};

export default Sidebar;
