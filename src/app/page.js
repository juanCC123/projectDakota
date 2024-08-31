"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingScreen from "@/app/components/component_portaf/LoadingScreen";
import OrientationWarning from "@/components/OrientationWarning"; // Importa el componente de advertencia

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      router.push("/pages/portfolio"); // Redirige después de la carga
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <OrientationWarning /> {/* Incluye el componente de advertencia */}
      <LoadingScreen />
    </>
  );
}
