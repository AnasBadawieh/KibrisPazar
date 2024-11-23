import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  const imageUrl = `${process.env.REACT_APP_API_BASE_URL}${product.images[0]}`;

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={imageUrl} variant="top" />
      </Link>
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