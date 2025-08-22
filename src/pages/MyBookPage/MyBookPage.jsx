import { Box, Button, Paper, TextField, Typography } from "@mui/material";

import { searchList } from "../../data";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SummarizeIcon from "@mui/icons-material/Summarize";
const MyBookPage = () => {
  const book = searchList[0];
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: "2rem",
        }}>
        <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
          챕터별 요약
        </Typography>
        <Button href={`/users/1/books/${book.id}/edit`}>요약하러 GO </Button>
      </Box>
      <Paper variant="outlined" sx={{ my: "2rem", p: "1rem" }}>
        <Typography
          gutterBottom
          variant="h6"
          sx={{ color: "text.primary", textAlign: "center" }}>
          {book.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            gap: "1rem",
            my: "2rem",
          }}>
          <TextField id="booktime" size="small" sx={{ width: "3rem" }} />
          <Typography>번 회독 중입니다.</Typography>
          <Typography sx={{ flexBasis: "100%", textAlign: "right" }}>
            마지막 읽은 날짜 : 2024.04.04
          </Typography>
        </Box>
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          aria-label="contacts">
          <ListItem disablePadding>
            <ListItemButton onClick={handleClickOpen}>
              <ListItemIcon>
                <SummarizeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="챕터 1: 모두 다 건강했으면 좋겠습니다." />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SummarizeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="챕터 2: 아픈 사람들 모두 건강하세요." />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SummarizeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="챕터 2: 아픈 사람들 모두 건강하세요." />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SummarizeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="챕터 2: 아픈 사람들 모두 건강하세요." />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SummarizeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="챕터 2: 아픈 사람들 모두 건강하세요." />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SummarizeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="챕터 2: 아픈 사람들 모두 건강하세요." />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SummarizeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="챕터 2: 아픈 사람들 모두 건강하세요." />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SummarizeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="챕터 2: 아픈 사람들 모두 건강하세요." />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SummarizeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="챕터 2: 아픈 사람들 모두 건강하세요." />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SummarizeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="챕터 2: 아픈 사람들 모두 건강하세요." />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}>
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default MyBookPage;
