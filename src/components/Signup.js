import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Row } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { googleProvider } from "../config/authMethods";

export default function Signup() {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, socialMediaLogIn } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  async function handleOnClick(provider) {
    try {
      setError("");
      setLoading(true);
      const res = await socialMediaLogIn(provider);
      console.log(res);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
  }

  return (
    <>
      <Container
        className=" align-items-center justify-content-center"
        style={{ marginTop: "50px" }}
      >
        <Row className="justify-content-center">
          <Card style={{ minWidth: "300px" }}>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              <Button
                disabled={loading}
                onClick={() => handleOnClick(googleProvider)}
                className="w-100"
                type="submit"
              >
                Sign up with Google
              </Button>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" ref={nameRef} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>

      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
