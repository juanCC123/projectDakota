"use client";
import React, { useState, useEffect, useRef } from "react";
import "@/../../public/style/timer.css";
import {
  FaPlay,
  FaPause,
  FaRedo,
  FaEdit,
  FaPalette,
  FaInfoCircle,
} from "react-icons/fa";

const Timer = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputSeconds, setInputSeconds] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const audioRef = useRef(null); // Referencia para el audio

  useEffect(() => {
    let interval = null;

    if (isActive && !isEditing) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(interval);
            setIsActive(false);
            playAlarm(); // Iniciar la alarma al llegar a 0
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else if (!isActive || isEditing) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isEditing]);

  const playAlarm = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 2; // Reiniciar el sonido al principio
      audioRef.current.play(); // Reproducir el sonido
    }
  };

  const stopAlarm = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pausar el sonido
      audioRef.current.currentTime = 0; // Reiniciar el sonido al principio
    }
  };

  const toggle = () => {
    setIsActive(!isActive);
  };

  // Al reiniciar el temporizador, detener el sonido
  const reset = () => {
    stopAlarm(); // Detener el sonido al reiniciar
    setIsActive(false);
    setSeconds((inputMinutes || 0) * 60 + (inputSeconds || 0));
  };

  const handleInputMinutesChange = (event) => {
    const value = Math.max(0, Math.min(99, Number(event.target.value))) || "";
    setInputMinutes(value);
    setSeconds((value || 0) * 60 + (inputSeconds || 0));
  };

  const handleInputSecondsChange = (event) => {
    const value = Math.max(0, Math.min(59, Number(event.target.value))) || "";
    setInputSeconds(value);
    setSeconds((inputMinutes || 0) * 60 + (value || 0));
  };

  // Al cambiar el tiempo, detener el sonido
  const setMeditationTime = () => {
    stopAlarm(); // Detener el sonido al cambiar el tiempo
    setSeconds((inputMinutes || 0) * 60 + (inputSeconds || 0));
    setIsEditing(false);
  };

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleColorChange = (event) => {
    document.querySelector(".pomodoro-container").style.backgroundColor =
      event.target.value;
  };

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="pomodoro-container">
      <div className="background">
        <div className="leaves"></div>
      </div>
      <div className="timer-content">
        <div className="timer-display">
          {isEditing ? (
            <div className="edit-time-container">
              <div className="input-group">
                <label>Min:</label>
                <input
                  type="number"
                  value={inputMinutes}
                  onChange={handleInputMinutesChange}
                  className="input-time-edit"
                  min="0"
                  max="99"
                  autoFocus
                />
              </div>
              <div className="input-group">
                <label>Seg:</label>
                <input
                  type="number"
                  value={inputSeconds}
                  onChange={handleInputSecondsChange}
                  className="input-time-edit"
                  min="0"
                  max="59"
                />
              </div>
              <button onClick={setMeditationTime} className="save-button">
                Guardar
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="cancel-button">
                Cancelar
              </button>
            </div>
          ) : (
            <div className="time-display-container">
              <FaEdit
                className="animated-icon edit-icon"
                onClick={() => setIsEditing(true)}
              />
              <span onClick={() => setIsEditing(true)} className="time-display">
                {formatTime()}
              </span>
            </div>
          )}
        </div>
        <div className="meditation-image">
          <img src="/images/meditation.gif" alt="Animación de Meditación" />
        </div>
        <div className="controls">
          <button onClick={toggle} className="control-button">
            {isActive ? (
              <FaPause className="animated-icon" />
            ) : (
              <FaPlay className="animated-icon" />
            )}
          </button>
          <button onClick={reset} className="control-button">
            <FaRedo className="animated-icon" />
          </button>
          <button
            onClick={() =>
              document
                .querySelector(".color-picker-container")
                .classList.toggle("visible")
            }
            className="color-picker-button">
            <FaPalette className="animated-icon" />
          </button>
          <div className="color-picker-container">
            <input
              type="color"
              id="background-color"
              onChange={handleColorChange}
              className="color-picker"
            />
          </div>
          <button onClick={toggleInstructions} className="info-button">
            <FaInfoCircle className="info-icon" />
          </button>
        </div>
        {showInstructions && (
          <div className="instructions">
            <h2>Instrucciones para Meditación y Respiración</h2>
            <p>
              <strong>1. Meditación:</strong> Siéntate en un lugar tranquilo.
              Inicia el temporizador y concédele tu atención a tu respiración.
              Intenta vaciar tu mente de pensamientos y enfocarte solo en el
              presente.
            </p>
            <p>
              <strong>2. Respiración Profunda:</strong> Respira profundamente
              por la nariz durante 3 segundos, sostén la respiración durante 3
              segundos y exhala lentamente por la boca. Repite durante el tiempo
              del temporizador.
            </p>
            <button
              onClick={toggleInstructions}
              className="close-instructions-button">
              Cerrar
            </button>
          </div>
        )}
      </div>
      {/* Audio element to play the alarm */}
      <audio ref={audioRef} src="/alarm.mp3" preload="auto" />
    </div>
  );
};

export default Timer;
