import ColorChecker from "./components/ColorChecker.jsx";
import Threads from "./components/Threads.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Profile from "./components/Profile.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { createContext, useState, useContext, useEffect } from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

// Create Context for brandColors
export const DataContext = createContext();

const Layout = () => {
  const savedColors = localStorage.getItem("brandColors");
  let initialColors;

  try {
    initialColors = savedColors ? JSON.parse(savedColors) : null;
  } catch (error) {
    console.error("Error parsing brandColors from localStorage:", error);
    initialColors = null;
  }

  const defaultColors = {
    primary: ["#FF0000", "#003DA5"],
    secondary: ["#72B5E8", "#54585A"],
    accent: ["#FFB612", "#158B45"],
  };

  const [brandColors, setBrandColors] = useState(initialColors || defaultColors);

  // Save colors to localStorage whenever brandColors change
  useEffect(() => {
    localStorage.setItem("brandColors", JSON.stringify(brandColors));
  }, [brandColors]);



  const [userData, setUserData] = useState(null)

  return (
    <DataContext.Provider value={{ brandColors, setBrandColors, userData, setUserData }}>
      <div className="flex flex-col justify-between z-10 w-full h-screen">
        <Header />
        <Outlet /> {/* Now child components can access brandColors via context */}
        <Footer />
      </div>
    </DataContext.Provider>
  );
};

// Custom hook for using brandColors in child components
export const useData = () => {
  return useContext(DataContext);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Wrap pages with Layout
    children: [
      { path: "/", element: <ColorChecker /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/profile", element: <Profile /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> }
    ],
  },
]);

const BackgroundComponent = () => {
  return (
    <div className="fixed inset-0 bg-black bg-cover bg-center z-0">
      <div className="w-screen h-screen relative">
        <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="relative w-screen flex items-center justify-center">
      <BackgroundComponent />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
