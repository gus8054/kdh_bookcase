import { Outlet } from "react-router";
import Header from "../Header/Header";
const LayoutPage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default LayoutPage;
