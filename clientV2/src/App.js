import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AppAppBar from './components/layout/AppAppBar';
import getDesignTokens from './theme';
import RestaurantsPage from './pages/RestaurantPage';
import ProfilePage from './pages/ProfilPage';
import RestaurantManagement from './pages/RestaurantManagement';
import LandingPage from './pages/HomePage'; 
function App() {
  const [mode, setMode] = React.useState('light');

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <Router>
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <Routes>
          <Route path="/" element={<LandingPage mode={mode} toggleColorMode={toggleColorMode} />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/restaurant-management" element={<RestaurantManagement />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
