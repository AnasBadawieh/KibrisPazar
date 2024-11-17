import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './CartPage.css';

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
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/">Go Back</Link>
          </div>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.product} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <Link to={`/product/${item.product}`}>
                    <h3>{item.name}</h3>
                  </Link>
                  <p>${item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <select
                    value={item.qty}
                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => removeFromCartHandler(item.product)}>Remove</button>
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h2>
              <p>
                Total: $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>
              <button onClick={checkoutHandler}>Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;