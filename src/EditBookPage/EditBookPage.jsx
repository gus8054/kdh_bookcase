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
import { useRef, useState } from "react";
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
  const inputDateRef = useRef(null);

  const handleDateInputClick = (e) => {
    e.preventDefault();
    inputDateRef.current.showPicker();
  };

  return (
    <Container maxWidth="sm">
      <Typography sx={{ fontSize: "1rem", fontWeight: "bold", my: "2rem" }}>
        도서 요약 정보
      </Typography>
      <Paper sx={{ p: "1rem", my: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          나의 리뷰
        </Typography>
        <TextField
          id="outlined-multiline-static"
          label="memo"
          multiline
          fullWidth
          rows={2}
          defaultValue="Default Value"
          sx={{ mt: "1rem" }}
        />
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
        <Typography variant="h6" gutterBottom>
          읽기 상태
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "stretch",
            gap: "1rem",
            my: "1rem",
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
                  <InputAdornment position="start">회독: </InputAdornment>
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
                sm: "2",
              },
            }}
            onClick={handleDateInputClick}
            inputRef={inputDateRef}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    마지막으로 읽은 날짜:
                  </InputAdornment>
                ),
                type: "date",
              },
            }}
          />
        </Box>
        <Typography variant="h6" gutterBottom>
          챕터별 요약
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "stretch",
            gap: "1rem",
            my: "1rem",
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
            <Button variant="text">편집</Button>
            <Button variant="text">삭제</Button>
          </Box>
        </Box>
        <Divider sx={{ my: "1rem" }}>
          <Chip icon={<AddIcon />} label="추가" />
        </Divider>
      </Paper>
    </Container>
  );
};
export default EditBookPage;
