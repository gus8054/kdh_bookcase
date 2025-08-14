import { Box } from "@mui/material";
import Logo from "../../../Logo/Logo";

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: "2rem",
      }}>
      <Box
        sx={(theme) => ({
          height: "4rem",
          px: "2rem",
          py: "1rem",
          bgcolor: theme.palette.primary.main,
          borderRadius: theme.shape.borderRadius,
        })}>
        <Logo />
      </Box>
    </Box>
  );
};
export default Header;
