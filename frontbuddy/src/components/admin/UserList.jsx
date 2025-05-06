import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../api/axios";
import { toast } from "react-toastify";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/allusers");
      const allUsers = res.data.data || [];
  
      // Filter out users with role 'admin'
      const nonAdminUsers = allUsers.filter((user) => user.role !== "admin");
  
      setUsers(nonAdminUsers);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    }
  };
  
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/admin/delete/user/${id}`);
      toast.success("User deleted successfully");
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      toast.error("Error deleting user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "jobType", headerName: "Job Type", flex: 1 },
    { field: "contactNumber", headerName: "Contact", flex: 1 },
    { field: "annualIncome", headerName: "Income", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Delete User">
          <IconButton onClick={() => handleDelete(params.row._id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const rows = users.map((user, index) => ({
    id: index + 1,
    _id: user._id,
    ...user,
  }));

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        All Users
      </Typography>

      <Box sx={{ height: 550, width: "100%", mt: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8, 16]}
          disableRowSelectionOnClick
          sx={{
            borderRadius: 2,
            backgroundColor: "white",
            boxShadow: 3,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f0f0f0",
              fontWeight: "bold",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default UserList;
