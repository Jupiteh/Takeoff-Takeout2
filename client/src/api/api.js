import axios from 'axios';
import config from './config';

const restaurantApi = axios.create({
  baseURL: config.RESTAURANT_API_URL,
});

const authApi = axios.create({
  baseURL: config.AUTH_API_URL,
});

const cartApi = axios.create({
  baseURL: config.CART_API_URL,
});

const orderApi = axios.create({
  baseURL: config.ORDER_API_URL,
});

export { restaurantApi, authApi, cartApi, orderApi };
