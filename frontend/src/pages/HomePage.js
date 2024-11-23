import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div className="container">
      <h1>Products</h1>
      {loading ? (
        <Loader />

      ) : error ? (

        <Message variant="danger">{error}</Message>
      ) : (
        products.length === 0 && <Message variant="info">No products available currently</Message>)}
      {products && (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;