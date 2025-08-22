import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const EditBookPage = () => {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  return (
    <>
      <Typography sx={{ fontSize: "1rem", fontWeight: "bold", my: "2rem" }}>
        도서 요약 정보
      </Typography>
      <Paper sx={{ p: "1rem", my: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          나의 리뷰
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            my: "1rem",
          }}>
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
        <TextField
          id="outlined-multiline-static"
          label="memo"
          multiline
          fullWidth
          rows={2}
          sx={{ mb: "2rem" }}
        />
        <Typography variant="h6" gutterBottom>
          챕터별 요약
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "stretch",
            gap: "1rem",
            my: "2rem",
            flexWrap: "wrap",
          }}>
          <TextField
            variant="standard"
            sx={{
              flex: {
                xs: "100% 1",
                sm: "1",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">챕터: </InputAdornment>
                ),
                type: "number",
              },
            }}
          />

          <TextField
            variant="standard"
            sx={{
              flex: {
                xs: "100% 1",
                sm: "1",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">제목: </InputAdornment>
                ),
              },
            }}
          />
          <Box>
            <Button variant="outlined" color="text.primary">
              편집
            </Button>
            <Button
              variant="outlined"
              sx={{ marginLeft: "1rem" }}
              color="error">
              삭제
            </Button>
          </Box>
        </Box>
        <Divider sx={{ my: "2rem" }}>
          <Chip icon={<AddIcon />} label="추가" />
        </Divider>
      </Paper>
      <Box sx={{ textAlign: "right" }}>
        <Button variant="contained">취소</Button>
        <Button variant="contained" sx={{ marginLeft: "1rem" }}>
          저장
        </Button>
      </Box>
    </>
  );
};
export default EditBookPage;
