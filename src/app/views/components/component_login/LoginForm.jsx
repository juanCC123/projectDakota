"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import formatAnimation from "@/../public/loginAnimated.json"; // Ajusta la ruta según tu estructura
import { motion } from "framer-motion";
import { useSpring } from "@react-spring/web";

const LoginForm = () => {
  const [formState, setFormState] = useState({
    nombre: "",
    correo: "",
    teléfono: "",
    contraseña: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(""); // Nuevo estado para errores del servidor
  const router = useRouter();

  // Maneja cambios en los inputs
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value });
  };

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        // Hacemos el fetch a la API del backend
        const response = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });

        const data = await response.json(); // Parseamos la respuesta JSON

        if (response.ok) {
          // Si la validación en el servidor fue exitosa, redirigimos
          router.push("/pages/mental");
        } else {
          // Si hay errores, mostramos el mensaje del servidor
          setServerError(data.message || "Error en el servidor");
        }
      } catch (error) {
        // Si ocurre un error de red, mostramos un mensaje
        setServerError("Error de red. Intenta de nuevo más tarde.");
      }
    } else {
      setErrors(validationErrors); // Mostramos los errores de validación
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formState.nombre.trim()) {
      errors.nombre = "El nombre no puede estar en blanco";
    }
    if (!isValidEmail(formState.correo)) {
      errors.correo = "No es un correo electrónico válido";
    }
    if (!isValidPhone(formState.teléfono)) {
      errors.teléfono = "No es un número de teléfono válido";
    }
    if (formState.contraseña.trim().length < 8) {
      errors.contraseña = "Contraseña inválida";
    }
    return errors;
  };

  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

  const isValidPhone = (phone) => {
    return /^\+?\d{10,15}$/.test(phone);
  };

  const formAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0, transform: "translateY(50px)" },
    config: { tension: 220, friction: 25 },
  });

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gradient-to-r from-cyan-300 to-blue-300">
      <motion.div
        className="relative flex flex-col md:flex-row bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full"
        style={formAnimation}>
        <form
          id="mainForm"
          className="w-full md:w-1/2 p-6 flex flex-col gap-4 md:gap-6 bg-white rounded-lg shadow-lg"
          onSubmit={handleSubmit}
          noValidate>
          <h2 className="text-2xl font-bold text-center text-sky-700 mb-4">
            Bienvenid@
          </h2>
          {["nombre", "correo", "teléfono", "contraseña"].map((field, idx) => (
            <div
              key={idx}
              className={`relative mb-4 border-2 rounded-lg ${
                errors[field]
                  ? "border-red-500"
                  : formState[field]
                  ? "border-green-500"
                  : "border-gray-300"
              }`}>
              {errors[field] && (
                <div className="absolute -top-6 left-0 w-full text-red-500 text-sm text-center bg-white p-1 border border-red-500 rounded-lg">
                  {errors[field]}
                </div>
              )}
              <label
                htmlFor={field}
                className="flex items-center mb-1 px-4 pt-2">
                <span className={`block capitalize text-sky-700 text-lg mr-2`}>
                  {field}
                </span>
                {!errors[field] && formState[field] && (
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-500 text-lg"
                  />
                )}
              </label>
              <input
                type={field === "contraseña" ? "password" : "text"}
                id={field}
                placeholder={`Ingresa tu ${field}`}
                autoComplete="off"
                value={formState[field]}
                onChange={handleChange}
                className={`w-full p-3 border-0 rounded-lg outline-none ring-1 ring-gray-300 ${
                  errors[field]
                    ? "ring-red-500"
                    : formState[field]
                    ? "ring-green-500"
                    : "ring-gray-300"
                }`}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center space-x-2">
            <FontAwesomeIcon icon={faCheckCircle} className="text-white" />
            <span>Enviar</span>
          </button>
        </form>
        <motion.div
          className="hidden md:flex items-center justify-center w-full md:w-1/2 p-6"
          style={{ opacity: 1 }}>
          <Lottie
            animationData={formatAnimation}
            loop={true}
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
