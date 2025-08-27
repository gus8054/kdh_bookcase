import { Outlet, ScrollRestoration } from "react-router";
import Header from "../../components/Header/Header";
import { Container } from "@mui/material";
import Footer from "../../components/Footer/Footer";

const LayoutPage = () => {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "calc(100vh - 153px)",
          display: "flow-root",
          py: "4rem",
        }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};
export default LayoutPage;
