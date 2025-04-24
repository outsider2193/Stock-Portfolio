import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Signup = ({ setFormType, setIsLoading, showToast }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [profilePreview, setProfilePreview] = useState("");
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Create FormData to send file + other inputs
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
  
      // Send POST request to your backend
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
  
      reset(); // clears form
      showToast(res.data.message || "Account created successfully", "success");
      setFormType("login"); // redirect or show next screen
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Error creating account";
      showToast(msg, "error");
    }
    setIsLoading(false);
  };
  

  // const handleProfilePicture = (e) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => setProfilePreview(reader.result);
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <img src="https://readdy.ai/api/search-image?query=modern minimalist company logo design with abstract shapes in blue and gray colors on pure white background professional corporate identity&width=120&height=120&seq=1&orientation=squarish" alt="Logo" className="mx-auto h-16 mb-4" />
        <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
        <p className="text-gray-600 mt-2">Join our community today</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input type="text" placeholder="First Name" className="w-full px-4 py-2 border rounded-lg" {...register("firstName", { required: "First name is required" })} />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <input type="text" placeholder="Last Name" className="w-full px-4 py-2 border rounded-lg" {...register("lastName", { required: "Last name is required" })} />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
          </div>
        </div>
        <div>
          <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border rounded-lg" {...register("email", { required: "Email is required", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" } })} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="relative">
          <input type={showPassword ? "text" : "password"} placeholder="Password" className="w-full px-4 py-2 border rounded-lg" {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } })} />
          <button type="button" className="absolute right-3 top-2.5" onClick={() => setShowPassword(!showPassword)}>
            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <div>
          <select className="w-full px-4 py-2 border rounded-lg" {...register("gender", { required: "Please select your gender" })}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
        </div>
        <div>
          <input type="tel" placeholder="Contact Number" className="w-full px-4 py-2 border rounded-lg" {...register("contactNumber", { required: "Contact number is required" })} />
          {errors.contactNumber && <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>}
        </div>
        <div>
          <select className="w-full px-4 py-2 border rounded-lg" {...register("jobType", { required: "Please select your job type" })}>
            <option value="">Select Job Type</option>
            <option value="fullTime">Full Time</option>
            <option value="partTime">Part Time</option>
            <option value="freelance">Freelance</option>
            <option value="contract">Contract</option>
          </select>
          {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType.message}</p>}
        </div>
        <div>
          <input type="number" placeholder="Annual Income" className="w-full px-4 py-2 border rounded-lg" {...register("annualIncome", { required: "Annual income is required" })} />
          {errors.annualIncome && <p className="text-red-500 text-sm mt-1">{errors.annualIncome.message}</p>}
        </div>
        {/* <div>
          <label className="flex flex-col items-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer">
            {profilePreview ? <img src={profilePreview} alt="Preview" className="w-24 h-24 object-cover rounded-full" /> : (
              <div className="flex flex-col items-center">
                <i className="fas fa-cloud-upload-alt text-4xl text-gray-500 mb-2"></i>
                <p className="text-sm text-gray-500">Click to upload profile picture</p>
              </div>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleProfilePicture} {...register("profilePicture")} />
          </label>
        </div> */}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg">Create Account</button>
      </form>
      <p className="text-center mt-6 text-gray-600">
        Already have an account? <button onClick={() => setFormType("login")} className="text-blue-600 hover:text-blue-800">Login</button>
      </p>
    </div>
  );
};

export default Signup;