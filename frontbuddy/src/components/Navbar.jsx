import React from "react";
import { AppBar, Box, Toolbar, Typography, Button, Avatar } from "@mui/material";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ userProfile, onLogout }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const firstLetter = user?.firstName?.charAt(0).toUpperCase();
  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ mb: 3 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Investment Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
            {firstLetter}
          </Avatar>
          <Button
            variant="contained"
            color="error"
            startIcon={<FaSignOutAlt />}
            onClick={onLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
