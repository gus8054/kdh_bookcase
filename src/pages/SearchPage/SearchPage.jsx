import { Alert, Grid } from "@mui/material";
import SearchBookCard from "./SearchBookCard/SearchBookCard";
import { useLoaderData } from "react-router";

const SearchPage = () => {
  const books = useLoaderData();
  let content;
  if (!books)
    content = content = (
      <Alert variant="outlined" severity="info">
        검색어를 입력해주세요.
      </Alert>
    );
  else if (books.length == 0)
    content = (
      <Alert variant="outlined" severity="info">
        찾으시는 결과가 없습니다.
      </Alert>
    );
  else
    content = (
      <Grid container spacing={8}>
        {books.map((book) => (
          <Grid size={{ xs: 12 }} key={book.id}>
            <SearchBookCard book={book} />
          </Grid>
        ))}
      </Grid>
    );
  return content;
};
export default SearchPage;
