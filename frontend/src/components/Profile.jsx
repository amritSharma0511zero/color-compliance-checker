import React, { useEffect, useState } from "react";
import {  useData } from "../App.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({ name: "Amrit Sharma", email: "amrit@gmail.com" });
  const { brandColors, setBrandColors } = useData();
  const [customColors, setCustomColors] = useState(brandColors);
  const [isEditing, setIsEditing] = useState(false); 
  const {userData, setUserData} = useData();

  const handleColorChange = (category, index, value) => {
    setCustomColors((prevColors) => {
      const updatedColors = { ...prevColors };
      updatedColors[category][index] = value;
      return updatedColors;
    });
  };
  

  const navigate = useNavigate();

  const logout = async () => {
    try {
        const res = await axios.post("http://localhost:8080/api/v1/user/logout", {}, {
            withCredentials: true,
        });

        console.log(res.data.message);
        navigate('/')
        setUserData(null);
    } catch (error) {
        console.error("Error logging out:", error);
    }
};

  const saveChanges = () => {
    setBrandColors(customColors);
    localStorage.setItem("brandColors", JSON.stringify(customColors));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };
  

  useEffect(()=>{
    if(userData!=null){
      setUserInfo({
        name:userData.userName,
        email:userData.email,
      })
    }
  }, [userData])

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow-xl rounded-2xl mt-12 border border-gray-200">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 flex justify-center gap-5">
      {userData!=null ? (
            <img
              src={userData.profilePhoto} 
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
              onClick={() => navigate('profile')}
            />
          ) : (
            <span>👤</span>
          )}
         Profile</h1>
      <p className="text-gray-500 text-center mb-8">Update your personal details and brand colors.</p>

      <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Personal Information</h2>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-600">Name</label>
          {isEditing ? (
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
          ) : (
            <p className="p-3 bg-white rounded-lg shadow">{userInfo.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-600">Email</label>
          {isEditing ? (
            <input
              type="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            />
          ) : (
            <p className="p-3 bg-white rounded-lg shadow">{userInfo.email}</p>
          )}
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Brand Colors</h2>
      <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
        {Object.keys(brandColors).map((category) => (
          <div key={category} className="mb-6">
            <h3 className="font-semibold text-gray-700 capitalize">{category} Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {brandColors[category].map((color, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-md">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(category, index, e.target.value)}
                    className="w-12 h-12 border rounded-lg"
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => handleColorChange(category, index, e.target.value)}
                    className="p-2 border rounded-lg shadow-sm w-full focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!isEditing && (
        <button
          onClick={logout}
          className="mt-6 w-full py-3 text-lg font-semibold bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-all hover:cursor-pointer"
        >
          Logout
        </button>
      )}
      
      {isEditing && (
        <button
          onClick={saveChanges}
          className="mt-6 w-full py-3 text-lg font-semibold bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-all"
        >
          Save Changes
        </button>
      )}

    </div>
  );
};

export default Profile;
