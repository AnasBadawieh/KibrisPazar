import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import Header from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart/:id?" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/orderhistory" element={<OrderHistoryPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/paymentmethod" element={<PaymentMethodPage />} />
        <Route path="/seller/dashboard" element={<SellerDashboardPage />} />
      </Routes>
    </>
  );
};

export default App;