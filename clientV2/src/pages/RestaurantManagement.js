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
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

export default function RestaurantManagement() {
  const { userId, user, role } = useSelector((state) => state.user);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurateurRestaurants, setRestaurateurRestaurants] = useState([]);
  const [restaurantArticles, setRestaurantArticles] = useState([]);
  const [restaurantMenus, setRestaurantMenus] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState('');
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
    menu: false,
    editRestaurant: false,
    editArticle: false,
    editMenu: false,
    addArticleToMenu: false
  });
  const [editRestaurantData, setEditRestaurantData] = useState({});
  const [editArticleData, setEditArticleData] = useState({});
  const [editMenuData, setEditMenuData] = useState({});

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    const fetchRestaurateurRestaurants = async () => {
      if (role === 'restaurateur') {
        try {
          const response = await axios.get(`http://localhost:3001/api/restaurants/restaurateur/${userId}`);
          setRestaurateurRestaurants(response.data);
        } catch (error) {
          console.error('Error fetching restaurateur restaurants:', error);
        }
      }
    };

    fetchRestaurants();
    fetchRestaurateurRestaurants();
  }, [role, userId]);

  useEffect(() => {
    if (selectedRestaurant) {
      const fetchArticlesAndMenus = async () => {
        try {
          const articlesResponse = await axios.get(`http://localhost:3001/api/articlesbyRestaurant/${selectedRestaurant}`);
          setRestaurantArticles(articlesResponse.data);

          const menusResponse = await axios.get(`http://localhost:3001/api/menusbyRestaurant/${selectedRestaurant}`);
          setRestaurantMenus(menusResponse.data);
        } catch (error) {
          console.error('Error fetching articles and menus:', error);
        }
      };

      fetchArticlesAndMenus();
    }
  }, [selectedRestaurant]);

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
      const response = await axios.post('http://localhost:3001/api/restaurants', newRestaurant);
      setRestaurateurRestaurants([...restaurateurRestaurants, response.data]);
      setOpenDialog({ ...openDialog, restaurant: false });
    } catch (error) {
      console.error('Error creating restaurant:', error);
    }
  };

  const handleCreateArticle = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/articles', { ...newArticle, ID_Restaurant: selectedRestaurant });
      setRestaurantArticles([...restaurantArticles, response.data]);
      setOpenDialog({ ...openDialog, article: false });
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  const handleCreateMenu = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/menus', { ...newMenu, ID_Restaurant: selectedRestaurant });
      setRestaurantMenus([...restaurantMenus, response.data]);
      setOpenDialog({ ...openDialog, menu: false });
    } catch (error) {
      console.error('Error creating menu:', error);
    }
  };

  const handleEditRestaurant = async () => {
    try {
      await axios.put(`http://localhost:3001/api/restaurants/${editRestaurantData.ID_Restaurant}`, editRestaurantData);
      const updatedRestaurants = restaurateurRestaurants.map((restaurant) =>
        restaurant.ID_Restaurant === editRestaurantData.ID_Restaurant ? editRestaurantData : restaurant
      );
      setRestaurateurRestaurants(updatedRestaurants);
      setOpenDialog({ ...openDialog, editRestaurant: false });
    } catch (error) {
      console.error('Error editing restaurant:', error);
    }
  };

  const handleEditArticle = async () => {
    try {
      await axios.put(`http://localhost:3001/api/articles/${editArticleData.ID_Article}`, editArticleData);
      const updatedArticles = restaurantArticles.map((article) =>
        article.ID_Article === editArticleData.ID_Article ? editArticleData : article
      );
      setRestaurantArticles(updatedArticles);
      setOpenDialog({ ...openDialog, editArticle: false });
    } catch (error) {
      console.error('Error editing article:', error);
    }
  };

  const handleEditMenu = async () => {
    try {
      await axios.put(`http://localhost:3001/api/menus/${editMenuData.ID_Menu}`, editMenuData);
      const updatedMenus = restaurantMenus.map((menu) =>
        menu.ID_Menu === editMenuData.ID_Menu ? editMenuData : menu
      );
      setRestaurantMenus(updatedMenus);
      setOpenDialog({ ...openDialog, editMenu: false });
    } catch (error) {
      console.error('Error editing menu:', error);
    }
  };

  const handleAddArticleToMenu = async (menuId, articleId) => {
    try {
      await axios.post('http://localhost:3001/api/menuArticles', { ID_Menu: menuId, ID_Article: articleId });
      setOpenDialog({ ...openDialog, addArticleToMenu: false });
    } catch (error) {
      console.error('Error adding article to menu:', error);
    }
  };

  const openEditDialog = (restaurant) => {
    setEditRestaurantData(restaurant);
    setOpenDialog({ ...openDialog, editRestaurant: true });
  };

  const openEditArticleDialog = (article) => {
    setEditArticleData(article);
    setOpenDialog({ ...openDialog, editArticle: true });
  };

  const openEditMenuDialog = (menu) => {
    setEditMenuData(menu);
    setOpenDialog({ ...openDialog, editMenu: true });
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
            {role === 'restaurateur' && restaurateurRestaurants.length > 0 && (
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography component="h2" variant="h6">
                    Mes Restaurants
                  </Typography>
                  <List>
                    {restaurateurRestaurants.map((restaurant, index) => (
                      <ListItem key={index} button onClick={() => setSelectedRestaurant(restaurant.ID_Restaurant)} selected={selectedRestaurant === restaurant.ID_Restaurant}>
                        <ListItemText primary={restaurant.nom_Restaurant} secondary={restaurant.adresse} />
                        <IconButton edge="end" aria-label="edit" onClick={() => openEditDialog(restaurant)}>
                          <EditIcon />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            )}
            <Grid item xs={12}>
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
                  disabled={!selectedRestaurant}
                >
                  Ajouter un Article
                </Button>
                <List>
                  {restaurantArticles.map((article, index) => (
                    <ListItem key={index}>
                      <ListItemText primary={article.article_Name} secondary={`Prix: ${article.price}€`} />
                      <IconButton edge="end" aria-label="edit" onClick={() => openEditArticleDialog(article)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12}>
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
                  disabled={!selectedRestaurant}
                >
                  Créer un Menu
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenDialog({ ...openDialog, addArticleToMenu: true })}
                  disabled={!selectedMenu}
                >
                  Ajouter l'article au menu
                </Button>
                <List>
                  {restaurantMenus.map((menu, index) => (
                    <ListItem key={index} button onClick={() => setSelectedMenu(menu.ID_Menu)} selected={selectedMenu === menu.ID_Menu}>
                      <ListItemText primary={menu.menu_Name} secondary={`Prix: ${menu.price}€`} />
                      <IconButton edge="end" aria-label="edit" onClick={() => openEditMenuDialog(menu)}>
                        <EditIcon />
                      </IconButton>
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

      {/* Dialog for adding an article to a menu */}
      <Dialog open={openDialog.addArticleToMenu} onClose={() => setOpenDialog({ ...openDialog, addArticleToMenu: false })}>
        <DialogTitle>Ajouter un Article au Menu</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel id="select-article-label">Sélectionner un Article</InputLabel>
            <Select
              labelId="select-article-label"
              id="select-article"
              value={selectedArticleId}
              onChange={(e) => setSelectedArticleId(e.target.value)}
              label="Sélectionner un Article"
            >
              {restaurantArticles.map((article) => (
                <MenuItem key={article.ID_Article} value={article.ID_Article}>
                  {article.article_Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog({ ...openDialog, addArticleToMenu: false })} color="primary">
            Annuler
          </Button>
          <Button onClick={() => handleAddArticleToMenu(selectedMenu, selectedArticleId)} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for editing a restaurant */}
      <Dialog open={openDialog.editRestaurant} onClose={() => setOpenDialog({ ...openDialog, editRestaurant: false })}>
        <DialogTitle>Modifier le Restaurant</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom du Restaurant"
            fullWidth
            variant="outlined"
            name="nom_Restaurant"
            value={editRestaurantData.nom_Restaurant}
            onChange={(e) => handleInputChange(e, setEditRestaurantData)}
          />
          <TextField
            margin="dense"
            label="Catégorie"
            fullWidth
            variant="outlined"
            name="category"
            value={editRestaurantData.category}
            onChange={(e) => handleInputChange(e, setEditRestaurantData)}
          />
          <TextField
            margin="dense"
            label="Adresse"
            fullWidth
            variant="outlined"
            name="adresse"
            value={editRestaurantData.adresse}
            onChange={(e) => handleInputChange(e, setEditRestaurantData)}
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
              onChange={(e) => handleFileChange(e, setEditRestaurantData)}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog({ ...openDialog, editRestaurant: false })} color="primary">
            Annuler
          </Button>
          <Button onClick={handleEditRestaurant} color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for editing an article */}
      <Dialog open={openDialog.editArticle} onClose={() => setOpenDialog({ ...openDialog, editArticle: false })}>
        <DialogTitle>Modifier l'Article</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom de l'Article"
            fullWidth
            variant="outlined"
            name="article_Name"
            value={editArticleData.article_Name}
            onChange={(e) => handleInputChange(e, setEditArticleData)}
          />
          <TextField
            margin="dense"
            label="Prix de l'Article"
            fullWidth
            variant="outlined"
            type="number"
            name="price"
            value={editArticleData.price}
            onChange={(e) => handleInputChange(e, setEditArticleData)}
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
              onChange={(e) => handleFileChange(e, setEditArticleData)}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog({ ...openDialog, editArticle: false })} color="primary">
            Annuler
          </Button>
          <Button onClick={handleEditArticle} color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for editing a menu */}
      <Dialog open={openDialog.editMenu} onClose={() => setOpenDialog({ ...openDialog, editMenu: false })}>
        <DialogTitle>Modifier le Menu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom du Menu"
            fullWidth
            variant="outlined"
            name="menu_Name"
            value={editMenuData.menu_Name}
            onChange={(e) => handleInputChange(e, setEditMenuData)}
          />
          <TextField
            margin="dense"
            label="Prix du Menu"
            fullWidth
            variant="outlined"
            type="number"
            name="price"
            value={editMenuData.price}
            onChange={(e) => handleInputChange(e, setEditMenuData)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog({ ...openDialog, editMenu: false })} color="primary">
            Annuler
          </Button>
          <Button onClick={handleEditMenu} color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}