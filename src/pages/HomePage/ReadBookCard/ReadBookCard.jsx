import {
  Box,
  Button,
  CardActions,
  Chip,
  Rating,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link, useParams } from "react-router";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
export default function ReadBookCard({ myBook }) {
  const { userid } = useParams();
  const {
    authors,
    last_opened_at,
    rating,
    read_count,
    thumbnail,
    title,
    google_book_id,
  } = myBook;
  return (
    <Card
      sx={{
        p: "1rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        "& .btn": {
          display: "none",
        },
        "&:hover .btn": {
          display: "flex",
        },
      }}>
      <CardMedia
        sx={{
          my: "1rem",
          width: "100%",
          aspectRatio: 3 / 4,
          objectFit: "contain",
          objectPosition: "center",
        }}
        image={thumbnail}
        title="book image"
      />
      <Box sx={{ width: "100%" }}>
        <Typography variant="h6" sx={{ my: "0.5rem" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ my: "0.5rem" }}>
          {authors}
        </Typography>
        <Rating
          name="read-only"
          value={rating}
          readOnly
          sx={{ my: "0.5rem" }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            my: "0.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <CalendarMonthIcon />
            {new Date(last_opened_at).toLocaleDateString()}
          </Typography>
          <Chip label={`${read_count}회독`} color="primary" />
        </Box>
      </Box>
      <CardActions
        className="btn"
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Link to={`/users/${userid}/books/${google_book_id}/chapters`}>
          <Button variant="contained" endIcon={<AutoStoriesIcon />}>
            챕터별 요약 보기
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
