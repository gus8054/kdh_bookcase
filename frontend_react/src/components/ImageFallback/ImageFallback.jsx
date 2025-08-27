import { Box } from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

const ImageFallback = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#aaaaaa",
      }}>
      <ImageNotSupportedIcon />
    </Box>
  );
};
export default ImageFallback;
