import { Button } from "@mui/material";
import LogoImage from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Button
      sx={{
        display: { xs: "none", sm: "block" },
        width: "8rem",
        height: "3rem",
      }}>
      <Link to="/">
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
          src={LogoImage}
          alt="logo image"
        />
      </Link>
    </Button>
  );
};
export default Logo;
