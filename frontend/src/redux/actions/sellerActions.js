import axios from 'axios';
import {
  SELLER_CREATE_PRODUCT_REQUEST,
  SELLER_CREATE_PRODUCT_SUCCESS,
  SELLER_CREATE_PRODUCT_FAIL,
} from '../constants/sellerConstants';
import API_BASE_URL from '../../config';

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: SELLER_CREATE_PRODUCT_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${API_BASE_URL}/api/seller/products`, product, config);

    dispatch({ type: SELLER_CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SELLER_CREATE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};