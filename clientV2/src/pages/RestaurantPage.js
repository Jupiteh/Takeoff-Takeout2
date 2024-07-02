import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function RestaurantListPage() {
  const [restaurants, setRestaurants] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [category, setCategory] = React.useState('');

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const latitude = params.get('latitude');
    const longitude = params.get('longitude');

    fetch(`http://localhost:8080/api/restaurants/location?latitude=${latitude}&longitude=${longitude}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched restaurants data:', data); // Log de la réponse de l'API
        // Assurez-vous que `data` est un tableau
        if (Array.isArray(data)) {
          setRestaurants(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      })
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  const filteredRestaurants = Array.isArray(restaurants)
    ? restaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category ? restaurant.category === category : true)
      )
    : [];

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Restaurants disponibles
        </Typography>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            label="Recherche par nom"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mr: 2 }}
          />
          <Button variant="contained" color="primary" onClick={() => handleCategoryClick('')}>
            Réinitialiser les filtres
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button variant="outlined" onClick={() => handleCategoryClick('Italian')}>
            Italien
          </Button>
          <Button variant="outlined" onClick={() => handleCategoryClick('Chinese')}>
            Chinois
          </Button>
          <Button variant="outlined" onClick={() => handleCategoryClick('Mexican')}>
            Mexicain
          </Button>
          {/* Ajoutez plus de catégories ici */}
        </Box>
        <Grid container spacing={4}>
          {filteredRestaurants.map((restaurant) => (
            <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={restaurant.image}
                  alt={restaurant.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {restaurant.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
