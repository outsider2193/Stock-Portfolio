import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  MenuItem,
  Container,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", data);
      reset();
      toast.success(res.data.message || "Account created successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating account");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 5, p: 3, boxShadow: 2, borderRadius: 5, backgroundColor: "#fafafa" }}>
      <Typography variant="h5" align="center" gutterBottom marginBottom={5}>
        Create Account
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name and Last Name */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 3 }}>
          <TextField
            label="First Name"
            fullWidth
            size="small"
            {...register("firstName", { required: "First name is required" })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            label="Last Name"
            fullWidth
            size="small"
            {...register("lastName", { required: "Last name is required" })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
        </Box>

        {/* Email */}
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            size="small"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>

        {/* Password */}
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            size="small"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters required" },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Gender and Job Type */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 3 }}>
          <TextField
            select
            label="Gender"
            fullWidth
            size="small"
            defaultValue=""
            {...register("gender", { required: "Please select your gender" })}
            error={!!errors.gender}
            helperText={errors.gender?.message}
          >
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>

          <TextField
            select
            label="Job Type"
            fullWidth
            size="small"
            defaultValue=""
            {...register("jobType", { required: "Please select your job type" })}
            error={!!errors.jobType}
            helperText={errors.jobType?.message}
          >
            <MenuItem value="">Select Job Type</MenuItem>
            <MenuItem value="fullTime">Full Time</MenuItem>
            <MenuItem value="partTime">Part Time</MenuItem>
            <MenuItem value="freelance">Freelance</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
          </TextField>
        </Box>

        {/* Contact Number */}
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Contact Number"
            type="tel"
            fullWidth
            size="small"
            {...register("contactNumber", { required: "Contact number is required" })}
            error={!!errors.contactNumber}
            helperText={errors.contactNumber?.message}
          />
        </Box>

        {/* Annual Income */}
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Annual Income"
            type="number"
            fullWidth
            size="small"
            {...register("annualIncome", { required: "Annual income is required" })}
            error={!!errors.annualIncome}
            helperText={errors.annualIncome?.message}
          />
        </Box>

        {/* Submit */}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Create Account
        </Button>
      </form>
      <Typography textAlign="center" mt={4} color="textSecondary">
        Already have an account?{" "}
        <Button onClick={() => navigate("/login")} size="small">
          Login
        </Button>
      </Typography>
    </Container>
  );
};

export default Signup;
