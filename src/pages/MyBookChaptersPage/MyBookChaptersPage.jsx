import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useState } from "react";
import SummarizeIcon from "@mui/icons-material/Summarize";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { Controller, useForm } from "react-hook-form";
import { setReadCount } from "../../apis";
import { Link, useLoaderData, useParams } from "react-router";
import MarkdownDialog from "./MarkdownDialog/MarkdownDialog";

const MyBookChaptersPage = () => {
  const { book_title, read_count, chapters } = useLoaderData();
  // 다이얼로그
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContents, setDialogContents] = useState({
    uuid: "",
    chapter_title: "",
    position: 0,
  });

  const handleClickDialogOpen = (uuid, chapter_title, position) => () => {
    setDialogContents((pre) => ({ ...pre, uuid, chapter_title, position }));
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  // 스낵바
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const handleClickReadCountSave = () => {
    setSnackBarOpen(true);
  };
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleSnackBarClose}></IconButton>
  );
  // 유효성 검증
  const { userid, bookid } = useParams();
  const defaultValues = { read_count };
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues });
  const onsubmit = async (data) => {
    const read_count = data.read_count;
    const payload = { read_count };
    try {
      await setReadCount(userid, bookid, payload);
      handleClickReadCountSave();
    } catch (err) {
      alert(err.message);
    }
  };
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
        <Link to={`/users/${userid}/books/${bookid}/edit`}>
          <Button>요약하러 GO </Button>
        </Link>
      </Box>
      <Paper variant="outlined" sx={{ my: "2rem", p: "1rem" }}>
        <Typography
          gutterBottom
          variant="h6"
          sx={{ color: "text.primary", textAlign: "center" }}>
          {book_title}
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
          <Controller
            name="read_count"
            control={control}
            rules={{
              required: "필수 입력값입니다",
              validate: (value) =>
                parseFloat(value) >= 0 || "0 이상의 숫자만 입력해주세요",
            }}
            render={({ field }) => (
              <Tooltip
                open={!!errors?.read_count}
                title={errors?.read_count?.message}>
                <TextField
                  {...field}
                  variant="filled"
                  id="booktime"
                  size="small"
                  sx={{ width: "2rem" }}
                  slotProps={{
                    htmlInput: { sx: { padding: 0, textAlign: "center" } },
                  }}
                  error={!!errors?.read_count}
                />
              </Tooltip>
            )}
          />
          <Typography>번 회독 중입니다.</Typography>
          <Button onClick={handleSubmit(onsubmit)}>회독 수 저장</Button>
          <Snackbar
            open={snackBarOpen}
            autoHideDuration={3000}
            onClose={handleSnackBarClose}
            message="저장되었습니다"
            action={action}
          />
        </Box>
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
          aria-label="contacts">
          {chapters
            .toSorted((a, b) => a.position - b.position)
            .map(({ uuid, chapter_title, position, last_opened_at }) => (
              <React.Fragment key={uuid}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={handleClickDialogOpen(
                      uuid,
                      chapter_title,
                      position
                    )}
                    sx={{
                      height: "5rem",
                      display: "flex",
                      flexWrap: "wrap",
                    }}>
                    <ListItemIcon>
                      <SummarizeIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`챕터 ${position}: ${chapter_title}`}
                    />
                    <Typography variant="body2" sx={{ width: "100%" }}>
                      {`최근 읽은 날짜 : ${new Date(
                        last_opened_at
                      ).toLocaleDateString()}`}
                    </Typography>
                  </ListItemButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
        </List>
      </Paper>
      <MarkdownDialog
        dialogContents={dialogContents}
        dialogOpen={dialogOpen}
        handleDialogClose={handleDialogClose}
      />
    </>
  );
};
export default MyBookChaptersPage;
