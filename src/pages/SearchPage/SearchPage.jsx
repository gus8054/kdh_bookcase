import { Alert, Grid, Typography } from "@mui/material";
import SearchBookCard from "./SearchBookCard/SearchBookCard";
import { useLoaderData } from "react-router";

const SearchPage = () => {
  const books = useLoaderData();

  let content;
  if (books.length == 0)
    content = (
      <Alert variant="outlined" severity="info">
        찾으시는 결과가 없습니다.
      </Alert>
    );
  else
    content = (
      <Grid container spacing={8} sx={{ my: "2rem" }}>
        {books.map((book) => (
          <Grid size={{ xs: 12 }} key={book.id}>
            <SearchBookCard book={book} />
          </Grid>
        ))}
      </Grid>
    );
  return (
    <>
      <Typography sx={{ fontSize: "1rem", fontWeight: "bold", my: "2rem" }}>
        검색 결과
      </Typography>
      {content}
    </>
  );
};
export default SearchPage;
