import { Modal, Button, Form, Badge, ListGroup } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useEditPostMutation } from "../api/post";
import { toast } from "react-toastify";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
} from "../api/comment";

const PostModal = ({ show, onHide, post, img }) => {
  const { user } = useAuth();
  const isAuthor = user?._id === post?.author?._id;

  const { mutateAsync: createComment } = useCreateCommentMutation();
  const { mutateAsync: deleteComment } = useDeleteCommentMutation();
  const [commentContent, setCommentContent] = useState("");

  const { mutateAsync: updatePost } = useEditPostMutation();
  const [isEditing, setIsEditing] = useState(false);

  const [editedData, setEditedData] = useState({
    postId: post._id,
    title: post.title,
    description: post.description,
    imageUrl: post.imageUrl,
    price: parseFloat(post.price?.$numberDecimal).toFixed(2) || 0,
    category: post.category,
  });

  const handleDeleteComment = async (commentId) => {
    deleteComment(commentId, {
      onSuccess: () => {
        toast.success("comment removed");
      },
    });
  };

  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      await createComment({
        postId: post._id,
        content: commentContent,
      });
      toast.success("Comment added successfully");
      setCommentContent("");
      // You might want to refresh comments here or use optimistic updates
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const handleChange = (field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    console.log(editedData);
    updatePost(editedData, {
      onSuccess: () => {
        toast.success("Post updated successfully");
        setIsEditing(false);
      },
      onError: () => {
        toast.error("Failed to update post!");
      },
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit Post" : post.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={img} alt={post.title} className="img-fluid rounded mb-3" />

        <div className="mb-3">
          <Badge bg="secondary" className="me-2">
            {post.category?.name || "Uncategorized"}
          </Badge>
          <Badge bg="info">{post.likes?.length || 0} Likes</Badge>
        </div>

        {isEditing ? (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editedData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={editedData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={editedData.imageUrl}
                onChange={(e) => handleChange("imageUrl", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={editedData.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </Form.Group>

            <Button variant="success" onClick={handleSave}>
              Save Changes
            </Button>
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </Form>
        ) : (
          <>
            <p>{parseFloat(post.price?.$numberDecimal).toFixed(2)} eur</p>
            <p>{post.description}</p>
            {isAuthor && (
              <Button
                variant="outline-primary"
                onClick={() => setIsEditing(true)}
              >
                Edit Post
              </Button>
            )}
            {/* Comments Section */}
            <div className="mt-4">
              <h5>Comments</h5>

              {/* Comments List */}
              {post.comments?.length > 0 ? (
                <ListGroup className="mb-3">
                  {post.comments.map((comment) => (
                    <ListGroup.Item key={comment._id}>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <div className="d-flex align-items-center">
                          <strong className="me-2">
                            {comment.author?.name || "Anonymous"}
                          </strong>
                          {(user?._id === comment.author?._id || isAuthor) && (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDeleteComment(comment._id)}
                              className="py-0 px-1"
                            >
                              Delete
                            </Button>
                          )}
                        </div>
                        <small className="text-muted">
                          {new Date(comment.createdAt).toLocaleString()}
                        </small>
                      </div>
                      <p className="mb-0">{comment.content}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-muted">No comments yet</p>
              )}

              {/* Add Comment Form */}
              <Form.Group className="mb-3">
                <Form.Label>Add a comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="Write your comment here..."
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleCommentSubmit}
                disabled={!commentContent.trim()}
              >
                Post Comment
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PostModal;
