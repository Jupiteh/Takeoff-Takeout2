import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardMedia: {
    height: 140,
  },
  cart: {
    position: 'fixed',
    top: theme.spacing(10),
    right: theme.spacing(4),
    width: 300,
    padding: theme.spacing(2),
    boxShadow: theme.shadows[5],
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cartTotal: {
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
  },
  menuArticles: {
    marginTop: theme.spacing(2),
  },
}));

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [articles, setArticles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);
  const [menuArticles, setMenuArticles] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/api/articlesbyRestaurant/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          console.error('Articles data is not an array:', data);
        }
      })
      .catch((error) => console.error('Error fetching articles:', error));

    fetch(`http://localhost:3001/api/menusbyRestaurant/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMenus(data);
        } else {
          console.error('Menus data is not an array:', data);
        }
      })
      .catch((error) => console.error('Error fetching menus:', error));
  }, [id]);

  useEffect(() => {
    menus.forEach((menu) => {
      fetch(`http://localhost:3001/api/menuArticles/${menu.ID_Menu}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setMenuArticles((prev) => ({ ...prev, [menu.ID_Menu]: data }));
          } else {
            console.error('Menu articles data is not an array:', data);
          }
        })
        .catch((error) => console.error('Error fetching menu articles:', error));
    });
  }, [menus]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Articles et Menus
      </Typography>

      <Grid container spacing={4} className={classes.section}>
        {Array.isArray(articles) &&
          articles.map((article) => (
            <Grid item key={article.ID_Article} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                {article.image && (
                  <CardMedia
                    className={classes.cardMedia}
                    component="img"
                    image={`http://localhost:3001/${article.image}`}
                    alt={article.article_Name}
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {article.article_Name || 'Nom non disponible'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {article.price || 'Prix non disponible'}€
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(article)}
                  >
                    Ajouter au panier
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Typography variant="h5" gutterBottom className={classes.section}>
        Menus
      </Typography>

      <Grid container spacing={4} className={classes.section}>
        {Array.isArray(menus) &&
          menus.map((menu) => (
            <Grid item key={menu.ID_Menu} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {menu.menu_Name || 'Nom non disponible'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {menu.price || 'Prix non disponible'}€
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(menu)}
                  >
                    Ajouter au panier
                  </Button>
                  {menuArticles[menu.ID_Menu] && (
                    <Box className={classes.menuArticles}>
                      <Typography variant="body2" color="textSecondary">
                        Articles dans le menu:
                      </Typography>
                      <List>
                        {menuArticles[menu.ID_Menu].map((article) => (
                          <ListItem key={article.ID_Article}>
                            <ListItemText primary={article.article_Name} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Paper className={classes.cart}>
        <Typography variant="h6">Panier</Typography>
        <List>
          {cart.map((item, index) => (
            <ListItem key={index} className={classes.cartItem}>
              <ListItemText
                primary={item.article_Name || item.menu_Name}
                secondary={`${item.price}€`}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography variant="h6" className={classes.cartTotal}>
          Total: {calculateTotal()}€
        </Typography>
      </Paper>
    </Container>
  );
};

export default RestaurantDetailPage;
