import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import Navbar from '../components/Navbar';
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
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
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
              <div key={item.product}>
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <span>{item.qty}</span>
                <button onClick={() => removeFromCartHandler(item.product)}>Remove</button>
              </div>
            ))}
            <button onClick={checkoutHandler}>Proceed To Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;