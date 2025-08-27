import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { logout } from "../../auth/authService";
import { useNavigate } from "react-router";

export default function LogoutDialog({
  openLogoutDialog,
  handleLogoutDialogClose,
}) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    handleLogoutDialogClose();
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <Dialog
      open={openLogoutDialog}
      onClose={handleLogoutDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">로그아웃</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          로그아웃 하시겠습니까?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLogoutDialogClose} autoFocus>
          취소
        </Button>
        <Button onClick={handleLogout} autoFocus>
          로그아웃
        </Button>
      </DialogActions>
    </Dialog>
  );
}
