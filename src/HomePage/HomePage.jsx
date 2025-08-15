import { Container, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { lastReadBooks, sentenses } from "../data";
import LastReadBookCard from "./LastReadBookCard/LastReadBookCard";

const HomePage = () => {
  return (
    <>
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
