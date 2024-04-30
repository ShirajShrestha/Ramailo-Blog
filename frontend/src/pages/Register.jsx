import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        formData
      );

      if (response.status === 200) {
        console.log("Registration successful");
        navigate("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-form-wrapper">
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">Register</span>
          <span className="subtitle">
            Create a free account with your email.
          </span>
          <div className="form-container">
            <input
              type="text"
              className="input"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="form-section">
          <p>Have an account?</p> <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
