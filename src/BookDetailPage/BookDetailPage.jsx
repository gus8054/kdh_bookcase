import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { searchList } from "../data";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useParams } from "react-router";

const BookDetailPage = () => {
  const { bookid } = useParams();
  const book = searchList[0];
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: "2rem",
        }}>
        <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
          도서 상세 정보
        </Typography>
        <Button href={`/users/1/books/${bookid}/edit`}>요약하러 GO </Button>
      </Box>
      <Card sx={{ my: "2rem" }}>
        <Box sx={{ flexBasis: "8rem", flexShrink: 0 }}>
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
              sx={{ color: "text.primary" }}>
              {book.description}
            </Typography>
          </Paper>
          <Box sx={{ display: "flex", my: "1rem", gap: "1rem" }}>
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
              무료로 제공되는 부분 미리 읽어보기
            </a>
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};
export default BookDetailPage;

//   {
//     id: "FCA6EQAAQBAJ",
//     title: "전문가를 위한 리액트",
//     subtitle: "빠르고 성능이 뛰어난 직관적인 애플리케이션 구축하기",
//     authors: ["테자스 쿠마르(Tejas Kumar)"],
//     publisher: "한빛미디어 ",
//     publishedDate: "2024-12-23",
//     description:
//       "리액트의 핵심을 해부하다 JSX에서 고급 최적화 기법까지, 리액트 심층 탐구서 리액트는 웹 개발자에게 새로운 가능성을 열어 주는 강력한 도구입니다. 이 책은 단순히 리액트 사용을 넘어, 내부 구조와 작동 방식을 완벽히 분석해 최적화된 코드를 작성하는 방법을 설명합니다. JSX 문법, 가상 DOM, 재조정, 고급 최적화 기법 등 리액트 핵심 개념을 깊이 파헤칩니다. 리액트 애플리케이션을 대규모로 구축하고 유지하는 방법과 모바일이나 웹 이외의 다른 플랫폼에서도 활용할 수 있는 실용적인 조언도 소개합니다. 리액트의 세부적인 작동 원리를 이해하고 개발 역량을 높여보세요. 리액트 개발자로서 한 단계 더 도약할 차례입니다.",
//     pageCount: 401,
//     categories: ["Computers"],
//     thumbnail:
//       "http://books.google.com/books/content?id=FCA6EQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
//     language: "ko",
//     buyLink:
//       "https://play.google.com/store/books/details?id=FCA6EQAAQBAJ&rdid=book-FCA6EQAAQBAJ&rdot=1&source=gbs_api",
//     webReaderLink:
//       "http://play.google.com/books/reader?id=FCA6EQAAQBAJ&hl=&as_pt=BOOKS&source=gbs_api",
//   },
