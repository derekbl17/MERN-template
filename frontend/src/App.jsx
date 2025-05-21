import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import { useAuth } from "./context/authContext";

function App() {
  const { user, isLoading, isError } = useAuth();

  if (isLoading) return <Loader />;

  return (
    <div className="min-vh-100 bg-dark text-light font-monospace">
      <Header />
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
