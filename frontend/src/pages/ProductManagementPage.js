import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, createProduct, updateProduct, deleteProduct } from '../redux/actions/productActions';
import Navbar from '../components/Navbar';
import './ProductManagementPage.css';

const ProductManagementPage = ({ history }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const { success: successCreate } = productCreate;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState('');

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successCreate, successUpdate, successDelete]);

  const createProductHandler = () => {
    dispatch(createProduct({ name, description, price, countInStock, image }));
  };

  const updateProductHandler = (id) => {
    dispatch(updateProduct({ id, name, description, price, countInStock, image }));
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
      <Navbar />
      <div className="product-management-container">
        <h1>Product Management</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div>
            <div className="product-form">
              <h2>Create Product</h2>
              <form onSubmit={createProductHandler}>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Description</label>
                  <input
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Enter price"
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
            <div className="product-list">
              <h2>Products</h2>
              {products.map((product) => (
                <div key={product._id} className="product-item">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                  <p>Stock: {product.countInStock}</p>
                  <button onClick={() => updateProductHandler(product._id)}>Update</button>
                  <button onClick={() => deleteProductHandler(product._id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagementPage;