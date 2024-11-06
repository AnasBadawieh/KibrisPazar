import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../redux/actions/orderActions';

const OrderHistoryPage = ({ history }) => {
  const dispatch = useDispatch();

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      dispatch(listMyOrders());
    }
  }, [dispatch, history, userInfo]);

  return (
    <div>
      <h1>My Orders</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id}>
              <p>Order ID: {order._id}</p>
              <p>Total Price: ${order.totalPrice}</p>
              <p>Paid: {order.isPaid ? 'Yes' : 'No'}</p>
              <p>Delivered: {order.isDelivered ? 'Yes' : 'No'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;