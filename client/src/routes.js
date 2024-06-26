import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ReferFriend from './pages/ReferFriend';
import Orders from './pages/Orders';
import OrderHistory from './pages/OrderHistory';
import Cart from './pages/Cart';
import OrderTracking from './pages/OrderTracking';
import Search from './pages/Search';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import RestaurantPage from './pages/RestaurantPage';
import MenuPage from './pages/MenuPage';
import ArticlePage from './pages/ArticlePage';
import SearchPage from './pages/SearchPage';
import RestaurantClientPage from './pages/RestaurantClientPage';
import OrderPage from './pages/OrderPage';
import OrderRequestPage from './pages/OrderRequestPage';
import DeliveryRequestPage from './pages/DeliveryRequestPage';
import DeliveryTrackingPage from './pages/DeliveryTrackingPage';
import TestPage from './pages/TestPage';
import TestPage2 from './pages/TestPage2';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/refer" element={<ReferFriend />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/order-history" element={<OrderHistory />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/order-tracking" element={<OrderTracking />} />
      <Route path="/search" element={<Search />} />
      <Route path="/restaurants" element={<RestaurantPage />} />
      <Route path="/menu/:restaurantId" element={<MenuPage />} />
      <Route path="/articles" element={<ArticlePage />} />
      <Route path="/searchPage" element={<SearchPage />} />
      <Route path="/restaurant/:restaurantId" element={<RestaurantClientPage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/order-requests" element={<OrderRequestPage />} />
      <Route path="/delivery-requests" element={<DeliveryRequestPage />} />
      <Route path="/delivery-tracking" element={<DeliveryTrackingPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/test2" element={<TestPage2 />} />
    </Routes>
  );
};

export default AppRoutes;
