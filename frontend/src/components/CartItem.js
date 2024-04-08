import Button from 'react-bootstrap/Button';
import { CartContext } from '../CartContext';
import { useContext, useState, useEffect } from 'react';
import { getProductData } from '../productsStore';

function CartItem(props) {
  const cart = useContext(CartContext);
  const [productData, setProductData] = useState(null);
  const { id, quantity } = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductData(id);
        setProductData(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h3>{productData.title}</h3>
      <p>{quantity} total</p>
      <p>£{(quantity * productData.price).toFixed(2)}</p>
      <Button className='cartRemove' onClick={() => cart.deleteFromCart(id)}>
        Remove
      </Button>
    </>
  );
}

export default CartItem;
