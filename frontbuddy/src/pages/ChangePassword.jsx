import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ChangePassword = ({ setFormType, setIsLoading, showToast }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      showToast("Password changed successfully", "success");
      setFormType("login");
    } catch (error) {
      showToast("Error changing password", "error");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <img src="https://readdy.ai/api/search-image?query=modern minimalist company logo design with abstract shapes in blue and gray colors on pure white background professional corporate identity&width=120&height=120&seq=1&orientation=squarish" alt="Logo" className="mx-auto h-16 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800">Change Password</h2>
        <p className="text-gray-600 mt-2">Enter your new password</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="relative">
          <input type={showPassword ? "text" : "password"} placeholder="New Password" className="w-full px-4 py-2 border rounded-lg" {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })} />
          <button type="button" className="absolute right-3 top-2.5" onClick={() => setShowPassword(!showPassword)}>
            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <div className="relative">
          <input type={showPassword ? "text" : "password"} placeholder="Confirm New Password" className="w-full px-4 py-2 border rounded-lg" {...register("confirmPassword", { validate: (value) => value === watch("password") || "Passwords do not match" })} />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;