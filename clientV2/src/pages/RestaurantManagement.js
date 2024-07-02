import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import axios from 'axios';

export default function RestaurantManagement() {
  const { userId, user, role } = useSelector((state) => state.user);
  const [restaurants, setRestaurants] = useState([]);
  const [articles, setArticles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState({
    ID_Restaurateur: userId,
    nom_Restaurant: '',
    category: '',
    image: '',
    adresse: ''
  });
  const [newArticle, setNewArticle] = useState({
    ID_Restaurant: '',
    article_Name: '',
    image: '',
    price: ''
  });
  const [newMenu, setNewMenu] = useState({
    ID_Restaurant: '',
    menu_Name: '',
    price: ''
  });
  const [openDialog, setOpenDialog] = useState({
    restaurant: false,
    article: false,
    menu: false
  });

  useEffect(() => {
    // Fetch restaurants, articles, and menus here if needed
  }, []);

  const handleInputChange = (event, stateSetter) => {
    const { name, value } = event.target;
    stateSetter((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (event, stateSetter) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      stateSetter((prevState) => ({ ...prevState, image: reader.result }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCreateRestaurant = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/restaurants', newRestaurant);
      setRestaurants([...restaurants, response.data]);
      setOpenDialog({ ...openDialog, restaurant: false });
    } catch (error) {
      console.error('Error creating restaurant:', error);
    }
  };

  const handleCreateArticle = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/articles', newArticle);
      setArticles([...articles, response.data]);
      setOpenDialog({ ...openDialog, article: false });
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  const handleCreateMenu = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/menus', newMenu);
      setMenus([...menus, response.data]);
      setOpenDialog({ ...openDialog, menu: false });
    } catch (error) {
      console.error('Error creating menu:', error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ marginTop: 12, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ width: 100, height: 100, mb: 2 }} />
        <Typography component="h1" variant="h5">
          {user?.username}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {role}
        </Typography>
        <Box sx={{ mt: 3, width: '100%' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography component="h2" variant="h6">
                  Restaurants
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<RestaurantMenuIcon />}
                  onClick={() => setOpenDialog({ ...openDialog, restaurant: true })}
                  sx={{ mt: 2 }}
                >
                  Ajouter un Restaurant
                </Button>
                <List>
                  {restaurants.map((restaurant, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={restaurant.nom_Restaurant} secondary={restaurant.adresse} />
                      {/* Add any other restaurant management actions here */}
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2 }}>
                <Typography component="h2" variant="h6">
                  Articles
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenDialog({ ...openDialog, article: true })}
                  sx={{ mt: 2 }}
                >
                  Ajouter un Article
                </Button>
                <List>
                  {articles.map((article, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={article.article_Name} secondary={`Prix: ${article.price}€`} />
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2 }}>
                <Typography component="h2" variant="h6">
                  Menus
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<MenuBookIcon />}
                  onClick={() => setOpenDialog({ ...openDialog, menu: true })}
                  sx={{ mt: 2 }}
                >
                  Créer un Menu
                </Button>
                <List>
                  {menus.map((menu, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={menu.menu_Name} secondary={`Prix: ${menu.price}€`} />
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Dialog for creating a new restaurant */}
      <Dialog open={openDialog.restaurant} onClose={() => setOpenDialog({ ...openDialog, restaurant: false })}>
        <DialogTitle>Ajouter un Restaurant</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom du Restaurant"
            fullWidth
            variant="outlined"
            name="nom_Restaurant"
            value={newRestaurant.nom_Restaurant}
            onChange={(e) => handleInputChange(e, setNewRestaurant)}
          />
          <TextField
            margin="dense"
            label="Catégorie"
            fullWidth
            variant="outlined"
            name="category"
            value={newRestaurant.category}
            onChange={(e) => handleInputChange(e, setNewRestaurant)}
          />
          <TextField
            margin="dense"
            label="Adresse"
            fullWidth
            variant="outlined"
            name="adresse"
            value={newRestaurant.adresse}
            onChange={(e) => handleInputChange(e, setNewRestaurant)}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            Télécharger une image
            <input
              type="file"
              hidden
              onChange={(e) => handleFileChange(e, setNewRestaurant)}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog({ ...openDialog, restaurant: false })} color="primary">
            Annuler
          </Button>
          <Button onClick={handleCreateRestaurant} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for creating a new article */}
      <Dialog open={openDialog.article} onClose={() => setOpenDialog({ ...openDialog, article: false })}>
        <DialogTitle>Ajouter un Article</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom de l'Article"
            fullWidth
            variant="outlined"
            name="article_Name"
            value={newArticle.article_Name}
            onChange={(e) => handleInputChange(e, setNewArticle)}
          />
          <TextField
            margin="dense"
            label="Prix de l'Article"
            fullWidth
            variant="outlined"
            type="number"
            name="price"
            value={newArticle.price}
            onChange={(e) => handleInputChange(e, setNewArticle)}
          />
          <TextField
            margin="dense"
            label="ID Restaurant"
            fullWidth
            variant="outlined"
            name="ID_Restaurant"
            value={newArticle.ID_Restaurant}
            onChange={(e) => handleInputChange(e, setNewArticle)}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            Télécharger une image
            <input
              type="file"
              hidden
              onChange={(e) => handleFileChange(e, setNewArticle)}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog({ ...openDialog, article: false })} color="primary">
            Annuler
          </Button>
          <Button onClick={handleCreateArticle} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for creating a new menu */}
      <Dialog open={openDialog.menu} onClose={() => setOpenDialog({ ...openDialog, menu: false })}>
        <DialogTitle>Créer un Menu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom du Menu"
            fullWidth
            variant="outlined"
            name="menu_Name"
            value={newMenu.menu_Name}
            onChange={(e) => handleInputChange(e, setNewMenu)}
          />
          <TextField
            margin="dense"
            label="Prix du Menu"
            fullWidth
            variant="outlined"
            type="number"
            name="price"
            value={newMenu.price}
            onChange={(e) => handleInputChange(e, setNewMenu)}
          />
          <TextField
            margin="dense"
            label="ID Restaurant"
            fullWidth
            variant="outlined"
            name="ID_Restaurant"
            value={newMenu.ID_Restaurant}
            onChange={(e) => handleInputChange(e, setNewMenu)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog({ ...openDialog, menu: false })} color="primary">
            Annuler
          </Button>
          <Button onClick={handleCreateMenu} color="primary">
            Créer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
