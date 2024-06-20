import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/search');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <button onClick={handleOrderClick}>Commander</button>
    </div>
  );
}

export default HomePage;
