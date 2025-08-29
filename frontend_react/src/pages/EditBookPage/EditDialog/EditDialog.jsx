import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  Snackbar,
  styled,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { forwardRef, useEffect, useRef, useState } from "react";
import MarkdownRender from "../../../components/MarkdownRender/MarkdownRender";
import CancelDialog from "./CancelDialog/CancelDialog";
import { getSummary, setSummary } from "../../../apis";
import Loading from "../../../components/Loading/Loading";
import MDFontSizeBtns from "../../../components/MDFontSizeBtn/MDFontSizeBtn";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTextArea = styled("textarea")(() => ({
  fontSize: "1rem",
  fontFamily: "inherit",
  padding: "1rem",
  border: "none",
  width: "100%",
  height: "100%",
  boxShadow: "border-box",
  resize: "none",
  flex: 1,
  outline: "none",
}));

export default function EditDialog({
  open,
  handleClose,
  chapter,
  book,
  userid,
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // textarea 유효성 검사를 위한 react hook form
  const defaultValues = {
    markdown: "",
  };
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues,
  });

  // 스크롤 영역
  const [isAutoScroll, setAutoScroll] = useState(false); // 자동 스크롤 체크 여부
  const handleAutoScrollCheck = () => setAutoScroll((pre) => !pre); // 자동 스크롤 체크 핸들러
  const boxRef = useRef(null); // 스크롤 컨트롤을 위한 DOM객체 레퍼런스
  const moveScrollDown = () => {
    // box 내부 스크롤을 제일 아래로 내리는 함수
    boxRef.current.scrollTop = boxRef.current.scrollHeight;
  };

  // 편집기 닫는 것을 확인하는 모달창
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  // 닫기 눌렀을때 textarea 값도 지워야함. 아니면 다른 챕터클릭했을때 나타남.
  const closeEditDialog = () => {
    reset();
    handleClose();
  };

  // 서버로 전송하는 이벤트핸들러
  const onsubmit = async (data) => {
    const { google_book_id, book_title, book_authors, book_thumbnail } = book;
    const markdown = data.markdown;
    const chapterUUID = chapter.uuid;
    const payload = {
      google_book_id,
      book_title,
      book_authors,
      book_thumbnail,
      chapterUUID,
      markdown,
    };
    try {
      await setSummary(userid, google_book_id, chapterUUID, payload);
    } catch (err) {
      console.error(err.message);
      alert(err.serverMessage || "저장 중 오류가 발생했습니다.");
    }
  };

  // 전송 완료표시 스낵바
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const handleSnackBarClose = (_, reason) => {
    if (reason === "clickaway");
    setSnackBarOpen(false);
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      setSnackBarOpen(true);
    }
  }, [isSubmitSuccessful]);
  useEffect(() => {
    if (!open) return;
    if (!book || !chapter) return;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        // textarea 영역
        const { data } = await getSummary(
          userid,
          book.google_book_id,
          chapter.uuid
        );
        const markdown = data.content_md;
        reset({ markdown: markdown || "" });
      } catch (err) {
        setError(err.message || "데이터를 불러오지 못했습니다.");
        reset({ markdown: "" });
        return {}; // 폼은 비워두기
      } finally {
        setLoading(false);
      }
    })();
  }, [open, userid, book, chapter, reset]);
  const markdownUsage = `📌 텍스트 서식
**굵게**
*기울임*
~~취소선~~ 
\`인라인 코드\` 

🏷️ 제목 (Heading)
# 제목1
## 제목2
### 제목3
#### 제목4
##### 제목5
###### 제목6

📋 순서 없는 목록
- 항목1
- 항목2
  - 하위 항목
* 별표도 가능

📋 순서 있는 목록
1. 첫 번째
2. 두 번째
   1. 하위 항목

🔗 링크 & 이미지
[링크텍스트](https://example.com)  
![이미지설명](https://example.com/image.jpg)

💻 코드 블록
\`\`\`js
// JavaScript 예시
function hello() {
  console.log("Hello Markdown!");
}
\`\`\`

📐 인용문
> 이것은 인용문입니다.
>> 중첩 인용도 가능해요.

📊 표 만들기
| 이름 | 나이 | 지역 |
|------|------|------|
| ab   | 28   | 부산 |
| Jay  | 32   | 서울 |

✅ 체크박스 (To-do List)
- [x] 완료된 항목
- [ ] 미완료 항목

✂️ 수평선
---`;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={(event, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
          return; // 닫기 무시
        }
        handleClose();
      }}
      slots={{
        transition: Transition,
      }}
      sx={{
        height: "100vh",
      }}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar sx={{ height: { xs: "4rem", sm: "4rem" } }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpenCancelDialog(true)}
            aria-label="close">
            <CloseIcon />
          </IconButton>
          <CancelDialog
            openCancelDialog={openCancelDialog}
            setOpenCancelDialog={setOpenCancelDialog}
            closeEditDialog={closeEditDialog}
          />
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {`챕터 ${chapter.position} : ${chapter.title}`}
          </Typography>

          <FormControlLabel
            sx={{
              display: { xs: "none", lg: "flex" },
            }}
            control={
              <Checkbox color="secondary" onChange={handleAutoScrollCheck} />
            }
            label="자동 스크롤"
          />
          <Button color="inherit" onClick={handleSubmit(onsubmit)}>
            저장
          </Button>
        </Toolbar>
        <MDFontSizeBtns
          sx={{ position: "absolute", top: "5rem", right: "1rem" }}
        />
      </AppBar>
      <Box
        sx={{
          height: "calc(100vh - 4rem)",
          display: "flex",
          alignItems: "stretch",
        }}>
        {loading ? (
          <Loading />
        ) : (
          <Controller
            name="markdown"
            control={control}
            rules={{
              required: "내용을 입력하세요",
              maxLength: {
                value: 1000000,
                message: "더이상 입력할 수 없습니다.",
              },
            }}
            render={({ field }) => (
              <StyledTextArea
                {...field}
                autoFocus
                placeholder={markdownUsage}
                onChange={(e) => {
                  field.onChange(e);
                  if (isAutoScroll) moveScrollDown();
                }}></StyledTextArea>
            )}
          />
        )}
        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", lg: "block" } }}
        />
        <Box
          ref={boxRef}
          sx={{
            display: { xs: "none", lg: "block" },
            flex: 1,
            overflow: "auto",
            padding: "1rem",
          }}>
          <MarkdownRender>{watch("markdown")}</MarkdownRender>
        </Box>
      </Box>
      {error && (
        <Alert
          severity="error"
          sx={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            display: "flex",
          }}>
          오류가 발생했습니다.
        </Alert>
      )}
      <Alert
        severity="error"
        sx={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          display: errors?.markdown ? "flex" : "none",
        }}>
        {errors?.markdown?.message}
      </Alert>

      {isSubmitting && <Loading />}
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={4000}
        onClose={handleSnackBarClose}
        message="저장 되었습니다."
      />
    </Dialog>
  );
}
