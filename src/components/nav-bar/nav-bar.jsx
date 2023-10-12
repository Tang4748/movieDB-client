import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./nav-bar.scss";

function NavbarComponent() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary mb-5 fixed-top justify-content-end navbar-style "
    >
      <Container className="align-bottom align-items-end align-content-end align-self-end navbar-style">
        {/* <Navbar.Brand href="#home"> */}
        <img
          alt=""
          src={Img}
          width="300px"
          height=""
          className="d-inline-block align-top"
        />

        <Navbar.Brand className="align-bottom navbar-style">
          Archive
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-end">
            <Nav.Link href="/movies">Home</Nav.Link>
            <Nav.Link href="#link">Favorites</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;