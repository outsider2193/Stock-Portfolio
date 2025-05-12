import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import {
  FaHome,
  FaChartLine,
  FaBriefcase,
  FaBuilding,
  FaCreditCard,
  FaUser,
  FaCog,
} from "react-icons/fa";

const drawerWidth = 240;

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: "overview", label: "Overview", icon: <FaHome /> },
    { id: "stocks", label: "Stocks", icon: <FaChartLine /> },
    { id: "portfolio", label: "Portfolio", icon: <FaBriefcase /> },
    // { id: "companies", label: "Companies", icon: <FaBuilding /> },
    // { id: "subscriptions", label: "Subscriptions", icon: <FaCreditCard /> },
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#0d3b66",
          color: "#ffffff",
        },
      }}
    >
      {/* <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ mx: "auto" }}>
          <img
            src="https://via.placeholder.com/100x40?text=Logo"
            alt="Logo"
            style={{ height: 40 }}
          />
        </Typography>
      </Toolbar> */}
      <Box sx={{ mt:3, overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              sx={{
                bgcolor: activeView === item.id ? "#1976d2" : "inherit",
                "&:hover": {
                  bgcolor: "#2a2a40",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#ffffff" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
