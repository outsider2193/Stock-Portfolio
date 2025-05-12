import React from "react";
import { AppBar, Box, Toolbar, Typography, Button, Avatar } from "@mui/material";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userProfile, onLogout }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear(); // Clear everything from storage
    navigate("/login");   // Redirect to login page
  };

  const firstLetter = user?.firstName?.charAt(0).toUpperCase();
  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ mb: 3, bgcolor: "#0fb5a9" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Investment Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: '#00e5ff' }}>
            {firstLetter}
          </Avatar>
          <Button
            variant="contained"
            color="error"
            startIcon={<FaSignOutAlt />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
