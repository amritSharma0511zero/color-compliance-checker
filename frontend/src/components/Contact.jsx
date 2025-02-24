
import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    email: "Loading...",
    phone: "Loading...",
    address: "Loading...",
    workingHours: "Loading..."
  });

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setContactInfo({
        email: "amrit882622@gmail.com",
        phone: "+91 8826224688",
        address: "H-32 G-4 vikas nagar, uttam nagar, delhi, India",
        workingHours: "Monday - Friday: 9 AM - 6 PM\nSaturday - Sunday: Closed"
      });
    }, 1000);
  }, []);

  return (
    <div className="flex items-center justify-center p-6">
      <div className="max-w-3xl bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📞 Contact Us</h1>

        <div className="mt-8 space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <FaEnvelope className="text-blue-500 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Email</h3>
              <p className="text-gray-600 text-sm">
                <a href={`mailto:${contactInfo.email}`} className="text-blue-500 hover:underline">
                  {contactInfo.email}
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <FaPhone className="text-green-500 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
              <p className="text-gray-600 text-sm">
                <a href={`tel:${contactInfo.phone}`} className="text-green-500 hover:underline">
                  {contactInfo.phone}
                </a>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <FaMapMarkerAlt className="text-red-500 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Address</h3>
              <p className="text-gray-600 text-sm">{contactInfo.address}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md">
            <FaClock className="text-yellow-500 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Working Hours</h3>
              <p className="text-gray-600 text-sm" style={{ whiteSpace: "pre-line" }}>{contactInfo.workingHours}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-700 font-medium">
            📩 Reach out to us for any queries or support. We're happy to help!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;