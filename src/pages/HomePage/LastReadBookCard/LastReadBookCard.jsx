import { Box, Chip, LinearProgress, Rating, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function LastReadBookCard({ lastReadBook }) {
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
