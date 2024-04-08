import { Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { productsArray, queryProductData } from '../productsStore';
import ProductCard from '../components/ProductCard'

function HomePage() {

  const [productsArray, setProductsArray] = useState([]);

  useEffect(() => {
    queryProductData().then(data => {
      setProductsArray(data);
    }).catch(error => {
      console.error('Error fetching product data:', error);
    });
  }, []);

  // const data = queryProductData();
  // console.log(data);

  return (
    <>
      <h1 align="center" className="welcome">Welcome to the Ontogarment store</h1>
      <Row xs={1} md={3} className="rowStyle">
        {productsArray.map((product, index) => (
          <Col align="center" key={index}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomePage;
