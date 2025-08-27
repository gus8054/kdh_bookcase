import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useAuthStore } from "../../auth/authStore";
import { Link } from "react-router";
import mainImage from "../../assets/main.png";

const sentenses = [
  `“책 없는 방은 영혼 없는 육체와 같다.” — 키케로`,
  `“좋은 책을 읽는 것은 지난 몇 세기 동안 가장 훌륭한 사람들과 대화하는 것과 같다.” — 데카르트`,
  `“내가 세계를 알게 된 것은 책에 의해서였다.” — 사르트르`,
  `“책은 인생의 험준한 바다를 항해하는 데 도움이 되게 남들이 마련해 준 나침반이요, 망원경이고 육분의고 도표이다.” — 제시 리 베넷`,
  `“당신에게 가장 필요한 책은 당신으로 하여금 가장 많이 생각하게 만드는 책이다.” — 마크 트웨인`,
];
const randomSentense = sentenses[Math.floor(Math.random() * sentenses.length)];
const HomePage = () => {
  const user = useAuthStore.getState().user;
  return (
    <>
      <Typography
        variant="h1"
        sx={{ textAlign: "center", "& span": { color: "secondary.main" } }}>
        안녕하세요, <span>{user.nickname}님</span>
      </Typography>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", my: "2rem", lineHeight: 2 }}>
        책을 읽고 필기할 공간을 찾으시나요?
        <br />이 곳에서 필기하세요.
      </Typography>
      <Button
        component={Link}
        to={`/search`}
        variant="contained"
        startIcon={<AddIcon />}
        sx={{
          my: "2rem",
          mx: "auto",
          display: "flex",
          width: "50%",
          minWidth: "max-content",
        }}>
        지금 시작하기
      </Button>
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
          variant="h6"
          sx={{
            textAlign: "center",
            my: "2rem",
            lineHeight: 2,
            color: "white",
            backdropFilter: "brightness(0.5)",
          }}>
          {randomSentense}
        </Typography>
      </Box>
    </>
  );
};
export default HomePage;
