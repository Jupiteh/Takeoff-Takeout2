import React, { useState, useEffect } from 'react';
import { restaurantApi, orderApi } from '../api/api';

function DeliveryRequestPage() {
  const [orders, setOrders] = useState([]);
  const [articles, setArticles] = useState({});
  const [restaurantNames, setRestaurantNames] = useState({});
  const deliveryManId = 1; // Remplacer par l'ID du livreur réel

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderApi.get(`/orders/deliveryman/${deliveryManId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [deliveryManId]);

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

  useEffect(() => {
    const fetchRestaurantNames = async () => {
      try {
        const restaurantIds = orders.map(order => order.ID_Restaurant);
        const uniqueRestaurantIds = [...new Set(restaurantIds)];
        const restaurantResponses = await Promise.all(uniqueRestaurantIds.map(id => restaurantApi.get(`/restaurants?search=${id}`)));
        const restaurantNamesMap = restaurantResponses.reduce((acc, response) => {
          acc[response.data[0].ID_Restaurant] = response.data[0].nom_Restaurant;
          return acc;
        }, {});
        setRestaurantNames(restaurantNamesMap);
      } catch (error) {
        console.error('Error fetching restaurant names:', error);
      }
    };

    if (orders.length > 0) {
      fetchRestaurantNames();
    }
  }, [orders]);

  const handleAcceptDelivery = async (orderId) => {
    try {
      await orderApi.put(`/orders/${orderId}`, {
        state: 'order delivery accepted',
        ID_DeliveryMan: deliveryManId // Ajouter l'ID du livreur
      });
      setOrders(orders.map(order =>
        order.ID_Order === orderId ? { ...order, state: 'order delivery accepted', ID_DeliveryMan: deliveryManId } : order
      ));
    } catch (error) {
      console.error('Error accepting delivery:', error);
    }
  };

  return (
    <div>
      <h1>Delivery Requests</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.ID_Order}>
              <p>Commande numéro: {order.ID_Order}</p>
              <p>Prix: {order.price}€</p>
              <p>Articles: {order.articles.map(articleId => articles[articleId] || articleId).join(', ')}</p>
              <p>State: {order.state}</p>
              {order.state === 'order accepted by restaurant' && (
                <button onClick={() => handleAcceptDelivery(order.ID_Order)}>
                  Accepter la commande
                </button>
              )}
              {order.state === 'order delivery accepted' && (
                <p>Rendez vous au restaurant {restaurantNames[order.ID_Restaurant]}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No accepted orders found for your delivery man.</p>
      )}
    </div>
  );
}

export default DeliveryRequestPage;
