import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-secondary w-75 text-light">
          <h1 className="text-center mb-4">Poster</h1>
          <p className="text-center mb-4">
            You must be logged in to view posts
          </p>
          <div className="d-flex">
            <Button variant="primary" as={Link} to="/login" className="me-3">
              Sign In
            </Button>
            <Button variant="primary" as={Link} to="/register">
              Register
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
