"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaMicrophone,
  FaPause,
  FaPlay,
  FaDownload,
  FaVolumeUp,
} from "react-icons/fa";

export default function Microphone() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // Track if audio is playing
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
    }
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      setError(null); // Clear any previous error

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (event) => {
          setRecordedChunks((prev) => [...prev, event.data]);
        };

        recorder.onstop = () => {
          const blob = new Blob(recordedChunks, { type: "audio/wav" });
          const url = URL.createObjectURL(blob);
          setAudioUrl(url);
          setRecordedChunks([]);
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
        startTimer();
      } else {
        setError("getUserMedia is not supported by this browser.");
      }
    } catch (error) {
      if (error.name === "NotFoundError") {
        setError("No microphone device found.");
      } else if (error.name === "NotAllowedError") {
        setError("Microphone access denied.");
      } else {
        setError("Error starting recording: " + error.message);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      stopTimer();
    } else {
      setError("MediaRecorder not initialized.");
    }
  };

  const startTimer = () => {
    const id = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setError("No audio to play.");
    }
  };

  const playAudioFromStart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      setError("No audio to play.");
    }
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const a = document.createElement("a");
      a.href = audioUrl;
      a.download = "recording.wav";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      setError("No audio available to download.");
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Audio Recorder</h1>
      <div className="flex flex-col items-center gap-4">
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex gap-4">
          <button
            onClick={handlePlayPause}
            className={`p-2 text-white rounded ${
              isPlaying ? "bg-yellow-500" : "bg-blue-500"
            }`}
            title={isPlaying ? "Pause Audio" : "Play Audio"}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-2 text-white rounded ${
              isRecording ? "bg-red-500" : "bg-blue-500"
            }`}
            title={isRecording ? "Stop Recording" : "Start Recording"}>
            <FaMicrophone />
          </button>
          {audioUrl && !isRecording && (
            <>
              <button
                onClick={downloadAudio}
                className="p-2 bg-red-500 text-white rounded"
                title="Download Audio">
                <FaDownload />
              </button>
              <button
                onClick={playAudioFromStart}
                className="p-2 bg-gray-500 text-white rounded"
                title="Listen to Audio">
                <FaVolumeUp />
              </button>
            </>
          )}
        </div>
        <div className="mt-4">
          <p>Elapsed Time: {formatTime(elapsedTime)}</p>
        </div>
      </div>
      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
}
