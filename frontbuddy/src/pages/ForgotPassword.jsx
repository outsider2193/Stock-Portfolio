import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ForgotPassword = ({ setFormType, setIsLoading, showToast }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setOtpSent(true);
      showToast("Reset link sent", "success");
    } catch (error) {
      showToast("Error sending reset link", "error");
    }
    setIsLoading(false);
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <img src="https://readdy.ai/api/search-image?query=modern minimalist company logo design with abstract shapes in blue and gray colors on pure white background professional corporate identity&width=120&height=120&seq=1&orientation=squarish" alt="Logo" className="mx-auto h-16 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
        <p className="text-gray-600 mt-2">Enter your email to receive a reset link</p>
      </div>
      {!otpSent ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border rounded-lg" {...register("email", { required: "Email is required" })} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg">Send Reset Link</button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-center space-x-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-12 h-12 text-center border rounded-lg"
              />
            ))}
          </div>
          <button onClick={() => setFormType("change")} className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg">Verify OTP</button>
        </div>
      )}
      <p className="text-center mt-6 text-gray-600">
        Remember your password? <button onClick={() => setFormType("login")} className="text-blue-600 hover:text-blue-800">Sign in</button>
      </p>
    </div>
  );
};

export default ForgotPassword;