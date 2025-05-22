import { Card, Button, Badge } from "react-bootstrap";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import { useLikePostMutation } from "../api/post";

const PostCard = ({ post }) => {
  const { user } = useAuth();
  const { mutate: likePost } = useLikePostMutation();

  const handleLike = () => {
    likePost(post._id);
  };

  return (
    <Card className="h-100">
      <div style={{ position: "relative" }}>
        <Card.Img
          variant="top"
          src={post.imageUrl}
          alt={post.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <button
          className="p-2 border-0 bg-transparent"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1,
            color: "white",
            fontSize: "1.5rem",
            transition: "all 0.3s ease",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
          onClick={handleLike}
        >
          {post.likes?.includes(user._id) ? (
            <FaHeart className="text-danger" />
          ) : (
            <FaRegHeart />
          )}
        </button>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h5">{post.title}</Card.Title>
        <Card.Text className="text-muted">
          {post.description.length > 100
            ? `${post.description.substring(0, 100)}...`
            : post.description}
        </Card.Text>
        <div className="mt-auto">
          <Badge bg="secondary" className="me-2">
            {post.category?.name || "Uncategorized"}
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
  );
};

export default PostCard;
