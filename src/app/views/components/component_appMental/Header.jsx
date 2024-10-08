"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faUser } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const motivationalMessages = [
  "PUEDES DAR MAS DE TI :)",
  "CONFÍA EN EL PROCESO PARA TRIUNFAR",
  "DISFRUTA, NO TE AMARGUES LA VIDA",
];

const Header = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(
        Math.random() * motivationalMessages.length
      );
      setMessage(motivationalMessages[randomIndex]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-300 shadow-lg z-10">
      <div className="container mx-auto flex items-center justify-between p-2 sm:p-3">
        {/* Mascota Virtual */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <motion.img
            src="/images/bichon-frise.gif"
            alt="Virtual pet"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="bg-white text-gray-900 p-1 sm:p-2 rounded-lg shadow-md max-w-xs relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}>
            <p className="text-xs sm:text-sm font-bold">{message}</p>
            <div className="absolute top-1/2 left-[-0.5rem] transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-white border-r-4 border-r-transparent border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </motion.div>
        </div>

        {/* Íconos y Título */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <motion.a
            href="#"
            className="text-white hover:text-gray-200 transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.9 }}>
            <FontAwesomeIcon icon={faCog} className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.a>
          <motion.a
            href="#"
            className="text-white hover:text-gray-200 transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: 360 }}
            whileTap={{ scale: 0.9 }}>
            <FontAwesomeIcon icon={faUser} className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.a>
          <motion.p
            className="text-xs sm:text-sm font-semibold text-white"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}>
            DAKOTA WEB
          </motion.p>
        </div>
      </div>
    </header>
  );
};

export default Header;
