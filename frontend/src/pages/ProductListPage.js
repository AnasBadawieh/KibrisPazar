import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';

const ProductListPage = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Products</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          {products.map((product) => (
            <div key={product._id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListPage;