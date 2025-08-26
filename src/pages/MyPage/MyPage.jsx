import { Alert, Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useLoaderData, useNavigate, useParams } from "react-router";
import ReadBookCard from "../HomePage/ReadBookCard/ReadBookCard";
import { removeUser } from "../../apis";

const MyPage = () => {
  const { userid } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRemove = async () => {
    handleClose();
    try {
      await removeUser(userid);
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };
  const myBooks = useLoaderData();

  return (
    <Box sx={{ position: "relative", display: "flow-root" }}>
      <Button
        variant="text"
        onClick={handleOpen}
        sx={{ position: "absolute", top: "1rem", right: "1rem" }}>
        회원 탈퇴
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {"정말 탈퇴하시겠습니까?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            탈퇴 시 모든 개인 데이터가 삭제됩니다.
            <br />
            백업이 필요하다면 탈퇴 전에 하시기 바랍니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleRemove} autoFocus>
            회원 탈퇴
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h1" sx={{ textAlign: "center", my: "4rem" }}>
        내 책장
      </Typography>
      <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
        {myBooks.length == 0 ? (
          <Alert severity="info">아직 등록한 책이 없습니다.</Alert>
        ) : (
          myBooks.map((myBook) => (
            <Grid size={{ xs: 12, sm: 6 }} key={myBook.google_book_id}>
              <ReadBookCard myBook={myBook} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};
export default MyPage;
