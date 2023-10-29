import React from "react";
import {
  Navbar,
  Container
} from 'react-bootstrap';

const NavbarComponent = () => {
  return (
    <Navbar variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <strong>Kasir</strong> Kita
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
