import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React from "react";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const NavbarContent = () => {
  const navigate = useNavigate();
  const { setUserInfo, userInfo } = useContext(UserContext);

  function logoutUser() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo({});
    navigate("/");
  }

  const username = userInfo?.username;
  const blogText = username ? `${username}'s Blogs` : "All blogs";
  useEffect(() => {
    if (username) {
      fetch("http://localhost:4000/profile", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((userInfo) => {
          setUserInfo(userInfo);
        });
    }
  }, [username, setUserInfo]);
  return (
    <div className="navbar-mar">
      <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="logo">
          WanderWord
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              {username ? (
                <>
                  <Nav.Link as={Link} to="/create">
                    Create New Post
                  </Nav.Link>
                  <Nav.Link onClick={logoutUser}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarContent;
