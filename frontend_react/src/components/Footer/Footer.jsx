import { Box, Typography, Link, Stack, Container } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: `2rem`,
        px: `1rem`,
        bgcolor: "text.primary",
        color: "primary.contrastText",
        borderTop: "1px solid",
        borderColor: "divider",
      }}>
      <Container maxWidth="md">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center">
          <Typography variant="body2">
            © {new Date().getFullYear()} 김동현의 독서노트. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link href="/privacy" underline="hover">
              개인정보처리방침
            </Link>
            <Link href="/terms" underline="hover">
              이용약관
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
