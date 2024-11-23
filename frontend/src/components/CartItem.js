// CartItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CartItem.css';

const CartItem = ({ item, removeFromCartHandler }) => {
  return (
    <div className="cart-item">
      <img src={`${process.env.REACT_APP_API_BASE_URL}${item.image}`} alt={item.name} />
      <Link to={`/product/${item.product}`}>{item.name}</Link>
      <p>${item.price}</p>
      <button onClick={() => removeFromCartHandler(item.product)}>Remove</button>
    </div>
  );
};

export default CartItem;