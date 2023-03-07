import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/system";

const UserGreetingText = styled("div")({
  textAlign: "center",
  fontSize: "1.5rem",
});

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Box
        sx={{
          border: 1,
          minHeight: "100vh",
          height: "auto",
          textAlign: "center",
          maxWidth: 200, //fits 16character username with a font size of 1.5rem
        }}
      >
        <UserGreetingText>{`Hi, ${user.username}!`}</UserGreetingText>
        <Divider sx={{ my: 1 }} />
        <ListItemButton component="a" href="/dashboard">
          <ListItemText primary="Accounts" sx={{ textAlign: "center" }} />
        </ListItemButton>
        <ListItemButton component="a" href="/dashboard/transactions">
          <ListItemText primary="Transactions" sx={{ textAlign: "center" }} />
        </ListItemButton>
      </Box>
    </>
  );
};

export default Sidebar;
