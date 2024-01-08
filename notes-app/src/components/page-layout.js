import React from "react";
import NavBar from "./navbar/navbar";
import { Container, Row, Col } from "reactstrap";

export const PageLayout = ({ children }) => {
  return (
    <>
      <Container fluid style={{ height: '100vh', fontFamily: 'Space Grotesk' }}>
        <Row>
          <Col className="bg-light border"><NavBar /></Col>
        </Row>
        <Row style={{ height: '100%' }}>
          <Col className="bg-light border">
            {children}
          </Col>
        </Row>

      </Container>
    </>
  );
};
