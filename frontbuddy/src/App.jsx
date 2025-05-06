import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./LandingPage";
import { ToastContainer } from "react-toastify";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserList from "./components/admin/UserList";
import UserTransactions from "./components/admin/UserTransactions";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* If user enters wrong URL, redirect to LandingPage */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />}/>
        <Route path="/admin/dashboard/users" element={<UserList/>}/>
        <Route path="/admin/dashboard/transactions" element={<UserTransactions/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword />} />
          
      </Routes>
    </>
  );
};

export default App;
