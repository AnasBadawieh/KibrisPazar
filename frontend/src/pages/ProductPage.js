import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { listProductDetails } from '../redux/actions/productActions';

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
        <Row>
          <Col md={6}>
            <Image src={imageUrl} alt={product.name} fluid />
            <Row className="mt-3">
              {product.images && product.images.map((img, index) => (
                <Col key={index} xs={3} md={2}>
                  <Image
                    src={`${process.env.REACT_APP_API_BASE_URL}${img}`}
                    alt={product.name}
                    fluid
                    onClick={() => handleImageClick(index)}
                    className="img-thumbnail"
                    style={{ cursor: 'pointer' }}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Button className="btn-block" type="button">
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductPage;