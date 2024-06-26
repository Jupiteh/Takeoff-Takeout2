import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Sidebar from './components/common/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import AppRoutes from './routes';

const AppContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.3s ease;
  margin-left: ${({ $isOpen }) => ($isOpen ? '200px' : '80px')};

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  background-color: #2b3e50;
  color: white;
`;

const NotificationIcon = styled.div`
  position: relative;
  font-size: 24px;
  cursor: pointer;
`;

const NotificationMenu = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background-color: #2b3e50;
  color: white;
  border: 1px solid #34495e;
  border-radius: 5px;
  padding: 10px;
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  z-index: 1;
`;

const AppWrapper = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const location = useLocation();
  const hideSidebarAndTopBar = ['/', '/login', '/signup'].includes(location.pathname);

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        {!hideSidebarAndTopBar && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        <ContentContainer $isOpen={isSidebarOpen}>
          {!hideSidebarAndTopBar && (
            <TopBar>
              <NotificationIcon onClick={toggleNotifications}>
                <FontAwesomeIcon icon={faBell} />
                <NotificationMenu $show={showNotifications}>
                  <p>Notification 1</p>
                  <p>Notification 2</p>
                  <p>Notification 3</p>
                </NotificationMenu>
              </NotificationIcon>
            </TopBar>
          )}
          <MainContent>
            <AppRoutes />
          </MainContent>
        </ContentContainer>
      </AppContainer>
    </>
  );
};

export default AppWrapper;
