import { useBlockedPostsQuery } from "../api/post";
import PostCard from "../components/PostCard";
import { Col, Container, Row } from "react-bootstrap";

const BlockedPosts = () => {
  const { data: posts } = useBlockedPostsQuery();

  return (
    <Container className="mt-4">
      <Row>
        {posts?.data?.map((post) => (
          <Col md={4} key={post._id} className="mb-4">
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BlockedPosts;
