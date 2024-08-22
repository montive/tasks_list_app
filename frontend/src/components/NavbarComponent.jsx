import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavbarComponent() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img src="/push-pin.png" alt="" width="30" height="30" />
                    Tasks List
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/*<Nav.Link href="#home">Home</Nav.Link>*/}
                    </Nav>
                    <Nav>
                        {/*<NavDropdown title="User" id="basic-nav-dropdown">*/}
                        {/*    <NavDropdown.Item href="/user">*/}
                        {/*        Info*/}
                        {/*    </NavDropdown.Item>*/}
                        {/*    <NavDropdown.Divider />*/}
                        {/*    <NavDropdown.Item href="">Log Out</NavDropdown.Item>*/}
                        {/*</NavDropdown>{" "}*/}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
