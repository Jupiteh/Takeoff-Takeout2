import React, { useState, useEffect } from 'react';
import { restaurantApi, orderApi } from '../api/api';

function OrderRequestPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [orders, setOrders] = useState([]);
  const [articles, setArticles] = useState({});
  const [restaurateurId, setRestaurateurId] = useState(1); // Remplacer par l'ID du restaurateur réel

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await restaurantApi.get(`/restaurants/restaurateur/${restaurateurId}`);
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, [restaurateurId]);

  useEffect(() => {
    const fetchOrders = async (restaurantIds) => {
      try {
        const response = await orderApi.get(`/orders/confirmed/${restaurantIds.join(',')}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (restaurants.length > 0) {
      const restaurantIds = restaurants.map((restaurant) => restaurant.ID_Restaurant);
      fetchOrders(restaurantIds);
    }
  }, [restaurants]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articleIds = orders.flatMap(order => order.articles);
        const uniqueArticleIds = [...new Set(articleIds)];
        const articleResponses = await Promise.all(uniqueArticleIds.map(id => restaurantApi.get(`/articles/${id}`)));
        const articlesMap = articleResponses.reduce((acc, response) => {
          acc[response.data.ID_Article] = response.data.article_Name;
          return acc;
        }, {});
        setArticles(articlesMap);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    if (orders.length > 0) {
      fetchArticles();
    }
  }, [orders]);

  const handleAcceptOrder = async (orderId) => {
    try {
      await orderApi.put(`/orders/${orderId}`, { state: 'order accepted by restaurant' });
      setOrders(orders.map(order => 
        order.ID_Order === orderId ? { ...order, state: 'order accepted by restaurant' } : order
      ));
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  return (
    <div>
      <h1>Order Requests</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.ID_Order}>
              <p>Commande numéro: {order.ID_Order}</p>
              <p>Prix: {order.price}€</p>
              <p>Articles: {order.articles.map(articleId => articles[articleId] || articleId).join(', ')}</p>
              {order.state === 'order confirmed' && (
                <button onClick={() => handleAcceptOrder(order.ID_Order)}>Accepter commande</button>
              )}
              {order.state === 'order accepted by restaurant' && (
                <p>En attente de livreur</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No confirmed orders found for your restaurants.</p>
      )}
    </div>
  );
}

export default OrderRequestPage;
