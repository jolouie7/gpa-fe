import { useState } from "react";
// import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

//TODO: Figure out if I nested routes
//TODO: FIgure out how to make the sidebar stay when user is logged in

const Sidebar = () => {
  const username = localStorage.getItem("user");
  return (
    <>
      <Box
        sx={{
          border: 1,
          height: "100vh",
          textAlign: "center",
          maxWidth: "150px",
        }}
      >
        <ListItemText primary={`Hi, ${username}`} />
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
