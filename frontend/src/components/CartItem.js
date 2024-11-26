// CartItem.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCartItem } from '../redux/actions/cartActions';
import './CartItem.css';

const CartItem = ({ item, removeFromCartHandler }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Perform any necessary side effects when item updates
  }, [item]);

  const handleQtyChange = (e) => {
    const qty = Number(e.target.value);
    dispatch(updateCartItem(item.product, qty));
  };

  return (
    <div className="cart-item">
      <img src={`${process.env.REACT_APP_API_BASE_URL}${item.image}`} alt={item.name} />
      <Link to={`/product/${item.product}`}>{item.name}</Link>
      <p>${item.price * item.qty}</p>
      <select value={item.qty} onChange={handleQtyChange}>
        {[...Array(item.countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button onClick={() => removeFromCartHandler(item.product)}>Remove</button>
    </div>
  );
};

export default CartItem;