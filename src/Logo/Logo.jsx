import LogoImage from "../assets/logo.png";

const Logo = () => {
  return (
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
  );
};
export default Logo;
