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

const Sidebar = () => {
  return (
    <>
      <Box sx={{ border: 1, height: "100vh" }}>
        <ListItemText primary="Hi, Username" />
        <Divider sx={{ my: 1 }} />
        <ListItemButton>
          <ListItemText primary="Accounts" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Transactions" />
        </ListItemButton>
      </Box>
    </>
  );
};

export default Sidebar;
