import { Button, Container, Navbar, Modal } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { CartContext } from '../CartContext';
import CartItem from './CartItem';

function NavbarComponent() {
  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const count = cart.items.reduce((sum, product) => sum + product.quantity, 0);

  const checkout = async () => {
    await fetch('http://localhost:4000/checkout', {
      method: "POST",
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({items: cart.items}),
    }).then((response) => {
      return response.json();
    }).then((response) => {
      if (response.url) {
        window.location.assign(response.url); // Allows user to checkout with stripe
      }
    });
  }

  return (
    <>
      <Navbar expand='sm'>
        <Navbar.Brand href='/'>Ontogarment Store</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Button onClick={handleShow}>Cart ({count} Items)</Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {count > 0 ? (
            <>
              <p>Items in your shopping cart:</p>
              {cart.items.map((currentProduct, index) => (
                <CartItem key={index} id={currentProduct.id} quantity={currentProduct.quantity} />
              ))}

              <h1>Total: £{cart.getTotalCost().toFixed(2)}</h1>

              <Button variant="success" onClick={checkout}>
                Confirm Order
              </Button>
            </>
          ) : (
            <h1>There are no items in the cart!</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarComponent;
