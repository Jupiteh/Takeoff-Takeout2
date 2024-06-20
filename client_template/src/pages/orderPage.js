import React, { useState, useEffect } from 'react';
import { cartApi, orderApi, restaurantApi } from '../api/api';

function OrderPage() {
  const [cart, setCart] = useState(null);
  const [clientId, setClientId] = useState(1); // Remplacer par l'ID du client réel
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [articles, setArticles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [restaurantName, setRestaurantName] = useState('');

  const fetchArticlesAndMenus = async (cartOrOrder) => {
    try {
      if (cartOrOrder) {
        const articleIds = cartOrOrder.articles;
        const menuIds = cartOrOrder.menus;

        const articlesPromises = articleIds.map(id => restaurantApi.get(`/articles/${id}`));
        const menusPromises = menuIds.map(id => restaurantApi.get(`/menus/${id}`));

        const articlesResponses = await Promise.all(articlesPromises);
        const menusResponses = await Promise.all(menusPromises);

        setArticles(articlesResponses.map(res => res.data));
        setMenus(menusResponses.map(res => res.data));

        console.log('Fetched articles:', articlesResponses.map(res => res.data));
        console.log('Fetched menus:', menusResponses.map(res => res.data));
      }
    } catch (error) {
      console.error('Error fetching articles and menus:', error);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartApi.get(`/carts/${clientId}`);
        setCart(response.data);
        await fetchArticlesAndMenus(response.data);
        const restaurantResponse = await restaurantApi.get(`/restaurants/${response.data.ID_Restaurant}`);
        setRestaurantName(restaurantResponse.data.nom_Restaurant);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    const fetchConfirmedOrder = async () => {
      try {
        const response = await orderApi.get(`/orders`);
        const confirmedOrders = response.data.filter(order => order.ID_Client === clientId && order.state !== 'order canceled by client');
        if (confirmedOrders.length > 0) {
          const confirmedOrder = confirmedOrders[0]; // Prendre la première commande confirmée
          setConfirmedOrder(confirmedOrder);
          await fetchArticlesAndMenus(confirmedOrder);
          const restaurantResponse = await restaurantApi.get(`/restaurants/${confirmedOrder.ID_Restaurant}`);
          setRestaurantName(restaurantResponse.data.nom_Restaurant);
        }
      } catch (error) {
        console.error('Error fetching confirmed orders:', error);
      }
    };

    fetchCart();
    fetchConfirmedOrder();
  }, [clientId]);

  const handleDeleteCart = async () => {
    try {
      if (cart && cart.ID_Cart) {
        await cartApi.delete(`/carts/${cart.ID_Cart}`);
        setCart(null); // Clear the cart from state
        console.log('Cart deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };

  const handleConfirmOrder = async () => {
    try {
      if (cart) {
        const orderData = {
          ID_Client: cart.ID_Client,
          ID_Restaurant: cart.ID_Restaurant,
          price: cart.price,
          articles: cart.articles,
          menus: cart.menus,
          state: "order confirmed"
        };

        const response = await orderApi.post('/orders', orderData);
        console.log('Order confirmed successfully', response.data);
        handleDeleteCart(); // Delete the cart after confirming the order
        setConfirmedOrder(response.data); // Set the confirmed order in state
        await fetchArticlesAndMenus(response.data);
        const restaurantResponse = await restaurantApi.get(`/restaurants/${response.data.ID_Restaurant}`);
        setRestaurantName(restaurantResponse.data.nom_Restaurant);
      }
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await orderApi.put(`/orders/${orderId}`, { state: 'order canceled by client' });
      console.log('Order canceled successfully', response.data);
      // Mettre à jour l'état local pour refléter l'annulation
      setConfirmedOrder(null);
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (
    <div>
      <h1>Current Cart</h1>
      {cart ? (
        <div>
          <h2>Cart ID: {cart.ID_Cart}</h2>
          <h3>Restaurant: {restaurantName}</h3>
          <h4>Articles:</h4>
          <ul>
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <li key={index}>
                  <p>{article.article_Name} - {article.price}€</p>
                </li>
              ))
            ) : (
              <li>No articles in the cart.</li>
            )}
          </ul>
          <h4>Menus:</h4>
          <ul>
            {menus.length > 0 ? (
              menus.map((menu, index) => (
                <li key={index}>
                  <p>{menu.menu_Name} - {menu.price}€</p>
                </li>
              ))
            ) : (
              <li>No menus in the cart.</li>
            )}
          </ul>
          <p>Total Price: {cart.price}€</p>
          <button onClick={handleDeleteCart}>Delete Cart</button>
          <button onClick={handleConfirmOrder}>Confirm Order</button>
        </div>
      ) : (
        <p>No cart found.</p>
      )}

      <h1>Etat de la commande</h1>
      {confirmedOrder ? (
        <div>
          <h3>Restaurant: {restaurantName}</h3>
          <h4>Articles:</h4>
          <ul>
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <li key={index}>
                  <p>{article.article_Name} - {article.price}€</p>
                </li>
              ))
            ) : (
              <li>No articles in the order.</li>
            )}
          </ul>
          <h4>Menus:</h4>
          <ul>
            {menus.length > 0 ? (
              menus.map((menu, index) => (
                <li key={index}>
                  <p>{menu.menu_Name} - {menu.price}€</p>
                </li>
              ))
            ) : (
              <li>No menus in the order.</li>
            )}
          </ul>
          <p>Total Price: {confirmedOrder.price}€</p>
          <p>
            {confirmedOrder.state === 'order confirmed' && `En attente de confirmation par ${restaurantName}`}
            {confirmedOrder.state === 'order accepted by restaurant' && 'En attente de livreur'}
            {confirmedOrder.state === 'order delivery accepted' && 'Livraison pris en charge par <ajouter nom du livreur>'}
            {confirmedOrder.state === 'order completed' && 'Commande livrée'}
          </p>
          {confirmedOrder.state === 'order confirmed' && (
            <button onClick={() => handleCancelOrder(confirmedOrder.ID_Order)}>Annuler la commande</button>
          )}
        </div>
      ) : (
        <p>Aucune commande en cours.</p>
      )}
    </div>
  );
}

export default OrderPage;
