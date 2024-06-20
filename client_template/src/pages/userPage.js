import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserPage() {
  const navigate = useNavigate();

  const handleGoToRestaurants = () => {
    navigate('/restaurants');
  };

  const handleGoToOrderRequests = () => {
    navigate('/order-requests');
  };

  const handleGoToDeliveryRequests = () => {
    navigate('/delivery-requests');
  };

  return (
    <div>
      <h1>User Page</h1>
      <button onClick={handleGoToRestaurants}>Go to Restaurants</button>
      <button onClick={handleGoToOrderRequests}>Demande de commandes</button>
      <button onClick={handleGoToDeliveryRequests}>Demande de livraisons</button>
    </div>
  );
}

export default UserPage;
