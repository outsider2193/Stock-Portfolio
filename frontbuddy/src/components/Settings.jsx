import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "../api/axios";

const Settings = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.put(`/api/auth/updateuserpassword/${userId}`, data);
      toast.success("Password updated successfully");
      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <ToastContainer />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Account Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Update your password below
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              {...register("oldPassword", {
                required: "Current password is required",
              })}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword?.message}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 1 }}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Settings;
