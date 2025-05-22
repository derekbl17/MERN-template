import { Container, Row, Col } from "react-bootstrap";
import { useLikedPostsQuery } from "../api/post";
import PostCard from "../components/PostCard";

const LikesScreen = () => {
  const { data: likedPosts, isLoading, error } = useLikedPostsQuery();
  console.log(likedPosts);
  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <Container className="mt-4">
        <div className="alert alert-danger">
          Error loading posts: {error.message}
        </div>
      </Container>
    );

  return (
    <Container className="mt-4">
      <Row>
        {likedPosts.data?.map((post) => (
          <Col md={4} key={post._id} className="mb-4">
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default LikesScreen;
