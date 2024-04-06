import Button from "react-bootstrap/Button";
import { CartContext } from "../CartContext";
import { useContext } from "react";
import { getProductData } from "../productsStore";

function CartItem(props) {
  const cart = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const data = getProductData(id);

  return (
    <>
      <h3>{data.title}</h3>
      <p>{quantity} total</p>
      <p>£{ (quantity * data.price).toFixed(2) }</p>
      <Button className='cartRemove' onClick={() => cart.deleteFromCart(id)}>Remove</Button>
    </>
  )
}

export default CartItem;