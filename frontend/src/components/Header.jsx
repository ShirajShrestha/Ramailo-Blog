import { Link } from "react-router-dom";
import "../styles/navbar.css";

const header = ({ userId }) => {
  const isAuthenticated = !!userId;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">Logo</Link>
        </div>
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <Link to="/blog">Blog</Link>
              <Link to="/my-blogs">My Blogs</Link>
              <Link to="/logout">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/create">Add Blog</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default header;
