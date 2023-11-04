import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layouts = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layouts;
