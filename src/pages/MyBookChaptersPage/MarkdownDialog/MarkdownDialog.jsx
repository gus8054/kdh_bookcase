import { Alert, Button } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { getChapter } from "../../../apis";
import { useParams } from "react-router";
import Loading from "../../../components/Loading/Loading";
import MarkdownRender from "../../../components/MarkdownRender/MarkdownRender";

const MarkdownDialog = ({ dialogContents, dialogOpen, handleDialogClose }) => {
  const [content, setContent] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userid, bookid } = useParams();

  useEffect(() => {
    if (dialogOpen) {
      setLoading(true);
      getChapter(userid, bookid, dialogContents.uuid)
        .then(({ data }) => setContent(data.content_md))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }
  }, [userid, bookid, dialogContents, dialogOpen]);

  return (
    <Dialog
      open={dialogOpen}
      onClose={handleDialogClose}
      scroll="paper"
      fullScreen
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description">
      <DialogTitle id="scroll-dialog-title">{`챕터 ${dialogContents.position} : ${dialogContents.chapter_title}`}</DialogTitle>
      <DialogContent dividers={true}>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Alert severity="error">{error.message}</Alert>
        ) : (
          <MarkdownRender>{content}</MarkdownRender>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>확인</Button>
      </DialogActions>
    </Dialog>
  );
};
export default MarkdownDialog;
