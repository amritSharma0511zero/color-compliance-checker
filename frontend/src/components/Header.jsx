// "use client";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import CircularText from './CircularText';

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <header className="bg-gray-900 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
//         {/*AC CSXCDV FDSGBFDSACXAASZ Logo */}
//         {/* <h1 className="text-2xl font-bold tracking-wide">🎨 Color Compliance Checker</h1> */}
        
  
//         <CircularText
//           text="🎨 Color * Compliance * Checker "
//           onHover="speedUp"
//           spinDuration={20}
//           className="custom-class"
//         />

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex space-x-6">
//           <div onClick={()=>{navigate('/')}} className="hover:text-blue-400 transition cursor-pointer">Home</div>
//           <div onClick={()=>{navigate('about')}} className="hover:text-blue-400 transition cursor-pointer">About</div>
//           <div onClick={()=>{navigate('contact')}} className="hover:text-blue-400 transition cursor-pointer">Contact</div>
//           <div onClick={()=>{navigate('profile')}} className="hover:text-blue-400 transition cursor-pointer">Profile</div>
//           {/* <div href="#" className="hover:text-blue-400 transition">Services</div>
//           <div href="#" className="hover:text-blue-400 transition">Contact</div> */}
//         </nav>

//         {/* Mobile Menu Button */}
//         <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>

//       {/* Mobile Navigation */}
//       {isOpen && (
//         <nav className="md:hidden bg-gray-800 text-center py-4 space-y-4">
//           <a onClick={()=>{navigate('/')}} className="block hover:text-blue-400 transition cursor-pointer">Home</a>
//           <a onClick={()=>{navigate('about')}} className="block hover:text-blue-400 transition cursor-pointer">About</a>
//           <a onClick={()=>{navigate('contact')}} className="block hover:text-blue-400 transition cursor-pointer">Contact</a>
//           <a onClick={()=>{navigate('profile')}} className="block hover:text-blue-400 transition cursor-pointer">Profile</a>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;









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
  // const [user, setUser] = useState(null);  // State to store user details
  const navigate = useNavigate();
  const {userData, setUserData} = useData();
  console.log(userData)

  useEffect(() => {
    const fetchUser = async () => {
      // const token = Cookies.get("token"); // Get token from cookies
      // if (!token) return; // If no token, do nothing

      try {
        const res = await axios.get("http://localhost:8080/api/v1/user/", {
          withCredentials: true,  // Ensure cookies are sent
        });
        
        // const data = JSON.stringify(res.data)
        console.log('vinesh', res.data[0])
        setUserData(res.data[0]); // Set user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <CircularText
          text="🎨 Color * Compliance * Checker "
          onHover="speedUp"
          spinDuration={20}
          className="custom-class"
        />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 md:items-center">
          <div onClick={() => navigate('/')} className="hover:text-blue-400 transition cursor-pointer">Home</div>
          <div onClick={() => navigate('about')} className="hover:text-blue-400 transition cursor-pointer">About</div>
          <div onClick={() => navigate('contact')} className="hover:text-blue-400 transition cursor-pointer">Contact</div>

          {/* Conditionally Render Login/Profile */}
          {/* {console.log(userData)} */}
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

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-gray-800 text-center py-4 space-y-4">
          <a onClick={() => navigate('/')} className="block hover:text-blue-400 transition cursor-pointer">Home</a>
          <a onClick={() => navigate('about')} className="block hover:text-blue-400 transition cursor-pointer">About</a>
          <a onClick={() => navigate('contact')} className="block hover:text-blue-400 transition cursor-pointer">Contact</a>
          
          {/* Conditionally Render Login/Profile */}
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
