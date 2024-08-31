"use client";
import React, { useEffect, useState } from "react";

const OrientationWarning = () => {
  const [isLandscape, setIsLandscape] = useState(
    typeof window !== "undefined"
      ? window.innerHeight <= window.innerWidth
      : false
  );

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsLandscape(window.innerHeight <= window.innerWidth);
      }
    };

    handleResize(); // Verificar la orientación al montar el componente
    window.addEventListener("resize", handleResize);

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <div className={`orientation-warning ${isLandscape ? "hidden" : ""}`}>
      <h1>
        Rota tu dispositivo a orientación horizontal para una mejor
        visualización.
      </h1>
      <style jsx>{`
        .orientation-warning {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          text-align: center;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          overflow: hidden;
        }
        .hidden {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default OrientationWarning;
