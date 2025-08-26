import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, Container, Menu, MenuItem } from "@mui/material";
import Logo from "../Logo/Logo";
import { useState } from "react";
import { useNavigate } from "react-router";
import LogoutDialog from "../LogoutDialog/LogoutDialog";
import SearchBar from "../SearchBar/SearchBar";
import { useAuthStore } from "../../auth/authStore";

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
      navigate(`/users/${user.id}/books`);
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
            <SearchBar />
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
  const user = useAuthStore((state) => state.user);
  return <PrimarySearchAppBar user={user} />;
}
