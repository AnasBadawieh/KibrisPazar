import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import ProductListPage from './pages/ProductListPage';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import PaymentPage from './pages/PaymentPage';
import ShippingPage from './pages/ShippingPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import SellerDashboardPage from './pages/SellerDashboardPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/cart/:id?" component={CartPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/products" component={ProductListPage} />
        <Route path="/order/:id" component={OrderPage} />
        <Route path="/orderhistory" component={OrderHistoryPage} />
        <Route path="/payment" component={PaymentPage} />
        <Route path="/shipping" component={ShippingPage} />
        <Route path="/paymentmethod" component={PaymentMethodPage} />
        <Route path="/seller/dashboard" component={SellerDashboardPage} />
      </Switch>
    </div>
  );
};

export default App;