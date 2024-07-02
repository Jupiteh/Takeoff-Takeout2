// src/pages/RestaurantsPage.js

import React, { useState } from 'react';
import { Container, Box, Typography, Grid, TextField, IconButton, Card, CardContent, CardMedia, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const sampleRestaurants = [
  {
    name: "Le Gourmet",
    category: "French",
    image: "path/to/image1.jpg"
  },
  {
    name: "Sushi Express",
    category: "Japanese",
    image: "path/to/image2.jpg"
  },
  {
    name: "Pizza Palace",
    category: "Italian",
    image: "path/to/image3.jpg"
  }
];

const categories = [
  "French",
  "Japanese",
  "Italian",
  "Chinese",
  "Indian"
];

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredRestaurants = sampleRestaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!selectedCategory || restaurant.category === selectedCategory)
  );

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Restaurants disponibles
        </Typography>
        <Box display="flex" justifyContent="center" mb={4}>
          <TextField
            variant="outlined"
            placeholder="Rechercher par nom"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
            sx={{ width: '50%' }}
          />
        </Box>
        <Box display="flex" justifyContent="center" mb={4}>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "contained" : "outlined"}
              onClick={() => handleCategoryClick(category)}
              sx={{ mx: 1 }}
            >
              {category}
            </Button>
          ))}
        </Box>
        <Grid container spacing={3}>
          {filteredRestaurants.map((restaurant, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={restaurant.image}
                  alt={restaurant.name}
                />
                <CardContent>
                  <Typography variant="h6">{restaurant.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{restaurant.category}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
