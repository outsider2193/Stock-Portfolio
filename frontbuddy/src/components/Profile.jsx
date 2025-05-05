import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import axios from "../api/axios";
import { useForm } from "react-hook-form";

import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;
  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`api/auth/user/${userId}`);
  
      // Set values field-by-field
      setValue("firstName", decoded.firstName);
      setValue("lastName", decoded.lastName);
      setValue("email", decoded.email);
      setValue("contactNumber", decoded.contactNumber);
      setValue("gender", decoded.gender);
      setValue("jobType", decoded.jobType);
      setValue("annualIncome", decoded.annualIncome);
    } catch (err) {
      toast.error("Failed to fetch user data");
    }
  };
  

  useEffect(() => {
    fetchProfile();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `api/auth/updateuserprofile/${userId}`,
        data
      );
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 5, px: 2 }}>
      <ToastContainer />
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
          <Avatar sx={{ bgcolor: deepPurple[500], width: 64, height: 64, mb: 2 }}>
            {user?.firstName?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h5" fontWeight="bold">My Profile</Typography>
          <Typography variant="body2" color="text.secondary">
            View and update your account information
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                defaultValue={decoded.firstName}
                {...register("firstName", { required: "First name is required" })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                defaultValue={decoded.lastName}
                {...register("lastName", { required: "Last name is required" })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                defaultValue={decoded.email}
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Number"
                defaultValue={decoded.contactNumber}
                {...register("contactNumber")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Gender"
                defaultValue={decoded.gender}
                {...register("gender")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Type"
                defaultValue={decoded.jobType}
                {...register("jobType")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Annual Income"
                type="number"
                defaultValue={decoded.annualIncome}
                {...register("annualIncome")}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Update Profile"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Profile;
