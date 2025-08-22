import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, Container, Menu, MenuItem } from "@mui/material";
import Logo from "../Logo/Logo";
import useAuth from "../../auth/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router";
import LogoutDialog from "../LogoutDialog/LogoutDialog";

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
}));

function PrimarySearchAppBar({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogoutDialogOpen = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutDialogClose = () => {
    setOpenLogoutDialog(false);
  };
  const handleMenuClose = (name) => () => {
    setAnchorEl(null);
    if (name === "myBookCase") {
      navigate("/"); //TODO: url 수정
    } else if (name === "logout") {
      handleLogoutDialogOpen(true);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, height: { xs: "4rem", sm: "4rem" } }}>
      <AppBar position="fixed">
        <Container maxWidth="md">
          <Toolbar sx={{ height: { xs: "4rem", sm: "4rem" } }}>
            <Logo />
            <Search sx={{ flex: 1 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{ width: "100%" }}
              />
            </Search>

            <Box sx={{ display: { xs: "flex" } }}>
              {user ? (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit">
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose()}>
                    <MenuItem onClick={handleMenuClose("myBookCase")}>
                      내 책장
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose("logout")}>
                      로그아웃
                    </MenuItem>
                    <LogoutDialog
                      openLogoutDialog={openLogoutDialog}
                      handleLogoutDialogClose={handleLogoutDialogClose}
                    />
                  </Menu>
                </div>
              ) : (
                <Button
                  color="inherit"
                  onClick={() => {
                    navigate("/login");
                  }}>
                  로그인
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default function Header() {
  const { user } = useAuth();
  return <PrimarySearchAppBar user={user} />;
}
