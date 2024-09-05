"use client";
import React, { useState, useEffect } from "react";
import "@/../../public/style/timer.css";
import { FaPlay, FaPause, FaRedo, FaEdit, FaPalette } from "react-icons/fa";

const Timer = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputSeconds, setInputSeconds] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && !isEditing) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(interval);
            setIsActive(false);
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

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
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

  const setMeditationTime = () => {
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
              <span onClick={() => setIsEditing(true)} className="time-display">
                {formatTime()}
              </span>
              {!isActive && !isEditing && (
                <FaEdit
                  className="animated-icon edit-icon"
                  onClick={() => setIsEditing(true)}
                />
              )}
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
        </div>
      </div>
    </div>
  );
};

export default Timer;
