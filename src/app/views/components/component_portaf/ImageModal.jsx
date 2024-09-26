// ImageModal.js
import React from "react";
import { XCircleIcon } from "@heroicons/react/24/outline"; // Cambia a XCircleIcon

const ImageModal = ({ isOpen, imgUrl, onClose }) => {
  if (!isOpen) return null; // No renderizar si la modal no está abierta

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 text-2xl p-2 rounded-full hover:bg-opacity-30 transition duration-200 transform hover:scale-110"
          aria-label="Cerrar">
          <XCircleIcon className="h-12 w-12" />
        </button>
        <img
          src={imgUrl}
          alt="Project"
          className="max-w-full max-h-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageModal;
