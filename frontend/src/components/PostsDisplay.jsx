import React from "react";
import { usePostsQuery } from "../api/post";
import { Card, Container, Row, Col, Button, Badge } from "react-bootstrap";

const PostsDisplay = () => {
  const { data: posts, isLoading, error } = usePostsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <Container className="mt-4">
        <div className="alert alert-danger">
          Error loading posts: {error.message}
        </div>
      </Container>
    );

  console.log(posts);

  return (
    <Container className="mt-4">
      <Row>
        {posts.data?.map((post) => (
          <Col md={4} key={post._id} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={post.imageUrl}
                alt={post.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title as="h5">{post.title}</Card.Title>
                <Card.Text className="text-muted">
                  {post.description.length > 100
                    ? `${post.description.substring(0, 100)}...`
                    : post.description}
                </Card.Text>
                <div className="mt-auto">
                  <Badge bg="secondary" className="me-2">
                    {post.category.name || "Uncategorized"}
                  </Badge>
                  <Badge bg="info">{post.likes?.length || 0} Likes</Badge>
                </div>
              </Card.Body>
              <Card.Footer className="text-muted">
                <small>
                  Posted by {post.author?.name} on {post.createdAt}
                </small>
              </Card.Footer>
              <Card.Footer>
                <Button variant="primary" size="sm" className="me-2">
                  View Post
                </Button>
                <Button variant="outline-secondary" size="sm">
                  Comments ({post.comments?.length || 0})
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PostsDisplay;
