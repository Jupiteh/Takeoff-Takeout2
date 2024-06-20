import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from './pages/homePage';
import RestaurantPage from './pages/restaurantPage';
import MenuPage from './pages/menuPage';
import ArticlePage from './pages/articlePage';
import Header from './components/common/header';
import SearchPage from './pages/searchPage';
import RestaurantClientPage from './pages/restaurantClientPage';
import OrderPage from './pages/orderPage';
import UserPage from './pages/userPage';
import OrderRequestPage from './pages/orderRequestPage';
import DeliveryRequestPage from './pages/deliveryRequestPage';
import DeliveryTrackingPage from './pages/deliveryTrackingPage';
import TestPage from './pages/testPage';
import TestPage2 from './pages/test2Page';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import { setUser, clearUser, fetchUser } from './features/user/userSlice';
import axios from 'axios';
import jwt from 'jsonwebtoken';

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { username: 'john.doe', password: 'password' });
      const { token } = response.data;
      const decodedToken = jwt.decode(token);
      dispatch(setUser({ name: decodedToken.name, email: decodedToken.email, token }));
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  const handleFetchUser = () => {
    dispatch(fetchUser(1)); // Par exemple, fetch user with id 1
  };

  return (
    <Router>
      <Header />
      <div className="App">
        <h1>Hello, {user.name ? user.name : 'Guest'}!</h1>
        <div>
          <button onClick={handleLogin} disabled={user.status === 'loading'}>
            Login
          </button>
          <button onClick={handleLogout} disabled={user.status === 'loading'}>
            Logout
          </button>
          <button onClick={handleFetchUser} disabled={user.status === 'loading'}>
            Fetch User
          </button>
        </div>
        {user.status === 'loading' && <p>Loading...</p>}
        {user.status === 'failed' && <p>Error: {user.error}</p>}
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants" element={<RestaurantPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/menu/:restaurantId" element={<MenuPage />} />
        <Route path="/articles" element={<ArticlePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/restaurant/:restaurantId" element={<RestaurantClientPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/order-requests" element={<OrderRequestPage />} />
        <Route path="/delivery-requests" element={<DeliveryRequestPage />} />
        <Route path="/delivery-tracking" element={<DeliveryTrackingPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/test2" element={<TestPage2 />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
