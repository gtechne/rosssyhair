import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp, FaTimes } from "react-icons/fa";

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state?.user?.user); // Get user from Redux store

  if (!user?._id) return null; // Hide if user is not logged in

  return (
    <div className="fixed bottom-12 right-2 z-50">
      {/* Contact Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110"
      >
        {isOpen ? <FaTimes size={24} /> : "💬"}
      </button>

      {/* Contact Options */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 flex flex-col items-end space-y-3 bg-white shadow-lg p-3 rounded-xl">
          <a
            href="https://wa.me/YOUR_WHATSAPP_NUMBER"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <FaWhatsapp className="text-green-500" size={20} />
            <span>WhatsApp</span>
          </a>
          <a
            href="https://instagram.com/YOUR_INSTAGRAM_PAGE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <FaInstagram className="text-pink-500" size={20} />
            <span>Instagram</span>
          </a>

          <a
            href="mailto:admin@rossyhairs.com"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <FaEnvelope className="text-blue-500" size={20} />
            <span>Email</span>
          </a>

          <a
            href="https://facebook.com/YOUR_FACEBOOK_PAGE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <FaFacebookF className="text-blue-600" size={20} />
            <span>Facebook</span>
          </a>

         
        </div>
      )}
    </div>
  );
};

export default FloatingContactButton;
