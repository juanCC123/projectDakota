"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import formatAnimation from "@/../public/loginAnimated.json";
import { motion } from "framer-motion";
import { useSpring } from "@react-spring/web";
import { FaUser, FaLock, FaPhone, FaEnvelope } from "react-icons/fa";

const LoginForm = () => {
  const [formState, setFormState] = useState({
    correo: "",
    contraseña: "",
  });

  const [registerState, setRegisterState] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    contraseña: "",
  });

  const [errors, setErrors] = useState({});
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();

  const handleChange = (e, isRegister = false) => {
    const target = e.target;
    if (isRegister) {
      setRegisterState({ ...registerState, [target.id]: target.value });
    } else {
      setFormState({ ...formState, [target.id]: target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("/api/send/DB", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });

        const data = await response.json();

        if (response.ok) {
          router.push("/pages/mental");
        } else {
          setErrors({ server: data.error || "Error en el servidor" });
        }
      } catch (error) {
        setErrors({ server: "Error de red. Intenta de nuevo más tarde." });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegisterForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerState),
        });

        const data = await response.json();

        if (response.ok) {
          setShowRegister(false);
          setFormState({
            ...formState,
            correo: registerState.correo,
            contraseña: registerState.contraseña,
          });
        } else {
          setErrors({ server: data.error || "Error en el servidor" });
        }
      } catch (error) {
        setErrors({ server: "Error de red. Intenta de nuevo más tarde." });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateLoginForm = () => {
    const errors = {};
    if (!formState.correo) {
      errors.correo = "El correo es obligatorio";
    } else if (!isValidEmail(formState.correo)) {
      errors.correo = "Correo electrónico inválido";
    }
    if (!formState.contraseña) {
      errors.contraseña = "La contraseña es obligatoria";
    }
    return errors;
  };

  const validateRegisterForm = () => {
    const errors = {};
    if (!registerState.nombre.trim()) {
      errors.nombre = "El nombre no puede estar en blanco";
    }
    if (!registerState.correo.trim()) {
      errors.correo = "El correo es obligatorio";
    } else if (!isValidEmail(registerState.correo)) {
      errors.correo = "Correo electrónico inválido";
    }
    if (!registerState.telefono.trim()) {
      errors.telefono = "El teléfono es obligatorio";
    } else if (!isValidPhone(registerState.telefono)) {
      errors.telefono = "Número de teléfono inválido";
    }
    if (!registerState.contraseña.trim()) {
      errors.contraseña = "La contraseña es obligatoria";
    } else if (registerState.contraseña.trim().length < 8) {
      errors.contraseña = "La contraseña debe tener al menos 8 caracteres";
    }
    return errors;
  };

  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

  const isValidPhone = (phone) => /^\+?\d{10,15}$/.test(phone);

  const formAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0, transform: "translateY(30px)" },
    config: { tension: 220, friction: 25 },
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-cyan-300 to-blue-300 p-4 md:p-8">
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          style={formAnimation}
          className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {showRegister ? "Registro" : "Iniciar sesión"}
          </h2>
          <form onSubmit={showRegister ? handleRegister : handleSubmit}>
            {showRegister && (
              <>
                <div className="mb-4 flex items-center border border-gray-300 rounded-md">
                  <FaUser className="text-gray-500 ml-3" />
                  <input
                    type="text"
                    id="nombre"
                    placeholder="Nombre"
                    value={registerState.nombre}
                    onChange={(e) => handleChange(e, true)}
                    className="flex-1 p-2 border-none rounded-md focus:outline-none"
                  />
                </div>
                {errors.nombre && (
                  <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
                )}
                <div className="mb-4 flex items-center border border-gray-300 rounded-md">
                  <FaPhone className="text-gray-500 ml-3" />
                  <input
                    type="text"
                    id="telefono"
                    placeholder="Teléfono"
                    value={registerState.telefono}
                    onChange={(e) => handleChange(e, true)}
                    className="flex-1 p-2 border-none rounded-md focus:outline-none"
                  />
                </div>
                {errors.telefono && (
                  <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
                )}
              </>
            )}
            <div className="mb-4 flex items-center border border-gray-300 rounded-md">
              <FaEnvelope className="text-gray-500 ml-3" />
              <input
                type="email"
                id="correo"
                placeholder="Correo electrónico"
                value={showRegister ? registerState.correo : formState.correo}
                onChange={(e) => handleChange(e, showRegister)}
                className="flex-1 p-2 border-none rounded-md focus:outline-none"
              />
            </div>
            {errors.correo && (
              <p className="text-red-500 text-xs mt-1">{errors.correo}</p>
            )}
            <div className="mb-4 flex items-center border border-gray-300 rounded-md">
              <FaLock className="text-gray-500 ml-3" />
              <input
                type="password"
                id="contraseña"
                placeholder="Contraseña"
                value={
                  showRegister ? registerState.contraseña : formState.contraseña
                }
                onChange={(e) => handleChange(e, showRegister)}
                className="flex-1 p-2 border-none rounded-md focus:outline-none"
              />
            </div>
            {errors.contraseña && (
              <p className="text-red-500 text-xs mt-1">{errors.contraseña}</p>
            )}
            <div className="flex items-center justify-between mt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                {showRegister ? "Registrarse" : "Iniciar sesión"}
              </button>
              <button
                type="button"
                onClick={() => setShowRegister(!showRegister)}
                className="text-blue-500 hover:underline">
                {showRegister
                  ? "¿Ya tienes una cuenta? Inicia sesión"
                  : "¿No tienes una cuenta? Regístrate"}
              </button>
            </div>
            {errors.server && (
              <p className="text-red-500 text-xs mt-4">{errors.server}</p>
            )}
          </form>
        </motion.div>
      </div>
      <div className="hidden md:flex md:w-1/2 justify-center items-center">
        <Lottie animationData={formatAnimation} loop={true} />
      </div>
    </div>
  );
};

export default LoginForm;
