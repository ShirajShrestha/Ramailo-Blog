import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/addBlog.css";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    tags: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/blog",
        formData
      );
      console.log(response.data);
      setFormData({
        title: "",
        content: "",
        author: "",
        category: "",
        tags: "",
      });
      alert("Blog added successfully");
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Failed to add blog");
    }
  };

  return (
    <div className="add-blog-container">
      <h2 className="add-blog-title">Add Blog</h2>
      <form className="add-blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Content:
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            className="form-textarea"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="author" className="form-label">
            Author:
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            className="form-select"
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tags" className="form-label">
            Tags:
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            className="form-input"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
