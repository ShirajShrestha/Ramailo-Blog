import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Blog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/blog/${blogId}`
        );
        if (response.status === 200) {
          setBlog(response.data);
        } else {
          console.error("Failed to fetch blog");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  return (
    <>
      {blog ? (
        <>
          <div className="card-container">
            <div className="card" key={blog._id}>
              <div className="image"></div>
              <div className="content">
                <span className="title">{blog.title}</span>
                <p className="description">{blog.content}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p> Loading...</p>
      )}
    </>
  );
};

export default Blog;
