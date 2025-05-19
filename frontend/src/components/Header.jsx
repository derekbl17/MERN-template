import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Header() {
  const { logout, user } = useAuth();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            MERN Auth
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <>
                  <NavDropdown title={user.name} id="username">
                    {user.role === "admin" && (
                      <NavDropdown.Item as={NavLink} to="/admin/panel">
                        Admin Panel
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item as={NavLink} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/register">
                    <FaSignOutAlt /> Sign up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
