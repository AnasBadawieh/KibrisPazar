import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button, Image, Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../redux/actions/productActions';
import './SellerDashboardPage.css';
import dotenv from 'dotenv';
dotenv.config();

const SellerDashboardPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.productCreate || {});
  const { loading, success, error } = productCreate;

  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...files]);

    const previewFiles = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prevPreviewImages => [...prevPreviewImages, ...previewFiles]);

    // Reset the input field value
    e.target.value = null;
  };

  const handleImageDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    images.forEach(image => formData.append('images', image));

    try {
      const { data } = await axios.post(`${BASE_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.length === 0) {
        alert('Failed to upload images');
        setUploading(false);
        return;
      }

      dispatch(createProduct({
        name,
        price,
        description,
        countInStock,
        images: data // Use the directories returned from the upload API
      }));

      setUploading(false);
    } catch (error) {
      console.error('Failed to upload images', error);
      setUploading(false);
    }
  };

  return (
    <div className="seller-dashboard-container">
      <h2>Seller Dashboard</h2>
      <form onSubmit={handleSubmit} className="seller-dashboard-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="countInStock">Count In Stock</label>
          <input
            type="number"
            id="countInStock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image-file"
            label="Choose File"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className="form-control"
            ref={fileInputRef}
          />
          {uploading && <Spinner animation="border" />}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
      <Row className="mt-3">
        {previewImages.map((src, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <div className="position-relative">
              <Image src={src} alt={`Upload ${index + 1}`} fluid />
              <Button
                variant="danger"
                size="sm"
                className="position-absolute top-0 end-0 m-2"
                onClick={() => handleImageDelete(index)}
              >
                ×
              </Button>
            </div>
          </Col>
        ))}
      </Row>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {success && <div>Product Created Successfully</div>}
    </div>
  );
};

export default SellerDashboardPage;