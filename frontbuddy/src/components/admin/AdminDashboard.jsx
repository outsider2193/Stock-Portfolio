import React from "react";
import { Box, Typography, Paper, Avatar, Grid } from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const AdminDashboard = () => {
  return (
    <>
      <AdminNavbar />
      <Box sx={{ p: 4, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "#1976d2", width: 56, height: 56 }}>
              <AdminPanelSettingsIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Welcome, Admin!
              </Typography>
              <Typography color="text.secondary">
                Manage users, transactions, and monitor system activity.
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <VerifiedUserIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="h6">User Roles</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Assign or revoke access rights.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <PeopleAltIcon color="secondary" fontSize="large" />
                <Box>
                  <Typography variant="h6">Manage Users</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Search, deactivate or remove users.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <AssessmentIcon color="success" fontSize="large" />
                <Box>
                  <Typography variant="h6">Transactions</Typography>
                  <Typography variant="body2" color="text.secondary">
                    View Transaction History.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AdminDashboard;
