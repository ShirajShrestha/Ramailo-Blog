import { Outlet } from "react-router-dom";
import HeaderNav from "./components/Header";

const Layout = () => {
  return (
    <div>
      <HeaderNav />
      <Outlet />
    </div>
  );
};

export default Layout;
