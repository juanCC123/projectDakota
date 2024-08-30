"use client";
import { useRouter } from "next/navigation"; // Usa el hook useRouter para redirección
import React, { useEffect, useState } from "react";
import LoadingScreen from "@/app/components/component_portaf/LoadingScreen";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Inicializa el hook useRouter

  useEffect(() => {
    // Simular un tiempo de carga
    const timer = setTimeout(() => {
      setLoading(false);
      router.push("/pages/portafolio"); // Redirige después de la carga
    }, 3000); // 3 segundos de carga, puedes ajustar el tiempo

    return () => clearTimeout(timer);
  }, [router]); // Asegúrate de incluir router en las dependencias

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="flex justify-center items-center h-screen"></div>
  );
}
