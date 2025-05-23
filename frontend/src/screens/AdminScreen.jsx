import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AdminCategories from "./AdminCategories";
import AdminUserList from "./AdminUserList";

const AdminScreen = () => {
  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h1 className="mb-4">Manage Categories</h1>
              <AdminCategories />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <h1 className="mb-4">Manage Users</h1>
              <AdminUserList />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminScreen;
