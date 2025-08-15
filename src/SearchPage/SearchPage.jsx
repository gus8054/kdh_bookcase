import { Box, Card, Container, Grid, Typography } from "@mui/material";
import { searchList } from "../data";
import SearchBookCard from "./SearchBookCard/SearchBookCard";

const SearchPage = () => {
  return (
    <>
      <Container maxWidth="md">
        <Typography sx={{ fontSize: "1rem", fontWeight: "bold", my: "2rem" }}>
          검색 결과
        </Typography>
        <Grid container spacing={2} sx={{ my: "2rem" }}>
          {searchList.map((book) => (
            <Grid size={{ xs: 12, md: 6 }} key={book.id}>
              <SearchBookCard book={book} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
export default SearchPage;
