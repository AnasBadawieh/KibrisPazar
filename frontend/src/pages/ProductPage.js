import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    history.push('/cart');
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <div>
            <label>Quantity</label>
            <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
          </div>
          <button onClick={addToCartHandler}>Add to Cart</button>
          <h2>Reviews</h2>
          {product.reviews.length === 0 ? (
            <Message variant="info">No Reviews</Message>
          ) : (
            product.reviews.map((review) => (
              <div key={review._id}>
                <strong>{review.name}</strong>
                <p>{review.rating} stars</p>
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPage;