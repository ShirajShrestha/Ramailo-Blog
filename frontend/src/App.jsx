import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./Layout";
import Blog from "./pages/Blog";
import AddBlog from "./pages/AddBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blog/:blogId" element={<Blog />} />
            <Route path="/create" element={<AddBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
