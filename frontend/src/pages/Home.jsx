import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/card.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/blog/");
        if (response.status === 200) {
          if ("blogs" in response.data && Array.isArray(response.data.blogs)) {
            setBlogs(response.data.blogs);
          } else {
            console.error("Response data is not an array:", response.data);
          }
        } else {
          console.error("Failed to fetch blogs");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="card-container">
      {blogs.map((blog) => (
        <div className="card" key={blog._id}>
          <div className="image"></div>
          <div className="content">
            <a href="#">
              <span className="title">{blog.title}</span>
            </a>
            <p className="desc">{blog.content}</p>
            <Link to={`/blog/${blog._id}`} className="action">
              Find out more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
