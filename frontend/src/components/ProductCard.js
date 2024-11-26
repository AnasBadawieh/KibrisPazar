import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const imageUrl = `${process.env.REACT_APP_API_BASE_URL}${product.images[0]}`;

  return (
    <Card className="my-3 p-3 rounded">
      <div className="image-container">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={imageUrl} variant="top" />
        </Link>
        {product.countInStock === 0 && (
          <Link to={`/product/${product._id}`} className="overlay">
            <div className="text">Empty Stock</div>
          </Link>
        )}
      </div>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;