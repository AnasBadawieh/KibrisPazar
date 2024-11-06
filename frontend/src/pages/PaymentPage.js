import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { createOrder } from '../redux/actions/orderActions';

const stripePromise = loadStripe('your-publishable-key-here');

const PaymentForm = ({ history }) => {
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success, order]);

  useEffect(() => {
    const getClientSecret = async () => {
      const { data } = await axios.post('/api/payment/process', {
        amount: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0) * 100,
      });
      setClientSecret(data.clientSecret);
    };

    getClientSecret();
  }, [cartItems]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      console.error(error);
    } else {
      console.log('Payment successful:', paymentIntent);
      dispatch(createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const PaymentPage = ({ history }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm history={history} />
    </Elements>
  );
};

export default PaymentPage;