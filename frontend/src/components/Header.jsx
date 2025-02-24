

"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularText from "./CircularText";
import Cookies from "js-cookie";
import { useData } from "../App";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {userData, setUserData} = useData();
  console.log(userData)

  useEffect(() => {
    const fetchUser = async () => {

      try {
        const res = await axios.get("http://localhost:8080/api/v1/user/", {
          withCredentials: true,  
        });
        
        console.log('vinesh', res.data[0])
        setUserData(res.data[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <CircularText
          text="🎨 Color * Compliance * Checker "
          onHover="speedUp"
          spinDuration={20}
          className="custom-class"
        />
        <nav className="hidden md:flex space-x-6 md:items-center">
          <div onClick={() => navigate('/')} className="hover:text-blue-400 transition cursor-pointer">Home</div>
          <div onClick={() => navigate('about')} className="hover:text-blue-400 transition cursor-pointer">About</div>
          <div onClick={() => navigate('contact')} className="hover:text-blue-400 transition cursor-pointer">Contact</div>

          {userData!=null ? (
            <img
              src={userData.profilePhoto} 
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
              onClick={() => navigate('profile')}
            />
          ) : (
            <div onClick={() => navigate('login')} className="hover:text-blue-400 transition cursor-pointer">
              Login
            </div>
          )}
        </nav>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      {isOpen && (
        <nav className="md:hidden bg-gray-800 text-center py-4 space-y-4">
          <a onClick={() => navigate('/')} className="block hover:text-blue-400 transition cursor-pointer">Home</a>
          <a onClick={() => navigate('about')} className="block hover:text-blue-400 transition cursor-pointer">About</a>
          <a onClick={() => navigate('contact')} className="block hover:text-blue-400 transition cursor-pointer">Contact</a>
          
          {userData ? (
            <img
              src={userData.profilePhoto} 
              alt="Profile"
              className="w-10 h-10 rounded-full mx-auto border-2 border-blue-500 cursor-pointer"
              onClick={() => navigate('profile')}
            />
          ) : (
            <a onClick={() => navigate('login')} className="block hover:text-blue-400 transition cursor-pointer">Login</a>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
