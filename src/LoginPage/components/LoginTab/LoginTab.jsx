import { Tabs, Tab, Box } from "@mui/material";

export default function LoginTab({ value, setValue }) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", mb: "2rem" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="로그인" />
        <Tab label="회원가입" />
      </Tabs>
    </Box>
  );
}
