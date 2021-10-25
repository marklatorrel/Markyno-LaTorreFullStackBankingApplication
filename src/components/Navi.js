import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Navi.css";

export default function Navi() {
  const [error, setError] = useState("");
  const { currentUser, logout, user, getUserInfo } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Navbar className="color-nav" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/" id="home">
          Stratton Oakmont Bank
        </Navbar.Brand>

        <Nav className="me-auto">
          {!currentUser && (
            <Nav.Link as={Link} to="/signup/" id="signup">
              Create account
            </Nav.Link>
          )}

          {!currentUser && (
            <Nav.Link as={Link} to="/login/" id="login">
              Log In
            </Nav.Link>
          )}

          {currentUser && (
            <Nav.Link
              style={{ color: "#FFFFFF" }}
            >
             {user.name}
            </Nav.Link>
          )}
          {currentUser && (
            <Nav.Link
              as={Link}
              to="/logout/"
              id="logout"
              onClick={handleLogout}
            >
              Log out
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

