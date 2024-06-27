import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice, faHamburger, faCoffee, faFish, faIceCream, faAppleAlt, faDrumstickBite, faLeaf, faBreadSlice, faWineBottle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { restaurantApi } from '../api/api';

const SearchContainer = styled.div`
  padding: 20px;
  color: white;
  margin: 0 auto;
  width: 80%;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border: none;
  border-radius: 5px;
`;

const CategoryIcons = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`;

const IconWrapper = styled.div`
  background-color: #f0ad4e;
  border-radius: 50%;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ec971f;
  }

  svg {
    font-size: 30px;
    color: white;
  }
`;

const RestaurantList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const RestaurantCard = styled.div`
  background-color: #34495e;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  width: 200px;
  text-align: center;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #f0ad4e;
`;

const CardRating = styled.div`
  color: #f0ad4e;
  margin-bottom: 10px;
`;

const CardDistance = styled.div`
  color: #ecf0f1;
`;

const categories = [
  { name: 'Pizza', icon: faPizzaSlice },
  { name: 'Burgers', icon: faHamburger },
  { name: 'Café', icon: faCoffee },
  { name: 'Seafood', icon: faFish },
  { name: 'Ice Cream', icon: faIceCream },
  { name: 'Vegan', icon: faLeaf },
  { name: 'Fruit', icon: faAppleAlt },
  { name: 'Chicken', icon: faDrumstickBite },
  { name: 'Bakery', icon: faBreadSlice },
  { name: 'Wine', icon: faWineBottle },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await restaurantApi.get('/restaurants', {
          params: { search: searchTerm, category: selectedCategory }
        });
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, [searchTerm, selectedCategory]);

  const handleSelectRestaurant = (ID_Restaurant) => {
    navigate(`/restaurant/${ID_Restaurant}`);
  };

  return (
    <SearchContainer>
      <Title>Find Your Favorite Restaurant</Title>
      <SearchBar
        type="text"
        placeholder="What are you craving?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <CategoryIcons>
        {categories.map((category) => (
          <IconWrapper key={category.name} onClick={() => setSelectedCategory(category.name)}>
            <FontAwesomeIcon icon={category.icon} />
          </IconWrapper>
        ))}
      </CategoryIcons>
      <RestaurantList>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant._id} onClick={() => handleSelectRestaurant(restaurant.ID_Restaurant)}>
            <CardImage src={`http://localhost:3001/${restaurant.image}`} alt={restaurant.nom_Restaurant} />
            <CardTitle>{restaurant.nom_Restaurant}</CardTitle>
            <CardRating>Rating: {restaurant.rating}</CardRating>
            <CardDistance>{restaurant.distance} km away</CardDistance>
          </RestaurantCard>
        ))}
      </RestaurantList>
    </SearchContainer>
  );
};

export default Search;
