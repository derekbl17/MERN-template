import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaCog,
  FaBan,
  FaUserCircle,
  FaUserPlus,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import PosterImg from "../assets/Poster.png";

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
    // <header>
    //   <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
    //     <Container>
    //       <Navbar.Brand as={NavLink} to="/">
    //         <img src={PosterImg} alt="Poster" />
    //       </Navbar.Brand>
    //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //       <Navbar.Collapse id="basic-navbar-nav">
    //         <Nav className="ms-auto">
    //           {user ? (
    //             <>
    //               <Nav.Link as={NavLink} to="/new-post">
    //                 New post
    //               </Nav.Link>
    //               <Nav.Link as={NavLink} to="/my-posts">
    //                 My Posts
    //               </Nav.Link>
    //               <Nav.Link as={NavLink} to="/liked">
    //                 Liked posts
    //               </Nav.Link>
    //               <NavDropdown
    //                 title={user.name}
    //                 id="username"
    //                 align="end"
    //                 className="hover-bg-primary-dark"
    //               >
    //                 {user.role === "admin" && (
    //                   <>
    //                     <NavDropdown.Item as={NavLink} to="/admin/panel">
    //                       Admin Panel
    //                     </NavDropdown.Item>
    //                     <NavDropdown.Item as={NavLink} to="/admin/blocked">
    //                       Blocked Posts
    //                     </NavDropdown.Item>
    //                   </>
    //                 )}
    //                 <NavDropdown.Item as={NavLink} to="/profile">
    //                   Profile
    //                 </NavDropdown.Item>
    //                 <NavDropdown.Item onClick={logoutHandler}>
    //                   Logout
    //                 </NavDropdown.Item>
    //               </NavDropdown>
    //             </>
    //           ) : (
    //             <>
    //               <Nav.Link as={NavLink} to="/login">
    //                 <FaSignInAlt /> Sign In
    //               </Nav.Link>
    //               <Nav.Link as={NavLink} to="/register">
    //                 <FaSignOutAlt /> Sign up
    //               </Nav.Link>
    //             </>
    //           )}
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    // </header>
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand
            as={NavLink}
            to="/"
            className="d-flex align-items-center"
          >
            <img
              src={PosterImg}
              alt="Poster"
              style={{ height: "40px" }} // Control image size
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              {user ? (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/new-post"
                    className="px-3 py-2 hover-bg-primary-dark"
                  >
                    New Post
                  </Nav.Link>

                  <Nav.Link
                    as={NavLink}
                    to="/my-posts"
                    className="px-3 py-2 hover-bg-primary-dark"
                  >
                    My Posts
                  </Nav.Link>

                  <Nav.Link
                    as={NavLink}
                    to="/liked"
                    className="px-3 py-2 hover-bg-primary-dark"
                  >
                    Liked Posts
                  </Nav.Link>

                  <NavDropdown
                    title={
                      <>
                        <FaUser /> {user.name}
                      </>
                    }
                    id="user-dropdown"
                    align="end"
                    className="hover-bg-primary-dark"
                  >
                    {user.role === "admin" && (
                      <>
                        <NavDropdown.Item
                          as={NavLink}
                          to="/admin/panel"
                          className="dropdown-item-hover"
                        >
                          <FaCog /> Admin Panel
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={NavLink}
                          to="/admin/blocked"
                          className="dropdown-item-hover"
                        >
                          <FaBan /> Blocked Posts
                        </NavDropdown.Item>
                      </>
                    )}
                    <NavDropdown.Item
                      as={NavLink}
                      to="/profile"
                      className="dropdown-item-hover"
                    >
                      <FaUserCircle /> Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={logoutHandler}
                      className="dropdown-item-hover text-danger"
                    >
                      <FaSignOutAlt /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/login"
                    className="px-3 py-2 hover-bg-primary-dark"
                  >
                    <FaSignInAlt className="me-1" /> Sign In
                  </Nav.Link>

                  <Nav.Link
                    as={NavLink}
                    to="/register"
                    className="px-3 py-2 hover-bg-primary-dark"
                  >
                    <FaUserPlus className="me-1" /> Sign Up
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
