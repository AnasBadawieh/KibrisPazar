import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';
import Navbar from '../components/Navbar';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomePage = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Welcome to eBay Clone</h1>
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
    </div>
  );
};

export default HomePage;