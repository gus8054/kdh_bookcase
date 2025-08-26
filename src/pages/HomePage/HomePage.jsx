import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { sentenses } from "../../data";
import { useAuthStore } from "../../auth/authStore";
import { Link } from "react-router";
import mainImage from "../../assets/main.png";

const HomePage = () => {
  const user = useAuthStore.getState().user;
  return (
    <>
      <Typography variant="h1" sx={{ textAlign: "center", mt: "4rem" }}>
        {user.nickname}님의 독서 일기
      </Typography>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", my: "2rem", lineHeight: 2 }}>
        책을 읽고 이곳에 요약하세요.
      </Typography>
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1/1",
          borderRadius: 2,
          overflow: "hidden",
          backgroundImage: `url(${mainImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        role="img"
        aria-label="책상 위 풍경">
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            my: "2rem",
            lineHeight: 2,
            color: "white",
            backdropFilter: "brightness(0.5)",
          }}>
          {`"${sentenses.at(-1)}"`}
        </Typography>
      </Box>
      <Button
        component={Link}
        to={`/search`}
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          position: "fixed",
          bottom: "2rem",
          left: "50%",
          transform: `translateX(-50%)`,
          mx: "auto",
          display: "flex",
          width: "50%",
          minWidth: "max-content",
        }}>
        지금 시작하기
      </Button>
    </>
  );
};
export default HomePage;
