import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, Button, Container } from "react-bootstrap";

class EMR extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Row className="mt-5 justify-content-center">
          <Col sm={6} md={4}>
            <Card
              className={" dashboard-card light-blue"}
              style={{ cursor: "pointer" }}
              onClick={() => {
                this.props.history.push(
                  `${
                    this.props.history.location.pathname
                  }/${"search"}`
                );
              }}
            >
              <Card.Body>
                <Card.Title>Your Patients</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  View all patients you are curruntly treating.
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mt-3 mt-md-0">
            <Card
              className={" dashboard-card shadow"}
              style={{ cursor: "pointer" }}
              onClick={() => {
                this.props.history.push(
                  `${
                    this.props.history.location.pathname
                  }/Futureappointements/${"future"}`
                );
              }}
            >
              <Card.Body>
                <Card.Title>Future Appointements</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Get all your Future appointements details.
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mt-3 mt-md-0">
            <Card
              className={" dashboard-card green"}
              style={{ cursor: "pointer" }}
              onClick={() => {
                this.props.history.push(
                  `${
                    this.props.history.location.pathname
                  }/currentAppointements/${"current"}`
                );
              }}
            >
              <Card.Body>
                <Card.Title>Current Appointements</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Get all your current appointements details.
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EMR;
