import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { Link, useLoaderData } from "react-router";
import { useAuthStore } from "../../auth/authStore";

const BookDetailPage = () => {
  const user = useAuthStore.getState().user;
  const book = useLoaderData();
  return (
    <>
      <Card sx={{ position: "relative" }}>
        <Box
          component={Link}
          to={`/users/${user.id}/books/${book.id}/edit`}
          sx={{ position: "absolute", top: "1rem", right: "1rem" }}>
          <Button variant="contained">필기하러 가기</Button>
        </Box>
        <Box sx={{ mx: "auto" }}>
          <CardMedia
            component="img"
            alt="green iguana"
            image={`https://play.google.com/books/publisher/content/images/frontcover/${book.id}?fife=w480-h690`}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h6" sx={{ color: "text.primary" }}>
            {book.title}
          </Typography>
          <Typography
            gutterBottom
            variant="body1"
            sx={{ color: "text.secondarys" }}>
            {book.subtitle}
          </Typography>
          <Divider sx={{ my: "1rem" }} />
          <Paper variant="outlined" sx={{ p: "1rem" }}>
            <Typography
              gutterBottom
              variant="body2"
              sx={{ color: "text.primary" }}
              dangerouslySetInnerHTML={{ __html: book.description }}
            />
          </Paper>
          <Box
            sx={{ display: "flex", my: "1rem", gap: "1rem", flexWrap: "wrap" }}>
            {book.categories.map((category) => (
              <Chip key={category} label={category} size="small" />
            ))}
          </Box>
          <Divider sx={{ my: "1rem" }} />
          <Typography
            gutterBottom
            variant="body2"
            sx={{ color: "text.secondary" }}>
            지은이 : {book.authors.join(" | ")}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            sx={{ color: "text.secondary" }}>
            출판사 : {book.publisher}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            sx={{ color: "text.secondary" }}>
            발행일 : {book.publishedDate}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            sx={{ color: "text.secondary" }}>
            페이지 : {book.pageCount}
          </Typography>
          <Button variant="text" endIcon={<AutoStoriesIcon />}>
            <a
              href={book.webReaderLink}
              target="_blank"
              rel="noopener noreferrer">
              {book.webReaderLink
                ? "무료로 제공되는 부분 미리 읽어보기"
                : "미리보기 제공되지 않음"}
            </a>
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
export default BookDetailPage;
