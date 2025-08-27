import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { Form, useMatch } from "react-router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  "& .MuiInputBase-input:-webkit-autofill": {
    // boxShadow: `0 0 0 100px ${alpha(theme.palette.common.white, 0.15)} inset`,
    WebkitTextFillColor: "white",
    transition: "background-color 5000s ease-in-out 0s",
    caretColor: "white",
  },
  "& .MuiInputBase-input:-webkit-autofill:hover": {
    // boxShadow: `0 0 0 100px ${alpha(theme.palette.common.white, 0.25)} inset`,
  },
  "& .MuiInputBase-input:-webkit-autofill:focus": {
    // boxShadow: `0 0 0 100px ${alpha(theme.palette.common.white, 0.25)} inset`,
  },
}));

export default function SearchBar() {
  const [value, setValue] = useState({ q: "" });
  const isMatch = !!useMatch({ path: "/search" });
  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (!isMatch) setValue({ q: "" });
  }, [isMatch]);
  return (
    <Search sx={{ flex: 1 }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Form method="GET" noValidate action="/search">
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          sx={{ width: "100%" }}
          onChange={handleChange}
          value={value.q}
          name="q"
        />
      </Form>
    </Search>
  );
}
