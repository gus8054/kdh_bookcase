import {
  Box,
  Chip,
  Container,
  Grid,
  LinearProgress,
  Rating,
  Typography,
} from "@mui/material";
import Header from "../Header/Header";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { lastReadBooks, sentenses } from "../data";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function LastReadBookCard({ lastReadBook }) {
  return (
    <Card sx={{ my: "2rem", p: "1rem" }}>
      <CardMedia
        sx={{ height: 300, my: "1rem" }}
        image={lastReadBook.imageURL}
        title="book image"
      />

      <Typography variant="h6" sx={{ my: "0.5rem" }}>
        {lastReadBook.title}
      </Typography>
      <Typography variant="body2" sx={{ my: "0.5rem" }}>
        {lastReadBook.author}
      </Typography>
      <Rating
        name="read-only"
        value={lastReadBook.rating}
        readOnly
        sx={{ my: "0.5rem" }}
      />
      <LinearProgress
        variant="determinate"
        value={lastReadBook.progress}
        sx={{ my: "0.5rem" }}
      />
      <Typography variant="body2" sx={{ my: "0.5rem" }}>
        {lastReadBook.progress}% 완료
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: "0.5rem",
        }}>
        <Typography
          variant="body2"
          sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <CalendarMonthIcon />
          {lastReadBook.lastDate}
        </Typography>
        <Chip label={`${lastReadBook.timeRead}회독`} color="primary" />
      </Box>
    </Card>
  );
}

const HomePage = () => {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Typography variant="h1" sx={{ textAlign: "center", my: "4rem" }}>
          나만의 독서 일기
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: "center", my: "2rem", lineHeight: 2 }}>
          책 관리, 리뷰 공유, 나의 독서 상태를 확인할 수 있어요.
        </Typography>

        <Typography
          variant="body2"
          sx={{ textAlign: "center", my: "2rem", lineHeight: 2 }}>
          {`"${sentenses.at(-1)}"`}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ mx: "auto", display: "flex", my: "2rem" }}>
          지금 시작하기
        </Button>
        <Typography sx={{ fontSize: "1rem", fontWeight: "bold", mb: "1rem" }}>
          최근에 읽은 책
        </Typography>
        <Grid container spacing={4}>
          {lastReadBooks.map((lastReadBook) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={lastReadBook.title}>
              <LastReadBookCard lastReadBook={lastReadBook} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
export default HomePage;
