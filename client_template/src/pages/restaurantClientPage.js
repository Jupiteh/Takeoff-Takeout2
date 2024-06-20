import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { restaurantApi, cartApi } from '../api/api';

function RestaurantClientPage() {
  const { restaurantId } = useParams();
  const [menus, setMenus] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState({});
  const [menuArticles, setMenuArticles] = useState({});
  const [clientId, setClientId] = useState(1); // Remplacer par l'ID du client réel

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await restaurantApi.get(`/menus/${restaurantId}`);
        setMenus(response.data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };

    const fetchArticles = async () => {
      try {
        const response = await restaurantApi.get('/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchMenus();
    fetchArticles();
  }, [restaurantId]);

  const fetchMenuArticles = async (menuId) => {
    try {
      const response = await restaurantApi.get(`/menuArticles/${menuId}`);
      setMenuArticles(prevState => ({ ...prevState, [menuId]: response.data }));
    } catch (error) {
      console.error('Error fetching menu articles:', error);
    }
  };

  const handleArticleChange = (menuId, articleId) => {
    setSelectedArticle({ ...selectedArticle, [menuId]: articleId });
  };

  const handleAddToCart = async (ID_Article, ID_Menu, price) => {
    try {
      await cartApi.post('/carts', {
        ID_Client: clientId,
        ID_Restaurant: parseInt(restaurantId, 10), // Assurez-vous que l'ID du restaurant est un nombre
        ID_Article,
        ID_Menu,
        price
      });
      console.log('Item added to cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div>
      <h1>Articles for Restaurant {restaurantId}</h1>
      {articles.length > 0 ? (
        <ul>
          {articles
            .filter(article => article.ID_Restaurant === parseInt(restaurantId, 10))
            .map(article => (
              <li key={article._id}>
                <p>Article Name: {article.article_Name}</p>
                <p>Price: {article.price} €</p>
                {article.image && <img src={`http://localhost:3001/${article.image}`} alt={article.article_Name} className="article-image" />}
                <button onClick={() => handleAddToCart(article.ID_Article, null, article.price)}>Ajouter au panier</button>
              </li>
            ))}
        </ul>
      ) : (
        <p>No articles found for this restaurant.</p>
      )}

      <h1>Menus for Restaurant {restaurantId}</h1>
      {menus.length > 0 ? (
        <ul>
          {menus.map(menu => (
            <li key={menu.ID_Menu}>
              <p>ID Menu: {menu.ID_Menu}</p>
              <p>Menu Name: {menu.menu_Name}</p>
              <p>Price: {menu.price} €</p>
              <button onClick={() => handleAddToCart(null, menu.ID_Menu, menu.price)}>Ajouter le menu au panier</button>
              <button onClick={() => fetchMenuArticles(menu.ID_Menu)}>Show Articles</button>
              {menuArticles[menu.ID_Menu] && (
                <ul>
                  {menuArticles[menu.ID_Menu].map(article => (
                    <li key={article._id}>
                      {article.article_Name}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No menus found for this restaurant.</p>
      )}
    </div>
  );
}

export default RestaurantClientPage;
