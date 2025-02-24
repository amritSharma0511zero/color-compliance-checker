const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          
          {/* Left Section - Brand */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold">🎨 Color Compliance Checker</h2>
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} All Rights Reserved</p>
          </div>
  
          {/* Right Section - Social Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="www.facebook.com" className="hover:text-blue-400 transition"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-blue-400 transition"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-blue-400 transition"><i className="fab fa-instagram"></i></a>
            <a href="#" className="hover:text-blue-400 transition"><i className="fab fa-linkedin-in"></i></a>
          </div>
  
        </div>
      </footer>
    );
  };
  
  export default Footer;
  