"use client";
import React, { useEffect, useState } from "react";

const OrientationWarning = () => {
  const [isLandscape, setIsLandscape] = useState(
    window.innerHeight <= window.innerWidth
  );

  const handleResize = () => {
    setIsLandscape(window.innerHeight <= window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Verificar la orientación al montar el componente

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return !isLandscape ? (
    <div className="orientation-warning">
      <h1>Por favor, rota tu dispositivo a orientación horizontal.</h1>
    </div>
  ) : null;
};

export default OrientationWarning;
