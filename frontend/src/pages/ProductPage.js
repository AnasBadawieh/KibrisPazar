import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { listProductDetails } from '../redux/actions/productActions';
import './ProductPage.css'; // Import the CSS file for custom styling

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const imageUrl = product && product.images && product.images.length > 0 
    ? `${process.env.REACT_APP_API_BASE_URL}${product.images[selectedImageIndex]}` 
    : '';

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className="product-details-container">
          <div className="parent-container">
            <Image src={imageUrl} alt={product.name} fluid className="main-image" />
            <div className="thumbnail-container">
              {product.images && product.images.map((img, index) => (
                <Image
                  key={index}
                  src={`${process.env.REACT_APP_API_BASE_URL}${img}`}
                  alt={product.name}
                  fluid
                  onClick={() => handleImageClick(index)}
                  className={`img-thumbnail ${selectedImageIndex === index ? 'selected-thumbnail' : ''}`}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>
          <div className="product-details">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <button className="add-to-cart-button">
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;