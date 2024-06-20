import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { restaurantApi } from '../api/api';

function SearchPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await restaurantApi.get('/restaurants', {
          params: { search: searchTerm }
        });
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOrderClick = (ID_Restaurant) => {
    navigate(`/restaurant/${ID_Restaurant}`);
  };

  return (
    <div>
      <h1>Search Page</h1>
      <input
        type="text"
        placeholder="Search for a restaurant"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant._id}>
            <p>ID Restaurant: {restaurant.ID_Restaurant}</p>
            <p>ID Restaurateur: {restaurant.ID_Restaurateur}</p>
            <p>Nom Restaurant: {restaurant.nom_Restaurant}</p>
            {restaurant.image && <img src={`http://localhost:3001/${restaurant.image}`} alt={restaurant.nom_Restaurant} className="restaurant-image" />}
            <button onClick={() => handleOrderClick(restaurant.ID_Restaurant)}>Commander</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
