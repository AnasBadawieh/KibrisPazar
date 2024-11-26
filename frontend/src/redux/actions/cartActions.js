import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_UPDATE_ITEM,
} from '../constants/cartConstants';
import API_BASE_URL from '../../config';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
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

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.post(`${API_BASE_URL}/api/cart`, { cartItems }, config);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${API_BASE_URL}/api/cart/remove/${id}`, config);

    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
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

export const updateCartItem = (productId, qty) => (dispatch, getState) => {
  const { cart: { cartItems } } = getState();

  const updatedCartItems = cartItems.map(item =>
    item.product === productId ? { ...item, qty } : item
  );

  dispatch({
    type: CART_UPDATE_ITEM,
    payload: updatedCartItems,
  });

  localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
};