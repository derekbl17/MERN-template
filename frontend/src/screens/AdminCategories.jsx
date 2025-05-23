import React, { useState } from "react";
import {
  Form,
  Button,
  Alert,
  Spinner,
  Row,
  Col,
  Container,
  Card,
} from "react-bootstrap";
import {
  useCreateCategoryMutation,
  useCategoriesQuery,
  useDeleteCategoryMutation,
} from "../api/category";
import { toast } from "react-toastify";

const AdminCategories = () => {
  const { mutateAsync } = useCreateCategoryMutation();
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useCategoriesQuery();
  const { mutateAsync: deleteCategory } = useDeleteCategoryMutation();

  const [data, setData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutateAsync(data, {
      onSuccess: () => {
        setData({
          name: "",
        });
        toast.success("New category added!");
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "failed to add a category");
      },
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    deleteCategory(e.target.value, {
      onSuccess: () => {
        toast.success("Category removed");
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Failed to remove category");
      },
    });
  };

  return (
    <Container className="mt-4">
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row className="align-items-center">
          <Col sm={8}>
            <Form.Control
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter category name"
              required
            />
          </Col>
          <Col sm={4}>
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

      <Row>
        {categories?.map((cat) => (
          <Col sm={6} md={4} key={cat._id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{cat.name}</Card.Title>
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  value={cat._id}
                  size="sm"
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminCategories;
