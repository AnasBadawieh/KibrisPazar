import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import Navbar from '../components/Navbar';
import CartItem from '../components/CartItem';
import './CartPage.css';

const CartPage = () => {
  const { id: productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const qty = location.search ? Number(new URLSearchParams(location.search).get('qty')) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // Remove from database
    dispatch(removeFromCart(id));
    // Remove from local storage
    const updatedCartItems = cartItems.filter(item => item.product !== id);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const clearLocalStorageCart = () => {
    localStorage.removeItem('cartItems');
    window.location.reload(); // Reload the page to reflect changes
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.qty), 0);

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div>
              Your cart is empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            <div>
              <button onClick={clearLocalStorageCart}>Clear Cart from Local Storage</button>
              {cartItems.map((item) => (
                <CartItem key={item.product} item={item} removeFromCartHandler={removeFromCartHandler} />
              ))}
              <div>
                <h2>Total: ${totalPrice.toFixed(2)}</h2>
                <button onClick={checkoutHandler} disabled={cartItems.length === 0}>Proceed to Checkout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;