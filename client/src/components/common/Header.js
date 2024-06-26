import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { clearUser } from '../../features/user/userSlice';

const HeaderContainer = styled.div`
  background-color: #2b3e50;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background-color: #f0ad4e;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Header = () => {
  const { isLoggedIn, name } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
  };

  // Log the user state for debugging purposes
  console.log('User state:', { isLoggedIn, name });

  return (
    <HeaderContainer>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Accueil</Link>
      </div>
      <UserInfo>
        {isLoggedIn ? (
          <>
            <UserName>{name}</UserName>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </UserInfo>
    </HeaderContainer>
  );
};

export default Header;
