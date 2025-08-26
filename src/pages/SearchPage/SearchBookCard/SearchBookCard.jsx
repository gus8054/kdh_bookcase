import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ImageFallback from "../../../components/ImageFallback/ImageFallback";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { Link } from "react-router";
const SearchBookCard = ({ book }) => {
  return (
    <Card
      sx={{
        display: "flex",
        position: "relative",
        height: "100%",
        "& .btn": {
          display: "none",
        },
        "&:hover .btn": {
          display: "flex",
        },
      }}>
      <Box sx={{ flexBasis: "8rem", flexShrink: 0 }}>
        {book.thumbnail ? (
          <CardMedia
            component="img"
            alt="green iguana"
            image={book.thumbnail}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        ) : (
          <ImageFallback />
        )}
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" sx={{ color: "text.primary" }}>
          {book.title}
        </Typography>
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
      </CardContent>
      <CardActions
        className="btn"
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Link to={`/books/${book.id}`}>
          <Button variant="contained" endIcon={<ImportContactsIcon />}>
            자세히 보기
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};
export default SearchBookCard;
