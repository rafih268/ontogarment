import { Row, Col } from 'react-bootstrap';
import { productsArray } from '../productsStore';
import ProductCard from '../components/ProductCard'

function HomePage() {
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
