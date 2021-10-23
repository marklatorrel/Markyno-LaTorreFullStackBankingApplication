import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
  Row,
  Container,
  Col,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { db } from "../firebase";

export default function Withdraw() {
  const [value, setValue] = useState(0);
  const { currentUser, user, setUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    if (value > user.balance) {
      alert("Insufficient money");
      return;
    } else if (isNaN(value)) {
      alert("Write numbers only");
      return;
    } else if (value < 0) {
      alert("Write positive numbers only");
      return;
    }
    let newBalance = user.balance - parseInt(value);
    db.collection("users").doc(currentUser.uid).update({
      balance: newBalance,
    });

    setUser((user) => ({
      ...user,
      balance: newBalance
    }));

    alert("Succesfull Withdraw");
  };

  return (
    <div>
      <Row xs={1} md={2} className="g-4">
        <Col md={4}>
          <Container
            className="align-items-center justify-content-center"
            style={{ marginTop: "40px" }}
          >
            <Container
              style={{
                border: "2px solid gray",
                marginTop: "40px",
                backgroundColor: "#CFCCC8",
                borderRadius: 10,
              }}
            >
              <Row
                className="align-items-center justify-content-center"
                style={{ marginTop: "20px" }}
              >
                <h6>Your current balance is</h6>
              </Row>
              <Row className="align-items-center justify-content-center">
                <h3>${user.balance}</h3>
              </Row>
              <Row className="align-items-center justify-content-center">
                <b>{user.rewardPoints} reward points </b>
              </Row>
              <Row
                className="align-items-center justify-content-center"
                style={{
                  marginBottom: "15px",
                }}
              >
                <p>USD account number: {user.accountNumber} </p>
              </Row>
            </Container>
          </Container>{" "}
        </Col>
        <Col md={8}>
          <Container
            className=" align-items-center justify-content-center"
            style={{ minHeight: "10vh" }}
          >
            <Col style={{ marginTop: "40px" }}>
              <Link to="/">Regresar</Link>
            </Col>
            <Col>
              <Card
                className="w-100"
                style={{
                  minWidth: "400px",
                  marginTop: "10px",
                }}
              >
                <Card.Header>Withdraw</Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>
                        ¿How much would you like to withdraw?
                      </Form.Label>
                      <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                        <FormControl
                          type="text"
                          className="input"
                          placeholder="Add an amount"
                          onChange={(e) => setValue(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Withdraw
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
