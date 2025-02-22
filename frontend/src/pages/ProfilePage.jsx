import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center pt-24" style={{ backgroundImage: "url('/new-background.jpg')" }}>
      <div className="max-w-lg w-full bg-gray-800/90 backdrop-blur-lg shadow-lg rounded-2xl p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white">Profile</h1>
          <p className="mt-2 text-gray-300">Your profile information</p>
        </div>

        {/* Avatar Upload Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="Profile"
              className="size-24 rounded-full object-cover border-4 border-white shadow-md"
            />
            <label
              htmlFor="avatar-upload"
              className={`
                absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer shadow-md
                ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
              `}
            >
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-gray-400">
            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </div>
            <p className="px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white">
              {authUser?.fullName}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </div>
            <p className="px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white">
              {authUser?.email}
            </p>
          </div>
        </div>

        <div className="mt-4 bg-gray-800 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-medium text-white mb-3">Account Information</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between py-1 border-b border-gray-700">
              <span className="text-gray-400">Member Since</span>
              <span className="text-white">{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-gray-400">Account Status</span>
              <span className="text-green-400 font-semibold">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
