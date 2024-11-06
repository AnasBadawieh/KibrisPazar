import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Your cart is empty <Link to="/">Go Back</Link>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.product}>
              <Link to={`/product/${item.product}`}>{item.name}</Link>
              <p>${item.price}</p>
              <p>Qty: {item.qty}</p>
              <button onClick={() => removeFromCartHandler(item.product)}>Remove</button>
            </div>
          ))}
          <button onClick={checkoutHandler}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;