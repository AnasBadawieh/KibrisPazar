import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../redux/actions/sellerActions';
import Navbar from '../components/Navbar';
import './SellerDashboardPage.css';

const SellerDashboardPage = ({ history }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const sellerCreateProduct = useSelector((state) => state.sellerCreateProduct);
  const { loading, error, success } = sellerCreateProduct;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct({ name, description, price, countInStock, image }));
  };

  return (
    <div>
      <div className="seller-dashboard-container">
        <h1>Seller Dashboard</h1>
        {error && <div>{error}</div>}
        {loading && <div>Loading...</div>}
        {success && <div>Product created successfully</div>}
        <form onSubmit={submitHandler}>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              placeholder="Enter product description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter product price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Count In Stock</label>
            <input
              type="number"
              placeholder="Enter count in stock"
              value={countInStock}
              onChange={(e) => setCountInStock(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Image URL</label>
            <input
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <button type="submit">Create Product</button>
        </form>
      </div>
    </div>
  );
};

export default SellerDashboardPage;