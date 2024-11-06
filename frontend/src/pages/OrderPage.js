import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../redux/actions/orderActions';

const OrderPage = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h1>Order {order._id}</h1>
          <p>Name: {order.user.name}</p>
          <p>Email: {order.user.email}</p>
          <p>Address: {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
          <p>Payment Method: {order.paymentMethod}</p>
          <p>Items:</p>
          {order.orderItems.map((item, index) => (
            <div key={index}>
              <p>{item.name}</p>
              <p>Qty: {item.qty}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))}
          <p>Total Price: ${order.totalPrice}</p>
        </div>
      )}
    </div>
  );
};

export default OrderPage;