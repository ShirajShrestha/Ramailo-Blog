import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/register.css";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/user/login",
  //       formData
  //     );

  //     if (response.status === 200) {
  //       console.log("Login successful");
  //       navigate("/");
  //     } else {
  //       console.error("Login failed");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        formData
      );
      console.log("Response:", response);
      if (response.status === 200) {
        console.log("Login successful");
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-form-wrapper">
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">Login</span>
          <span className="subtitle">
            Welcome back. Enter your credentials to log in.
          </span>
          <div className="form-container">
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
          <button type="submit">Login</button>
        </form>
        <div className="form-section">
          <p>Don&apos;t have an account?</p>{" "}
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
