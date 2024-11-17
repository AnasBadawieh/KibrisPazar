import {
  SELLER_CREATE_PRODUCT_REQUEST,
  SELLER_CREATE_PRODUCT_SUCCESS,
  SELLER_CREATE_PRODUCT_FAIL,
} from '../constants/sellerConstants';

export const sellerCreateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SELLER_CREATE_PRODUCT_REQUEST:
      return { loading: true };
    case SELLER_CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case SELLER_CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};