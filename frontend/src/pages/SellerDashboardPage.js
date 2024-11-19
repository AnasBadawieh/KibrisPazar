import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../redux/actions/productActions';
import './SellerDashboardPage.css';

const SellerDashboardPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.productCreate || {});
  const { loading, success, error } = productCreate;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (image) {
      dispatch(createProduct({ name, price, countInStock, image, description }));
    } else {
      alert('Please upload an image');
    }
  };

  return (
    <div>
      <h1>Seller Dashboard</h1>
      {loading && <div>Loading...</div>}
      {success && <div>Product created successfully</div>}
      {error && <div>{error}</div>}
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
          <label>Image</label>
          <input
            type="file"
            id="image-file"
            label="Choose File"
            onChange={uploadFileHandler}
          />
          {uploading && <div>Uploading...</div>}
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default SellerDashboardPage;