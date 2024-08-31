"use client";
import React, { useEffect, useState } from "react";

const OrientationWarning = () => {
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerHeight <= window.innerWidth);
    };

    // Verificar la orientación al montar el componente
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return !isLandscape ? (
    <div className="orientation-warning">
      <h1>Por favor, rota tu dispositivo a orientación horizontal.</h1>
    </div>
  ) : null;
};

export default OrientationWarning;
