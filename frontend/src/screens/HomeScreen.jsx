import Hero from "../components/Hero";
import { useAuth } from "../context/authContext";
import PostsDisplay from "../components/PostsDisplay";

const HomeScreen = () => {
  const { user } = useAuth();
  if (!user) return <Hero />;
  return (
    <>
      <PostsDisplay />
    </>
  );
};

export default HomeScreen;
