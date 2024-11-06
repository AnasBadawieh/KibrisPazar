import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../redux/actions/cartActions';

const PaymentMethodPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/payment');
  };

  return (
    <div>
      <h1>Payment Method</h1>
      <form onSubmit={submitHandler}>
        <div>
          <input
            type="radio"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="PayPal">PayPal</label>
        </div>
        <div>
          <input
            type="radio"
            id="Stripe"
            name="paymentMethod"
            value="Stripe"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="Stripe">Stripe</label>
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default PaymentMethodPage;