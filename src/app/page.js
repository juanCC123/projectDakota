"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingScreen from "@/app/views/components/component_portaf/LoadingScreen";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      router.push("/pages/portfolio"); // Redirige después de la carga
    }, 2300);

    return () => clearTimeout(timer);
  }, [router]);

  return <LoadingScreen />;
}
