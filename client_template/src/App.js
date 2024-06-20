import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import DeliveryTrackingPage from './pages/deiveryTrackingPage';
import TestPage from './pages/testPage';
import TestPage2 from './pages/test2Page';


function App() {
  return (
    <Router>
      <Header />
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
      </Routes>
    </Router>
  );
}

export default App;
