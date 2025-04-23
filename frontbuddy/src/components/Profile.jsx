import React, { useState } from "react";

const Profile = ({ userProfile, showToast }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState("");

  const handleProfilePicture = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const updatedProfile = {
        ...userProfile,
        name: `${formData.get("firstName")} ${formData.get("lastName")}`,
        email: formData.get("email"),
        // In a real app, you'd update other fields like phone and address as well
      };
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Normally, you'd update the state in the parent component via a prop
      console.log("Updated Profile:", updatedProfile);
      showToast("Profile updated successfully", "success");
    } catch (error) {
      showToast("Failed to update profile. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={
                profilePreview ||
                "https://public.readdy.ai/ai/img_res/336c0298a7d0a083d8e6c4d5aa27a726.jpg"
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <label
              htmlFor="profilePicture"
              className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 cursor-pointer"
            >
              <i className="fas fa-camera"></i>
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicture}
              />
            </label>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {userProfile.name}
            </h2>
            <p className="text-gray-500">{userProfile.email}</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            Personal Information
          </h3>
        </div>
        <div className="p-6">
          <form className="space-y-6" onSubmit={handleSaveChanges}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue={userProfile.name.split(" ")[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue={userProfile.name.split(" ")[1]}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue={userProfile.email}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                defaultValue="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                name="address"
                className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                defaultValue="123 Market Street, San Francisco, CA 94105"
              />
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
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;