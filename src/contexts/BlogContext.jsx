import { createContext, useContext, useState, useEffect } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/blogPosts.json")
      .then((response) => response.json())
      .then((jsonData) => setPosts(jsonData.posts))
      .catch((error) => console.error("Error al obtener los posts:", error));
  }, []);

  return (
    <BlogContext.Provider value={{ posts }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
