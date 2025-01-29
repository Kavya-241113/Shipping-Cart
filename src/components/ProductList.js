
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { Card, Button } from 'react-bootstrap';

const products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Smartphone', price: 800 },
  { id: 3, name: 'Tablet', price: 500 },
];

const ProductList = () => {
  const dispatch = useDispatch();

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-4">Products</h2>
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-3" key={product.id}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: ₹{product.price}</Card.Text>
                <Button
                  variant="success"
                  onClick={() => dispatch(addItem(product))}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
