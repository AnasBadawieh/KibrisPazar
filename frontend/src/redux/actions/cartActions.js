import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';
import API_BASE_URL from '../../config';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
    console.log('Product data:', data);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.images[0], // Ensure image is set
        price: data.price,
        countInStock: data.countInStock,
        qty
      }
    });

    const { cart: { cartItems }, userLogin: { userInfo } } = getState();
    console.log('Cart items:', cartItems);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.post(`${API_BASE_URL}/api/cart`, { cartItems }, config);
    console.log('Cart items posted to server');

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  });

  const { cart: { cartItems } } = getState();

  await axios.post(`${API_BASE_URL}/api/cart`, { cartItems });

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};