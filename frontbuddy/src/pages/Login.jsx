import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data)
      const token = res.data?.token;

      if(token){
        localStorage.setItem("token", token);
        console.log(token);
        const decodedToken = jwtDecode(token);
        console.log(decodedToken)
        showToast("Logged in successfully", "success");
        navigate("/dashboard");
      } else{
        showToast("No token received", "error");
      }

    } catch (error) {
      showToast("Login failed", "error");
    }
  };


  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <img src="https://readdy.ai/api/search-image?query=modern minimalist company logo design with abstract shapes in blue and gray colors on pure white background professional corporate identity&width=120&height=120&seq=1&orientation=squarish" alt="Logo" className="mx-auto h-16 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-600 mt-2">Sign in to continue</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border rounded-lg" {...register("email", { required: "Email is required" })} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="relative">
          <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full px-4 py-2 border rounded-lg" {...register("password", { required: "Password is required" })} />
          <button type="button" className="absolute right-3 top-2.5" onClick={() => setShowPassword(!showPassword)}>
            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
            <span className="ml-2 text-gray-600">Remember me</span>
          </label>
          <button type="button" onClick={() => navigate("/forgot-password")} className="text-blue-600 hover:text-blue-800 text-sm">Forgot Password?</button>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg">Sign in</button>
      </form>
      <p className="text-center mt-6 text-gray-600">
        Don't have an account? <button onClick={() => navigate("/signup")} className="text-blue-600 hover:text-blue-800">Sign up</button>
      </p>
    </div>
  );
};

export default Login;