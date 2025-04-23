import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Settings = ({ userProfile, showToast }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      if (data.newPassword !== data.confirmNewPassword) {
        showToast("New password and confirmation do not match", "error");
        setIsLoading(false);
        return;
      }
      showToast("Password updated successfully", "success");
      reset();
    } catch (error) {
      showToast("Failed to update password. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
    showToast(
      `Email notifications ${!emailNotifications ? "enabled" : "disabled"}`,
      "success"
    );
  };

  const handleToggleSmsNotifications = () => {
    setSmsNotifications(!smsNotifications);
    showToast(
      `SMS notifications ${!smsNotifications ? "enabled" : "disabled"}`,
      "success"
    );
  };

  const handleSetup2FA = () => {
    showToast("2FA setup initiated. Check your email for instructions.", "info");
  };

  return (
    <div className="space-y-6 p-8">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            Account Settings
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {/* Password Section */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">
                Password
              </h4>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    {...register("currentPassword", {
                      required: "Current password is required",
                    })}
                  />
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    {...register("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        message:
                          "Password must contain at least one letter, one number, and one special character",
                      },
                    })}
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    {...register("confirmNewPassword", {
                      required: "Please confirm your new password",
                      validate: (value) =>
                        value === watch("newPassword") ||
                        "Passwords do not match",
                    })}
                  />
                  {errors.confirmNewPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmNewPassword.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Notifications Section */}
            <div className="pt-6 border-t">
              <h4 className="text-sm font-medium text-gray-700 mb-4">
                Notifications
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Email Notifications
                    </p>
                    <p className="text-sm text-gray-500">
                      Receive email about your account activity
                    </p>
                  </div>
                  <button
                    onClick={handleToggleEmailNotifications}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      emailNotifications ? "bg-indigo-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`${
                        emailNotifications ? "translate-x-5" : "translate-x-0"
                      } inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out`}
                    ></span>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      SMS Notifications
                    </p>
                    <p className="text-sm text-gray-500">
                      Receive text messages for important updates
                    </p>
                  </div>
                  <button
                    onClick={handleToggleSmsNotifications}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      smsNotifications ? "bg-indigo-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`${
                        smsNotifications ? "translate-x-5" : "translate-x-0"
                      } inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out`}
                    ></span>
                  </button>
                </div>
              </div>
            </div>

            {/* Two-Factor Authentication Section */}
            <div className="pt-6 border-t">
              <h4 className="text-sm font-medium text-gray-700 mb-4">
                Two-Factor Authentication
              </h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">Enable 2FA</p>
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button
                  onClick={handleSetup2FA}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Setup 2FA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;