import React, { useEffect } from "react";
import {
  Card,
  Button,
  Row,
  Alert,
  Container,
  Col,
  CardGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import depositImage from "../images/deposit.png";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const {user, getUserInfo } = useAuth();

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <Row xs={1} md={2} className="g-4">
        <Col md={5}>
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
                <h6> Your current balance is</h6>
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
        <Col md={7}>
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "15vh" }}
          >
            <h4>Welcome {user.name}, what do you want to do today?</h4>
          </Container>

          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "10vh" }}
          >
            <CardGroup>
              <Col>
                <Card border="success">
                  <Card.Img variant="top" src={depositImage} />
                  <Card.Body>
                    <Link to="/deposit">
                      <Button variant="success">Deposit money</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card border="danger">
                  <Card.Img variant="top" src={depositImage} />
                  <Card.Body>
                    <Link to="/withdraw">
                      <Button variant="danger">Withdraw money</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card border="secondary">
                  <Card.Img variant="top" src={depositImage} />
                  <Card.Body>
                    <Link to="/accountHistory">
                      <Button variant="secondary">See account history</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card border="primary">
                  <Card.Img variant="top" src={depositImage} />
                  <Card.Body>
                    <Button variant="primary">See reward points</Button>
                  </Card.Body>
                </Card>
              </Col>
            </CardGroup>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
