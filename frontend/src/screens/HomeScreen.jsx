import Hero from "../components/Hero";
import { useAuth } from "../context/authContext";
import PostsDisplay from "../components/PostsDisplay";

const HomeScreen = () => {
  const { user } = useAuth();
  if (!user) return <Hero />;
  return (
    <>
      <h2>Welcome back, {user.name}!</h2>
      <PostsDisplay />
    </>
  );
};

export default HomeScreen;
