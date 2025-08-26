import { Outlet, ScrollRestoration } from "react-router";
import Header from "../../components/Header/Header";
import { Container } from "@mui/material";

const LayoutPage = () => {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <Container
        maxWidth="sm"
        sx={{ minHeight: "calc(100vh - 64px)", display: "flow-root" }}>
        <Outlet />
      </Container>
    </>
  );
};
export default LayoutPage;
