import { Box, Button } from "@mui/material";
import { useFontSizeStore } from "../../store";

const MDFontSizeBtns = ({ sx }) => {
  const handleChangeFontSize = (action) => () => {
    // enum action = ['up', 'down']
    let next = null;
    const fontSize = useFontSizeStore.getState().fontSize;
    if (action === "up") next = fontSize * 1.1;
    else next = fontSize * 0.9;
    next = Math.round(next * 100) / 100;
    useFontSizeStore.getState().setFontSize(next);
  };
  return (
    <Box
      sx={{
        ...sx,
        ...{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          color: "text.primary",
        },
      }}>
      <Button
        onClick={handleChangeFontSize("down")}
        variant="contained"
        sx={{
          backgroundColor: "secondary.main",
          color: "text.primary",
          opacity: 0.5,
          "&:hover": {
            opacity: 1,
          },
        }}>
        size down
      </Button>
      <Button
        onClick={handleChangeFontSize("up")}
        variant="contained"
        sx={{
          backgroundColor: "secondary.main",
          color: "text.primary",
          opacity: 0.5,
          "&:hover": {
            opacity: 1,
          },
        }}>
        size up
      </Button>
    </Box>
  );
};
export default MDFontSizeBtns;
