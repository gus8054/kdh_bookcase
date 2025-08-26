import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CancelDialog({
  openCancelDialog,
  setOpenCancelDialog,
  closeEditDialog,
}) {
  return (
    <Dialog
      open={openCancelDialog}
      onClose={() => setOpenCancelDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"나가시겠습니까?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          이 창을 닫으면 입력중인 내용이 사라집니다.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenCancelDialog(false)} autoFocus>
          취소
        </Button>
        <Button
          onClick={() => {
            setOpenCancelDialog(false);
            closeEditDialog();
          }}>
          나가기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
