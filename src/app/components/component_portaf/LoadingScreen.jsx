"use client";
import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loadingAnimation from "@/../public/loading.json";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-sky-200 z-50">
      {}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center z-10">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          className="w-48 h-48"
        />
        <motion.h1
          className="text-sky-800 text-3xl font-bold mt-4"
          animate={{ y: [0, -10, 0], opacity: [1, 0.7, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}>
          Cargando...
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
