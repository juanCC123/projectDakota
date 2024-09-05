"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import formatAnimation from "@/../public/loginAnimated.json";
import { motion } from "framer-motion";
import { useSpring } from "@react-spring/web";

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
        const response = await fetch("/api/send", {
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
      errors.telefono = "El telefono es obligatorio";
    } else if (!isValidPhone(registerState.telefono)) {
      errors.telefono = "Número de telefono inválido";
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
    from: { opacity: 0, transform: "translateY(50px)" },
    config: { tension: 220, friction: 25 },
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-cyan-300 to-blue-300">
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          style={formAnimation}
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {showRegister ? "Registro" : "Iniciar sesión"}
          </h2>
          <form onSubmit={showRegister ? handleRegister : handleSubmit}>
            {showRegister && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    value={registerState.nombre}
                    onChange={(e) => handleChange(e, true)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-xs">{errors.nombre}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="correo"
                    className="block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="correo"
                    value={registerState.correo}
                    onChange={(e) => handleChange(e, true)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                  {errors.correo && (
                    <p className="text-red-500 text-xs">{errors.correo}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    id="telefono"
                    value={registerState.telefono}
                    onChange={(e) => handleChange(e, true)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                  {errors.telefono && (
                    <p className="text-red-500 text-xs">{errors.telefono}</p>
                  )}
                </div>
              </>
            )}
            <div className="mb-4">
              <label
                htmlFor="correo"
                className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                id="correo"
                value={showRegister ? registerState.correo : formState.correo}
                onChange={(e) => handleChange(e, showRegister)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              {errors.correo && (
                <p className="text-red-500 text-xs">{errors.correo}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="contraseña"
                className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="contraseña"
                value={
                  showRegister ? registerState.contraseña : formState.contraseña
                }
                onChange={(e) => handleChange(e, showRegister)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
              {errors.contraseña && (
                <p className="text-red-500 text-xs">{errors.contraseña}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                {showRegister ? "Registrarse" : "Iniciar sesión"}
              </button>
              <button
                type="button"
                onClick={() => setShowRegister(!showRegister)}
                className="text-blue-500 hover:underline">
                {showRegister ? "Ya tengo cuenta" : "Crear cuenta"}
              </button>
            </div>
            {errors.server && (
              <p className="text-red-500 text-xs mt-4">{errors.server}</p>
            )}
          </form>
        </motion.div>
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center">
        <Lottie
          animationData={formatAnimation}
          loop
          className="w-full max-w-md"
        />
      </div>
    </div>
  );
};

export default LoginForm;
