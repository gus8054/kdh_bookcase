import {
  Box,
  Button,
  Chip,
  Divider,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { setChapters } from "../../apis";
import EditDialog from "./EditDialog/EditDialog";
import { v4 as uuidv4 } from "uuid";

const labels = {
  0.5: "최악",
  1: "별로",
  1.5: "그저 그럼",
  2: "보통",
  2.5: "괜찮음",
  3: "좋음",
  3.5: "아주 좋음",
  4: "훌륭함",
  4.5: "거의 완벽",
  5: "완벽",
};
function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const EditBookPage = () => {
  // 데이터 초기화
  const {
    google_book_id,
    book_title,
    book_authors,
    book_thumbnail,
    rating,
    memo,
    chapters,
  } = useLoaderData();
  const book = {
    google_book_id,
    book_title,
    book_authors,
    book_thumbnail,
  };
  const defaultValues = {
    rating,
    memo,
    chapters,
  };

  // 유효성 검사 초기화
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "chapters",
  });

  const [hover, setHover] = useState(-1);
  const navigate = useNavigate();
  const { userid, bookid } = useParams();

  const onsubmit = async (data) => {
    const payload = { ...data, ...book };
    await setChapters(userid, bookid, payload);
    navigate(-1);
  };

  const chaptersState = watch("chapters");

  const handleOpenDialog = (index) => {
    setValue(`chapters.${index}.dialogOpen`, true);
  };
  const handleCloseDialog = (index) => {
    setValue(`chapters.${index}.dialogOpen`, false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onsubmit)}
      noValidate
      sx={{ my: "2rem" }}>
      <Typography sx={{ fontSize: "1rem", fontWeight: "bold", mb: "2rem" }}>
        도서 요약 정보
      </Typography>
      <Typography gutterBottom variant="h6" sx={{ color: "text.primary" }}>
        {book.title}
      </Typography>
      <Paper sx={{ p: "1rem", my: "2rem" }}>
        <Typography variant="h6" gutterBottom>
          나의 리뷰
        </Typography>
        {/* Rating */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            my: "1rem",
          }}>
          <Controller
            name="rating"
            control={control}
            rules={{
              required: "별점을 선택해주세요",
              min: { value: 0.5, message: "별점을 입력하세요." },
            }}
            render={({ field }) => (
              <Rating
                {...field}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(_, newValue) => {
                  field.onChange(newValue);
                }}
                onChangeActive={(_, newHover) => {
                  setHover(newHover);
                }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
            )}
          />

          <Box
            sx={(theme) => ({
              ml: 2,
              color: errors.rating && theme.palette.error.main,
            })}>
            {errors.rating
              ? errors.rating.message
              : labels[hover !== -1 ? hover : undefined]}
          </Box>
        </Box>
        {/* Memo  */}
        <Controller
          name="memo"
          control={control}
          rules={{
            required: "메모를 입력해주세요",
            maxLength: {
              value: 500,
              message: "최대 500자까지 입력 가능합니다.",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="memo"
              multiline
              fullWidth
              rows={2}
              sx={{ mb: "2rem" }}
              error={!!errors.memo}
              helperText={errors.memo?.message}
            />
          )}
        />

        <Typography variant="h6" gutterBottom>
          챕터별 요약
        </Typography>
        {fields.map((chapter, index) => (
          <Box
            key={chapter.id}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "stretch",
              gap: "1rem",
              my: "2rem",
              flexWrap: "wrap",
            }}>
            <Controller
              name={`chapters.${index}.position`}
              control={control}
              rules={{
                required: "챕터 번호를 입력해주세요",
                min: { value: 0, message: "0 이상이어야 합니다" },
                max: { value: 100, message: "100 이하이어야 합니다" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  sx={{
                    flex: {
                      xs: "100% 1",
                      sm: "1",
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">챕터: </InputAdornment>
                      ),
                      type: "number",
                    },
                  }}
                  error={!!errors.chapters?.[index]?.position}
                  helperText={errors.chapters?.[index]?.position?.message}
                />
              )}
            />
            {/* title  */}
            <Controller
              name={`chapters.${index}.title`}
              control={control}
              rules={{
                required: "제목을 입력해주세요",
                maxLength: {
                  value: 30,
                  message: "최대 30자까지 입력가능합니다",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="standard"
                  sx={{
                    flex: {
                      xs: "100% 1",
                      sm: "3",
                    },
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">제목: </InputAdornment>
                      ),
                    },
                  }}
                  error={!!errors.chapters?.[index]?.title}
                  helperText={errors.chapters?.[index]?.title?.message}
                />
              )}
            />
            <Box>
              <Button
                variant="outlined"
                onClick={() => handleOpenDialog(index)}
                color="text.primary">
                편집
              </Button>

              <EditDialog
                open={chaptersState[index].dialogOpen}
                handleClose={() => handleCloseDialog(index)}
                chapter={chaptersState[index]}
                book={book}
                userid={userid}
              />

              <Button
                onClick={() => remove(index)}
                variant="outlined"
                sx={{ marginLeft: "1rem" }}
                color="error">
                삭제
              </Button>
            </Box>
          </Box>
        ))}

        <Divider sx={{ my: "2rem" }}>
          <Button
            onClick={() => {
              if (fields.length >= 50) {
                alert("챕터는 최대 50개까지만 추가할 수 있습니다.");
                return;
              }
              append({
                uuid: uuidv4(),
                position: fields.at(-1)?.position + 1 || 1,
                title: "",
                dialogOpen: false,
              });
            }}>
            <Chip icon={<AddIcon />} label="추가" />
          </Button>
        </Divider>
      </Paper>
      <Box sx={{ textAlign: "right" }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}>
          취소
        </Button>
        <Button variant="contained" sx={{ marginLeft: "1rem" }} type="submit">
          저장
        </Button>
      </Box>
    </Box>
  );
};
export default EditBookPage;
