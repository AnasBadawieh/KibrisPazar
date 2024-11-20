import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
//import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Deep Web Market</h1>
      <h2>Products</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <div>
          {products.length === 0 ? (
            <Message variant="info">No Product For Sale YET!!</Message>
          ) : (
            products.map((product) => (
              <div key={product._id} className="product">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  
  return (
    <div className="product-card">
      <img 
        src={`${apiBaseUrl}${product.images[0]}`} // Prepend API base URL
        alt={product.name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/placeholder.png';
        }}
      />
      {/* Rest of product card content */}
    </div>
  );
};

export default HomePage;