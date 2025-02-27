import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Cart } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import "../App.css"

const categories = [
  'Beauty', 'Fragrances', 'Furniture', 'Groceries',
  'Laptops', 'Motorcycle', 'Smartphones',
  'Sunglasses', 'Tablets', 'Tops', 'Vehicle'
];

const Navbarcomponent = () => {
  const cart = useSelector((state) => state.products.cart);
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar expand="lg" className="bg-dark text-white mb-3 fixed-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className='text-white'>Babai Shopping</Navbar.Brand>
        <div className="d-flex justify-content-end">
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
        </div>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          className="bg-dark text-white"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
              <NavDropdown title="Categories" id="navbarScrollingDropdown" className="dropdown-title">
                {categories.map((category) => (
                  <NavDropdown.Item
                    as={Link}
                    key={category}
                    to={`/products/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-dark"
                  >
                    {category}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              <Nav.Link as={Link} to='/cart' className="position-relative text-white">
                <Cart size={24} aria-label="Cart" />
                {totalItemsInCart > 0 && ( 
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItemsInCart}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                )}
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Navbarcomponent;
