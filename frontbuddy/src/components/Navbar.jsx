import React from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ userProfile, onLogout }) => {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{ mb: 3 }} // margin-bottom
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Investment Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            {userProfile?.firstName}
          </Typography>
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
